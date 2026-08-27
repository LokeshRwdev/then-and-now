import PageBanner from '@/components/layout/PageBanner';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const supabase = await createClient();
  const { data: productData } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  // If no product is found in the database, provide a mock product
  // so the mock links from the grid pages don't 404.
  const product = productData || {
    title: slug.replace('-', ' ').toUpperCase(),
    slug: slug,
    image_url: '',
    long_description: '',
    short_description: ''
  };

  const title = product.title;

  return (
    <>
      <main className="min-h-screen bg-white text-[#1A1A1A]">
        
        {/* Hero Section */}
        <PageBanner 
          title={title} 
          subtitle="NOW & THEN COLLECTION"
          imageSrc={product.image_url || "/products-hero.jpg"} 
          bgColor="bg-[#e5e5e5]"
        />

        {/* Product Info & Specifications */}
        <section className="w-full py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            {/* Left side: Description */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">{title} - BARDIGLIO MARBLE</h2>
              <p className="text-sm font-sans leading-relaxed text-gray-700 whitespace-pre-wrap">
                {product.long_description || product.short_description || `The ${title} originated in the Stellar Works Collection with a focus on enduring aesthetics and craft. This piece represents the pinnacle of our artisanal approach, combining modernist design principles with traditional material intelligence.`}
              </p>
            </div>
            
            {/* Right side: Specs */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-8 text-xs font-sans tracking-widest uppercase text-gray-600">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 border-b border-black/10 pb-2">
                  <span className="font-bold text-black">Year</span>
                  <span>2022</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-black/10 pb-2">
                  <span className="font-bold text-black">Materials</span>
                  <span>Steel, Glass, Oak</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-black/10 pb-2">
                  <span className="font-bold text-black">Dimensions</span>
                  <span>H75 &times; W240 &times; D110 cm</span>
                </div>
              </div>
              
              <button className="w-full py-4 border border-black/20 font-semibold text-black hover:bg-black hover:text-white transition-colors">
                REQUEST INFO
              </button>
            </div>
          </div>
        </section>

        {/* Editorial Gallery Section */}
        <section className="w-full py-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-16">
            
            {/* Row 1: Landscape image */}
            <div className="w-full aspect-[21/9] bg-[#e5e5e5] relative">
              {/* <Image src="/gallery-1.jpg" alt="Gallery 1" fill className="object-cover" /> */}
            </div>

            {/* Row 2: Text + 2 Portrait images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="md:col-span-1">
                <p className="text-xs text-gray-600 leading-relaxed pt-4">
                  Constructing a specific discourse for this piece demands an architectural approach. The forms are carefully scaled to allow the materials natural grain to act as the primary ornamentation.
                </p>
              </div>
              <div className="md:col-span-1 aspect-[3/4] bg-[#e5e5e5] relative">
                 {/* <Image src="/gallery-2.jpg" alt="Gallery 2" fill className="object-cover" /> */}
              </div>
              <div className="md:col-span-1 aspect-[3/4] bg-[#e5e5e5] relative">
                 {/* <Image src="/gallery-3.jpg" alt="Gallery 3" fill className="object-cover" /> */}
              </div>
            </div>

            {/* Row 3: Large Landscape/Square Image + Text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end">
              <div className="md:col-span-2 aspect-square md:aspect-[4/3] bg-[#e5e5e5] relative">
                {/* <Image src="/gallery-4.jpg" alt="Gallery 4" fill className="object-cover" /> */}
              </div>
              <div className="md:col-span-1">
                <p className="text-xs text-gray-600 leading-relaxed pb-4">
                  The silhouette is drawn from classic modernist archetypes, adapted to contemporary dimensions and comfort standards.
                </p>
              </div>
            </div>

            {/* Row 4: 2 Images + 1 Text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="md:col-span-1 flex flex-col gap-8">
                <div className="aspect-[4/3] bg-[#e5e5e5] relative">
                  {/* <Image src="/gallery-5.jpg" alt="Gallery 5" fill className="object-cover" /> */}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Every edge is softly chamfered, ensuring the piece is as comfortable to touch as it is to observe from afar.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                <div className="aspect-[3/4] bg-[#e5e5e5] relative">
                  {/* <Image src="/gallery-6.jpg" alt="Gallery 6" fill className="object-cover" /> */}
                </div>
                <div className="aspect-[3/4] bg-[#e5e5e5] relative">
                  {/* <Image src="/gallery-7.jpg" alt="Gallery 7" fill className="object-cover" /> */}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Other Projects / Related Products */}
        <section className="w-full pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-8">
            <h2 className="text-xl font-bold tracking-widest uppercase">Other Projects</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-black/10">
            {/* Hardcoded 2 related products to match the mockup layout */}
            <ProductCard 
              id="related-1"
              title="Object 001"
              slug="object-001"
              shortDescription="The Chandigarh inspired collection by Stellar Works features a signature form, proportion and material finish."
              imageUrl=""
            />
            <ProductCard 
              id="related-2"
              title="Object 002"
              slug="object-002"
              shortDescription="The Chandigarh inspired collection by Stellar Works features a signature form, proportion and material finish."
              imageUrl=""
            />
          </div>
        </section>

      </main>
    </>
  );
}
