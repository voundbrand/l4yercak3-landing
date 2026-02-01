'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function DataDeletionContent() {
  const theme = useContentTheme();
  const { t } = useTranslation();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          {t('legal.dataDeletion.title')}
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          {t('legal.dataDeletion.subtitle')}
        </p>
        <div className={cn("mt-8 text-sm transition-colors duration-300", theme.muted)}>
          <time>{t('legal.dataDeletion.lastUpdated')}</time>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-lg leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

          {/* Overview */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.overview.title')}
            </h2>
            <p>
              <strong>{t('legal.common.company.name')}</strong> (&quot;{t('legal.dataDeletion.title').includes('Daten') ? 'wir' : 'we'},&quot; &quot;{t('legal.dataDeletion.title').includes('Daten') ? 'uns' : 'us'},&quot; {t('legal.dataDeletion.title').includes('Daten') ? 'oder' : 'or'} &quot;{t('legal.dataDeletion.title').includes('Daten') ? 'unser' : 'our'}&quot;) {t('legal.dataDeletion.sections.overview.content')}
            </p>
          </section>

          {/* Data Collected */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.dataCollected.title')}
            </h2>
            <p>
              {t('legal.dataDeletion.sections.dataCollected.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>{t('legal.dataDeletion.sections.dataCollected.items.profile', '').split(':')[0]}</strong>:{t('legal.dataDeletion.sections.dataCollected.items.profile', '').split(':').slice(1).join(':')}</li>
              <li><strong>{t('legal.dataDeletion.sections.dataCollected.items.userId', '').split(':')[0]}</strong>:{t('legal.dataDeletion.sections.dataCollected.items.userId', '').split(':').slice(1).join(':')}</li>
              <li><strong>{t('legal.dataDeletion.sections.dataCollected.items.messages', '').split(':')[0]}</strong>:{t('legal.dataDeletion.sections.dataCollected.items.messages', '').split(':').slice(1).join(':')}</li>
              <li><strong>{t('legal.dataDeletion.sections.dataCollected.items.phone', '').split(':')[0]}</strong>:{t('legal.dataDeletion.sections.dataCollected.items.phone', '').split(':').slice(1).join(':')}</li>
              <li><strong>{t('legal.dataDeletion.sections.dataCollected.items.interaction', '').split(':')[0]}</strong>:{t('legal.dataDeletion.sections.dataCollected.items.interaction', '').split(':').slice(1).join(':')}</li>
            </ul>
          </section>

          {/* How to Request */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.howToRequest.title')}
            </h2>
            <p>
              {t('legal.dataDeletion.sections.howToRequest.content')}
            </p>

            <div className={cn("p-6 rounded-lg mt-4 space-y-4", theme.quote)}>
              <div>
                <p className="font-semibold">{t('legal.dataDeletion.sections.howToRequest.emailOption.title')}</p>
                <p>{t('legal.dataDeletion.sections.howToRequest.emailOption.content')}</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i}>{t(`legal.dataDeletion.sections.howToRequest.emailOption.items.${i}`)}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold">{t('legal.dataDeletion.sections.howToRequest.supportOption.title')}</p>
                <p>
                  {t('legal.dataDeletion.sections.howToRequest.supportOption.content').split(t('legal.dataDeletion.title').includes('Daten') ? 'Support-Seite' : 'Support page')[0]}
                  <Link href="/support" className="underline hover:opacity-80">
                    {t('legal.dataDeletion.title').includes('Daten') ? 'Support-Seite' : 'Support page'}
                  </Link>
                  {t('legal.dataDeletion.sections.howToRequest.supportOption.content').split(t('legal.dataDeletion.title').includes('Daten') ? 'Support-Seite' : 'Support page')[1]}
                </p>
              </div>
            </div>
          </section>

          {/* What Gets Deleted */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.whatWeDelete.title')}
            </h2>
            <p>
              {t('legal.dataDeletion.sections.whatWeDelete.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i}>{t(`legal.dataDeletion.sections.whatWeDelete.items.${i}`)}</li>
              ))}
            </ul>
            <p className="mt-4">
              <strong>{t('legal.dataDeletion.title').includes('Daten') ? 'Ausnahmen:' : 'Exceptions:'}</strong> {t('legal.dataDeletion.sections.whatWeDelete.exceptions')}
            </p>
          </section>

          {/* Processing Timeline */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.timeline.title')}
            </h2>
            <p>
              {t('legal.dataDeletion.sections.timeline.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              {(['acknowledgment', 'verification', 'deletion', 'confirmation'] as const).map((key) => {
                const text = t(`legal.dataDeletion.sections.timeline.items.${key}`, '');
                const [label, ...rest] = text.split(':');
                return (
                  <li key={key}><strong>{label}</strong>:{rest.join(':')}</li>
                );
              })}
            </ul>
          </section>

          {/* Status Check */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.statusCheck.title')}
            </h2>
            <p>
              {t('legal.dataDeletion.sections.statusCheck.content')}
            </p>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.legalBasis.title')}
            </h2>
            <p>
              {t('legal.dataDeletion.sections.legalBasis.content')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              {[0, 1, 2].map((i) => {
                const text = t(`legal.dataDeletion.sections.legalBasis.items.${i}`, '');
                const dashIndex = text.indexOf('—') !== -1 ? text.indexOf('—') : text.indexOf(' — ');
                if (dashIndex !== -1) {
                  return (
                    <li key={i}><strong>{text.substring(0, text.indexOf('—')).trim()}</strong> &mdash; {text.substring(text.indexOf('—') + 1).trim()}</li>
                  );
                }
                return <li key={i}>{text}</li>;
              })}
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('legal.dataDeletion.sections.contact.title')}
            </h2>
            <p>{t('legal.dataDeletion.sections.contact.content')}</p>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">{t('legal.common.company.name')}</p>
              <p>{t('legal.common.company.address')}</p>
              <p>{t('legal.common.company.city')}</p>
              <p>{t('legal.common.company.country')}</p>
              <p>Email: {t('legal.common.company.email')}</p>
            </div>
          </section>

        </div>
      </div>

      {/* Related Links */}
      <div className="mt-16">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            {t('legal.common.relatedDocuments')}
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              {t('legal.dataDeletion.relatedDocuments.privacy')}
            </Link>
            <Link href="/terms" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              {t('legal.dataDeletion.relatedDocuments.terms')}
            </Link>
            <Link href="/dpa" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              {t('legal.dataDeletion.relatedDocuments.dpa')}
            </Link>
            <Link href="/support" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              {t('legal.dataDeletion.relatedDocuments.support')}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DataDeletionPage() {
  return (
    <ContentPageLayout>
      <DataDeletionContent />
    </ContentPageLayout>
  );
}
