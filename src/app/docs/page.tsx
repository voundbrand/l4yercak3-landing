'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function DocsContent() {
  const theme = useDocsTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="mb-12">
        <h1 className={cn("font-serif text-4xl md:text-5xl italic mb-4", theme.headings)}>
          Documentation
        </h1>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          Welcome to the l4yercak3 documentation. Learn how to use our platform, set up integrations, and deploy your web applications.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Link
          href="/docs/integrations/vercel"
          className={cn(
            "group p-6 rounded-xl border transition-all hover:shadow-lg",
            theme.quote
          )}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-black dark:bg-white">
              <svg className="w-6 h-6 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 22.525H0l12-21.05 12 21.05z"/>
              </svg>
            </div>
            <div>
              <h3 className={cn("font-semibold text-lg mb-1 group-hover:underline", theme.headings)}>
                Vercel Integration
              </h3>
              <p className={cn("text-sm", theme.muted)}>
                Deploy your web apps to Vercel with one click
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                New
              </span>
            </div>
          </div>
        </Link>

        <Link
          href="/docs/quickstart"
          className={cn(
            "group p-6 rounded-xl border transition-all hover:shadow-lg",
            theme.quote
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-lg", theme.cta)}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className={cn("font-semibold text-lg mb-1 group-hover:underline", theme.headings)}>
                Quick Start
              </h3>
              <p className={cn("text-sm", theme.muted)}>
                Get up and running in under 5 minutes
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/docs/integrations/github"
          className={cn(
            "group p-6 rounded-xl border transition-all hover:shadow-lg",
            theme.quote
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-lg", theme.cta)}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h3 className={cn("font-semibold text-lg mb-1 group-hover:underline", theme.headings)}>
                GitHub Integration
              </h3>
              <p className={cn("text-sm", theme.muted)}>
                Connect your repositories for seamless workflows
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                Coming Soon
              </span>
            </div>
          </div>
        </Link>

        <Link
          href="/support"
          className={cn(
            "group p-6 rounded-xl border transition-all hover:shadow-lg",
            theme.quote
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-lg", theme.cta)}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <h3 className={cn("font-semibold text-lg mb-1 group-hover:underline", theme.headings)}>
                Support
              </h3>
              <p className={cn("text-sm", theme.muted)}>
                Get help and find answers to common questions
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* About Section */}
      <section id="about" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          About l4yercak3
        </h2>
        <p className={cn("text-lg leading-relaxed", theme.content)}>
          l4yercak3 is an AI agent platform for agencies. Deploy AI employees for your clients — agents that learn the business through conversation, handle customer inquiries on any channel, and get smarter every week. Built for agencies and freelancers who want recurring revenue without recurring effort.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Key Features
        </h2>
        <div className="space-y-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Conversational Onboarding</h3>
            <p className={theme.muted}>Set up a client&apos;s AI agent through a conversation, not a form. Share stories about how the business works. The agent builds itself.</p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Multi-Channel Deployment</h3>
            <p className={theme.muted}>Deploy agents on WhatsApp, Telegram, web chat, or any channel your client&apos;s customers already use.</p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Graduated Autonomy</h3>
            <p className={theme.muted}>Agents start cautious and earn independence over time. You approve every change. They never go rogue.</p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>White-Label & CRM</h3>
            <p className={theme.muted}>Full platform with CRM, payments, booking, email, and white-label client portals under your brand.</p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Next Steps
        </h2>
        <div className={cn("p-6 rounded-xl border", theme.cta)}>
          <p className={cn("mb-4", theme.content)}>
            Ready to get started? Check out our quick start guide or connect your first integration.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
            >
              Quick Start Guide
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              href="/docs/integrations/vercel"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                theme.content
              )}
            >
              Vercel Integration
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

export default function DocsPage() {
  return (
    <DocsLayout>
      <DocsContent />
    </DocsLayout>
  );
}
