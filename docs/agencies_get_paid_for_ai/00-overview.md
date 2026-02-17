# Agency Landing Page — Working Document

## What this page is

A standalone landing page that sells L4YERCAK3 to **agency owners and operators**. The pitch: give your clients AI-powered tools, earn money every time they use them.

This is NOT a product page. It's a revenue model pitch wrapped in a product demonstration.

## Who we're talking to

- Agency owners running 5-50 person shops
- They sell services (web, marketing, automation, consulting)
- They know AI is coming but don't have a productized way to deliver it
- They want recurring revenue, not just project fees
- They're skeptical of "AI platforms" because most are overhyped and underbuilt

## The one sentence

> Your clients need AI. You should be the one selling it to them — and earning every time they use it.

## Page URL

`/agencies` or `/for-agencies`

## Technical approach

- New page at `src/app/agencies/page.tsx` (or `for-agencies`)
- Reuse existing component patterns (Framer Motion animations, reading mode, i18n)
- Add translations to `src/translations/landing.ts` under an `agencies` namespace
- Interactive token calculator as a self-contained client component
- Demo request form connected to Convex CRM (existing pattern from lead capture)
- Same dark theme as main landing, no sepia mode needed for this page

## Files to create

```
src/app/agencies/page.tsx          — Main page component
src/components/token-calculator.tsx — Interactive token economics calculator
src/components/three-layer-model.tsx — Visual diagram of the three layers
```

## Files to modify

```
src/translations/landing.ts        — Add agencies namespace (EN)
src/translations/de.ts             — Add agencies namespace (DE) — later
src/components/footer.tsx           — Add link to agencies page
```
