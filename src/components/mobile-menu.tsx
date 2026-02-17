'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

// Icons
const MenuIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

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
type Language = 'en' | 'de';

interface MobileMenuProps {
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  language: Language | string;
  setLanguage: (lang: Language) => void;
  variant?: 'hero' | 'content';
  showCta?: boolean;
}

export function MobileMenu({
  readingMode,
  setReadingMode,
  language,
  setLanguage,
  variant = 'content',
  showCta = true,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const isHero = variant === 'hero';

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 rounded-full transition-colors",
          isHero
            ? "bg-white/10 text-white hover:bg-white/20"
            : readingMode === 'sepia'
              ? "bg-amber-900/10 text-amber-800 hover:bg-amber-900/20"
              : "bg-foreground/10 text-foreground hover:bg-foreground/20"
        )}
        aria-label={t('navigation.openMenu')}
      >
        <MenuIcon />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "fixed inset-0 z-50",
              readingMode === 'sepia' ? "bg-amber-50" : "bg-background"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col h-full"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "font-serif text-2xl italic",
                    readingMode === 'sepia' ? "text-amber-900" : "text-foreground"
                  )}
                >
                  l4yercak3
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    readingMode === 'sepia'
                      ? "bg-amber-900/10 text-amber-800 hover:bg-amber-900/20"
                      : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                  )}
                  aria-label={t('navigation.closeMenu')}
                >
                  <XIcon />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-3xl uppercase transition-colors",
                      readingMode === 'sepia'
                        ? "text-amber-900 hover:text-amber-700"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {t('navigation.home')}
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-3xl uppercase transition-colors",
                      readingMode === 'sepia'
                        ? "text-amber-900 hover:text-amber-700"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {t('navigation.pricing')}
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href="/blueprint"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-3xl uppercase transition-colors",
                      readingMode === 'sepia'
                        ? "text-amber-900 hover:text-amber-700"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {t('navigation.blueprint')}
                  </Link>
                </motion.div>

                {/* Start Building CTA */}
                {showCta && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="pt-4"
                  >
                    <Button asChild size="lg" className="text-base px-8">
                      <a
                        href="https://app.l4yercak3.com"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('common.startBuilding')}
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Settings Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="px-6 py-8 border-t border-border/20"
              >
                <div className="flex items-center justify-center gap-4">
                  {/* Reading Mode Toggle */}
                  <div className={cn(
                    "flex items-center gap-1 p-1 rounded-full",
                    readingMode === 'sepia' ? "bg-amber-900/10" : "bg-foreground/10"
                  )}>
                    <button
                      onClick={() => setReadingMode('dark')}
                      className={cn(
                        "px-3 py-2 rounded-full transition-all duration-200 flex items-center justify-center",
                        readingMode === 'dark'
                          ? "bg-foreground/20 text-foreground"
                          : readingMode === 'sepia' ? "text-amber-700 hover:text-amber-900" : "text-foreground/60 hover:text-foreground/80"
                      )}
                      title={t('common.darkMode')}
                    >
                      <MoonIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setReadingMode('sepia')}
                      className={cn(
                        "px-3 py-2 rounded-full transition-all duration-200 flex items-center justify-center",
                        readingMode === 'sepia'
                          ? "bg-amber-200/50 text-amber-900"
                          : "text-foreground/60 hover:text-foreground/80"
                      )}
                      title={t('common.sepiaMode')}
                    >
                      <SunIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Language Toggle */}
                  <div className={cn(
                    "flex items-center gap-1 p-1 rounded-full",
                    readingMode === 'sepia' ? "bg-amber-900/10" : "bg-foreground/10"
                  )}>
                    <button
                      onClick={() => setLanguage('en' as Language)}
                      className={cn(
                        "px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                        language === 'en'
                          ? readingMode === 'sepia' ? "bg-amber-200/50 text-amber-900" : "bg-foreground/20 text-foreground"
                          : readingMode === 'sepia' ? "text-amber-700 hover:text-amber-900" : "text-foreground/60 hover:text-foreground/80"
                      )}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage('de' as Language)}
                      className={cn(
                        "px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                        language === 'de'
                          ? readingMode === 'sepia' ? "bg-amber-200/50 text-amber-900" : "bg-foreground/20 text-foreground"
                          : readingMode === 'sepia' ? "text-amber-700 hover:text-amber-900" : "text-foreground/60 hover:text-foreground/80"
                      )}
                    >
                      DE
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
