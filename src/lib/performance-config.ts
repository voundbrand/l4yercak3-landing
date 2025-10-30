// Performance configuration for l4yercak3 landing page

export const PERFORMANCE_CONFIG = {
  // Video optimization settings
  video: {
    preload: 'metadata' as const,
    loadingStrategy: 'lazy' as const,
    qualitySettings: {
      mobile: { maxWidth: 720, maxHeight: 480 },
      tablet: { maxWidth: 1280, maxHeight: 720 },
      desktop: { maxWidth: 1920, maxHeight: 1080 },
    },
  },

  // Animation performance settings
  animations: {
    reducedMotion: true,
    gpuAcceleration: true,
    willChangeOptimization: true,
    frameRate: 60,
  },

  // Image optimization
  images: {
    formats: ['webp', 'avif', 'png'] as const,
    quality: 85,
    placeholder: 'blur' as const,
  },

  // Core Web Vitals targets
  vitals: {
    FCP: 1800, // First Contentful Paint (ms)
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    TTFB: 800, // Time to First Byte (ms)
  },

  // Resource hints
  preload: {
    fonts: [
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=swap'
    ],
    images: ['/alt-placeholder.png'],
    videos: [], // Videos are lazy loaded
  },
} as const;

// Performance monitoring configuration
export const MONITORING_CONFIG = {
  enabled: process.env.NODE_ENV === 'production',
  sampleRate: 0.1, // Monitor 10% of sessions
  reportingEndpoint: '/api/performance', // Future endpoint for metrics
  vitalsOnly: true, // Only report Core Web Vitals
} as const;