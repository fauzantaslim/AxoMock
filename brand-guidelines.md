# Axomock Brand Guidelines

## 1. Brand Overview

**What is Axomock?**
Axomock is a developer tool for spinning up fake/mock REST APIs quickly — helping developers simulate API responses without needing a real backend, speeding up development and testing workflows.

**Mission**
Eliminate the friction between "the backend isn't ready yet" and "I'm ready to build the frontend." Axomock lets developers keep moving without waiting.

**Primary Audience**

- Frontend & fullstack developers who need mock data fast
- QA engineers who need to simulate various response scenarios (errors, delays, edge cases)
- Small teams/startups who need rapid prototyping without full backend infrastructure

**Brand Personality (5 traits)**

| Trait                      | Description                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| **Playful & Approachable** | Serious about function, relaxed about tone. Not stiff like a generic enterprise tool.               |
| **Technical & Precise**    | Precise in the details — response codes, schemas, and latency simulation are all accurate.          |
| **Regenerative**           | Inspired by the axolotl: quick to "reset," flexible, and reshapeable whenever testing needs change. |
| **Fast & Frictionless**    | All copy and interactions emphasize speed — from setup to results.                                  |
| **Quietly Confident**      | Knows it's useful, without needing excessive jargon to prove it.                                    |

**Why the name Axomock is relevant:** Axolotls have a unique regenerative ability — they can regrow lost body parts. This becomes the brand's core metaphor: _mock data that can be reset, reshaped, and adjusted anytime_ — exactly what developers need when testing.

**Competitors & Differentiation**
Competitors like Postman Mock Server, JSON Server, or Mockoon tend to feel generic and utilitarian. Axomock differentiates through a warmer, more playful personality without sacrificing technical credibility — a brand that feels "built by developers, for developers," not a corporate tool.

---

## 2. Color Palette

**Primary**

| Color        | Hex       | RGB              | Usage                                                  |
| ------------ | --------- | ---------------- | ------------------------------------------------------ |
| Axolotl Pink | `#FF6B9D` | rgb(255,107,157) | Primary CTAs, logo accent, highlights                  |
| Deep Teal    | `#0F766E` | rgb(15,118,110)  | Secondary color — evokes "water/aquatic," links, icons |

**Neutral Palette (Slate scale)**

| Token     | Hex       | Usage                        |
| --------- | --------- | ---------------------------- |
| slate-950 | `#0B1120` | Headings, primary text       |
| slate-700 | `#334155` | Body text                    |
| slate-500 | `#64748B` | Secondary text, placeholders |
| slate-300 | `#CBD5E1` | Borders, dividers            |
| slate-100 | `#F1F5F9` | Backgrounds, hover states    |
| White     | `#FFFFFF` | Cards, content areas         |

**Semantic Palette**

| Function | Color | Hex       |
| -------- | ----- | --------- |
| Success  | Green | `#22C55E` |
| Warning  | Amber | `#F59E0B` |
| Error    | Red   | `#EF4444` |
| Info     | Blue  | `#3B82F6` |

**Contrast Rules (WCAG AA — minimum 4.5:1 for text)**

- slate-950 on white → 19.2:1 (AAA) ✅
- slate-700 on white → 10.8:1 (AAA) ✅
- slate-500 on white → 4.6:1 (AA) ✅
- White on Axolotl Pink → 3.1:1 ⚠️ _(use only for large/decorative elements, not body text)_
- White on Deep Teal → 5.9:1 (AA) ✅

**Axolotl Pink Tint/Shade Scale (100–900)**
`#FFF0F5` · `#FFD6E5` · `#FFADC9` · `#FF6B9D` (base) · `#F0447D` · `#D42A62` · `#A81F4D` · `#7C1739` · `#500F26`

**Approved Combinations**

- Axolotl Pink on White or slate-100 (for CTAs)
- Deep Teal for link text on White

**Forbidden Pairings**

- Don't pair Axolotl Pink with Amber (warning) — too visually and emotionally clashing

---

## 3. Typography

**Font Families**

- **Heading:** Space Grotesk (Bold/Semibold) — modern, slightly playful, fits a dev-tool brand
- **Body:** Inter (Regular/Medium) — highly readable, industry standard for UI
- **Code/Mono:** JetBrains Mono — for request/response JSON examples, endpoints, snippets

**Type Scale**

| Name       | Size | Weight   | Line Height | Use                        |
| ---------- | ---- | -------- | ----------- | -------------------------- |
| Display    | 56px | Bold     | 1.1         | Landing page hero headline |
| H1         | 36px | Bold     | 1.2         | Page titles                |
| H2         | 28px | Semibold | 1.3         | Section headers            |
| H3         | 22px | Semibold | 1.3         | Subsection headers         |
| H4         | 18px | Medium   | 1.4         | Card titles                |
| Body Large | 18px | Regular  | 1.6         | Lead paragraphs            |
| Body       | 16px | Regular  | 1.6         | Default text               |
| Body Small | 14px | Regular  | 1.5         | Secondary text             |
| Code       | 14px | Regular  | 1.6         | Snippets, endpoint paths   |
| Caption    | 12px | Medium   | 1.4         | Labels, metadata           |

---

## 4. Logo Usage

**Logo Variants**

- **Full logo** (axolotl icon + wordmark "Axomock") — primary use on website, documentation
- **Icon only** (minimalist axolotl silhouette) — favicon, app icon, small spaces
- **Wordmark only** — when the icon's context is already clear (e.g., inside CLI output)

**Clear Space**
Minimum padding around the logo = the height of the axolotl icon itself. Don't let other elements (text, images) enter this zone.

**Incorrect Usage**

- ❌ Do not stretch or distort the logo's proportions
- ❌ Do not change colors outside the approved palette (e.g., don't turn the logo black-and-white with a gradient)
- ❌ Do not add extra shadow, gradient, or outline effects
- ❌ Do not place on busy backgrounds/patterns without a contrast layer
- ❌ Do not rotate or flip the logo

---

## 5. Voice & Tone

**Brand Voice (consistent across all content)**

- **Direct** — We get straight to the point. No excessive jargon or roundabout sentences.
- **Friendly, not cutesy** — Playful on the surface, but still technically credible. Never childish.
- **Confident without hype** — We know this tool is useful, but we don't need excessive superlatives ("revolutionary," "game-changing").

**Tone by Context**

| Context                | Tone                                 | Example                                                            |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| Marketing/landing page | Confident, energizing                | "Mock your API in seconds. No backend needed."                     |
| Documentation          | Clear, helpful                       | "To create a mock endpoint, run `axomock init`."                   |
| Error messages         | Empathetic, actionable               | "That endpoint doesn't exist yet. Check your route or create one." |
| Social media           | Casual, engaging                     | "New feature: simulate network delay just dropped 🦎"              |
| CLI output             | Concise, with a touch of personality | "✓ Mock server regenerated on port 4000."                          |

**Writing Rules**

- Use active voice
- Keep sentences under 25 words
- Avoid jargon unless the audience is guaranteed technical (API docs)
- Use contractions (it's, you'll, we're) for marketing copy
- Capitalize only proper nouns and sentence starts (avoid Excessive Title Case)

---

## 6. Imagery & Iconography

**Illustration Style**

- Flat/minimalist illustrations with the axolotl as a recurring mascot
- Avoid generic stock photos of "developer at a laptop" — prefer abstract illustrations or technical diagrams instead
- Illustration colors follow the official palette (Axolotl Pink + Deep Teal as primary accents)

**Iconography**

- Outline/line-icon style with consistent stroke width (1.5–2px)
- Icons based on concepts like: server, endpoint, request/response, regeneration (cycle/refresh)

---

## 7. Components (Baseline)

| Component            | Style                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Primary Button**   | Axolotl Pink background, white text, 8px radius, hover → darker shade (#F0447D)         |
| **Secondary Button** | Deep Teal border, Deep Teal text, transparent background                                |
| **Card**             | White background, slate-300 border, 12px radius, subtle shadow                          |
| **Code Block**       | slate-950 background, white/monospace text, pink accent for syntax-highlighted keywords |

---

## 8. Do's and Don'ts

✅ **Do**

- Use generous whitespace — let content breathe, especially in documentation
- Use the axolotl mascot for empty states or loading screens (e.g., "The axolotl is regenerating your mock server...")
- Consistently use Deep Teal for all links/interactive text

❌ **Don't**

- Don't use more than 2 accent colors in a single view
- Don't make copy too formal/corporate — this contradicts the "Playful & Approachable" personality
- Don't overuse gradients in the UI — this contradicts the brand's flat/minimalist style
