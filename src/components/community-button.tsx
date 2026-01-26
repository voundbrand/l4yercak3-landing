'use client';

import Link from 'next/link';
import { useReadingMode } from './content-page-layout';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// Users/Community Icon
const UsersIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function CommunityButton() {
  const { readingMode } = useReadingMode();
  const { t } = useTranslation();

  return (
    <Link
      href="https://www.skool.com/l4yercak3/about"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        readingMode === 'sepia' && "bg-amber-800 hover:bg-amber-700 text-amber-50"
      )}
    >
      <UsersIcon className="size-4" />
      {t('common.joinCommunity')}
    </Link>
  );
}
