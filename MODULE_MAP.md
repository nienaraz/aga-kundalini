# Module Map

> Architecture boundaries and ownership

## Package Dependency Graph

```
apps/web ──→ packages/content (schemas, loaders)
         ──→ packages/lib     (search, progress, seo, related)
         ──→ packages/ui      (Radix components)
         ──→ packages/config   (tailwind, eslint, ts)
```

Forbidden: no package may import from `apps/web`. Packages must not cross-import except via explicit dependency in `package.json`.

---

## apps/web

**Owner**: Application layer — routes, API, middleware, layout.

### Routes (public)
| Route | Responsibility |
|-------|---------------|
| `/` | Homepage |
| `/start` | Getting started guide |
| `/about` | About the author |
| `/library/**` | Educational articles by category |
| `/practices/**` | Breathing, movement, meditation, reset techniques |
| `/paths/**` | Multi-day programs |
| `/video/**` | Video content (YouTube embeds) |
| `/quiz`, `/quiz/result` | Nervous system self-assessment |
| `/tools/**` | Interactive tools (check-in, grounding, journal) |
| `/resources/glossary/**` | Terminology dictionary |
| `/webinars/**` | Webinar listings and signup |
| `/community` | Community principles |
| `/newsletter` | Newsletter signup |
| `/legal/**` | Privacy, cookies, disclaimer |
| `/feed.xml` | RSS feed |
| `/sitemap.xml` | Dynamic sitemap |

### Routes (protected)
| Route | Guard | Responsibility |
|-------|-------|---------------|
| `/account/**` | authenticated | User dashboard, favorites, settings |
| `/admin/**` | role=admin | Admin dashboard, webinar management |
| `/paths/progress` | authenticated | Path completion tracking |

### API Routes
| Endpoint | Method | Responsibility |
|----------|--------|---------------|
| `/api/auth/[...nextauth]` | * | Authentication |
| `/api/contact` | POST | Contact form submission |
| `/api/newsletter` | POST | Newsletter signup |
| `/api/quiz/save` | POST | Quiz result persistence |
| `/api/search` | GET | Search index delivery |
| `/api/webinars/signup` | POST | Webinar registration |
| `/api/admin/webinars/[id]/signups` | GET | Admin: fetch signups |

### Key Application Modules

| Module | Path | Public API |
|--------|------|-----------|
| Auth | `lib/auth/` | `authOptions`, `UserRole` type |
| Database | `lib/db/` | `db` singleton, `schema.*` tables, `migrate()`, `seed()` |
| Quiz | `lib/quiz/` | `quizConfig`, `calculateScores()`, `saveResult()` |
| Content loader | `lib/content.ts` | `getArticle()`, `getPractice()` etc. (delegates to packages/content) |
| Video | `lib/video.ts` | `getAllVideos()`, `getVideoBySlug()`, `getFeaturedVideos()` |
| Webinar | `lib/webinar.ts` | `getUpcomingWebinars()`, `getWebinarBySlug()` |
| Navigation | `lib/navigation.ts` | `mainNavItems`, `regulationBarItems` |
| Validation | `lib/validate-content.ts` | CLI script: validate all MDX |
| Search Index | `lib/generate-search-index.ts` | CLI script: build MiniSearch index |

### Components

| Group | Path | Responsibility |
|-------|------|---------------|
| Layout | `components/layout/` | Header, Footer, MobileMenu, Navigation, RegulationBar |
| Content | `components/content/` | ArticleCard, PracticeCard, PathCard, SafetyNotes, KeyTakeaways, TOC, RelatedContent, FilterBar, SaveToFavorites, WhatToTryNow |
| Forms | `components/forms/` | ContactForm, NewsletterForm, ConsentCheckboxes |
| Search | `components/search/` | SearchModal |
| Video | `components/video/` | VideoCard |
| Providers | `components/providers/` | AuthProvider, CalmModeProvider |
| UI | `components/ui/` | Marquee, ScrollReveal |

---

## packages/content

**Owner**: Content schemas, validation, collection loading.

| Export | Purpose |
|--------|---------|
| `articleSchema` | Zod validator for education articles |
| `practiceSchema` | Zod validator for practices (includes `contraindications`, `safetyNotes`, `intensity`) |
| `pathSchema` | Zod validator for multi-day paths |
| `glossaryTermSchema` | Zod validator for glossary terms |
| `newsletterSchema` | Zod validator for newsletter issues |
| `getAllArticles()` | Load + validate + sort all articles |
| `getAllPractices()` | Load + validate + sort all practices |
| `getAllPaths()` | Load + validate + sort all paths |
| `getAllGlossaryTerms()` | Load + validate + sort all glossary terms |
| `getArticleBySlug()` | Load single article |
| `getPracticeBySlug()` | Load single practice |
| `getPathBySlug()` | Load single path |
| `getAllTags()` | Aggregate unique tags across content |
| `groupByCategory()` | Group content by category |
| `formatDate()` | Polish date formatting |

**Forbidden imports**: Must not import from `apps/web` or `packages/lib`.

---

## packages/lib

**Owner**: Shared algorithms and utilities.

| Export | File | Purpose |
|--------|------|---------|
| `createSearchIndex()` | `search.ts` | Build MiniSearch index |
| `searchContent()` | `search.ts` | Query with fuzzy/prefix/boost |
| `calculateReadingTime()` | `reading-time.ts` | Word-count estimation |
| `generateSlug()` | `slug.ts` | URL-safe slug generation |
| `generateToc()` | `toc.ts` | Extract headings from markdown |
| `findRelatedContent()` | `related.ts` | Tag-overlap recommendations |
| `calculateProgress()` | `progress.ts` | Path completion percentage |
| `manageFavorites()` | `favorites.ts` | Favorite add/remove logic |
| `generateMetadata()` | `seo.ts` | Next.js metadata builder |
| `generateJsonLd()` | `seo.ts` | Schema.org structured data |

**Tests**: `__tests__/` — reading-time, search, slug, toc.

**Forbidden imports**: Must not import from `apps/web`, `packages/content`, or `packages/ui`.

---

## packages/ui

**Owner**: Radix-based design system primitives.

17 components: Accordion, Badge, Button, Card, Checkbox, Container, Dialog, Input, Label, ProgressBar, Select, Separator, Tabs, Textarea, Tooltip + `cn` utility.

**Forbidden imports**: Must not import from `apps/web`, `packages/content`, or `packages/lib`.

---

## packages/config

**Owner**: Shared tooling configs.

Exports: ESLint, Prettier, TypeScript, and Tailwind configurations consumed by all packages and apps.

**Forbidden imports**: Must not import from any other package.

---

## Content Directory (`apps/web/content/`)

| Collection | Dir | Files | Schema |
|-----------|-----|-------|--------|
| Articles | `edukacja/[category]/` | 2 + template | `articleSchema` |
| Practices | `praktyki/[category]/` | 3 + template | `practiceSchema` |
| Paths | `sciezki/` | 1 + template | `pathSchema` |
| Glossary | `slownik/` | 10 | `glossaryTermSchema` |
| Newsletter | `newsletter/` | 1 | `newsletterSchema` |
| Video | `video/videos.json` | 3 entries | ad-hoc (no Zod schema) |

---

## Database (`apps/web/lib/db/`)

| Table | Used By | Status |
|-------|---------|--------|
| `users` | Auth | Active |
| `accounts` | NextAuth adapter | Active |
| `sessions` | NextAuth adapter | Active |
| `verificationTokens` | NextAuth adapter | Active |
| `favorites` | SaveToFavorites component | Schema only — no API route |
| `pathProgress` | Path tracking | Schema only — localStorage used instead |
| `webinarEvents` | Admin webinars | Active |
| `webinarSignups` | Webinar signup form | Active |
