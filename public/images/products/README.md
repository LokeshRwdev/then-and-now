# Products Images Directory (`public/images/products`)

This folder contains product photography for the **NOW & THEN** catalogue.

## 5 Unique Showcase Products

Place your 5 product images directly here. Supported formats: `.jpg`, `.png`, `.webp`, `.jpeg`.

- `product-1.jpg` (or `.png` / `.webp`) — Product 1 (Bridges Armchair)
- `product-2.jpg` (or `.png` / `.webp`) — Product 2 (Organic Console Table)
- `product-3.jpg` (or `.png` / `.webp`) — Product 3 (Sculptural Console & Mirror)
- `product-4.jpg` (or `.png` / `.webp`) — Product 4 (Marquetry Bar Cabinet)
- `product-5.jpg` (or `.png` / `.webp`) — Product 5 (Artistic Blue Credenza)

### Product Detail Page Galleries (Optional)
For each product, you can also optionally create a subfolder with individual gallery images:
- `/images/products/product-1/hero.jpg`
- `/images/products/product-1/gallery-1.jpg` through `gallery-7.jpg`

---

## How it works

1. **Auto-Recovery**: Next.js automatically checks for `.jpg`, `.png`, `.jpeg`, and `.webp` versions of each image name through `AppImage`.
2. **Easy Configuration**: All titles, descriptions, tags, and image paths are centrally configured in:
   `src/data/products.json`
3. **Custom File Names**: If you want to use different filenames (e.g. `my-chair.jpg`), simply edit the `"image"` field for that product in `src/data/products.json`.
4. **Fallback Handling**: If an image is not yet saved, the application automatically falls back gracefully so the layout never breaks.
