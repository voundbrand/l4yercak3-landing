"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { UrgencyPill } from "@/components/urgency-pill";
import { useLanguage } from "@/components/language-provider";
import { MobileMenu } from "@/components/mobile-menu";
import { cn } from "@/lib/utils";

const APP_URL = "https://app.l4yercak3.com";

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

// Video Modal Component
function VideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Replace with: <iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0" ... /> */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-white/60 ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white/40 text-sm">Demo video coming soon</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Client logos data
const clientLogos = [
  { name: "mele Group", src: "/mele-alone-p-1600.png", alt: "mele Group - Energy & Infrastructure" },
  { name: "HaffNet", src: "/haffnet_Logo_Transparent_balck_cropped.png", alt: "HaffNet - Healthcare Network" },
  { name: "Hinrichs", src: "/Brunnenbau_Hinrichs_black.png", alt: "Hinrichs - Geotechnical Engineering" },
];

// Integration data with inline SVG icons and brand colors
const integrations = [
  { name: "Stripe", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>, status: "live" as const, color: "text-[#635BFF]", bg: "bg-[#635BFF]/10", border: "border-[#635BFF]/25" },
  { name: "Google", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>, status: "live" as const, color: "text-[#4285F4]", bg: "bg-[#4285F4]/10", border: "border-[#4285F4]/25" },
  { name: "GitHub", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>, status: "live" as const, color: "text-[#f0f0f0]", bg: "bg-[#333]/15", border: "border-[#666]/25" },
  { name: "Vercel", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 1L24 22H0L12 1z"/></svg>, status: "live" as const, color: "text-[#f0f0f0]", bg: "bg-[#333]/15", border: "border-[#666]/25" },
  { name: "Microsoft", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z"/></svg>, status: "live" as const, color: "text-[#00A4EF]", bg: "bg-[#00A4EF]/10", border: "border-[#00A4EF]/25" },
  { name: "Active Campaign", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59l-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/></svg>, status: "live" as const, color: "text-[#356AE6]", bg: "bg-[#356AE6]/10", border: "border-[#356AE6]/25" },
  { name: "PayPal", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/></svg>, status: "coming" as const, color: "text-[#003087]", bg: "bg-[#003087]/10", border: "border-[#003087]/25" },
  { name: "Zapier", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M15.977 10.08l3.122-3.121a8.455 8.455 0 00-2.058-2.058l-3.121 3.122a4.462 4.462 0 00-3.84 0L6.959 4.901a8.455 8.455 0 00-2.058 2.058l3.122 3.121a4.462 4.462 0 000 3.84L4.901 17.041a8.455 8.455 0 002.058 2.058l3.121-3.122a4.462 4.462 0 003.84 0l3.121 3.122a8.455 8.455 0 002.058-2.058l-3.122-3.121a4.462 4.462 0 000-3.84zM12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>, status: "coming" as const, color: "text-[#FF4A00]", bg: "bg-[#FF4A00]/10", border: "border-[#FF4A00]/25" },
  { name: "Slack", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z"/></svg>, status: "coming" as const, color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/10", border: "border-[#E01E5A]/25" },
  { name: "n8n", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2a3 3 0 00-3 3v2.268A3.992 3.992 0 007 8a4 4 0 00-4 4 4 4 0 004 4 3.99 3.99 0 002-.535V19a3 3 0 106 0v-3.535A3.99 3.99 0 0017 16a4 4 0 004-4 4 4 0 00-4-4 3.992 3.992 0 00-2 .535V5a3 3 0 00-3-3zm-5 8a2 2 0 110 4 2 2 0 010-4zm10 0a2 2 0 110 4 2 2 0 010-4z"/></svg>, status: "coming" as const, color: "text-[#EA4B71]", bg: "bg-[#EA4B71]/10", border: "border-[#EA4B71]/25" },
  { name: "Make", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>, status: "coming" as const, color: "text-[#6D00CC]", bg: "bg-[#6D00CC]/10", border: "border-[#6D00CC]/25" },
  { name: "ManyChat", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.434 5.503 3.678 7.2V22l3.455-1.896A11.218 11.218 0 0012 20.485c5.523 0 10-4.144 10-9.242C22 6.145 17.523 2 12 2zm1.076 12.444l-2.55-2.72-4.98 2.72 5.473-5.81 2.613 2.72 4.916-2.72-5.472 5.81z"/></svg>, status: "coming" as const, color: "text-[#0084FF]", bg: "bg-[#0084FF]/10", border: "border-[#0084FF]/25" },
];

export default function Home() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
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
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[100dvh] w-full">
        <Background src="/layercake-bg.png" placeholder="/layercake-bg.png" />

        {/* Reading Mode & Language Toggle - Top Left (Desktop Only) */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-sm">
            <button
              onClick={() => setReadingMode('dark')}
              className={cn("px-2 py-1 rounded-full transition-all duration-200 flex items-center justify-center", readingMode === 'dark' ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80")}
              title={t('common.darkMode')}
            >
              <MoonIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setReadingMode('sepia')}
              className={cn("px-2 py-1 rounded-full transition-all duration-200 flex items-center justify-center", readingMode === 'sepia' ? "bg-amber-200/50 text-white" : "text-white/60 hover:text-white/80")}
              title={t('common.sepiaMode')}
            >
              <SunIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-sm">
            <button onClick={() => setLanguage('en')} className={cn("px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200", language === 'en' ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80")} aria-label={t('navigation.switchToEnglish')}>EN</button>
            <button onClick={() => setLanguage('de')} className={cn("px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200", language === 'de' ? "bg-white/20 text-white" : "text-white/60 hover:text-white/80")} aria-label={t('navigation.switchToGerman')}>DE</button>
          </div>
        </div>

        {/* Urgency Pill - Top Center */}
        <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-20 px-4">
          <UrgencyPill />
        </div>

        {/* CTA - Top Right (Desktop Only) */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20 hidden md:block">
          <Button asChild size="sm" className="text-sm">
            <a href={APP_URL}>{t("landing.hero.cta")}</a>
          </Button>
        </div>

        {/* Mobile Menu - Top Right (Mobile Only) */}
        <div className="absolute top-4 right-4 z-20 md:hidden">
          <MobileMenu readingMode={readingMode} setReadingMode={setReadingMode} language={language} setLanguage={setLanguage} variant="hero" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-white mb-6">
              {t("landing.hero.headline")}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("landing.hero.subheadline")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" shine className="text-base px-8 py-6">
                <a href={APP_URL}>{t("landing.hero.cta")}</a>
              </Button>
              <Button variant="ghost" size="lg" className="text-white/70 hover:text-white hover:bg-white/10" onClick={() => setIsVideoOpen(true)}>
                {t("landing.hero.ctaSecondary")} →
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div className="w-1.5 h-3 bg-white/50 rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.section)}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 transition-colors duration-300", theme.headings)}>
              {t("landing.problem.header")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 md:mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} whileHover={{ scale: 1.02, y: -4 }} className="p-6 rounded-2xl bg-red-500/10 border-2 border-red-500/30 shadow-lg shadow-red-500/5 hover:border-red-500/50 hover:shadow-red-500/10 transition-all cursor-default">
              <h3 className={cn("font-semibold text-lg md:text-xl mb-3", readingMode === 'sepia' ? 'text-red-700' : 'text-red-400')}>{t("landing.problem.graveyard.title")}</h3>
              <p className={cn("text-sm md:text-base leading-relaxed transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-800/80' : 'text-foreground/70')}>{t("landing.problem.graveyard.description")}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ scale: 1.02, y: -4 }} className="p-6 rounded-2xl bg-yellow-500/10 border-2 border-yellow-500/30 shadow-lg shadow-yellow-500/5 hover:border-yellow-500/50 hover:shadow-yellow-500/10 transition-all cursor-default">
              <h3 className={cn("font-semibold text-lg md:text-xl mb-3", readingMode === 'sepia' ? 'text-yellow-700' : 'text-yellow-400')}>{t("landing.problem.loop.title")}</h3>
              <p className={cn("text-sm md:text-base leading-relaxed transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-800/80' : 'text-foreground/70')}>{t("landing.problem.loop.description")}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ scale: 1.02, y: -4 }} className="p-6 rounded-2xl bg-orange-500/10 border-2 border-orange-500/30 shadow-lg shadow-orange-500/5 hover:border-orange-500/50 hover:shadow-orange-500/10 transition-all cursor-default">
              <h3 className={cn("font-semibold text-lg md:text-xl mb-3", readingMode === 'sepia' ? 'text-orange-700' : 'text-orange-400')}>{t("landing.problem.catch22.title")}</h3>
              <p className={cn("text-sm md:text-base leading-relaxed transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-800/80' : 'text-foreground/70')}>{t("landing.problem.catch22.description")}</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className={cn("p-6 md:p-8 rounded-2xl border-l-4 border-primary transition-colors duration-300", theme.cardBg)}>
            <h3 className={cn("font-semibold text-xl md:text-2xl mb-4 transition-colors duration-300", theme.headings)}>{t("landing.problem.stakes.title")}</h3>
            <p className={cn("text-base md:text-lg leading-relaxed whitespace-pre-line transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-700' : 'text-foreground/80')}>{t("landing.problem.stakes.description")}</p>
          </motion.div>
        </div>
      </section>

      {/* ===== GUIDE SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.sectionAlt)}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto md:mx-0">
              <div className={cn("w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 shadow-xl transition-colors duration-300", readingMode === 'sepia' ? 'border-amber-600/30' : 'border-primary/30')}>
                <Image src="/Rem Profile Square 300.png" alt="Remington" width={192} height={192} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic mb-6 transition-colors duration-300", theme.headings)}>{t("landing.guide.header")}</h2>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className={cn("text-base md:text-lg leading-relaxed whitespace-pre-line transition-colors duration-300", theme.content)}>
                {t("landing.guide.story")}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }} className="pt-2">
                <Image src="/sigature no bg.png" alt="Remington's signature" width={200} height={80} className={cn("h-20 md:h-24 w-auto object-contain", readingMode === 'sepia' ? '' : 'invert')} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="pt-4">
                <ul className={cn("space-y-2 text-sm md:text-base transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-700' : 'text-foreground/80')}>
                  {(['experience', 'sales', 'clients', 'retention'] as const).map((key) => (
                    <li key={key} className="flex items-center gap-2">
                      <span className={cn(readingMode === 'sepia' ? 'text-green-700' : 'text-green-400')}>✓</span>
                      {t(`landing.guide.proofPoints.${key}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-12 md:mt-16">
            <p className={cn("text-center text-sm uppercase tracking-wider mb-6 transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-700' : 'text-foreground/70')}>{t("landing.guide.trustedBy")}</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {clientLogos.map((logo) => (
                <div key={logo.name} className="h-12 md:h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  <Image src={logo.src} alt={logo.alt} width={120} height={48} className={cn("h-full w-auto object-contain", readingMode === 'sepia' ? '' : 'invert')} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PLAN SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.section)}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 transition-colors duration-300", theme.headings)}>{t("landing.plan.header")}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {(['step1', 'step2', 'step3'] as const).map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }} className={cn("p-6 rounded-2xl border transition-colors duration-300", readingMode === 'sepia' ? 'bg-amber-100/80 border-amber-300/50' : 'bg-primary/5 border-primary/20')}>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4 transition-colors duration-300", readingMode === 'sepia' ? 'bg-amber-200 text-amber-800' : 'bg-primary/20 text-primary')}>
                  {t(`landing.plan.${step}.number`)}
                </div>
                <h3 className={cn("font-semibold text-xl mb-3 transition-colors duration-300", theme.headings)}>{t(`landing.plan.${step}.title`)}</h3>
                <p className={cn("text-sm md:text-base leading-relaxed transition-colors duration-300", theme.muted)}>{t(`landing.plan.${step}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS SECTION ===== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="w-full h-full" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}>
            <Image src="/layercake-bg.png" alt="" fill className="object-cover" priority={false} />
          </motion.div>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 text-white">{t("landing.success.header")}</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="p-6 md:p-8 rounded-2xl bg-green-500/20 border border-green-500/30 backdrop-blur-sm mb-8">
            <p className="text-green-400 font-semibold text-lg mb-4">{t("landing.success.timeframe")}</p>
            <ul className="space-y-3 text-white/90 text-base md:text-lg">
              {(['item1', 'item2', 'item3', 'item4'] as const).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  {t(`landing.success.vision.${item}`)}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("landing.success.contrast")}
          </motion.p>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.section)}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className={cn("font-serif text-3xl sm:text-4xl md:text-5xl italic text-center mb-12 md:mb-16 transition-colors duration-300", theme.headings)}>{t("landing.features.header")}</h2>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {(['builder', 'crm', 'email', 'payments', 'booking', 'comms'] as const).map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * (i + 1) }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={cn("p-6 rounded-2xl border transition-all cursor-default", readingMode === 'sepia' ? 'bg-amber-100/80 border-amber-300/50' : 'bg-primary/5 border-primary/20')}
              >
                <h3 className={cn("font-semibold text-lg mb-2 transition-colors duration-300", theme.headings)}>{t(`landing.features.${key}.title`)}</h3>
                <p className={cn("text-sm leading-relaxed transition-colors duration-300", theme.muted)}>{t(`landing.features.${key}.description`)}</p>
              </motion.div>
            ))}
          </div>

          {/* Multi-Tenant Full Width */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }} whileHover={{ scale: 1.01, y: -2 }} className={cn("p-6 rounded-2xl border transition-all cursor-default mb-12", readingMode === 'sepia' ? 'bg-purple-100/80 border-purple-300/50' : 'bg-purple-500/10 border-purple-500/30')}>
            <h3 className={cn("font-semibold text-lg mb-2 transition-colors duration-300", theme.headings)}>{t("landing.features.multiTenant.title")}</h3>
            <p className={cn("text-sm leading-relaxed transition-colors duration-300", theme.muted)}>{t("landing.features.multiTenant.description")}</p>
          </motion.div>

          {/* Integrations */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <h3 className={cn("font-serif text-2xl italic text-center mb-8 transition-colors duration-300", theme.headings)}>{t("landing.features.integrations.title")}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
              {integrations.map((integration, i) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.03 * i }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all cursor-default",
                    integration.bg, integration.border
                  )}
                >
                  <span className={cn(
                    "transition-colors duration-300",
                    integration.color
                  )}>
                    {integration.icon}
                  </span>
                  <span className={cn(
                    "text-xs font-medium text-center leading-tight transition-colors duration-300",
                    readingMode === 'sepia' ? 'text-amber-800' : 'text-foreground/70'
                  )}>
                    {integration.name}
                  </span>
                  {integration.status === 'coming' && (
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full",
                      readingMode === 'sepia' ? 'bg-amber-200/60 text-amber-600' : 'bg-foreground/10 text-foreground/50'
                    )}>soon</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing line */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center mt-12">
            <p className={cn("text-base md:text-lg font-medium transition-colors duration-300", theme.headings)}>{t("landing.features.pricing")}</p>
            <p className={cn("text-sm mt-2 transition-colors duration-300", theme.muted)}>{t("landing.features.note")}</p>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className={cn("py-16 md:py-24 transition-colors duration-300", theme.sectionCta)}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className={cn("font-serif text-2xl sm:text-3xl md:text-4xl italic mb-8 transition-colors duration-300", theme.headings)}>{t("landing.finalCta.header")}</h2>
            <p className={cn("text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line transition-colors duration-300", theme.muted)}>{t("landing.finalCta.push")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button asChild size="lg" shine className={cn("text-base px-8 py-6", readingMode === 'sepia' && "bg-amber-700 hover:bg-amber-800 text-white border-amber-600 ring-amber-500/20")}>
                <a href={APP_URL}>{t("landing.finalCta.cta")}</a>
              </Button>
              <Button variant="ghost" size="lg" className={cn("transition-colors", readingMode === 'sepia' ? 'text-amber-700 hover:text-amber-900 hover:bg-amber-200/50' : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10')} onClick={() => setIsVideoOpen(true)}>
                {t("landing.finalCta.ctaSecondary")} →
              </Button>
            </div>
            <p className={cn("text-xs transition-colors duration-300", readingMode === 'sepia' ? 'text-amber-600/60' : 'text-foreground/40')}>{t("landing.finalCta.objectionHandler")}</p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer readingMode={readingMode} />
    </main>
  );
}
