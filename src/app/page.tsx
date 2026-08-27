import Header from '@/components/layout/Header';

import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between">
        
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center pt-24 px-6">
          <div className="absolute inset-0 z-0">
            {/* Placeholder for hero image with warm hue */}
            <div className="w-full h-full bg-[#E58550] object-cover" />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start pt-20">
            <div className="max-w-md bg-brand-bg/90 p-8 backdrop-blur-sm mix-blend-screen text-brand-text">
              <h1 className="text-4xl md:text-5xl font-heading leading-tight mb-4">
                Unveiling the intimate narrative of empowerment...
              </h1>
              <p className="text-sm uppercase tracking-widest opacity-60">Discover our collection</p>
            </div>
            <div className="hidden md:flex flex-col gap-2 text-xs uppercase tracking-widest text-white mix-blend-difference mt-20 text-right">
              <span>Handcrafted in Studio</span>
              <span>EST. 2024</span>
            </div>
          </div>
        </section>

        {/* Page Navigation Links */}
        <section className="w-full py-24 px-6 flex justify-center bg-brand-bg">
          <div className="flex flex-col items-center text-center gap-8 font-heading text-4xl md:text-6xl uppercase tracking-tighter">
            <a href="/lights" className="hover:text-brand-accent transition-colors">LIGHTS</a>
            <a href="/process" className="hover:text-brand-accent transition-colors">PROCESS</a>
            <a href="/materials" className="hover:text-brand-accent transition-colors">MATERIAL LIBRARY</a>
          </div>
        </section>

        {/* Statement */}
        <section className="w-full py-24 px-6 bg-[#1A1A1A] text-[#EAE6DF] text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading leading-snug">
              Modern manufacture furniture.<br/>We craft enduring objects.
            </h2>
            <p className="mt-8 text-sm md:text-base opacity-70 max-w-xl mx-auto font-sans leading-relaxed">
              Our approach to design emphasizes the raw, natural beauty of the materials we use, bringing a sense of timeless elegance to every space.
            </p>
          </div>
        </section>

        {/* Marquetry Featured Section */}
        <section className="w-full bg-brand-bg relative py-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <h2 className="text-5xl md:text-7xl font-heading mb-6">Marquetry</h2>
              <p className="font-sans text-brand-text/80 leading-relaxed mb-8">
                An ancient technique reborn. We use meticulously cut wood veneers to create intricate patterns and designs that elevate our furniture from mere objects to functional art.
              </p>
              <a href="/products/marquetry" className="inline-block border-b border-brand-text pb-1 uppercase tracking-widest text-sm hover:text-brand-accent hover:border-brand-accent transition-colors">
                Explore Collection
              </a>
            </div>
            <div className="md:col-span-7 order-1 md:order-2 h-[60vh] bg-gray-300 relative">
               {/* Image placeholder */}
            </div>
          </div>
        </section>

        {/* Artisanal Quality */}
        <section className="w-full py-32 px-6 bg-brand-bg text-center">
          <h2 className="text-2xl md:text-4xl font-heading max-w-4xl mx-auto leading-relaxed">
            Artisanal Quality: Each furniture piece is meticulously handcrafted.
          </h2>
        </section>

        {/* Custom isn't extra */}
        <section className="w-full bg-[#1A1A1A] text-[#EAE6DF] py-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="h-[70vh] bg-gray-700 relative">
              {/* Image Placeholder */}
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-heading leading-tight mb-8">
                Custom isn't extra. It's expected. <br/>So DON'T settle for bespoke.<br/>Either way, it's made for you.
              </h2>
            </div>
          </div>
        </section>

        {/* Enhance your space */}
        <section className="w-full bg-brand-bg py-32">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading leading-relaxed mb-6">
                Enhance your indoor and outdoor spaces with our timeless, century-old solid oak timber furniture. Designed to withstand the test of time, our pieces will enrich your daily life now and for generations to come.
              </h2>
              <a href="/objects" className="inline-block border-b border-brand-text pb-1 uppercase tracking-widest text-sm hover:text-brand-accent hover:border-brand-accent transition-colors">
                View Objects
              </a>
            </div>
            <div className="h-[50vh] bg-gray-300 relative mt-12 md:mt-32">
               {/* Image placeholder */}
            </div>
          </div>
        </section>

      </main>

    </>
  );
}
