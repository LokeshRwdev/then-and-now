import PageBanner from "@/components/layout/PageBanner";
import AppImage from "@/components/ui/AppImage";
import { IMAGES } from "@/lib/images";
import { getPageSections } from "@/lib/content/contentService";

export const MATERIAL_LIBRARY_IMAGES = {
  heroBanner: "/images/material-library/hero-banner.png",
  timberYardIntro: "/images/material-library/timber-yard-intro.png",
  timberBlocksUnloaded: "/images/material-library/timber-blocks-unloaded.png",
  carpenterAtBench: "/images/material-library/carpenter-at-bench.png",
  carpenterFloorWork: "/images/material-library/carpenter-floor-work.png",
  brassTemplates: "/images/material-library/brass-templates.png",
  timberYardSelection: "/images/material-library/timber-yard-intro.png",
};

export default async function MaterialLibraryPage() {
  const sections = await getPageSections('material-library');
  const hero = sections.find((s) => s.section_key === 'hero');
  const timberYardIntro = sections.find((s) => s.section_key === 'timber_yard_intro');
  const timberStatement = sections.find((s) => s.section_key === 'timber_statement');
  const timberUnloaded = sections.find((s) => s.section_key === 'timber_unloaded');
  const carpenters = sections.find((s) => s.section_key === 'carpenters');
  const caneWeaving = sections.find((s) => s.section_key === 'cane_weaving');

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      <PageBanner
        title={hero?.title || "Material Library"}
        imageSrc={hero?.image_url || MATERIAL_LIBRARY_IMAGES.heroBanner}
        fallbackSrc={IMAGES.banners.oakChairs}
        bgColor="bg-[#e5e5e5]"
        height="h-[60vh] md:h-[75vh]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 space-y-16 md:space-y-24">
        
        {/* Section 1: Timber Yard Intro + Wood Philosophy */}
        {timberYardIntro?.is_active !== false && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="md:col-span-7 aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
              <AppImage
                src={timberYardIntro?.image_url || MATERIAL_LIBRARY_IMAGES.timberYardIntro}
                fallbackSrc={IMAGES.banners.oakChairs}
                alt="Blocks of wood piled up for selection in the timber yard"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="md:col-span-5 flex flex-col space-y-6 pt-2">
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                {timberYardIntro?.title || "Blocks of wood piled up for selection in the timber yard."}
              </p>
              <p className="text-xs md:text-sm text-neutral-800 leading-relaxed font-sans whitespace-pre-line">
                {timberYardIntro?.content || `Wood has been shaped by human hands for centuries, evolving from a material of everyday utility into a medium for skilled craftsmanship and artistic expression.`}
              </p>
            </div>
          </section>
        )}

        <hr className="border-t border-black/10" />

        {/* Section 2: Reclaimed & New Timber Statement & Details */}
        {timberStatement?.is_active !== false && (
          <section className="max-w-3xl space-y-8 md:space-y-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug tracking-tight text-neutral-900">
              {timberStatement?.title || "We use both reclaimed and new timber sourced from verified supply chains in our furniture production."}
            </h2>
            <div className="space-y-6 text-xs sm:text-sm md:text-[15px] text-neutral-800 leading-relaxed font-sans whitespace-pre-line">
              {timberStatement?.content || `A majority of our furniture is made using teak wood (Scientific Name: Tectona grandis). Teak has high oil content, making it moisture, acid and alkali resistant.`}
            </div>
          </section>
        )}

        <hr className="border-t border-black/10" />

        {/* Section 3: Caption (Left) + Teak Blocks Unloaded Image (Right) */}
        {timberUnloaded?.is_active !== false && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="md:col-span-5 pt-2">
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                {timberUnloaded?.content || "Teak blocks and planks, freshly unloaded from shipping containers in the yard of our timber supplier."}
              </p>
            </div>
            <div className="md:col-span-7 aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
              <AppImage
                src={timberUnloaded?.image_url || MATERIAL_LIBRARY_IMAGES.timberBlocksUnloaded}
                fallbackSrc={IMAGES.banners.oakChairs}
                alt="Teak blocks and planks unloaded in yard"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </section>
        )}

        <hr className="border-t border-black/10" />

        {/* Section 4: Traditional Woodworking Communities & Carpenters */}
        {carpenters?.is_active !== false && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="md:col-span-6 flex flex-col space-y-4">
              <div className="w-full aspect-[4/3] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
                <AppImage
                  src={carpenters?.image_url || MATERIAL_LIBRARY_IMAGES.carpenterAtBench}
                  fallbackSrc={IMAGES.craft.workshop}
                  alt="Artisan carpenter woodworking at bench"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="w-full aspect-[3/5] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
                <AppImage
                  src={carpenters?.secondary_image_url || MATERIAL_LIBRARY_IMAGES.carpenterFloorWork}
                  fallbackSrc={MATERIAL_LIBRARY_IMAGES.carpenterFloorWork}
                  alt="Traditional Indian carpenter working on floor with hand tools"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-6 flex flex-col space-y-6 md:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug tracking-tight text-neutral-900">
                {carpenters?.title || "Our carpenters are from various traditional woodworking communities of India."}
              </h2>

              <div className="space-y-4 md:space-y-5 text-xs sm:text-sm md:text-[14px] text-neutral-800 leading-relaxed font-sans whitespace-pre-line">
                {carpenters?.content || `Our factory is in a semi-industrial area on the outskirts of Bangalore, spread over 1500 square meters.`}
              </div>

              <div className="w-full pt-4">
                <div className="aspect-[4/3] sm:aspect-[1/1] bg-[#e5e5e5] relative w-full overflow-hidden shadow-sm">
                  <AppImage
                    src={MATERIAL_LIBRARY_IMAGES.brassTemplates}
                    fallbackSrc={MATERIAL_LIBRARY_IMAGES.brassTemplates}
                    alt="Hand-hammered brass templates with tied twine"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Cane Weaving Statement */}
        {caneWeaving?.is_active !== false && (
          <section className="max-w-3xl space-y-8 pb-16 md:pb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug tracking-tight text-neutral-900">
              {caneWeaving?.title || "Being an intricate craft, cane weaving is both time and labour intensive. Depending on the complexity of the pattern, it can take our artisans anywhere between one and three days to finish weaving a single piece of our furniture."}
            </h2>
          </section>
        )}
      </div>
    </main>
  );
}
