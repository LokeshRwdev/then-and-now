import PageBanner from "@/components/layout/PageBanner";
import AppImage from "@/components/ui/AppImage";
import { IMAGES } from "@/lib/images";

/**
 * ============================================================================
 * MATERIAL LIBRARY IMAGES ARRAY / CONFIG
 * ============================================================================
 * All images follow the top-to-bottom sequence of the Figma design.
 * You can easily upload/replace images in /public/images/material-library/
 */
export const MATERIAL_LIBRARY_IMAGES = {
  // 0. Hero Banner (Top of the page)
  heroBanner: "/images/material-library/hero-banner.png",

  // 1. Timber yard intro / wood philosophy (Section 1 - Left column)
  timberYardIntro: "/images/material-library/timber-yard-intro.png",

  // 2. Teak blocks & planks freshly unloaded (Section 3 - Right column)
  timberBlocksUnloaded: "/images/material-library/timber-blocks-unloaded.png",

  // 3. Traditional carpenter smiling at workbench (Section 4 - Top left)
  carpenterAtBench: "/images/material-library/carpenter-at-bench.png",

  // 4. Artisan carpenter sitting barefoot on floor (Section 4 - Bottom left)
  carpenterFloorWork: "/images/material-library/carpenter-floor-work.png",

  // 5. Hand-hammered brass templates with tied twine (Section 4 - Lower right)
  brassTemplates: "/images/material-library/brass-templates.png",

  // 6. Timber yard wood selection (Section 5 - Left column)
  timberYardSelection: "/images/material-library/timber-yard-intro.png",
};

/**
 * Array representation for convenient reference and sequential updates:
 */
export const MATERIAL_IMAGES_LIST = [
  {
    id: "hero-banner",
    label: "0. Hero Banner (Top)",
    src: MATERIAL_LIBRARY_IMAGES.heroBanner,
    fallback: "/images/banners/oak-chairs.png",
  },
  {
    id: "timber-yard-intro",
    label: "1. Section 1 - Timber Yard Intro (Top Left)",
    src: MATERIAL_LIBRARY_IMAGES.timberYardIntro,
    fallback: "/images/banners/oak-chairs.png",
  },
  {
    id: "timber-blocks-unloaded",
    label: "2. Section 3 - Teak Blocks & Planks Unloaded (Right)",
    src: MATERIAL_LIBRARY_IMAGES.timberBlocksUnloaded,
    fallback: "/images/banners/oak-chairs.png",
  },
  {
    id: "carpenter-at-bench",
    label: "3. Section 4 - Carpenter at Workbench (Top Left)",
    src: MATERIAL_LIBRARY_IMAGES.carpenterAtBench,
    fallback: "/images/craft/workshop.jpg",
  },
  {
    id: "carpenter-floor-work",
    label: "4. Section 4 - Carpenter Working on Floor (Bottom Left)",
    src: MATERIAL_LIBRARY_IMAGES.carpenterFloorWork,
    fallback: "/images/material-library/carpenter-floor-work.png",
  },
  {
    id: "brass-templates",
    label: "5. Section 4 - Brass Templates & Twine (Lower Right)",
    src: MATERIAL_LIBRARY_IMAGES.brassTemplates,
    fallback: "/images/material-library/brass-templates.png",
  },
  {
    id: "timber-yard-intro",
    label: "6. Section 5 - Timber Yard Selection (Left)",
    src: MATERIAL_LIBRARY_IMAGES.timberYardSelection,
    fallback: "/images/banners/oak-chairs.png",
  },
];

export default function MaterialLibraryPage() {
  const images = MATERIAL_LIBRARY_IMAGES;

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      <PageBanner
        title="Material Library"
        imageSrc={images.heroBanner}
        fallbackSrc={IMAGES.banners.oakChairs}
        bgColor="bg-[#e5e5e5]"
        height="h-[60vh] md:h-[75vh]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* Section 1: Timber Yard Intro (Left) + Wood Philosophy (Right) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="md:col-span-7 aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
            <AppImage
              src={images.timberYardIntro}
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
              Blocks of wood piled up for selection in the timber yard.
            </p>
            <p className="text-xs md:text-sm text-neutral-800 leading-relaxed font-sans">
              Wood has been shaped by human hands for centuries, evolving from a
              material of everyday utility into a medium for skilled
              craftsmanship and artistic expression. Carving wood demands
              patience, precision, and an intimate understanding of its grain,
              density, and natural movement. Every piece carries the
              individuality of the material itself. The variations in grain,
              texture, and form are embraced through the carving process,
              allowing the inherent warmth and organic character of wood to
              remain at the heart of each creation.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/10" />

        {/* Section 2: Reclaimed & New Timber Statement & Details */}
        <section className="max-w-3xl space-y-8 md:space-y-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug tracking-tight text-neutral-900">
            We use both reclaimed and new timber sourced from verified supply
            chains in our furniture production.
          </h2>
          <div className="space-y-6 text-xs sm:text-sm md:text-[15px] text-neutral-800 leading-relaxed font-sans">
            <p>
              A majority of our furniture is made using teak wood (Scientific
              Name: Tectona grandis). Teak has high oil content, making it
              moisture, acid and alkali resistant. Weather changes don&apos;t
              impact its shape. It is seldom affected by insects, borers or
              fungi. This makes the wood fantastically durable. The wood&apos;s
              warm brown colour is a vibrant neutral that fits into a variety of
              environments and pairs with almost any shade. The teak we use is
              sourced from teak growing regions of India.
            </p>
            <p className="font-medium text-neutral-900">
              We use both reclaimed and new timber.
            </p>
            <p>
              Reclaimed timber is sourced from rafters of old buildings that are
              demolished and are usually over a hundred years old. We carefully
              select beams and rafters to ensure that they are suitable for our
              furniture. These are then cut into planks and sized to required
              dimensions in our workshop.
            </p>
            <p>
              We purchase new timber from suppliers who are reputed and whose
              supply chain can be verified. We ensure that the timber is
              ethically harvested and verify the origin certificate and
              documentation of every new batch we procure. New wood is air dried
              and seasoned in our warehouse for several months to bring down
              their moisture levels and make them perfect for furniture making.
            </p>
            <p>
              We are expanding our repertoire of timber beyond teak and plan to
              introduce new collections with timbers like oak, cherry and
              walnut.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/10" />

        {/* Section 3: Caption (Left) + Teak Blocks Unloaded Image (Right) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="md:col-span-5 pt-2">
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
              Teak blocks and planks, freshly unloaded from shipping containers
              in the yard of our timber supplier.
            </p>
          </div>
          <div className="md:col-span-7 aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
            <AppImage
              src={images.timberBlocksUnloaded}
              fallbackSrc={IMAGES.banners.oakChairs}
              alt="Teak blocks and planks unloaded in yard"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </section>

        <hr className="border-t border-black/10" />

        {/* Section 4: Traditional Woodworking Communities & Carpenters (Unified Figma Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Two Stacked Carpenter Images */}
          <div className="md:col-span-6 flex flex-col space-y-4">
            {/* Top: Carpenter at Bench */}
            <div className="w-full aspect-[4/3] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
              <AppImage
                src={images.carpenterAtBench}
                fallbackSrc={IMAGES.craft.workshop}
                alt="Artisan carpenter woodworking at bench"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Bottom: Traditional Carpenter Working Barefoot on Floor */}
            <div className="w-full aspect-[3/5] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
              <AppImage
                src={images.carpenterFloorWork}
                fallbackSrc={images.carpenterFloorWork}
                alt="Traditional Indian carpenter working on floor with hand tools"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Heading, All 4 Paragraphs, and Brass Templates Image */}
          <div className="md:col-span-6 flex flex-col space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug tracking-tight text-neutral-900">
              Our carpenters are from various traditional woodworking
              communities of India and hail from Rajasthan, Uttar Pradesh,
              Bihar, Bengal, and Kerala.
            </h2>

            <div className="space-y-4 md:space-y-5 text-xs sm:text-sm md:text-[14px] text-neutral-800 leading-relaxed font-sans">
              <p>
                Our factory is in a semi-industrial area on the outskirts of
                Bangalore, spread over 1500 square meters. Production facilities
                include outdoor and indoor areas with plenty of natural light
                and ventilation that provide a healthy and inspiring work
                environment. Exhaust fans and LED lights supplement natural
                lighting and ventilation.
              </p>
              <p>
                Like most carpenters in India, our carpenters sit and work on
                the floor. This allows them to use not just their hands, but
                also their feet to hold the wood in place while they work on it.
                Each carpenter has their own set of hand tools, which they
                sharpen and clean everyday as a ritual.
              </p>
              <p>
                While craftsmanship using hand tools is at our core, our
                carpentry workshop is also equipped with classical woodworking
                machines like planers, thicknessers, routers, table saws, and
                band saws to perform precision operations in cutting, sizing,
                routing, drilling, etc. All our machines are connected to dust
                collectors that keep the workshop relatively clean and reduce
                atmospheric dust.
              </p>
              <p>
                We are fully compliant with health and safety regulations
                specified in the Factories Act of India. First-aid kits are
                available in all our workspaces and multiple fire extinguishers
                are present in each area. Fire safety training is conducted
                frequently. Carpenters who work on machines are trained and
                mandated to use personal safety equipment like masks, safety
                goggles, gloves, etc.
              </p>
            </div>

            {/* Hand-hammered Brass Templates & Twine */}
            <div className="w-full pt-4">
              <div className="aspect-[4/3] sm:aspect-[1/1] bg-[#e5e5e5] relative w-full overflow-hidden shadow-sm">
                <AppImage
                  src={images.brassTemplates}
                  fallbackSrc={images.brassTemplates}
                  alt="Hand-hammered brass templates with tied twine"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-black/10" />

        {/* Section 5: Timber Yard Selection (Exact Figma Design matching Image 2) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="md:col-span-7 aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
            <AppImage
              src={images.timberYardSelection}
              fallbackSrc={IMAGES.banners.oakChairs}
              alt="Blocks of wood piled up for selection in the timber yard"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-5 pt-2">
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
              Blocks of wood piled up for selection in the timber yard.
            </p>
          </div>
        </section>

        {/* Section 6: Cane Weaving Statement (Matching Figma Design) */}
        <section className="max-w-3xl space-y-8 pb-16 md:pb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug tracking-tight text-neutral-900">
            Being an intricate craft, cane weaving is both time and labour
            intensive. Depending on the complexity of the pattern, it can take
            our artisans anywhere between one and three days to finish weaving a
            single piece of our furniture.
          </h2>
        </section>
      </div>
    </main>
  );
}
