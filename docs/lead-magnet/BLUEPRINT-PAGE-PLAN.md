# Lead Magnet Landing Page — /blueprint

## Summary
Build a new Hormozi-style lead magnet landing page at `/blueprint`. Single headline, hero image of the lead magnet, 5-step multi-step form, thank-you state with video CTA and second offer. Stores leads in Convex, sends delivery email via Resend (with download link to PDF hosted on Convex storage), syncs to CRM.

**Lead magnet:** "The Recurring Revenue Blueprint" — a PDF guide for agency owners covering: bottleneck diagnostic, client packaging framework, 2-hour onboarding system, ROI pitch script, 6 funnel templates by vertical, and scaling math. PDF will be hosted on a public Convex storage URL.

**The existing /linktree page stays as-is.** This is a new page at /blueprint.

---

## Files to Create/Modify

| File | Action |
|---|---|
| `convex/schema.ts` | Add `leadMagnetLeads` table |
| `convex/leadMagnetLeads.ts` | **New** — store/query mutations |
| `src/lib/email-templates/lead-magnet-customer.ts` | **New** — delivery email with PDF download link |
| `src/lib/email-templates/lead-magnet-sales.ts` | **New** — sales notification template |
| `src/app/api/lead-magnet/submit/route.ts` | **New** — API endpoint (follows application/submit pattern) |
| `src/translations/landing.ts` | Add new `blueprint` section (EN + DE) |
| `src/components/lead-magnet-form.tsx` | **New** — multi-step form component |
| `src/app/blueprint/page.tsx` | **New** — lead magnet landing page |

---

## Step 1: Convex Schema

Add `leadMagnetLeads` table to `convex/schema.ts`:

- **Step 1 fields:** firstName, lastName
- **Step 2 fields:** email
- **Step 3 fields:** countryCode, phone
- **Step 4 fields:** street, city, stateRegion, countryRegion, zip
- **Step 5 fields:** clientCount, monthlyRevenue, teamSize
- **Computed:** agencyStage (aspiring/starter/growing/scaling/established)
- **Tracking:** confirmationEmailSent, salesNotificationSent + timestamps
- **System:** language, submittedAt, source
- **Indexes:** by_email, by_submission_date, by_agency_stage

---

## Step 2: Convex Mutations (`convex/leadMagnetLeads.ts`)

Follow `applicationLeads.ts` pattern:
- `storeLead` mutation — validates, deduplicates (same email within 24h), computes agencyStage, inserts
- `updateEmailTracking` mutation — patches email sent flags
- `getRecentLeads` query — for internal use

**Agency stage logic** (highest tier across dimensions):
- aspiring = no clients + pre-revenue + solo
- starter = 1-3 clients OR under $5k
- growing = 4-10 clients OR $5k-$10k
- scaling = 11-25 clients OR $10k-$25k
- established = 25+ clients OR $25k+

---

## Step 3: Email Templates

**`lead-magnet-customer.ts`** — Follow `application-customer.ts` structure:
- Subject: "Your Recurring Revenue Blueprint is Ready" / DE: "Dein Recurring Revenue Blueprint ist bereit"
- Body: greeting, download link (public Convex storage URL — will be provided as env var or hardcoded), what's inside overview (6 sections), CTA to Skool community
- Personalized stage: "Based on your answers, you are at the [stage] stage"

**`lead-magnet-sales.ts`** — Notification to team@mail.l4yercak3.com with all lead details + agency stage

---

## Step 4: API Route (`/api/lead-magnet/submit`)

Copy structure from `/api/application/submit/route.ts`:
1. Zod schema validation (all form fields + language)
2. `convex.mutation(api.leadMagnetLeads.storeLead, data)`
3. Generate + send customer email (Blueprint delivery with download link)
4. Generate + send sales notification email
5. Fire-and-forget CRM sync
6. Return `{ success, leadId, agencyStage }`

---

## Step 5: Translations (`src/translations/landing.ts`)

Add new `blueprint` object in both `landingEn` and `landingDe`:

```
blueprint: {
  headline, subheadline, socialProof, consent,
  form: {
    previous,
    step1: { question, firstName, lastName, cta },
    step2: { question, email, emailPlaceholder, cta },
    step3: { question, countryCode, phone, cta },
    step4: { question, street, city, stateRegion, countryRegion, zip, cta },
    step5: { question, clientCount, clientCountOptions, monthlyRevenue, monthlyRevenueOptions, teamSize, teamSizeOptions, cta },
    submitting, error,
  },
  thankYou: { headline, stageMessage, stages, watchCta, communityCta, communityDescription },
}
```

**EN headline:** "Get Your Free Recurring Revenue Blueprint — The System Agency Owners Use to Scale Past 20 Clients ...in under 30 seconds."
**DE headline:** German equivalent

---

## Step 6: Multi-Step Form Component (`src/components/lead-magnet-form.tsx`)

- `useState` for formData (all fields), currentStep (1-5), submissionState
- Step-by-step validation before progression
- Framer Motion `AnimatePresence` for step transitions (slide left/right)
- Each step: question headline (keyword bolded), input fields, CTA button, Previous link
- On step 5 submit: POST to `/api/lead-magnet/submit`
- On success: call `onSubmitSuccess(agencyStage)` to trigger thank-you state

**Styling:** Glass-morphism inputs (bg-white/10, border-white/20, text-white), bold full-width CTA button (bg-white text-black uppercase), matches existing linktree aesthetic.

**Phone step:** `<select>` with top ~15 country codes relevant to target market (+1, +49, +44, +43, +41, +33, +31, +34, +39, +46, +47, +45, +48, +351, +353)

---

## Step 7: Page (`src/app/blueprint/page.tsx`)

Structure (top to bottom, mobile-first):

1. **Header** — l4yercak3 logo (left, links to /), hamburger menu (right, links to homepage + pricing)
2. **Headline** — big, bold, centered, white
3. **Sub-headline** — smaller, white/70
4. **Hero image** — Blueprint preview (placeholder div initially, needs real asset later)
5. **Form** — `<LeadMagnetForm>` component OR thank-you state
6. **Social proof** — "Built from 5 years running a marketing agency. Battle-tested with real clients."
7. **Legal consent** — GDPR-friendly text
8. **Footer** — l4yercak3.com link

**Thank-you state** replaces form after submission:
- "Check Your Email for Your Recurring Revenue Blueprint!"
- Stage message: "Congratulations — you are at the [stage] stage"
- CTA: "Watch the Blueprint Walkthrough" (placeholder URL)
- Secondary: "Join the Free Community" → Skool link

Background: use existing `<Background src="/layercake-bg.png" />` with dark overlay.

---

## Step 8: Deploy Convex + Verify

```bash
npx convex dev          # Push schema changes
npm run build           # Verify no type errors
```

Test flow:
1. Visit /blueprint — see lead magnet page
2. Fill out all 5 steps
3. Submit → see thank-you state with correct stage
4. Check Convex dashboard for stored lead
5. Check email inbox for delivery email with download link
6. Check sales email for notification

---

## Reference Files (existing patterns to follow)

- `convex/schema.ts` — existing table definitions
- `convex/applicationLeads.ts` — mutation pattern to follow
- `src/app/api/application/submit/route.ts` — API route pattern to follow
- `src/lib/email-templates/application-customer.ts` — email template pattern
- `src/lib/email-templates/application-sales.ts` — sales notification pattern
- `src/app/linktree/page.tsx` — styling reference (glass-morphism, Background component, Framer Motion)
- `src/components/lead-capture-form.tsx` — form state management pattern
- `src/translations/landing.ts` — translation structure

## Notes

- **The /linktree page stays unchanged.** This is a NEW page at /blueprint.
- **Hero image placeholder:** Use a styled placeholder div for initial implementation. Real mockup to be created separately.
- **Course video:** Thank-you page CTA links to a placeholder URL.
- **PDF download link:** Will be a public Convex storage URL, hardcoded or via env var. Owner will upload the PDF manually.
- **GDPR:** Consent text covers data processing for both EN and DE markets. Address collection needs clear justification.
- **Instagram bio link:** Will point to /blueprint instead of /linktree.
