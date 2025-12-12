'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function GitHubDocsContent() {
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
        <span className={theme.headings}>{t('docs.nav.github')}</span>
      </nav>

      {/* Title Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn("p-3 rounded-lg", theme.cta)}>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div>
            <h1 className={cn("font-serif text-4xl md:text-5xl italic", theme.headings)}>
              {t('docs.github.title')}
            </h1>
            <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
              {t('docs.common.new')}
            </span>
          </div>
        </div>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          {t('docs.github.subtitle')}
        </p>
      </div>

      {/* Table of Contents */}
      <div className={cn("p-4 rounded-lg mb-8", theme.quote)}>
        <h3 className={cn("font-semibold mb-3", theme.headings)}>{t('docs.common.onThisPage')}</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="hover:underline">{t('docs.github.overview.title')}</a></li>
          <li><a href="#permissions" className="hover:underline">{t('docs.github.permissions.title')}</a></li>
          <li><a href="#setup" className="hover:underline">{t('docs.github.setup.title')}</a></li>
          <li><a href="#features" className="hover:underline">{t('docs.github.features.title')}</a></li>
          <li><a href="#troubleshooting" className="hover:underline">{t('docs.github.troubleshooting.title')}</a></li>
        </ul>
      </div>

      {/* Overview */}
      <section id="overview" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.github.overview.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.github.overview.content')}
        </p>
        <ul className={cn("list-disc pl-6 space-y-2", theme.content)}>
          {(t('docs.github.overview.features', { returnObjects: true }) as string[]).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      {/* Required Permissions */}
      <section id="permissions" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.github.permissions.title')}
        </h2>
        <p className={cn("mb-4", theme.content)}>
          {t('docs.github.permissions.intro')}
        </p>
        <div className={cn("overflow-x-auto rounded-lg border", theme.quote)}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>
                  {t('docs.github.permissions.table.headers.permission')}
                </th>
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>
                  {t('docs.github.permissions.table.headers.description')}
                </th>
              </tr>
            </thead>
            <tbody>
              {(t('docs.github.permissions.table.rows', { returnObjects: true }) as Array<{permission: string, description: string}>).map((row, index, arr) => (
                <tr key={index} className={index < arr.length - 1 ? "border-b" : ""}>
                  <td className={cn("px-4 py-3", theme.content)}>{row.permission}</td>
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
          {t('docs.github.setup.title')}
        </h2>
        <ol className={cn("list-decimal pl-6 space-y-3", theme.content)}>
          {(t('docs.github.setup.steps', { returnObjects: true }) as string[]).map((step, index) => (
            <li key={index} dangerouslySetInnerHTML={{
              __html: step
                .replace('l4yercak3 GitHub App', '<a href="https://github.com/apps/l4yercak3-platform" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80">l4yercak3 GitHub App</a>')
            }} />
          ))}
        </ol>
        <div className={cn("p-4 rounded-lg border-l-4 border-blue-500 mt-6", theme.cta)}>
          <p className="font-semibold mb-2">Tip</p>
          <p className={theme.muted}>
            {t('docs.github.setup.tip')?.toString().includes('github.com') ? (
              <span dangerouslySetInnerHTML={{
                __html: t('docs.github.setup.tip').replace(
                  'github.com/apps/l4yercak3-platform',
                  '<a href="https://github.com/apps/l4yercak3-platform" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80">github.com/apps/l4yercak3-platform</a>'
                )
              }} />
            ) : t('docs.github.setup.tip')}
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.github.features.title')}
        </h2>
        <div className="grid gap-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.github.features.items.autoRepo.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.github.features.items.autoRepo.description')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.github.features.items.codeSync.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.github.features.items.codeSync.description')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.github.features.items.vercelIntegration.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.github.features.items.vercelIntegration.description')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>
              {t('docs.github.features.items.repoManagement.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.github.features.items.repoManagement.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          {t('docs.github.troubleshooting.title')}
        </h2>
        <div className="space-y-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.github.troubleshooting.issues.authFailed.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.github.troubleshooting.issues.authFailed.content')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.github.troubleshooting.issues.notSyncing.title')}
            </h3>
            <p className={theme.muted}>
              {t('docs.github.troubleshooting.issues.notSyncing.content')}
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              {t('docs.github.troubleshooting.issues.permissionDenied.title')}
            </h3>
            <p className={theme.muted}>
              <span dangerouslySetInnerHTML={{
                __html: t('docs.github.troubleshooting.issues.permissionDenied.content').replace(
                  'github.com/apps/l4yercak3-platform',
                  '<a href="https://github.com/apps/l4yercak3-platform" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80">github.com/apps/l4yercak3-platform</a>'
                )
              }} />
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <div className={cn("rounded-xl p-6 border", theme.cta)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          {t('docs.github.relatedIntegrations.title')}
        </h3>
        <p className={cn("mb-4", theme.muted)}>
          {t('docs.github.relatedIntegrations.content')}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/integrations/vercel"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            {t('docs.nav.vercel')} {t('docs.nav.integrations').toLowerCase().includes('integration') ? '' : 'Integration'}
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

export default function GitHubDocsPage() {
  return (
    <DocsLayout>
      <GitHubDocsContent />
    </DocsLayout>
  );
}
