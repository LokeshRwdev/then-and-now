'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  ExternalLink,
  Camera,
  Edit2,
  Check,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Sparkles,
  Layers,
  Eye,
  Sliders,
} from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import VercelImageUploader from './VercelImageUploader';
import { IMAGES } from '@/lib/images';

export interface ProductPageSpecs {
  year: string;
  materials: string;
  dimensions: string;
}

export interface ProductPageGallery {
  landscape1: string;
  portrait1: string;
  portrait2: string;
  feature: string;
  detail1: string;
  detail2: string;
}

export interface ProductPageData {
  heroImage: string;
  secondaryHeading: string;
  longDescription: string;
  specs: ProductPageSpecs;
  gallery: ProductPageGallery;
  galleryDescription: string;
  featureHeading: string;
  featureDescription: string;
  detailHeading: string;
  detailDescription: string;
}

export interface EditableProduct {
  id?: string;
  title: string;
  slug: string;
  category: string;
  category_id?: string;
  tag: string;
  short_description?: string;
  long_description?: string;
  image_url?: string;
  button_text: string;
  is_published: boolean;
  page_data: ProductPageData;
}

interface VisualProductPageEditorProps {
  initialProduct?: any;
  isNew?: boolean;
  onClose?: () => void;
}

export default function VisualProductPageEditor({
  initialProduct,
  isNew = false,
  onClose,
}: VisualProductPageEditorProps) {
  const router = useRouter();

  // Helper to construct normalized initial product state
  const getInitialState = (): EditableProduct => {
    const raw = initialProduct || {};
    const rawPageData = raw.page_data || {};
    const rawGallery = rawPageData.gallery || {};
    const rawSpecs = rawPageData.specs || {};

    const title = raw.title || (isNew ? 'New Sculptural Piece' : 'Artsy Table');
    const slug = raw.slug || (isNew ? 'new-sculptural-piece' : 'artsy-table');
    const heroImg = rawPageData.heroImage || raw.image_url || IMAGES.hero.products;

    return {
      id: raw.id || '',
      title,
      slug,
      category: raw.category || 'object',
      category_id: raw.category_id || '',
      tag: raw.tag || 'COLLECTION',
      short_description: raw.short_description || '',
      long_description: raw.long_description || rawPageData.longDescription || '',
      image_url: heroImg,
      button_text: raw.button_text || 'REQUEST PRICE',
      is_published: raw.is_published !== false,
      page_data: {
        heroImage: heroImg,
        secondaryHeading:
          rawPageData.secondaryHeading || `${title} - ARCHITECTURAL MARQUETRY`,
        longDescription:
          rawPageData.longDescription ||
          raw.long_description ||
          raw.short_description ||
          'To pay homage to vintage modernism, Artsy Table celebrates rectangular/sculptural form and marquetry in wood. The carefully selected Indian Laurel, Rosewood and Teakwood, allowing their natural colours, grain, and character to shine without adding composition... setting the foundation for the craftsmanship that follows.',
        specs: {
          year: rawSpecs.year || '2024',
          materials: rawSpecs.materials || 'Solid Teak, Rosewood & Indian Laurel',
          dimensions: rawSpecs.dimensions || 'H88 × W68 × D72 cm',
        },
        gallery: {
          landscape1: rawGallery.landscape1 || IMAGES.gallery.item1,
          portrait1: rawGallery.portrait1 || IMAGES.gallery.item2,
          portrait2: rawGallery.portrait2 || IMAGES.gallery.item3,
          feature: rawGallery.feature || IMAGES.gallery.item4,
          detail1: rawGallery.detail1 || IMAGES.gallery.item5,
          detail2: rawGallery.detail2 || IMAGES.gallery.item6,
        },
        galleryDescription:
          rawPageData.galleryDescription ||
          'Crafted from solid rosewood, this tabletop celebrates centuries-old Indian woodcraft traditions. The joinery works every detail to celebrate timber in every grain, using no artificial stains or fillers.',
        featureHeading: rawPageData.featureHeading || 'Prototyping & Positioning',
        featureDescription:
          rawPageData.featureDescription ||
          'Before working on the final tabletop, we build mockups to study form, balance, and proportions. This allows us to calibrate both the leg positions, ensuring stability is structurally sound while maintaining its iconic sculptural form.',
        detailHeading: rawPageData.detailHeading || 'Template Making',
        detailDescription:
          rawPageData.detailDescription ||
          'Every initial project begins with precision templates to accurately capture the profile and layout of each joinery piece across the tabletop. We carefully orient timber grain, rosewood, and teakwood, allowing their natural contours, grain, and character to radiate without adding artificial stains—setting the foundation for the craftsmanship that follows.',
      },
    };
  };

  const [product, setProduct] = useState<EditableProduct>(getInitialState);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active modal state for editing specific blocks
  type ModalType =
    | null
    | { type: 'heroImage' }
    | { type: 'heroMeta' }
    | { type: 'editorial' }
    | { type: 'specs' }
    | { type: 'landscape1' }
    | { type: 'galleryText' }
    | { type: 'portrait1' }
    | { type: 'portrait2' }
    | { type: 'featureText' }
    | { type: 'featureImage' }
    | { type: 'detail1' }
    | { type: 'detailText' }
    | { type: 'detail2' }
    | { type: 'settings' };

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Fetch available categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/admin/catalog');
        if (res.ok) {
          const data = await res.json();
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories);
            // If category_id not set, associate it with matching category slug
            if (!product.category_id) {
              const matched = data.categories.find(
                (c: any) => c.slug === product.category
              );
              if (matched) {
                setProduct((prev) => ({
                  ...prev,
                  category_id: matched.id,
                }));
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    fetchCategories();
  }, []);

  // Update a nested image in gallery or hero
  const handleUpdateImage = (field: string, newUrl: string) => {
    setProduct((prev) => {
      if (field === 'heroImage') {
        return {
          ...prev,
          image_url: newUrl,
          page_data: {
            ...prev.page_data,
            heroImage: newUrl,
          },
        };
      }
      return {
        ...prev,
        page_data: {
          ...prev.page_data,
          gallery: {
            ...prev.page_data.gallery,
            [field]: newUrl,
          },
        },
      };
    });
    setActiveModal(null);
    showToast('Image updated successfully!');
  };

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auto-slug generator when title changes (if user hasn't heavily customized slug)
  const handleTitleChange = (newTitle: string) => {
    setProduct((prev) => {
      const generatedSlug = isNew
        ? newTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
        : prev.slug;

      return {
        ...prev,
        title: newTitle,
        slug: generatedSlug || prev.slug,
        page_data: {
          ...prev.page_data,
          secondaryHeading: prev.page_data.secondaryHeading.includes(' - ')
            ? `${newTitle.toUpperCase()} - ARCHITECTURAL MARQUETRY`
            : prev.page_data.secondaryHeading,
        },
      };
    });
  };

  // Save product to database
  const handleSaveProduct = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    const safeSlug =
      product.slug.trim() ||
      product.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') ||
      'product-' + Date.now();

    const payload = {
      type: 'product',
      data: {
        id: product.id || undefined,
        title: product.title.trim(),
        slug: safeSlug,
        category: product.category,
        category_id: product.category_id || undefined,
        tag: product.tag || 'COLLECTION',
        short_description:
          product.short_description ||
          product.page_data.longDescription?.slice(0, 180) ||
          '',
        long_description:
          product.page_data.longDescription || product.long_description || '',
        image_url: product.page_data.heroImage || product.image_url,
        button_text: product.button_text || 'REQUEST PRICE',
        page_data: product.page_data,
        is_published: product.is_published,
      },
    };

    try {
      const res = await fetch('/api/admin/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to save product');
      }

      showToast('Product page saved & published successfully!');

      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 1200);
      } else if (isNew && json.data?.id) {
        // Redirect to edit mode for this newly created product
        router.replace(`/dashboard/products/${json.data.id}`);
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      setErrorMessage(err.message || 'Failed to save product. Check database connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const { page_data } = product;
  const { specs, gallery } = page_data;

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3.5 rounded-lg shadow-2xl border border-neutral-700 flex items-center gap-3 text-xs animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle size={18} className="text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-950 text-white px-5 py-3.5 rounded-lg shadow-2xl border border-red-800 flex items-center gap-3 text-xs animate-in slide-in-from-bottom-4 duration-200">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="ml-2 hover:text-red-200">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Sticky Top Studio Control Bar */}
      <header className="sticky top-0 z-40 bg-neutral-900 text-white border-b border-neutral-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left Action: Return + Title */}
          <div className="flex items-center gap-3 min-w-0">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors cursor-pointer"
                title="Return to products catalog"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <Link
                href="/dashboard/products"
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                title="Return to products list"
              >
                <ArrowLeft size={18} />
              </Link>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-semibold border border-white/15">
                  Visual Product Editor
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                    product.is_published
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {product.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <h1 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {product.title}
              </h1>
            </div>
          </div>

          {/* Center/Right Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Settings (Slug & Category) */}
            <button
              type="button"
              onClick={() => setActiveModal({ type: 'settings' })}
              className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-md border border-white/10 transition-colors"
              title="Configure Slug & Category"
            >
              <Sliders size={14} />
              <span className="hidden md:inline">Settings</span>
            </button>

            {/* Live Preview Button */}
            {!isNew && (
              <a
                href={`/products/${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-md border border-white/10 transition-colors"
                title="View live product page in new tab"
              >
                <Eye size={14} />
                <span className="hidden sm:inline">View Live</span>
                <ExternalLink size={12} />
              </a>
            )}

            {/* Save & Publish Button */}
            <button
              type="button"
              onClick={handleSaveProduct}
              disabled={isSaving}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition-all shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save &amp; Publish</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sub-bar Guidance Notice */}
        <div className="bg-neutral-950/90 border-t border-neutral-800/80 px-4 py-2 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-2">
          <Sparkles size={13} className="text-amber-400 shrink-0" />
          <span>
            <strong>Interactive Visual Mode:</strong> Hover and click directly on any text or image below to edit in place.
          </span>
        </div>
      </header>

      {/* Main Visual Layout (Exact match of /products/[slug]) */}
      <main className="flex-1 flex flex-col">
        
        {/* 1. HERO BANNER SECTION */}
        <section
          onClick={() => setActiveModal({ type: 'heroMeta' })}
          className="group/hero relative w-full h-[70vh] min-h-[500px] max-h-[850px] bg-[#e5e5e5] cursor-pointer overflow-hidden ring-2 ring-transparent hover:ring-neutral-900 transition-all"
        >
          {/* Hero Image */}
          <AppImage
            src={page_data.heroImage || IMAGES.hero.products}
            fallbackSrc={IMAGES.hero.products}
            alt={product.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/30" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-xs uppercase tracking-widest text-white/80 font-mono mb-2">
              {product.tag || 'COLLECTION'}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight drop-shadow-md max-w-4xl">
              {product.title}
            </h1>
          </div>

          {/* Edit Badge & Upload Button */}
          <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveModal({ type: 'heroImage' });
              }}
              className="bg-neutral-900/90 hover:bg-neutral-900 text-white text-xs px-3.5 py-2 rounded-lg backdrop-blur-md shadow-lg border border-white/20 flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Camera size={14} />
              <span>Change Hero Image</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveModal({ type: 'heroMeta' });
              }}
              className="bg-white/95 hover:bg-white text-neutral-900 text-xs px-3.5 py-2 rounded-lg backdrop-blur-md shadow-lg border border-neutral-200 flex items-center gap-1.5 font-medium transition-transform hover:scale-105"
            >
              <Edit2 size={13} />
              <span>Edit Title &amp; Tag</span>
            </button>
          </div>
        </section>

        {/* 2. PRODUCT INFO & SPECIFICATIONS SECTION */}
        <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start">
            
            {/* Left side: Editorial Description */}
            <div
              onClick={() => setActiveModal({ type: 'editorial' })}
              className="group/editorial md:col-span-7 lg:col-span-8 flex flex-col gap-4 p-4 -m-4 rounded-xl cursor-pointer ring-1 ring-transparent hover:ring-neutral-900 hover:bg-neutral-50/50 transition-all relative"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover/editorial:opacity-100 transition-opacity">
                <span className="bg-neutral-900 text-white text-[10px] font-mono uppercase px-2 py-1 rounded shadow flex items-center gap-1">
                  <Edit2 size={11} /> Click to Edit Content
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-neutral-900">
                {product.title}
              </h2>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                {page_data.secondaryHeading}
              </p>
              <div className="text-sm font-sans leading-relaxed text-neutral-700 whitespace-pre-wrap pt-2">
                <p>{page_data.longDescription}</p>
              </div>
            </div>

            {/* Right side: Specifications Card */}
            <div
              onClick={() => setActiveModal({ type: 'specs' })}
              className="group/specs md:col-span-5 lg:col-span-4 flex flex-col gap-6 text-xs font-sans tracking-widest uppercase text-neutral-600 p-5 -m-2 rounded-xl cursor-pointer ring-1 ring-transparent hover:ring-neutral-900 hover:bg-neutral-50/50 transition-all relative border border-transparent hover:border-neutral-200"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover/specs:opacity-100 transition-opacity">
                <span className="bg-neutral-900 text-white text-[10px] font-mono uppercase px-2 py-1 rounded shadow flex items-center gap-1">
                  <Edit2 size={11} /> Edit Specs
                </span>
              </div>

              <h3 className="text-sm font-bold text-black uppercase tracking-wider border-b border-black/10 pb-3">
                {product.title}
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline border-b border-black/10 pb-2.5">
                  <span className="font-bold text-neutral-900">Year</span>
                  <span className="text-neutral-600 font-mono text-[11px]">
                    {specs.year}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-black/10 pb-2.5">
                  <span className="font-bold text-neutral-900">Materials</span>
                  <span className="text-neutral-600 text-right max-w-[60%] lowercase capitalize">
                    {specs.materials}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-black/10 pb-2.5">
                  <span className="font-bold text-neutral-900">Dimensions</span>
                  <span className="text-neutral-600 font-mono text-[11px]">
                    {specs.dimensions}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-2 py-3.5 border border-black/30 font-semibold text-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors duration-200"
              >
                {product.button_text || 'REQUEST PRICE'}
              </button>
            </div>
          </div>
        </section>

        {/* 3. EDITORIAL GALLERY SECTION */}
        <section className="w-full py-8 md:py-16 px-6 md:px-12 lg:px-24 border-t border-black/5 bg-[#faf9f6]/40">
          <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
            
            {/* Row 1: Full-width Landscape image */}
            <div
              onClick={() => setActiveModal({ type: 'landscape1' })}
              className="group/img relative w-full aspect-[21/9] sm:aspect-[16/7] bg-[#e5e5e5] overflow-hidden shadow-sm cursor-pointer ring-2 ring-transparent hover:ring-neutral-900 rounded-lg transition-all"
            >
              <AppImage
                src={gallery.landscape1 || IMAGES.gallery.item1}
                fallbackSrc={IMAGES.gallery.item1}
                alt={`${product.title} detail view 1`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 flex items-center justify-center transition-all">
                <span className="opacity-0 group-hover/img:opacity-100 bg-neutral-900 text-white text-xs px-4 py-2 rounded-lg font-medium shadow-xl flex items-center gap-1.5 transition-all">
                  <Camera size={14} /> Change Landscape Image (Row 1)
                </span>
              </div>
            </div>

            {/* Row 2: Text (Left) + 2 Portrait/Square images (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              
              {/* Left Paragraph */}
              <div
                onClick={() => setActiveModal({ type: 'galleryText' })}
                className="group/text md:col-span-1 pt-2 p-3 -m-3 rounded-lg cursor-pointer ring-1 ring-transparent hover:ring-neutral-900 hover:bg-white transition-all relative"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover/text:opacity-100 transition-opacity">
                  <span className="bg-neutral-900 text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded shadow">
                    Edit Text
                  </span>
                </div>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                  {page_data.galleryDescription}
                </p>
              </div>

              {/* Middle Portrait Image */}
              <div
                onClick={() => setActiveModal({ type: 'portrait1' })}
                className="group/img relative md:col-span-1 aspect-square sm:aspect-[3/4] bg-[#e5e5e5] overflow-hidden rounded-lg cursor-pointer ring-2 ring-transparent hover:ring-neutral-900 transition-all"
              >
                <AppImage
                  src={gallery.portrait1 || IMAGES.gallery.item2}
                  fallbackSrc={IMAGES.gallery.item2}
                  alt={`${product.title} perspective 2`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 flex items-center justify-center transition-all">
                  <span className="opacity-0 group-hover/img:opacity-100 bg-neutral-900 text-white text-xs px-3.5 py-2 rounded-lg font-medium shadow-xl flex items-center gap-1.5 transition-all">
                    <Camera size={14} /> Change Image
                  </span>
                </div>
              </div>

              {/* Right Portrait Image */}
              <div
                onClick={() => setActiveModal({ type: 'portrait2' })}
                className="group/img relative md:col-span-1 aspect-square sm:aspect-[3/4] bg-[#e5e5e5] overflow-hidden rounded-lg cursor-pointer ring-2 ring-transparent hover:ring-neutral-900 transition-all"
              >
                <AppImage
                  src={gallery.portrait2 || IMAGES.gallery.item3}
                  fallbackSrc={IMAGES.gallery.item3}
                  alt={`${product.title} perspective 3`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 flex items-center justify-center transition-all">
                  <span className="opacity-0 group-hover/img:opacity-100 bg-neutral-900 text-white text-xs px-3.5 py-2 rounded-lg font-medium shadow-xl flex items-center gap-1.5 transition-all">
                    <Camera size={14} /> Change Image
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3: Text (Left) + Large Vertical Workshop Image (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              
              {/* Left Column: Heading + Description */}
              <div
                onClick={() => setActiveModal({ type: 'featureText' })}
                className="group/text md:col-span-1 pt-2 p-3 -m-3 rounded-lg cursor-pointer ring-1 ring-transparent hover:ring-neutral-900 hover:bg-white transition-all relative flex flex-col gap-3"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover/text:opacity-100 transition-opacity">
                  <span className="bg-neutral-900 text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded shadow">
                    Edit Text
                  </span>
                </div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  {page_data.featureHeading}
                </h4>
                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                  {page_data.featureDescription}
                </p>
              </div>

              {/* Right Column: Large Workshop Image */}
              <div
                onClick={() => setActiveModal({ type: 'featureImage' })}
                className="group/img relative md:col-span-2 aspect-[4/3] md:aspect-[16/11] bg-[#e5e5e5] overflow-hidden rounded-lg cursor-pointer ring-2 ring-transparent hover:ring-neutral-900 transition-all"
              >
                <AppImage
                  src={gallery.feature || IMAGES.gallery.item4}
                  fallbackSrc={IMAGES.gallery.item4}
                  alt={`${product.title} workshop prototype`}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 flex items-center justify-center transition-all">
                  <span className="opacity-0 group-hover/img:opacity-100 bg-neutral-900 text-white text-xs px-4 py-2 rounded-lg font-medium shadow-xl flex items-center gap-1.5 transition-all">
                    <Camera size={14} /> Change Workshop Image (Row 3)
                  </span>
                </div>
              </div>
            </div>

            {/* Row 4: Large Vertical Template Image (Left) + Text & Detail Image (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              
              {/* Left Column: Tall Portrait Template Photo */}
              <div
                onClick={() => setActiveModal({ type: 'detail1' })}
                className="group/img relative w-full aspect-[3/4] sm:aspect-[4/5] bg-[#e5e5e5] overflow-hidden rounded-lg cursor-pointer ring-2 ring-transparent hover:ring-neutral-900 transition-all"
              >
                <AppImage
                  src={gallery.detail1 || IMAGES.gallery.item5}
                  fallbackSrc={IMAGES.gallery.item5}
                  alt={`${product.title} template drafting`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 flex items-center justify-center transition-all">
                  <span className="opacity-0 group-hover/img:opacity-100 bg-neutral-900 text-white text-xs px-4 py-2 rounded-lg font-medium shadow-xl flex items-center gap-1.5 transition-all">
                    <Camera size={14} /> Change Template Photo (Left)
                  </span>
                </div>
              </div>

              {/* Right Column: Text Block + Detail Chisel Photo */}
              <div className="flex flex-col gap-8 md:gap-10">
                <div
                  onClick={() => setActiveModal({ type: 'detailText' })}
                  className="group/text flex flex-col gap-3 pt-2 p-3 -m-3 rounded-lg cursor-pointer ring-1 ring-transparent hover:ring-neutral-900 hover:bg-white transition-all relative"
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover/text:opacity-100 transition-opacity">
                    <span className="bg-neutral-900 text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded shadow">
                      Edit Text
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    {page_data.detailHeading}
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans">
                    {page_data.detailDescription}
                  </p>
                </div>

                <div
                  onClick={() => setActiveModal({ type: 'detail2' })}
                  className="group/img relative w-full aspect-[4/3] bg-[#e5e5e5] overflow-hidden rounded-lg cursor-pointer ring-2 ring-transparent hover:ring-neutral-900 transition-all"
                >
                  <AppImage
                    src={gallery.detail2 || IMAGES.gallery.item6}
                    fallbackSrc={IMAGES.gallery.item6}
                    alt={`${product.title} mortise chiseling`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 flex items-center justify-center transition-all">
                    <span className="opacity-0 group-hover/img:opacity-100 bg-neutral-900 text-white text-xs px-4 py-2 rounded-lg font-medium shadow-xl flex items-center gap-1.5 transition-all">
                      <Camera size={14} /> Change Detail Photo (Right)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          MODALS FOR IN-PLACE VISUAL EDITING
      ========================================================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-lg p-6 relative overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            {/* --- 1. HERO META (Title & Tag) --- */}
            {activeModal.type === 'heroMeta' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Edit Hero Title &amp; Collection Tag
                </h3>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="e.g. Artsy Table"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Tag / Collection Badge
                  </label>
                  <input
                    type="text"
                    value={product.tag}
                    onChange={(e) => setProduct({ ...product, tag: e.target.value })}
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="e.g. COLLECTION or RESTAURANT"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* --- 2. EDITORIAL DESCRIPTION --- */}
            {activeModal.type === 'editorial' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Edit Editorial Content
                </h3>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Secondary Heading
                  </label>
                  <input
                    type="text"
                    value={page_data.secondaryHeading}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: { ...page_data, secondaryHeading: e.target.value },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="e.g. ARTSY TABLE - ARCHITECTURAL MARQUETRY"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Detailed Story &amp; Description
                  </label>
                  <textarea
                    rows={6}
                    value={page_data.longDescription}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        long_description: e.target.value,
                        page_data: { ...page_data, longDescription: e.target.value },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 leading-relaxed"
                    placeholder="Write the craftsmanship story and piece description..."
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* --- 3. SPECIFICATIONS --- */}
            {activeModal.type === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Edit Specifications &amp; CTA
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={specs.year}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          page_data: {
                            ...page_data,
                            specs: { ...specs, year: e.target.value },
                          },
                        })
                      }
                      className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      placeholder="e.g. 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={product.button_text}
                      onChange={(e) => setProduct({ ...product, button_text: e.target.value })}
                      className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      placeholder="e.g. REQUEST PRICE"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Materials
                  </label>
                  <input
                    type="text"
                    value={specs.materials}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: {
                          ...page_data,
                          specs: { ...specs, materials: e.target.value },
                        },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="e.g. Solid Teak, Rosewood & Indian Laurel"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={specs.dimensions}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: {
                          ...page_data,
                          specs: { ...specs, dimensions: e.target.value },
                        },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="e.g. H88 × W68 × D72 cm"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* --- 4. GALLERY TEXT --- */}
            {activeModal.type === 'galleryText' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Edit Gallery Story (Row 2)
                </h3>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Story Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={page_data.galleryDescription}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: { ...page_data, galleryDescription: e.target.value },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 leading-relaxed"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* --- 5. FEATURE TEXT (Prototyping Row 3) --- */}
            {activeModal.type === 'featureText' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Edit Prototyping Section (Row 3)
                </h3>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={page_data.featureHeading}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: { ...page_data, featureHeading: e.target.value },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="e.g. Prototyping & Positioning"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={page_data.featureDescription}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: { ...page_data, featureDescription: e.target.value },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 leading-relaxed"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* --- 6. DETAIL TEXT (Template Row 4) --- */}
            {activeModal.type === 'detailText' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Edit Template Section (Row 4)
                </h3>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={page_data.detailHeading}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: { ...page_data, detailHeading: e.target.value },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="e.g. Template Making"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={page_data.detailDescription}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        page_data: { ...page_data, detailDescription: e.target.value },
                      })
                    }
                    className="w-full text-sm border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 leading-relaxed"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* --- 7. IMAGE UPLOADER MODALS --- */}
            {activeModal.type === 'heroImage' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Upload Hero Banner Image
                </h3>
                <VercelImageUploader
                  currentUrl={page_data.heroImage || product.image_url}
                  onImageUploaded={(url) => handleUpdateImage('heroImage', url)}
                  label="Hero Banner Image"
                />
              </div>
            )}

            {activeModal.type === 'landscape1' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Upload Full Landscape Image (Row 1)
                </h3>
                <VercelImageUploader
                  currentUrl={gallery.landscape1}
                  onImageUploaded={(url) => handleUpdateImage('landscape1', url)}
                  label="Row 1 Landscape Image"
                />
              </div>
            )}

            {activeModal.type === 'portrait1' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Upload Perspective Image 1 (Row 2)
                </h3>
                <VercelImageUploader
                  currentUrl={gallery.portrait1}
                  onImageUploaded={(url) => handleUpdateImage('portrait1', url)}
                  label="Perspective Image 1"
                />
              </div>
            )}

            {activeModal.type === 'portrait2' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Upload Perspective Image 2 (Row 2)
                </h3>
                <VercelImageUploader
                  currentUrl={gallery.portrait2}
                  onImageUploaded={(url) => handleUpdateImage('portrait2', url)}
                  label="Perspective Image 2"
                />
              </div>
            )}

            {activeModal.type === 'featureImage' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Upload Workshop Prototype Photo (Row 3)
                </h3>
                <VercelImageUploader
                  currentUrl={gallery.feature}
                  onImageUploaded={(url) => handleUpdateImage('feature', url)}
                  label="Workshop Prototype Photo"
                />
              </div>
            )}

            {activeModal.type === 'detail1' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Upload Tall Template Photo (Row 4 Left)
                </h3>
                <VercelImageUploader
                  currentUrl={gallery.detail1}
                  onImageUploaded={(url) => handleUpdateImage('detail1', url)}
                  label="Tall Template Photo"
                />
              </div>
            )}

            {activeModal.type === 'detail2' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Upload Chiseling / Mortise Detail Photo (Row 4 Right)
                </h3>
                <VercelImageUploader
                  currentUrl={gallery.detail2}
                  onImageUploaded={(url) => handleUpdateImage('detail2', url)}
                  label="Detail Photo"
                />
              </div>
            )}

            {/* --- 8. SETTINGS MODAL (Slug, Category, Visibility) --- */}
            {activeModal.type === 'settings' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                  Product Settings &amp; Catalog Routing
                </h3>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    URL Slug
                  </label>
                  <div className="flex items-center">
                    <span className="text-xs text-neutral-400 bg-neutral-100 px-3 py-2 rounded-l-lg border border-r-0 border-neutral-300 font-mono">
                      /products/
                    </span>
                    <input
                      type="text"
                      value={product.slug}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9_-]/g, '-'),
                        })
                      }
                      className="flex-1 text-sm border border-neutral-300 rounded-r-lg px-3 py-2 text-neutral-900 font-mono focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      placeholder="artsy-table"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-600 mb-1">
                    Category
                  </label>
                  <select
                    value={product.category_id || product.category}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      const matched = categories.find(
                        (c) => c.id === selectedVal || c.slug === selectedVal
                      );
                      setProduct({
                        ...product,
                        category: matched ? matched.slug : selectedVal,
                        category_id: matched ? matched.id : '',
                      });
                    }}
                    className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
                  >
                    {categories.length > 0 ? (
                      categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.slug})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="object">Object (Furniture, Decor)</option>
                        <option value="light">Light (Lighting)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.is_published}
                      onChange={(e) =>
                        setProduct({ ...product, is_published: e.target.checked })
                      }
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-neutral-700">
                      Publish immediately to public website
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

