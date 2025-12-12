'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function ResellerContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Reseller & White-Label Agreement
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          Partnership terms for agencies and resellers
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-lg leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

          {/* Parties */}
          <section>
            <div className={cn("p-6 rounded-lg", theme.quote)}>
              <p className="font-semibold">Between</p>
              <p className="mt-2">
                <strong>Vound Brand UG (haftungsbeschränkt)</strong><br />
                Am Markt 11<br />
                17309 Pasewalk<br />
                Germany<br />
                (hereinafter: <strong>&quot;Provider&quot;</strong>)
              </p>
              <p className="mt-4 font-semibold">And</p>
              <p className="mt-2">The Agency / Reseller Partner<br />(hereinafter: <strong>&quot;Reseller&quot;</strong>)</p>
            </div>
          </section>

          {/* Preamble */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              1. Preamble
            </h2>
            <p>
              The Provider offers a cloud-based software platform (SaaS). The Reseller wishes to market and distribute this software to its own customers, potentially under its own brand (&quot;White-Label&quot;). This Agreement governs the rights and obligations of the parties in this context.
            </p>
          </section>

          {/* Appointment & Scope */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              2. Appointment & Scope
            </h2>
            <p><strong>2.1. Appointment:</strong> The Provider appoints the Reseller as a non-exclusive reseller of the Service to End Users.</p>
            <p className="mt-4"><strong>2.2. White-Label Rights:</strong> The Reseller is granted the right to brand the user interface of the Service with its own logos, colors, and domain (&quot;White-Labeling&quot;), provided such branding does not violate any third-party rights.</p>
            <p className="mt-4"><strong>2.3. No Agency:</strong> This Agreement does not create an employment, agency, or representatives relationship. The Reseller acts in its own name and on its own account.</p>
          </section>

          {/* Reseller Obligations */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              3. Reseller Obligations
            </h2>
            <p><strong>3.1. End User Agreements:</strong> The Reseller shall enter into its own binding contracts with End Users. The Reseller guarantees that its agreements with End Users will contain terms <strong>at least as protective</strong> of the Provider and the Service as the Provider&apos;s own Terms of Service.</p>
            <p className="mt-4"><strong>3.2. Compliance:</strong> The Reseller is solely responsible for ensuring that its marketing and sales activities comply with all applicable laws (including competition law, consumer protection, and data privacy).</p>
            <p className="mt-4"><strong>3.3. First Level Support:</strong> The Reseller shall provide First Level Support to its End Users. The Provider is only responsible for Second Level Support (technical bugs) towards the Reseller, not directly towards End Users.</p>
            <p className="mt-4"><strong>3.4. Prohibited Acts:</strong> The Reseller shall not make any representations, warranties, or guarantees to End Users concerning the Service that are inconsistent with or in addition to those made by the Provider.</p>
          </section>

          {/* Account Ownership */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              4. Account Ownership & Disputes
            </h2>
            <p><strong>4.1. Account Ownership:</strong> The Provider considers the <strong>Account Owner</strong> to be the legal entity or individual who legally controls the billing relationship with the Provider.</p>
            <p className="mt-4"><strong>4.2. Disputes between Reseller and End User:</strong></p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The Provider is a technical infrastructure provider and is <strong>not a party</strong> to the agreement between Reseller and End User.</li>
              <li>In the event of a dispute regarding ownership or control of a sub-account (e.g., between the Reseller and their client), the Provider will strictly follow the instructions of the Reseller (the Account Owner), unless presented with a binding court order properly served in Germany directing otherwise.</li>
              <li>The Reseller indemnifies the Provider against any claims arising from the Provider&apos;s execution of the Reseller&apos;s instructions regarding sub-account access or deletion.</li>
            </ul>
          </section>

          {/* Fees and Payment */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              5. Fees and Payment
            </h2>
            <p><strong>5.1. Reseller Fees:</strong> The Reseller pays the Provider the agreed wholesale/partner fees for the Service tiers.</p>
            <p className="mt-4"><strong>5.2. End User Pricing:</strong> The Reseller is free to determine the resale price to its End Users.</p>
            <p className="mt-4"><strong>5.3. Taxes:</strong> All fees are net of VAT. The Reseller is responsible for collecting and remitting applicable taxes from its End Users.</p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              6. Intellectual Property
            </h2>
            <p><strong>6.1. Provider Rights:</strong> The Provider retains all right, title, and interest in and to the Service, including all source code, software, and underlying technology.</p>
            <p className="mt-4"><strong>6.2. Restrictions:</strong> The Reseller may not reverse engineer, decompile, or otherwise attempt to derive source code from the Service.</p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              7. Data Protection
            </h2>
            <p><strong>7.1. Roles:</strong> The parties acknowledge that regarding End User data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The End User is typically the <strong>Controller</strong>.</li>
              <li>The Reseller is a <strong>Processor</strong> (providing the white-label service).</li>
              <li>The Provider is a <strong>Sub-Processor</strong> (providing the infrastructure).</li>
            </ul>
            <p className="mt-4"><strong>7.2. DPA:</strong> The parties shall execute the separate <strong>Data Processing Agreement (DPA)</strong> attached to this Agreement (or the standard DPA provided by Provider).</p>
          </section>

          {/* Liability */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              8. Liability (Haftung)
            </h2>
            <p><strong>8.1. Unlimited Liability:</strong> The Provider is liable without limitation for damages caused by intent (<em>Vorsatz</em>) or gross negligence (<em>grobe Fahrlässigkeit</em>), and for injury to life, body, or health.</p>
            <p className="mt-4"><strong>8.2. Limited Liability:</strong> For simple negligence (<em>leichte Fahrlässigkeit</em>), the Provider is liable only for the breach of material contractual obligations (<em>Kardinalspflichten</em>), limited to the foreseeable damage typical for this type of contract.</p>
            <p className="mt-4"><strong>8.3. Indirect Damages:</strong> Liability for indirect damages, consequential harm caused by a defect, or lost profits is excluded in cases of simple negligence, unless such damages result from the breach of a written guarantee given by the Provider.</p>
            <p className="mt-4"><strong>8.4. Aggregate Cap:</strong> To the extent permitted by law, the Provider&apos;s total liability for all claims arising out of or in connection with this Agreement in any contract year shall not exceed the total fees paid by the Reseller to the Provider in the twelve (12) months immediately preceding the event giving rise to the claim.</p>
          </section>

          {/* Term and Termination */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              9. Term and Termination
            </h2>
            <p><strong>9.1. Term:</strong> This Agreement remains in effect until terminated by either party.</p>
            <p className="mt-4"><strong>9.2. Termination for Convenience:</strong> Either party may terminate this Agreement with 30 days&apos; written notice to the end of a month.</p>
            <p className="mt-4"><strong>9.3. Effect of Termination:</strong> Upon termination, the Reseller&apos;s right to resell the Service ceases. The Provider gives the Reseller a reasonable grace period (not exceeding 30 days) to migrate End User data off the platform.</p>
          </section>

          {/* Final Provisions */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              10. Final Provisions
            </h2>
            <p><strong>10.1. Governing Law:</strong> Laws of the Federal Republic of Germany.</p>
            <p className="mt-4"><strong>10.2. Jurisdiction:</strong> Pasewalk, Germany.</p>
            <p className="mt-4"><strong>10.3. Severability:</strong> If any provision of this Agreement is invalid, the remainder shall remain in full force and effect.</p>
          </section>

        </div>
      </div>

      {/* CTA */}
      <div className="mt-16">
        <div className={cn("rounded-2xl p-8 transition-colors duration-300", theme.cta)}>
          <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
            Interested in Becoming a Reseller?
          </h3>
          <p className={cn("mb-6", theme.muted)}>
            Contact us to discuss partnership opportunities and receive a customized agreement.
          </p>
          <a
            href="mailto:info@voundbrand.com?subject=Reseller%20Partnership%20Inquiry"
            className={cn("inline-block px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-80",
              "bg-foreground text-background"
            )}
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Related Links */}
      <div className="mt-8">
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
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ResellerPage() {
  return (
    <ContentPageLayout>
      <ResellerContent />
    </ContentPageLayout>
  );
}
