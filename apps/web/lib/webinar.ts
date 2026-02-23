import { db } from '@/lib/db';
import { webinarEvents, webinarSignups } from '@/lib/db/schema';
import { eq, and, gte, lt, sql } from 'drizzle-orm';

export type WebinarEvent = typeof webinarEvents.$inferSelect;
export type WebinarSignup = typeof webinarSignups.$inferSelect;

// ---------------------------------------------------------------------------
// Webinar queries
// ---------------------------------------------------------------------------

export function getAllWebinars(): WebinarEvent[] {
  return db.select().from(webinarEvents).all();
}

export function getWebinarBySlug(slug: string): WebinarEvent | undefined {
  return db
    .select()
    .from(webinarEvents)
    .where(eq(webinarEvents.slug, slug))
    .get();
}

export function getUpcomingWebinars(): WebinarEvent[] {
  const now = new Date().toISOString();
  return db
    .select()
    .from(webinarEvents)
    .where(
      and(
        gte(webinarEvents.startsAt, now),
        eq(webinarEvents.draft, false),
      ),
    )
    .all();
}

export function getArchivedWebinars(): WebinarEvent[] {
  const now = new Date().toISOString();
  return db
    .select()
    .from(webinarEvents)
    .where(
      and(
        lt(webinarEvents.startsAt, now),
        eq(webinarEvents.draft, false),
      ),
    )
    .all();
}

// ---------------------------------------------------------------------------
// Signup queries
// ---------------------------------------------------------------------------

export function getSignupCount(webinarId: string): number {
  const result = db
    .select({ count: sql<number>`count(*)` })
    .from(webinarSignups)
    .where(eq(webinarSignups.webinarId, webinarId))
    .get();
  return result?.count ?? 0;
}

export function getSignupsForWebinar(webinarId: string): WebinarSignup[] {
  return db
    .select()
    .from(webinarSignups)
    .where(eq(webinarSignups.webinarId, webinarId))
    .all();
}

export function createWebinarSignup(data: {
  webinarId: string;
  name: string;
  email: string;
  question?: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  disclaimerConsent: boolean;
}): WebinarSignup {
  const id = crypto.randomUUID();
  return db
    .insert(webinarSignups)
    .values({ id, ...data })
    .returning()
    .get();
}

// ---------------------------------------------------------------------------
// CSV export
// ---------------------------------------------------------------------------

export function exportSignupsCsv(webinarId: string): string {
  const signups = getSignupsForWebinar(webinarId);

  const header =
    'name,email,question,privacyConsent,marketingConsent,disclaimerConsent,createdAt';
  const rows = signups.map((s) =>
    [
      csvEscape(s.name),
      csvEscape(s.email),
      csvEscape(s.question ?? ''),
      s.privacyConsent ? 'true' : 'false',
      s.marketingConsent ? 'true' : 'false',
      s.disclaimerConsent ? 'true' : 'false',
      s.createdAt,
    ].join(','),
  );

  return [header, ...rows].join('\n');
}

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
