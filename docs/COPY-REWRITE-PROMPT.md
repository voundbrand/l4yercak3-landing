# Copy Rewrite: Coordinated Push Across All Pages

## Context

You are rewriting copy across the l4yercak3 landing site to align every page with a single new positioning:

**Old story:** "White-label SaaS platform with CRM, payments, booking, email for agencies."
**New story:** "Deploy an AI employee for your client through a conversation. It learns the business, handles customer inquiries on WhatsApp, Telegram, or web — 24/7. You set the price and earn recurring revenue."

The product has a Telegram-based onboarding agent that interviews agency owners about their client's business, creates an AI agent from that conversation (using stories and roleplay, not forms), and deploys it on any messaging channel. The agent earns autonomy over time — starts by asking about everything, gradually handles more independently, and always knows when to escalate to a human. Agency owners approve every change. The agent never goes rogue and never forgets who the business is.

White-label, CRM, payments, booking, email — all still exist in the platform. They're just not the headline anymore. They're supporting features. The headline is: speed to revenue through AI agents deployed via conversation.

The platform is channel-agnostic: agents can be deployed on WhatsApp, Telegram, web chat, or any channel the client's customers already use.

## Strategic Principles

1. **Lead with the AI agent, not the tooling.** The hero promise is deploying an AI employee, not configuring a dashboard.
2. **Setup is a conversation, not a form.** The onboarding agent asks about the business through stories and roleplay. "Tell me about a time a customer was upset." Not 47 config fields.
3. **Trust through graduated autonomy.** The agent earns independence like a new hire: Week 1 asks about everything, Month 2 handles 80% independently. The agency owner approves every step.
4. **Anti-hype positioning.** The ICP (agency owners, 1-10 person teams, marketing backgrounds) is deeply skeptical of AI promises. Lean into what the AI *can't* do (escalation, human handoff) as a trust signal.
5. **Speed to revenue.** First client's agent can be live in 15 minutes. No learning curve. No onboarding calls. Have a conversation, deploy, get paid.
6. **Channel-agnostic.** Never lock messaging to one channel. Always say "WhatsApp, Telegram, or your website" or similar.

## Files to Modify

### 1. Landing page translations (BIGGEST CHANGE)

**Files:** `src/translations/landing.ts` (contains both `landingEn` and `landingDe`)

#### Hero
```
Current EN headline: "Deploy AI for your clients. Under your brand. In minutes."
Current EN subheadline: "White-label client portals, CRM, payments, booking, email — one platform for agencies and freelancers who are done duct-taping 6 tools together. Fast. Simple. Built for how you actually work."

New EN headline: "Deploy an AI employee for your client. Live in 15 minutes."
New EN subheadline: "Start a conversation with our agent. It learns your client's business through stories, not forms. Their customers reach it on WhatsApp, Telegram, or your website — 24/7. You set the price."
New EN CTA: "Start Free" (keep)
New EN ctaSecondary: "See it work" (change from "Watch the demo")
```

#### Problem section
Keep the 3 pain cards (graveyard, loop, catch22) — they're still valid. Update the stakes ending:

```
Current EN stakes ending: "You're building a job, not a business. And the tools you're paying €300/month for were built in 2018. Deep down, you already know: this isn't going to get better."

New EN stakes ending: "You're building a job, not a business. And the tools you're paying €300/month for were built in 2018. Deep down, you already know: this isn't going to get better.\n\nMeanwhile, the agencies pulling ahead aren't hiring more people. They're deploying AI agents that handle the frontline — and only bring in a human when it actually matters."
```

#### Plan section (full rewrite of 3 steps)
```
New EN header: "Here's How It Works" (keep)

Step 1:
  title: "Have a Conversation"
  description: "Talk to our onboarding agent. It asks about your client's business — what they do, how they handle customers, what should never be promised. Share a few stories. No forms. No config screens."

Step 2:
  title: "It Builds the Agent"
  description: "From that conversation, it creates an AI agent with your client's voice, boundaries, and personality. It knows when to help and when to hand off to a human. Review it, tweak it, approve it."

Step 3:
  title: "Deploy & Earn"
  description: "Your client's agent goes live on WhatsApp, Telegram, web — wherever their customers already are. You set the price. Recurring revenue from day one. The agent gets smarter every week."
```

#### Success section
```
New EN timeframe: "After 15 minutes:"

New EN vision items:
  item1: "Your client's AI agent is live and handling customer inquiries"
  item2: "Bookings, FAQs, follow-ups — handled 24/7 without you touching it"
  item3: "The agent knows when something needs a human — and escalates cleanly"
  item4: "You set the price. Your client pays monthly. You keep the margin."

New EN contrast: "You don't need more tools. You don't need more hours. You need an AI employee that learns the business, handles the frontline, and gets smarter every week — without forgetting who it works for."
```

#### Features section
Add a new feature key `ai` as the LEAD feature. Move `multiTenant` (white-label) down into the regular grid. The `ai` feature replaces `multiTenant` in the spotlight position.

```
New EN ai feature:
  title: "AI Agents That Earn Trust"
  description: "Each agent starts with your client's stories — not a template. Week 1: it asks about everything. Month 2: it handles 80% independently. It knows when to escalate. You approve every change. It never goes rogue."
```

In `page.tsx`, update the features section: the `ai` key gets the spotlight card (currently `multiTenant`), and add `multiTenant` as the 7th item in the feature grid array: `['crm', 'builder', 'email', 'payments', 'booking', 'comms', 'multiTenant']`. Also add `'ai'` rendering in the spotlight position where `multiTenant` currently is.

Update the features header:
```
Current EN: "Everything You Need. Nothing You Don't."
New EN: "Everything Your Agents Need. Nothing They Don't."
```

#### Final CTA
```
New EN header: "Your First Client's Agent Can Be Live Today."
New EN push: "Talk to our agent. Deploy your first client's AI employee in 15 minutes.\n\nNo credit card. No onboarding calls. No learning curve.\nHave a conversation. Deploy. Get paid."
New EN cta: "Start Free" (keep)
New EN ctaSecondary: "See it work"
New EN objectionHandler: "Free to start. AI that escalates to humans when unsure — no rogue chatbots. WhatsApp, Telegram, web — every channel. You set your own client pricing. Cancel anytime."
```

#### Urgency pill
```
New EN: "Free plan available — Deploy Your First Agent Today"
```

#### German translations
Create matching DE translations for every EN change above. Match the tone and directness of the existing DE copy. Key terms:
- AI employee = KI-Mitarbeiter
- Deploy = deployen (they use the English loanword)
- Conversation = Gespräch
- Stories = Geschichten
- Escalate = eskalieren
- Recurring revenue = wiederkehrende Einnahmen
- Approve = genehmigen
- Goes rogue = außer Kontrolle geraten

### 2. Landing page component

**File:** `src/app/page.tsx`

Changes needed:
- In the features section, swap the spotlight card from `multiTenant` to `ai`
- Add `multiTenant` to the feature grid array (making it 7 items, which is fine for a 3-col grid)
- The spotlight card JSX stays the same, just references `ai` instead of `multiTenant`

### 3. Pricing translations

**File:** `src/translations/en.ts` (pricing section)

Update tier descriptions to mention AI agents:
```
free.description: "For solo creators deploying their first AI agent."
pro.description: "For agencies deploying agents across multiple clients."
agency.description: "For agencies managing AI workforces at scale."
```

Update subtitle:
```
Current: "Simple, transparent pricing for teams of every size. Start free, upgrade when you're ready."
New: "Simple, transparent pricing. Deploy your first agent free, scale when you're ready."
```

### 4. Docs hub

**File:** `src/app/docs/page.tsx`

Replace the "About l4yercak3" section (lines 130-140):
```
Current: "l4yercak3 is a retro desktop-style workflow platform..."
New: "l4yercak3 is an AI agent platform for agencies. Deploy AI employees for your clients — agents that learn the business through conversation, handle customer inquiries on any channel, and get smarter every week. Built for agencies and freelancers who want recurring revenue without recurring effort."
```

Replace the "Key Features" section items with:
- "Conversational Onboarding" — "Set up a client's AI agent through a conversation, not a form. Share stories about how the business works. The agent builds itself."
- "Multi-Channel Deployment" — "Deploy agents on WhatsApp, Telegram, web chat, or any channel your client's customers already use."
- "Graduated Autonomy" — "Agents start cautious and earn independence over time. You approve every change. They never go rogue."
- "White-Label & CRM" — "Full platform with CRM, payments, booking, email, and white-label client portals under your brand."

### 5. Docs quickstart

**File:** `src/app/docs/quickstart/page.tsx`

Rewrite the 4 steps to match the actual onboarding flow:
1. "Create an Account" — keep, but simplify
2. "Start the Onboarding Conversation" — "Open the onboarding agent. It asks about your client's business in natural language — what they do, how they handle customers, what the AI should never say."
3. "Share Your Client's Stories" — "The agent asks for real stories: 'Tell me about a time a customer was upset.' 'What happens when someone asks for a price?' Your answers become the agent's identity — not config fields."
4. "Deploy on Any Channel" — "Your client's agent goes live on WhatsApp, Telegram, or web. Their customers get instant responses 24/7. You earn recurring revenue."

### 6. Support page

**File:** `src/app/support/page.tsx`

Keep existing Vercel FAQ section but add a new "AI Agents" FAQ section BEFORE the Vercel section with these questions:

- "How do I create an AI agent for my client?" — "Start a conversation with our onboarding agent. It will ask about your client's business and build the agent from your answers. No forms or configuration needed."
- "What if the AI says something wrong?" — "Every agent knows when to escalate to a human. It starts cautious and only handles more as you approve. You control what it can and can't do."
- "Which channels can agents use?" — "WhatsApp, Telegram, and web chat. Deploy on one or all — the agent adapts to each channel."
- "Does the agent get smarter over time?" — "Yes. The agent observes its own conversations, proposes improvements, and waits for your approval before changing anything. It gets better every week without losing the client's voice."

### 7. Linktree

**File:** `src/app/linktree/page.tsx`

Update the tagline and platform link copy. These are in `src/translations/landing.ts` under `linktree`:
```
New EN headline: "AI employees for your clients. Live in 15 minutes."
New EN tagline: "l4yercak3 — Deploy AI agents on WhatsApp, Telegram, web. Set your price. Earn recurring revenue."
New EN platform.title: "Deploy Your First Agent"
New EN platform.description: "AI agents that learn your client's business. Free to start."
```

### 8. Footer tagline

**File:** `src/translations/en.ts` (footer section)

```
Current: "Built for marketers who ship."
New: "AI employees for your clients."
```

### 9. Blueprint lead magnet (light touch)

**File:** `src/translations/landing.ts` (blueprint section)

```
Current EN headline: "Get Your Personalized Recurring Revenue Blueprint"
New EN headline: "Get Your AI Agent Revenue Blueprint"

Current EN headlineSuffix: "Tailored to Where You Are Right Now"
New EN headlineSuffix: "Tailored to Your Agency's Stage"

Current EN subheadline: "Answer a few questions. Get a blueprint built for where you are right now."
New EN subheadline: "Answer a few questions. Get a blueprint for deploying AI agents and building recurring revenue."

Current EN socialProof: "Built from 5 years running a marketing agency. Battle-tested with real clients."
New EN socialProof: "Built from 5 years running an agency and deploying AI agents for real clients."
```

## What NOT to Change

- Legal pages (privacy, terms, cookies, EULA, DPA, data-deletion) — leave as-is
- Reseller agreement — leave as-is
- Integration docs (Vercel, GitHub, Microsoft) — leave as-is, they document real integrations
- The guide/founder story section on the landing page — leave as-is, it's authentic and still relevant
- The affiliate section in translations — it's archived/unused
- Client logos / integration logos — leave as-is
- The `dev/pdf-preview` page — leave as-is

## Implementation Order

1. `src/translations/landing.ts` — all landing, linktree, and blueprint copy (EN + DE)
2. `src/translations/en.ts` — pricing descriptions, footer tagline
3. `src/translations/de.ts` — matching DE for pricing and footer
4. `src/app/page.tsx` — features section restructure (ai spotlight, multiTenant to grid)
5. `src/app/docs/page.tsx` — about section + features rewrite
6. `src/app/docs/quickstart/page.tsx` — 4-step rewrite
7. `src/app/support/page.tsx` — add AI agent FAQ section
8. Run `npm run build` to verify no broken translation keys or type errors

## Tone Guidelines

- Direct, second-person ("you", "your client")
- Short sentences. Punchy. No fluff.
- Anti-hype: lean into limitations (escalation, human handoff) as trust signals
- "AI employee" not "AI chatbot" — the ICP thinks in terms of hiring, not software
- Never use: "revolutionary", "game-changing", "cutting-edge", "powered by AI"
- Allowed: "AI agent", "AI employee", "handles", "learns", "earns trust", "escalates"
- The "training a new hire" metaphor is the core mental model: Week 1 asks about everything, Month 2 handles 80% independently
- Keep the existing voice — the founder story section is the tone benchmark
