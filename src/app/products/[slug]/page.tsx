import Link from "next/link";
import PageBanner from "@/components/layout/PageBanner";
import AppImage from "@/components/ui/AppImage";
import { IMAGES } from "@/lib/images";
import { getProductBySlug, getUniqueProducts } from "@/lib/products";
import { getProductBySlug as getSupabaseProductBySlug } from "@/lib/supabase/products";

export function generateStaticParams() {
  const products = getUniqueProducts();
  return products.flatMap((p) => [
    { slug: p.slug },
    { slug: p.id },
    { slug: `product-${p.id}` },
  ]);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. Try local JSON catalogue first (fast, offline-first & user editable)
  const localProduct = getProductBySlug(slug);

  // 2. Try Supabase as secondary fallback if not in JSON
  let supabaseProduct = null;
  if (!localProduct) {
    supabaseProduct = await getSupabaseProductBySlug(slug);
  }

  // 3. Graceful fallback if neither found
  const product = localProduct || {
    id: supabaseProduct?.id || "default",
    title: supabaseProduct?.title || slug.replace(/-/g, " ").toUpperCase(),
    slug: slug,
    tag: "COLLECTION",
    category: supabaseProduct?.category || "object",
    image: supabaseProduct?.image_url || IMAGES.hero.products,
    fallbackImage: IMAGES.hero.products,
    shortDescription: supabaseProduct?.short_description || "",
    buttonText: "REQUEST PRICE",
    pageData: {
      // heroSubtitle: 'NOW & THEN COLLECTION',
      heroImage: "",
      secondaryHeading: `${supabaseProduct?.title || slug.toUpperCase()}`,
      longDescription:
        supabaseProduct?.long_description ||
        supabaseProduct?.short_description ||
        "",
      specs: {
        year: "2024",
        materials: "Solid Teak, Rosewood & Indian Laurel",
        dimensions: "H88 × W68 × D72 cm",
      },
      gallery: {},
    },
  };

  const title = product.title;
  const pageData = product.pageData || {};
  const specs = pageData.specs || {
    year: "2024",
    materials: "Solid Teak, Rosewood & Indian Laurel",
    dimensions: "H88 × W68 × D72 cm",
  };
  const gallery = pageData.gallery || {};

  // Get 2 related products from catalogue (excluding current)
  const allProducts = getUniqueProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug && p.id !== product.id)
    .slice(0, 2);

  return (
    <>
      <main className="min-h-screen bg-white text-[#1A1A1A] flex flex-col">
        {/* Hero Section */}
        <PageBanner
          title={title}
          imageSrc={
            pageData.heroImage && pageData.heroImage.trim() !== ""
              ? pageData.heroImage
              : product.image || IMAGES.hero.products
          }
          fallbackSrc={
            product.fallbackImage || product.image || IMAGES.hero.products
          }
          bgColor="bg-[#e5e5e5]"
          height="h-screen min-h-[600px]"
        />

        {/* Product Info & Specifications */}
        <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start">
            {/* Left side: Editorial Description */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-neutral-900">
                {title}
              </h2>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                {pageData.secondaryHeading ||
                  `${title} - ARCHITECTURAL MARQUETRY`}
              </p>
              <div className="text-sm font-sans leading-relaxed text-neutral-700 whitespace-pre-wrap pt-2 space-y-4">
                <p>
                  {pageData.longDescription ||
                    product.shortDescription ||
                    `To pay homage to vintage modernism, Artsy Table celebrates rectangular/sculptural form and marquetry in wood. The carefully selected Indian Laurel, Rosewood and Teakwood, allowing their natural colours, grain, and character to shine without adding composition... setting the foundation for the craftsmanship that follows.`}
                </p>
              </div>
            </div>

            {/* Right side: Specifications Card */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6 text-xs font-sans tracking-widest uppercase text-neutral-600">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider border-b border-black/10 pb-3">
                {title}
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline border-b border-black/10 pb-2.5">
                  <span className="font-bold text-neutral-900">Year</span>
                  <span className="text-neutral-600 font-mono text-[11px]">
                    {specs.year || "2024"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-black/10 pb-2.5">
                  <span className="font-bold text-neutral-900">Materials</span>
                  <span className="text-neutral-600 text-right max-w-[60%] lowercase capitalize">
                    {specs.materials || "Solid Teak, Rosewood & Indian Laurel"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-black/10 pb-2.5">
                  <span className="font-bold text-neutral-900">Dimensions</span>
                  <span className="text-neutral-600 font-mono text-[11px]">
                    {specs.dimensions || "H88 × W68 × D72 cm"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-2 py-3.5 border border-black/30 font-semibold text-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors duration-200"
              >
                REQUEST PRICE
              </button>
            </div>
          </div>
        </section>

        {/* Editorial Gallery Section */}
        <section className="w-full py-8 md:py-16 px-6 md:px-12 lg:px-24 border-t border-black/5">
          <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
            {/* Row 1: Full-width Landscape image */}
            <div className="w-full aspect-[21/9] sm:aspect-[16/7] bg-[#e5e5e5] relative overflow-hidden shadow-sm">
              <AppImage
                src={gallery.landscape1 || IMAGES.gallery.item1}
                fallbackSrc={IMAGES.gallery.item1}
                alt={`${title} detail view 1`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>

            {/* Row 2: Text (Left) + 2 Portrait/Square images (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="md:col-span-1 pt-2">
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                  Crafted from solid rosewood, this tabletop celebrates
                  centuries-old Indian woodcraft traditions. The joinery works
                  every detail to celebrate timber in every grain, using no
                  artificial stains or fillers.
                </p>
              </div>
              <div className="md:col-span-1 aspect-square sm:aspect-[3/4] bg-[#e5e5e5] relative overflow-hidden">
                <AppImage
                  src={gallery.portrait1 || IMAGES.gallery.item2}
                  fallbackSrc={IMAGES.gallery.item2}
                  alt={`${title} perspective 2`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-1 aspect-square sm:aspect-[3/4] bg-[#e5e5e5] relative overflow-hidden">
                <AppImage
                  src={gallery.portrait2 || IMAGES.gallery.item3}
                  fallbackSrc={IMAGES.gallery.item3}
                  alt={`${title} perspective 3`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Row 3: Text (Left) + Large Vertical Workshop Image (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="md:col-span-1 pt-2 flex flex-col gap-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Prototyping & Positioning
                </h4>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                  Before working on the final tabletop, we build mockups to
                  study form, balance, and proportions. This allows us to
                  calibrate both the leg positions, ensuring stability is
                  structurally sound while maintaining its iconic sculptural
                  form.
                </p>
              </div>
              <div className="md:col-span-2 aspect-[4/3] md:aspect-[16/11] bg-[#e5e5e5] relative overflow-hidden">
                <AppImage
                  src={gallery.feature || IMAGES.gallery.item4}
                  fallbackSrc={IMAGES.gallery.item4}
                  alt={`${title} workshop prototype`}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Row 4: Large Vertical Template Image (Left) + Text & Detail Image (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Column: Tall Portrait Template Photo */}
              <div className="w-full aspect-[3/4] sm:aspect-[4/5] bg-[#e5e5e5] relative overflow-hidden">
                <AppImage
                  src={gallery.detail1 || IMAGES.gallery.item5}
                  fallbackSrc={IMAGES.gallery.item5}
                  alt={`${title} template drafting`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Right Column: Text Block + Detail Chisel Photo */}
              <div className="flex flex-col gap-8 md:gap-10">
                <div className="flex flex-col gap-3 pt-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    Template Making
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                    Every initial project begins with precision templates to
                    accurately capture the profile and layout of each joinery
                    piece across the tabletop. We carefully orient timber grain,
                    rosewood, and teakwood, allowing their natural contours,
                    grain, and character to radiate without adding artificial
                    stains—setting the foundation for the craftsmanship that
                    follows.
                  </p>
                </div>

                <div className="w-full aspect-[4/3] bg-[#e5e5e5] relative overflow-hidden">
                  <AppImage
                    src={gallery.detail2 || IMAGES.gallery.item6}
                    fallbackSrc={IMAGES.gallery.item6}
                    alt={`${title} mortise chiseling`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Projects / Related Products Section (Clean alignment before Footer) */}
        <section className="w-full pt-16 md:pt-24 pb-28 md:pb-36 px-6 md:px-12 lg:px-24 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            {/* Heading aligned precisely with the cards below */}
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-900 mb-8 md:mb-12">
              Other Projects
            </h2>

            {/* Clean 2-column cards matching design mockup (no awkward box borders or button padding) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {relatedProducts.map((rel) => (
                <article key={rel.id} className="flex flex-col group">
                  <Link
                    href={`/products/${rel.slug}`}
                    className="block relative w-full aspect-[4/3] sm:aspect-square bg-[#e5e5e5] overflow-hidden mb-5"
                    aria-label={`View ${rel.title}`}
                  >
                    <AppImage
                      src={rel.image}
                      fallbackSrc={rel.fallbackImage}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  <div className="flex flex-col">
                    <span className="text-[11px] md:text-xs font-semibold text-neutral-900 uppercase tracking-widest mb-3">
                      {rel.tag || "RESTAURANT"}
                    </span>
                    <p className="text-xs md:text-sm font-sans text-neutral-700 leading-relaxed line-clamp-4">
                      {rel.shortDescription}
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
