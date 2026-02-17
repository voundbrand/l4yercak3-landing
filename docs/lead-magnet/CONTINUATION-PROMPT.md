# Continuation Prompt — Build /blueprint Lead Magnet Page

Copy everything below this line and paste it as your prompt in a fresh Claude Code session:

---

## Task

Build a Hormozi-style lead magnet landing page at `/blueprint` for the l4yercak3 Next.js app. This is a new page — the existing `/linktree` page stays unchanged.

## What We're Building

A lead magnet page for "The Recurring Revenue Blueprint" — a free PDF guide for marketing agency owners. The page has one job: get them to fill out a 5-step form so we can email them the Blueprint.

**Modeled after:** Hormozi's acquisition.com/roadmap page — single headline, lead magnet preview image, multi-step form (one question per step), thank-you state.

## The Full Implementation Plan

Read the plan file first — it has every detail:

```
cat docs/lead-magnet/BLUEPRINT-PAGE-PLAN.md
```

## Reference Files to Read Before Starting

These existing files contain the exact patterns to follow. Read them all first:

1. **Convex schema** — `convex/schema.ts` (add new table here)
2. **Convex mutations pattern** — `convex/applicationLeads.ts` (copy this pattern)
3. **API route pattern** — `src/app/api/application/submit/route.ts` (copy this pattern)
4. **Email template pattern** — `src/lib/email-templates/application-customer.ts` and `src/lib/email-templates/application-sales.ts`
5. **Email delivery** — `src/lib/email-delivery/resend-client.ts` (sendEmailWithRetry, getSenderConfig, etc.)
6. **CRM integration** — `src/lib/crm-integration/backend-client.ts` (fire-and-forget sync)
7. **Page styling reference** — `src/app/linktree/page.tsx` (glass-morphism, Background component, Framer Motion animations)
8. **Form pattern** — `src/components/lead-capture-form.tsx` (form state management with useState)
9. **Translations** — `src/translations/landing.ts` (add new `blueprint` section to both EN and DE)
10. **UI components** — `src/components/ui/input.tsx`, `src/components/ui/button.tsx`

## Files to Create/Modify (in order)

1. `convex/schema.ts` — Add `leadMagnetLeads` table
2. `convex/leadMagnetLeads.ts` — **New** — storeLead mutation, updateEmailTracking, getRecentLeads
3. `src/lib/email-templates/lead-magnet-customer.ts` — **New** — Blueprint delivery email with download link
4. `src/lib/email-templates/lead-magnet-sales.ts` — **New** — Sales notification
5. `src/app/api/lead-magnet/submit/route.ts` — **New** — API endpoint
6. `src/translations/landing.ts` — Add `blueprint` section to both `landingEn` and `landingDe`
7. `src/components/lead-magnet-form.tsx` — **New** — 5-step form component
8. `src/app/blueprint/page.tsx` — **New** — The lead magnet page

## The 5-Step Form

Each step is one screen with Framer Motion transitions:

| Step | Question | Fields | CTA |
|---|---|---|---|
| 1 | "What's your **name**?" | firstName, lastName | "LET'S START" |
| 2 | "Where should I **email** it to?" | email | "CONTINUE" |
| 3 | "What is your **phone number**?" | countryCode (select), phone | "CONTINUE" |
| 4 | "What's your **shipping address**?" | street, city, stateRegion, countryRegion, zip | "CONTINUE" |
| 5 | "Where are you in your **agency journey**?" | 3 dropdowns: clientCount, monthlyRevenue, teamSize | "GET MY BLUEPRINT" |

Steps 2-5 show a "Previous" link.

## Agency Stage Computation (Step 5 → thank-you page)

Computed server-side from the 3 dropdown values. Use highest tier across dimensions:
- **aspiring** = no clients + pre-revenue + solo
- **starter** = 1-3 clients OR under $5k
- **growing** = 4-10 clients OR $5k-$10k
- **scaling** = 11-25 clients OR $10k-$25k
- **established** = 25+ clients OR $25k+

## Thank-You State

Replaces the form after successful submission:
- "Check Your Email for Your Recurring Revenue Blueprint!"
- "Congratulations — you are at the [Aspiring Agency Owner / Early-Stage Agency / Growing Agency / Scaling Agency / Established Agency] stage."
- CTA: "Watch the Blueprint Walkthrough" (placeholder URL for now)
- Secondary: "Join the Free Community" → https://www.skool.com/der-hebel-1168/about

## Design

- Dark background with glass-morphism (matches existing /linktree page)
- Background component: `<Background src="/layercake-bg.png" />`
- Inputs: `bg-white/10 border-white/20 text-white placeholder:text-white/40`
- CTA buttons: `bg-white text-black font-bold uppercase tracking-wide py-4 rounded-xl w-full`
- Mobile-first (most traffic from Instagram)
- Hero image: use a styled placeholder div for now

## PDF Delivery

The email sends a download link to the PDF. For now, use a placeholder URL:
```
const BLUEPRINT_DOWNLOAD_URL = process.env.BLUEPRINT_PDF_URL || 'https://l4yercak3.com/blueprint/download';
```

The real URL will be a public Convex storage link added later.

## After Building

```bash
npx convex dev    # Push schema changes
npm run build     # Verify no type errors
```

Then test the full flow: visit /blueprint → fill all 5 steps → submit → see thank-you → check Convex dashboard → check email.
