# Reddit Warm-Up Chrome Extension — Dev Spec

## What This Is

A Chrome extension that helps a founder do Reddit organic outreach efficiently. It sits on Reddit pages, reads the thread, and uses Claude (via OpenRouter) to draft genuine, helpful replies — informed by deep product/ICP context files.

This is NOT a bot. It does NOT auto-post. The founder reads, reviews, edits, and posts manually. The extension just removes the blank-page problem and helps craft responses that are genuinely helpful while being informed by the product's positioning.

---

## Core User Flow

1. Founder opens the extension popup → sees saved subreddit list
2. Clicks a subreddit → opens it in a new tab
3. Browses threads → finds a relevant one → clicks the extension icon (or keyboard shortcut)
4. Extension reads the thread title, body, and top comments
5. Extension sends thread content + context files to Claude via OpenRouter
6. Claude returns 1-2 draft reply options
7. Founder reviews, edits, copies to clipboard, and pastes into Reddit's reply box
8. Founder can flag the thread as "replied" or "save for later"

---

## Architecture

```
┌─────────────────────────────────┐
│  Chrome Extension (Manifest V3) │
│                                 │
│  ├── popup.html/js              │  ← Subreddit list, settings, history
│  ├── content-script.js          │  ← Reads Reddit page DOM
│  ├── background.js (service worker) │  ← Handles OpenRouter API calls
│  └── storage (chrome.storage)   │  ← API key, subreddits, context, history
│                                 │
└──────────┬──────────────────────┘
           │ HTTPS
           ▼
┌─────────────────────────────────┐
│  OpenRouter API                 │
│  POST https://openrouter.ai/api/v1/chat/completions
│  Model: anthropic/claude-opus-4.5 (or configurable)
│  Auth: Bearer {OPENROUTER_API_KEY}
└─────────────────────────────────┘
```

**No backend required.** The extension calls OpenRouter directly. API key is stored in `chrome.storage.local` (encrypted at rest by Chrome).

---

## Features

### 1. Subreddit Quick-List

**Popup UI — top section**

A comma-separated (editable) list of target subreddits, stored in extension settings:

```
r/AI_Agents, r/n8n, r/agency, r/SaaS, r/Entrepreneur, r/smallbusiness, r/de, r/germany
```

Each subreddit is a clickable link that opens `reddit.com/r/{name}/new` in a new tab.

The user can edit this list anytime in the popup settings.

### 2. Thread Reader (Content Script)

When the user is on a Reddit thread page (`reddit.com/r/*/comments/*`), the content script extracts:

- Thread title
- Thread body text (OP's post)
- Top 5-10 comments (sorted by score)
- Subreddit name
- Thread age (how old the post is)

This is injected into the prompt sent to Claude.

### 3. Reply Generator

**Triggered by:** clicking "Generate Reply" button in the extension popup, or a keyboard shortcut (e.g., `Alt+R`).

**What happens:**
1. Content script extracts thread content
2. Background service worker builds the prompt (thread content + context files + system prompt)
3. Calls OpenRouter API with the constructed messages
4. Returns 1-2 draft replies
5. Displays them in the popup or a floating panel on the page
6. User can:
   - Copy to clipboard (one click)
   - Edit in-place before copying
   - Regenerate with a different angle
   - Save the thread to history

### 4. Context Files

The extension ships with (or allows uploading) context files that give Claude deep knowledge of the product and ICP. These are included in every API call as part of the system prompt.

**Required context files (bundle these into the extension, with ability to update):**

```
context/
├── product-identity.md       ← What l4yercak3 is (one-pager)
├── icp-definition.md         ← Who the ICP is, pain points, language
├── language-patterns.md      ← Exact phrases ICP uses, what to say/avoid
├── reddit-strategy.md        ← Tone rules, 3-phase approach, what NOT to do
└── competitive-positioning.md ← How we compare to GHL, DashLynk, etc.
```

**Source files to compile these from:**

| Context File | Source |
|-------------|--------|
| product-identity.md | Landing page copy + GTM executive summary |
| icp-definition.md | `docs/icp-ai-agency-selling-automations/ICP-DEFINITION.md` |
| language-patterns.md | `docs/icp-ai-agency-selling-automations/analysis/language-patterns.md` |
| reddit-strategy.md | `docs/icp-ai-agency-selling-automations/gtm-plan/04-REDDIT-ORGANIC.md` |
| competitive-positioning.md | `docs/icp-ai-agency-selling-automations/synthesis/KEY-INSIGHTS.md` + `PRODUCT-RECOMMENDATIONS.md` |

The user should also be able to paste/upload additional context files through the settings UI.

### 5. Thread History / Tracking

Simple local tracking:

| Field | Type |
|-------|------|
| Thread URL | string |
| Subreddit | string |
| Thread title | string |
| Status | "replied" / "saved" / "skipped" |
| Date | timestamp |
| Reply used | string (the text they posted) |

Displayed as a simple list in the popup under a "History" tab. Exportable as CSV.

### 6. Settings

| Setting | Default | Notes |
|---------|---------|-------|
| OpenRouter API Key | (empty) | Required. Stored in chrome.storage.local |
| Model | `anthropic/claude-opus-4.5` | Dropdown: opus-4.5, sonnet-4, haiku |
| Subreddit list | `r/AI_Agents, r/n8n, r/agency, r/SaaS, r/Entrepreneur` | Comma-separated, editable |
| Tone | "helpful-founder" | Options: helpful-founder, technical-peer, casual |
| Max reply length | 150 words | Slider: 50-300 words |
| Include product mention | false | Toggle: when ON, Claude may naturally mention l4yercak3. When OFF, pure value-only replies. |
| Context files | (bundled defaults) | Ability to add/edit/remove |

---

## System Prompt for Claude

This is the system prompt sent with every API call:

```
You are a Reddit reply assistant for a startup founder. Your job is to help draft genuine, helpful replies to Reddit threads.

CRITICAL RULES:
1. Be genuinely helpful FIRST. The reply must provide real value even if the reader never hears about the product.
2. Use natural, conversational language. No marketing speak. No hype words ("revolutionary," "game-changing," "disruptive").
3. Never say "chatbot" — use "AI agent" or "AI employee" if relevant.
4. Match the tone of the subreddit. Technical subreddits get technical answers. Business subreddits get business answers.
5. Keep replies concise. Reddit rewards clear, direct answers — not walls of text.
6. If the thread is not relevant to the founder's expertise, say so. Don't force a reply.
7. Never write fake testimonials or pretend to be a random user. If mentioning the product, always frame it as "I'm building..." or "full disclosure, I'm the founder of..."
8. Use specific numbers and data when available (e.g., "93% WhatsApp penetration in DACH," "60-80% of inbound calls go unanswered").
9. Do NOT include links unless the user explicitly asks for them.

PRODUCT MENTION RULES:
- If "include product mention" is OFF: Write a purely helpful reply. Do not mention l4yercak3 at all.
- If "include product mention" is ON: You MAY mention l4yercak3 if it's genuinely relevant to the thread. Always disclose as founder. Keep it brief — one sentence max about the product, embedded naturally in a helpful answer.

OUTPUT FORMAT:
Return 2 reply options:
- Option A: The "safe" reply — pure value, no product mention regardless of setting
- Option B: The "warm" reply — value-first with natural product context (if setting is ON) or a different angle (if setting is OFF)

Each reply should be ready to paste into Reddit. No headers, no labels, just the reply text.
```

### Context Injection

After the system prompt, inject the context files:

```
<context>
<product>
{contents of product-identity.md}
</product>

<icp>
{contents of icp-definition.md}
</icp>

<language>
{contents of language-patterns.md}
</language>

<strategy>
{contents of reddit-strategy.md}
</strategy>

<competitive>
{contents of competitive-positioning.md}
</competitive>
</context>
```

### User Message

```
Here is the Reddit thread I want to reply to:

Subreddit: r/{subreddit}
Title: {thread_title}
Post: {thread_body}

Top comments:
{comment_1}
{comment_2}
...

---

Generate 2 reply options. Tone: {tone_setting}. Max length: {max_words} words. Product mention: {on/off}.
```

---

## API Call Structure

```javascript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'chrome-extension://reddit-warmup',
    'X-Title': 'Reddit Warmup Extension'
  },
  body: JSON.stringify({
    model: selectedModel, // e.g., 'anthropic/claude-opus-4.5'
    messages: [
      { role: 'system', content: systemPrompt + contextFiles },
      { role: 'user', content: threadContent }
    ],
    max_tokens: 1024,
    temperature: 0.7
  })
});
```

---

## UI Design

### Popup (400px wide, expandable height)

```
┌──────────────────────────────────────┐
│  🔍 Reddit Warm-Up          [⚙️]    │
├──────────────────────────────────────┤
│                                      │
│  SUBREDDITS                          │
│  ┌──────────────────────────────┐    │
│  │ r/AI_Agents  r/n8n  r/agency │    │
│  │ r/SaaS  r/Entrepreneur       │    │
│  │ [+ Add]                      │    │
│  └──────────────────────────────┘    │
│                                      │
│  ─── ON A THREAD? ───                │
│                                      │
│  [🔄 Generate Reply]  (Alt+R)       │
│                                      │
│  Product mention: [OFF] [ON]         │
│  Tone: [helpful-founder ▼]           │
│                                      │
├──────────────────────────────────────┤
│  OPTION A                            │
│  ┌──────────────────────────────┐    │
│  │ Draft reply text here...     │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│  [📋 Copy]  [🔄 Regenerate]        │
│                                      │
│  OPTION B                            │
│  ┌──────────────────────────────┐    │
│  │ Draft reply text here...     │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│  [📋 Copy]  [🔄 Regenerate]        │
│                                      │
├──────────────────────────────────────┤
│  [Replies] [Saved] [History]         │
└──────────────────────────────────────┘
```

### Settings Page

- API key input (password field, with test button)
- Model selector dropdown
- Subreddit list (textarea, comma-separated)
- Tone selector
- Max reply length slider
- Context files manager (list with add/edit/remove)
- Export history (CSV download)

---

## Technical Notes

### Manifest V3 Permissions

```json
{
  "manifest_version": 3,
  "name": "Reddit Warm-Up",
  "version": "1.0.0",
  "description": "Reddit organic outreach assistant for founders",
  "permissions": [
    "storage",
    "activeTab",
    "clipboardWrite"
  ],
  "host_permissions": [
    "https://www.reddit.com/*",
    "https://old.reddit.com/*",
    "https://openrouter.ai/*"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon-48.png"
  },
  "content_scripts": [
    {
      "matches": ["https://www.reddit.com/r/*/comments/*", "https://old.reddit.com/r/*/comments/*"],
      "js": ["content-script.js"]
    }
  ],
  "background": {
    "service_worker": "background.js"
  },
  "commands": {
    "generate-reply": {
      "suggested_key": { "default": "Alt+R" },
      "description": "Generate reply for current thread"
    }
  }
}
```

### Reddit DOM Parsing Notes

Reddit has multiple frontends:
- **New Reddit** (www.reddit.com) — React app, content is in `shreddit-post` and `shreddit-comment` web components
- **Old Reddit** (old.reddit.com) — static HTML, content in `.thing` divs with `.usertext-body`
- **New New Reddit** (sh.reddit.com) — another React variant

The content script should handle at least new Reddit (www). Old Reddit support is a nice-to-have.

For new Reddit, key selectors (these may change — build defensively):
- Post title: `shreddit-post h1` or `[data-testid="post-title"]`
- Post body: `shreddit-post [slot="text-body"]` or `.RichTextJSON-root`
- Comments: `shreddit-comment` elements, with `[slot="comment"]` for text

**Fallback:** If DOM parsing fails, use a simpler approach — grab all text content from the main content area and let Claude parse it.

### Token Budget

Rough token estimates per call:
- System prompt: ~500 tokens
- Context files: ~3,000-5,000 tokens (keep each file under 1,000 tokens)
- Thread content: ~500-2,000 tokens
- Response: ~500-800 tokens
- **Total: ~5,000-8,500 tokens per call**

At OpenRouter Opus 4.5 pricing ($5/M input, $25/M output):
- ~$0.03-0.05 per reply generation
- 100 replies/month = ~$3-5/month

Consider using `anthropic/claude-sonnet-4` as default to keep costs lower (~10x cheaper), with Opus 4.5 as the premium option.

### Cost Optimization

- Cache the context files in the system prompt — OpenRouter supports prompt caching for Anthropic models
- Use Sonnet as default, Opus for complex threads
- Show estimated cost per generation in the UI (optional but nice)

---

## File Structure

```
reddit-warmup-extension/
├── manifest.json
├── popup.html
├── popup.js
├── popup.css
├── settings.html
├── settings.js
├── background.js          ← Service worker, handles API calls
├── content-script.js      ← Reads Reddit DOM
├── context/
│   ├── product-identity.md
│   ├── icp-definition.md
│   ├── language-patterns.md
│   ├── reddit-strategy.md
│   └── competitive-positioning.md
├── icons/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
└── lib/
    └── markdown-parser.js  ← Optional: render markdown in popup
```

---

## What to Build First (MVP)

**Phase 1 — Core (build this first):**
1. Popup with subreddit quick-links
2. Content script that reads a Reddit thread
3. Background worker that calls OpenRouter
4. Display 2 reply options in popup
5. Copy-to-clipboard button
6. Settings page with API key + model selector

**Phase 2 — Polish:**
7. Thread history / tracking
8. Keyboard shortcut (Alt+R)
9. Tone and length controls
10. Product mention toggle
11. Context file management UI

**Phase 3 — Nice-to-have:**
12. Old Reddit support
13. Cost tracking
14. CSV export of history
15. Floating panel on Reddit page (instead of popup)
16. "Thread relevance score" — Claude rates 1-5 how relevant the thread is to your ICP before generating a reply

---

## Context File Contents to Bundle

Compile these from the existing docs. Keep each under ~800 words to stay within token budget.

### product-identity.md
> l4yercak3 is a white-label AI agent platform for agency owners. Configure AI agents for each client, brand them under your agency name, and charge recurring revenue. Native WhatsApp Business API. GDPR-compliant EU hosting. No code required.
>
> Who it's for: Marketing, digital, and consulting agency owners (1-10 employees) managing 10-50+ SMB clients. Primary market: DACH. Secondary: English-speaking AI agency operators.
>
> What it replaces: GoHighLevel (no WhatsApp, no GDPR, US-centric), ManyChat (Instagram only), custom n8n builds (no frontend), Voiceflow (not multi-tenant).
>
> Key differentiators: WhatsApp-native (not bolted on), EU hosting by design, multi-tenant architecture, pre-built vertical templates, white-label client portals.
>
> Pricing: Free to start, Pro at EUR 29/mo, Agency at EUR 299/mo. Usage-based credits.
>
> Founder story: Built by a founder who experienced the agency scaling pain firsthand. Not a VC-backed hype machine. Bootstrapped, building in public.

### icp-definition.md
Compile from `ICP-DEFINITION.md` — condense to the top pain points, trigger events, and demographics.

### language-patterns.md
Compile from `analysis/language-patterns.md` — the exact phrases ICP uses, what to say, what to avoid.

### reddit-strategy.md
Condense from `gtm-plan/04-REDDIT-ORGANIC.md` — tone rules, the 3-phase approach, what NOT to do.

### competitive-positioning.md
Condense from `synthesis/KEY-INSIGHTS.md` — comparison to GHL, DashLynk, ManyChat, Voiceflow. Keep it factual.
