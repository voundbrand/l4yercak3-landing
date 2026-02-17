# Token Calculator — Component Spec

## Purpose

Let agency visitors plug in their own numbers and see projected revenue. This is the highest-impact interactive element on the page. When someone inputs their own numbers and sees profit, they internalize the business model.

## Component

`src/components/token-calculator.tsx` — self-contained client component

## Inputs (sliders + number inputs)

### 1. Number of clients
- Range: 1–100
- Default: 10
- Step: 1
- Label: "How many clients will you onboard?"

### 2. Average monthly token usage per client
- Range: 1,000–500,000
- Default: 10,000
- Step: 1,000
- Label: "Estimated token usage per client/month"
- Helper text: "A typical small business client uses 5K-20K tokens/month"

### 3. Your markup percentage
- Range: 50%–300%
- Default: 150% (i.e., 2.5x the base rate)
- Step: 10%
- Label: "Your markup over base token cost"
- Helper text: "Most agencies charge 150-200% markup"

## Constants (can be adjusted later)

```typescript
const BASE_TOKEN_COST = 0.01; // $ per token — L4YERCAK3's base rate

// Volume kickback tiers
const KICKBACK_TIERS = [
  { threshold: 0,       kickbackRate: 0 },      // 0-49K: no kickback
  { threshold: 50_000,  kickbackRate: 0.05 },    // 50K-99K: 5% kickback
  { threshold: 100_000, kickbackRate: 0.10 },    // 100K-249K: 10% kickback
  { threshold: 250_000, kickbackRate: 0.15 },    // 250K-499K: 15% kickback
  { threshold: 500_000, kickbackRate: 0.20 },    // 500K-999K: 20% kickback
  { threshold: 1_000_000, kickbackRate: 0.25 },  // 1M+: 25% kickback
];
```

**Note:** These numbers are placeholders. Actual pricing/kickback rates should be confirmed with the business team before launch.

## Calculations

```typescript
// Total monthly tokens across all clients
const totalMonthlyTokens = numberOfClients * avgTokensPerClient;

// Find applicable kickback tier
const kickbackRate = getKickbackRate(totalMonthlyTokens);

// Effective cost per token after kickback
const effectiveCostPerToken = BASE_TOKEN_COST * (1 - kickbackRate);

// Agency's total cost
const totalCost = totalMonthlyTokens * effectiveCostPerToken;

// Agency's revenue (what they charge clients)
const markupMultiplier = 1 + (markupPercentage / 100);
const revenuePerToken = BASE_TOKEN_COST * markupMultiplier;
const totalRevenue = totalMonthlyTokens * revenuePerToken;

// Margin
const monthlyMargin = totalRevenue - totalCost;
const annualMargin = monthlyMargin * 12;

// Margin percentage
const marginPercent = ((totalRevenue - totalCost) / totalRevenue) * 100;
```

## Outputs (displayed in real-time as inputs change)

### Primary metrics (large, prominent)

| Metric | Format | Example |
|--------|--------|---------|
| Monthly Revenue | $X,XXX | $2,500 |
| Monthly Cost | $X,XXX | $900 |
| **Monthly Profit** | **$X,XXX** | **$1,600** |
| Annual Profit | $XX,XXX | $19,200 |

### Secondary metrics (smaller, supportive)

| Metric | Format | Example |
|--------|--------|---------|
| Profit margin | XX% | 64% |
| Effective token cost | $0.XXXX | $0.009 |
| Revenue per client | $XXX/mo | $250/mo |
| Your kickback tier | X% | 10% |
| Tokens consumed/month | XXX,XXX | 100,000 |

### Kickback tier indicator

Visual progress bar or tier display showing:
- Current tier and rate
- How many more tokens to reach next tier
- "Add X more clients to reach the next kickback tier" nudge

## Design

- Dark card with subtle border, consistent with site theme
- Sliders should use the brand's green accent (`hsl(99 100% 70%)`) for the filled portion
- Numbers update in real-time (no submit button)
- Smooth number transitions (animate counting up/down)
- Consider `framer-motion` `AnimatePresence` for metric cards
- Mobile: stack inputs vertically, outputs below
- Desktop: inputs on left, outputs on right (or inputs top, outputs bottom)

## Edge cases

- 0 clients → show "Add at least 1 client to see projections"
- Extremely high numbers → cap display, don't break layout
- All outputs should use `Intl.NumberFormat` for locale-aware formatting

## Animation ideas

- When user first scrolls to calculator, animate numbers counting up from 0 to default values
- Subtle pulse on the profit number when inputs change
- Kickback tier bar fills smoothly as token volume increases

## Copy around the calculator

**Above:** "See what your agency could earn"
**Below:** "These numbers are based on L4YERCAK3's current token pricing. Your actual margins depend on how you price AI to your clients. Most agencies charge 2-3x the base token cost."

## CTA after calculator

"Like what you see? Book a demo and we'll build your first client together."
[Book a Demo] button
