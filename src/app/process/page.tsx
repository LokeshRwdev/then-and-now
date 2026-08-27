import PageBanner from '@/components/layout/PageBanner';

const processSteps = [
  { id: '1', title: 'Design & Specifications', desc: 'Initial concepts are transformed into detailed technical drawings, establishing proportions, materials, and structural integrity.' },
  { id: '2', title: 'Quotation', desc: 'A transparent breakdown of costs and timelines, tailored to the bespoke elements of your request.' },
  { id: '3', title: 'Order Placement', desc: 'Upon approval, materials are sourced and your piece enters our production schedule.' },
  { id: '4', title: 'Shop Drawings & Material Samples', desc: 'Final technical reviews and tactile material approvals before fabrication begins.' },
  { id: '5', title: 'Client Review Process', desc: 'Ongoing communication to ensure the developing piece aligns perfectly with expectations.' },
  { id: '6', title: 'Prototype Production (if required)', desc: 'For complex or entirely bespoke designs, a 1:1 prototype may be constructed to test ergonomics and scale.' },
  { id: '7', title: 'Final Coat Production', desc: 'The application of our signature finishes, enhancing grain and providing lasting protection.' },
  { id: '8', title: 'Transport', desc: 'Careful packaging and logistics planning for safe transit.' },
  { id: '9', title: 'Delivery', desc: 'White-glove installation in your space.' },
  { id: '10', title: 'Post-Delivery', desc: 'Ongoing care instructions and warranty support.' },
];

export default function ProcessPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
        <PageBanner 
          title="Process" 
          imageSrc="/process-hero.jpg" 
        />

        {/* Steps Section */}
        <section className="w-full py-32 px-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-32">
            {processSteps.map((step, idx) => (
              <div key={step.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 text-7xl md:text-9xl font-heading text-brand-text/20 leading-none">
                  {step.id}
                </div>
                <div className="md:col-span-9 flex flex-col gap-6 pt-4">
                  <h3 className="text-2xl md:text-4xl font-heading uppercase tracking-widest">{step.title}</h3>
                  <p className="font-sans text-brand-text/80 text-lg leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                  
                  {/* Alternate adding a placeholder image for some steps */}
                  {idx % 3 === 0 && (
                    <div className="w-full aspect-[21/9] bg-gray-300 mt-8"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

    </>
  );
}
