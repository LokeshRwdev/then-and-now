import PageBanner from '@/components/layout/PageBanner';
import ProductCard from '@/components/products/ProductCard';
import { createClient } from '@/lib/supabase/server';

export default async function ObjectsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'object')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  return (
    <>
      <main className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
        <PageBanner 
          title="Objects" 
          imageSrc="/objects-hero.jpg" 
        />

        {/* Product Grid */}
        <section className="w-full pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-black/10">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  title={product.title}
                  slug={product.slug}
                  shortDescription={product.short_description || ''}
                  imageUrl={product.image_url} 
                />
              ))
            ) : (
              // Mock products to fill the grid if database is empty or not connected
              Array.from({ length: 6 }).map((_, i) => (
                <ProductCard 
                  key={`mock-${i}`} 
                  id={`mock-${i}`}
                  title={`Object 00${i + 1}`}
                  slug={`object-00${i + 1}`}
                  shortDescription="The Chandigarh inspired collection by Stellar Works features a signature form, proportion and material finish. This piece is a carefully crafted design."
                  imageUrl="" 
                />
              ))
            )}
          </div>
        </section>

      </main>

    </>
  );
}
