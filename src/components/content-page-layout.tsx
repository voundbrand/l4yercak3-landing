'use client';

import { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import Link from 'next/link';
import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MobileMenu } from '@/components/mobile-menu';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/language-provider';
import { socialLinks } from '@/lib/constants';
import XLogoIcon from './icons/x';
import LinkedInIcon from './icons/linkedin';
import YouTubeIcon from './icons/youtube';

// Reading mode icons
const MoonIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 1C8.5 1 9 1.1 9.4 1.3C8.6 2.1 8 3.2 8 4.5C8 7.5 10.5 10 13.5 10C13.8 10 14.1 10 14.4 9.9C13.8 12.8 11.2 15 8 15C4.1 15 1 11.9 1 8C1 4.1 4.1 1 8 1Z" fill="currentColor"/>
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 1C8.27614 1 8.5 1.22386 8.5 1.5V3.5C8.5 3.77614 8.27614 4 8 4C7.72386 4 7.5 3.77614 7.5 3.5V1.5C7.5 1.22386 7.72386 1 8 1Z" fill="currentColor"/>
    <path d="M8 12C8.27614 12 8.5 12.2239 8.5 12.5V14.5C8.5 14.7761 8.27614 15 8 15C7.72386 15 7.5 14.7761 7.5 14.5V12.5C7.5 12.2239 7.72386 12 8 12Z" fill="currentColor"/>
    <path d="M3.5 8C3.5 7.72386 3.27614 7.5 3 7.5H1C0.723858 7.5 0.5 7.72386 0.5 8C0.5 8.27614 0.723858 8.5 1 8.5H3C3.27614 8.5 3.5 8.27614 3.5 8Z" fill="currentColor"/>
    <path d="M15 7.5C15.2761 7.5 15.5 7.72386 15.5 8C15.5 8.27614 15.2761 8.5 15 8.5H13C12.7239 8.5 12.5 8.27614 12.5 8C12.5 7.72386 12.7239 7.5 13 7.5H15Z" fill="currentColor"/>
    <path d="M4.39705 4.39705C4.59231 4.20178 4.90889 4.20178 5.10416 4.39705L6.16482 5.45771C6.36008 5.65297 6.36008 5.96955 6.16482 6.16482C5.96955 6.36008 5.65297 6.36008 5.45771 6.16482L4.39705 5.10416C4.20178 4.90889 4.20178 4.59231 4.39705 4.39705Z" fill="currentColor"/>
    <path d="M9.83518 9.83518C10.0304 9.63992 10.347 9.63992 10.5423 9.83518L11.6029 10.8958C11.7982 11.0911 11.7982 11.4077 11.6029 11.6029C11.4077 11.7982 11.0911 11.7982 10.8958 11.6029L9.83518 10.5423C9.63992 10.347 9.63992 10.0304 9.83518 9.83518Z" fill="currentColor"/>
    <path d="M11.6029 4.39705C11.7982 4.59231 11.7982 4.90889 11.6029 5.10416L10.5423 6.16482C10.347 6.36008 10.0304 6.36008 9.83518 6.16482C9.63992 5.96955 9.63992 5.65297 9.83518 5.45771L10.8958 4.39705C11.0911 4.20178 11.4077 4.20178 11.6029 4.39705Z" fill="currentColor"/>
    <path d="M6.16482 9.83518C6.36008 10.0304 6.36008 10.347 6.16482 10.5423L5.10416 11.6029C4.90889 11.7982 4.59231 11.7982 4.39705 11.6029C4.20178 11.4077 4.20178 11.0911 4.39705 10.8958L5.45771 9.83518C5.65297 9.63992 5.96955 9.63992 6.16482 9.83518Z" fill="currentColor"/>
    <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5Z" fill="currentColor"/>
  </svg>
);

type ReadingMode = 'dark' | 'sepia';

// Create context for reading mode
const ReadingModeContext = createContext<{
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  themeClasses: any;
} | null>(null);

interface ContentPageLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export function ContentPageLayout({ 
  children, 
  showBackButton = true,
  backButtonText = "Back to Home",
  backButtonHref = "/"
}: ContentPageLayoutProps) {
  const [readingMode, setReadingMode] = useState<ReadingMode>('dark');
  const { i18n, t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  // Load saved reading mode preference
  useEffect(() => {
    const saved = localStorage.getItem('content-reading-mode') as ReadingMode;
    if (saved && (saved === 'dark' || saved === 'sepia')) {
      setReadingMode(saved);
    }
  }, []);

  // Save reading mode preference
  useEffect(() => {
    localStorage.setItem('content-reading-mode', readingMode);
  }, [readingMode]);

  const themeClasses = {
    dark: {
      main: "bg-background text-foreground",
      header: "bg-background/80 border-border/20",
      content: "text-foreground/90",
      headings: "text-foreground",
      muted: "text-muted-foreground",
      quote: "border-primary bg-primary/5",
      cta: "bg-primary/5 border-primary/20",
    },
    sepia: {
      main: "bg-amber-50 text-amber-900",
      header: "bg-amber-50/80 border-amber-200/50",
      content: "text-amber-800",
      headings: "text-amber-900",
      muted: "text-amber-700",
      quote: "border-amber-600 bg-amber-100/80",
      cta: "bg-amber-100/80 border-amber-300/80",
    },
  };

  const currentTheme = themeClasses[readingMode];

  return (
    <ReadingModeContext.Provider value={{ readingMode, setReadingMode, themeClasses }}>
      <main className={cn("min-h-screen transition-colors duration-300", currentTheme.main)}>
        {/* Header */}
        <header className={cn("border-b backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300", currentTheme.header)}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left-aligned Logo */}
            <Link href="/" className={cn("font-serif text-2xl italic hover:opacity-80 transition-opacity", currentTheme.headings)}>
              l4yercak3
            </Link>
            
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* Reading Mode Toggle */}
              <div className={cn(
                "flex items-center gap-1 p-1 rounded-full",
                readingMode === 'sepia' ? "bg-amber-900/10" : "bg-foreground/10"
              )}>
                <button
                  onClick={() => setReadingMode('dark')}
                  className={cn(
                    "px-2 py-1 rounded-full transition-all duration-200 flex items-center justify-center",
                    readingMode === 'dark'
                      ? "bg-foreground/20 text-foreground"
                      : readingMode === 'sepia' ? "text-amber-700 hover:text-amber-900" : "text-foreground/60 hover:text-foreground/80"
                  )}
                  title={t('common.darkMode')}
                >
                  <MoonIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setReadingMode('sepia')}
                  className={cn(
                    "px-2 py-1 rounded-full transition-all duration-200 flex items-center justify-center",
                    readingMode === 'sepia'
                      ? "bg-amber-200/50 text-amber-900"
                      : "text-foreground/60 hover:text-foreground/80"
                  )}
                  title={t('common.sepiaMode')}
                >
                  <SunIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Language Toggle */}
              <div className={cn(
                "flex items-center gap-1 p-1 rounded-full",
                readingMode === 'sepia' ? "bg-amber-900/10" : "bg-foreground/10"
              )}>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
                    i18n.language === 'en'
                      ? readingMode === 'sepia' ? "bg-amber-200/50 text-amber-900" : "bg-foreground/20 text-foreground"
                      : readingMode === 'sepia' ? "text-amber-700 hover:text-amber-900" : "text-foreground/60 hover:text-foreground/80"
                  )}
                  aria-label={t('navigation.switchToEnglish')}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage('de')}
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
                    i18n.language === 'de'
                      ? readingMode === 'sepia' ? "bg-amber-200/50 text-amber-900" : "bg-foreground/20 text-foreground"
                      : readingMode === 'sepia' ? "text-amber-700 hover:text-amber-900" : "text-foreground/60 hover:text-foreground/80"
                  )}
                  aria-label={t('navigation.switchToGerman')}
                >
                  DE
                </button>
              </div>

              {/* Start Building Button */}
              <Button asChild size="sm" className="text-sm">
                <a href="https://app.l4yercak3.com">
                  {t('common.startBuilding')}
                </a>
              </Button>
            </div>

            {/* Mobile Menu */}
            <MobileMenu readingMode={readingMode} setReadingMode={setReadingMode} language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {children}
      </div>

      {/* Footer */}
      <footer className={cn("border-t mt-16 transition-colors duration-300",
        readingMode === 'sepia' ? 'border-amber-200/50' : 'border-border/20')}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col items-center gap-4">
            {/* Social Media Icons */}
            <div className="flex gap-4 md:gap-6 items-center">
              <Link
                target="_blank"
                href={socialLinks.linkedin}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  readingMode === 'sepia'
                    ? "bg-amber-200/50 hover:bg-amber-300/50 text-amber-800"
                    : "bg-white/10 hover:bg-white/20 text-foreground"
                )}
                aria-label="Follow Remington on LinkedIn"
              >
                <LinkedInIcon className="size-5" />
              </Link>
              <Link
                target="_blank"
                href={socialLinks.x}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  readingMode === 'sepia'
                    ? "bg-amber-200/50 hover:bg-amber-300/50 text-amber-800"
                    : "bg-white/10 hover:bg-white/20 text-foreground"
                )}
                aria-label="Follow Remington on X (Twitter)"
              >
                <XLogoIcon className="size-5" />
              </Link>
              <Link
                target="_blank"
                href={socialLinks.instagram}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  readingMode === 'sepia'
                    ? "bg-amber-200/50 hover:bg-amber-300/50 text-amber-800"
                    : "bg-white/10 hover:bg-white/20 text-foreground"
                )}
                aria-label="Follow Remington on Instagram"
              >
                <InstagramLogoIcon className="size-5" />
              </Link>
              <Link
                target="_blank"
                href={socialLinks.youtube}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  readingMode === 'sepia'
                    ? "bg-amber-200/50 hover:bg-amber-300/50 text-amber-800"
                    : "bg-white/10 hover:bg-white/20 text-foreground"
                )}
                aria-label="Subscribe to Remington on YouTube"
              >
                <YouTubeIcon className="size-5" />
              </Link>
              <Link
                target="_blank"
                href={socialLinks.github}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  readingMode === 'sepia'
                    ? "bg-amber-200/50 hover:bg-amber-300/50 text-amber-800"
                    : "bg-white/10 hover:bg-white/20 text-foreground"
                )}
                aria-label="Follow Remington on GitHub"
              >
                <GitHubLogoIcon className="size-5" />
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link
                href="/privacy"
                className={cn(
                  "hover:underline transition-colors",
                  readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                )}
              >
                {t('legal.links.privacy')}
              </Link>
              <Link
                href="/cookies"
                className={cn(
                  "hover:underline transition-colors",
                  readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                )}
              >
                {t('legal.links.cookies')}
              </Link>
              <Link
                href="/terms"
                className={cn(
                  "hover:underline transition-colors",
                  readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                )}
              >
                {t('legal.links.terms')}
              </Link>
              <Link
                href="/eula"
                className={cn(
                  "hover:underline transition-colors",
                  readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                )}
              >
                {t('legal.links.eula')}
              </Link>
              <Link
                href="/docs"
                className={cn(
                  "hover:underline transition-colors",
                  readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                )}
              >
                {t('legal.links.docs')}
              </Link>
              <Link
                href="/support"
                className={cn(
                  "hover:underline transition-colors",
                  readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                )}
              >
                {t('legal.links.support')}
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  "hover:underline transition-colors",
                  readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                )}
              >
                {t('legal.links.pricing')}
              </Link>
            </div>

            {/* VC Batch Slogan */}
            <div className={cn("text-xs font-medium transition-colors duration-300",
              readingMode === 'sepia' ? 'text-amber-600' : 'text-foreground/60')}>
              {t('footer.vcBatch')}
            </div>

            {/* Copyright */}
            <p className={cn("text-sm transition-colors duration-300",
              readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground')}>
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </main>
    </ReadingModeContext.Provider>
  );
}

// Export theme classes for use in child components
export function useContentTheme() {
  const context = useContext(ReadingModeContext);
  if (!context) {
    throw new Error('useContentTheme must be used within ContentPageLayout');
  }
  
  return context.themeClasses[context.readingMode];
}

// Export reading mode context for navigation
export function useReadingMode() {
  const context = useContext(ReadingModeContext);
  if (!context) {
    // Return default values if used outside context (like on home page)
    return { readingMode: 'dark' as const };
  }
  
  return { readingMode: context.readingMode };
}