import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  imageUrl?: string;
}

export default function ProductCard({ id, title, slug, shortDescription, imageUrl }: ProductCardProps) {
  return (
    <div className="flex flex-col group border-b border-black/10 md:even:border-l p-6 md:p-12 hover:bg-black/[0.02] transition-colors">
      <Link href={`/products/${slug}`} className="block relative w-full aspect-square bg-[#e5e5e5] overflow-hidden mb-8">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <div className="w-full h-full bg-[#EAE6DF]" />
        )}
      </Link>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4">{title}</h3>
        <p className="text-sm font-sans text-gray-700 flex-grow line-clamp-4 leading-relaxed mb-8">
          {shortDescription || "Detailed specifications, drawings, dimensions, and materials for this piece. We offer customized variations upon request."}
        </p>
        <Link 
          href={`/products/${slug}`}
          className="w-full border border-black/20 py-4 text-center uppercase text-[10px] md:text-xs font-semibold tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          VIEW PRODUCT
        </Link>
      </div>
    </div>
  );
}
