'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createProduct } from '../actions'

export default function NewProductPage() {
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError('')
    
    const formData = new FormData(event.currentTarget)
    const result = await createProduct(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsPending(false)
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    
    const slugInput = document.getElementById('slug') as HTMLInputElement
    if (slugInput && !slugInput.value) {
      slugInput.value = slug
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold">Add New Product</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title *</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required
                onChange={handleTitleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
                placeholder="e.g. Marquetry Cabinet"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">URL Slug *</label>
              <input 
                type="text" 
                id="slug" 
                name="slug" 
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
                placeholder="e.g. marquetry-cabinet"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
            <select 
              id="category" 
              name="category" 
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none bg-white"
            >
              <option value="object">Object (Furniture, Decor)</option>
              <option value="light">Light (Pendants, Sconces)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea 
              id="short_description" 
              name="short_description" 
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="A brief summary for product cards..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="long_description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
            <textarea 
              id="long_description" 
              name="long_description" 
              rows={6}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Full product description..."
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <input 
              type="checkbox" 
              id="is_published" 
              name="is_published" 
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-gray-700">Publish immediately</label>
          </div>

          <div className="pt-6 flex justify-end gap-4">
            <Link 
              href="/dashboard/products"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isPending}
              className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Creating...' : 'Create & Proceed to Images'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
