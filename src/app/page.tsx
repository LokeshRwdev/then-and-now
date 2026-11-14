import Link from 'next/link';
import Header from '@/components/layout/Header';
import AppImage from '@/components/ui/AppImage';
import MarquetryCarousel from '@/components/home/MarquetryCarousel';
import FeaturedProductsGrid from '@/components/home/FeaturedProductsGrid';
import { IMAGES } from '@/lib/images';
import { getPageSections } from '@/lib/content/contentService';

export default async function Home() {
  const sections = await getPageSections('home');
  const hero = sections.find((s) => s.section_key === 'hero');
  const statement1 = sections.find((s) => s.section_key === 'statement_1');
  const marquetry = sections.find((s) => s.section_key === 'marquetry');
  const statement2 = sections.find((s) => s.section_key === 'statement_2');
  const bannerInterior = sections.find((s) => s.section_key === 'banner_interior');
  const statementOak = sections.find((s) => s.section_key === 'statement_oak');

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between">
        
        {/* Hero Section */}
        {hero?.is_active !== false && (
          <section className="relative w-full min-h-[85vh] sm:min-h-[88vh] md:min-h-[92vh] flex flex-col justify-between overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <AppImage 
                src={hero?.image_url || IMAGES.hero.home} 
                alt="Now & Then Artisanal Collection" 
                fill 
                sizes="100vw"
                priority 
                className="object-cover object-[70%_center] md:object-center" 
              />
            </div>
            
            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-start items-start pt-32 sm:pt-40 md:pt-44 lg:pt-48 pb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-sans font-normal lowercase tracking-tight text-[#1A1A1A] leading-[1.08] max-w-2xl mb-6 md:mb-8">
                {hero?.title || 'crafted for non-conformists'}
              </h1>
              <Link 
                href={hero?.button_link || '/objects'}
                className="inline-block border border-[#1A1A1A]/80 px-6 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EAE6DF] transition-all duration-300"
              >
                {hero?.button_text || 'EXPLORE COLLECTION'}
              </Link>
            </div>
          </section>
        )}

        {/* Category Navigation Sections */}
        <section className="w-full bg-[#EAE6DF] border-t border-black/15">
          {/* PRODUCTS Row */}
          <Link 
            href="/objects" 
            className="group block w-full py-8 sm:py-10 md:py-12 border-b border-black/15 text-center hover:bg-black/[0.02] transition-colors"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-normal uppercase tracking-tight text-[#1A1A1A]">
              PRODUCTS
            </h2>
            <span className="inline-block mt-1 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#1A1A1A] underline underline-offset-4 decoration-1 font-medium">
              VIEW COLLECTION
            </span>
          </Link>

          {/* LIGHTS Row */}
          <Link 
            href="/lights" 
            className="group block w-full py-8 sm:py-10 md:py-12 border-b border-black/15 text-center hover:bg-black/[0.02] transition-colors"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-normal uppercase tracking-tight text-[#1A1A1A]">
              LIGHTS
            </h2>
            <span className="inline-block mt-1 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#1A1A1A] underline underline-offset-4 decoration-1 font-medium">
              VIEW COLLECTION
            </span>
          </Link>

          {/* PROCESS Row */}
          <Link 
            href="/process" 
            className="group block w-full py-8 sm:py-10 md:py-12 border-b border-black/15 text-center hover:bg-black/[0.02] transition-colors"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-normal uppercase tracking-tight text-[#1A1A1A]">
              PROCESS
            </h2>
            <span className="inline-block mt-1 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#1A1A1A] underline underline-offset-4 decoration-1 font-medium">
              VIEW COLLECTION
            </span>
          </Link>

          {/* MATERIAL LIBRARY Row */}
          <Link 
            href="/material-library" 
            className="group block w-full py-8 sm:py-10 md:py-12 border-b border-black/15 text-center hover:bg-black/[0.02] transition-colors"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-normal uppercase tracking-tight text-[#1A1A1A]">
              MATERIAL LIBRARY
            </h2>
            <span className="inline-block mt-1 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#1A1A1A] underline underline-offset-4 decoration-1 font-medium">
              VIEW COLLECTION
            </span>
          </Link>
        </section>

        {/* Statement Section */}
        {statement1?.is_active !== false && (
          <section className="relative w-full py-20 sm:py-24 md:py-32 px-6 bg-black text-white text-center overflow-hidden">
            <div className="absolute top-8 sm:top-12 md:top-14 left-0 w-28 sm:w-44 md:w-64 h-[1px] bg-white/20 pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-sans font-normal leading-[1.25] tracking-tight text-white mb-6 md:mb-8">
                {statement1?.title || "We don't manufacture furniture. We craft enduring objects."}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto font-sans leading-relaxed mb-8 md:mb-10 font-normal">
                {statement1?.content || "Each object begins as a conversation between material, proportion and function. Made only after it has been ordered, every piece is produced in our workshop by artisans who understand the beauty of precision."}
              </p>
              <a 
                href={statement1?.button_link || "https://wa.me/919947109947?text=Hello,%20I%20would%20like%20to%20request%20info%20about%20your%20pieces."}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs sm:text-[13px] font-sans tracking-[0.2em] uppercase text-white underline underline-offset-8 decoration-1 hover:text-white/70 transition-colors font-medium"
              >
                {statement1?.button_text || 'REQUEST INFO'}
              </a>
            </div>
          </section>
        )}

        {/* Marquetry Featured Section */}
        {marquetry?.is_active !== false && (
          <section className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white">
            <div className="absolute inset-0 z-0">
              <AppImage 
                src={marquetry?.image_url || IMAGES.marquetry.hero} 
                alt="Marquetry Collection" 
                fill 
                sizes="100vw"
                priority 
                className="object-cover object-center" 
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="absolute top-[48%] left-0 w-28 sm:w-48 md:w-72 h-[1px] bg-white/30 pointer-events-none z-10" />

            <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-sans font-normal text-white tracking-tight drop-shadow-md mb-4 md:mb-6">
                {marquetry?.title || 'Marquetry'}
              </h2>
              <Link 
                href={marquetry?.button_link || '/products/marquetry'} 
                className="inline-block text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-white/95 underline underline-offset-8 decoration-1 hover:text-white transition-colors drop-shadow-sm font-medium"
              >
                {marquetry?.button_text || 'EXPLORE STORY'}
              </Link>
            </div>

            <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 pb-8 sm:pb-12 md:pb-16">
              <MarquetryCarousel stripSrc={marquetry?.secondary_image_url || IMAGES.marquetry.strip} />
            </div>
          </section>
        )}

        {/* Featured Products Showcase (3x2 Grid) */}
        <FeaturedProductsGrid />

        {/* Artisanal Quality */}
        {statement2?.is_active !== false && (
          <section className="relative w-full py-28 sm:py-36 md:py-44 px-6 bg-black text-white text-center overflow-hidden">
            <div className="absolute top-[38%] left-0 w-36 sm:w-56 md:w-80 h-[1px] bg-white/20 pointer-events-none" />
            <div className="absolute bottom-[28%] left-0 w-24 sm:w-40 md:w-60 h-[1px] bg-white/15 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-sans font-normal leading-[1.25] tracking-tight text-white">
                {statement2?.title || 'Artisanal Quality: Each furniture piece is meticulously handcrafted.'}
              </h2>
            </div>
          </section>
        )}

        {/* Full-Width Living Room Interior Banner */}
        {bannerInterior?.is_active !== false && (
          <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-black">
            <AppImage 
              src={bannerInterior?.image_url || IMAGES.banners.livingRoom} 
              alt="Interior Collection Feature" 
              fill 
              sizes="100vw"
              priority
              className="object-cover object-center" 
            />
            <div className="absolute top-[48%] left-0 w-32 sm:w-48 md:w-64 h-[1px] bg-white/40 pointer-events-none z-10" />
            <div className="absolute top-[80%] left-0 w-28 sm:w-40 md:w-56 h-[1px] bg-white/30 pointer-events-none z-10" />
          </section>
        )}

        {/* Enhance your indoor and outdoor spaces */}
        {statementOak?.is_active !== false && (
          <section className="w-full bg-white py-16 sm:py-20 md:py-28 px-6 sm:px-8 md:px-12 lg:px-16 border-t border-black/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center">
              <div className="md:col-span-7 flex flex-col items-start justify-center pr-0 lg:pr-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-sans font-normal leading-[1.38] tracking-tight text-[#1A1A1A] mb-8 md:mb-10">
                  {statementOak?.title || 'Enhance your indoor and outdoor spaces with our timeless, century-old solid oak beam furniture.'}
                </h2>
                {statementOak?.content && (
                  <p className="text-sm md:text-base text-neutral-600 font-sans leading-relaxed mb-6">
                    {statementOak.content}
                  </p>
                )}
                <Link 
                  href={statementOak?.button_link || '/objects'}
                  className="inline-block text-[11px] sm:text-xs font-sans tracking-wider uppercase text-[#1A1A1A] underline underline-offset-4 decoration-1 hover:text-black/70 transition-colors font-medium"
                >
                  {statementOak?.button_text || 'Read More'}
                </Link>
              </div>

              <div className="md:col-span-5 relative w-full aspect-[4/5] sm:aspect-[3/4] bg-[#E8E6E1] overflow-hidden">
                <AppImage 
                  src={statementOak?.image_url || IMAGES.banners.oakChairs} 
                  alt="Century-old solid oak beam furniture" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 45vw" 
                  className="object-cover object-center" 
                />
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}
