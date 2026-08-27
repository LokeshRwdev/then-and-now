import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const id = resolvedParams.id
  
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold">Edit Product</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/products/${product.slug}`} target="_blank" className="text-sm font-medium text-gray-500 hover:text-black transition-colors underline">
            View Live
          </Link>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <h3 className="font-bold text-lg border-b border-gray-100 pb-2">General Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Title</label>
                <input 
                  type="text" 
                  defaultValue={product.title}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-gray-50"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">URL Slug</label>
                <input 
                  type="text" 
                  defaultValue={product.slug}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input 
                type="text" 
                defaultValue={product.category}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-gray-50 capitalize"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Short Description</label>
              <textarea 
                defaultValue={product.short_description || ''}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-gray-50"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
              <textarea 
                defaultValue={product.long_description || ''}
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-gray-50"
                readOnly
              />
            </div>
            
            <div className="text-xs text-gray-500 italic mt-2">
              * Note: To edit these fields, we will add an update action later. For now, they are read-only.
            </div>
          </div>
        </div>

        {/* Sidebar: Images & Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-bold text-lg border-b border-gray-100 pb-2">Status</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Published</span>
              <div className={`w-12 h-6 rounded-full flex items-center p-1 ${product.is_published ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-bold text-lg border-b border-gray-100 pb-2 flex items-center justify-between">
              Images
              <button className="text-indigo-600 text-sm hover:text-indigo-800">Upload</button>
            </h3>
            
            <div className="aspect-[4/3] bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
              <ImageIcon size={32} className="mb-2 opacity-50" />
              <span className="text-sm font-medium">Click to upload image</span>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              Upload feature coming next!
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
