'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function MicrosoftDocsContent() {
  const theme = useDocsTheme();
  const { t } = useTranslation();

  return (
    <article>
      {/* Breadcrumb */}
      <nav className={cn("flex items-center gap-2 text-sm mb-6", theme.muted)}>
        <Link href="/docs" className="hover:underline">{t('docs.common.documentation')}</Link>
        <span>/</span>
        <Link href="/docs" className="hover:underline">{t('docs.nav.integrations')}</Link>
        <span>/</span>
        <span className={theme.headings}>{t('docs.nav.microsoft')}</span>
      </nav>

      {/* Title Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn("p-3 rounded-lg", theme.cta)}>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
            </svg>
          </div>
          <div>
            <h1 className={cn("font-serif text-4xl md:text-5xl italic", theme.headings)}>
              {t('docs.microsoft.title')}
            </h1>
            <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
              {t('docs.common.new')}
            </span>
          </div>
        </div>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          {t('docs.microsoft.subtitle')}
        </p>
      </div>

      {/* Table of Contents */}
      <div className={cn("p-4 rounded-lg mb-8", theme.quote)}>
        <h3 className={cn("font-semibold mb-3", theme.headings)}>{t('docs.common.onThisPage')}</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="hover:underline">{t('docs.microsoft.overview.title')}</a></li>
          <li><a href="#permissions" className="hover:underline">{t('docs.microsoft.permissions.title')}</a></li>
          <li><a href="#setup" className="hover:underline">{t('docs.microsoft.setup.title')}</a></li>
          <li><a href="#features" className="hover:underline">{t('docs.microsoft.features.title')}</a></li>
          <li><a href="#troubleshooting" className="hover:underline">{t('docs.microsoft.troubleshooting.title')}</a></li>
        </ul>
      </div>

      {/* Overview */}
      <section id="overview" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.microsoft.overview.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.microsoft.overview.content')}
        </p>
        <ul className={cn("list-disc pl-6 space-y-2", theme.content)}>
          {(t('docs.microsoft.overview.features', { returnObjects: true }) as string[]).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Required Permissions */}
      <section id="permissions" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.microsoft.permissions.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.microsoft.permissions.intro')}
        </p>
        <div className={cn("overflow-x-auto rounded-lg border", theme.quote)}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>
                  {t('docs.microsoft.permissions.table.headers.permission')}
                </th>
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>
                  {t('docs.microsoft.permissions.table.headers.description')}
                </th>
              </tr>
            </thead>
            <tbody>
              {(t('docs.microsoft.permissions.table.rows', { returnObjects: true }) as Array<{permission: string, description: string}>).map((row, index, arr) => (
                <tr key={index} className={index < arr.length - 1 ? "border-b" : ""}>
                  <td className={cn("px-4 py-3", theme.content)}>{row.permission}</td>
                  <td className={cn("px-4 py-3", theme.muted)}>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={cn("mt-4 text-sm", theme.muted)}>
          {t('docs.microsoft.permissions.appId')}: <code className="px-2 py-1 rounded bg-black/10 dark:bg-white/10">2dea334b-f0cf-4c18-bd97-a178104e84be</code>
        </p>
      </section>

      {/* Setting Up */}
      <section id="setup" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.microsoft.setup.title')}
        </h2>
        <ol className={cn("list-decimal pl-6 space-y-3", theme.content)}>
          {(t('docs.microsoft.setup.steps', { returnObjects: true }) as string[]).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className={cn("p-4 rounded-lg border-l-4 border-blue-500 mt-6", theme.cta)}>
          <p className="font-semibold mb-2">{t('docs.microsoft.setup.enterpriseTip.title')}</p>
          <p className={theme.muted}>
            {t('docs.microsoft.setup.enterpriseTip.content')}
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.microsoft.features.title')}
        </h2>
        <div className="grid gap-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.features.items.signIn.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.features.items.signIn.description')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.features.items.oneDrive.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.features.items.oneDrive.description')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.features.items.sharePoint.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.features.items.sharePoint.description')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.features.items.azure.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.features.items.azure.description')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.features.items.sso.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.features.items.sso.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.microsoft.troubleshooting.title')}
        </h2>
        <div className="space-y-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.troubleshooting.issues.adminConsent.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.troubleshooting.issues.adminConsent.content')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.troubleshooting.issues.signInFailed.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.troubleshooting.issues.signInFailed.content')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.troubleshooting.issues.permissionDenied.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.troubleshooting.issues.permissionDenied.content')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.microsoft.troubleshooting.issues.filesNotSyncing.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.microsoft.troubleshooting.issues.filesNotSyncing.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <div className={cn("rounded-xl p-6 border", theme.cta)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          {t('docs.microsoft.relatedIntegrations.title')}
        </h3>
        <p className={cn("mb-4", theme.muted)}>
          {t('docs.microsoft.relatedIntegrations.content')}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/integrations/vercel"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            {t('docs.nav.vercel')} Integration
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="/docs/integrations/github"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            {t('docs.nav.github')} Integration
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="/support"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
              theme.content
            )}
          >
            {t('docs.nav.helpCenter')}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function MicrosoftDocsPage() {
  return (
    <DocsLayout>
      <MicrosoftDocsContent />
    </DocsLayout>
  );
}
