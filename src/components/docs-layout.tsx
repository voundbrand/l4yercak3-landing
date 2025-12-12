'use client';

import { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { BookCallButton } from '@/components/book-call-button';
import { useTranslation } from 'react-i18next';
import { socialLinks } from '@/lib/constants';
import XLogoIcon from './icons/x';
import LinkedInIcon from './icons/linkedin';
import YouTubeIcon from './icons/youtube';

// Icons
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
    <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5Z" fill="currentColor"/>
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Language Icons
const ENIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.1"/>
    <text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor">EN</text>
  </svg>
);

const DEIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.1"/>
    <text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor">DE</text>
  </svg>
);

type ReadingMode = 'dark' | 'sepia';

// Navigation structure
export interface DocNavItem {
  title: string;
  href?: string;
  children?: DocNavItem[];
  badge?: string;
}

export const docsNavigation: DocNavItem[] = [
  {
    title: 'Getting Started',
    children: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Quick Start', href: '/docs/quickstart' },
    ],
  },
  {
    title: 'Integrations',
    children: [
      { title: 'Vercel', href: '/docs/integrations/vercel', badge: 'New' },
      { title: 'GitHub', href: '/docs/integrations/github' },
    ],
  },
  {
    title: 'Legal',
    children: [
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'EULA', href: '/eula' },
      { title: 'DPA', href: '/dpa' },
      { title: 'Reseller Agreement', href: '/reseller' },
    ],
  },
  {
    title: 'Support',
    children: [
      { title: 'Help Center', href: '/support' },
      { title: 'Contact Us', href: '/support#contact' },
    ],
  },
];

// Context for reading mode
const DocsReadingModeContext = createContext<{
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  themeClasses: ReturnType<typeof getThemeClasses>;
} | null>(null);

function getThemeClasses(mode: ReadingMode) {
  return {
    dark: {
      main: "bg-background text-foreground",
      sidebar: "bg-background/50 border-border/20",
      header: "bg-background/80 border-border/20",
      content: "text-foreground/90",
      headings: "text-foreground",
      muted: "text-muted-foreground",
      quote: "border-primary bg-primary/5",
      cta: "bg-primary/5 border-primary/20",
      navItem: "text-muted-foreground hover:text-foreground",
      navItemActive: "text-foreground bg-primary/10 font-medium",
      navSection: "text-foreground font-semibold",
    },
    sepia: {
      main: "bg-amber-50 text-amber-900",
      sidebar: "bg-amber-100/50 border-amber-200/50",
      header: "bg-amber-50/80 border-amber-200/50",
      content: "text-amber-800",
      headings: "text-amber-900",
      muted: "text-amber-700",
      quote: "border-amber-600 bg-amber-100/80",
      cta: "bg-amber-100/80 border-amber-300/80",
      navItem: "text-amber-700 hover:text-amber-900",
      navItemActive: "text-amber-900 bg-amber-200/50 font-medium",
      navSection: "text-amber-900 font-semibold",
    },
  }[mode];
}

// Sidebar Navigation Item
function NavItem({ item, depth = 0 }: { item: DocNavItem; depth?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const context = useContext(DocsReadingModeContext);
  const theme = context?.themeClasses || getThemeClasses('dark');

  const isActive = item.href === pathname;
  const hasChildren = item.children && item.children.length > 0;

  // Check if any child is active
  const hasActiveChild = item.children?.some(child =>
    child.href === pathname || child.children?.some(grandchild => grandchild.href === pathname)
  );

  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors",
            depth === 0 ? theme.navSection : theme.navItem
          )}
        >
          <span>{item.title}</span>
          {isOpen ? (
            <ChevronDownIcon className="w-4 h-4 opacity-50" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 opacity-50" />
          )}
        </button>
        {isOpen && item.children && (
          <div className={cn("ml-3 mt-1 border-l pl-3",
            context?.readingMode === 'sepia' ? 'border-amber-300/50' : 'border-border/30'
          )}>
            {item.children.map((child, index) => (
              <NavItem key={index} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
        isActive ? theme.navItemActive : theme.navItem
      )}
    >
      <span>{item.title}</span>
      {item.badge && (
        <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const context = useContext(DocsReadingModeContext);
  const theme = context?.themeClasses || getThemeClasses('dark');

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 border-r transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:z-0",
          theme.sidebar,
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-inherit">
            <Link href="/" className={cn("font-serif text-xl italic", theme.headings)}>
              l4yercak3
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-black/5 lg:hidden"
            >
              <XIcon />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {docsNavigation.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>

          {/* Footer */}
          <div className={cn("p-4 border-t text-xs", theme.muted,
            context?.readingMode === 'sepia' ? 'border-amber-200/50' : 'border-border/20'
          )}>
            <p>© {new Date().getFullYear()} Vound Brand UG</p>
          </div>
        </div>
      </aside>
    </>
  );
}

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [readingMode, setReadingMode] = useState<ReadingMode>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const theme = getThemeClasses(readingMode);

  // Load saved reading mode preference
  useEffect(() => {
    const saved = localStorage.getItem('docs-reading-mode') as ReadingMode;
    if (saved && (saved === 'dark' || saved === 'sepia')) {
      setReadingMode(saved);
    }
  }, []);

  // Save reading mode preference
  useEffect(() => {
    localStorage.setItem('docs-reading-mode', readingMode);
  }, [readingMode]);

  return (
    <DocsReadingModeContext.Provider value={{ readingMode, setReadingMode, themeClasses: theme }}>
      <div className={cn("min-h-screen transition-colors duration-300", theme.main)}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Header */}
            <header className={cn("sticky top-0 z-30 border-b backdrop-blur-sm", theme.header)}>
              <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                <div className="flex items-center gap-4">
                  {/* Mobile menu button */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg hover:bg-black/5 lg:hidden"
                  >
                    <MenuIcon />
                  </button>

                  {/* Breadcrumb or title */}
                  <span className={cn("text-sm font-medium", theme.muted)}>Documentation</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Language Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5">
                    <button
                      onClick={() => i18n.changeLanguage('en')}
                      className={cn(
                        "p-1.5 rounded-full transition-all duration-200",
                        i18n.language === 'en'
                          ? "bg-white/20 text-current"
                          : "text-current/60 hover:text-current/80"
                      )}
                      title="English"
                    >
                      <ENIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => i18n.changeLanguage('de')}
                      className={cn(
                        "p-1.5 rounded-full transition-all duration-200",
                        i18n.language === 'de'
                          ? "bg-white/20 text-current"
                          : "text-current/60 hover:text-current/80"
                      )}
                      title="German"
                    >
                      <DEIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Reading Mode Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5">
                    <button
                      onClick={() => setReadingMode('dark')}
                      className={cn(
                        "p-1.5 rounded-full transition-all duration-200",
                        readingMode === 'dark'
                          ? "bg-white/20 text-current"
                          : "text-current/60 hover:text-current/80"
                      )}
                      title="Dark mode"
                    >
                      <MoonIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setReadingMode('sepia')}
                      className={cn(
                        "p-1.5 rounded-full transition-all duration-200",
                        readingMode === 'sepia'
                          ? "bg-amber-200/50 text-current"
                          : "text-current/60 hover:text-current/80"
                      )}
                      title="Sepia mode"
                    >
                      <SunIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Book a Call Button - Hidden on mobile */}
                  <div className="hidden sm:block">
                    <BookCallButton />
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 p-6 lg:p-10">
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className={cn("border-t mt-auto",
              readingMode === 'sepia' ? 'border-amber-200/50' : 'border-border/20'
            )}>
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex flex-col items-center gap-4">
                  {/* Social Media Icons */}
                  <div className="flex gap-4 items-center">
                    <Link
                      target="_blank"
                      href={socialLinks.linkedin}
                      className={cn(
                        "p-2 rounded-full transition-all duration-200",
                        readingMode === 'sepia'
                          ? "bg-amber-200/50 hover:bg-amber-300/50 text-amber-800"
                          : "bg-white/10 hover:bg-white/20 text-foreground"
                      )}
                    >
                      <LinkedInIcon className="size-4" />
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
                    >
                      <XLogoIcon className="size-4" />
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
                    >
                      <InstagramLogoIcon className="size-4" />
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
                    >
                      <GitHubLogoIcon className="size-4" />
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
                      Privacy
                    </Link>
                    <Link
                      href="/terms"
                      className={cn(
                        "hover:underline transition-colors",
                        readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                      )}
                    >
                      Terms
                    </Link>
                    <Link
                      href="/eula"
                      className={cn(
                        "hover:underline transition-colors",
                        readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                      )}
                    >
                      EULA
                    </Link>
                    <Link
                      href="/docs"
                      className={cn(
                        "hover:underline transition-colors",
                        readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                      )}
                    >
                      Docs
                    </Link>
                    <Link
                      href="/support"
                      className={cn(
                        "hover:underline transition-colors",
                        readingMode === 'sepia' ? 'text-amber-700' : 'text-muted-foreground'
                      )}
                    >
                      Support
                    </Link>
                  </div>

                  {/* Copyright */}
                  <p className={cn("text-sm", theme.muted)}>
                    © {new Date().getFullYear()} Vound Brand UG (haftungsbeschränkt). All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </DocsReadingModeContext.Provider>
  );
}

// Hook for accessing theme in child components
export function useDocsTheme() {
  const context = useContext(DocsReadingModeContext);
  if (!context) {
    return getThemeClasses('dark');
  }
  return context.themeClasses;
}
