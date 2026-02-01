'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function CookiesContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Cookie Policy
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          How we use cookies on our platform
        </p>
        <div className={cn("mt-8 text-sm transition-colors duration-300", theme.muted)}>
          <time>Last Updated: February 2026</time>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-lg leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

          {/* What are cookies? */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              What are cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help us understand how you use our platform and improve your experience.
            </p>
          </section>

          {/* What cookies do we use? */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              What cookies do we use?
            </h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={cn("border-b", theme.muted)}>
                    <th className="py-3 pr-4 font-semibold">Cookie</th>
                    <th className="py-3 pr-4 font-semibold">Type</th>
                    <th className="py-3 pr-4 font-semibold">Purpose</th>
                    <th className="py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={cn("border-b border-opacity-20", theme.muted)}>
                    <td className="py-3 pr-4">PostHog analytics (ph_*)</td>
                    <td className="py-3 pr-4">Third-party</td>
                    <td className="py-3 pr-4">Tracks anonymous usage patterns to help us improve the platform. Only active if you accept cookies.</td>
                    <td className="py-3">1 year</td>
                  </tr>
                  <tr className={cn("border-b border-opacity-20", theme.muted)}>
                    <td className="py-3 pr-4">Convex session</td>
                    <td className="py-3 pr-4">First-party</td>
                    <td className="py-3 pr-4">Keeps you logged in and authenticates your requests. Essential for the platform to work.</td>
                    <td className="py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">cookie_consent</td>
                    <td className="py-3 pr-4">First-party</td>
                    <td className="py-3 pr-4">Remembers your cookie preference (accepted or declined).</td>
                    <td className="py-3">Persistent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Essential vs optional */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Essential vs optional cookies
            </h2>
            <p>
              <strong>Essential cookies</strong> (Convex session, cookie consent) are required for the platform to function. These cannot be disabled.
            </p>
            <p className="mt-4">
              <strong>Analytics cookies</strong> (PostHog) are optional. They are disabled by default and only activate if you click &quot;Accept&quot; on our cookie banner.
            </p>
          </section>

          {/* Accept or decline */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              What happens when you accept or decline?
            </h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Accept:</strong> PostHog analytics starts collecting anonymous usage data (page views, feature usage, session duration). No personal data is sold or shared with advertisers.
              </li>
              <li>
                <strong>Decline:</strong> PostHog stays disabled. Only essential cookies are used. The platform works the same either way.
              </li>
            </ul>
          </section>

          {/* How to manage */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              How to manage cookies
            </h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Use the cookie banner when you first visit the site</li>
              <li>Clear your browser cookies at any time to reset your preference</li>
              <li>Use your browser&apos;s built-in cookie settings to block cookies entirely</li>
            </ul>
          </section>

          {/* Third-party services */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Third-party services
            </h2>
            <p>
              We use PostHog for analytics. PostHog processes data under their privacy policy. We do not use any advertising cookies, tracking pixels, or retargeting services.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Changes to this policy
            </h2>
            <p>
              We may update this policy as we add new features. Changes will be reflected in the &quot;Last updated&quot; date above.
            </p>
          </section>

          {/* Questions */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Questions?
            </h2>
            <p>
              Contact us at{' '}
              <a href="mailto:hello@l4yercak3.com" className="underline hover:opacity-80 transition-opacity">
                hello@l4yercak3.com
              </a>
            </p>
          </section>

        </div>
      </div>

      {/* See also */}
      <div className="mt-16">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            See also
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CookiesPage() {
  return (
    <ContentPageLayout>
      <CookiesContent />
    </ContentPageLayout>
  );
}
