# Platform Spec

> Single source of truth for Aga's Kundalini Yoga platform.
> All feature decisions, policies, and standards are defined here.

---

## 1. Product Pillars

1. **Safety** — Non-medical, anti-hype. Every practice entry point passes SafetyGate. Crisis numbers visible. "To nie jest terapia."
2. **Evidence** — Trust through transparency. Citations with levels, limitations, controversy flags. No unqualified claims.
3. **Calm UX** — Premium editorial aesthetic. No monetization on homepage. No promotion of paid features. Whitespace, restraint, grain texture.
4. **Community** — Private self-growth. No leaderboards. Reflections, streaks, badges are personal. Export/delete all user data.

---

## 2. Information Architecture & Routes

### Public (no auth)

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Homepage — editorial, calm, no promo | DONE |
| `/start` | Getting started guide | DONE |
| `/about` | About Aga + contact | DONE |
| `/library/**` | Educational articles (5 categories) | DONE |
| `/practices/**` | Practices (4 categories) | DONE |
| `/paths/**` | Multi-day programs | DONE |
| `/video/**` | Video library | DONE |
| `/quiz` | Nervous system self-assessment | DONE |
| `/tools/**` | Interactive self-regulation tools | DONE |
| `/resources/glossary/**` | Terminology dictionary | DONE |
| `/resources/evidence/**` | Evidence library (citations + sources) | MISSING |
| `/community` | Community principles | DONE |
| `/newsletter` | Newsletter signup | DONE |
| `/legal/**` | Privacy, cookies, disclaimer | STUB |
| `/safety` | Safety center (red flags, when to stop, crisis) | MISSING |

### Gated (auth required)

| Route | Guard | Purpose | Status |
|-------|-------|---------|--------|
| `/account/**` | authenticated | Dashboard, favorites, quiz history | PARTIAL |
| `/paths/progress` | authenticated | Path completion log | PARTIAL |

### Admin (role=admin)

| Route | Purpose | Status |
|-------|---------|--------|
| `/admin` | Dashboard | PARTIAL |
| `/admin/webinars` | Webinar CRUD | DONE |
| `/admin/flags` | Feature flag toggles | MISSING |
| `/admin/evidence` | Evidence review queue | MISSING |

### Dark-launched (feature flags, default OFF)

| Route | Flag | Exposure | Status |
|-------|------|----------|--------|
| `/webinars/**` | `enableWebinars` | footer-only | DONE (code exists, needs flag) |
| `/series/**` | `enableSeries` | disabled | MISSING |
| `/challenges/**` | `enableChallenges` | disabled | MISSING |
| `/members/**` | `enableMembersArea` | disabled | MISSING |

---

## 3. Data Model Overview

### Content (MDX + JSON, file-based)

| Collection | Schema | Key Fields |
|-----------|--------|-----------|
| Articles | `articleSchema` | title, slug, category, tags, difficulty, keyTakeaways, safetyNotes |
| Practices | `practiceSchema` | title, slug, category, intensity(1-5), steps, contraindications, safetyNotes, durationMin |
| Paths | `pathSchema` | title, slug, totalDays, days[].contentRefs, safetyNotes |
| Glossary | `glossaryTermSchema` | term, slug, shortDefinition, longDefinition, relatedTerms |
| Newsletter | `newsletterSchema` | title, slug, issueNumber |
| Video | ad-hoc JSON | title, slug, youtubeId, topic, tags |

### Database (SQLite + Drizzle)

| Table | Purpose |
|-------|---------|
| `users` | Auth, roles (guest/member/admin) |
| `accounts` | NextAuth OAuth adapter |
| `sessions` | JWT sessions |
| `verificationTokens` | Email verification |
| `favorites` | User bookmarks |
| `pathProgress` | Day-by-day path completion |
| `webinarEvents` | Webinar definitions |
| `webinarSignups` | Signups with GDPR consent |

### Future Tables (not yet created)

| Table | Purpose | Blocked by |
|-------|---------|-----------|
| `quizResults` | Persistent quiz history | — |
| `reflections` | Practice reflection logs | enableMembersArea flag |
| `streaks` | Continuity tracking | enableMembersArea flag |
| `badges` | Achievement records | enableMembersArea flag |

---

## 4. Feature Flags

### Policy

- All "big" features (webinars, series, challenges, members) are **OFF by default**.
- When OFF: route returns 404, link removed from nav/home/footer/sitemap/RSS.
- Flags stored in `packages/config/src/featureFlags.ts` (can be env-overridden).
- Admin can view/toggle at `/admin/flags` (future).

### Flag Registry

| Flag | Default | Exposure Modes | Controls |
|------|---------|---------------|----------|
| `enableWebinars` | `false` | disabled / footer-only / nav | `/webinars/**` routes, nav link, sitemap entry |
| `enableSeries` | `false` | disabled / footer-only / nav | `/series/**` routes |
| `enableChallenges` | `false` | disabled / footer-only / nav | `/challenges/**` routes |
| `enableMembersArea` | `false` | disabled / nav / members-only | `/members/**`, reflections, streaks, badges |
| `enableEvidenceLibrary` | `true` | nav | `/resources/evidence/**` |
| `enableSafetyCenter` | `true` | nav | `/safety/**` |

### Exposure Modes

| Mode | Nav | Footer | Home | Sitemap | RSS |
|------|-----|--------|------|---------|-----|
| `disabled` | No | No | No | No | No |
| `footer-only` | No | Yes | No | No | No |
| `nav` | Yes | Yes | Optional | Yes | Yes |
| `members-only` | Auth-only | No | No | No | No |

---

## 5. Safety Policy

### Safety Center (`/safety`)

A standalone page with:
- When to stop a practice (red flags)
- Signs you need a professional, not an app
- Crisis phone numbers (116 111, 800 70 2222)
- Link from every practice page

### SafetyGate Component

Shown before every practice start. User must acknowledge:
- "To nie jest terapia ani porada medyczna."
- "Jeśli czujesz silne objawy, przerwij i skonsultuj się ze specjalistą."

Remembers acknowledgment in session (not persisted — ask each session).

### Red Flags (stop rules)

Displayed if user reports in check-in:
- Severe dissociation
- Suicidal ideation
- Panic that doesn't subside
- Physical pain during practice

Response: show crisis numbers, suggest stopping, link to `/safety`.

### Fast Exit

Every practice page has a visible "Przerwij" (Stop) button that immediately exits to `/safety` or a calm landing.

### Content Requirements

Every practice MUST have:
- `safetyNotes` field (at least one note)
- `contraindications` field (if applicable)
- Permission to stop language in instructions

---

## 6. Evidence Policy

### Evidence Levels (inspired by GRADE, simplified)

| Level | Label | Meaning |
|-------|-------|---------|
| A | Silne dowody | Multiple RCTs or systematic reviews |
| B | Umiarkowane dowody | Single RCT or strong observational |
| C | Wstępne dowody | Pilot studies, case series |
| D | Tradycja / doświadczenie | Traditional practice, clinical experience, no controlled studies |
| E | Opinia ekspercka | Expert opinion, theoretical rationale |

### Required Fields for Evidence Entries

```
title, slug, evidenceLevel (A-E),
sources[] (author, year, journal, doi?),
limitations (required string — what this evidence does NOT prove),
controversyFlag (boolean — is this topic debated?),
controversyNote? (if flagged — what's the debate),
relatedContent[] (links to practices/articles/videos)
```

### Policy

- Every claim on the platform should eventually link to an evidence entry.
- Level D/E entries MUST have a `limitations` note.
- Controversy-flagged entries show a visible badge.
- No cherry-picking: if evidence is mixed, say so.

---

## 7. Copy Policy

### Forbidden Words (in public-facing content)

**Promotional / commercial:**
`kup`, `zamów`, `oferta`, `promocja`, `rabat`, `zniżka`, `gratis`, `bezpłatnie` (in commercial context), `limitowana`, `ostatnie miejsca`, `nie przegap`, `ekskluzywny`, `VIP`

**Medical / diagnostic:**
`leczy`, `wyleczy`, `diagnoza`, `terapia` (as a claim we provide it), `gwarantuje`, `zapewnia`, `rozwiąże`

**Hype / pressure:**
`musisz`, `koniecznie`, `transformacja życia`, `całkowita zmiana`, `sekret`, `przełom`, `rewolucja`

### Allowed Alternatives

| Instead of | Use |
|-----------|-----|
| "wyleczy" | "może wspierać" |
| "musisz to robić" | "warto spróbować" / "zaprasza do" |
| "terapia" | "praktyka wspierająca" |
| "transformacja" | "proces" / "eksploracja" |
| "gwarantuje" | "bywa pomocne" |

### Enforcement

- `pnpm audit:copy` — build-time scan for forbidden words in MDX + page.tsx files.
- Warns on match, blocks build if `--strict` flag.

---

## 8. SEO Stealth Policy

### Sitemap Gating

`apps/web/app/sitemap.ts` must check feature flags. Routes for disabled features are excluded.

### noindex

Routes behind disabled flags must have `<meta name="robots" content="noindex, nofollow">` via Next.js metadata.

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /account/
Disallow: /api/
```

### RSS Gating

`/feed.xml` must not include entries for disabled features.

### Internal Link Audit

`pnpm audit:links` — scan all MDX and page files for internal links. Flag any link pointing to a route behind a disabled flag.

---

## 9. Taxonomy

### Canonical Categories

**Articles**: `uklad-nerwowy`, `reaktywnosc-vs-odpowiedz`, `oddech-i-cialo`, `cykl-stresu`, `kundalini-podstawy`

**Practices**: `oddech`, `ruch`, `medytacja`, `resety`

**Difficulty**: `podstawowy`, `sredni`, `zaawansowany`

**Intensity**: 1–5 (integer)

### Tags

Free-form but validated: min 1, max 8 per item. Future: canonical tag registry with `pnpm audit:tags` validation.

### Contraindications

Free-form string array on practices. Future: canonical contraindication registry.

---

## 10. Recommendation Loop

### Principles

- Deterministic (no AI/ML) — rule-based only.
- Contraindication-aware: never recommend a practice whose contraindications match user's reported state.
- Evidence-aware: prefer practices with higher evidence levels.
- Transparent: user can see why something was recommended.

### Current Implementation

Quiz result → state → hardcoded slug recommendations. Tag-based related content.

### Target Implementation

1. Quiz state → filter practices by matching tags.
2. Exclude practices with contraindications matching user state.
3. Sort by evidence level (A > E), then by community-reported helpfulness.
4. Show top 3 with "why" explanation.

---

## 11. Definition of Done

### Content DoD

- [ ] Frontmatter passes `pnpm validate-content`
- [ ] `safetyNotes` present (practices, paths)
- [ ] `contraindications` listed if applicable
- [ ] No forbidden words (`pnpm audit:copy`)
- [ ] All internal links valid (`pnpm audit:links`)
- [ ] Evidence entry linked if making a factual claim
- [ ] Reviewed by Aga before publish (`draft: false`)

### Code DoD

- [ ] TypeScript — no `any`, no `@ts-ignore`
- [ ] Vitest test for new logic
- [ ] Feature-flagged if not core
- [ ] No hardcoded strings (use Polish directly — this is a PL-only site)
- [ ] Build passes: `pnpm build`
- [ ] Content validates: `pnpm validate-content`
- [ ] Copy audit clean: `pnpm audit:copy`
- [ ] Link audit clean: `pnpm audit:links`
