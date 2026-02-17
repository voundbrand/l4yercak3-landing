'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { LeadMagnetForm } from '@/components/lead-magnet-form';
import { Book3D } from '@/components/book-3d';
import { cn } from '@/lib/utils';

const SKOOL_URL = 'https://www.skool.com/der-hebel-1168/about';


function BlueprintContent() {
  const { t } = useTranslation();
  const theme = useContentTheme();
  const [submittedStage, setSubmittedStage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleSubmitSuccess = (agencyStage: string, blueprintUrl?: string) => {
    setSubmittedStage(agencyStage);
    setDownloadUrl(blueprintUrl || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stages = t('landing.blueprint.thankYou.stages', { returnObjects: true }) as Record<string, string>;

  return (
    <article className="max-w-lg mx-auto">
      {submittedStage ? (
        /* Thank-You State */
        <div className="text-center space-y-6 w-full">
          <div className="text-5xl sm:text-6xl mb-2">&#x1F389;</div>
          <h1 className={cn("text-2xl sm:text-3xl md:text-4xl font-bold leading-tight transition-colors duration-300", theme.headings)}>
            {t('landing.blueprint.thankYou.headline')}
          </h1>
          <p className={cn("text-lg transition-colors duration-300", theme.content)}>
            {t('landing.blueprint.thankYou.stageMessage')}{' '}
            <span className={cn("font-bold transition-colors duration-300", theme.headings)}>
              {stages[submittedStage] || submittedStage}
            </span>{' '}
            {t('landing.blueprint.thankYou.stageEnd')}
          </p>

          {/* Download CTA */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-foreground text-background font-bold uppercase tracking-wide text-base text-center transition-opacity hover:opacity-90"
            >
              {t('landing.blueprint.thankYou.downloadCta')}
            </a>
          )}

          {/* Community CTA */}
          <div className={cn("p-5 rounded-2xl border transition-colors duration-300", theme.cta)}>
            <p className={cn("text-sm mb-3 transition-colors duration-300", theme.muted)}>
              {t('landing.blueprint.thankYou.communityDescription')}
            </p>
            <a
              href={SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("block w-full py-3 rounded-xl border-2 font-semibold text-center text-sm transition-colors hover:opacity-80", theme.cta, theme.headings)}
            >
              {t('landing.blueprint.thankYou.communityCta')}
            </a>
          </div>
        </div>
      ) : (
        /* Form State */
        <>
          {/* Headline */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className={cn("text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2 transition-colors duration-300", theme.headings)}>
              {t('landing.blueprint.headline')}
            </h1>
            <p className={cn("text-lg sm:text-xl font-medium transition-colors duration-300", theme.content)}>
              {t('landing.blueprint.headlineSuffix')}
            </p>
            <p className={cn("text-sm mt-2 transition-colors duration-300", theme.muted)}>
              {t('landing.blueprint.subheadline')}
            </p>
          </div>

          {/* 3D Book */}
          <div className="w-full mb-8 py-4">
            <Book3D
              coverSrc="/blueprint-cover.png"
              alt="The Recurring Revenue Blueprint"
            />
          </div>

          {/* Form — dark container to match form's built-in dark styling */}
          <div className="w-full mb-8 rounded-2xl bg-gray-950 p-6">
            <LeadMagnetForm onSubmitSuccess={handleSubmitSuccess} />
          </div>

          {/* Social Proof */}
          <p className={cn("text-xs sm:text-sm text-center mb-4 italic transition-colors duration-300", theme.muted)}>
            {t('landing.blueprint.socialProof')}
          </p>

          {/* GDPR Consent */}
          <p className={cn("text-[10px] sm:text-xs text-center leading-relaxed max-w-sm mx-auto transition-colors duration-300", theme.muted)}>
            {t('landing.blueprint.consent')}
          </p>
        </>
      )}
    </article>
  );
}

export default function BlueprintPage() {
  return (
    <ContentPageLayout showCta={false}>
      <BlueprintContent />
    </ContentPageLayout>
  );
}
