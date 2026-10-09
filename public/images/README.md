# Image Assets Directory (`public/images`)

This folder contains all static image assets for the **THEN & NOW** application.

Files placed here are directly served by Next.js from `/images/<subfolder>/<filename>`.

## Folder Organization & Naming Conventions

### 1. `/images/hero/`
Hero banners displayed at the top of pages (formats: `.png`, `.jpg`, `.jpeg`, or `.webp`):
- `home-hero.png` (or `.jpg`) — Home page main banner
- `materials-hero.jpg` — Material Library page banner
- `process-hero.jpg` — Process page banner
- `lights-hero.jpg` — Lights catalog banner
- `objects-hero.jpg` — Objects catalog banner
- `products-hero.jpg` — Product detail fallback banner

### 2. `/images/craft/`
Artisan, workshop, and material photography (recommended: 1200×900px or 4:3 / 16:9 ratio):
- `marquetry.jpg` — Home page Marquetry feature
- `workshop.jpg` — Home page "Custom isn't extra" feature
- `carpenter-1.jpg` — Material Library carpenter feature 1
- `carpenter-2.jpg` — Material Library carpenter feature 2
- `materials-close-up.jpg` — Close-up material textures
- `timber-yard.jpg` — Timber yard logs & lumber
- `teak-blocks.jpg` — Teak blocks and planks

### 3. `/images/products/`
Product catalogue photography (recommended: 1200×1200px or 1:1 square):
- `solid-oak.jpg` — Home page solid oak feature
- `chair-1.jpg`, `chair-2.jpg`, `table-1.jpg`, etc. — Product catalog images
- `product-placeholder.jpg` — Default product fallback

### 4. `/images/about/`
Editorial & history imagery for the About page:
- `about-hero.jpg` — About page main feature
- `about-1.jpg` — Museum / archive showcase
- `about-2.jpg` — First collection showcase
- `about-3.jpg` — Design collaboration meeting

### 5. `/images/press/`
Editorial press stories (recommended: 3:4 portrait aspect ratio):
- `story-1.jpg`, `story-2.jpg`, etc.

### 6. `/images/process/`
Step illustrations for the Process page (aspect ratio approx 21:9 or 16:9, `.png` or `.jpg`):
- `01.png` — Step 1: Design Specifications
- `02.png` — Step 2: Quotation
- `03.png` — Step 3: Order Placement
- `04.png` — Step 4: Shop Drawings & Material Samples
- `05.png` — Step 5: Client Review Process
- `06.png` — Step 6: Prototype Production
- `07.png` — Step 7: Full Coat Production
- `08.png` — Step 8: Transport
- `09.png` — Step 9: Delivery
- `10.png` — Step 10: Post-Delivery

### 7. `/images/placeholders/`
Fallback vectors and default placeholders:
- `default-placeholder.svg` — Used automatically when an image has not yet been provided or fails to load.

---

## Best Practice Guide: Using Images in Code

Use the centralized image registry (`@/lib/images`) and the `<AppImage />` component:

```tsx
import { AppImage } from '@/components/ui/AppImage';
import { IMAGES } from '@/lib/images';

// Fill container (parent must have `relative` and a defined height or aspect ratio)
<div className="relative aspect-[4/3] w-full">
  <AppImage 
    src={IMAGES.craft.marquetry} 
    alt="Marquetry detail" 
    fill 
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>

// Fixed dimensions
<AppImage 
  src={IMAGES.hero.home} 
  alt="Home hero" 
  width={1200} 
  height={675} 
  priority 
/>
```
