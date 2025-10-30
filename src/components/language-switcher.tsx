'use client';

import { useLanguage } from './language-provider';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5", className)}>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1 text-sm rounded-full transition-all duration-200",
          language === 'en' 
            ? "bg-white/20 text-current" 
            : "text-current/60 hover:text-current/80"
        )}
        title={t('common.english')}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('de')}
        className={cn(
          "px-3 py-1 text-sm rounded-full transition-all duration-200",
          language === 'de' 
            ? "bg-white/20 text-current" 
            : "text-current/60 hover:text-current/80"
        )}
        title={t('common.german')}
      >
        DE
      </button>
    </div>
  );
}