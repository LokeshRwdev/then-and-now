'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface LoaderState {
  isLoading: boolean;
  activeCount: number;
  label: string;
}

// Global event bus for programmatic control
export function dispatchGlobalLoader(active: boolean, customLabel?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app:global-loader', {
        detail: { active, label: customLabel },
      })
    );
  }
}

export default function GlobalLoader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);
  const [label, setLabel] = useState('Syncing...');

  const activeRequestsRef = useRef(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to start the progress animation
  const startLoading = (customLabel?: string) => {
    if (finishTimeoutRef.current) {
      clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = null;
    }

    if (customLabel) {
      setLabel(customLabel);
    }

    setVisible(true);
    setPillVisible(true);

    // Initial leap
    setProgress((prev) => (prev > 0 && prev < 90 ? prev : 18));

    // Clear any previous interval
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    // Natural progress crawl
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Hold at 90% until done
        if (prev < 40) return prev + 10;
        if (prev < 70) return prev + 4;
        if (prev < 85) return prev + 1.5;
        return prev + 0.5;
      });
    }, 150);

    // Safety watchdog: auto-clear after 15s if a request hangs
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    safetyTimeoutRef.current = setTimeout(() => {
      if (activeRequestsRef.current > 0) {
        console.warn('[GlobalLoader] Request timed out, auto-completing loader.');
        activeRequestsRef.current = 0;
        stopLoading();
      }
    }, 15000);
  };

  // Helper to finish and fade out
  const stopLoading = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    // Rush to 100%
    setProgress(100);
    setPillVisible(false);

    // Fade out after completion
    finishTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      // Reset back to 0 after fade transition finishes
      setTimeout(() => {
        setProgress(0);
        setLabel('Syncing...');
      }, 300);
    }, 280);
  };

  // Setup client fetch interceptor and event listeners
  useEffect(() => {
    setMounted(true);

    // Wrap window.fetch to detect background API and Supabase requests
    const originalFetch = window.fetch;

    const requestTracker = {
      increment: (url: string, isServerAction?: boolean) => {
        activeRequestsRef.current += 1;
        
        let detectedLabel = 'Syncing...';
        if (url.includes('/upload')) detectedLabel = 'Uploading...';
        else if (url.includes('/catalog')) detectedLabel = 'Saving Catalog...';
        else if (url.includes('/content')) detectedLabel = 'Updating Content...';
        else if (url.includes('supabase.co')) detectedLabel = 'Saving to Database...';
        else if (isServerAction) {
          detectedLabel = url.includes('/login') ? 'Signing in...' : 'Processing...';
        }

        startLoading(detectedLabel);
      },
      decrement: () => {
        activeRequestsRef.current = Math.max(0, activeRequestsRef.current - 1);
        if (activeRequestsRef.current === 0) {
          stopLoading();
        }
      },
    };

    window.fetch = async function (...args) {
      const input = args[0];
      const init = args[1];
      let urlStr = '';

      if (typeof input === 'string') {
        urlStr = input;
      } else if (input instanceof URL) {
        urlStr = input.href;
      } else if (typeof Request !== 'undefined' && input instanceof Request) {
        urlStr = input.url;
      }

      // Check if this request is a Next.js server action
      const isServerAction = Boolean(
        (init?.headers &&
          ((typeof (init.headers as any).get === 'function' &&
            Boolean((init.headers as any).get('next-action'))) ||
            (typeof init.headers === 'object' &&
              ('next-action' in init.headers || 'Next-Action' in init.headers)))) ||
          (typeof Request !== 'undefined' &&
            input instanceof Request &&
            Boolean(input.headers?.get('next-action')))
      );

      // Check if this request is an API, server action, upload, or database call
      const isApi =
        urlStr.includes('/api/') ||
        urlStr.startsWith('/api') ||
        urlStr.includes('.supabase.co') ||
        isServerAction;

      // Filter out static media assets
      const isStatic = /\.(png|jpe?g|webp|svg|gif|ico|woff2?|css)$/i.test(urlStr);

      const trackThis = isApi && !isStatic;

      if (trackThis) {
        requestTracker.increment(urlStr, isServerAction);
      }

      try {
        const response = await originalFetch.apply(this, args);
        return response;
      } catch (err) {
        throw err;
      } finally {
        if (trackThis) {
          requestTracker.decrement();
        }
      }
    };

    // Custom event listener for manual triggers
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean; label?: string }>;
      if (customEvent.detail?.active) {
        activeRequestsRef.current += 1;
        startLoading(customEvent.detail.label || 'Processing...');
      } else {
        activeRequestsRef.current = Math.max(0, activeRequestsRef.current - 1);
        if (activeRequestsRef.current === 0) {
          stopLoading();
        }
      }
    };

    window.addEventListener('app:global-loader', handleCustomEvent);

    return () => {
      window.fetch = originalFetch;
      window.removeEventListener('app:global-loader', handleCustomEvent);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, []);

  // Complete any remaining loader progress when the route changes
  useEffect(() => {
    if (activeRequestsRef.current === 0 && progress > 0) {
      stopLoading();
    }
  }, [pathname]);

  return (
    <>
      {/* 1. Top High-Precision Slim Progress Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[999999] pointer-events-none transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: '3px' }}
      >
        <div
          className="h-full bg-gradient-to-r from-neutral-900 via-[#C85A17] to-amber-500 relative transition-all ease-out"
          style={{
            width: `${progress}%`,
            transitionDuration: progress === 100 ? '200ms' : '150ms',
            boxShadow: '0 0 10px rgba(200, 90, 23, 0.7), 0 0 5px rgba(26, 26, 26, 0.5)',
          }}
        >
          {/* Glowing pulse at the leading tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 blur-[3px] opacity-80" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-white/40" />
        </div>
      </div>

      {/* 2. Floating Minimalist Status Pill (Top Center) */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[999999] pointer-events-none transition-all duration-300 ${
          pillVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/95 text-white backdrop-blur-md border border-white/20 shadow-2xl">
          <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span className="text-[10px] font-mono tracking-widest uppercase font-medium text-neutral-200">
            {label}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
        </div>
      </div>
    </>
  );
}
