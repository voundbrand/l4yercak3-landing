'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { BookCallButton } from '@/components/book-call-button';

function SupportContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Support
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          Get help with l4yercak3 and our integrations
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-lg leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

          {/* Contact Options */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              How to Reach Us
            </h2>
            <div className="grid gap-6 mt-6">
              <div className={cn("p-6 rounded-lg border", theme.quote)}>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>Email Support</h3>
                <p className={theme.muted}>
                  For general inquiries, technical issues, or feature requests.
                </p>
                <a
                  href="mailto:info@voundbrand.com"
                  className="inline-block mt-4 underline hover:opacity-80 transition-opacity"
                >
                  info@voundbrand.com
                </a>
              </div>

              <div className={cn("p-6 rounded-lg border", theme.quote)}>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>Book a Call</h3>
                <p className={cn("mb-4", theme.muted)}>
                  Schedule a call for personalized assistance or partnership discussions.
                </p>
                <BookCallButton />
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mt-6">
              <div>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                  How do I connect my Vercel account?
                </h3>
                <p className={theme.muted}>
                  Navigate to Settings → Integrations in your l4yercak3 dashboard and click &quot;Connect Vercel&quot;. You&apos;ll be redirected to Vercel to authorize the integration.
                </p>
              </div>

              <div>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                  What permissions does the Vercel integration need?
                </h3>
                <p className={theme.muted}>
                  We request permissions to create deployments, read and write projects, read user info, and read team information. See our <Link href="/docs" className="underline">documentation</Link> for full details.
                </p>
              </div>

              <div>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                  Can I disconnect the Vercel integration?
                </h3>
                <p className={theme.muted}>
                  Yes, you can disconnect at any time from Settings → Integrations. You can also revoke access directly from your Vercel dashboard.
                </p>
              </div>

              <div>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                  Is my data secure?
                </h3>
                <p className={theme.muted}>
                  Yes. We use encryption (SSL/TLS), secure authentication, and follow GDPR requirements. See our <Link href="/privacy" className="underline">Privacy Policy</Link> for details.
                </p>
              </div>

              <div>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                  Do you offer enterprise plans?
                </h3>
                <p className={theme.muted}>
                  Yes, we offer custom enterprise solutions and white-label partnerships. Contact us for more information.
                </p>
              </div>

              <div>
                <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                  What&apos;s your response time?
                </h3>
                <p className={theme.muted}>
                  We aim to respond to all inquiries within 24-48 business hours. Enterprise customers receive priority support.
                </p>
              </div>
            </div>
          </section>

          {/* Vercel Integration Issues */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Vercel Integration Troubleshooting
            </h2>

            <div className="space-y-6 mt-6">
              <div className={cn("p-4 rounded-lg", theme.quote)}>
                <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
                  Deployment Failed
                </h3>
                <p className={theme.muted}>
                  Check your build logs for specific errors. Common issues include missing environment variables or build script errors. Verify your project configuration matches Vercel&apos;s requirements.
                </p>
              </div>

              <div className={cn("p-4 rounded-lg", theme.quote)}>
                <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
                  Authorization Error
                </h3>
                <p className={theme.muted}>
                  Try disconnecting and reconnecting the integration. Ensure you have the necessary permissions on your Vercel account or team.
                </p>
              </div>

              <div className={cn("p-4 rounded-lg", theme.quote)}>
                <h3 className={cn("text-lg font-semibold mb-2", theme.headings)}>
                  Environment Variables Not Syncing
                </h3>
                <p className={theme.muted}>
                  Verify your environment variables are correctly configured in l4yercak3. After making changes, trigger a new deployment for the variables to take effect.
                </p>
              </div>
            </div>
          </section>

          {/* Company Info */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Company Information
            </h2>
            <div className={cn("p-6 rounded-lg", theme.quote)}>
              <p className="font-semibold">Vound Brand UG (haftungsbeschränkt)</p>
              <p>Am Markt 11</p>
              <p>17309 Pasewalk</p>
              <p>Germany</p>
              <p className="mt-4">UST-ID: DE293728593</p>
              <p>Email: info@voundbrand.com</p>
            </div>
          </section>

        </div>
      </div>

      {/* Related Links */}
      <div className="mt-16">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            Resources
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Documentation
            </Link>
            <Link href="/privacy" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Terms of Service
            </Link>
            <Link href="/eula" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              EULA
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SupportPage() {
  return (
    <ContentPageLayout>
      <SupportContent />
    </ContentPageLayout>
  );
}
