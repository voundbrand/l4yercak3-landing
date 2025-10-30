'use client';

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import XLogoIcon from "./icons/x";
import LinkedInIcon from "./icons/linkedin";
import YouTubeIcon from "./icons/youtube";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";
import { ClientOnly } from "./client-only";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2 absolute bottom-[var(--inset)] left-1/2 -translate-x-1/2">
      {/* Social Icons and Language Toggle */}
      <div className="flex gap-4 md:gap-6 items-center">
      {/* Social Media Icons */}
      <Link 
        target="_blank" 
        className={cn(buttonVariants({ size: "icon" }), "md:w-12 md:h-12")} 
        href={socialLinks.linkedin}
        aria-label="Follow Remington on LinkedIn"
      >
        <LinkedInIcon className="size-5 md:size-6" />
      </Link>
      <Link 
        target="_blank" 
        className={cn(buttonVariants({ size: "icon" }), "md:w-12 md:h-12")} 
        href={socialLinks.x}
        aria-label="Follow Remington on X (Twitter)"
      >
        <XLogoIcon className="size-5 md:size-6" />
      </Link>
      <Link 
        target="_blank" 
        className={cn(buttonVariants({ size: "icon" }), "md:w-12 md:h-12")} 
        href={socialLinks.instagram}
        aria-label="Follow Remington on Instagram"
      >
        <InstagramLogoIcon className="size-5 md:size-6" />
      </Link>
      <Link 
        target="_blank" 
        className={cn(buttonVariants({ size: "icon" }), "md:w-12 md:h-12")} 
        href={socialLinks.youtube}
        aria-label="Subscribe to Remington on YouTube"
      >
        <YouTubeIcon className="size-5 md:size-6" />
      </Link>
      <Link 
        target="_blank" 
        className={cn(buttonVariants({ size: "icon" }), "md:w-12 md:h-12")} 
        href={socialLinks.github}
        aria-label="Follow Remington on GitHub"
      >
        <GitHubLogoIcon className="size-5 md:size-6" />
      </Link>

      {/* Language Toggle */}
      <ClientOnly>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              buttonVariants({ size: "icon" }),
              "md:w-12 md:h-12 text-xs font-semibold transition-all duration-200",
              language === 'en' 
                ? "opacity-100" 
                : "opacity-60 hover:opacity-80"
            )}
            aria-label={t('navigation.switchToEnglish')}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('de')}
            className={cn(
              buttonVariants({ size: "icon" }),
              "md:w-12 md:h-12 text-xs font-semibold transition-all duration-200",
              language === 'de' 
                ? "opacity-100" 
                : "opacity-60 hover:opacity-80"
            )}
            aria-label={t('navigation.switchToGerman')}
          >
            DE
          </button>
        </div>
      </ClientOnly>
      </div>
      
      {/* VC Batch Slogan */}
      <div className="text-xs text-foreground/60 font-medium">
        L4YERCAK3 is a vc83-batch-1 startup
      </div>
    </div>
  );
};