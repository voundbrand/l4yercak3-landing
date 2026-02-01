'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function DataDeletionContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Data Deletion Policy
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          How to request deletion of your data
        </p>
        <div className={cn("mt-8 text-sm transition-colors duration-300", theme.muted)}>
          <time>Last Updated: February 1, 2026</time>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-lg leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

          {/* Introduction */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              1. Overview
            </h2>
            <p>
              <strong>Vound Brand UG (haftungsbeschränkt)</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and giving you control over your data. This page explains how you can request the deletion of your personal data from our systems, including any data obtained through Facebook or WhatsApp integrations.
            </p>
          </section>

          {/* Facebook / WhatsApp Data */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              2. Data Collected via Facebook &amp; WhatsApp
            </h2>
            <p>
              When you interact with our services through Facebook or WhatsApp, we may receive and store the following data:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Profile Information</strong>: Name, profile picture, and email address associated with your Facebook account.</li>
              <li><strong>User ID</strong>: Your Facebook or WhatsApp user identifier.</li>
              <li><strong>Message Data</strong>: Messages you send to us through WhatsApp Business, including text, images, and attachments.</li>
              <li><strong>Phone Number</strong>: Your WhatsApp phone number, if provided.</li>
              <li><strong>Interaction Data</strong>: Timestamps and metadata related to your communications with us.</li>
            </ul>
          </section>

          {/* How to Request Deletion */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              3. How to Request Data Deletion
            </h2>
            <p>
              You can request the deletion of your data at any time using one of the following methods:
            </p>

            <div className={cn("p-6 rounded-lg mt-4 space-y-4", theme.quote)}>
              <div>
                <p className="font-semibold">Option 1: Email Request</p>
                <p>Send an email to <strong>info@voundbrand.com</strong> with the subject line &quot;Data Deletion Request&quot;. Please include:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Your full name</li>
                  <li>The email address associated with your account</li>
                  <li>Your Facebook or WhatsApp user ID (if applicable)</li>
                  <li>A description of the data you want deleted</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Option 2: Support Page</p>
                <p>Visit our <Link href="/support" className="underline hover:opacity-80">Support page</Link> to contact us directly about your deletion request.</p>
              </div>
            </div>
          </section>

          {/* What Gets Deleted */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              4. What We Delete
            </h2>
            <p>
              Upon receiving a valid deletion request, we will delete:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Your account data and profile information</li>
              <li>Message history and communication records</li>
              <li>Facebook and WhatsApp identifiers linked to your account</li>
              <li>Any content or files you submitted through our platform</li>
              <li>Usage and interaction data associated with your account</li>
            </ul>
            <p className="mt-4">
              <strong>Exceptions:</strong> We may retain certain data where required by law (e.g., tax and commercial records under German law per &sect; 257 HGB and &sect; 147 AO, retained for 6&ndash;10 years) or where necessary to protect our legitimate interests (e.g., fraud prevention, legal claims).
            </p>
          </section>

          {/* Processing Timeline */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              5. Processing Timeline
            </h2>
            <p>
              We process data deletion requests as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Acknowledgment</strong>: We will confirm receipt of your request within 48 hours.</li>
              <li><strong>Verification</strong>: We may need to verify your identity before processing the request.</li>
              <li><strong>Deletion</strong>: Your data will be deleted within 30 days of verification.</li>
              <li><strong>Confirmation</strong>: You will receive a confirmation email once deletion is complete.</li>
            </ul>
          </section>

          {/* Status Check */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              6. Check Deletion Status
            </h2>
            <p>
              To check the status of your data deletion request, email <strong>info@voundbrand.com</strong> with the subject line &quot;Deletion Status Check&quot; and include the email address used in your original request. We will respond with the current status within 48 business hours.
            </p>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              7. Legal Basis
            </h2>
            <p>
              Your right to data deletion is protected under:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>GDPR Article 17</strong> &mdash; Right to Erasure (&quot;Right to be Forgotten&quot;)</li>
              <li><strong>Facebook Platform Terms</strong> &mdash; Data deletion requirements for platform apps</li>
              <li><strong>German Federal Data Protection Act (BDSG)</strong></li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              8. Contact Us
            </h2>
            <p>If you have any questions about data deletion, please contact us at:</p>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Vound Brand UG (haftungsbeschränkt)</p>
              <p>Am Markt 11</p>
              <p>17309 Pasewalk</p>
              <p>Germany</p>
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
            <Link href="/privacy" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Terms of Service
            </Link>
            <Link href="/dpa" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Data Processing Agreement
            </Link>
            <Link href="/support" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Support
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DataDeletionPage() {
  return (
    <ContentPageLayout>
      <DataDeletionContent />
    </ContentPageLayout>
  );
}
