'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function GitHubDocsContent() {
  const theme = useDocsTheme();

  return (
    <article>
      {/* Breadcrumb */}
      <nav className={cn("flex items-center gap-2 text-sm mb-6", theme.muted)}>
        <Link href="/docs" className="hover:underline">Docs</Link>
        <span>/</span>
        <Link href="/docs" className="hover:underline">Integrations</Link>
        <span>/</span>
        <span className={theme.headings}>GitHub</span>
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
              GitHub Integration
            </h1>
            <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
              Coming Soon
            </span>
          </div>
        </div>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          Connect your GitHub repositories for seamless version control and collaboration.
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className={cn("p-6 rounded-xl border-2 border-dashed mb-12", theme.quote)}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h2 className={cn("text-2xl font-semibold mb-2", theme.headings)}>
            Coming Soon
          </h2>
          <p className={cn("max-w-md mx-auto", theme.muted)}>
            We&apos;re working hard to bring you GitHub integration. Sign up for our newsletter to be notified when it launches.
          </p>
        </div>
      </div>

      {/* Planned Features */}
      <section className="mb-12">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Planned Features
        </h2>
        <div className="grid gap-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Repository Import</h3>
            <p className={theme.muted}>
              Import existing repositories directly into l4yercak3 projects.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Automatic Sync</h3>
            <p className={theme.muted}>
              Keep your l4yercak3 projects in sync with GitHub repositories.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Pull Request Previews</h3>
            <p className={theme.muted}>
              Automatically deploy preview environments for pull requests.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Branch Deployments</h3>
            <p className={theme.muted}>
              Deploy specific branches to different environments.
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <div className={cn("rounded-xl p-6 border", theme.cta)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          Available Now
        </h3>
        <p className={cn("mb-4", theme.muted)}>
          While we work on GitHub integration, check out our Vercel integration:
        </p>
        <Link
          href="/docs/integrations/vercel"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
        >
          Vercel Integration
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
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
