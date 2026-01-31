'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ContentPageLayout, useContentTheme, useReadingMode } from '@/components/content-page-layout';
import { CalendarBookingModal } from '@/components/calendar-booking-modal';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

function LearnMoreContent() {
  const theme = useContentTheme();
  const { readingMode } = useReadingMode();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article>
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
            {t('learnMore.title')}
          </h1>
          <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
            {t('learnMore.subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className={cn("text-xl leading-relaxed space-y-12 transition-colors duration-300", theme.content)}>
            
            {/* The Hidden Truth */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.intro.title')}
              </h2>
              <p className={cn("text-xl font-light italic mb-6 transition-colors duration-300", theme.quote)}>
                {t('learnMore.content.intro.subtitle')}
              </p>
              <p className="mb-8">
                {t('learnMore.content.intro.description')}
              </p>
              
              {/* Hidden Truth Section */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.intro.hiddenTruth.title')}
                </h3>
                <p className={cn("text-lg font-medium mb-4 transition-colors duration-300", theme.quote)}>
                  {t('learnMore.content.intro.hiddenTruth.secret')}
                </p>
                <p className="mb-4">
                  {t('learnMore.content.intro.hiddenTruth.explanation')}
                </p>
                <p className="mb-6 font-medium">
                  {t('learnMore.content.intro.hiddenTruth.revelation')}
                </p>
              </div>

              {/* Real Cost Section */}
              <div className={cn("border-l-4 pl-6 py-4 rounded-r-lg mb-8 transition-colors duration-300", theme.quote)}>
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.intro.realCost.title')}
                </h3>
                <p className="mb-4">
                  {t('learnMore.content.intro.realCost.description')}
                </p>
                <p className="mb-4 font-medium">
                  {t('learnMore.content.intro.realCost.discovery')}
                </p>
                <p className="mb-4">
                  {t('learnMore.content.intro.realCost.impact')}
                </p>
                <p className="font-semibold">
                  {t('learnMore.content.intro.realCost.conclusion')}
                </p>
              </div>
            </section>

            {/* The Exclusive Club */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.exclusiveClub.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.exclusiveClub.networksTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.exclusiveClub.networksDescription')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.exclusiveClub.selectionTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.exclusiveClub.selectionDescription')}
                </p>
              </div>
              
              <div className={cn("p-6 rounded-lg mb-6 transition-colors duration-300", 
                readingMode === 'sepia' ? 'bg-amber-100/80' : 'bg-gray-50 dark:bg-gray-800')}>
                <h4 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.exclusiveClub.criteriaTitle')}
                </h4>
                <p className="mb-4">
                  {t('learnMore.content.exclusiveClub.criteriaDescription')}
                </p>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.exclusiveClub.criteria', { returnObjects: true }) as string[]).map((criterion: string, index: number) => (
                    <li key={index} className="text-sm">• {criterion}</li>
                  ))}
                </ul>
                <p className="font-medium">
                  {t('learnMore.content.exclusiveClub.conclusion')}
                </p>
              </div>
            </section>

            {/* The Transformation Teaser */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.transformationTeaser.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.transformationTeaser.whatChangesTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.transformationTeaser.whatChanges')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.transformationTeaser.methodTitle')}
                </h3>
                <p className="mb-4">
                  {t('learnMore.content.transformationTeaser.methodDescription')}
                </p>
                <p className="mb-4 font-medium">
                  {t('learnMore.content.transformationTeaser.whatWeCantell')}
                </p>
                <p className="mb-4">
                  {t('learnMore.content.transformationTeaser.methodology')}
                </p>
                <p className="mb-6 font-semibold">
                  {t('learnMore.content.transformationTeaser.results')}
                </p>
              </div>

              {/* Underground Network */}
              <div className={cn("p-6 rounded-lg mb-6 transition-colors duration-300", 
                readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
                <h4 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.transformationTeaser.undergroundTitle')}
                </h4>
                <p className="mb-4">
                  {t('learnMore.content.transformationTeaser.undergroundDescription')}
                </p>
                <div className="space-y-3 mb-4">
                  {(t('learnMore.content.transformationTeaser.testimonials', { returnObjects: true }) as string[]).map((testimonial: string, index: number) => (
                    <blockquote key={index} className="text-sm italic border-l-2 border-primary pl-4">
                      "{testimonial}"
                    </blockquote>
                  ))}
                </div>
                <p className="font-medium text-sm">
                  {t('learnMore.content.transformationTeaser.testimonialsNote')}
                </p>
              </div>
            </section>

            {/* The Hidden Architecture */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.hiddenArchitecture.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.hiddenArchitecture.discoveryTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.hiddenArchitecture.discoveryDescription')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.hiddenArchitecture.compoundTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.hiddenArchitecture.compoundDescription')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.hiddenArchitecture.aiWorkforceTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.hiddenArchitecture.aiWorkforceDescription')}
                </p>

                {/* AI Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {(t('learnMore.content.hiddenArchitecture.agents', { returnObjects: true }) as any[]).map((agent: any, index: number) => (
                    <div key={index} className={cn("p-6 rounded-lg transition-colors duration-300",
                      readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
                      <h4 className={cn("text-lg font-semibold mb-2 transition-colors duration-300",
                        readingMode === 'sepia' ? 'text-blue-800' : 'text-blue-700 dark:text-blue-300')}>
                        🤖 {agent.name}
                      </h4>
                      <p className="text-sm">
                        {agent.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-semibold text-center">
                  {t('learnMore.content.hiddenArchitecture.agentsConclusion')}
                </p>
              </div>
            </section>

            {/* Selection Criteria */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.selectionCriteria.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.selectionCriteria.whyNotEveryoneTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.selectionCriteria.whyNotEveryoneDescription')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.selectionCriteria.applicationTitle')}
                </h3>
                <p className="mb-4">
                  {t('learnMore.content.selectionCriteria.applicationDescription')}
                </p>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.selectionCriteria.applicationPoints', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                    <li key={index} className="text-sm">• {point}</li>
                  ))}
                </ul>
                <p className="font-medium">
                  {t('learnMore.content.selectionCriteria.applicationNote')}
                </p>
              </div>

              {/* Selected Timeline */}
              <div className={cn("p-6 rounded-lg mb-6 transition-colors duration-300", 
                readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20')}>
                <h4 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.selectionCriteria.selectedTitle')}
                </h4>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.selectionCriteria.selectedTimeline', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm">• {item}</li>
                  ))}
                </ul>
                <p className="font-semibold">
                  {t('learnMore.content.selectionCriteria.selectedResult')}
                </p>
              </div>
            </section>

            {/* Hidden Economics */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.hiddenEconomics.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.hiddenEconomics.roiTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.hiddenEconomics.roiDescription')}
                </p>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.hiddenEconomics.realValue', { returnObjects: true }) as string[]).map((value: string, index: number) => (
                    <li key={index} className="text-sm">• {value}</li>
                  ))}
                </ul>
                <p className="font-semibold">
                  {t('learnMore.content.hiddenEconomics.realValueConclusion')}
                </p>
              </div>

              <div className={cn("p-6 rounded-lg mb-6 transition-colors duration-300", 
                readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
                <h4 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.hiddenEconomics.compoundTitle')}
                </h4>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.hiddenEconomics.compoundTimeline', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm">• {item}</li>
                  ))}
                </ul>
                <p className="font-semibold">
                  {t('learnMore.content.hiddenEconomics.compoundConclusion')}
                </p>
              </div>
            </section>

            {/* The Secretive Vision */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.secretiveVision.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.secretiveVision.whereThisGoesTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.secretiveVision.whereThisGoesDescription')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.secretiveVision.networkEffectTitle')}
                </h3>
                <p className="mb-4">
                  {t('learnMore.content.secretiveVision.networkEffectDescription')}
                </p>
                <p className="font-semibold">
                  {t('learnMore.content.secretiveVision.networkEffectBenefit')}
                </p>
              </div>

              <div className={cn("p-6 rounded-lg mb-6 transition-colors duration-300", 
                readingMode === 'sepia' ? 'bg-orange-100/80' : 'bg-orange-50 dark:bg-orange-900/20')}>
                <h4 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.secretiveVision.windowTitle')}
                </h4>
                <p className="mb-4">
                  {t('learnMore.content.secretiveVision.windowDescription')}
                </p>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.secretiveVision.forces', { returnObjects: true }) as string[]).map((force: string, index: number) => (
                    <li key={index} className="text-sm">• {force}</li>
                  ))}
                </ul>
                <p className="font-semibold">
                  {t('learnMore.content.secretiveVision.windowConclusion')}
                </p>
              </div>
            </section>

            {/* The Invitation */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('learnMore.content.invitation.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.invitation.skepticalTitle')}
                </h3>
                <p className="mb-6">
                  {t('learnMore.content.invitation.skepticalDescription')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className={cn("p-4 rounded-lg transition-colors duration-300",
                    readingMode === 'sepia' ? 'bg-red-100/80' : 'bg-red-50 dark:bg-red-900/20')}>
                    <h4 className="font-semibold mb-2">{t('learnMore.content.invitation.notSayingTitle')}</h4>
                    <ul className="space-y-1">
                      {(t('learnMore.content.invitation.notSaying', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index} className="text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={cn("p-4 rounded-lg transition-colors duration-300",
                    readingMode === 'sepia' ? 'bg-green-100/80' : 'bg-green-50 dark:bg-green-900/20')}>
                    <h4 className="font-semibold mb-2">{t('learnMore.content.invitation.sayingTitle')}</h4>
                    <ul className="space-y-1">
                      {(t('learnMore.content.invitation.saying', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                        <li key={index} className="text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Evidence */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.invitation.evidenceTitle')}
                </h3>
                <p className="mb-4">
                  {t('learnMore.content.invitation.evidenceDescription')}
                </p>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.invitation.evidencePoints', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index} className="text-sm">• {item}</li>
                  ))}
                </ul>
                <p className="font-medium">
                  {t('learnMore.content.invitation.evidenceConclusion')}
                </p>
              </div>

              {/* The Choice */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.invitation.choiceTitle')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className={cn("p-4 rounded-lg transition-colors duration-300",
                    readingMode === 'sepia' ? 'bg-gray-100/80' : 'bg-gray-50 dark:bg-gray-800')}>
                    <h4 className="font-semibold mb-2">{t('learnMore.content.invitation.option1Title')}</h4>
                    <p className="text-sm mb-2">{t('learnMore.content.invitation.option1Description')}</p>
                    <p className="text-sm font-medium">{t('learnMore.content.invitation.option1Result')}</p>
                  </div>
                  
                  <div className={cn("p-4 rounded-lg transition-colors duration-300",
                    readingMode === 'sepia' ? 'bg-blue-100/80' : 'bg-blue-50 dark:bg-blue-900/20')}>
                    <h4 className="font-semibold mb-2">{t('learnMore.content.invitation.option2Title')}</h4>
                    <p className="text-sm mb-2">{t('learnMore.content.invitation.option2Description')}</p>
                    <p className="text-sm font-medium">{t('learnMore.content.invitation.option2Result')}</p>
                  </div>
                </div>
              </div>

              {/* Application */}
              <div className={cn("p-6 rounded-lg mb-8 transition-colors duration-300",
                readingMode === 'sepia' ? 'bg-purple-100/80' : 'bg-purple-50 dark:bg-purple-900/20')}>
                <h4 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.invitation.applicationTitle')}
                </h4>
                <p className="mb-4">
                  {t('learnMore.content.invitation.applicationDescription')}
                </p>
                <ul className="space-y-2 mb-4">
                  {(t('learnMore.content.invitation.applicationPoints', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                    <li key={index} className="text-sm">• {point}</li>
                  ))}
                </ul>
                <p className="font-medium">
                  {t('learnMore.content.invitation.applicationNote')}
                </p>
              </div>

              {/* Next Step */}
              <div className="text-center">
                <h4 className={cn("text-xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.invitation.nextStepTitle')}
                </h4>
                <p className="mb-6">
                  {t('learnMore.content.invitation.nextStepDescription')}
                </p>
              </div>
            </section>

            {/* Epilogue */}
            <section>
              <div className={cn("border-l-4 pl-6 py-4 rounded-r-lg transition-colors duration-300", theme.quote)}>
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('learnMore.content.epilogue.title')}
                </h3>
                <p className="mb-4">
                  {t('learnMore.content.epilogue.description')}
                </p>
                <p className="mb-4 font-medium">
                  {t('learnMore.content.epilogue.secretive')}
                </p>
                <p className="mb-4 font-semibold">
                  {t('learnMore.content.epilogue.question')}
                </p>
                <p className="font-bold">
                  {t('learnMore.content.epilogue.conclusion')}
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
            <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              {t('learnMore.cta.title')}
            </h3>
            <p className={cn("mb-6 transition-colors duration-300", theme.muted)}>
              {t('learnMore.cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                {t('learnMore.cta.buttons.scheduleDemo')}
              </button>
              <Link
                href="/go-to-market"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/90 transition-colors"
              >
                {t('learnMore.cta.buttons.calculateROI')}
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

export default function LearnMorePage() {
  return (
    <ContentPageLayout>
      <LearnMoreContent />
    </ContentPageLayout>
  );
}