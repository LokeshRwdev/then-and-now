import { IMAGES } from '@/lib/images';
import rawProcessSteps from '@/data/process-steps.json';
import rawProducts from '@/data/products.json';
import { FEATURED_PRODUCTS } from '@/components/home/FeaturedProductsGrid';

export interface PageSectionItem {
  id: string;
  page_slug: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  secondary_image_url?: string;
  button_text?: string;
  button_link?: string;
  metadata?: Record<string, any>;
  sort_order: number;
  is_active: boolean;
}

export const DEFAULT_PAGE_SECTIONS: Record<string, PageSectionItem[]> = {
  home: [
    {
      id: 'home-hero',
      page_slug: 'home',
      section_key: 'hero',
      title: 'crafted for non-conformists',
      subtitle: 'Artisanal collection',
      content: '',
      image_url: IMAGES.hero.home,
      button_text: 'EXPLORE COLLECTION',
      button_link: '/objects',
      sort_order: 1,
      is_active: true,
    },
    {
      id: 'home-statement-1',
      page_slug: 'home',
      section_key: 'statement_1',
      title: "We don't manufacture furniture. We craft enduring objects.",
      content: 'Each object begins as a conversation between material, proportion and function. Made only after it has been ordered, every piece is produced in our workshop by artisans who understand the beauty of precision.',
      button_text: 'REQUEST INFO',
      button_link: 'https://wa.me/919947109947?text=Hello,%20I%20would%20like%20to%20request%20info%20about%20your%20pieces.',
      sort_order: 2,
      is_active: true,
    },
    {
      id: 'home-marquetry',
      page_slug: 'home',
      section_key: 'marquetry',
      title: 'Marquetry',
      content: 'An exploration of wooden veneer artistry and timeless geometry.',
      image_url: IMAGES.marquetry.hero,
      secondary_image_url: IMAGES.marquetry.strip,
      button_text: 'EXPLORE STORY',
      button_link: '/products/marquetry',
      sort_order: 3,
      is_active: true,
    },
    {
      id: 'home-statement-2',
      page_slug: 'home',
      section_key: 'statement_2',
      title: 'Artisanal Quality: Each furniture piece is meticulously handcrafted.',
      sort_order: 5,
      is_active: true,
    },
    {
      id: 'home-banner-interior',
      page_slug: 'home',
      section_key: 'banner_interior',
      title: 'Interior Collection Feature',
      image_url: IMAGES.banners.livingRoom,
      sort_order: 6,
      is_active: true,
    },
    {
      id: 'home-statement-oak',
      page_slug: 'home',
      section_key: 'statement_oak',
      title: 'Enhance your indoor and outdoor spaces with our timeless, century-old solid oak beam furniture.',
      content: 'Designed to withstand the test of time, our pieces will enrich your daily life now and for generations to come.',
      image_url: IMAGES.banners.oakChairs,
      button_text: 'Read More',
      button_link: '/objects',
      sort_order: 7,
      is_active: true,
    },
  ],
  about: [
    {
      id: 'about-hero',
      page_slug: 'about',
      section_key: 'hero',
      title: 'About us',
      image_url: IMAGES.about.hero,
      sort_order: 1,
      is_active: true,
    },
    {
      id: 'about-statement',
      page_slug: 'about',
      section_key: 'statement',
      title: 'Built Through Partnerships',
      content: 'The best work is built through meaningful, long-term partnerships. Now & Then collaborates with designers, manufacturers, craftsmen, and makers across the country to create work that is thoughtful, enduring, and rooted in the richness of Indian craft and contemporary design.',
      sort_order: 2,
      is_active: true,
    },
    {
      id: 'about-who-we-are',
      page_slug: 'about',
      section_key: 'who_we_are',
      title: 'Who We Are',
      content: 'Now & Then is an Indian design studio creating furniture, lighting, and objects that bring together contemporary design, craftsmanship, and materiality.\n\nWorking across the country and between collectible design and industrial production, we collaborate with ambitious designers and skilled manufacturers to develop thoughtful, enduring pieces.\n\nOur work is driven by a belief in creating pieces that belong to the present, while allowing time to become part of their story.',
      image_url: IMAGES.about.exhibition,
      sort_order: 3,
      is_active: true,
    },
    {
      id: 'about-evolution',
      page_slug: 'about',
      section_key: 'evolution',
      title: 'Evolution',
      content: 'Now & Then began in 2022, from a personal desire to create something of my own within the world of design. As an architect, I had always been drawn to the relationship between spaces, objects, materials, and the people who experience them. Over time, I found myself increasingly interested in what happens beyond the space itself–the objects that inhabit it, the way they are made, and the stories they carry.\n\n"Now" represents the excitement of an idea taking shape–the sketches, conversations, experiments, and making. "Then" is what happens after: when the piece leaves the studio, enters someone\'s space, and begins a life of its own.',
      image_url: IMAGES.about.console,
      sort_order: 4,
      is_active: true,
    },
    {
      id: 'about-team',
      page_slug: 'about',
      section_key: 'team',
      title: 'Our Team',
      content: 'Behind Now & Then is a growing team of designers, makers, and craftsmen who bring different skills, perspectives, and experiences to every project. We believe good design is a collective process. From the first idea and drawings to material selection, making, and finishing, each person contributes to shaping the final piece.',
      image_url: IMAGES.about.team,
      sort_order: 5,
      is_active: true,
    },
    {
      id: 'about-founder',
      page_slug: 'about',
      section_key: 'founder',
      title: 'Founder',
      content: 'Now & Then, founded by Architect Nihal Musthafa, is rooted in a reflection on time and the act of creation–the relationship between what is created now and what it becomes then. Each piece begins as an idea in the present, brought to life through considered design, material, and craftsmanship, while being imagined for a future where it can acquire its own character and meaning.',
      sort_order: 6,
      is_active: true,
    },
  ],
  process: [
    {
      id: 'process-hero',
      page_slug: 'process',
      section_key: 'hero',
      title: 'Process',
      image_url: IMAGES.hero.process,
      sort_order: 1,
      is_active: true,
    },
  ],
  'material-library': [
    {
      id: 'mat-hero',
      page_slug: 'material-library',
      section_key: 'hero',
      title: 'Material Library',
      image_url: '/images/material-library/hero-banner.png',
      sort_order: 1,
      is_active: true,
    },
    {
      id: 'mat-timber-yard-intro',
      page_slug: 'material-library',
      section_key: 'timber_yard_intro',
      title: 'Blocks of wood piled up for selection in the timber yard',
      content: 'Wood has been shaped by human hands for centuries, evolving from a material of everyday utility into a medium for skilled craftsmanship and artistic expression. Carving wood demands patience, precision, and an intimate understanding of its grain, density, and natural movement. Every piece carries the individuality of the material itself.',
      image_url: '/images/material-library/timber-yard-intro.png',
      sort_order: 2,
      is_active: true,
    },
    {
      id: 'mat-timber-statement',
      page_slug: 'material-library',
      section_key: 'timber_statement',
      title: 'We use both reclaimed and new timber sourced from verified supply chains in our furniture production.',
      content: 'A majority of our furniture is made using teak wood (Scientific Name: Tectona grandis). Teak has high oil content, making it moisture, acid and alkali resistant. Weather changes don\'t impact its shape. It is seldom affected by insects, borers or fungi. This makes the wood fantastically durable.',
      sort_order: 3,
      is_active: true,
    },
    {
      id: 'mat-timber-unloaded',
      page_slug: 'material-library',
      section_key: 'timber_unloaded',
      title: 'Teak blocks and planks unloaded',
      content: 'Teak blocks and planks, freshly unloaded from shipping containers in the yard of our timber supplier.',
      image_url: '/images/material-library/timber-blocks-unloaded.png',
      sort_order: 4,
      is_active: true,
    },
    {
      id: 'mat-carpenters',
      page_slug: 'material-library',
      section_key: 'carpenters',
      title: 'Our carpenters are from various traditional woodworking communities of India.',
      subtitle: 'Rajasthan, Uttar Pradesh, Bihar, Bengal, and Kerala.',
      content: 'Our factory is in a semi-industrial area on the outskirts of Bangalore, spread over 1500 square meters. Production facilities include outdoor and indoor areas with plenty of natural light and ventilation that provide a healthy and inspiring work environment.\n\nLike most carpenters in India, our carpenters sit and work on the floor. This allows them to use not just their hands, but also their feet to hold the wood in place while they work on it.',
      image_url: '/images/material-library/carpenter-at-bench.png',
      secondary_image_url: '/images/material-library/carpenter-floor-work.png',
      sort_order: 5,
      is_active: true,
    },
    {
      id: 'mat-cane-weaving',
      page_slug: 'material-library',
      section_key: 'cane_weaving',
      title: 'Being an intricate craft, cane weaving is both time and labour intensive.',
      content: 'Depending on the complexity of the pattern, it can take our artisans anywhere between one and three days to finish weaving a single piece of our furniture.',
      sort_order: 6,
      is_active: true,
    },
  ],
  press: [
    {
      id: 'press-hero',
      page_slug: 'press',
      section_key: 'hero',
      title: 'Stories',
      subtitle: 'NOW & THEN COLLECTION',
      image_url: IMAGES.hero.home,
      sort_order: 1,
      is_active: true,
    },
  ],
};

export const DEFAULT_STORIES = Array.from({ length: 6 }).map((_, i) => ({
  id: `story-${i + 1}`,
  title: `Design Specifications & Architectural Craft ${i + 1}`,
  subtitle: 'COLLECTION ARCHIVE',
  description: 'Provide detailed specifications, drawings, dimensions, and materials to our team. Bespoke artisanal manufacturing executed to the highest standards.',
  image_url: 'https://images.unsplash.com/photo-1550136513-548af4445338?q=80&w=800&auto=format&fit=crop',
}));

export const DEFAULT_FEATURED_HOME_PRODUCTS = FEATURED_PRODUCTS;
export const DEFAULT_PROCESS_STEPS = rawProcessSteps;
export const DEFAULT_PRODUCTS = rawProducts;
