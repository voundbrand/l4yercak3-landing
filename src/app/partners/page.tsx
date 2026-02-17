'use client';

import { ContentPageLayout, useContentTheme } from '@/components/content-page-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function PartnersContent() {
  const theme = useContentTheme();

  return (
    <article>
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className={cn("font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6 transition-colors duration-300", theme.headings)}>
          Partner Program
        </h1>
        <p className={cn("text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300", theme.muted)}>
          Deploy AI agents for your clients. Under your brand. Keep the margin.
        </p>
      </div>

      <div className={cn("text-lg leading-relaxed space-y-12 transition-colors duration-300", theme.content)}>

        {/* The Pitch */}
        <section>
          <h2 className={cn("font-serif text-2xl italic mb-6 transition-colors duration-300", theme.headings)}>
            You Already Know the Play
          </h2>
          <div className={cn("space-y-4", theme.content)}>
            <p>
              You&apos;ve tried the product. You&apos;ve seen how fast an AI agent goes from conversation to live deployment. Fifteen minutes. No forms. No config screens.
            </p>
            <p>
              Now imagine doing that for every client you manage.
            </p>
            <p>
              Each client gets their own AI employee — built from their stories, deployed on their channels, handling their customers 24/7. You set the price. They pay monthly. You keep the margin.
            </p>
          </div>
        </section>

        {/* The Pain */}
        <section>
          <h2 className={cn("font-serif text-2xl italic mb-6 transition-colors duration-300", theme.headings)}>
            Sound Familiar?
          </h2>
          <div className="space-y-4">
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>&ldquo;Every new client means more work for me personally.&rdquo;</h3>
              <p className={theme.muted}>You&apos;re the bottleneck. Answering messages at 10pm. Onboarding each client manually. You&apos;re capped at 15-20 clients because there&apos;s only one of you — and every new signup means another 5 hours a week you don&apos;t have.</p>
            </div>
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>&ldquo;I&apos;m paying for 6 tools that don&apos;t talk to each other.&rdquo;</h3>
              <p className={theme.muted}>CRM here. Page builder there. Forms in one place, payments in another, booking somewhere else. &euro;600-1,000/month in software — and you&apos;re still the one wiring it all together. Every new client means weeks of setup before they see a single result.</p>
            </div>
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>&ldquo;The platform feels heavy and delay-prone.&rdquo;</h3>
              <p className={theme.muted}>10-second load times. Menus everywhere. A page builder designed for a different decade. Your &ldquo;all-in-one&rdquo; platform can&apos;t even cancel a subscription without opening Stripe in a separate tab. You&apos;re fighting the tool instead of doing the work.</p>
            </div>
          </div>
          <div className={cn("mt-6 p-4 rounded-lg border-l-4 border-blue-500", theme.cta)}>
            <p className={theme.muted}>
              Without a better system, you&apos;ll still be capped at 15 clients. Still onboarding each one manually. Still watching your margins shrink with every new software subscription. The agencies pulling ahead aren&apos;t hiring more people — they&apos;re deploying AI agents that handle the frontline.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className={cn("font-serif text-2xl italic mb-6 transition-colors duration-300", theme.headings)}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", theme.cta)}>
              <div className={cn("text-3xl font-bold mb-3 transition-colors duration-300", theme.headings)}>1</div>
              <h3 className={cn("font-semibold text-lg mb-2 transition-colors duration-300", theme.headings)}>Deploy for Yourself</h3>
              <p className={cn("text-sm", theme.muted)}>
                Start with your own business. See how the agent learns, handles customers, and earns trust. No commitment required.
              </p>
            </div>
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", theme.cta)}>
              <div className={cn("text-3xl font-bold mb-3 transition-colors duration-300", theme.headings)}>2</div>
              <h3 className={cn("font-semibold text-lg mb-2 transition-colors duration-300", theme.headings)}>Deploy for Clients</h3>
              <p className={cn("text-sm", theme.muted)}>
                Same conversation, different business. Have the onboarding talk with your client. Their agent is live in 15 minutes. White-label it under your brand.
              </p>
            </div>
            <div className={cn("p-6 rounded-xl border transition-colors duration-300", theme.cta)}>
              <div className={cn("text-3xl font-bold mb-3 transition-colors duration-300", theme.headings)}>3</div>
              <h3 className={cn("font-semibold text-lg mb-2 transition-colors duration-300", theme.headings)}>Scale</h3>
              <p className={cn("text-sm", theme.muted)}>
                Manage all your clients from one dashboard. Each client sees only their own data. You see everything. Add team members. Add locations. Grow.
              </p>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section>
          <h2 className={cn("font-serif text-2xl italic mb-6 transition-colors duration-300", theme.headings)}>
            What Partners Get
          </h2>
          <div className="space-y-4">
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>White-Label Everything</h3>
              <p className={theme.muted}>Your logo, your colors, your domain. Your clients never see l4yercak3. They see your brand.</p>
            </div>
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>You Set the Price</h3>
              <p className={theme.muted}>Charge what you want. Monthly retainer, per-agent fee, bundled with other services — your business model, your margin.</p>
            </div>
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Multi-Client Dashboard</h3>
              <p className={theme.muted}>Deploy and manage agents across all your clients from a single view. Each client is isolated — their data stays theirs.</p>
            </div>
            <div className={cn("p-4 rounded-lg", theme.quote)}>
              <h3 className={cn("font-semibold mb-2", theme.headings)}>Full Platform Access</h3>
              <p className={theme.muted}>AI agents, CRM, page builder, email, payments, booking — everything your clients need, managed from one place.</p>
            </div>
          </div>
        </section>

        {/* Who this is for */}
        <section>
          <h2 className={cn("font-serif text-2xl italic mb-6 transition-colors duration-300", theme.headings)}>
            Who This Is For
          </h2>
          <div className={cn("space-y-4", theme.content)}>
            <p>
              Marketing agencies. Freelancers. Consultants. Anyone who manages clients and wants to add AI agents as a service without building anything from scratch.
            </p>
            <p>
              If you&apos;re already handling your clients&apos; digital presence — websites, ads, social, CRM — adding an AI employee is the natural next step. It&apos;s recurring revenue that doesn&apos;t require recurring effort.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className={cn("rounded-2xl p-8 text-center transition-colors duration-300", theme.cta)}>
            <h3 className={cn("font-serif text-2xl italic mb-4 transition-colors duration-300", theme.headings)}>
              Start with the Free Plan
            </h3>
            <p className={cn("text-sm mb-6 max-w-xl mx-auto transition-colors duration-300", theme.muted)}>
              Deploy your first agent for free. Try it on your own business. When you&apos;re ready to deploy for clients, upgrade to Pro or Scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" shine>
                <a href="https://app.l4yercak3.com">Start Free</a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className={cn("font-serif text-2xl italic mb-6 transition-colors duration-300", theme.headings)}>
            Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                Do I need a special partner account?
              </h3>
              <p className={theme.muted}>
                No. Any Pro or Scale account can manage multiple clients. The features are built in — white-label, multi-client dashboard, team seats. No separate application process.
              </p>
            </div>
            <div>
              <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                How do I white-label it?
              </h3>
              <p className={theme.muted}>
                Connect your domain. Upload your logo and colors. Your clients log in through your brand — they never see l4yercak3. Available on Scale plans.
              </p>
            </div>
            <div>
              <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                What do I charge my clients?
              </h3>
              <p className={theme.muted}>
                Whatever you want. Most partners charge a monthly retainer per agent (€99-€499/month is common) or bundle it with their existing services. Your pricing, your business model.
              </p>
            </div>
            <div>
              <h3 className={cn("text-xl font-semibold mb-2", theme.headings)}>
                Can my clients see l4yercak3 branding?
              </h3>
              <p className={theme.muted}>
                On Scale plans, no. Everything is white-labeled. On Pro, there&apos;s minimal branding. On Free, l4yercak3 branding is visible.
              </p>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}

export default function PartnersPage() {
  return (
    <ContentPageLayout>
      <PartnersContent />
    </ContentPageLayout>
  );
}
