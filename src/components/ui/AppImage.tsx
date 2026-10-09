'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { IMAGES } from '@/lib/images';

export interface AppImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

const COMMON_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

/**
 * AppImage Component
 * 
 * Best-practice wrapper around Next.js Image component:
 * - Smart multi-extension auto-recovery (.png, .jpg, .jpeg, .webp)
 * - Graceful fallback handling (if src is missing or fails to load)
 * - Smooth fade-in on load
 * - Automatic responsive `sizes` defaults when `fill` is used
 * - Integrated skeleton / shimmer background while loading
 */
export function AppImage({
  src,
  alt = 'Image',
  fallbackSrc = IMAGES.placeholders.default,
  className = '',
  fill,
  sizes,
  showSkeleton = true,
  onLoad,
  onError,
  ...props
}: AppImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [triedExts, setTriedExts] = useState<string[]>([]);

  // Sync state if src changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setHasError(false);
      setIsLoading(true);
      setTriedExts([]);
    } else {
      setImgSrc(fallbackSrc);
      setIsLoading(false);
    }
  }, [src, fallbackSrc]);

  const defaultSizes = fill
    ? sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    : sizes;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Auto-recovery: If a local static image failed, attempt alternative extensions (.png/.jpg/.jpeg/.webp)
    if (typeof imgSrc === 'string' && imgSrc.startsWith('/images/')) {
      const match = imgSrc.match(/^(.*)\.(jpg|jpeg|png|webp)(\?.*)?$/i);
      if (match) {
        const basePath = match[1];
        const currentExt = '.' + match[2].toLowerCase();
        const queryParams = match[3] || '';
        const currentTried = [...triedExts, currentExt];
        const nextExt = COMMON_IMAGE_EXTENSIONS.find(ext => !currentTried.includes(ext));

        if (nextExt) {
          setTriedExts(currentTried);
          setImgSrc(`${basePath}${nextExt}`);
          setIsLoading(true);
          return;
        }
      }
    }

    // All candidates failed or external image error -> fallback
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
    setIsLoading(false);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? 'w-full h-full' : 'inline-block'
      }`}
    >
      {/* Loading Skeleton */}
      {showSkeleton && isLoading && (
        <div 
          className="absolute inset-0 bg-[#E8E4DC] animate-pulse z-[1] transition-opacity duration-500" 
          aria-hidden="true" 
        />
      )}

      {/* Optimized Image */}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        fill={fill}
        sizes={defaultSizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-700 ease-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
      />
    </div>
  );
}

export default AppImage;
