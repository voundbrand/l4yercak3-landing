'use client';

import { useTranslation } from 'react-i18next';
import { buttonVariants } from './ui/button';
import { useReadingMode } from './content-page-layout';
import { cn } from '@/lib/utils';

// External Link Icon (SVG)
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M12 4L4 12M12 4H8M12 4V8" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export function GoToAppButton() {
  const { t } = useTranslation();
  const { readingMode } = useReadingMode();

  return (
    <a
      href="https://app.l4yercak3.com"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "outline", size: "default" }),
        "md:px-6 px-3 text-sm md:text-base",
        "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white",
        readingMode === 'sepia' && "bg-amber-100/10 hover:bg-amber-100/20 text-amber-50 border-amber-200/30"
      )}
    >
      <span>{t('common.goToApp')}</span>
      <ExternalLinkIcon className="w-4 h-4 ml-2" />
    </a>
  );
}