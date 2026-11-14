import PageBanner from "@/components/layout/PageBanner";
import AppImage from "@/components/ui/AppImage";
import { IMAGES } from "@/lib/images";
import { getPageSections } from "@/lib/content/contentService";

export default async function AboutPage() {
  const sections = await getPageSections('about');
  const hero = sections.find((s) => s.section_key === 'hero');
  const statement = sections.find((s) => s.section_key === 'statement');
  const whoWeAre = sections.find((s) => s.section_key === 'who_we_are');
  const evolution = sections.find((s) => s.section_key === 'evolution');
  const team = sections.find((s) => s.section_key === 'team');
  const founder = sections.find((s) => s.section_key === 'founder');

  return (
    <>
      <main className="min-h-screen bg-white text-[#1A1A1A]">
        {/* Hero Banner */}
        <PageBanner
          title={hero?.title || "About us"}
          imageSrc={hero?.image_url || IMAGES.about.hero}
          bgColor="bg-[#e5e5e5]"
          height="h-[60vh] md:h-[75vh]"
        />

        {/* Black Statement Section */}
        {statement?.is_active !== false && (
          <section className="w-full bg-black text-white py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm sm:text-base md:text-[17px] font-light leading-relaxed tracking-normal text-neutral-200">
                {statement?.content || `The best work is built through meaningful, long-term partnerships. Now & Then collaborates with designers, manufacturers, craftsmen, and makers across the country to create work that is thoughtful, enduring, and rooted in the richness of Indian craft and contemporary design.`}
              </p>
            </div>
          </section>
        )}

        {/* White Editorial Content Section */}
        <section className="w-full bg-white py-16 sm:py-20 md:py-28 lg:py-36 px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-5xl xl:max-w-6xl mx-auto flex flex-col">
            
            {/* 1. Who We Are */}
            {whoWeAre?.is_active !== false && (
              <>
                <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start text-left mb-16 sm:mb-20 md:mb-24">
                  <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                    {whoWeAre?.title || "Who We Are"}
                  </h2>
                  <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans whitespace-pre-line">
                    {whoWeAre?.content || `Now & Then is an Indian design studio creating furniture, lighting, and objects that bring together contemporary design, craftsmanship, and materiality.`}
                  </div>
                </div>

                {/* Image 1: Studio / Exhibition Photo */}
                <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start mb-24 sm:mb-28 md:mb-36 aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden bg-[#e5e5e5] shadow-sm">
                  <AppImage
                    src={whoWeAre?.image_url || IMAGES.about.exhibition}
                    fallbackSrc={IMAGES.about.hero}
                    alt={whoWeAre?.title || "Now & Then Studio Exhibition"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 750px"
                    className="object-cover"
                    priority
                  />
                </div>
              </>
            )}

            {/* 2. Evolution */}
            {evolution?.is_active !== false && (
              <>
                <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-end ml-auto text-left mb-16 sm:mb-20 md:mb-24">
                  <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                    {evolution?.title || "Evolution"}
                  </h2>
                  <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans whitespace-pre-line">
                    {evolution?.content || `Now & Then began in 2022, from a personal desire to create something of my own within the world of design.`}
                  </div>
                </div>

                {/* Image 2: Handcrafted Console Table */}
                <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-end ml-auto mb-24 sm:mb-28 md:mb-36 aspect-[16/10] relative overflow-hidden bg-[#e5e5e5] shadow-sm">
                  <AppImage
                    src={evolution?.image_url || IMAGES.about.console}
                    fallbackSrc={IMAGES.products.product2}
                    alt={evolution?.title || "Now & Then Handcrafted Console Table"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 750px"
                    className="object-cover"
                  />
                </div>
              </>
            )}

            {/* 3. Our Team */}
            {team?.is_active !== false && (
              <>
                <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start text-left mb-16 sm:mb-20 md:mb-24">
                  <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                    {team?.title || "Our Team"}
                  </h2>
                  <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans whitespace-pre-line">
                    {team?.content || `Behind Now & Then is a growing team of designers, makers, and craftsmen who bring different skills, perspectives, and experiences to every project.`}
                  </div>
                </div>

                {/* Image 3: Team / Workshop Photo */}
                <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start mb-24 sm:mb-28 md:mb-36 aspect-[4/3] sm:aspect-[16/10] relative overflow-hidden bg-[#e5e5e5] shadow-sm">
                  <AppImage
                    src={team?.image_url || IMAGES.about.team}
                    fallbackSrc={IMAGES.about.hero}
                    alt={team?.title || "Now & Then Team & Making"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 750px"
                    className="object-cover"
                  />
                </div>
              </>
            )}

            {/* 4. Founder */}
            {founder?.is_active !== false && (
              <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-end ml-auto text-left mb-16 sm:mb-20 md:mb-28">
                <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                  {founder?.title || "Founder"}
                </h2>
                <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans whitespace-pre-line">
                  {founder?.content || `Now & Then, founded by Architect Nihal Musthafa, is rooted in a reflection on time and the act of creation.`}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Artisanal Quality Statement Banner */}
        <section className="w-full bg-black text-white py-20 sm:py-24 md:py-32 lg:py-36 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-light leading-snug md:leading-normal tracking-wide text-white">
              Artisanal Quality: Each furniture piece is
              <br className="hidden sm:inline" />{" "}
              meticulously handcrafted.
            </h2>
          </div>
        </section>
      </main>
    </>
  );
}
