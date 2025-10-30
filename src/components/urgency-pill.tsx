"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationModal } from './application-modal';

// Utility function to get quarter and year 3 months ahead
const getTargetQuarterAndYear = () => {
  const today = new Date();
  const threeMonthsAhead = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  
  const month = threeMonthsAhead.getMonth();
  const year = threeMonthsAhead.getFullYear();
  
  const quarter = Math.floor(month / 3) + 1;
  
  return {
    quarter: `Q${quarter}`,
    year: year.toString()
  };
};

// Urgency Pill Component
export const UrgencyPill = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { quarter, year } = getTargetQuarterAndYear();

  const urgencyText = t('newsletter.urgency')
    .replace('{quarter}', quarter)
    .replace('{year}', year);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-orange-600/30 hover:bg-orange-600/40 border border-orange-500/60 hover:border-orange-500/80 rounded-full text-orange-200 hover:text-orange-100 font-medium text-xs md:text-sm transition-all duration-200 animate-[pulse_2s_ease-in-out_infinite] hover:animate-none backdrop-blur-sm max-w-[calc(100vw-8rem)] text-center"
      >
        <span dangerouslySetInnerHTML={{
          __html: urgencyText.replace(
            /Apply Now|Jetzt bewerben/g, 
            '<span class="underline">$&</span>'
          )
        }} />
      </button>

      {isModalOpen && (
        <ApplicationModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};