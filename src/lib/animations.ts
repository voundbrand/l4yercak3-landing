// Animation constants optimized for 60fps performance
export const DURATION = 0.3;
export const DELAY = DURATION;
export const EASE_OUT = "easeOut";
export const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const;

export const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const SPRING_BUTTON = {
  type: "spring" as const,
  stiffness: 130.4,
  damping: 14.5,
  mass: 1,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// Performance-optimized animation variants
export const PERFORMANCE_VARIANTS = {
  // Use transform instead of layout for better performance
  layoutTransition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },
  
  // GPU-accelerated transforms
  gpuAccelerated: {
    transform: "translateZ(0)",
    backfaceVisibility: "hidden" as const,
    perspective: 1000,
  },
};

// Common animation variants
export const fadeInOut = {
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION,
      ease: EASE_OUT,
      delay: DELAY,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: DURATION,
      ease: EASE_OUT_OPACITY,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION,
      ease: EASE_OUT_OPACITY,
    },
  },
};

export const scaleInOut = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: DELAY,
      duration: DURATION,
      ease: EASE_OUT,
    },
  },
  hidden: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

export const slideUpOut = {
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: DELAY,
      duration: DURATION,
      ease: EASE_OUT,
    },
  },
  hidden: {
    y: 150,
    scale: 0.9,
    opacity: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
  exit: {
    y: -150,
    scale: 0.9,
    opacity: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
};

export const alertVariants = {
  initial: { opacity: 0, y: 10, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.8 },
  transition: SPRING_BUTTON,
};