'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import EditableWrapper from './EditableWrapper';
import { EditableEntity } from './AdminEditModal';
import { Plus, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { IMAGES } from '@/lib/images';

interface LivePageVisualEditorProps {
  pageSlug: string;
  sections: EditableEntity[];
  products: EditableEntity[];
  steps: EditableEntity[];
  stories: EditableEntity[];
  onEditEntity: (entity: EditableEntity) => void;
  onDeleteEntity: (id: string, type: EditableEntity['type']) => void;
  onAddNewEntity: (type: EditableEntity['type'], defaultData?: Partial<EditableEntity>) => void;
}

export default function LivePageVisualEditor({
  pageSlug,
  sections,
  products,
  steps,
  stories,
  onEditEntity,
  onDeleteEntity,
  onAddNewEntity,
}: LivePageVisualEditorProps) {
  // Helper to find a section by section_key
  const getSection = (key: string, fallbackTitle = ''): EditableEntity => {
    const found = sections.find((s) => s.section_key === key);
    if (found) return found;
    return {
      id: `${pageSlug}-${key}`,
      type: 'section',
      page_slug: pageSlug,
      section_key: key,
      title: fallbackTitle || key,
      content: '',
      image_url: IMAGES.placeholders.default,
      sort_order: 0,
      is_active: true,
    };
  };

  /* =========================================================================
     1. HOME PAGE LIVE VISUAL PREVIEW
     ========================================================================= */
  if (pageSlug === 'home') {
    const hero = getSection('hero', 'crafted for non-conformists');
    const statement1 = getSection('statement_1', "We don't manufacture furniture. We craft enduring objects.");
    const marquetry = getSection('marquetry', 'Marquetry');
    const statement2 = getSection('statement_2', 'Artisanal Quality: Each furniture piece is meticulously handcrafted.');
    const bannerInterior = getSection('banner_interior', 'Interior Collection Feature');
    const statementOak = getSection('statement_oak', 'Enhance your indoor and outdoor spaces...');

    return (
      <div className="w-full bg-[#EAE6DF] min-h-screen border border-neutral-300 shadow-xl overflow-hidden rounded-lg">
        {/* Banner Alert for Admin */}
        <div className="bg-neutral-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Live Visual Editor Mode</span>
            <span className="text-neutral-400 hidden sm:inline">— Click directly on any box, card, or image below to edit or delete it.</span>
          </div>
          <button
            onClick={() => onAddNewEntity('product', { category: 'object' })}
            className="flex items-center gap-1.5 bg-white text-black px-2.5 py-1 rounded text-[11px] font-medium hover:bg-neutral-200 transition-colors"
          >
            <Plus size={13} /> Add Featured Product
          </button>
        </div>

        {/* 1. Hero Section */}
        <EditableWrapper
          entity={hero}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Home : Hero Banner"
          canDelete={false}
        >
          <section className="relative w-full min-h-[500px] flex flex-col justify-between overflow-hidden bg-black text-white">
            <div className="absolute inset-0 z-0">
              <AppImage
                src={hero.image_url || IMAGES.hero.home}
                alt="Hero banner"
                fill
                priority
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 py-32 flex flex-col items-start">
              <h1 className="text-3xl sm:text-5xl font-sans font-normal lowercase tracking-tight text-[#1A1A1A] leading-[1.08] max-w-2xl mb-6 drop-shadow-sm bg-white/70 backdrop-blur-sm p-4 rounded-sm">
                {hero.title}
              </h1>
              <div className="inline-block border border-[#1A1A1A] px-6 py-2.5 text-xs font-sans tracking-[0.2em] uppercase font-medium text-[#1A1A1A] bg-white/80">
                {hero.button_text || 'EXPLORE COLLECTION'}
              </div>
            </div>
          </section>
        </EditableWrapper>

        {/* 2. Category Navigation */}
        <section className="w-full bg-[#EAE6DF] border-t border-black/15">
          {['PRODUCTS', 'LIGHTS', 'PROCESS', 'MATERIAL LIBRARY'].map((cat, idx) => (
            <div
              key={cat}
              className="group block w-full py-6 border-b border-black/15 text-center bg-[#EAE6DF]"
            >
              <h2 className="text-2xl sm:text-4xl font-sans font-normal uppercase tracking-tight text-[#1A1A1A]">
                {cat}
              </h2>
              <span className="inline-block mt-1 text-[11px] font-sans tracking-[0.2em] uppercase text-[#1A1A1A] underline underline-offset-4 font-medium">
                VIEW COLLECTION
              </span>
            </div>
          ))}
        </section>

        {/* 3. Statement 1 */}
        <EditableWrapper
          entity={statement1}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Home : Statement Section"
        >
          <section className="relative w-full py-20 px-6 bg-black text-white text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl font-sans font-normal leading-[1.25] tracking-tight text-white mb-6">
                {statement1.title}
              </h2>
              <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
                {statement1.content}
              </p>
              <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-white underline underline-offset-8">
                {statement1.button_text || 'REQUEST INFO'}
              </span>
            </div>
          </section>
        </EditableWrapper>

        {/* 4. Marquetry Section */}
        <EditableWrapper
          entity={marquetry}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Home : Marquetry Feature"
        >
          <section className="relative w-full min-h-[460px] flex flex-col justify-between overflow-hidden bg-black text-white">
            <div className="absolute inset-0 z-0">
              <AppImage
                src={marquetry.image_url || IMAGES.marquetry.hero}
                alt="Marquetry"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center text-center px-6 py-20">
              <h2 className="text-5xl sm:text-7xl font-sans font-normal text-white tracking-tight drop-shadow-md mb-4">
                {marquetry.title}
              </h2>
              <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-white underline underline-offset-8">
                {marquetry.button_text || 'EXPLORE STORY'}
              </span>
            </div>
          </section>
        </EditableWrapper>

        {/* 5. Featured Products Grid (Click any card to edit/delete) */}
        <section className="w-full bg-[#EAE6DF] border-t border-black/15">
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/15">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Featured Showcase Grid ({products.length} Items)
            </span>
            <button
              onClick={() => onAddNewEntity('product', { category: 'object' })}
              className="flex items-center gap-1.5 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded hover:bg-neutral-800 transition-colors"
            >
              <Plus size={14} /> Add Product Card
            </button>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3">
            {products.slice(0, 6).map((product, index) => {
              const isRightCol = (index + 1) % 3 === 0;
              return (
                <EditableWrapper
                  key={product.id}
                  entity={product}
                  onEdit={onEditEntity}
                  onDelete={onDeleteEntity}
                  label={`Product: ${product.title}`}
                  className={`bg-white border-b border-black/15 ${
                    !isRightCol ? 'md:border-r md:border-black/15' : ''
                  }`}
                >
                  <div className="relative w-full aspect-square bg-[#E8E6E1] overflow-hidden flex items-center justify-center">
                    <AppImage
                      src={product.image_url || IMAGES.placeholders.default}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                      {product.title}
                    </div>
                  </div>
                  <div className="w-full bg-white py-3 px-6 flex items-center justify-center border-t border-black/10">
                    <span className="inline-block border border-black/50 px-6 py-1.5 text-xs font-sans tracking-wider text-[#1A1A1A]">
                      {product.button_text || 'Read Details'}
                    </span>
                  </div>
                </EditableWrapper>
              );
            })}
          </div>
        </section>

        {/* 6. Artisanal Quality Statement */}
        <EditableWrapper
          entity={statement2}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Home : Quality Banner"
        >
          <section className="relative w-full py-20 px-6 bg-black text-white text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-sans font-normal leading-[1.25] tracking-tight text-white">
                {statement2.title}
              </h2>
            </div>
          </section>
        </EditableWrapper>

        {/* 7. Full-Width Interior Banner */}
        <EditableWrapper
          entity={bannerInterior}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Home : Living Room Banner"
        >
          <section className="relative w-full h-[400px] overflow-hidden bg-black">
            <AppImage
              src={bannerInterior.image_url || IMAGES.banners.livingRoom}
              alt="Living room feature"
              fill
              className="object-cover"
            />
          </section>
        </EditableWrapper>

        {/* 8. Oak Chairs Feature Section */}
        <EditableWrapper
          entity={statementOak}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Home : Solid Oak Feature"
        >
          <section className="w-full bg-white py-16 px-8 border-t border-black/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7 flex flex-col items-start pr-4">
                <h2 className="text-xl sm:text-2xl font-sans font-normal leading-relaxed text-[#1A1A1A] mb-6">
                  {statementOak.title}
                </h2>
                {statementOak.content && (
                  <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                    {statementOak.content}
                  </p>
                )}
                <span className="inline-block text-xs uppercase underline tracking-wider text-[#1A1A1A]">
                  {statementOak.button_text || 'Read More'}
                </span>
              </div>
              <div className="md:col-span-5 relative w-full aspect-[4/3] bg-[#E8E6E1] overflow-hidden rounded">
                <AppImage
                  src={statementOak.image_url || IMAGES.banners.oakChairs}
                  alt="Solid oak furniture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        </EditableWrapper>
      </div>
    );
  }

  /* =========================================================================
     2. OBJECTS / LIGHTS CATEGORY PAGES LIVE VISUAL PREVIEW
     ========================================================================= */
  if (pageSlug === 'objects' || pageSlug === 'lights') {
    const isLights = pageSlug === 'lights';
    const categoryName = isLights ? 'light' : 'object';
    const heroBanner = getSection('hero', isLights ? 'Lights' : 'Objects');
    const filteredProducts = products.filter((p) => p.category === categoryName);

    return (
      <div className="w-full bg-[#EAE6DF] min-h-screen border border-neutral-300 shadow-xl overflow-hidden rounded-lg">
        {/* Banner Alert for Admin */}
        <div className="bg-neutral-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">{isLights ? 'Lights' : 'Objects'} Visual Editor</span>
            <span className="text-neutral-400 hidden sm:inline">— Click any card or banner to edit/delete</span>
          </div>
          <button
            onClick={() => onAddNewEntity('product', { category: categoryName })}
            className="flex items-center gap-1.5 bg-white text-black px-2.5 py-1 rounded text-[11px] font-medium hover:bg-neutral-200 transition-colors"
          >
            <Plus size={13} /> Add New {isLights ? 'Light' : 'Object'}
          </button>
        </div>

        {/* Hero Banner */}
        <EditableWrapper
          entity={heroBanner}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label={`${isLights ? 'Lights' : 'Objects'} : Hero Banner`}
          canDelete={false}
        >
          <div className="relative w-full h-[360px] bg-neutral-900 overflow-hidden flex items-center justify-center text-white">
            <AppImage
              src={heroBanner.image_url || (isLights ? IMAGES.hero.lights : IMAGES.hero.objects)}
              alt={heroBanner.title}
              fill
              className="object-cover opacity-80"
            />
            <h1 className="relative z-10 text-4xl sm:text-6xl font-light uppercase tracking-tight text-white drop-shadow-md">
              {heroBanner.title}
            </h1>
          </div>
        </EditableWrapper>

        {/* Product Grid */}
        <section className="w-full py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProducts.map((product) => (
              <EditableWrapper
                key={product.id}
                entity={product}
                onEdit={onEditEntity}
                onDelete={onDeleteEntity}
                label={`Product: ${product.title}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-200"
              >
                <div className="relative w-full aspect-square bg-[#e5e5e5] overflow-hidden">
                  <AppImage
                    src={product.image_url || IMAGES.placeholders.default}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 text-black text-[11px] px-2.5 py-0.5 uppercase tracking-wider font-semibold rounded">
                    {product.subtitle || 'COLLECTION'}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-normal text-neutral-900 uppercase tracking-tight">
                      {product.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                      {product.content || 'Artisanal handcrafted design piece.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-900 border border-neutral-300 px-4 py-1.5 rounded">
                      {product.button_text || 'REQUEST PRICE'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      /{product.slug || product.id}
                    </span>
                  </div>
                </div>
              </EditableWrapper>
            ))}
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================================
     3. PROCESS PAGE LIVE VISUAL PREVIEW
     ========================================================================= */
  if (pageSlug === 'process') {
    const heroBanner = getSection('hero', 'Process');

    return (
      <div className="w-full bg-[#EAE6DF] min-h-screen border border-neutral-300 shadow-xl overflow-hidden rounded-lg">
        {/* Banner Alert for Admin */}
        <div className="bg-neutral-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Process Page Visual Editor</span>
            <span className="text-neutral-400 hidden sm:inline">— Click any step or image to edit or delete</span>
          </div>
          <button
            onClick={() => onAddNewEntity('step', { step_number: `0${steps.length + 1}` })}
            className="flex items-center gap-1.5 bg-white text-black px-2.5 py-1 rounded text-[11px] font-medium hover:bg-neutral-200 transition-colors"
          >
            <Plus size={13} /> Add Process Step
          </button>
        </div>

        {/* Hero Banner */}
        <EditableWrapper
          entity={heroBanner}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Process : Hero Banner"
          canDelete={false}
        >
          <div className="relative w-full h-[360px] bg-neutral-900 overflow-hidden flex items-center justify-center text-white">
            <AppImage
              src={heroBanner.image_url || IMAGES.hero.process}
              alt="Process"
              fill
              className="object-cover opacity-80"
            />
            <h1 className="relative z-10 text-4xl sm:text-6xl font-light uppercase tracking-tight text-white drop-shadow-md">
              {heroBanner.title}
            </h1>
          </div>
        </EditableWrapper>

        {/* Process Steps */}
        <section className="w-full py-20 px-6 max-w-4xl mx-auto space-y-20">
          {steps.map((step) => (
            <EditableWrapper
              key={step.id}
              entity={step}
              onEdit={onEditEntity}
              onDelete={onDeleteEntity}
              label={`Step ${step.step_number || ''}: ${step.title}`}
              className="bg-white/80 p-8 rounded-lg shadow-sm border border-black/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 text-7xl font-light text-black leading-none select-none">
                  {step.step_number || '01'}
                </div>
                <div className="md:col-span-9 flex flex-col pt-1">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black leading-snug">
                    {step.title}
                  </h2>
                  {step.subtitle && (
                    <p className="text-xs uppercase tracking-widest text-black/60 font-medium mt-1">
                      {step.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-black/75 leading-relaxed mt-4">
                    {step.content}
                  </p>
                  {step.image_url && (
                    <div className="w-full aspect-[21/9] bg-[#dfdbd3] relative overflow-hidden mt-6 rounded">
                      <AppImage
                        src={step.image_url}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </EditableWrapper>
          ))}
        </section>
      </div>
    );
  }

  /* =========================================================================
     4. MATERIAL LIBRARY LIVE VISUAL PREVIEW
     ========================================================================= */
  if (pageSlug === 'material-library') {
    const hero = getSection('hero', 'Material Library');
    const timberYardIntro = getSection('timber_yard_intro', 'Timber Yard Selection');
    const timberStatement = getSection('timber_statement', 'We use both reclaimed and new timber...');
    const timberUnloaded = getSection('timber_unloaded', 'Teak blocks and planks unloaded');
    const carpenters = getSection('carpenters', 'Our carpenters from traditional communities');
    const caneWeaving = getSection('cane_weaving', 'Cane weaving craftsmanship');

    return (
      <div className="w-full bg-white min-h-screen border border-neutral-300 shadow-xl overflow-hidden rounded-lg">
        {/* Banner Alert for Admin */}
        <div className="bg-neutral-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Material Library Visual Editor</span>
            <span className="text-neutral-400 hidden sm:inline">— Click any section, photo or caption to edit</span>
          </div>
          <button
            onClick={() => onAddNewEntity('section', { page_slug: 'material-library', section_key: `custom_${Date.now()}` })}
            className="flex items-center gap-1.5 bg-white text-black px-2.5 py-1 rounded text-[11px] font-medium hover:bg-neutral-200 transition-colors"
          >
            <Plus size={13} /> Add Material Section
          </button>
        </div>

        {/* Hero Banner */}
        <EditableWrapper
          entity={hero}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Material Library : Hero Banner"
          canDelete={false}
        >
          <div className="relative w-full h-[360px] bg-neutral-900 overflow-hidden flex items-center justify-center text-white">
            <AppImage
              src={hero.image_url || '/images/material-library/hero-banner.png'}
              alt={hero.title}
              fill
              className="object-cover opacity-85"
            />
            <h1 className="relative z-10 text-4xl sm:text-6xl font-light uppercase tracking-tight text-white drop-shadow-md">
              {hero.title}
            </h1>
          </div>
        </EditableWrapper>

        <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
          {/* Section 1 */}
          <EditableWrapper
            entity={timberYardIntro}
            onEdit={onEditEntity}
            onDelete={onDeleteEntity}
            label="Section 1 : Timber Yard Intro"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start p-4 bg-neutral-50/60 rounded">
              <div className="md:col-span-7 aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden rounded shadow-sm">
                <AppImage
                  src={timberYardIntro.image_url || '/images/material-library/timber-yard-intro.png'}
                  alt={timberYardIntro.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-5 flex flex-col space-y-4 pt-2">
                <h3 className="text-sm font-semibold text-neutral-900">{timberYardIntro.title}</h3>
                <p className="text-xs text-neutral-700 leading-relaxed">{timberYardIntro.content}</p>
              </div>
            </div>
          </EditableWrapper>

          {/* Section 2 */}
          <EditableWrapper
            entity={timberStatement}
            onEdit={onEditEntity}
            onDelete={onDeleteEntity}
            label="Section 2 : Timber Philosophy"
          >
            <div className="max-w-3xl space-y-4 p-4 bg-neutral-50/60 rounded">
              <h2 className="text-2xl font-light text-neutral-900">{timberStatement.title}</h2>
              <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line">{timberStatement.content}</p>
            </div>
          </EditableWrapper>

          {/* Section 3 */}
          <EditableWrapper
            entity={timberUnloaded}
            onEdit={onEditEntity}
            onDelete={onDeleteEntity}
            label="Section 3 : Teak Blocks Unloaded"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start p-4 bg-neutral-50/60 rounded">
              <div className="md:col-span-5 pt-2">
                <p className="text-xs text-neutral-600 leading-relaxed">{timberUnloaded.content}</p>
              </div>
              <div className="md:col-span-7 aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden rounded shadow-sm">
                <AppImage
                  src={timberUnloaded.image_url || '/images/material-library/timber-blocks-unloaded.png'}
                  alt={timberUnloaded.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </EditableWrapper>

          {/* Section 4 */}
          <EditableWrapper
            entity={carpenters}
            onEdit={onEditEntity}
            onDelete={onDeleteEntity}
            label="Section 4 : Woodworking Artisans"
          >
            <div className="p-6 bg-neutral-50/60 rounded space-y-6">
              <h2 className="text-2xl font-light text-neutral-900">{carpenters.title}</h2>
              <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line">{carpenters.content}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="aspect-[4/3] bg-[#e5e5e5] relative overflow-hidden rounded">
                  <AppImage
                    src={carpenters.image_url || '/images/material-library/carpenter-at-bench.png'}
                    alt="Artisan"
                    fill
                    className="object-cover"
                  />
                </div>
                {carpenters.secondary_image_url && (
                  <div className="aspect-[4/3] bg-[#e5e5e5] relative overflow-hidden rounded">
                    <AppImage
                      src={carpenters.secondary_image_url}
                      alt="Floor work"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </EditableWrapper>
        </div>
      </div>
    );
  }

  /* =========================================================================
     5. ABOUT US LIVE VISUAL PREVIEW
     ========================================================================= */
  if (pageSlug === 'about') {
    const hero = getSection('hero', 'About us');
    const statement = getSection('statement', 'Built Through Meaningful Partnerships');
    const whoWeAre = getSection('who_we_are', 'Who We Are');
    const evolution = getSection('evolution', 'Evolution');
    const team = getSection('team', 'Our Team');
    const founder = getSection('founder', 'Founder');

    return (
      <div className="w-full bg-white min-h-screen border border-neutral-300 shadow-xl overflow-hidden rounded-lg">
        {/* Banner Alert for Admin */}
        <div className="bg-neutral-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">About Page Visual Editor</span>
            <span className="text-neutral-400 hidden sm:inline">— Click any section to edit text or upload pictures</span>
          </div>
          <button
            onClick={() => onAddNewEntity('section', { page_slug: 'about', section_key: `custom_${Date.now()}` })}
            className="flex items-center gap-1.5 bg-white text-black px-2.5 py-1 rounded text-[11px] font-medium hover:bg-neutral-200 transition-colors"
          >
            <Plus size={13} /> Add About Section
          </button>
        </div>

        {/* Hero Banner */}
        <EditableWrapper
          entity={hero}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="About : Hero Banner"
          canDelete={false}
        >
          <div className="relative w-full h-[360px] bg-neutral-900 overflow-hidden flex items-center justify-center text-white">
            <AppImage
              src={hero.image_url || IMAGES.about.hero}
              alt="About Us"
              fill
              className="object-cover opacity-85"
            />
            <h1 className="relative z-10 text-4xl sm:text-6xl font-light uppercase tracking-tight text-white drop-shadow-md">
              {hero.title}
            </h1>
          </div>
        </EditableWrapper>

        {/* Statement */}
        <EditableWrapper
          entity={statement}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="About : Statement Banner"
        >
          <section className="w-full bg-black text-white py-14 px-6 text-center">
            <p className="max-w-3xl mx-auto text-sm md:text-base font-light text-neutral-200 leading-relaxed">
              {statement.content}
            </p>
          </section>
        </EditableWrapper>

        {/* Who We Are */}
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          <EditableWrapper
            entity={whoWeAre}
            onEdit={onEditEntity}
            onDelete={onDeleteEntity}
            label="About : Who We Are"
          >
            <div className="space-y-6 p-4 bg-neutral-50/60 rounded">
              <h2 className="text-2xl font-normal text-neutral-900">{whoWeAre.title}</h2>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed whitespace-pre-line">
                {whoWeAre.content}
              </p>
              {whoWeAre.image_url && (
                <div className="aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden rounded shadow-sm">
                  <AppImage src={whoWeAre.image_url} alt={whoWeAre.title} fill className="object-cover" />
                </div>
              )}
            </div>
          </EditableWrapper>

          {/* Evolution */}
          <EditableWrapper
            entity={evolution}
            onEdit={onEditEntity}
            onDelete={onDeleteEntity}
            label="About : Evolution"
          >
            <div className="space-y-6 p-4 bg-neutral-50/60 rounded">
              <h2 className="text-2xl font-normal text-neutral-900">{evolution.title}</h2>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed whitespace-pre-line">
                {evolution.content}
              </p>
              {evolution.image_url && (
                <div className="aspect-[16/10] bg-[#e5e5e5] relative overflow-hidden rounded shadow-sm">
                  <AppImage src={evolution.image_url} alt={evolution.title} fill className="object-cover" />
                </div>
              )}
            </div>
          </EditableWrapper>

          {/* Team & Founder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EditableWrapper
              entity={team}
              onEdit={onEditEntity}
              onDelete={onDeleteEntity}
              label="About : Our Team"
            >
              <div className="space-y-4 p-4 bg-neutral-50/60 rounded h-full">
                <h2 className="text-xl font-normal text-neutral-900">{team.title}</h2>
                <p className="text-xs text-neutral-800 leading-relaxed whitespace-pre-line">{team.content}</p>
                {team.image_url && (
                  <div className="aspect-[4/3] bg-[#e5e5e5] relative overflow-hidden rounded">
                    <AppImage src={team.image_url} alt={team.title} fill className="object-cover" />
                  </div>
                )}
              </div>
            </EditableWrapper>

            <EditableWrapper
              entity={founder}
              onEdit={onEditEntity}
              onDelete={onDeleteEntity}
              label="About : Founder"
            >
              <div className="space-y-4 p-4 bg-neutral-50/60 rounded h-full">
                <h2 className="text-xl font-normal text-neutral-900">{founder.title}</h2>
                <p className="text-xs text-neutral-800 leading-relaxed whitespace-pre-line">{founder.content}</p>
              </div>
            </EditableWrapper>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     6. STORIES / PRESS LIVE VISUAL PREVIEW
     ========================================================================= */
  if (pageSlug === 'press') {
    const hero = getSection('hero', 'Stories');

    return (
      <div className="w-full bg-white min-h-screen border border-neutral-300 shadow-xl overflow-hidden rounded-lg">
        {/* Banner Alert for Admin */}
        <div className="bg-neutral-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Stories / Press Visual Editor</span>
            <span className="text-neutral-400 hidden sm:inline">— Click any story card to edit text or replace image</span>
          </div>
          <button
            onClick={() => onAddNewEntity('story')}
            className="flex items-center gap-1.5 bg-white text-black px-2.5 py-1 rounded text-[11px] font-medium hover:bg-neutral-200 transition-colors"
          >
            <Plus size={13} /> Add New Story
          </button>
        </div>

        {/* Hero Banner */}
        <EditableWrapper
          entity={hero}
          onEdit={onEditEntity}
          onDelete={onDeleteEntity}
          label="Stories : Hero Banner"
          canDelete={false}
        >
          <div className="relative w-full h-[360px] bg-neutral-900 overflow-hidden flex items-center justify-center text-white">
            <AppImage
              src={hero.image_url || IMAGES.hero.home}
              alt="Stories"
              fill
              className="object-cover opacity-85"
            />
            <div className="relative z-10 text-center">
              <h1 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white drop-shadow-md">
                {hero.title}
              </h1>
              {hero.subtitle && (
                <p className="text-xs tracking-[0.2em] uppercase font-semibold text-neutral-300 mt-2">
                  {hero.subtitle}
                </p>
              )}
            </div>
          </div>
        </EditableWrapper>

        {/* Stories Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <EditableWrapper
                key={story.id}
                entity={story}
                onEdit={onEditEntity}
                onDelete={onDeleteEntity}
                label={`Story: ${story.title}`}
                className="bg-white rounded-lg p-3 shadow-sm border border-neutral-200"
              >
                <div className="w-full aspect-[3/4] bg-[#e5e5e5] mb-4 relative overflow-hidden rounded">
                  <AppImage
                    src={story.image_url || IMAGES.placeholders.default}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base font-medium text-neutral-900">{story.title}</h3>
                <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                  {story.subtitle || 'COLLECTION'}
                </p>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                  {story.content}
                </p>
              </EditableWrapper>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return <div>Unknown page: {pageSlug}</div>;
}
