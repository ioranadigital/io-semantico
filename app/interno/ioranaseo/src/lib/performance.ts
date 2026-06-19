import { useEffect, useState } from "react";

interface CacheConfig {
  maxAge: number;
  staleWhileRevalidate?: number;
  staleIfError?: number;
}

export const defaultCacheStrategies: Record<string, CacheConfig> = {
  static: {
    maxAge: 31536000, // 1 year
    staleWhileRevalidate: 31536000,
  },
  html: {
    maxAge: 0,
    staleWhileRevalidate: 3600,
  },
  api: {
    maxAge: 60,
    staleWhileRevalidate: 300,
  },
  image: {
    maxAge: 31536000,
    staleWhileRevalidate: 31536000,
  },
};

export function getCacheHeaders(
  strategy: keyof typeof defaultCacheStrategies,
): Record<string, string> {
  const config = defaultCacheStrategies[strategy];

  let cacheControl = `public, max-age=${config.maxAge}`;

  if (config.staleWhileRevalidate) {
    cacheControl += `, stale-while-revalidate=${config.staleWhileRevalidate}`;
  }

  if (config.staleIfError) {
    cacheControl += `, stale-if-error=${config.staleIfError}`;
  }

  return {
    "Cache-Control": cacheControl,
    "CDN-Cache-Control": cacheControl,
  };
}

interface ImageOptimizationOptions {
  width: number;
  height: number;
  quality?: number;
  format?: "webp" | "avif" | "auto";
  priority?: boolean;
}

export function optimizeImageUrl(
  src: string,
  options: ImageOptimizationOptions,
): string {
  const { width, height, quality = 75, format = "auto", priority } = options;

  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
    f: format,
  });

  if (priority) {
    params.append("priority", "true");
  }

  return `${src}?${params.toString()}`;
}

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

export function useWebVitals(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics((prev) => ({
        ...prev,
        lcp: lastEntry.renderTime || lastEntry.loadTime,
      }));
    });

    try {
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      // LCP not supported
    }

    // CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let clsValue = 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setMetrics((prev) => ({
        ...prev,
        cls: clsValue,
      }));
    });

    try {
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      // CLS not supported
    }

    // FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(
        (entry) => entry.name === "first-contentful-paint",
      );
      if (fcpEntry) {
        setMetrics((prev) => ({
          ...prev,
          fcp: fcpEntry.startTime,
        }));
      }
    });

    try {
      fcpObserver.observe({ type: "paint", buffered: true });
    } catch (e) {
      // FCP not supported
    }

    // TTFB (Time to First Byte)
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    if (navigation) {
      setMetrics((prev) => ({
        ...prev,
        ttfb: navigation.responseStart - navigation.fetchStart,
      }));
    }

    return () => {
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  return metrics;
}

export interface CodeSplittingConfig {
  chunkSize: number;
  minChunks: number;
  maxAsync: number;
}

export const defaultCodeSplittingConfig: CodeSplittingConfig = {
  chunkSize: 250000, // bytes
  minChunks: 2,
  maxAsync: Infinity,
};

export function compressImage(
  file: File,
  quality: number = 0.8,
): Promise<Blob> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              resolve(blob || file);
            },
            "image/webp",
            quality,
          );
        }
      };
    };
  });
}
