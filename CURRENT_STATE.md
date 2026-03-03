# Current State Audit

> Last updated: 2026-02-24

## Inventory

| Area | Status | Key Files | Notes |
|------|--------|-----------|-------|
| **Content Collections** | DONE | `packages/content/src/{schemas,collections}.ts` | 5 types: articles, practices, paths, glossary, newsletter. Zod-validated. |
| **Content Files** | DONE (seed) | `apps/web/content/` | 2 articles, 3 practices, 1 path, 10 glossary terms, 1 newsletter. Templates provided. |
| **Content Validation** | DONE | `apps/web/lib/validate-content.ts` | Build-time via `pnpm validate-content`. Skips `_` prefixed files. |
| **Database** | DONE | `apps/web/lib/db/{schema,index,migrate,seed}.ts` | SQLite + Drizzle. 8 tables: users, accounts, sessions, verificationTokens, favorites, pathProgress, webinarEvents, webinarSignups. |
| **Auth** | DONE | `apps/web/lib/auth/options.ts`, `middleware.ts` | NextAuth JWT, CredentialsProvider. Roles: guest/member/admin. Protected: /account/*, /admin/*, /paths/progress/*. Dev mode: no password check. |
| **Quiz** | DONE | `apps/web/lib/quiz/{config,scoring,storage}.ts` | 10 questions, 5-state scoring, content recommendations per state. localStorage + optional DB sync. |
| **Search** | DONE | `packages/lib/src/search.ts`, `apps/web/lib/generate-search-index.ts` | MiniSearch client-side. Fuzzy + prefix. Build-time index at `/public/search-index.json`. |
| **Safety Notes** | DONE | `apps/web/components/content/SafetyNotes.tsx` | Per-practice/path disclaimer component. Rose warning box. "To nie jest porada medyczna." |
| **Safety — Disclaimer Page** | STUB | `apps/web/app/legal/disclaimer/page.tsx` | Route exists, placeholder content. |
| **Safety — Contraindications** | PARTIAL | `packages/content/src/schemas.ts` | `contraindications` field in practiceSchema (optional string[]). Present in 1 of 3 practices. |
| **Evidence / Citations** | MISSING | — | No citation schema, no evidence levels, no source linking. Glossary mentions Siegel informally. |
| **Recommendations** | PARTIAL | `packages/lib/src/related.ts`, `apps/web/lib/quiz/config.ts` | Tag-based related content. Quiz maps states → slugs. No contraindication-awareness, no evidence-awareness. |
| **Feature Flags** | MISSING | — | No flag system. Only `draft` and `featured` booleans on content. |
| **Copy Policy** | PARTIAL | `CONTENT_GUIDE.md` | Written guidelines exist (forbidden words, tone rules). No build-time enforcement / audit script. |
| **SEO — Sitemap** | DONE | `apps/web/app/sitemap.ts` | Dynamic, includes all public routes + content. No gating for hidden features. |
| **SEO — robots.txt** | MISSING | — | No robots.txt. Uses Next.js default (allow all). |
| **SEO — noindex** | MISSING | — | No per-route noindex support for unreleased features. |
| **User Dashboard** | PARTIAL | `apps/web/app/account/page.tsx` | Structure exists. Favorites, paths, quiz results sections are empty placeholders. |
| **Admin Panel** | PARTIAL | `apps/web/app/admin/` | Dashboard + webinar management only. No content mgmt, no flag toggles. |
| **Favorites** | PARTIAL | `apps/web/lib/db/schema.ts` (table), `apps/web/components/content/SaveToFavorites.tsx` | DB table ready. Component exists. Not wired: no API route to persist. |
| **Path Progress** | PARTIAL | `packages/lib/src/progress.ts`, `apps/web/app/paths/progress/page.tsx` | localStorage tracking. DB table exists but not synced. |
| **Video** | DONE | `apps/web/lib/video.ts`, `apps/web/content/video/videos.json` | 3 videos. YouTube embeds. Filter by topic. |
| **Webinars** | DONE | `apps/web/app/webinars/`, `apps/web/lib/db/schema.ts` | Full CRUD. Signup with GDPR consent. Admin management. |
| **Tools** | DONE | `apps/web/app/tools/` | check-in (localStorage history), grounding-menu (5 states), trigger-journal (functional). |
| **Calm Mode** | DONE | `apps/web/components/providers/CalmModeProvider.tsx` | Toggle adds `calm-mode` class to body. Persists to localStorage. |
| **UI Package** | DONE | `packages/ui/src/` | 17 Radix-based components. Lightly used — app prefers inline Tailwind. |
| **Tests** | PARTIAL | `packages/lib/__tests__/` | 4 Vitest files: reading-time, search, slug, toc. No component/E2E tests. |
| **Email** | STUB | `apps/web/lib/email/index.ts` | TODO placeholder. Contact/newsletter forms log to console. |
| **Logs / Progress Export** | MISSING | — | No data export or deletion for user data (GDPR). |
| **Streaks / Badges** | MISSING | — | Not implemented. |
| **Gamification** | MISSING | — | No points, streaks, badges, or achievements. |
| **Webinar Series** | MISSING | — | No series/curriculum model. |
| **Community Challenges** | MISSING | — | No challenge model. |
| **Members Area** | MISSING | — | No gated content beyond auth-protected routes. |
| **Glossary Autolink** | MISSING | — | No auto-linking of glossary terms in MDX body. |
| **Taxonomy Registry** | MISSING | — | Tags/categories are per-file. No canonical registry or validation against allowed values. |

## Build Status

- `pnpm build`: PASSES (57/57 pages)
- `pnpm validate-content`: PASSES
- `pnpm test`: 4 unit tests pass
- Deployment: Vercel (aga-kundalini.vercel.app)
- Node: 24 locally (some quirks), 20 on Vercel
