import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  imageUrl?: string;
  fallbackSrc?: string;
  tag?: string;
  buttonText?: string;
}

export default function ProductCard({ 
  id, 
  title, 
  slug, 
  shortDescription, 
  imageUrl,
  fallbackSrc,
  tag,
  buttonText = 'REQUEST PRICE'
}: ProductCardProps) {
  const productHref = `/products/${slug}`;

  return (
    <article className="flex flex-col group border-b border-black/10 md:even:border-l p-6 md:p-12 hover:bg-black/[0.015] transition-colors">
      {/* Product Image Frame */}
      <Link 
        href={productHref} 
        className="block relative w-full aspect-square bg-[#EAE6DF]/30 overflow-hidden mb-6 md:mb-8"
        aria-label={`View details for ${title}`}
      >
        <AppImage 
          src={imageUrl} 
          fallbackSrc={fallbackSrc}
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw" 
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-grow">
        {/* Product Title */}
        <div className="mb-3">
          <h3 className="text-lg md:text-xl font-normal text-neutral-900 tracking-tight">
            {title}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-xs md:text-sm font-sans text-neutral-700 leading-relaxed flex-grow line-clamp-4 mb-6 md:mb-8">
          {shortDescription}
        </p>

        {/* Action Button */}
        <Link 
          href={productHref}
          className="w-full border border-black/25 py-3 md:py-3.5 text-center uppercase text-[11px] md:text-xs font-semibold tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
        >
          {buttonText}
        </Link>
      </div>
    </article>
  );
}
