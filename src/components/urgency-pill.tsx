"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// Urgency Pill Component - Apprenticeship focused
export const UrgencyPill = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/apprenticeship"
      className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-green-600/30 hover:bg-green-600/40 border border-green-500/60 hover:border-green-500/80 rounded-full text-green-200 hover:text-green-100 font-medium text-xs md:text-sm transition-all duration-200 animate-[pulse_2s_ease-in-out_infinite] hover:animate-none backdrop-blur-sm max-w-[calc(100vw-8rem)] text-center"
    >
      <span dangerouslySetInnerHTML={{
        __html: t('landing.apprenticeshipPill.text').replace(
          /Learn More|Mehr erfahren/g,
          '<span class="underline">$&</span>'
        )
      }} />
    </Link>
  );
};