import { createAdminClient } from '@/lib/supabase/admin';
import { createClient as createServerClient } from '@/lib/supabase/server';
import {
  DEFAULT_PAGE_SECTIONS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_STORIES,
  DEFAULT_PRODUCTS,
  PageSectionItem,
} from './defaultData';

// Circuit breaker for database queries
let consecutiveDbFailures = 0;
let isDbCircuitOpen = false;
let lastDbFailureTime = 0;
const DB_RESET_TIMEOUT = 10000;
const MAX_CONSECUTIVE_FAILURES = 3;

async function runWithTimeout<T>(fn: () => Promise<T>, timeoutMs = 4000): Promise<T | null> {
  const now = Date.now();
  if (isDbCircuitOpen) {
    if (now - lastDbFailureTime < DB_RESET_TIMEOUT) {
      return null;
    }
    isDbCircuitOpen = false;
  }

  try {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs));
    const result = await Promise.race([fn(), timeout]);
    if (result === null) {
      consecutiveDbFailures++;
      console.warn(`[ContentService] DB query timed out after ${timeoutMs}ms (failures: ${consecutiveDbFailures})`);
      if (consecutiveDbFailures >= MAX_CONSECUTIVE_FAILURES) {
        isDbCircuitOpen = true;
        lastDbFailureTime = Date.now();
      }
      return null;
    }
    consecutiveDbFailures = 0;
    isDbCircuitOpen = false;
    return result;
  } catch (err) {
    consecutiveDbFailures++;
    console.warn('[ContentService] DB query failed or unconfigured, using fallback:', (err as any)?.message);
    if (consecutiveDbFailures >= MAX_CONSECUTIVE_FAILURES) {
      isDbCircuitOpen = true;
      lastDbFailureTime = Date.now();
    }
    return null;
  }
}

/**
 * Fetch sections for a specific page with automatic fallback to defaults
 */
export async function getPageSections(pageSlug: string): Promise<PageSectionItem[]> {
  const dbResult = await runWithTimeout(async () => {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return null;
    return data as PageSectionItem[];
  });

  if (dbResult && dbResult.length > 0) {
    return dbResult;
  }

  return DEFAULT_PAGE_SECTIONS[pageSlug] || [];
}

/**
 * Save or update a page section
 */
export async function savePageSection(section: Partial<PageSectionItem> & { page_slug: string; section_key: string }) {
  const adminClient = createAdminClient();
  if (!adminClient) {
    return { success: false, isFallback: true, message: 'Supabase credentials not configured in .env.local yet.' };
  }

  try {
    const payload = {
      ...section,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await adminClient
      .from('page_sections')
      .upsert(payload, { onConflict: 'page_slug,section_key' })
      .select()
      .single();

    if (error) {
      console.error('[ContentService] Upsert section error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Delete a page section (soft delete via is_active = false or hard delete)
 */
export async function deletePageSection(id: string, hard = false) {
  const adminClient = createAdminClient();
  if (!adminClient) {
    return { success: false, isFallback: true };
  }

  try {
    if (hard) {
      const { error } = await adminClient.from('page_sections').delete().eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await adminClient.from('page_sections').update({ is_active: false }).eq('id', id);
      if (error) throw error;
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch process steps with fallback
 */
export async function getProcessSteps() {
  const dbResult = await runWithTimeout(async () => {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return null;
    return data;
  });

  return dbResult || DEFAULT_PROCESS_STEPS;
}

/**
 * Save process step
 */
export async function saveProcessStep(step: any) {
  const adminClient = createAdminClient();
  if (!adminClient) {
    return { success: false, isFallback: true };
  }

  try {
    const { data, error } = await adminClient
      .from('process_steps')
      .upsert({ ...step, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Delete process step
 */
export async function deleteProcessStep(id: string) {
  const adminClient = createAdminClient();
  if (!adminClient) return { success: false, isFallback: true };

  try {
    const { error } = await adminClient.from('process_steps').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch stories with fallback
 */
export async function getStories() {
  const dbResult = await runWithTimeout(async () => {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return null;
    return data;
  });

  return dbResult || DEFAULT_STORIES;
}

/**
 * Save or update story
 */
export async function saveStory(story: any) {
  const adminClient = createAdminClient();
  if (!adminClient) return { success: false, isFallback: true };

  try {
    const { data, error } = await adminClient
      .from('stories')
      .upsert(story)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Delete story
 */
export async function deleteStory(id: string) {
  const adminClient = createAdminClient();
  if (!adminClient) return { success: false, isFallback: true };

  try {
    const { error } = await adminClient.from('stories').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all products (with category filter optional)
 */
export async function getProducts(category?: string) {
  const dbResult = await runWithTimeout(async () => {
    const admin = createAdminClient();
    const supabase = admin || await createServerClient();
    let query = supabase.from('products').select('*');
    if (category) {
      query = query.eq('category', category);
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data.map((p: any) => ({
      ...p,
      image_url: p.image_url || p.page_data?.heroImage || null,
    }));
  }, 4000);

  if (dbResult && dbResult.length > 0) {
    return dbResult;
  }

  const defaultList = DEFAULT_PRODUCTS as any[];
  if (category) {
    return defaultList.filter((p) => p.category === category);
  }
  return defaultList;
}

/**
 * Save or update product
 */
export async function saveProduct(product: any) {
  const adminClient = createAdminClient();
  if (!adminClient) return { success: false, isFallback: true };

  try {
    const { data, error } = await adminClient
      .from('products')
      .upsert({ ...product, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Delete product
 */
export async function deleteProduct(id: string) {
  const adminClient = createAdminClient();
  if (!adminClient) return { success: false, isFallback: true };

  try {
    const { error } = await adminClient.from('products').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
