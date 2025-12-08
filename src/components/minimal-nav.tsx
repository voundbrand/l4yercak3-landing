'use client';

import { useState, useContext, createContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// Import the reading mode context (we'll need to export it from content-page-layout)
import { useReadingMode } from '@/components/content-page-layout';

const MenuIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L8 6.79289L3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.29289 8L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L8 8.70711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.70711 8L12.8536 3.85355Z" fill="currentColor"/>
  </svg>
);

interface NavLink {
  href: string;
  labelKey: string;
}

const navLinks: NavLink[] = [
  { href: '/', labelKey: 'navigation.home' },
  { href: '/manifesto', labelKey: 'navigation.manifesto' },
  { href: '/ship-fast', labelKey: 'navigation.learnMore' },
  { href: '/go-to-market', labelKey: 'navigation.valueCalculator' },
  { href: '/build-sprint', labelKey: 'navigation.buildSprint' },
];

interface MinimalNavProps {
  className?: string;
}

export function MinimalNav({ className }: MinimalNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { readingMode } = useReadingMode();
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn("hidden md:block", className)}>
        <div className="flex items-center justify-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm uppercase transition-colors",
                  isActive 
                    ? readingMode === 'sepia' 
                      ? "text-amber-900 font-medium" 
                      : "text-foreground font-medium"
                    : readingMode === 'sepia'
                      ? "text-amber-700 hover:text-amber-900"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={t('navigation.toggleMenu')}
        >
          {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('navigation.closeMenu')}
              >
                <XIcon />
              </button>
              
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-3xl uppercase transition-colors",
                      isActive 
                        ? readingMode === 'sepia'
                          ? "text-amber-800 font-medium"
                          : "text-primary font-medium"
                        : readingMode === 'sepia'
                          ? "text-amber-900 hover:text-amber-700"
                          : "text-foreground hover:text-primary"
                    )}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}