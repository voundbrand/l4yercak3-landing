'use client';

import { DocsLayout, useDocsTheme } from '@/components/docs-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function MicrosoftDocsContent() {
  const theme = useDocsTheme();

  return (
    <article>
      {/* Breadcrumb */}
      <nav className={cn("flex items-center gap-2 text-sm mb-6", theme.muted)}>
        <Link href="/docs" className="hover:underline">Docs</Link>
        <span>/</span>
        <Link href="/docs" className="hover:underline">Integrations</Link>
        <span>/</span>
        <span className={theme.headings}>Microsoft</span>
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
              Microsoft Integration
            </h1>
            <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
              New
            </span>
          </div>
        </div>
        <p className={cn("text-lg leading-relaxed", theme.muted)}>
          Connect your l4yercak3 platform to Microsoft 365 and Azure services for enterprise-grade authentication, file management, and team collaboration. Powered by Microsoft Entra ID (formerly Azure AD).
        </p>
      </div>

      {/* Table of Contents */}
      <div className={cn("p-4 rounded-lg mb-8", theme.quote)}>
        <h3 className={cn("font-semibold mb-3", theme.headings)}>On this page</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="hover:underline">Overview</a></li>
          <li><a href="#permissions" className="hover:underline">Required Permissions</a></li>
          <li><a href="#setup" className="hover:underline">Setting Up the Integration</a></li>
          <li><a href="#features" className="hover:underline">Features</a></li>
          <li><a href="#troubleshooting" className="hover:underline">Troubleshooting</a></li>
        </ul>
      </div>

      {/* Overview */}
      <section id="overview" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Overview
        </h2>
        <p className={cn("mb-4", theme.content)}>
          The l4yercak3 Microsoft integration enables seamless connectivity with Microsoft 365 services and Azure infrastructure. This enterprise-grade integration is powered by Microsoft Entra ID and provides secure authentication and authorization.
        </p>
        <p className={cn("mb-4", theme.content)}>
          With the Microsoft integration, you can:
        </p>
        <ul className={cn("list-disc pl-6 space-y-2", theme.content)}>
          <li>Sign in with your Microsoft account or organization credentials</li>
          <li>Access Microsoft 365 services (SharePoint, OneDrive, Teams)</li>
          <li>Deploy to Azure cloud infrastructure</li>
          <li>Sync files and documents across platforms</li>
          <li>Leverage enterprise single sign-on (SSO)</li>
        </ul>
      </section>

      {/* Required Permissions */}
      <section id="permissions" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Required Permissions
        </h2>
        <p className={cn("mb-4", theme.content)}>
          When connecting the Microsoft integration, you&apos;ll be asked to grant the following permissions:
        </p>
        <div className={cn("overflow-x-auto rounded-lg border", theme.quote)}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>Permission</th>
                <th className={cn("px-4 py-3 text-left font-semibold", theme.headings)}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className={cn("px-4 py-3", theme.content)}>User.Read</td>
                <td className={cn("px-4 py-3", theme.muted)}>Sign in and read your profile</td>
              </tr>
              <tr className="border-b">
                <td className={cn("px-4 py-3", theme.content)}>Files.ReadWrite</td>
                <td className={cn("px-4 py-3", theme.muted)}>Access and manage your OneDrive files</td>
              </tr>
              <tr className="border-b">
                <td className={cn("px-4 py-3", theme.content)}>Sites.ReadWrite.All</td>
                <td className={cn("px-4 py-3", theme.muted)}>Access SharePoint sites and content</td>
              </tr>
              <tr>
                <td className={cn("px-4 py-3", theme.content)}>offline_access</td>
                <td className={cn("px-4 py-3", theme.muted)}>Maintain access to data you&apos;ve granted access to</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={cn("mt-4 text-sm", theme.muted)}>
          App ID: <code className="px-2 py-1 rounded bg-black/10 dark:bg-white/10">2dea334b-f0cf-4c18-bd97-a178104e84be</code>
        </p>
      </section>

      {/* Setting Up */}
      <section id="setup" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Setting Up the Integration
        </h2>
        <ol className={cn("list-decimal pl-6 space-y-3", theme.content)}>
          <li>Navigate to <strong>Settings → Integrations</strong> in your l4yercak3 dashboard</li>
          <li>Click <strong>&quot;Connect Microsoft&quot;</strong></li>
          <li>You&apos;ll be redirected to Microsoft to sign in with your account</li>
          <li>Review the requested permissions and click <strong>&quot;Accept&quot;</strong></li>
          <li>If you&apos;re part of an organization, admin consent may be required</li>
          <li>You&apos;ll be redirected back to l4yercak3</li>
        </ol>
        <div className={cn("p-4 rounded-lg border-l-4 border-blue-500 mt-6", theme.cta)}>
          <p className="font-semibold mb-2">Enterprise Users</p>
          <p className={theme.muted}>
            If your organization requires admin consent, contact your IT administrator to approve the l4yercak3 Backoffice Software app in your Microsoft Entra admin center.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Features
        </h2>
        <div className="grid gap-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Microsoft Account Sign-In</h3>
            <p className={theme.muted}>
              Sign in to l4yercak3 using your Microsoft personal or work account for seamless authentication.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>OneDrive Integration</h3>
            <p className={theme.muted}>
              Access and sync files from OneDrive directly within your l4yercak3 projects.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>SharePoint Connectivity</h3>
            <p className={theme.muted}>
              Connect to SharePoint sites for document management and team collaboration.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Azure Deployment</h3>
            <p className={theme.muted}>
              Deploy your web applications to Azure App Service and Azure Static Web Apps.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("font-semibold mb-2", theme.headings)}>Enterprise SSO</h3>
            <p className={theme.muted}>
              Leverage your organization&apos;s single sign-on for secure, passwordless access.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-12 scroll-mt-20">
        <h2 className={cn("font-serif text-2xl italic mb-4", theme.headings)}>
          Troubleshooting
        </h2>
        <div className="space-y-4">
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              Admin Consent Required
            </h3>
            <p className={theme.muted}>
              If you see &quot;Need admin approval&quot;, your organization requires an administrator to approve the app. Contact your IT admin to grant consent in the Microsoft Entra admin center.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              Sign-In Failed
            </h3>
            <p className={theme.muted}>
              Ensure you&apos;re using the correct Microsoft account. If you have multiple accounts, try signing out of all Microsoft services first, then reconnect.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              Permission Denied
            </h3>
            <p className={theme.muted}>
              Try disconnecting and reconnecting the integration. Ensure you accept all requested permissions during the authorization flow.
            </p>
          </div>
          <div className={cn("p-4 rounded-lg", theme.quote)}>
            <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
              Files Not Syncing
            </h3>
            <p className={theme.muted}>
              Verify you have the Files.ReadWrite permission granted. Check that your OneDrive storage isn&apos;t full and that the files aren&apos;t protected by additional security policies.
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <div className={cn("rounded-xl p-6 border", theme.cta)}>
        <h3 className={cn("font-semibold mb-4", theme.headings)}>
          Related Integrations
        </h3>
        <p className={cn("mb-4", theme.muted)}>
          Get the most out of l4yercak3 by combining Microsoft with our other integrations:
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/integrations/vercel"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            Vercel Integration
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href="/docs/integrations/github"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            GitHub Integration
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
            Get Help
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
