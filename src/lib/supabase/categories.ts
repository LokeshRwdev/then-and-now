import { createClient } from './server';

export async function getCategoryBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
