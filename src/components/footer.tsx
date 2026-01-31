'use client';

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import XLogoIcon from "./icons/x";
import LinkedInIcon from "./icons/linkedin";
import YouTubeIcon from "./icons/youtube";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';

type ReadingMode = 'dark' | 'sepia';

interface FooterProps {
  readingMode?: ReadingMode;
}

export const Footer = ({ readingMode = 'dark' }: FooterProps) => {
  const { t } = useTranslation();

  const isSepia = readingMode === 'sepia';

  return (
    <footer className={cn(
      "w-full py-8 md:py-12 border-t transition-colors duration-300",
      isSepia ? "bg-amber-50 border-amber-300/50" : "bg-background border-border/50"
    )}>
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
        {/* Social Icons */}
        <div className="flex gap-4 md:gap-6 items-center">
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
        </div>

        {/* Legal Links */}
        <div className={cn(
          "flex flex-wrap justify-center gap-4 text-xs",
          isSepia ? "text-amber-700" : "text-foreground/60"
        )}>
          <Link href="/privacy" className={cn("hover:underline transition-colors", isSepia ? "hover:text-amber-900" : "hover:text-foreground/80")}>
            {t('legal.links.privacy')}
          </Link>
          <Link href="/terms" className={cn("hover:underline transition-colors", isSepia ? "hover:text-amber-900" : "hover:text-foreground/80")}>
            {t('legal.links.terms')}
          </Link>
          <Link href="/eula" className={cn("hover:underline transition-colors", isSepia ? "hover:text-amber-900" : "hover:text-foreground/80")}>
            {t('legal.links.eula')}
          </Link>
          <Link href="/docs" className={cn("hover:underline transition-colors", isSepia ? "hover:text-amber-900" : "hover:text-foreground/80")}>
            {t('legal.links.docs')}
          </Link>
          <Link href="/support" className={cn("hover:underline transition-colors", isSepia ? "hover:text-amber-900" : "hover:text-foreground/80")}>
            {t('legal.links.support')}
          </Link>
        </div>

        {/* Tagline */}
        <div className={cn("text-xs font-medium", isSepia ? "text-amber-600" : "text-foreground/60")}>
          {t('footer.tagline')}
        </div>

        {/* Copyright */}
        <div className={cn("text-xs mt-2", isSepia ? "text-amber-500" : "text-foreground/40")}>
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};
