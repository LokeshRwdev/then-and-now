import PageBanner from '@/components/layout/PageBanner';
import ProductCard from '@/components/products/ProductCard';
import { getDisplayProducts } from '@/lib/products';
import { getPageSections, getProducts } from '@/lib/content/contentService';
import { IMAGES } from '@/lib/images';
import { getCategoryBySlug } from '@/lib/supabase/categories';

export const dynamic = 'force-dynamic';

export default async function ObjectsPage() {
  const [sections, dbProducts, category] = await Promise.all([
    getPageSections('objects'),
    getProducts('object'),
    getCategoryBySlug('object'),
  ]);

  const heroBanner = sections.find((s) => s.section_key === 'hero');
  const fallbackDisplayProducts = getDisplayProducts(12);

  // If db has products, use them, otherwise use default showcase list
  const displayProducts = dbProducts && dbProducts.length > 0
    ? dbProducts.map((p: any, i: number) => ({
        gridKey: `db-obj-${p.id || i}`,
        id: p.id,
        title: p.title,
        slug: p.slug,
        tag: p.tag || (i % 2 === 0 ? 'HOME' : 'RESTAURANT'),
        shortDescription: p.short_description || p.shortDescription || '',
        imageUrl: p.image_url || p.page_data?.heroImage || p.image || IMAGES.hero.objects,
        fallbackSrc: IMAGES.hero.objects,
        buttonText: p.button_text || p.buttonText || 'REQUEST PRICE',
      }))
    : fallbackDisplayProducts;

  return (
    <>
      <main className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
        <PageBanner 
          title={heroBanner?.title || "Objects"} 
          imageSrc={category?.thumbnail_url || heroBanner?.image_url || IMAGES.hero.objects} 
        />

        {/* Product Grid */}
        <section className="w-full pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-black/10">
            {displayProducts.map((product: any) => (
              <ProductCard 
                key={product.gridKey} 
                id={product.id}
                title={product.title}
                slug={product.slug}
                tag={product.tag}
                shortDescription={product.shortDescription}
                imageUrl={product.imageUrl}
                fallbackSrc={product.fallbackSrc}
                buttonText={product.buttonText}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
