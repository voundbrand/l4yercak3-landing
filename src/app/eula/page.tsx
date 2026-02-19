'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function EULAContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          End User License Agreement
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          License terms for using the l4yercak3 platform
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
              1. Agreement to Terms
            </h2>
            <p>
              This End User License Agreement (&quot;EULA&quot;) is a legal agreement between you (&quot;User&quot; or &quot;you&quot;) and <strong>Vound Brand UG (haftungsbeschränkt)</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) for the use of the l4yercak3 platform and any related integrations, including the Vercel integration (collectively, the &quot;Software&quot;).
            </p>
            <p className="mt-4">
              By installing, copying, or otherwise using the Software, you agree to be bound by the terms of this EULA. If you do not agree to these terms, do not install or use the Software.
            </p>
          </section>

          {/* License Grant */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              2. License Grant
            </h2>
            <p>
              Subject to the terms of this EULA, we grant you a limited, non-exclusive, non-transferable, revocable license to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access and use the Software for your personal or internal business purposes</li>
              <li>Connect the Software to third-party services (such as Vercel) as permitted by the Software&apos;s features</li>
              <li>Create and deploy web applications using the Software</li>
            </ul>
          </section>

          {/* Restrictions */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              3. Restrictions
            </h2>
            <p>You may not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Copy, modify, or distribute the Software except as expressly permitted</li>
              <li>Reverse engineer, decompile, or disassemble the Software</li>
              <li>Rent, lease, lend, sell, or sublicense the Software</li>
              <li>Use the Software to create a competing product or service</li>
              <li>Remove or alter any proprietary notices or labels on the Software</li>
              <li>Use the Software in any unlawful manner or for any illegal purpose</li>
              <li>Bypass or circumvent any security features of the Software</li>
            </ul>
          </section>

          {/* Third-Party Integrations */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              4. Third-Party Integrations
            </h2>
            <p>
              The Software may integrate with third-party services such as Vercel, GitHub, and others. Your use of these integrations is subject to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>The terms and conditions of the respective third-party services</li>
              <li>Any additional permissions or access you grant through OAuth or similar mechanisms</li>
              <li>The privacy policies of the respective third parties</li>
            </ul>
            <p className="mt-4">
              We are not responsible for the availability, accuracy, or functionality of third-party services. Your relationship with third-party service providers is governed by their respective terms.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              5. Intellectual Property
            </h2>
            <p>
              The Software and all copies thereof are proprietary to us and title, ownership rights, and intellectual property rights remain with us. The Software is protected by copyright and other intellectual property laws and treaties.
            </p>
            <p className="mt-4">
              <strong>Your Content:</strong> You retain ownership of any content you create using the Software. By using the Software, you grant us a limited license to process your content solely for the purpose of providing the Software&apos;s features.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              6. Privacy and Data
            </h2>
            <p>
              Your use of the Software is also governed by our <Link href="/privacy" className="underline">Privacy Policy</Link>. When you use integrations like Vercel, certain data may be shared with third parties as necessary to provide the integration functionality.
            </p>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Data Shared with Integrations:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Project files and configurations for deployment</li>
                <li>Environment variables you configure</li>
                <li>Account information necessary for authentication</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              7. Disclaimer of Warranties
            </h2>
            <p>
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
            </p>
            <p className="mt-4">
              We do not warrant that the Software will meet your requirements, operate without interruption, or be error-free. The entire risk as to the quality and performance of the Software is with you.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              8. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SOFTWARE.
            </p>
            <p className="mt-4">
              This limitation applies under German law (<em>Haftungsbeschränkung</em>) as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Unlimited liability</strong> for intent and gross negligence, and for injury to life, body, or health</li>
              <li><strong>Limited liability</strong> for simple negligence only regarding material contractual obligations</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              9. Termination
            </h2>
            <p>
              This EULA is effective until terminated. Your rights under this EULA will terminate automatically without notice if you fail to comply with any of its terms.
            </p>
            <p className="mt-4">
              Upon termination, you must cease all use of the Software and destroy all copies in your possession. Termination does not affect any rights or obligations that accrued prior to termination.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              10. Governing Law
            </h2>
            <p>
              This EULA shall be governed by and construed in accordance with the laws of the Federal Republic of Germany, without regard to its conflict of law provisions.
            </p>
            <p className="mt-4">
              The exclusive place of jurisdiction for all disputes arising from this agreement is <strong>Pasewalk, Germany</strong>.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              11. Contact Information
            </h2>
            <p>For questions about this EULA, please contact:</p>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Vound Brand UG (haftungsbeschränkt)</p>
              <p>Am Markt 11</p>
              <p>17309 Pasewalk</p>
              <p>Germany</p>
              <p>Email: support@l4yercak3.com</p>
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
            <Link href="/docs" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Integration Documentation
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EULAPage() {
  return (
    <ContentPageLayout>
      <EULAContent />
    </ContentPageLayout>
  );
}
