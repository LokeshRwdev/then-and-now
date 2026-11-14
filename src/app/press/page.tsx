import PageBanner from "@/components/layout/PageBanner";
import AppImage from "@/components/ui/AppImage";
import { IMAGES } from "@/lib/images";
import { getStories, getPageSections } from "@/lib/content/contentService";

export default async function PressPage() {
  const [sections, stories] = await Promise.all([
    getPageSections('press'),
    getStories(),
  ]);

  const heroSection = sections.find((s) => s.section_key === 'hero');

  return (
    <>
      <main className="min-h-screen bg-white">
        <PageBanner 
          title={heroSection?.title || "Stories"} 
          subtitle={heroSection?.subtitle || "NOW & THEN COLLECTION"} 
          imageSrc={heroSection?.image_url || IMAGES.hero.home}
          bgColor="bg-[#e5e5e5]" 
        />

        {/* Grid Section */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {stories.map((story: any) => (
                <article key={story.id} className="flex flex-col group cursor-pointer">
                  {/* Image Container */}
                  <div className="w-full aspect-[3/4] bg-[#e5e5e5] mb-6 relative overflow-hidden">
                    <AppImage 
                      src={story.image_url || story.image || IMAGES.placeholders.default} 
                      alt={story.title} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col space-y-3">
                    <h2 className="text-lg md:text-xl font-medium leading-tight whitespace-pre-line">
                      {story.title}
                    </h2>
                    <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      {story.subtitle || 'COLLECTION ARCHIVE'}
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mt-1">
                      {story.content || story.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
