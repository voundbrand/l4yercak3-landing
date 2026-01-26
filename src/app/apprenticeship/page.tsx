'use client';

import { useState } from 'react';
import { ContentPageLayout, useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { ApprenticeshipModal } from '@/components/apprenticeship-modal';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

function ApprenticeshipContent() {
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          {t('landing.apprenticeship.page.hero.headline')}
        </h1>
        <p className={cn("text-xl max-w-3xl mx-auto leading-relaxed mb-8 transition-colors duration-300", theme.muted)}>
          {t('landing.apprenticeship.page.hero.subheadline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors"
          >
            {t('landing.apprenticeship.page.hero.cta')}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-xl leading-relaxed space-y-16 transition-colors duration-300", theme.content)}>

          {/* The Problem Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
              {t('landing.apprenticeship.page.problem.title')}
            </h2>
            <div className={cn("border-l-4 pl-6 py-4 rounded-r-lg transition-colors duration-300", theme.quote)}>
              <p className="whitespace-pre-line">
                {t('landing.apprenticeship.page.problem.content')}
              </p>
            </div>
          </section>

          {/* The Solution Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
              {t('landing.apprenticeship.page.solution.title')}
            </h2>
            <div className={cn("p-6 rounded-lg transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
              <p className="whitespace-pre-line">
                {t('landing.apprenticeship.page.solution.content')}
              </p>
            </div>
          </section>

          {/* How It Works Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('landing.apprenticeship.page.howItWorks.title')}
            </h2>

            <div className="space-y-4">
              {(t('landing.apprenticeship.page.howItWorks.steps', { returnObjects: true }) as any[]).map((step: any, index: number) => (
                <div key={index} className={cn("p-4 rounded-lg transition-colors duration-300 flex items-start gap-4",
                  readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 shrink-0 w-8">
                    {step.number}
                  </span>
                  <div>
                    <h3 className={cn("text-lg font-semibold mb-1 transition-colors duration-300", theme.headings)}>
                      {step.title}
                    </h3>
                    <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Project Types Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('landing.apprenticeship.page.projectTypes.title')}
            </h2>
            <p className={cn("mb-6 transition-colors duration-300", theme.muted)}>
              {t('landing.apprenticeship.page.projectTypes.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(t('landing.apprenticeship.page.projectTypes.items', { returnObjects: true }) as any[]).map((item: any, index: number) => (
                <div key={index} className={cn("p-4 rounded-lg transition-colors duration-300",
                  readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20')}>
                  <h3 className={cn("text-base font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {item.name}
                  </h3>
                  <p className={cn("text-xs transition-colors duration-300", theme.muted)}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What You Get / Don't Get Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What You Get */}
              <div className={cn("p-6 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
                <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('landing.apprenticeship.page.whatYouGet.title')}
                </h3>
                <ul className="space-y-2">
                  {(t('landing.apprenticeship.page.whatYouGet.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You Don't Get */}
              <div className={cn("p-6 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
                <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('landing.apprenticeship.page.whatYouDontGet.title')}
                </h3>
                <ul className="space-y-2">
                  {(t('landing.apprenticeship.page.whatYouDontGet.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* My Commitment Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
              {t('landing.apprenticeship.page.myCommitment.title')}
            </h2>
            <div className={cn("p-6 rounded-lg transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-amber-100/80' : 'bg-amber-50 dark:bg-amber-900/20')}>
              <ul className="space-y-3">
                {(t('landing.apprenticeship.page.myCommitment.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="text-sm flex items-start gap-3">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 text-lg">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Who This Is For Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('landing.apprenticeship.page.whoIsThisFor.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn("p-6 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
                <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('landing.apprenticeship.page.whoIsThisFor.ideal.title')}
                </h3>
                <ul className="space-y-2">
                  {(t('landing.apprenticeship.page.whoIsThisFor.ideal.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cn("p-6 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
                <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('landing.apprenticeship.page.whoIsThisFor.notFor.title')}
                </h3>
                <ul className="space-y-2">
                  {(t('landing.apprenticeship.page.whoIsThisFor.notFor.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400">✗</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('landing.apprenticeship.page.faq.title')}
            </h2>

            <div className="space-y-6">
              {(t('landing.apprenticeship.page.faq.items', { returnObjects: true }) as any[]).map((item: any, index: number) => (
                <div key={index} className={cn("border-l-4 pl-6 py-2 transition-colors duration-300", theme.quote)}>
                  <h3 className={cn("text-lg font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {item.question}
                  </h3>
                  <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            {t('landing.apprenticeship.page.cta.title')}
          </h3>
          <p className={cn("mb-6 transition-colors duration-300", theme.muted)}>
            {t('landing.apprenticeship.page.cta.description')}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors"
          >
            {t('landing.apprenticeship.page.cta.button')}
          </button>
        </div>
      </div>

      {/* Apprenticeship Modal */}
      {isModalOpen && (
        <ApprenticeshipModal onClose={() => setIsModalOpen(false)} />
      )}
    </article>
  );
}

export default function ApprenticeshipPage() {
  return (
    <ContentPageLayout>
      <ApprenticeshipContent />
    </ContentPageLayout>
  );
}
