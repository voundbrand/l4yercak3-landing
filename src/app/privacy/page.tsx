'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function PrivacyContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Privacy Policy
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          How we collect, use, and protect your data
        </p>
        <div className={cn("mt-8 text-sm transition-colors duration-300", theme.muted)}>
          <time>Last Updated: December 10, 2025</time>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-lg leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

          {/* Introduction */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              1. Introduction
            </h2>
            <p>
              <strong>Vound Brand UG (haftungsbeschränkt)</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting the personal data of our users (&quot;User&quot; or &quot;you&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access our services.
            </p>
          </section>

          {/* Controller */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              2. Controller
            </h2>
            <p>
              The controller within the meaning of the General Data Protection Regulation (GDPR) and other national data protection laws is:
            </p>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Vound Brand UG (haftungsbeschränkt)</p>
              <p>Am Markt 11</p>
              <p>17309 Pasewalk</p>
              <p>Germany</p>
              <p>Email: info@voundbrand.com</p>
              <p>UST-ID: DE293728593</p>
            </div>
            <p className="mt-4">
              <strong>Data Protection Officer (DPO):</strong> As a small company with a single owner/operator and no core large-scale monitoring or special category data processing, we are not legally required to appoint a Data Protection Officer (Art. 37 GDPR). For all privacy inquiries, please contact us directly at the address above.
            </p>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              3. Data We Collect
            </h2>
            <p>We accumulate certain data to provide our Service effectively:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Identity Data</strong>: Name, email address, password hash.</li>
              <li><strong>Contact Data</strong>: Billing address, phone number.</li>
              <li><strong>Financial Data</strong>: Payment details (processed securely via our payment provider <strong>Stripe</strong>; we do not store full credit card numbers).</li>
              <li><strong>Technical Data</strong>: IP address, login data, browser type and version, time zone setting, operating system.</li>
              <li><strong>Usage Data</strong>: Information on how you use our website and Service, including audit logs of actions taken within the platform.</li>
              <li><strong>User Content</strong>: Data input into the Service, including text for AI processing and generated results.</li>
            </ul>
          </section>

          {/* Purpose of Processing */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              4. Purpose of Processing
            </h2>
            <p>We process your data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To provide and operate the Service (including AI content generation).</li>
              <li>To manage your account and subscription.</li>
              <li>To process payments.</li>
              <li>To provide customer support.</li>
              <li>To improve our Service via analytics.</li>
              <li>To detect and prevent fraud and security issues.</li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              5. Legal Basis for Processing
            </h2>
            <p>We process Personal Data under the following legal bases pursuant to the GDPR:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Consent (Art. 6(1)(a) GDPR)</strong>: Use of cookies/tracking technologies and sending of marketing emails.</li>
              <li><strong>Contract (Art. 6(1)(b) GDPR)</strong>: Processing necessary to perform the contract with you (e.g., providing the service, processing payments).</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f) GDPR)</strong>: Network security, product improvement, and fraud prevention.</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              6. Data Sharing and Subprocessors
            </h2>
            <p>We share data with the following categories of third-party service providers (Subprocessors) to operate our business:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Cloud Hosting</strong>: Vercel, Supabase, AWS</li>
              <li><strong>Payment Processing</strong>: Stripe</li>
              <li><strong>AI Models</strong>: OpenAI, Anthropic - strictly for content generation request handling</li>
              <li><strong>Analytics</strong>: PostHog, Google Analytics</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              7. International Data Transfers
            </h2>
            <p>
              If we transfer data to countries outside the European Economic Area (EEA), such as to the US for certain AI or cloud services, we ensure appropriate safeguards are in place, primarily through the use of <strong>Standard Contractual Clauses (SCCs)</strong> or reliance on the <strong>EU-US Data Privacy Framework</strong> where the provider is certified.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              8. Data Retention
            </h2>
            <p>We retain personal data only as long as necessary:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Account Data</strong>: For the duration of your account + transition period relative to deletion.</li>
              <li><strong>Tax/Commercial Records</strong>: 6 to 10 years as required by German commercial and tax law (§ 257 HGB, § 147 AO).</li>
              <li><strong>Audit Logs/Technical Data</strong>: 7 to 365 days depending on the tier and security relevance.</li>
              <li><strong>AI Input/Output</strong>: Retained transiently for generation or as part of your saved Project content until deleted by you.</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              9. Your Data Protection Rights
            </h2>
            <p>Under the GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Right to Withdraw Consent (Art. 7(3))</strong>: You may withdraw your consent at any time (e.g., opting out of marketing).</li>
              <li><strong>Access, Rectification, Erasure</strong>: You can request to access, correct, or delete your data.</li>
              <li><strong>Restriction & Objection</strong>: You may restrict processing or object to processing based on legitimate interests.</li>
              <li><strong>Data Portability</strong>: You may request your data in a structured format.</li>
              <li><strong>Complaint</strong>: You have the right to lodge a complaint with a supervisory authority.</li>
            </ul>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Supervisory Authority:</p>
              <p>Der Landesbeauftragte für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern</p>
              <p>Schloss Schwerin, Lennéstraße 1, 19053 Schwerin</p>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              10. Security (TOMs)
            </h2>
            <p>
              We implement appropriate technical and organizational measures (&quot;TOMs&quot;) including encryption (SSL/TLS), access controls, and regular security reviews to protect your data.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              11. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              12. Contact Us
            </h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Vound Brand UG (haftungsbeschränkt)</p>
              <p>Email: info@voundbrand.com</p>
            </div>
          </section>

        </div>
      </div>

      {/* Related Links */}
      <div className="mt-16">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            Related Legal Documents
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Terms of Service
            </Link>
            <Link href="/dpa" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Data Processing Agreement
            </Link>
            <Link href="/docs" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Integration Documentation
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PrivacyPage() {
  return (
    <ContentPageLayout>
      <PrivacyContent />
    </ContentPageLayout>
  );
}
