import PageBanner from "@/components/layout/PageBanner";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
      <PageBanner 
        title="Our Capabilities" 
        subtitle="NOW & THEN COLLECTION" 
        bgColor="bg-[#e5e5e5]" 
      />

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Blue underlined text block */}
          <div className="text-center mb-20">
            <p className="text-xl md:text-2xl leading-relaxed text-[#0066cc] font-medium inline-block relative">
              <span className="underline decoration-2 underline-offset-4">
                Our furniture stands as a culmination of centuries of craft
                knowledge,
              </span>
              <br className="hidden md:block" />
              <span className="underline decoration-2 underline-offset-4">
                and skill, passed down from generation to generation. The name
              </span>
              <br className="hidden md:block" />
              <span className="underline decoration-2 underline-offset-4">
                'Phantom Hands' is a homage to the legacy of these past
                artisans,
              </span>
              <br className="hidden md:block" />
              <span className="underline decoration-2 underline-offset-4">
                whose contributions manifest in every piece we make.
              </span>
            </p>
          </div>

          {/* Large Hero Placeholder Image */}
          <div className="w-full h-[400px] md:h-[600px] bg-[#e5e5e5] mb-24 relative">
            {/* <Image src="/placeholder-hero.jpg" alt="Hero Image" fill className="object-cover" /> */}
          </div>

          {/* Who We Are Section */}
          <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
            <h2 className="text-lg md:text-xl font-medium mb-8">Who We Are</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              We are Bangalore-based furniture makers who believe deeply in the
              unique, aesthetic pleasure of crafted furniture.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              We operate at the intersection of modernist design histories from
              the Indian subcontinent, contemporary design, and craft based
              production.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Our workshop, while physically an ecosystem of skilled carpenters,
              wood polishers, cane weavers, upholsterers, and tailors, from
              craft communities across India, is in spirit, a living archive of
              material intelligence.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Through our research and practice, we function as creative
              custodians and stewards of modernism from our region, which was,
              and continues to be, defined by its use of local materials and
              craft traditions, while assimilating global influences.
            </p>
          </div>

          {/* Image + Caption 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full mb-24">
            <div className="h-[300px] md:h-[400px] bg-[#e5e5e5] relative w-full">
              {/* <Image src="/placeholder-1.jpg" alt="Vintage furniture" fill className="object-cover" /> */}
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0">
                Image caption: Vintage furniture displayed at the Chandigarh
                Museum of Architecture.
                <br />
                Image courtesy: Phantom Hands Archive.
              </p>
            </div>
          </div>

          {/* Evolution Section */}
          <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
            <h2 className="text-lg md:text-xl font-medium mb-8">Evolution</h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Phantom Hands began in 2014 as a monthly catalogue of vintage
              objects, researched and curated by Aparna Rao and{" "}
              <Link href="#" className="underline underline-offset-2">
                Deepak Srinath
              </Link>
              .
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              In their quest to find heirloom design with a high standard of
              craftsmanship, Aparna and Deepak stumbled onto design histories of
              the cosmopolitan modernism that defined the early years of
              independent India.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Being more inclined towards furniture in which simplicity,
              proportion, and the logic of construction stood out, they were
              fascinated when they encountered the modernist furniture made for
              the city of Chandigarh in the 1950s. This fascination sparked the
              idea of remaking those designs, which opened the doors to a much
              deeper exploration of the intersection between modernist design
              and craft traditions.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Today, Phantom Hands' products—a mix of original collections, as
              well as re-editions of designs by iconic South Asian modernists
              like Geoffrey Bawa—are seen in several international design
              spaces, as well as in the homes of discerning aesthetes around the
              world.
            </p>
          </div>

          {/* Image + Caption 2 (Reversed) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full mb-24">
            <div className="order-2 md:order-1 text-center md:text-right flex justify-end">
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0 md:ml-auto">
                Image caption: Chairs from Phantom Hands' first collection of
                furniture. Project Chandigarh.
                <br />
                Image courtesy: Martien Mulder.
              </p>
            </div>
            <div className="order-1 md:order-2 h-[300px] md:h-[400px] bg-[#e5e5e5] relative w-full">
              {/* <Image src="/placeholder-2.jpg" alt="Chairs collection" fill className="object-cover" /> */}
            </div>
          </div>

          {/* First Collection Section */}
          <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
            <h2 className="text-lg md:text-xl font-medium mb-8">
              First Collection
            </h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Aparna and Deepak's curiosity about the{" "}
              <Link href="#" className="underline underline-offset-2">
                authorship and copyright
              </Link>{" "}
              of Chandigarh's mid-century modern furniture was driven by the
              intent to have their offerings be completely above board. Their
              search for these took them on a journey from Chandigarh to Geneva,
              via Montreal and Paris.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              What emerged from this expedition was revealing. Though often
              attributed to Pierre Jeanneret, the pieces had been developed in
              the collaborative design office he led, and were produced in a
              number of local workshops, shaped by the material and skills
              available at the time. Further, the designs had been freely
              adapted for various situations and evolved over a thirty year
              period, going beyond Chandigarh to several parts of Northern India
              and even as far as government offices in Bangalore.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              With the newfound understanding that this furniture was the
              product of an open, craft-based process, Aparna and Deepak decided
              to continue in this tradition, and set up a workshop in their
              hometown, Bangalore.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              <Link href="#" className="underline underline-offset-2">
                Project Chandigarh
              </Link>
              , Phantom Hands' first furniture collection, was launched in May,
              2015. What began as three chair models soon expanded to
              re-editions of several pieces.
            </p>
          </div>

          {/* Image + Caption 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full mb-24">
            <div className="h-[300px] md:h-[400px] bg-[#e5e5e5] relative w-full">
              {/* <Image src="/placeholder-3.jpg" alt="Meeting designers" fill className="object-cover" /> */}
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0">
                Image caption: The first meeting between Phantom Hands founder
                Deepak Srinath and designers Kyoko Inoda and Nils Sveje at their
                studio in Milan (2017).
              </p>
            </div>
          </div>

          {/* Design Collaborations Section */}
          <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
            <h2 className="text-lg md:text-xl font-medium mb-8">
              Design Collaborations
            </h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Since 2017, Phantom Hands has collaborated with contemporary
              designers such as INODA+SVEJE, x + l, Derek Welsh, Padmaja
              Krishnan, Klemens Grund, Nityan Unnikrishnan, BIG-GAME, Felix
              Pfäffli and others to create collections of original design. In
              parallel, we continue our in-depth engagement with South Asian
              modernism. Our most recent partnership was with the Geoffrey Bawa
              Trust, with whom we worked to create a collection of the Sri
              Lankan master’s fiercely contextual furniture designs. All our
              collections draw from the philosophy of cosmopolitan modernism
              that emerged in the subcontinent in the mid-20th century, and
              build on the vast bank of material intelligence that traditional
              Indian craftsmanship offers. Today, Phantom Hands is a design and
              craft collective of more than 100 artisans who specialise in
              carpentry, wood finishing, cane weaving, upholstery, and metal
              work
            </p>
          </div>
        </div>
      </section>
    </main>

    </>
  );
}
