'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function DPAContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Data Processing Agreement
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          Standard DPA for GDPR compliance
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className={cn("text-lg leading-relaxed space-y-8 transition-colors duration-300", theme.content)}>

          {/* Parties */}
          <section>
            <div className={cn("p-6 rounded-lg", theme.quote)}>
              <p className="font-semibold">Between</p>
              <p className="mt-2">The generic customer / user of the Software, hereinafter referred to as <strong>&quot;Controller&quot;</strong></p>
              <p className="mt-4 font-semibold">And</p>
              <p className="mt-2">
                <strong>Vound Brand UG (haftungsbeschränkt)</strong><br />
                Am Markt 11<br />
                17309 Pasewalk<br />
                Germany<br />
                hereinafter referred to as <strong>&quot;Processor&quot;</strong>
              </p>
              <p className="mt-4">(Controller and Processor hereinafter referred to as <strong>&quot;Parties&quot;</strong>)</p>
            </div>
          </section>

          {/* Preamble */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              1. Preamble
            </h2>
            <p>
              This Data Processing Agreement (&quot;DPA&quot;) specifies the data protection obligations of the Parties arising from the processing of personal data by the Processor on behalf of the Controller in connection with the main service agreement (&quot;Main Agreement&quot;) for the use of the Vound Brand software. This DPA applies to all activities in which the Processor or its subcontractors come into contact with personal data of the Controller.
            </p>
          </section>

          {/* Subject Matter */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              2. Subject Matter and Duration
            </h2>
            <p><strong>2.1. Subject Matter:</strong> The subject matter of the processing is the execution of the following services: Provision of a SaaS platform for content generation and management, user administration, and AI-based processing.</p>
            <p className="mt-4"><strong>2.2. Duration:</strong> The term of this DPA corresponds to the term of the Main Agreement. It ends automatically with the termination of the Main Agreement.</p>
          </section>

          {/* Nature and Purpose */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              3. Nature and Purpose of Processing
            </h2>
            <p>The nature and purpose of the processing of personal data by the Processor is defined in the Main Agreement. This includes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Hosting and storage of data.</li>
              <li>Processing of text and media inputs via AI models.</li>
              <li>User management and authentication.</li>
              <li>Support and maintenance services.</li>
            </ul>
          </section>

          {/* Categories */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              4. Categories of Data and Data Subjects
            </h2>
            <p><strong>4.1. Categories of Data:</strong></p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>User account data (Name, Email, Password hashes, Role).</li>
              <li>Content data (Text inputs, Generated text, File uploads).</li>
              <li>Connection data (IP addresses, Logfiles).</li>
              <li>Billing data.</li>
            </ul>
            <p className="mt-4"><strong>4.2. Categories of Data Subjects:</strong></p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Employees/Staff of the Controller.</li>
              <li>End-customers of the Controller (if Agency/Reseller model applies).</li>
              <li>Partners or suppliers of the Controller.</li>
            </ul>
          </section>

          {/* Controller Rights */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              5. Rights and Obligations of the Controller
            </h2>
            <p><strong>5.1.</strong> The Controller is responsible for compliance with the statutory provisions on data protection, in particular for the lawfulness of the data transfer to the Processor and the lawfulness of the data processing (&quot;Controller&quot; pursuant to Art. 4 No. 7 GDPR).</p>
            <p className="mt-4"><strong>5.2.</strong> The Controller is entitled to issue instructions concerning the nature, scale, and method of data processing. Instructions can be given in writing or electronically.</p>
          </section>

          {/* Processor Duties */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              6. Duties of the Processor
            </h2>
            <p><strong>6.1. Processing on Instructions:</strong> The Processor shall process the personal data only on documented instructions from the Controller, unless required to do so by Union or Member State law to which the Processor is subject.</p>
            <p className="mt-4"><strong>6.2. Confidentiality:</strong> The Processor ensures that persons authorized to process the personal data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.</p>
            <p className="mt-4"><strong>6.3. Security:</strong> The Processor takes all measures required pursuant to Article 32 GDPR (Technical and Organizational Measures - TOMs) to ensure a level of security appropriate to the risk.</p>
            <p className="mt-4"><strong>6.4. Subprocessors:</strong> The Controller grants the Processor general authorization to engage other processors (subprocessors). The Processor shall inform the Controller of any intended changes concerning the addition or replacement of other processors. The same data protection obligations as set out in this DPA shall be imposed on that other processor.</p>
            <p className="mt-4"><strong>6.5. Data Subject Rights:</strong> The Processor shall assist the Controller by appropriate technical and organizational measures, insofar as this is possible, for the fulfillment of the Controller&apos;s obligation to respond to requests for exercising the data subject&apos;s rights.</p>
            <p className="mt-4"><strong>6.6. Assistance:</strong> The Processor assists the Controller in ensuring compliance with the obligations pursuant to Articles 32 to 36 GDPR taking into account the nature of processing and the information available to the Processor.</p>
            <p className="mt-4"><strong>6.7. Deletion/Return:</strong> At the choice of the Controller, the Processor deletes or returns all the personal data to the Controller after the end of the provision of services relating to processing, and deletes existing copies unless Union or Member State law requires storage of the personal data.</p>
          </section>

          {/* Audit Rights */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              7. Audit Rights
            </h2>
            <p>
              The Controller has the right to audit the Processor&apos;s compliance with this DPA. Inspections may be conducted by the Controller or an auditor mandated by the Controller. The Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in Article 28 GDPR.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              8. International Transfers
            </h2>
            <p>
              Data processing takes place primarily within the EU/EEA. If data is transferred to a third country (e.g., USA via sub-processors like Stripe or OpenAI), the Processor ensures that the requirements of Art. 44 et seq. GDPR are met (e.g., through EU Standard Contractual Clauses or an Adequacy Decision).
            </p>
          </section>

          {/* Final Provisions */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              9. Final Provisions
            </h2>
            <p><strong>9.1.</strong> In case of contradictions between this DPA and other agreements between the Parties, this DPA shall prevail.</p>
            <p className="mt-4"><strong>9.2.</strong> Amendments and supplements to this DPA must be made in writing.</p>
            <p className="mt-4"><strong>9.3.</strong> This DPA is governed by German law. The place of jurisdiction is Pasewalk, Germany.</p>
          </section>

          {/* Annexes */}
          <section>
            <h2 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Annexes
            </h2>
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <p className="font-semibold">Annex 1: Technical and Organizational Measures (TOMs)</p>
              <p className="mt-2">Reference is made to the Processor&apos;s security documentation, which includes Encryption, Access Control, Physical Security, and Availability Control.</p>
            </div>
            <div className={cn("p-4 rounded-lg mt-4", theme.quote)}>
              <p className="font-semibold">Annex 2: List of Subprocessors</p>
              <p className="mt-2">Current list available upon request at info@voundbrand.com</p>
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
            <Link href="/reseller" className={cn("underline hover:opacity-80 transition-opacity", theme.content)}>
              Reseller Agreement
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DPAPage() {
  return (
    <ContentPageLayout>
      <DPAContent />
    </ContentPageLayout>
  );
}
