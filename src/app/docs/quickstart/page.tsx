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
          <li><a href="#create-project" className="hover:underline">2. Create Your First Project</a></li>
          <li><a href="#connect-integration" className="hover:underline">3. Connect an Integration</a></li>
          <li><a href="#deploy" className="hover:underline">4. Deploy Your App</a></li>
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
            Visit <a href="https://app.l4yercak3.com" target="_blank" rel="noopener noreferrer" className="underline">app.l4yercak3.com</a> and sign up for a free account.
          </p>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <p className={theme.muted}>
              You can sign up with your email or use social authentication (Google, GitHub).
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section id="create-project" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            2. Create Your First Project
          </h2>
          <p className="mb-4">
            Once logged in, click &quot;New Project&quot; from the dashboard. Choose from:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Blank Project</strong> - Start from scratch</li>
            <li><strong>Template</strong> - Use a pre-built template</li>
            <li><strong>Import</strong> - Import an existing project from GitHub</li>
          </ul>
          <p>
            Give your project a name and description, then click &quot;Create&quot;.
          </p>
        </section>

        {/* Step 3 */}
        <section id="connect-integration" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            3. Connect an Integration
          </h2>
          <p className="mb-4">
            To deploy your app, you&apos;ll need to connect a deployment platform:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Go to <strong>Settings → Integrations</strong></li>
            <li>Click &quot;Connect&quot; next to your preferred platform (e.g., Vercel)</li>
            <li>Authorize the integration when prompted</li>
          </ol>
          <div className={cn("p-4 rounded-lg border-l-4 border-blue-500", theme.cta)}>
            <p className="font-semibold mb-2">Recommended</p>
            <p className={theme.muted}>
              We recommend starting with the <Link href="/docs/integrations/vercel" className="underline">Vercel integration</Link> for the smoothest deployment experience.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section id="deploy" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            4. Deploy Your App
          </h2>
          <p className="mb-4">
            With an integration connected, deploying is easy:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Open your project in l4yercak3</li>
            <li>Click the &quot;Deploy&quot; button in the top right</li>
            <li>Select your deployment target</li>
            <li>Click &quot;Deploy Now&quot;</li>
          </ol>
          <p>
            Your app will be live in seconds! You&apos;ll receive a URL where you can view your deployed application.
          </p>
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
