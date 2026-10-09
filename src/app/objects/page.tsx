import PageBanner from '@/components/layout/PageBanner';
import ProductCard from '@/components/products/ProductCard';
import { getDisplayProducts } from '@/lib/products';
import { IMAGES } from '@/lib/images';

export default function ObjectsPage() {
  const displayProducts = getDisplayProducts(12);

  return (
    <>
      <main className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
        <PageBanner 
          title="Objects" 
          imageSrc={IMAGES.hero.objects} 
        />

        {/* Product Grid */}
        <section className="w-full pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-black/10">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.gridKey} 
                id={product.id}
                title={product.title}
                slug={product.slug}
                tag={product.tag}
                shortDescription={product.shortDescription}
                imageUrl={product.image}
                fallbackSrc={product.fallbackImage}
                buttonText={product.buttonText}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
