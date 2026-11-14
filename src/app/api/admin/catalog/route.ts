import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'Supabase service role credentials are not configured.' }, { status: 503 });
  const [categories, products] = await Promise.all([
    db.from('categories').select('*').order('sort_order'),
    db.from('products').select('*').order('created_at', { ascending: false }),
  ]);
  if (categories.error || products.error) {
    return NextResponse.json({ error: categories.error?.message || products.error?.message }, { status: 500 });
  }

  // Normalize products so image_url is always available from page_data.heroImage if column is missing/null
  const normalizedProducts = (products.data || []).map((p: any) => ({
    ...p,
    image_url: p.image_url || p.page_data?.heroImage || null,
  }));

  return NextResponse.json({ categories: categories.data || [], products: normalizedProducts });
}

export async function POST(request: NextRequest) {
  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'Supabase service role credentials are not configured.' }, { status: 503 });
  const { type, data } = await request.json();
  if (!data || !['product', 'category'].includes(type)) return NextResponse.json({ error: 'Invalid catalog item.' }, { status: 400 });

  if (type === 'category') {
    const payload = {
      name: String(data.name || '').trim(),
      slug: String(data.slug || '').trim().toLowerCase(),
      description: data.description || null,
      thumbnail_url: data.thumbnail_url || null,
      sort_order: Number(data.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };
    if (!payload.name || !payload.slug) return NextResponse.json({ error: 'Category name and slug are required.' }, { status: 400 });
    const query = data.id ? db.from('categories').update(payload).eq('id', data.id) : db.from('categories').insert(payload);
    const { data: saved, error } = await query.select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    if (data.id) {
      const { error: mappingError } = await db.from('products').update({ category: payload.slug }).eq('category_id', data.id);
      if (mappingError) return NextResponse.json({ error: `Category saved, but product mappings could not be refreshed: ${mappingError.message}` }, { status: 500 });
    }
    return NextResponse.json({ data: saved });
  }

  let categoryId = String(data.category_id || '');
  let categorySlug = String(data.category || '').toLowerCase();

  let categoryRecord: { id: string; slug: string } | null = null;
  if (categoryId) {
    const { data: cat } = await db.from('categories').select('id, slug').eq('id', categoryId).single();
    categoryRecord = cat;
  }
  if (!categoryRecord && categorySlug) {
    const { data: cat } = await db.from('categories').select('id, slug').eq('slug', categorySlug).single();
    categoryRecord = cat;
  }
  if (!categoryRecord) {
    const { data: firstCat } = await db.from('categories').select('id, slug').order('sort_order').limit(1).single();
    categoryRecord = firstCat;
  }

  const pageData = {
    ...(data.page_data || {}),
    heroImage: data.image_url || data.page_data?.heroImage || null,
  };

  const payload: any = {
    title: String(data.title || '').trim(),
    slug: String(data.slug || '').trim().toLowerCase(),
    category: categoryRecord ? categoryRecord.slug : 'object',
    category_id: categoryRecord ? categoryRecord.id : null,
    tag: data.tag || null,
    short_description: data.short_description || null,
    long_description: data.long_description || null,
    button_text: data.button_text || 'REQUEST PRICE',
    page_data: pageData,
    is_published: data.is_published !== false,
    updated_at: new Date().toISOString(),
  };

  if (!payload.title || !payload.slug) return NextResponse.json({ error: 'Product title and URL slug are required.' }, { status: 400 });

  // Try saving with image_url column; if PostgREST reports image_url column missing, fall back seamlessly
  let savePayload = { ...payload, image_url: data.image_url || null };
  let query = data.id ? db.from('products').update(savePayload).eq('id', data.id) : db.from('products').insert(savePayload);
  let { data: saved, error } = await query.select().single();

  if (error && error.message.includes("'image_url' column")) {
    const fallbackQuery = data.id ? db.from('products').update(payload).eq('id', data.id) : db.from('products').insert(payload);
    const retry = await fallbackQuery.select().single();
    saved = retry.data;
    error = retry.error;
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const normalizedSaved = saved ? {
    ...saved,
    image_url: saved.image_url || saved.page_data?.heroImage || data.image_url || null,
  } : saved;

  return NextResponse.json({ data: normalizedSaved });
}

export async function DELETE(request: NextRequest) {
  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: 'Supabase service role credentials are not configured.' }, { status: 503 });
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  if (!id || !['product', 'category'].includes(type || '')) return NextResponse.json({ error: 'Invalid delete request.' }, { status: 400 });
  if (type === 'category') {
    const { count, error: countError } = await db.from('products').select('id', { count: 'exact', head: true }).eq('category_id', id);
    if (countError) return NextResponse.json({ error: countError.message }, { status: 400 });
    if (count) return NextResponse.json({ error: 'Move or delete this category’s products before deleting it.' }, { status: 409 });
  }
  const { error } = await db.from(type === 'category' ? 'categories' : 'products').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
