import { createClient } from './server';
import { createAdminClient } from './admin';

// Circuit breaker state
let consecutiveFailures = 0;
let isCircuitOpen = false;
let lastFailureTime = 0;
const CIRCUIT_RESET_MS = 10 * 1000; // Retry after 10s if open
const MAX_CONSECUTIVE_FAILURES = 3;

/**
 * Executes a Supabase promise with a resilient timeout and circuit-breaker.
 * Prevents DNS lookups and dead remote servers from hanging Next.js navigation,
 * while allowing sufficient time (default 4000ms) for real database round-trips.
 */
async function executeWithTimeout<T>(
  queryFn: () => Promise<T>,
  timeoutMs = 4000
): Promise<T | null> {
  const now = Date.now();

  // If the circuit is open, fail-fast without waiting until reset window expires
  if (isCircuitOpen) {
    if (now - lastFailureTime < CIRCUIT_RESET_MS) {
      return null;
    }
    // Half-open: attempt one request
    isCircuitOpen = false;
  }

  try {
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeoutMs);
    });

    const result = await Promise.race([queryFn(), timeoutPromise]);

    if (result === null) {
      // Timed out
      consecutiveFailures++;
      console.warn(`[Supabase] Query timed out after ${timeoutMs}ms (fail count: ${consecutiveFailures}).`);
      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        isCircuitOpen = true;
        lastFailureTime = Date.now();
      }
      return null;
    }

    // Success - reset failure counter
    consecutiveFailures = 0;
    isCircuitOpen = false;
    return result;
  } catch (err) {
    consecutiveFailures++;
    console.warn('[Supabase] Query failed:', (err as Error)?.message || err);
    if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
      isCircuitOpen = true;
      lastFailureTime = Date.now();
    }
    return null;
  }
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description?: string | null;
  long_description?: string | null;
  image_url?: string | null;
  is_published?: boolean;
  created_at?: string;
  tag?: string | null;
  button_text?: string | null;
  page_data?: Record<string, any>;
  category_id?: string | null;
}

/**
 * Normalizes a product record so image_url is always available
 */
function normalizeProduct(p: any): Product {
  return {
    ...p,
    image_url: p.image_url || p.page_data?.heroImage || null,
  };
}

/**
 * Fetch products by category with fast timeout & resilience
 */
export async function getProductsByCategory(category: 'light' | 'object'): Promise<Product[]> {
  const result = await executeWithTimeout(async () => {
    const admin = createAdminClient();
    const supabase = admin || await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(normalizeProduct);
  }, 4000);

  return result || [];
}

/**
 * Fetch a single product by slug with fast timeout & resilience
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await executeWithTimeout(async () => {
    const admin = createAdminClient();
    const supabase = admin || await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data ? normalizeProduct(data) : null;
  }, 4000);

  return result || null;
}

/**
 * Fetch all products (for dashboard)
 */
export async function getAllProducts(): Promise<Product[]> {
  const result = await executeWithTimeout(async () => {
    const admin = createAdminClient();
    const supabase = admin || await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(normalizeProduct);
  }, 4000);

  return result || [];
}
