'use client';

import { useState } from 'react';
import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const APP_BASE = 'https://app.l4yercak3.com';

const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface TierFeature {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  agency: string | boolean;
}

function PricingContent() {
  const theme = useContentTheme();
  const { t } = useTranslation();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const isAnnual = billingPeriod === 'annual';

  const tiers = [
    {
      name: t('pricing.tiers.free.name'),
      price: t('pricing.tiers.free.price'),
      period: '',
      description: t('pricing.tiers.free.description'),
      cta: t('pricing.tiers.free.cta'),
      href: `${APP_BASE}/?plan=free`,
      highlighted: false,
    },
    {
      name: t('pricing.tiers.pro.name'),
      price: isAnnual ? '€290' : '€29',
      period: isAnnual ? t('pricing.billing.perYear') : t('pricing.billing.perMonth'),
      description: t('pricing.tiers.pro.description'),
      cta: t('pricing.tiers.pro.cta'),
      href: `${APP_BASE}/?plan=pro&billing=${billingPeriod}`,
      highlighted: true,
      badge: t('pricing.tiers.pro.badge'),
    },
    {
      name: t('pricing.tiers.agency.name'),
      price: isAnnual ? '€2,990' : '€299',
      period: isAnnual ? t('pricing.billing.perYear') : t('pricing.billing.perMonth'),
      description: t('pricing.tiers.agency.description'),
      cta: t('pricing.tiers.agency.cta'),
      href: `${APP_BASE}/?plan=agency&billing=${billingPeriod}`,
      highlighted: false,
    },
  ];

  const features: TierFeature[] = [
    { label: t('pricing.features.credits'), free: t('pricing.features.creditsFree'), pro: t('pricing.features.creditsPro'), agency: t('pricing.features.creditsAgency') },
    { label: t('pricing.features.aiChat'), free: t('pricing.features.aiChatFree'), pro: t('pricing.features.aiChatPro'), agency: t('pricing.features.aiChatAgency') },
    { label: t('pricing.features.aiPrivacy'), free: t('pricing.features.aiPrivacyFree'), pro: t('pricing.features.aiPrivacyPro'), agency: t('pricing.features.aiPrivacyAgency') },
    { label: t('pricing.features.workflows'), free: '3', pro: '25', agency: t('pricing.features.unlimited') },
    { label: t('pricing.features.crmContacts'), free: '100', pro: '5,000', agency: t('pricing.features.unlimited') },
    { label: t('pricing.features.events'), free: '2', pro: '25', agency: t('pricing.features.unlimited') },
    { label: t('pricing.features.forms'), free: '5', pro: '50', agency: t('pricing.features.unlimited') },
    { label: t('pricing.features.products'), free: '10', pro: '100', agency: t('pricing.features.unlimited') },
    { label: t('pricing.features.bookings'), free: '5', pro: '50', agency: t('pricing.features.unlimited') },
    { label: t('pricing.features.teamMembers'), free: '1', pro: '5', agency: '25' },
    { label: t('pricing.features.customDomain'), free: false, pro: true, agency: true },
    { label: t('pricing.features.apiAccess'), free: false, pro: true, agency: true },
    { label: t('pricing.features.webhooks'), free: false, pro: t('pricing.features.webhooksPro'), agency: t('pricing.features.webhooksAgency') },
    { label: t('pricing.features.whiteLabel'), free: false, pro: false, agency: true },
    { label: t('pricing.features.support'), free: t('pricing.features.supportFree'), pro: t('pricing.features.supportPro'), agency: t('pricing.features.supportAgency') },
  ];

  const creditPacks = [
    { credits: 100, price: '€19', perCredit: '€0.19', savings: '' },
    { credits: 500, price: '€79', perCredit: '€0.158', savings: '17%' },
    { credits: 2000, price: '€249', perCredit: '€0.125', savings: '34%' },
    { credits: 10000, price: '€999', perCredit: '€0.100', savings: '47%' },
  ];

  const faqs = [
    { q: t('pricing.faq.switch.q'), a: t('pricing.faq.switch.a') },
    { q: t('pricing.faq.runOut.q'), a: t('pricing.faq.runOut.a') },
    { q: t('pricing.faq.freeTrial.q'), a: t('pricing.faq.freeTrial.a') },
    { q: t('pricing.faq.payment.q'), a: t('pricing.faq.payment.a') },
    { q: t('pricing.faq.cancel.q'), a: t('pricing.faq.cancel.a') },
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (value === true) return <CheckIcon className="size-4 mx-auto text-green-400" />;
    if (value === false) return <XIcon className="size-4 mx-auto opacity-30" />;
    return <span className="text-sm">{value}</span>;
  };

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          {t('pricing.title')}
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          {t('pricing.subtitle')}
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <button
          onClick={() => setBillingPeriod('monthly')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
            !isAnnual
              ? theme === (theme as any) && "bg-foreground/20 text-foreground"
              : "text-foreground/60 hover:text-foreground/80"
          )}
        >
          {t('pricing.billing.monthly')}
        </button>
        <button
          onClick={() => setBillingPeriod('annual')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2",
            isAnnual
              ? "bg-foreground/20 text-foreground"
              : "text-foreground/60 hover:text-foreground/80"
          )}
        >
          {t('pricing.billing.annual')}
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
            {t('pricing.billing.save17')}
          </span>
        </button>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative rounded-2xl p-6 transition-all duration-300 flex flex-col",
              tier.highlighted
                ? "border-2 border-foreground/30 bg-foreground/10 md:scale-105 md:-my-2 shadow-lg"
                : cn("border transition-colors duration-300", theme.cta)
            )}
          >
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-foreground text-background">
                {tier.badge}
              </div>
            )}
            <div className="mb-6">
              <h3 className={cn("font-serif text-xl italic mb-2 transition-colors duration-300", theme.headings)}>
                {tier.name}
              </h3>
              <p className={cn("text-sm mb-4 transition-colors duration-300", theme.muted)}>
                {tier.description}
              </p>
              <div className="flex items-baseline gap-1">
                <span className={cn("text-3xl font-bold transition-colors duration-300", theme.headings)}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className={cn("text-sm transition-colors duration-300", theme.muted)}>
                    {tier.period}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-auto">
              <Button asChild className="w-full" shine={tier.highlighted}>
                <a href={tier.href}>{tier.cta}</a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mb-16 max-w-5xl mx-auto">
        <h2 className={cn("font-serif text-2xl md:text-3xl italic mb-8 text-center transition-colors duration-300", theme.headings)}>
          {t('pricing.comparison.title')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={cn("border-b border-foreground/10")}>
                <th className={cn("py-3 pr-4 text-sm font-semibold transition-colors duration-300", theme.muted)}>{t('pricing.comparison.feature')}</th>
                <th className={cn("py-3 px-4 text-sm font-semibold text-center transition-colors duration-300", theme.muted)}>{t('pricing.tiers.free.name')}</th>
                <th className={cn("py-3 px-4 text-sm font-semibold text-center transition-colors duration-300", theme.headings)}>{t('pricing.tiers.pro.name')}</th>
                <th className={cn("py-3 pl-4 text-sm font-semibold text-center transition-colors duration-300", theme.muted)}>{t('pricing.tiers.agency.name')}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-foreground/5">
                  <td className={cn("py-3 pr-4 text-sm transition-colors duration-300", theme.content)}>{feature.label}</td>
                  <td className="py-3 px-4 text-center">{renderFeatureValue(feature.free)}</td>
                  <td className={cn("py-3 px-4 text-center bg-foreground/5")}>{renderFeatureValue(feature.pro)}</td>
                  <td className="py-3 pl-4 text-center">{renderFeatureValue(feature.agency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise Banner */}
      <div className={cn("rounded-2xl p-8 text-center mb-16 max-w-5xl mx-auto transition-colors duration-300", theme.cta)}>
        <h3 className={cn("font-serif text-2xl italic mb-3 transition-colors duration-300", theme.headings)}>
          {t('pricing.enterprise.title')}
        </h3>
        <p className={cn("text-sm mb-6 max-w-xl mx-auto transition-colors duration-300", theme.muted)}>
          {t('pricing.enterprise.description')}
        </p>
        <Button asChild>
          <a href="mailto:hello@l4yercak3.com">{t('pricing.enterprise.cta')}</a>
        </Button>
      </div>

      {/* Credit Packs */}
      <div className="mb-16 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={cn("font-serif text-2xl md:text-3xl italic mb-3 transition-colors duration-300", theme.headings)}>
            {t('pricing.credits.title')}
          </h2>
          <p className={cn("text-sm transition-colors duration-300", theme.muted)}>
            {t('pricing.credits.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditPacks.map((pack) => (
            <div key={pack.credits} className={cn("rounded-2xl p-6 border transition-colors duration-300 flex flex-col", theme.cta)}>
              <div className="mb-4">
                <div className={cn("text-lg font-semibold transition-colors duration-300", theme.headings)}>
                  {pack.credits.toLocaleString()} {t('pricing.credits.credits')}
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={cn("text-2xl font-bold transition-colors duration-300", theme.headings)}>{pack.price}</span>
                  {pack.savings && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                      {pack.savings} off
                    </span>
                  )}
                </div>
                <div className={cn("text-xs mt-1 transition-colors duration-300", theme.muted)}>
                  {pack.perCredit} {t('pricing.credits.perCredit')}
                </div>
              </div>
              <div className="mt-auto">
                <Button asChild size="sm" className="w-full">
                  <a href={`${APP_BASE}/?buyCredits=${pack.credits}`}>{t('pricing.credits.buy')}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className={cn("text-xs text-center mt-4 transition-colors duration-300", theme.muted)}>
          {t('pricing.credits.note')}
        </p>
      </div>

      {/* FAQ */}
      <div className="mb-16 max-w-3xl mx-auto">
        <h2 className={cn("font-serif text-2xl md:text-3xl italic mb-8 text-center transition-colors duration-300", theme.headings)}>
          {t('pricing.faq.title')}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className={cn("rounded-2xl p-6 border transition-colors duration-300", theme.cta)}>
              <h3 className={cn("font-semibold mb-2 transition-colors duration-300", theme.headings)}>
                {faq.q}
              </h3>
              <p className={cn("text-sm transition-colors duration-300", theme.content)}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function PricingPage() {
  return (
    <ContentPageLayout>
      <PricingContent />
    </ContentPageLayout>
  );
}
