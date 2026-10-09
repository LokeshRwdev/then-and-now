import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { IMAGES } from '@/lib/images';

export const FEATURED_PRODUCTS = [
  {
    id: '1',
    title: 'Curved Sofa',
    slug: 'curved-sofa',
    image: IMAGES.featured.item1,
    hasLabel: true,
  },
  {
    id: '2',
    title: 'Artistic Credenza',
    slug: 'artistic-credenza',
    image: IMAGES.featured.item2,
  },
  {
    id: '3',
    title: 'Organic Console Table',
    slug: 'organic-console-table',
    image: IMAGES.featured.item3,
  },
  {
    id: '4',
    title: 'Sculptural Console & Mirror',
    slug: 'sculptural-console',
    image: IMAGES.featured.item4,
  },
  {
    id: '5',
    title: 'Classic Carved Armchair',
    slug: 'classic-carved-armchair',
    image: IMAGES.featured.item5,
  },
  {
    id: '6',
    title: 'Marquetry Bar Cabinet',
    slug: 'marquetry-bar-cabinet',
    image: IMAGES.featured.item6,
  },
];

export default function FeaturedProductsGrid() {
  return (
    <section className="w-full bg-[#EAE6DF] border-t border-black/15">
      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        {FEATURED_PRODUCTS.map((product, index) => {
          const isRightCol = (index + 1) % 3 === 0;

          return (
            <div
              key={product.id}
              className={`group flex flex-col bg-white border-b border-black/15 ${
                !isRightCol ? 'md:border-r md:border-black/15' : ''
              }`}
            >
              {/* Product Image Frame */}
              <div className="relative w-full aspect-square bg-[#E8E6E1] overflow-hidden flex items-center justify-center">
                {/* "Products" label on first card as in mockup */}
                {product.hasLabel && (
                  <>
                    <span className="absolute top-6 sm:top-8 left-0 right-0 text-center text-base sm:text-lg font-sans font-normal text-[#1A1A1A] z-20 pointer-events-none drop-shadow-sm">
                      Products
                    </span>
                    {/* Architectural Line Accent on Card 1 */}
                    <div className="absolute top-[48%] left-0 w-24 sm:w-36 h-[1px] bg-white/40 z-20 pointer-events-none" />
                  </>
                )}

                <AppImage
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Action Bar */}
              <div className="w-full bg-white py-3.5 sm:py-4 px-6 flex items-center justify-center border-t border-black/10">
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-block border border-black/50 px-7 sm:px-9 py-1.5 text-[11px] sm:text-xs font-sans tracking-wider text-[#1A1A1A] hover:bg-black hover:text-white transition-all duration-300"
                >
                  Read Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
