'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ContentPageLayout, useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { CalendarBookingModal } from '@/components/calendar-booking-modal';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

function BuildSprintContent() {
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get current quarter info
  const now = new Date();
  const quarter = `Q${Math.ceil((now.getMonth() + 1) / 3)}`;
  const year = now.getFullYear();

  return (
    <article>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          {t('buildSprint.hero.headline')}
        </h1>
        <p className={cn("text-xl max-w-3xl mx-auto leading-relaxed mb-8 transition-colors duration-300", theme.muted)}>
          {t('buildSprint.hero.subheadline')}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors"
        >
          {t('buildSprint.hero.cta')}
        </button>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-xl leading-relaxed space-y-16 transition-colors duration-300", theme.content)}>

          {/* The Problem Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.problem.title')}
            </h2>
            <p className={cn("text-2xl font-light mb-8 transition-colors duration-300", theme.quote)}>
              {t('buildSprint.problem.headline')}
            </p>

            {/* Story */}
            <div className={cn("border-l-4 pl-6 py-4 rounded-r-lg mb-8 transition-colors duration-300", theme.quote)}>
              <p className="mb-4 italic">
                {t('buildSprint.problem.story.intro')}
              </p>
              <p className="mb-4">
                {t('buildSprint.problem.story.middle')}
              </p>
              <p className="mb-4 font-medium">
                {t('buildSprint.problem.story.conflict')}
              </p>
              <p className="font-semibold">
                {t('buildSprint.problem.story.conclusion')}
              </p>
            </div>

            {/* The Math */}
            <div className={cn("p-6 rounded-lg mb-6 transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
              <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                {t('buildSprint.problem.math.title')}
              </h3>
              <ul className="space-y-3 mb-4">
                {(t('buildSprint.problem.math.items', { returnObjects: true }) as any[]).map((item: any, index: number) => (
                  <li key={index} className="flex justify-between items-center border-b border-current/10 pb-2">
                    <span>{item.task}</span>
                    <span className="font-mono font-semibold">{item.time}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold text-lg">
                {t('buildSprint.problem.math.total')}
              </p>
            </div>
          </section>

          {/* The Solution Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.solution.title')}
            </h2>
            <p className={cn("text-2xl font-light mb-6 transition-colors duration-300", theme.quote)}>
              {t('buildSprint.solution.headline')}
            </p>
            <p className="mb-6">
              {t('buildSprint.solution.description')}
            </p>

            <div className={cn("p-6 rounded-lg mb-6 transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
              <ul className="space-y-3">
                {(t('buildSprint.solution.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mb-4 text-lg">
              {t('buildSprint.solution.conclusion')}
            </p>
            <p className={cn("text-2xl font-semibold italic transition-colors duration-300", theme.headings)}>
              {t('buildSprint.solution.tagline')}
            </p>
          </section>

          {/* How It Works Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.howItWorks.title')}
            </h2>

            <div className="space-y-8">
              {(t('buildSprint.howItWorks.phases', { returnObjects: true }) as any[]).map((phase: any, index: number) => (
                <div key={index} className={cn("p-6 rounded-lg transition-colors duration-300",
                  index === 0 ? (readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20') :
                  index === 1 ? (readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20') :
                  (readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20'))}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={cn("text-3xl font-bold",
                      index === 0 ? 'text-blue-600 dark:text-blue-400' :
                      index === 1 ? 'text-purple-600 dark:text-purple-400' :
                      'text-green-600 dark:text-green-400')}>
                      {index + 1}
                    </span>
                    <div>
                      <h3 className={cn("text-xl font-semibold transition-colors duration-300", theme.headings)}>
                        {phase.name}
                      </h3>
                      <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
                        {phase.weeks}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-12">
                    {phase.tasks.map((task: string, taskIndex: number) => (
                      <li key={taskIndex} className="text-sm">• {task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className={cn("text-xl font-semibold text-center mt-8 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.howItWorks.outcome')}
            </p>
          </section>

          {/* What's Included Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.whatsIncluded.title')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Platform Access */}
              <div className={cn("p-6 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-amber-100/80' : 'bg-gray-50 dark:bg-gray-800')}>
                <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('buildSprint.whatsIncluded.platform.title')}
                </h3>
                <div className="space-y-4">
                  {(t('buildSprint.whatsIncluded.platform.features', { returnObjects: true }) as any[]).map((feature: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className={cn("text-sm transition-colors duration-300", theme.muted)}>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Support */}
              <div className={cn("p-6 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
                <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('buildSprint.whatsIncluded.support.title')}
                </h3>
                <div className="space-y-4">
                  {(t('buildSprint.whatsIncluded.support.levels', { returnObjects: true }) as any[]).map((level: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-medium">{level.name}</h4>
                      <p className={cn("text-sm transition-colors duration-300", theme.muted)}>{level.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 text-center transition-colors duration-300", theme.headings)}>
              {t('buildSprint.pricing.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t('buildSprint.pricing.tiers', { returnObjects: true }) as any[]).map((tier: any, index: number) => (
                <div key={index} className={cn("p-6 rounded-lg transition-colors duration-300 relative",
                  tier.popular
                    ? (readingMode === 'sepia' ? 'bg-purple-100/80 ring-2 ring-purple-500' : 'bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500')
                    : (readingMode === 'sepia' ? 'bg-amber-100/80' : 'bg-gray-50 dark:bg-gray-800'))}>
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className={cn("text-2xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {tier.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{tier.currency}{tier.price}</span>
                  </div>
                  <p className={cn("text-sm mb-4 transition-colors duration-300", theme.muted)}>
                    {tier.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="text-sm flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className={cn("text-xs italic transition-colors duration-300", theme.muted)}>
                    {tier.bestFor}
                  </p>
                </div>
              ))}
            </div>

            {/* Payment Options */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn("p-4 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
                <h4 className="font-semibold mb-2">{t('buildSprint.pricing.paymentOptions.payInFull.title')}</h4>
                <p className="text-sm">{t('buildSprint.pricing.paymentOptions.payInFull.description')}</p>
              </div>
              <div className={cn("p-4 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-amber-100/80' : 'bg-gray-50 dark:bg-gray-800')}>
                <h4 className="font-semibold mb-2">{t('buildSprint.pricing.paymentOptions.splitPayment.title')}</h4>
                <p className="text-sm">{t('buildSprint.pricing.paymentOptions.splitPayment.description')}</p>
              </div>
            </div>
          </section>

          {/* Who This Is For Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.whoIsThisFor.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn("p-6 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
                <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('buildSprint.whoIsThisFor.ideal.title')}
                </h3>
                <ul className="space-y-2">
                  {(t('buildSprint.whoIsThisFor.ideal.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
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
                  {t('buildSprint.whoIsThisFor.notFor.title')}
                </h3>
                <ul className="space-y-2">
                  {(t('buildSprint.whoIsThisFor.notFor.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400">✗</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Limited Availability Section */}
          <section>
            <div className={cn("p-8 rounded-lg text-center transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-orange-100/80' : 'bg-orange-50 dark:bg-orange-900/20')}>
              <h2 className={cn("font-serif text-3xl italic mb-4 transition-colors duration-300", theme.headings)}>
                {t('buildSprint.availability.title')}
              </h2>
              <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                {t('buildSprint.availability.why.title')}
              </h3>
              <p className="mb-4">
                {t('buildSprint.availability.why.description')}
              </p>
              <p className="text-2xl font-bold mb-6">
                {t('buildSprint.availability.why.emphasis')}
              </p>
              <div className={cn("inline-block p-4 rounded-lg transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-white/50' : 'bg-white dark:bg-gray-800')}>
                <p className="text-lg font-semibold">
                  {t('buildSprint.availability.status.remaining', { spots: 3 })}
                </p>
                <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
                  {t('buildSprint.availability.status.quarter', { quarter, year })}
                </p>
              </div>
            </div>
          </section>

          {/* Outcomes Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.outcomes.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(t('buildSprint.outcomes.items', { returnObjects: true }) as any[]).map((item: any, index: number) => (
                <div key={index} className={cn("p-6 rounded-lg transition-colors duration-300",
                  readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
                  <h3 className={cn("text-lg font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {item.title}
                  </h3>
                  <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 transition-colors duration-300", theme.headings)}>
              {t('buildSprint.faq.title')}
            </h2>

            <div className="space-y-6">
              {(t('buildSprint.faq.items', { returnObjects: true }) as any[]).map((item: any, index: number) => (
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

          {/* Apply Section */}
          <section>
            <h2 className={cn("font-serif text-3xl italic mb-8 text-center transition-colors duration-300", theme.headings)}>
              {t('buildSprint.apply.title')}
            </h2>

            <div className={cn("p-6 rounded-lg transition-colors duration-300",
              readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20')}>
              <h3 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                {t('buildSprint.apply.process.title')}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {(t('buildSprint.apply.process.steps', { returnObjects: true }) as any[]).map((step: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                      readingMode === 'sepia' ? 'bg-purple-200 text-purple-800' : 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200')}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{step.step}</p>
                      <p className={cn("text-xs transition-colors duration-300", theme.muted)}>{step.description}</p>
                    </div>
                    {index < 4 && <span className={cn("ml-2 transition-colors duration-300", theme.muted)}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            {t('buildSprint.cta.title')}
          </h3>
          <p className={cn("mb-6 transition-colors duration-300", theme.muted)}>
            {t('buildSprint.cta.description')}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-colors"
          >
            {t('buildSprint.cta.button')}
          </button>
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

export default function BuildSprintPage() {
  return (
    <ContentPageLayout>
      <BuildSprintContent />
    </ContentPageLayout>
  );
}
