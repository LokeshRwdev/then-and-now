/**
 * Central Image Assets Catalog
 * 
 * Provides type-safe references to images located in the /public/images directory.
 * When you place or rename an image file in public/images, update the path here once
 * and it will automatically update across all pages and components.
 */

export const IMAGES = {
  logo: '/images/logo.png',
  placeholders: {
    default: '/images/placeholders/default-placeholder.svg',
  },
  hero: {
    home: '/images/hero/home-hero.png',
    materials: '/images/hero/materials-hero.jpg',
    process: '/images/hero/process-hero.png',
    lights: '/images/hero/lights-hero.png',
    objects: '/images/hero/objects-hero.png',
    products: '/images/hero/products-hero.png',
  },
  craft: {
    marquetry: '/images/craft/marquetry.jpg',
    workshop: '/images/craft/workshop.jpg',
    carpenter1: '/images/craft/carpenter-1.jpg',
    carpenter2: '/images/craft/carpenter-2.jpg',
    materialsCloseup: '/images/craft/materials-close-up.jpg',
    timberYard: '/images/craft/timber-yard.jpg',
    teakBlocks: '/images/craft/teak-blocks.jpg',
  },
  marquetry: {
    hero: '/images/hero/products-hero.png',
    strip: '/images/marquetry/marquetry-strip.png',
  },
  products: {
    solidOak: '/images/products/solid-oak.jpg',
    placeholder: '/images/products/product-placeholder.jpg',
    chair1: '/images/products/chair-1.jpg',
    chair2: '/images/products/chair-2.jpg',
    light1: '/images/products/light-1.jpg',
    light2: '/images/products/light-2.jpg',
    strip: '/images/products/products-strip.png',
    // 5 Unique showcase products
    product1: '/images/products/product-1.jpg',
    product2: '/images/products/product-2.jpg',
    product3: '/images/products/product-3.jpg',
    product4: '/images/products/product-4.jpg',
    product5: '/images/products/product-5.jpg',
  },
  featured: {
    item1: '/images/featured/featured-1.jpg',
    item2: '/images/featured/featured-2.jpg',
    item3: '/images/featured/featured-3.jpg',
    item4: '/images/featured/featured-4.jpg',
    item5: '/images/featured/featured-5.jpg',
    item6: '/images/featured/featured-6.jpg',
  },
  banners: {
    livingRoom: '/images/banners/living-room-banner.png',
    oakChairs: '/images/banners/oak-chairs.png'
  },
  about: {
    hero: '/images/about/about-hero.png',
    exhibition: '/images/about/about-exhibition.png',
    console: '/images/products/product-2.png',
    team: '/images/about/about-team.png',
    archive1: '/images/about/about-1.jpg',
    collection2: '/images/about/about-2.jpg',
    collaboration3: '/images/about/about-3.jpg',
  },
  gallery: {
    item1: '/images/products/gallery-1.jpg',
    item2: '/images/products/gallery-2.jpg',
    item3: '/images/products/gallery-3.jpg',
    item4: '/images/products/gallery-4.jpg',
    item5: '/images/products/gallery-5.jpg',
    item6: '/images/products/gallery-6.jpg',
    item7: '/images/products/gallery-7.jpg',
  },
} as const;

export type ImageAssetPath = 
  | (typeof IMAGES.hero)[keyof typeof IMAGES.hero]
  | (typeof IMAGES.craft)[keyof typeof IMAGES.craft]
  | (typeof IMAGES.products)[keyof typeof IMAGES.products]
  | (typeof IMAGES.about)[keyof typeof IMAGES.about]
  | string;
