'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function TermsContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Terms of Service
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          The agreement that governs your use of our services
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
              Welcome to the services provided by <strong>Vound Brand UG (haftungsbeschränkt)</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our software-as-a-service platform and website (collectively, the &quot;Service&quot;).
            </p>
            <p className="mt-4">
              By registering for a free account or accessing the Service, you (&quot;User&quot; or &quot;you&quot;) agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              2. Definitions
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>&quot;Account&quot;</strong>: The access authorization created by the User to use the Service.</li>
              <li><strong>&quot;Content&quot;</strong>: Any data, text, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links, and other content or materials that you submit, post, or display on or via the Service.</li>
              <li><strong>&quot;Service&quot;</strong>: The cloud-based software provided by Vound Brand UG (haftungsbeschränkt), including the free tier offering relevant to these Terms.</li>
            </ul>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              3. Account Registration
            </h2>
            <p><strong>3.1. Eligibility:</strong> You must be at least 18 years old and capable of forming a binding contract to use the Service.</p>
            <p className="mt-4"><strong>3.2. Account Information:</strong> You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
            <p className="mt-4"><strong>3.3. Security:</strong> You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>
          </section>

          {/* Usage Rights */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              4. Usage Rights
            </h2>
            <p><strong>4.1. License:</strong> Subject to your compliance with these Terms, Vound Brand UG (haftungsbeschränkt) grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Service for your internal business purposes or personal use, strictly in accordance with the features included in the free tier.</p>
            <p className="mt-4"><strong>4.2. Restrictions:</strong> You may not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Reverse engineer, decompile, or disassemble the Service.</li>
              <li>Lease, lend, sell, or sublicense the Service.</li>
              <li>Use the Service to build a competitive product.</li>
              <li>Violate any applicable laws or regulations.</li>
            </ul>
            <p className="mt-4"><strong>Exception for Resellers:</strong> The restrictions on leasing, lending, selling, or sublicensing do not apply if you have entered into a separate valid Written Reseller Agreement or White-Label Agreement with Vound Brand UG (haftungsbeschränkt). In such cases, your usage rights are governed by that separate agreement.</p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              5. Acceptable Use Policy
            </h2>
            <p>You agree not to misuse the Service. Prohibited activities include, but are not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Uploading or sharing content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.</li>
              <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.</li>
              <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              6. Intellectual Property
            </h2>
            <p><strong>6.1. Our Rights:</strong> The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Vound Brand UG (haftungsbeschränkt) and its licensors.</p>
            <p className="mt-4"><strong>6.2. Your Content:</strong> You retain ownership of any Content you submit. By submitting Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such Content <strong>solely for the purpose of providing, maintaining, and improving the Service</strong>.</p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              7. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. To the fullest extent permitted by law, appropriate to a free service, we disclaim all warranties.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              8. Limitation of Liability (Haftungsbeschränkung)
            </h2>
            <p><strong>8.1. Unlimited Liability:</strong> Vound Brand UG (haftungsbeschränkt) shall be liable without limitation for damages caused by intent (<em>Vorsatz</em>) or gross negligence (<em>grobe Fahrlässigkeit</em>), as well as for damages resulting from injury to life, body, or health, or under the Product Liability Act (<em>Produkthaftungsgesetz</em>).</p>
            <p className="mt-4"><strong>8.2. Limited Liability for Simple Negligence:</strong> In cases of simple negligence (<em>leichte Fahrlässigkeit</em>), we shall only be liable for breaches of material contractual obligations (<em>Kardinalspflichten</em>)—obligations whose fulfillment is essential for the proper execution of the contract and on whose observance the user regularly relies. In such cases, liability is limited to the typically foreseeable damage at the time of contract conclusion.</p>
            <p className="mt-4"><strong>8.3. Free Tier:</strong> For the free use of the Service, our liability for simple negligence is excluded, except for the cases mentioned in Section 8.1.</p>
          </section>

          {/* Withdrawal */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              9. Right of Withdrawal (Widerrufsbelehrung)
            </h2>
            <p>If you are a consumer (<em>Verbraucher</em>) within the meaning of § 13 BGB, you have a statutory right of withdrawal.</p>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Right of Withdrawal</p>
              <p className="mt-2">You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day of the conclusion of the contract. To exercise the right of withdrawal, you must inform us (Vound Brand UG (haftungsbeschränkt), Am Markt 11, 17309 Pasewalk, info@voundbrand.com) of your decision to withdraw from this contract by an unequivocal statement (e.g., a letter sent by post or e-mail).</p>
              <p className="mt-2 font-semibold">Effects of Withdrawal</p>
              <p className="mt-2">If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of delivery, without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw from this contract.</p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              10. Dispute Resolution
            </h2>
            <p><strong>10.1. ODR Platform:</strong> The European Commission provides a platform for Online Dispute Resolution (ODR), which can be found at <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline">http://ec.europa.eu/consumers/odr/</a>. We are generally not willing or obliged to participate in dispute settlement proceedings before a consumer arbitration board.</p>
            <p className="mt-4"><strong>10.2. Jurisdiction:</strong> If the User is a merchant, a legal entity under public law, or a special fund under public law, the exclusive place of jurisdiction for all disputes arising from this contractual relationship is <strong>Pasewalk, Germany</strong>. German law applies.</p>
          </section>

          {/* Termination */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              11. Termination
            </h2>
            <p>
              We may terminate or suspend your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              12. Contact Us
            </h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
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
            See also
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Privacy Policy
            </Link>
            <Link href="/cookies" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TermsPage() {
  return (
    <ContentPageLayout>
      <TermsContent />
    </ContentPageLayout>
  );
}
