"use client";

import { useEffect } from "react";
import { initPerformanceMonitoring, preloadCriticalResources } from "@/lib/performance";

export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Report initial page load metrics
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // Report Time to First Byte
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Performance] TTFB: ${ttfb.toFixed(2)}ms`);
          }
        }
        
        // Report total page load time
        const loadTime = performance.now();
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance] Page Load: ${loadTime.toFixed(2)}ms`);
        }
      });
    }
  }, []);

  return null; // This component doesn't render anything
}