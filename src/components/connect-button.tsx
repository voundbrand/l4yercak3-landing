'use client';

import { useState } from 'react';
import { buttonVariants } from './ui/button';
import { CalendarBookingModal } from './calendar-booking-modal';
import { useReadingMode } from './content-page-layout';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// Calendar Icon
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.5 2.5H11V1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V2.5H6V1.5C6 1.22386 5.77614 1 5.5 1C5.22386 1 5 1.22386 5 1.5V2.5H3.5C2.67157 2.5 2 3.17157 2 4V12.5C2 13.3284 2.67157 14 3.5 14H12.5C13.3284 14 14 13.3284 14 12.5V4C14 3.17157 13.3284 2.5 12.5 2.5ZM13 12.5C13 12.7761 12.7761 13 12.5 13H3.5C3.22386 13 3 12.7761 3 12.5V6H13V12.5ZM13 5H3V4C3 3.72386 3.22386 3.5 3.5 3.5H5V4.5C5 4.77614 5.22386 5 5.5 5C5.77614 5 6 4.77614 6 4.5V3.5H10V4.5C10 4.77614 10.2239 5 10.5 5C10.7761 5 11 4.77614 11 4.5V3.5H12.5C12.7761 3.5 13 3.72386 13 4V5Z" fill="currentColor"/>
  </svg>
);

export function ConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { readingMode } = useReadingMode();
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          readingMode === 'sepia' && "bg-amber-800 hover:bg-amber-700 text-amber-50"
        )}
        aria-label={t('common.letsConnect')}
        title="Schedule a call to connect"
      >
        <CalendarIcon className="size-4" />
        {t('common.letsConnect')}
      </button>

      {isModalOpen && (
        <CalendarBookingModal
          onClose={() => setIsModalOpen(false)}
          readingMode={readingMode}
        />
      )}
    </>
  );
}