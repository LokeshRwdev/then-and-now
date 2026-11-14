import React from 'react';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import VisualProductPageEditor from '@/components/admin/VisualProductPageEditor';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Edit Product (${resolvedParams.id}) | Now & Then Visual Studio`,
  };
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const db = createAdminClient();
  let product: any = null;

  if (db) {
    const { data } = await db.from('products').select('*').eq('id', id).single();
    product = data;
  }

  // If not found in database, check fallback by id or not found
  if (!product) {
    // If id looks like a standard slug or default
    return notFound();
  }

  return <VisualProductPageEditor initialProduct={product} isNew={false} />;
}
