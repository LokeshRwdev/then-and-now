import PageBanner from "@/components/layout/PageBanner";
import Image from 'next/image';

export default function MaterialLibraryPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A1A]">
      <PageBanner 
        title="Materials" 
        subtitle="NOW & THEN" 
        imageSrc="/materials-hero.jpg" 
        bgColor="bg-[#e5e5e5]" 
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 space-y-24 md:space-y-32">
        
        {/* Carpenters Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
          <div className="md:col-span-6 aspect-[4/3] bg-[#e5e5e5] relative">
             {/* <Image src="/carpenter-1.jpg" alt="Carpenter smiling" fill className="object-cover" /> */}
          </div>
          <div className="md:col-span-6 space-y-8">
            <h2 className="text-2xl md:text-3xl font-light leading-snug">
              Our carpenters are from various traditional woodworking communities of India and hail from Rajasthan, Uttar Pradesh, Bihar, Bengal, and Kerala.
            </h2>
            <div className="space-y-6 text-sm text-gray-800 leading-relaxed">
              <p>Our factory is in a semi-industrial area on the outskirts of Bangalore, spread over 1500 square meters. Production facilities include outdoor and indoor areas with plenty of natural light and ventilation that provide a healthy and inspiring work environment. Exhaust fans and LED lights supplement natural lighting and ventilation.</p>
              <p>Like most carpenters in India, our carpenters sit and work on the floor. This allows them to use not just their hands, but also their feet to hold the wood in place while they work on it. Each carpenter has their own set of hand tools, which they sharpen and clean everyday as a ritual.</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
          <div className="md:col-span-6 aspect-[3/4] bg-[#e5e5e5] relative">
             {/* <Image src="/carpenter-2.jpg" alt="Carpenter working" fill className="object-cover" /> */}
          </div>
          <div className="md:col-span-6 flex flex-col h-full space-y-12">
            <div className="space-y-6 text-sm text-gray-800 leading-relaxed md:pt-12">
              <p>While craftsmanship using hand tools is at our core, our carpentry workshop is also equipped with classical woodworking machines like planers, thicknessers, routers, table saws, and band saws to perform precision operations in cutting, sizing, routing, drilling, etc. All our machines are connected to dust collectors that keep the workshop relatively clean and reduce atmospheric dust.</p>
              <p>We are fully compliant with health and safety regulations specified in the Factories Act of India. First-aid kits are available in all our workspaces and multiple fire extinguishers are present in each area. Fire safety training is conducted frequently. Carpenters who work on machines are trained and mandated to use personal safety equipment like masks, safety goggles, gloves, etc.</p>
            </div>
            <div className="w-full sm:w-3/4 self-start sm:self-end">
              <div className="aspect-[4/3] bg-[#e5e5e5] relative w-full">
                 {/* <Image src="/materials-close-up.jpg" alt="Materials close up" fill className="object-cover" /> */}
              </div>
            </div>
          </div>
        </section>

        <hr className="border-black/10" />

        {/* Timber Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 aspect-[2/1] bg-[#e5e5e5] relative">
             {/* <Image src="/timber-yard.jpg" alt="Blocks of wood" fill className="object-cover" /> */}
          </div>
          <div className="md:col-span-4">
            <p className="text-xs md:text-sm text-gray-600">
              Blocks of wood piled up for selection in the timber yard.
            </p>
          </div>
        </section>

        <hr className="border-black/10" />

        <section className="max-w-3xl space-y-12">
          <h2 className="text-3xl md:text-4xl font-light leading-snug">
            We use both reclaimed and new timber sourced from verified supply chains in our furniture production.
          </h2>
          <div className="space-y-6 text-sm text-gray-800 leading-relaxed">
            <p>A majority of our furniture is made using teak wood (Scientific Name: Tectona grandis). Teak has high oil content, making it moisture, acid and alkali resistant. Weather changes don't impact its shape. It is seldom affected by insects, borers or fungi. This makes the wood fantastically durable. The wood's warm brown colour is a vibrant neutral that fits into a variety of environments and pairs with almost any shade. The teak we use is sourced from teak growing regions of India.</p>
            <p>We use both reclaimed and new timber.</p>
            <p>Reclaimed timber is sourced from rafters of old buildings that are demolished and are usually over a hundred years old. We carefully select beams and rafters to ensure that they are suitable for our furniture. These are then cut into planks and sized to required dimensions in our workshop.</p>
            <p>We purchase new timber from suppliers who are reputed and whose supply chain can be verified. We ensure that the timber is ethically harvested and verify the origin certificate and documentation of every new batch we procure. New wood is air dried and seasoned in our warehouse for several months to bring down their moisture levels and make them perfect for furniture making.</p>
            <p>We are expanding our repertoire of timber beyond teak and plan to introduce new collections with timbers like oak, cherry and walnut.</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-black/10 pt-16">
          <div className="md:col-span-4 order-2 md:order-1">
            <p className="text-xs md:text-sm text-gray-600">
              Teak blocks and planks, freshly unloaded from shipping containers in the yard of our timber supplier.
            </p>
          </div>
          <div className="md:col-span-8 aspect-[2/1] bg-[#e5e5e5] relative order-1 md:order-2">
             {/* <Image src="/teak-blocks.jpg" alt="Teak blocks and planks" fill className="object-cover" /> */}
          </div>
        </section>

        {/* Cane Weaving Section */}
        <section className="max-w-3xl space-y-12 pb-20">
          <h2 className="text-2xl md:text-3xl font-light leading-snug">
            Being an intricate craft, cane weaving is both time and labour intensive. Depending on the complexity of the pattern, it can take our artisans anywhere between one and three days to finish weaving a single piece of our furniture.
          </h2>
        </section>

      </div>
    </main>
  );
}
