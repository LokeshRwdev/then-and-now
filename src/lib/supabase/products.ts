import { createClient } from './server';

// Circuit breaker state
let isCircuitOpen = false;
let lastFailureTime = 0;
const CIRCUIT_RESET_MS = 60 * 1000; // Retry after 1 minute

/**
 * Executes a Supabase promise with a strict timeout and circuit-breaker.
 * Prevents DNS lookups and dead remote servers from blocking Next.js page navigation.
 */
async function executeWithTimeout<T>(
  queryFn: () => Promise<T>,
  timeoutMs = 400
): Promise<T | null> {
  const now = Date.now();

  // If the circuit is open, fail-fast without waiting
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
      console.warn(`[Supabase] Query timed out after ${timeoutMs}ms. Activating circuit breaker.`);
      isCircuitOpen = true;
      lastFailureTime = Date.now();
      return null;
    }

    return result;
  } catch (err) {
    console.warn('[Supabase] Query failed:', (err as Error)?.message || err);
    isCircuitOpen = true;
    lastFailureTime = Date.now();
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
}

/**
 * Fetch products by category with fast timeout & resilience
 */
export async function getProductsByCategory(category: 'light' | 'object'): Promise<Product[]> {
  const result = await executeWithTimeout(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  }, 400);

  return result || [];
}

/**
 * Fetch a single product by slug with fast timeout & resilience
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await executeWithTimeout(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Product;
  }, 400);

  return result || null;
}

/**
 * Fetch all products (for dashboard)
 */
export async function getAllProducts(): Promise<Product[]> {
  const result = await executeWithTimeout(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  }, 500);

  return result || [];
}
