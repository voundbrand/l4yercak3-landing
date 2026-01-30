'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Background } from '@/components/background';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { MobileMenu } from '@/components/mobile-menu';
import { cn } from '@/lib/utils';

// Reading mode type
type ReadingMode = 'dark' | 'sepia';

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

// Theme classes for reading modes
const themeClasses = {
  dark: {
    main: "bg-background text-foreground",
    section: "bg-background",
    sectionAlt: "bg-muted/30",
    sectionCta: "bg-primary/5",
    content: "text-foreground/90",
    headings: "text-foreground",
    muted: "text-foreground/70",
    cardBg: "bg-muted/50",
  },
  sepia: {
    main: "bg-amber-50 text-amber-900",
    section: "bg-amber-50",
    sectionAlt: "bg-amber-100/50",
    sectionCta: "bg-amber-100/80",
    content: "text-amber-800",
    headings: "text-amber-900",
    muted: "text-amber-700",
    cardBg: "bg-amber-100/80",
  },
};

const APP_URL = "https://app.l4yercak3.com";

export default function VibePage() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [readingMode, setReadingMode] = useState<ReadingMode>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('landing-reading-mode') as ReadingMode;
    if (saved && (saved === 'dark' || saved === 'sepia')) {
      setReadingMode(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('landing-reading-mode', readingMode);
  }, [readingMode]);

  const theme = themeClasses[readingMode];

  return (
    <main className={cn("min-h-screen w-full transition-colors duration-300", theme.main)}>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100dvh] w-full flex items-center">
        <Background src="/layercake-bg.png" placeholder="/layercake-bg.png" />

        {/* Reading Mode & Language Toggle - Top Left (Desktop Only) */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-sm">
            <button
              onClick={() => setReadingMode('dark')}
              className={cn(
                "px-2 py-1 rounded-full transition-all duration-200 flex items-center justify-center",
                readingMode === 'dark' ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80"
              )}
              title={t('common.darkMode')}
            >
              <MoonIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setReadingMode('sepia')}
              className={cn(
                "px-2 py-1 rounded-full transition-all duration-200 flex items-center justify-center",
                readingMode === 'sepia' ? "bg-amber-200/50 text-white" : "text-white/60 hover:text-white/80"
              )}
              title={t('common.sepiaMode')}
            >
              <SunIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-sm">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
                language === 'en' ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={cn(
                "px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
                language === 'de' ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80"
              )}
            >
              DE
            </button>
          </div>
        </div>

        {/* Back to Home - Top Right (Desktop Only) */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20 hidden md:block">
          <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
            <Link href="/">Home</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="absolute top-4 right-4 z-20 md:hidden">
          <MobileMenu
            readingMode={readingMode}
            setReadingMode={setReadingMode}
            language={language}
            setLanguage={setLanguage}
            variant="hero"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white mb-2">
              {t("landing.vibe.hero.headline")}
            </h1>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-green-400 mb-8">
              {t("landing.vibe.hero.headline2")}
            </p>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("landing.vibe.hero.subheadline")}
            </p>

            <Button asChild size="lg" shine className="text-base px-8 py-6">
              <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
                {t("landing.vibe.hero.cta")}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT YOU GET SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.section)}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.whatYouGet.header")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn("p-6 md:p-8 rounded-2xl border transition-colors duration-300", readingMode === 'sepia' ? 'bg-green-100/80 border-green-300/50' : 'bg-green-500/10 border-green-500/30')}
          >
            <p className={cn("text-lg font-semibold mb-6 transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.whatYouGet.intro")}
            </p>
            <ul className="space-y-3">
              {(t("landing.vibe.whatYouGet.features", { returnObjects: true }) as string[]).map((feature, i) => (
                <li key={i} className={cn("flex items-start gap-3 text-base md:text-lg", readingMode === 'sepia' ? 'text-amber-800' : 'text-foreground/80')}>
                  <span className={cn("mt-1", readingMode === 'sepia' ? 'text-green-700' : 'text-green-400')}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.sectionAlt)}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.howItWorks.header")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {(t("landing.vibe.howItWorks.steps", { returnObjects: true }) as any[]).map((step: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={cn("p-6 rounded-2xl border transition-colors duration-300", readingMode === 'sepia' ? 'bg-amber-100/80 border-amber-300/50' : 'bg-primary/5 border-primary/20')}
              >
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4 transition-colors duration-300", readingMode === 'sepia' ? 'bg-amber-200 text-amber-800' : 'bg-primary/20 text-primary')}>
                  {step.number}
                </div>
                <h3 className={cn("font-semibold text-xl mb-3 transition-colors duration-300", theme.headings)}>
                  {step.title}
                </h3>
                <p className={cn("text-sm md:text-base leading-relaxed transition-colors duration-300", theme.muted)}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.section)}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.pricing.header")}
            </h2>
            <p className={cn("text-base md:text-lg leading-relaxed whitespace-pre-line transition-colors duration-300", theme.content)}>
              {t("landing.vibe.pricing.body")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <Button asChild size="lg" shine className={cn("text-base px-8 py-6", readingMode === 'sepia' && "bg-amber-700 hover:bg-amber-800 text-white border-amber-600 ring-amber-500/20")}>
              <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
                {t("landing.vibe.hero.cta")}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== NOT INCLUDED SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.sectionAlt)}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.notIncluded.header")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn("p-6 md:p-8 rounded-2xl border-l-4 transition-colors duration-300", readingMode === 'sepia' ? 'border-amber-600 bg-amber-100/80' : 'border-foreground/30 bg-muted/50')}
          >
            <p className={cn("text-lg mb-6 transition-colors duration-300", theme.content)}>
              {t("landing.vibe.notIncluded.body")}
            </p>
            <ul className="space-y-3 mb-6">
              {(t("landing.vibe.notIncluded.items", { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i} className={cn("flex items-start gap-3 text-base md:text-lg", readingMode === 'sepia' ? 'text-amber-800' : 'text-foreground/80')}>
                  <span className={cn("mt-1", readingMode === 'sepia' ? 'text-amber-600' : 'text-foreground/40')}>—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className={cn("text-base leading-relaxed italic transition-colors duration-300", theme.muted)}>
              {t("landing.vibe.notIncluded.closing")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== WANT MORE SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.section)}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-4 transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.wantMore.header")}
            </h2>
            <p className={cn("text-center text-base md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto transition-colors duration-300", theme.muted)}>
              {t("landing.vibe.wantMore.body")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {(t("landing.vibe.wantMore.options", { returnObjects: true }) as any[]).map((option: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={cn("p-6 rounded-2xl border transition-colors duration-300", readingMode === 'sepia' ? 'bg-purple-100/80 border-purple-300/50' : 'bg-purple-500/10 border-purple-500/30')}
              >
                <h3 className={cn("font-semibold text-xl mb-3 transition-colors duration-300", theme.headings)}>
                  {option.title}
                </h3>
                <p className={cn("text-sm md:text-base leading-relaxed transition-colors duration-300", theme.muted)}>
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.sectionAlt)}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.faq.header")}
            </h2>
          </motion.div>

          <div className="space-y-6">
            {(t("landing.vibe.faq.items", { returnObjects: true }) as any[]).map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className={cn("p-6 rounded-2xl border-l-4 transition-colors duration-300", readingMode === 'sepia' ? 'border-amber-600 bg-amber-100/80' : 'border-primary bg-muted/50')}
              >
                <h3 className={cn("font-semibold text-lg mb-3 transition-colors duration-300", theme.headings)}>
                  {item.question}
                </h3>
                <p className={cn("text-sm md:text-base leading-relaxed whitespace-pre-line transition-colors duration-300", theme.muted)}>
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.sectionCta)}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("font-serif text-2xl sm:text-3xl md:text-4xl italic mb-8 whitespace-pre-line transition-colors duration-300", theme.headings)}>
              {t("landing.vibe.finalCta.header")}
            </h2>
            <p className={cn("text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line transition-colors duration-300", theme.muted)}>
              {t("landing.vibe.finalCta.body")}
            </p>

            <div className="flex flex-col items-center gap-4 mb-6">
              <Button asChild size="lg" shine className={cn("text-base px-8 py-6", readingMode === 'sepia' && "bg-amber-700 hover:bg-amber-800 text-white border-amber-600 ring-amber-500/20")}>
                <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
                  {t("landing.vibe.finalCta.cta")}
                </Link>
              </Button>
            </div>

            <p className={cn("text-xs transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-600/60' : 'text-foreground/40')}>
              {t("landing.vibe.finalCta.belowCta")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer readingMode={readingMode} />
    </main>
  );
}
