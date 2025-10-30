import { cn } from "./utils";

// Typography utility classes for consistent text rendering
export const typography = {
  // Heading styles with optimized rendering
  heading: {
    hero: "font-serif italic text-foreground text-center leading-none tracking-tight",
    section: "font-sans font-semibold text-foreground leading-tight tracking-tight",
  },
  
  // Body text styles
  body: {
    default: "font-sans text-foreground leading-relaxed",
    large: "font-sans text-lg text-foreground leading-relaxed",
    small: "font-sans text-sm text-foreground leading-normal",
    muted: "font-sans text-muted-foreground leading-relaxed",
  },
  
  // Interactive text styles
  interactive: {
    button: "font-sans font-medium text-center leading-none",
    link: "font-sans text-foreground hover:text-foreground/80 transition-colors",
  },
  
  // Responsive text sizes
  responsive: {
    hero: "text-hero-mobile sm:text-hero-tablet lg:text-hero-desktop xl:text-hero-xl",
    title: "text-2xl sm:text-3xl lg:text-4xl",
    subtitle: "text-lg sm:text-xl lg:text-2xl",
    body: "text-base sm:text-lg",
  },
};

// Helper function to combine typography classes
export function createTypographyClass(...classes: (string | undefined)[]): string {
  return cn(...classes.filter(Boolean));
}

// Predefined combinations for common use cases
export const typographyPresets = {
  heroTitle: createTypographyClass(
    typography.heading.hero,
    typography.responsive.hero
  ),
  
  sectionTitle: createTypographyClass(
    typography.heading.section,
    typography.responsive.title
  ),
  
  bodyText: createTypographyClass(
    typography.body.default,
    typography.responsive.body
  ),
  
  mutedText: createTypographyClass(
    typography.body.muted,
    typography.responsive.body
  ),
};