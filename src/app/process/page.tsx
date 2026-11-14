import PageBanner from '@/components/layout/PageBanner';
import AppImage from '@/components/ui/AppImage';
import { IMAGES } from '@/lib/images';
import { getProcessSteps } from '@/lib/content/contentService';
import rawProcessSteps from '@/data/process-steps.json';

export default async function ProcessPage() {
  const fetchedSteps = await getProcessSteps();
  const steps = (fetchedSteps && fetchedSteps.length > 0 ? fetchedSteps : rawProcessSteps) as any[];

  return (
    <>
      <main className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
        <PageBanner 
          title="Process" 
          imageSrc={IMAGES.hero.process} 
        />

        {/* Steps Section */}
        <section className="w-full py-24 md:py-36 px-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-28 md:gap-36">
            {steps.map((step) => {
              const stepNumber = step.step_number || step.stepNumber || '01';
              const heading = step.heading || step.title || '';
              const subheading = step.subheading || step.subtitle || '';
              const paragraph = step.paragraph || step.content || '';
              const image = step.image_url || step.image || IMAGES.placeholders.default;

              return (
                <div 
                  key={step.id} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
                >
                  {/* Step Number on Left */}
                  <div className="md:col-span-3 text-7xl md:text-9xl font-light text-black leading-none select-none">
                    {stepNumber}
                  </div>

                  {/* Content Stack on Right */}
                  <div className="md:col-span-9 flex flex-col pt-1 md:pt-3">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black leading-snug">
                      {heading}
                    </h2>

                    {/* Subheading */}
                    {subheading && (
                      <p className="text-xs md:text-sm uppercase tracking-widest text-black/60 font-medium mt-2">
                        {subheading}
                      </p>
                    )}

                    {/* Paragraph */}
                    <p className="font-sans text-black/75 text-sm md:text-[15px] leading-relaxed max-w-xl mt-4">
                      {paragraph}
                    </p>

                    {/* Step Image */}
                    {image && (
                      <div className="w-full aspect-[21/9] sm:aspect-[24/10] bg-[#dfdbd3] relative overflow-hidden mt-8">
                        <AppImage 
                          src={image} 
                          alt={`${heading} illustration`} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 680px"
                          className="object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
