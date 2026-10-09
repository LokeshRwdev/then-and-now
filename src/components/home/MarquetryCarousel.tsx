'use client';

import React, { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { IMAGES } from '@/lib/images';

interface MarquetryCarouselProps {
  stripSrc?: string;
}

export default function MarquetryCarousel({
  stripSrc = IMAGES.marquetry.strip,
}: MarquetryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.5;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 md:gap-6">
      {/* Left Navigation Chevron */}
      <button
        onClick={() => handleScroll('left')}
        aria-label="Previous slides"
        className="flex-shrink-0 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Strip Image Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto scrollbar-none flex items-center justify-start md:justify-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="relative h-24 sm:h-32 md:h-40 lg:h-44 min-w-[650px] sm:min-w-[800px] md:min-w-full flex-shrink-0">
          <AppImage
            src={stripSrc}
            alt="Marquetry Collection Preview Strip"
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover md:object-contain object-center"
          />
        </div>
      </div>

      {/* Right Navigation Chevron */}
      <button
        onClick={() => handleScroll('right')}
        aria-label="Next slides"
        className="flex-shrink-0 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
