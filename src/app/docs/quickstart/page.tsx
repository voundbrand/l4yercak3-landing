'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function QuickStartContent() {
  const theme = useDocsTheme();

  return (
    <article>
      {/* Breadcrumb */}
      <nav className={cn("flex items-center gap-2 text-sm mb-6", theme.muted)}>
        <Link href="/docs" className="hover:underline">Docs</Link>
        <span>/</span>
        <span className={theme.headings}>Quick Start</span>
      </nav>

      {/* Title Section */}
      <div className="mb-12">
        <h1 className={cn("font-serif text-4xl md:text-5xl italic mb-4", theme.headings)}>
          Quick Start Guide
        </h1>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          Get up and running with l4yercak3 in under 5 minutes.
        </p>
      </div>

      {/* Table of Contents */}
      <div className={cn("p-4 rounded-lg mb-8", theme.quote)}>
        <h3 className={cn("font-semibold mb-3", theme.headings)}>On this page</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#create-account" className="hover:underline">1. Create an Account</a></li>
          <li><a href="#start-conversation" className="hover:underline">2. Start the Onboarding Conversation</a></li>
          <li><a href="#share-stories" className="hover:underline">3. Share Your Business Stories</a></li>
          <li><a href="#deploy" className="hover:underline">4. Deploy on Any Channel</a></li>
          <li><a href="#next-steps" className="hover:underline">Next Steps</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className={cn("prose prose-lg max-w-none", theme.content)}>

        {/* Step 1 */}
        <section id="create-account" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            1. Create an Account
          </h2>
          <p className="mb-4">
            Visit <a href="https://app.l4yercak3.com" target="_blank" rel="noopener noreferrer" className="underline">app.l4yercak3.com</a> and sign up for a free account. No credit card required.
          </p>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <p className={theme.muted}>
              Sign up with your email or use social authentication (Google, GitHub). You&apos;ll be ready to deploy your first agent in minutes.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section id="start-conversation" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            2. Start the Onboarding Conversation
          </h2>
          <p className="mb-4">
            Open the onboarding agent. It asks about your business in natural language — what you do, how you handle customers, what the AI should never say.
          </p>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <p className={theme.muted}>
              No forms. No config screens. Just a conversation that builds your AI agent from the ground up.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section id="share-stories" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            3. Share Your Business Stories
          </h2>
          <p className="mb-4">
            The agent asks for real stories: &quot;Tell me about a time a customer was upset.&quot; &quot;What happens when someone asks for a price?&quot; Your answers become the agent&apos;s identity — not config fields.
          </p>
          <div className={cn("p-4 rounded-lg border-l-4 border-blue-500", theme.cta)}>
            <p className="font-semibold mb-2">Why stories?</p>
            <p className={theme.muted}>
              Stories capture how your business actually works — the tone, the boundaries, the exceptions. Templates can&apos;t do that.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section id="deploy" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            4. Deploy on Any Channel
          </h2>
          <p className="mb-4">
            Your agent goes live on WhatsApp, Telegram, or web. Your customers get instant responses 24/7. You focus on the work that actually needs you.
          </p>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <p className={theme.muted}>
              Deploy on one channel or all of them — the agent adapts to each one automatically.
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section id="next-steps" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Next Steps
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/docs/integrations/vercel"
              className={cn("p-4 rounded-lg border hover:shadow-lg transition-shadow", theme.quote)}
            >
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Vercel Integration →</h3>
              <p className={cn("text-sm", theme.muted)}>Learn more about deploying to Vercel</p>
            </Link>
            <Link
              href="/support"
              className={cn("p-4 rounded-lg border hover:shadow-lg transition-shadow", theme.quote)}
            >
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Get Help →</h3>
              <p className={cn("text-sm", theme.muted)}>Contact support or browse FAQs</p>
            </Link>
          </div>
        </section>

      </div>
    </article>
  );
}

export default function QuickStartPage() {
  return (
    <DocsLayout>
      <QuickStartContent />
    </DocsLayout>
  );
}
