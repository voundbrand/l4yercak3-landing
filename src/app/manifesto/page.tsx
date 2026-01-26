'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { CommunityButton } from '@/components/community-button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

function ManifestoContent() {
  const theme = useContentTheme();
  const { t } = useTranslation();

  return (
    <article>
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
            {t('manifesto.title')}
          </h1>
          <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
            {t('manifesto.subtitle')}
          </p>
          <div className={cn("mt-8 text-sm transition-colors duration-300", theme.muted)}>
            <time>{t('manifesto.publishedOn')} {new Date('2025-01-26').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</time>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className={cn("text-xl leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

            {/* Point Solution Era */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.pointSolutionEra.title')}
              </h2>
              <div className="whitespace-pre-line">
                {t('manifesto.sections.pointSolutionEra.content')}
              </div>
            </section>

            {/* What We Believe */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.whatWeBelieve.title')}
              </h2>

              {/* Systems Thinking */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('manifesto.sections.whatWeBelieve.systemsThinking.title')}
                </h3>
                <div className="whitespace-pre-line">
                  {t('manifesto.sections.whatWeBelieve.systemsThinking.content')}
                </div>
              </div>

              {/* Humans + AI */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('manifesto.sections.whatWeBelieve.humansAI.title')}
                </h3>
                <div className="whitespace-pre-line">
                  {t('manifesto.sections.whatWeBelieve.humansAI.content')}
                </div>
              </div>

              {/* Expansion Over Acquisition */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('manifesto.sections.whatWeBelieve.expansionOverAcquisition.title')}
                </h3>
                <div className="whitespace-pre-line">
                  {t('manifesto.sections.whatWeBelieve.expansionOverAcquisition.content')}
                </div>
              </div>

              {/* Privacy as Right */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('manifesto.sections.whatWeBelieve.privacyAsRight.title')}
                </h3>
                <div className="whitespace-pre-line">
                  {t('manifesto.sections.whatWeBelieve.privacyAsRight.content')}
                </div>
              </div>

              {/* Compound Learning */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('manifesto.sections.whatWeBelieve.compoundLearning.title')}
                </h3>
                <div className="whitespace-pre-line">
                  {t('manifesto.sections.whatWeBelieve.compoundLearning.content')}
                </div>
              </div>

              {/* Invisible Integration */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('manifesto.sections.whatWeBelieve.invisibleIntegration.title')}
                </h3>
                <div className="whitespace-pre-line">
                  {t('manifesto.sections.whatWeBelieve.invisibleIntegration.content')}
                </div>
              </div>

              {/* Compound Platforms */}
              <div className="mb-8">
                <h3 className={cn("text-2xl font-semibold mb-4 transition-colors duration-300", theme.headings)}>
                  {t('manifesto.sections.whatWeBelieve.compoundPlatforms.title')}
                </h3>
                <div className="whitespace-pre-line">
                  {t('manifesto.sections.whatWeBelieve.compoundPlatforms.content')}
                </div>
              </div>
            </section>

            {/* What We Reject */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.whatWeReject.title')}
              </h2>
              <div className="space-y-6">
                {(t('manifesto.sections.whatWeReject.items', { returnObjects: true }) as any[]).map((item: any, index: number) => (
                  <div key={index}>
                    <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                      {item.title}
                    </h3>
                    <div className="whitespace-pre-line">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Now */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.whyNow.title')}
              </h2>
              <p className="mb-6">{t('manifesto.sections.whyNow.subtitle')}</p>
              <div className="space-y-6">
                {(t('manifesto.sections.whyNow.forces', { returnObjects: true }) as any[]).map((force: any, index: number) => (
                  <div key={index}>
                    <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                      {force.title}
                    </h3>
                    <div className="whitespace-pre-line">
                      {force.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* The Stakes */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.theStakes.title')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {t('manifesto.sections.theStakes.ifRight.title')}
                  </h3>
                  <div className="whitespace-pre-line">
                    {t('manifesto.sections.theStakes.ifRight.content')}
                  </div>
                </div>
                <div>
                  <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {t('manifesto.sections.theStakes.ifWrong.title')}
                  </h3>
                  <div className="whitespace-pre-line">
                    {t('manifesto.sections.theStakes.ifWrong.content')}
                  </div>
                </div>
              </div>
            </section>

            {/* The Movement */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.theMovement.title')}
              </h2>
              <div className="whitespace-pre-line">
                {t('manifesto.sections.theMovement.content')}
              </div>
            </section>

            {/* The Invitation */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.theInvitation.title')}
              </h2>
              <div className="whitespace-pre-line">
                {t('manifesto.sections.theInvitation.content')}
              </div>
            </section>

            {/* Our Commitment */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.ourCommitment.title')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {t('manifesto.sections.ourCommitment.toCustomers.title')}
                  </h3>
                  <div className="whitespace-pre-line">
                    {t('manifesto.sections.ourCommitment.toCustomers.content')}
                  </div>
                </div>
                <div>
                  <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {t('manifesto.sections.ourCommitment.toTeam.title')}
                  </h3>
                  <div className="whitespace-pre-line">
                    {t('manifesto.sections.ourCommitment.toTeam.content')}
                  </div>
                </div>
                <div>
                  <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {t('manifesto.sections.ourCommitment.toIndustry.title')}
                  </h3>
                  <div className="whitespace-pre-line">
                    {t('manifesto.sections.ourCommitment.toIndustry.content')}
                  </div>
                </div>
                <div>
                  <h3 className={cn("text-xl font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                    {t('manifesto.sections.ourCommitment.toOurselves.title')}
                  </h3>
                  <div className="whitespace-pre-line">
                    {t('manifesto.sections.ourCommitment.toOurselves.content')}
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Line */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.bottomLine.title')}
              </h2>
              <div className="whitespace-pre-line">
                {t('manifesto.sections.bottomLine.content')}
              </div>
            </section>

            {/* Join Us */}
            <section>
              <h2 className={cn("font-serif text-3xl italic mb-6 transition-colors duration-300", theme.headings)}>
                {t('manifesto.sections.joinUs.title')}
              </h2>
              <div className="whitespace-pre-line">
                {t('manifesto.sections.joinUs.content')}
              </div>
            </section>

            {/* Signature */}
            <section className="text-center">
              <div className="whitespace-pre-line italic mb-8">
                {t('manifesto.sections.signature.content')}
              </div>
              <CommunityButton />
            </section>
          </div>
        </div>
      </article>
  );
}

export default function ManifestoPage() {
  return (
    <ContentPageLayout>
      <ManifestoContent />
    </ContentPageLayout>
  );
}
