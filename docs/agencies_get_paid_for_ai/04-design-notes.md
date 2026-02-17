# Design & Component Notes

## Overall design direction

This page should feel like a **business proposal**, not a product tour. The existing landing page speaks to end-users/agencies from a product angle. This page speaks to agencies from a **revenue model** angle.

- Darker, more minimal than the main landing
- Numbers and math should be visually prominent
- Typography-driven — let the copy do the work
- Strategic use of the green accent (`hsl(99 100% 70%)`) for money/profit indicators
- Avoid visual clutter — every element should serve the pitch

## Color treatment

Inherit from the existing dark theme:
- Background: `hsl(240 2% 8%)` (same dark)
- Text: white/gray hierarchy
- Accent: green (`hsl(99 100% 70%)`) for profit numbers, CTAs, positive indicators
- Subtle amber/orange for cost numbers (contrast with green profit)
- Muted gray for secondary info

## Typography

Same font stack as main site:
- **Instrument Serif (italic)** for headlines — gives gravitas
- **Geist Sans** for body copy
- **Geist Mono** for numbers, calculations, token amounts — reinforces the "real math" feel

Using mono for financial numbers is a deliberate choice. When agencies see token costs and margins in a monospace font, it reads like a financial statement, not marketing fluff.

## Component: Three-Layer Model (`three-layer-model.tsx`)

### Visual approach

Three horizontal bands/blocks stacked vertically:

```
┌──────────────────────────────────────────┐
│  LAYER 3: END CUSTOMERS                  │  ← Lightest shade
│  Icons: chat bubble, form, calendar, cart │
│  "Every interaction = tokens consumed"   │
├──────────────────────────────────────────┤
│  LAYER 2: YOUR AGENCY                    │  ← Medium shade + green accent border
│  Icons: settings, palette, dollar sign   │
│  "You configure, brand, and price it"    │
├──────────────────────────────────────────┤
│  LAYER 1: L4YERCAK3                      │  ← Darkest shade
│  Icons: server, brain, workflow          │
│  "We build and maintain the platform"    │
└──────────────────────────────────────────┘
```

**Animations:**
- Layers build up from bottom on scroll (L4YERCAK3 first, then agency, then end customers)
- Animated dots/particles flowing upward (representing tokens)
- Green $ symbols floating up from Layer 3 to Layer 2 (revenue flowing to agency)

**Interaction:**
- Click/hover on each layer to expand details
- Mobile: tap to expand, accordion-style

### Alternative: Concentric circles

```
        ┌─────────────────────────┐
        │    END CUSTOMERS        │
        │   ┌─────────────────┐   │
        │   │  YOUR AGENCY    │   │
        │   │  ┌───────────┐  │   │
        │   │  │ L4YERCAK3 │  │   │
        │   │  └───────────┘  │   │
        │   └─────────────────┘   │
        └─────────────────────────┘
```

- L4YERCAK3 at the core (infrastructure)
- Agency wraps around it (configuration layer)
- End customers on the outside (usage layer)
- Tokens flow inward, money flows outward

## Component: Token Calculator (`token-calculator.tsx`)

### Layout

**Desktop (2-column):**
```
┌─────────────────────┬──────────────────────┐
│                     │                      │
│  INPUTS             │  OUTPUTS             │
│                     │                      │
│  [Clients slider]   │  ┌──────┐ ┌──────┐  │
│  [Tokens slider]    │  │ Rev  │ │ Cost │  │
│  [Markup slider]    │  └──────┘ └──────┘  │
│                     │  ┌────────────────┐  │
│                     │  │  PROFIT (big)  │  │
│                     │  └────────────────┘  │
│                     │  ┌──────┐ ┌──────┐  │
│                     │  │Annual│ │Margin│  │
│                     │  └──────┘ └──────┘  │
│                     │                      │
│                     │  [Kickback tier bar]  │
│                     │                      │
└─────────────────────┴──────────────────────┘
```

**Mobile (stacked):**
```
┌──────────────────────┐
│  INPUTS              │
│  [Clients slider]    │
│  [Tokens slider]     │
│  [Markup slider]     │
└──────────────────────┘
┌──────────────────────┐
│  OUTPUTS             │
│  ┌──────┐ ┌──────┐  │
│  │ Rev  │ │ Cost │  │
│  └──────┘ └──────┘  │
│  ┌────────────────┐  │
│  │  PROFIT (big)  │  │
│  └────────────────┘  │
│  ┌──────┐ ┌──────┐  │
│  │Annual│ │Margin│  │
│  └──────┘ └──────┘  │
└──────────────────────┘
```

### Slider design

- Custom range sliders (not browser defaults)
- Filled track in green accent
- Current value displayed above the thumb
- Input field beside slider for direct number entry
- Subtle tick marks at key intervals

### Number animation

- Use `framer-motion` animate for counting numbers
- When a value changes, the old number morphs to the new one
- Profit number gets a brief green pulse/glow on positive change

## Section transitions

- Subtle dividers between sections — no harsh lines
- Consider a faint gradient or a thin horizontal rule with opacity
- Each section should have generous vertical padding (py-24 to py-32)

## Mobile considerations

- All sections fully responsive
- Calculator sliders need touch-friendly sizing (48px touch targets minimum)
- Three-layer model simplifies to stacked cards on mobile
- FAQ uses native details/summary or headless UI accordion
- CTAs should be sticky on mobile? Consider a floating "Book a Demo" bar

## Illustrations / Visuals

Minimal. This page relies on:
1. Typography and copy
2. The three-layer diagram
3. The token calculator
4. Numbers and data

If any illustrations are used, they should be geometric/abstract — no stock photos, no cartoon characters, no gratuitous icons.

## Animations (Framer Motion)

Keep them purposeful:
- Sections fade + slide up on scroll (`whileInView`)
- Calculator numbers animate on value change
- Three-layer model builds from bottom on scroll
- Token flow particles (optional, only if performant)
- CTAs have subtle hover scale/shadow

Avoid:
- Parallax (distracting)
- Heavy particle effects (performance)
- Bouncing or attention-seeking animations (unprofessional)
