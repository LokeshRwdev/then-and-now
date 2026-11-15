'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, X, ExternalLink, Package, Tags, LogOut } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import VercelImageUploader from '@/components/admin/VercelImageUploader';
import VisualProductPageEditor from '@/components/admin/VisualProductPageEditor';
import { DEFAULT_PRODUCTS } from '@/lib/content/defaultData';
import { performSignOut } from '@/lib/auth/signOut';

type Category = { id: string; name: string; slug: string; description?: string; thumbnail_url?: string; sort_order?: number };
type Product = {
  id?: string; title: string; slug: string; category_id: string; category?: string; tag?: string;
  short_description?: string; long_description?: string; image_url?: string; button_text?: string;
  is_published?: boolean; page_data?: Record<string, any>;
};
type Mode = 'products' | 'categories';
const input = 'w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-900';
const label = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-neutral-600';

const emptyPageData = () => ({
  heroSubtitle: '', heroImage: '', secondaryHeading: '', longDescription: '',
  specs: { year: '', materials: '', dimensions: '' },
  gallery: { landscape1: '', portrait1: '', portrait2: '', feature: '', detail1: '', detail2: '', detail3: '' },
  galleryDescription: '', featureHeading: '', featureDescription: '', detailHeading: '', detailDescription: '',
});

export default function AdminClient() {
  const [mode, setMode] = useState<Mode>('products');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/admin/catalog', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not load catalog.');
      const loadedCategories: Category[] = result.categories || [];
      setCategories(loadedCategories);
      const dbProducts: Product[] = result.products || [];
      // The original catalog is JSON-backed; merge it so every existing product can be adopted
      // into Supabase individually, while database versions take precedence by slug.
      const initialProducts: Product[] = (DEFAULT_PRODUCTS as any[]).map((item) => ({
        title: item.title, slug: item.slug,
        category_id: loadedCategories.find((category) => category.slug === item.category)?.id || '', category: item.category,
        tag: item.tag, short_description: item.shortDescription, image_url: item.image,
        button_text: item.buttonText, is_published: true,
        page_data: { ...emptyPageData(), ...item.pageData },
      }));
      const bySlug = new Map(initialProducts.map((item) => [item.slug, item]));
      dbProducts.forEach((item) => bySlug.set(item.slug, { ...(bySlug.get(item.slug) || {} as Product), ...item }));
      setProducts([...bySlug.values()]);
    } catch (err) { setError((err as Error).message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const filteredProducts = useMemo(() => products.filter((product) => categoryFilter === 'all' || product.category_id === categoryFilter), [products, categoryFilter]);

  const save = async (type: 'product' | 'category', data: Product | Category) => {
    setSaving(true); setError('');
    try {
      const response = await fetch('/api/admin/catalog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, data }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Save failed.');
      setNotice(`${type === 'product' ? 'Product' : 'Category'} saved.`);
      setEditingProduct(null); setEditingCategory(null); await load();
    } catch (err) { setError((err as Error).message); }
    finally { setSaving(false); }
  };

  const remove = async (type: 'product' | 'category', id: string) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    setError('');
    try {
      const response = await fetch(`/api/admin/catalog?type=${type}&id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Delete failed.');
      await load(); setNotice(`${type === 'product' ? 'Product' : 'Category'} deleted.`);
    } catch (err) { setError((err as Error).message); }
  };

  const startNewProduct = () => {
    const category = categories.find((item) => item.id === categoryFilter) || categories[0];
    setEditingProduct({
      title: 'New Piece',
      slug: 'new-piece',
      category_id: category?.id || '',
      category: category?.slug || 'object',
      tag: 'COLLECTION',
      short_description: '',
      long_description: '',
      image_url: '',
      button_text: 'REQUEST PRICE',
      is_published: true,
      page_data: emptyPageData(),
    });
  };

  return <div className="min-h-screen bg-[#f7f6f3] text-neutral-900">
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-3"><Link href="/admin" className="font-serif text-lg uppercase tracking-wide">Now &amp; Then</Link><span className="rounded border border-white/20 bg-white/10 px-2 py-1 text-[10px] uppercase tracking-widest">Admin</span></div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-neutral-300 hover:text-white">View site <ExternalLink size={14}/></a>
          <button
            onClick={() => performSignOut()}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-400 transition-colors px-2.5 py-1 rounded border border-white/10 hover:border-red-500/30 cursor-pointer"
            title="Sign out of Admin"
          >
            <LogOut size={13} />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-8">
      <div className="mb-7"><h1 className="text-2xl font-semibold">Catalog management</h1><p className="mt-1 text-sm text-neutral-500">Manage product detail pages and their categories.</p></div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
          <button onClick={() => setMode('products')} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${mode === 'products' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}><Package size={15}/> Products</button>
          <button onClick={() => setMode('categories')} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${mode === 'categories' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}><Tags size={15}/> Categories</button>
        </div>
        {mode === 'products' ? <div className="flex gap-2"><select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"><option value="all">All categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select><button onClick={startNewProduct} className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"><Plus size={15}/> Add product</button></div> : <button onClick={() => setEditingCategory({ id: '', name: '', slug: '', description: '', thumbnail_url: '', sort_order: categories.length })} className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"><Plus size={15}/> Add category</button>}
      </div>
      {(error || notice) && <div className={`mb-4 rounded-md px-4 py-3 text-sm ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{error || notice}<button onClick={() => { setError(''); setNotice(''); }} className="float-right"><X size={15}/></button></div>}
      {loading ? <div className="rounded-xl border bg-white p-12 text-center text-sm text-neutral-500">Loading catalog…</div> : mode === 'products' ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => <article key={product.id || product.slug || index} className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="relative aspect-[4/3] bg-neutral-100"><AppImage src={product.image_url || '/images/placeholders/default.jpg'} alt={product.title} fill className="object-cover"/></div>
          <div className="p-4"><div className="flex items-start justify-between gap-3"><div><h2 className="font-medium">{product.title}</h2><p className="mt-1 text-xs text-neutral-500">{categories.find((category) => category.id === product.category_id)?.name || product.category || 'Uncategorized'} · /products/{product.slug}</p></div><span className={`rounded px-2 py-1 text-[10px] uppercase ${product.is_published === false ? 'bg-neutral-100 text-neutral-500' : 'bg-emerald-50 text-emerald-700'}`}>{product.is_published === false ? 'Draft' : 'Live'}</span></div>
            <div className="mt-4 flex justify-end gap-2"><button onClick={() => setEditingProduct({ ...product, page_data: { ...emptyPageData(), ...(product.page_data || {}), specs: { ...emptyPageData().specs, ...(product.page_data?.specs || {}) }, gallery: { ...emptyPageData().gallery, ...(product.page_data?.gallery || {}) } } })} className="flex items-center gap-1 rounded border px-3 py-1.5 text-xs"><Pencil size={13}/> Edit page</button>{product.id && <button onClick={() => remove('product', product.id!)} className="rounded border border-red-200 px-2.5 text-red-600"><Trash2 size={14}/></button>}</div>
          </div>
        </article>)}
        {!filteredProducts.length && <div className="col-span-full rounded-xl border bg-white p-12 text-center text-sm text-neutral-500">No products in this category yet.</div>}
      </div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => <article key={category.id} className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"><div className="relative aspect-[4/3] bg-neutral-100"><AppImage src={category.thumbnail_url || '/images/placeholders/default.jpg'} alt={category.name} fill className="object-cover"/></div><div className="p-4"><h2 className="font-medium">{category.name}</h2><p className="mt-1 text-xs text-neutral-500">/{category.slug} · {products.filter((item) => item.category_id === category.id).length} products</p><div className="mt-4 flex justify-end gap-2"><button onClick={() => setEditingCategory(category)} className="flex items-center gap-1 rounded border px-3 py-1.5 text-xs"><Pencil size={13}/> Edit category</button><button onClick={() => remove('category', category.id)} className="rounded border border-red-200 px-2.5 text-red-600"><Trash2 size={14}/></button></div></div></article>)}
        {!categories.length && <div className="col-span-full rounded-xl border bg-white p-12 text-center text-sm text-neutral-500">No categories yet. Add one to start organizing products.</div>}
      </div>}
    </main>
    {editingProduct && (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
        <VisualProductPageEditor
          initialProduct={editingProduct}
          isNew={!editingProduct.id}
          onClose={() => {
            setEditingProduct(null);
            load();
          }}
        />
      </div>
    )}
    {editingCategory && <CategoryModal category={editingCategory} busy={saving} onClose={() => setEditingCategory(null)} onSave={(value) => save('category', value)}/>}
  </div>;
}

function CategoryModal({ category, busy, onClose, onSave }: { category: Category; busy: boolean; onClose: () => void; onSave: (category: Category) => void }) {
  const [value, setValue] = useState(category);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={onClose}><div className="w-full max-w-xl rounded-xl bg-white shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
    <div className="flex items-center justify-between rounded-t-xl bg-neutral-950 px-5 py-4 text-white"><div><div className="text-[10px] uppercase tracking-widest text-neutral-400">Category editor</div><h2 className="font-semibold">{value.name || 'New category'}</h2></div><button onClick={onClose}><X size={20}/></button></div>
    <form className="space-y-4 p-5" onSubmit={(e) => { e.preventDefault(); onSave(value); }}>
      <label><span className={label}>Category name</span><input required className={input} value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })}/></label>
      <label><span className={label}>URL slug</span><input required className={input} value={value.slug} onChange={(e) => setValue({ ...value, slug: e.target.value.toLowerCase().trim().replace(/\s+/g, '-') })}/></label>
      <label><span className={label}>Description</span><textarea className={`${input} min-h-20`} value={value.description || ''} onChange={(e) => setValue({ ...value, description: e.target.value })}/></label>
      <VercelImageUploader label="Category page thumbnail" currentUrl={value.thumbnail_url || ''} onImageUploaded={(url) => setValue({ ...value, thumbnail_url: url })}/>
      <div className="flex justify-end gap-2 border-t pt-4"><button type="button" onClick={onClose} className="rounded-md border px-4 py-2 text-sm">Cancel</button><button disabled={busy} className="rounded-md bg-neutral-900 px-5 py-2 text-sm text-white disabled:opacity-50">{busy ? 'Saving…' : 'Save category'}</button></div>
    </form>
  </div></div>;
}
