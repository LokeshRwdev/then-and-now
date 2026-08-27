'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = formData.get('category') as string
  const short_description = formData.get('short_description') as string
  const long_description = formData.get('long_description') as string
  const is_published = formData.get('is_published') === 'on'

  if (!title || !slug || !category) {
    return { error: 'Title, Slug, and Category are required' }
  }

  const { data, error } = await supabase
    .from('products')
    .insert([
      { title, slug, category, short_description, long_description, is_published }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/products')
  redirect(`/dashboard/products/${data.id}`)
}
