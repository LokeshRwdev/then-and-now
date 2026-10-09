import PageBanner from "@/components/layout/PageBanner";
import AppImage from "@/components/ui/AppImage";
import { IMAGES } from "@/lib/images";
import Link from "next/link";

// Dummy data for the grid
const stories = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  image: "https://images.unsplash.com/photo-1550136513-548af4445338?q=80&w=800&auto=format&fit=crop", // Replace with your actual image links
  title: "Design Specifications\nDesign Specifications",
  subtitle: "Home",
  description: "Provide detailed specifications, drawings, dimensions, and materials to our team. Stellar Works can quote all upholstered, non-upholstered, case goods FF&E."
}));

export default function PressPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <PageBanner 
          title="Stories" 
          subtitle="NOW & THEN COLLECTION" 
          imageSrc={IMAGES.hero.home}
          bgColor="bg-[#e5e5e5]" 
        />

        {/* Grid Section */}
        <section className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {stories.map((story) => (
                <article key={story.id} className="flex flex-col group cursor-pointer">
                  {/* Image Container */}
                  <div className="w-full aspect-[3/4] bg-[#e5e5e5] mb-6 relative overflow-hidden">
                    <AppImage 
                      src={story.image} 
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
                      {story.subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mt-1">
                      {story.description}
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
