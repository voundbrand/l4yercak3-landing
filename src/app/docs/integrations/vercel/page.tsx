'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function VercelDocsContent() {
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
        <span className={theme.headings}>{t('docs.nav.vercel')}</span>
      </nav>

      {/* Title Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-black dark:bg-white">
            <svg className="w-8 h-8 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 22.525H0l12-21.05 12 21.05z"/>
            </svg>
          </div>
          <div>
            <h1 className={cn("font-serif text-4xl md:text-5xl italic", theme.headings)}>
              {t('docs.vercel.title')}
            </h1>
            <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
              {t('docs.common.new')}
            </span>
          </div>
        </div>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          {t('docs.vercel.subtitle')}
        </p>
      </div>

      {/* Table of Contents */}
      <div className={cn("p-4 rounded-lg mb-8", theme.quote)}>
        <h3 className={cn("font-semibold mb-3", theme.headings)}>{t('docs.common.onThisPage')}</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="hover:underline">{t('docs.vercel.overview.title')}</a></li>
          <li><a href="#permissions" className="hover:underline">{t('docs.vercel.permissions.title')}</a></li>
          <li><a href="#setup" className="hover:underline">{t('docs.vercel.setup.title')}</a></li>
          <li><a href="#deployment" className="hover:underline">{t('docs.vercel.deployment.title')}</a></li>
          <li><a href="#env-vars" className="hover:underline">{t('docs.vercel.envVars.title')}</a></li>
          <li><a href="#troubleshooting" className="hover:underline">{t('docs.vercel.troubleshooting.title')}</a></li>
        </ul>
      </div>

      {/* Overview */}
      <section id="overview" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.vercel.overview.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.vercel.overview.content')}
        </p>
        <ul className={cn("list-disc pl-6 space-y-2", theme.content)}>
          {(t('docs.vercel.overview.features', { returnObjects: true }) as string[]).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Required Permissions */}
      <section id="permissions" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.vercel.permissions.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.vercel.permissions.intro')}
        </p>
        <div className={cn("overflow-x-auto rounded-lg border", theme.quote)}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>
                  {t('docs.vercel.permissions.table.headers.permission')}
                </th>
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>
                  {t('docs.vercel.permissions.table.headers.description')}
                </th>
              </tr>
            </thead>
            <tbody>
              {(t('docs.vercel.permissions.table.rows', { returnObjects: true }) as Array<{permission: string, description: string}>).map((row, index, arr) => (
                <tr key={index} className={index < arr.length - 1 ? "border-b" : ""}>
                  <td className={cn("px-4 py-3", theme.content)}><code className="text-sm">{row.permission}</code></td>
                  <td className={cn("px-4 py-3", theme.muted)}>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Setting Up */}
      <section id="setup" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.vercel.setup.title')}
        </h2>
        <ol className={cn("list-decimal pl-6 space-y-3", theme.content)}>
          {(t('docs.vercel.setup.steps', { returnObjects: true }) as string[]).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Deploying a Project */}
      <section id="deployment" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.vercel.deployment.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.vercel.deployment.content')}
        </p>
        <ol className={cn("list-decimal pl-6 space-y-3", theme.content)}>
          {(t('docs.vercel.deployment.steps', { returnObjects: true }) as string[]).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Environment Variables */}
      <section id="env-vars" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.vercel.envVars.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.vercel.envVars.content')}
        </p>
        <ul className={cn("list-disc pl-6 space-y-2", theme.content)}>
          {(t('docs.vercel.envVars.features', { returnObjects: true }) as string[]).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.vercel.troubleshooting.title')}
        </h2>
        <div className="space-y-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.vercel.troubleshooting.issues.deployment.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.vercel.troubleshooting.issues.deployment.content')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.vercel.troubleshooting.issues.permissions.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.vercel.troubleshooting.issues.permissions.content')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.vercel.troubleshooting.issues.notSyncing.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.vercel.troubleshooting.issues.notSyncing.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Support */}
      <div className={cn("rounded-xl p-6 border", theme.cta)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          {t('docs.vercel.support.title')}
        </h3>
        <p className={cn("mb-4", theme.muted)}>
          {t('docs.vercel.support.content')}
        </p>
        <div className="flex flex-wrap gap-4">
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

      {/* Legal Links */}
      <div className={cn("rounded-xl p-6 mt-4 border", theme.quote)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          {t('docs.nav.legal')}
        </h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="underline hover:opacity-80">
            {t('docs.nav.privacyPolicy')}
          </Link>
          <Link href="/terms" className="underline hover:opacity-80">
            {t('docs.nav.termsOfService')}
          </Link>
          <Link href="/eula" className="underline hover:opacity-80">
            {t('docs.nav.eula')}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function VercelDocsPage() {
  return (
    <DocsLayout>
      <VercelDocsContent />
    </DocsLayout>
  );
}
