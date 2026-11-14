import rawProducts from '@/data/products.json';

export interface ProductSpecs {
  year?: string;
  materials?: string;
  dimensions?: string;
  [key: string]: string | undefined;
}

export interface ProductGallery {
  landscape1?: string;
  portrait1?: string;
  portrait2?: string;
  feature?: string;
  detail1?: string;
  detail2?: string;
  detail3?: string;
  [key: string]: string | undefined;
}

export interface ProductPageData {
  heroSubtitle?: string;
  heroImage?: string;
  heroFallbackImage?: string;
  secondaryHeading?: string;
  longDescription?: string;
  specs?: ProductSpecs;
  gallery?: ProductGallery;
  galleryDescription?: string;
  featureHeading?: string;
  featureDescription?: string;
  detailHeading?: string;
  detailDescription?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  tag: string;
  category: string;
  image: string;
  fallbackImage?: string;
  shortDescription: string;
  buttonText?: string;
  pageData?: ProductPageData;
}

export interface DisplayProductCardItem {
  gridKey: string;
  id: string;
  slug: string;
  title: string;
  tag: string;
  category: string;
  image: string;
  fallbackImage?: string;
  shortDescription: string;
  buttonText: string;
}

/**
 * Returns the unique showcase products from products.json
 */
export function getUniqueProducts(): ProductItem[] {
  return rawProducts as ProductItem[];
}

/**
 * Returns a display list of products for category pages (Objects & Lights).
 * The first 5 items are guaranteed unique.
 * Subsequent items repeat the products cyclically to fill the grid (default 12 cards),
 * while routing to their corresponding unique product pages.
 */
export function getDisplayProducts(totalCount: number = 12): DisplayProductCardItem[] {
  const uniqueProducts = getUniqueProducts();
  if (uniqueProducts.length === 0) return [];

  const items: DisplayProductCardItem[] = [];

  for (let i = 0; i < totalCount; i++) {
    const productIndex = i % uniqueProducts.length;
    const baseProduct = uniqueProducts[productIndex];
    
    // In the mockup: left column alternates 'HOME', right column alternates 'RESTAURANT'
    // but respects the product's assigned tag on the first cycle
    const columnTag = i % 2 === 0 ? 'HOME' : 'RESTAURANT';
    const tag = i < uniqueProducts.length ? (baseProduct.tag || columnTag) : columnTag;

    items.push({
      gridKey: `card-${i}-${baseProduct.id}`,
      id: baseProduct.id,
      slug: baseProduct.slug,
      title: baseProduct.title,
      tag: tag,
      category: baseProduct.category,
      image: baseProduct.image,
      fallbackImage: baseProduct.fallbackImage,
      shortDescription: baseProduct.shortDescription,
      buttonText: baseProduct.buttonText || 'REQUEST PRICE',
    });
  }

  return items;
}

/**
 * Find a product by its slug or ID (supports 'bridges-armchair', '1', 'product-1', etc.)
 */
export function getProductBySlug(slug: string): ProductItem | null {
  const products = getUniqueProducts();
  const normalizedSlug = slug.toLowerCase().trim();

  // Known slug aliases from home page featured grid
  const SLUG_ALIASES: Record<string, string> = {
    'classic-carved-armchair': 'bridges-armchair',
    'organic-console-table': 'organic-console',
    'marquetry-bar-cabinet': 'marquetry-cabinet',
    'curved-sofa': 'artistic-credenza',
  };

  const targetSlug = SLUG_ALIASES[normalizedSlug] || normalizedSlug;

  const found = products.find((p) => {
    return (
      p.slug.toLowerCase() === targetSlug ||
      p.id.toLowerCase() === targetSlug ||
      `product-${p.id}`.toLowerCase() === targetSlug ||
      `product-${p.slug}`.toLowerCase() === targetSlug
    );
  });

  return found || null;
}
