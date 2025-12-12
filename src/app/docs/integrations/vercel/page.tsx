'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function VercelDocsContent() {
  const theme = useDocsTheme();

  return (
    <article>
      {/* Breadcrumb */}
      <nav className={cn("flex items-center gap-2 text-sm mb-6", theme.muted)}>
        <Link href="/docs" className="hover:underline">Docs</Link>
        <span>/</span>
        <Link href="/docs" className="hover:underline">Integrations</Link>
        <span>/</span>
        <span className={theme.headings}>Vercel</span>
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
              Vercel Integration
            </h1>
            <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
              New
            </span>
          </div>
        </div>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          Deploy web apps from l4yercak3 to Vercel with one click. Manage projects, configure environments, and monitor deployments.
        </p>
      </div>

      {/* Table of Contents */}
      <div className={cn("p-4 rounded-lg mb-8", theme.quote)}>
        <h3 className={cn("font-semibold mb-3", theme.headings)}>On this page</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="hover:underline">Overview</a></li>
          <li><a href="#getting-started" className="hover:underline">Getting Started</a></li>
          <li><a href="#permissions" className="hover:underline">Permissions</a></li>
          <li><a href="#features" className="hover:underline">Features</a></li>
          <li><a href="#environment-variables" className="hover:underline">Environment Variables</a></li>
          <li><a href="#troubleshooting" className="hover:underline">Troubleshooting</a></li>
          <li><a href="#privacy" className="hover:underline">Data & Privacy</a></li>
          <li><a href="#disconnecting" className="hover:underline">Disconnecting</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className={cn("prose prose-lg max-w-none", theme.content)}>

        {/* Overview */}
        <section id="overview" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Overview
          </h2>
          <p className="mb-4">
            The l4yercak3 Vercel integration allows you to deploy your web applications directly to Vercel from within the l4yercak3 platform. This integration provides:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Deploy published web apps directly to Vercel</li>
            <li>Configure environment variables automatically</li>
            <li>Monitor deployment status in real-time</li>
            <li>Manage multiple projects across teams</li>
            <li>Access deployment logs and analytics</li>
          </ul>
        </section>

        {/* Getting Started */}
        <section id="getting-started" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Getting Started
          </h2>

          <h3 className={cn("text-xl font-semibold mb-3 mt-6", theme.headings)}>
            Step 1: Connect Your Account
          </h3>
          <p className="mb-4">
            Navigate to <strong>Settings → Integrations</strong> in your l4yercak3 dashboard and click &quot;Connect Vercel&quot;.
          </p>

          <h3 className={cn("text-xl font-semibold mb-3 mt-6", theme.headings)}>
            Step 2: Authorize Access
          </h3>
          <p className="mb-4">
            You&apos;ll be redirected to Vercel to authorize the integration. Review the requested permissions and click &quot;Authorize&quot;.
          </p>

          <h3 className={cn("text-xl font-semibold mb-3 mt-6", theme.headings)}>
            Step 3: Select Projects
          </h3>
          <p className="mb-4">
            Choose which Vercel projects you want to manage from l4yercak3, or create new ones directly from the platform.
          </p>

          <h3 className={cn("text-xl font-semibold mb-3 mt-6", theme.headings)}>
            Step 4: Deploy
          </h3>
          <p className="mb-4">
            Use the one-click deploy button on any published web app to push it to Vercel. Your app will be live in seconds.
          </p>

          <div className={cn("p-4 rounded-lg mt-6 border-l-4 border-blue-500", theme.cta)}>
            <p className="font-semibold mb-2">Pro Tip</p>
            <p className={theme.muted}>
              Enable automatic deployments to push changes to Vercel whenever you update your app in l4yercak3.
            </p>
          </div>
        </section>

        {/* Permissions */}
        <section id="permissions" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Permissions
          </h2>
          <p className="mb-4">
            When you connect your Vercel account, we request the following permissions:
          </p>

          <div className={cn("rounded-lg overflow-hidden border", theme.quote)}>
            <table className="w-full">
              <thead className={cn("border-b", theme.cta)}>
                <tr>
                  <th className="text-left p-4 font-semibold">Scope</th>
                  <th className="text-left p-4 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-inherit">
                  <td className="p-4"><code className="text-sm">deployments:write</code></td>
                  <td className={cn("p-4", theme.muted)}>Create and manage deployments</td>
                </tr>
                <tr className="border-b border-inherit">
                  <td className="p-4"><code className="text-sm">projects:read</code></td>
                  <td className={cn("p-4", theme.muted)}>Read project information</td>
                </tr>
                <tr className="border-b border-inherit">
                  <td className="p-4"><code className="text-sm">projects:write</code></td>
                  <td className={cn("p-4", theme.muted)}>Create and update projects</td>
                </tr>
                <tr className="border-b border-inherit">
                  <td className="p-4"><code className="text-sm">user:read</code></td>
                  <td className={cn("p-4", theme.muted)}>Read user profile information</td>
                </tr>
                <tr>
                  <td className="p-4"><code className="text-sm">teams:read</code></td>
                  <td className={cn("p-4", theme.muted)}>Read team information (for organization deployments)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Features
          </h2>

          <div className="grid gap-4">
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>One-Click Deploys</h3>
              <p className={theme.muted}>
                Deploy any published web app to Vercel with a single click. No manual configuration required.
              </p>
            </div>

            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Environment Variables</h3>
              <p className={theme.muted}>
                Automatically sync environment variables from l4yercak3 to your Vercel projects.
              </p>
            </div>

            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Real-Time Status</h3>
              <p className={theme.muted}>
                Monitor deployment progress and status directly within l4yercak3.
              </p>
            </div>

            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Team Support</h3>
              <p className={theme.muted}>
                Deploy to personal accounts or team projects. Manage access across your organization.
              </p>
            </div>

            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Deployment Logs</h3>
              <p className={theme.muted}>
                Access build logs and analytics to troubleshoot issues quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Environment Variables */}
        <section id="environment-variables" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Environment Variables
          </h2>
          <p className="mb-4">
            l4yercak3 can automatically sync environment variables to your Vercel projects. This ensures your deployed apps have access to all required configuration.
          </p>

          <h3 className={cn("text-xl font-semibold mb-3 mt-6", theme.headings)}>
            How It Works
          </h3>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Define environment variables in your l4yercak3 project settings</li>
            <li>Mark variables for sync with the &quot;Sync to Vercel&quot; option</li>
            <li>Variables are automatically pushed during deployment</li>
            <li>Sensitive values are encrypted in transit</li>
          </ol>

          <div className={cn("p-4 rounded-lg border-l-4 border-amber-500", theme.cta)}>
            <p className="font-semibold mb-2">Important</p>
            <p className={theme.muted}>
              Environment variables marked as &quot;Secret&quot; in l4yercak3 will be created as encrypted environment variables in Vercel.
            </p>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Troubleshooting
          </h2>

          <div className="space-y-6">
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Deployment Failed</h3>
              <p className={cn("mb-2", theme.muted)}>
                Check your build logs for specific errors. Common issues include:
              </p>
              <ul className={cn("list-disc pl-6 space-y-1", theme.muted)}>
                <li>Missing environment variables</li>
                <li>Build script errors</li>
                <li>Incompatible Node.js version</li>
                <li>Missing dependencies</li>
              </ul>
            </div>

            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Authorization Error</h3>
              <p className={theme.muted}>
                Try disconnecting and reconnecting the integration. Ensure you have the necessary permissions on your Vercel account or team.
              </p>
            </div>

            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Environment Variables Not Syncing</h3>
              <p className={theme.muted}>
                Verify your environment variables are correctly configured in l4yercak3 with the &quot;Sync to Vercel&quot; option enabled. After making changes, trigger a new deployment for the variables to take effect.
              </p>
            </div>

            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Project Not Found</h3>
              <p className={theme.muted}>
                Make sure the Vercel project exists and you have access to it. If deploying to a team project, verify you have the correct team permissions.
              </p>
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section id="privacy" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Data & Privacy
          </h2>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <p className="font-semibold mb-3">What we access:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Deploy your web applications to Vercel</li>
              <li>Configure project settings and environment variables</li>
              <li>Monitor deployment status and logs</li>
            </ul>
            <p>
              We only deploy projects you explicitly authorize through our platform. Your Vercel credentials are encrypted and stored securely. We never access or modify projects outside of the l4yercak3 deployment workflow.
            </p>
          </div>
          <p className="mt-4">
            For more details, see our <Link href="/privacy" className="underline hover:opacity-80">Privacy Policy</Link>.
          </p>
        </section>

        {/* Disconnecting */}
        <section id="disconnecting" className="mb-12 scroll-mt-20">
          <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
            Disconnecting
          </h2>
          <p className="mb-4">
            You can disconnect the Vercel integration at any time:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>Go to <strong>Settings → Integrations</strong> in l4yercak3</li>
            <li>Click &quot;Disconnect&quot; next to Vercel</li>
            <li>Optionally, revoke access from your Vercel dashboard under <strong>Account Settings → Integrations</strong></li>
          </ol>
          <p className={theme.muted}>
            Disconnecting will not affect existing deployments on Vercel. You can reconnect at any time.
          </p>
        </section>

      </div>

      {/* Related Links */}
      <div className={cn("rounded-xl p-6 mt-12 border", theme.cta)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          Related Documentation
        </h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/docs/quickstart" className="underline hover:opacity-80">
            Quick Start Guide
          </Link>
          <Link href="/docs/integrations/github" className="underline hover:opacity-80">
            GitHub Integration
          </Link>
          <Link href="/support" className="underline hover:opacity-80">
            Support
          </Link>
        </div>
      </div>

      {/* Legal Links */}
      <div className={cn("rounded-xl p-6 mt-4 border", theme.quote)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          Legal & Compliance
        </h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="underline hover:opacity-80">
            Privacy Policy
          </Link>
          <Link href="/terms" className="underline hover:opacity-80">
            Terms of Service
          </Link>
          <Link href="/eula" className="underline hover:opacity-80">
            EULA
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
