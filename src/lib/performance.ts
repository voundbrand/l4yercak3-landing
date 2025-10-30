"use client";

// Performance monitoring utilities for Core Web Vitals
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

// Monitor Core Web Vitals
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
        const metric: PerformanceMetric = {
          name: 'FCP',
          value: entry.startTime,
          rating: getRating(entry.startTime, THRESHOLDS.FCP),
          timestamp: Date.now(),
        };
        reportMetric(metric);
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    // Browser doesn't support this API
  }

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    if (lastEntry) {
      const metric: PerformanceMetric = {
        name: 'LCP',
        value: lastEntry.startTime,
        rating: getRating(lastEntry.startTime, THRESHOLDS.LCP),
        timestamp: Date.now(),
      };
      reportMetric(metric);
    }
  });

  try {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Browser doesn't support this API
  }

  // Cumulative Layout Shift
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
    
    const metric: PerformanceMetric = {
      name: 'CLS',
      value: clsValue,
      rating: getRating(clsValue, THRESHOLDS.CLS),
      timestamp: Date.now(),
    };
    reportMetric(metric);
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Browser doesn't support this API
  }

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const metric: PerformanceMetric = {
        name: 'FID',
        value: (entry as any).processingStart - entry.startTime,
        rating: getRating((entry as any).processingStart - entry.startTime, THRESHOLDS.FID),
        timestamp: Date.now(),
      };
      reportMetric(metric);
    }
  });

  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // Browser doesn't support this API
  }
}

// Report metrics (in production, this would send to analytics)
function reportMetric(metric: PerformanceMetric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
  }
  
  // In production, send to your analytics service
  // analytics.track('core-web-vital', metric);
}

// Optimize animations for 60fps
export function optimizeAnimation(element: HTMLElement) {
  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
}

// Clean up animation optimizations
export function cleanupAnimation(element: HTMLElement) {
  element.style.willChange = 'auto';
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = ['/alt-placeholder.png'];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Optimize video loading
export function optimizeVideoLoading(video: HTMLVideoElement) {
  // Set optimal video attributes for performance
  video.preload = 'metadata';
  video.playsInline = true;
  video.muted = true;
  
  // Add performance optimizations
  video.style.willChange = 'auto';
  video.style.transform = 'translateZ(0)';
  video.style.backfaceVisibility = 'hidden';
  
  return () => {
    // Cleanup function
    video.style.willChange = 'auto';
  };
}