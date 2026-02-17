'use client';

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
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

  const linkClass = cn(
    "text-xs hover:underline transition-colors",
    isSepia ? "text-amber-700 hover:text-amber-900" : "text-foreground/60 hover:text-foreground/80"
  );

  const headingClass = cn(
    "text-xs font-semibold uppercase tracking-wider mb-3",
    isSepia ? "text-amber-800" : "text-foreground/80"
  );

  const iconClass = cn(
    "p-2 rounded-full transition-all duration-200",
    isSepia
      ? "bg-amber-200/50 hover:bg-amber-300/50 text-amber-800"
      : "bg-white/10 hover:bg-white/20 text-foreground"
  );

  return (
    <footer className={cn(
      "w-full py-10 md:py-14 border-t transition-colors duration-300",
      isSepia ? "bg-amber-50 border-amber-300/50" : "bg-background border-border/50"
    )}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Product */}
          <div>
            <h4 className={headingClass}>{t('footer.product')}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className={linkClass}>{t('navigation.home')}</Link>
              <Link href="/pricing" className={linkClass}>{t('navigation.pricing')}</Link>
              <Link href="/blueprint" className={linkClass}>{t('navigation.blueprint')}</Link>
              <Link href="/docs" className={linkClass}>{t('legal.links.docs')}</Link>
              <Link href="/support" className={linkClass}>{t('legal.links.support')}</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className={headingClass}>{t('footer.legal')}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className={linkClass}>{t('legal.links.privacy')}</Link>
              <Link href="/cookies" className={linkClass}>{t('legal.links.cookies')}</Link>
              <Link href="/terms" className={linkClass}>{t('legal.links.terms')}</Link>
              <Link href="/eula" className={linkClass}>{t('legal.links.eula')}</Link>
              <Link href="/data-deletion" className={linkClass}>{t('legal.links.dataDeletion')}</Link>
            </nav>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-1">
            <h4 className={headingClass}>Social</h4>
            <div className="flex gap-3 items-center">
              <Link target="_blank" href={socialLinks.linkedin} className={iconClass} aria-label="Follow Remington on LinkedIn">
                <LinkedInIcon className="size-4" />
              </Link>
              <Link target="_blank" href={socialLinks.x} className={iconClass} aria-label="Follow Remington on X (Twitter)">
                <XLogoIcon className="size-4" />
              </Link>
              <Link target="_blank" href={socialLinks.instagram} className={iconClass} aria-label="Follow Remington on Instagram">
                <InstagramLogoIcon className="size-4" />
              </Link>
              <Link target="_blank" href={socialLinks.youtube} className={iconClass} aria-label="Subscribe to Remington on YouTube">
                <YouTubeIcon className="size-4" />
              </Link>
              <Link target="_blank" href={socialLinks.github} className={iconClass} aria-label="Follow Remington on GitHub">
                <GitHubLogoIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={cn(
          "mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2",
          isSepia ? "border-amber-200/50" : "border-border/30"
        )}>
          <div className={cn("text-xs font-medium", isSepia ? "text-amber-600" : "text-foreground/60")}>
            {t('footer.tagline')}
          </div>
          <div className={cn("text-xs", isSepia ? "text-amber-500" : "text-foreground/40")}>
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};
