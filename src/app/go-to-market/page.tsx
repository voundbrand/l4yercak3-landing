'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ContentPageLayout, useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { ValueCalculator } from '@/components/value-calculator';
import { CalendarBookingModal } from '@/components/calendar-booking-modal';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

function DoMoreWithLessContent() {
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme classes for buttons
  const themeClasses = {
    dark: {
      button: "bg-primary text-primary-foreground hover:bg-primary/90",
      buttonSecondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    },
    sepia: {
      button: "bg-amber-800 text-amber-50 hover:bg-amber-700",
      buttonSecondary: "bg-amber-700 text-amber-50 hover:bg-amber-600",
    },
  };

  const currentTheme = themeClasses[readingMode];

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          {t('doMoreWithLess.title')}
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          {t('doMoreWithLess.subtitle')}
        </p>
      </div>

      {/* Value Calculator */}
      <ValueCalculator />

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            {t('doMoreWithLess.cta.title')}
          </h3>
          <p className={cn("mb-6 transition-colors duration-300", theme.muted)}>
            {t('doMoreWithLess.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors",
                currentTheme.button)}
            >
              {t('doMoreWithLess.cta.buttons.scheduleDemo')}
            </button>
            <Link
              href="/ship-fast"
              className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors",
                currentTheme.buttonSecondary)}
            >
              {t('doMoreWithLess.cta.buttons.learnMore')}
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {isModalOpen && (
        <CalendarBookingModal
          onClose={() => setIsModalOpen(false)}
          readingMode={readingMode}
        />
      )}
    </article>
  );
}

export default function DoMoreWithLessPage() {
  return (
    <ContentPageLayout>
      <DoMoreWithLessContent />
    </ContentPageLayout>
  );
}