import PageBanner from "@/components/layout/PageBanner";
import AppImage from "@/components/ui/AppImage";
import { IMAGES } from "@/lib/images";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-[#1A1A1A]">
        {/* Hero Banner */}
        <PageBanner
          title="About us"
          imageSrc={IMAGES.about.hero}
          bgColor="bg-[#e5e5e5]"
          height="h-[60vh] md:h-[75vh]"
        />

        {/* Black Statement Section */}
        <section className="w-full bg-black text-white py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm sm:text-base md:text-[17px] font-light leading-relaxed tracking-normal text-neutral-200">
              The best work is built through meaningful, long-term partnerships.
              Now &amp; Then collaborates with designers, manufacturers, craftsmen,
              and makers across the country to create work that is thoughtful,
              enduring, and rooted in the richness of Indian craft and contemporary
              design.
            </p>
          </div>
        </section>

        {/* White Editorial Content Section with Staggered Luxury Editorial Alignment */}
        <section className="w-full bg-white py-16 sm:py-20 md:py-28 lg:py-36 px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="max-w-5xl xl:max-w-6xl mx-auto flex flex-col">
            {/* 1. Who We Are (Aligned Left) */}
            <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start text-left mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                Who We Are
              </h2>
              <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans">
                <p>
                  Now &amp; Then is an Indian design studio creating furniture, lighting,
                  and objects that bring together contemporary design, craftsmanship,
                  and materiality.
                </p>
                <p>
                  Working across the country and between collectible design and
                  industrial production, we collaborate with ambitious designers and
                  skilled manufacturers to develop thoughtful, enduring pieces.
                </p>
                <p>
                  Our work is driven by a belief in creating pieces that belong to the
                  present, while allowing time to become part of their story
                  balancing design integrity with lasting cultural, aesthetic, and
                  commercial value.
                </p>
              </div>
            </div>

            {/* Image 1: Studio / Exhibition Photo (Aligned Left) */}
            <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start mb-24 sm:mb-28 md:mb-36 aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden bg-[#e5e5e5] shadow-sm">
              <AppImage
                src={IMAGES.about.exhibition}
                fallbackSrc={IMAGES.about.hero}
                alt="Now & Then Studio Exhibition"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 750px"
                className="object-cover"
                priority
              />
            </div>

            {/* 2. Evolution (Shifted Right / Indented) */}
            <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-end ml-auto text-left mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                Evolution
              </h2>
              <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans">
                <p>
                  Now &amp; Then began in 2022, from a personal desire to create
                  something of my own within the world of design. As an architect, I
                  had always been drawn to the relationship between spaces,
                  objects, materials, and the people who experience them. Over
                  time, I found myself increasingly interested in what happens
                  beyond the space itself–the objects that inhabit it, the way they
                  are made, and the stories they carry. The idea for Now &amp; Then
                  grew from this curiosity. I wanted to create furniture and objects
                  that were not simply designed to fill a space, but had a presence of
                  their own. Pieces where the material, the making, and the details
                  could be appreciated, and where the process of creating was as
                  important as the final object.
                </p>
                <p>
                  The name Now &amp; Then came from this way of thinking. &ldquo;Now&rdquo;
                  represents the excitement of an idea taking shape–the sketches,
                  conversations, experiments, and making. &ldquo;Then&rdquo; is what happens
                  after: when the piece leaves the studio, enters someone&apos;s space,
                  and begins a life of its own. What started as an idea has gradually
                  evolved into a studio working with designers, craftsmen, and
                  manufacturers across the country. With every project, the
                  understanding of what Now &amp; Then can be continues to grow.
                  The journey is still evolving. And perhaps that is what Now &amp; Then
                  is ultimately about–creating in the present, while knowing that
                  time will give each piece a story of its own.
                </p>
              </div>
            </div>

            {/* Image 2: Handcrafted Console Table (Aligned Right) */}
            <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-end ml-auto mb-24 sm:mb-28 md:mb-36 aspect-[16/10] sm:aspect-[16/10] relative overflow-hidden bg-[#e5e5e5] shadow-sm">
              <AppImage
                src={IMAGES.about.console}
                fallbackSrc={IMAGES.products.product2}
                alt="Now & Then Handcrafted Console Table"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 750px"
                className="object-cover"
              />
            </div>

            {/* 3. Our Team (Aligned Left) */}
            <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start text-left mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                Our Team
              </h2>
              <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans">
                <p>
                  Behind Now &amp; Then is a growing team of designers, makers, and
                  craftsmen who bring different skills, perspectives, and
                  experiences to every project. We believe good design is a
                  collective process. From the first idea and drawings to material
                  selection, making, and finishing, each person contributes to
                  shaping the final piece. Working closely with designers, artisans,
                  and manufacturing partners across the country, our team brings
                  together creative thinking and skilled making to turn ideas into
                  objects that are made to last.
                </p>
              </div>
            </div>

            {/* Image 3: Team / Workshop Photo (Aligned Left) */}
            <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-start mb-24 sm:mb-28 md:mb-36 aspect-[4/3] sm:aspect-[16/10] relative overflow-hidden bg-[#e5e5e5] shadow-sm">
              <AppImage
                src={IMAGES.about.team}
                fallbackSrc={IMAGES.about.hero}
                alt="Now & Then Team & Making"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 750px"
                className="object-cover"
              />
            </div>

            {/* 4. Founder (Shifted Right / Indented) */}
            <div className="w-full sm:w-[88%] md:w-[72%] lg:w-[62%] self-end ml-auto text-left mb-16 sm:mb-20 md:mb-28">
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-normal text-neutral-900 mb-6 sm:mb-8 tracking-tight text-left">
                Founder
              </h2>
              <div className="space-y-6 text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-800 text-left font-sans">
                <p>
                  Now &amp; Then, founded by Architect Nihal Musthafa, is rooted in a
                  reflection on time and the act of creation–the relationship
                  between what is created now and what it becomes then. &ldquo;Now&rdquo; is
                  the moment where an idea takes form; where materials are
                  shaped, decisions are made, and something begins to exist. &ldquo;Then&rdquo;
                  is what follows–the object, the experience, and the story that
                  unfolds with time. At Now &amp; Then, this passage of time is an
                  essential part of the design process. Each piece begins as an idea
                  in the present, brought to life through considered design, material,
                  and craftsmanship, while being imagined for a future where it can
                  acquire its own character and meaning. We create pieces that
                  belong to the present, while allowing time to become part of their
                  story. The philosophy extends beyond furniture. It is an exploration
                  of how an idea becomes an object, how an object becomes part of
                  a space, and how, with time, it becomes part of someone&apos;s story.
                  Now &amp; Then creates contemporary pieces with an appreciation
                  for craft, materiality, and permanence–objects designed not only
                  to exist today, but to become something more with time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Artisanal Quality Statement Banner (Above Footer) */}
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
