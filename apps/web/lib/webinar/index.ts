import { db } from '@/lib/db';
import { webinarEvents, webinarSignups } from '@/lib/db/schema';
import { eq, and, ne } from 'drizzle-orm';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WebinarEvent = typeof webinarEvents.$inferSelect;
export type WebinarSignup = typeof webinarSignups.$inferSelect;

export interface CreateSignupData {
  webinarId: string;
  name: string;
  email: string;
  question?: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  disclaimerConsent: boolean;
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Upcoming webinars (not draft, status='upcoming'), ordered by startsAt. */
export function getUpcomingWebinars(): WebinarEvent[] {
  return db
    .select()
    .from(webinarEvents)
    .where(
      and(
        eq(webinarEvents.status, 'upcoming'),
        eq(webinarEvents.draft, false),
      ),
    )
    .orderBy(webinarEvents.startsAt)
    .all();
}

/** Single webinar by slug. */
export function getWebinarBySlug(slug: string): WebinarEvent | undefined {
  return db
    .select()
    .from(webinarEvents)
    .where(
      and(
        eq(webinarEvents.slug, slug),
        eq(webinarEvents.draft, false),
      ),
    )
    .get();
}

/** Archived/ended webinars. */
export function getArchivedWebinars(): WebinarEvent[] {
  return db
    .select()
    .from(webinarEvents)
    .where(
      and(
        eq(webinarEvents.status, 'ended'),
        eq(webinarEvents.draft, false),
      ),
    )
    .orderBy(webinarEvents.startsAt)
    .all();
}

/** All webinars (for admin). */
export function getAllWebinars(): WebinarEvent[] {
  return db
    .select()
    .from(webinarEvents)
    .orderBy(webinarEvents.startsAt)
    .all();
}

// ---------------------------------------------------------------------------
// Signups
// ---------------------------------------------------------------------------

/** Create a webinar signup. Returns the new signup ID. */
export function createWebinarSignup(data: CreateSignupData): string {
  const id = crypto.randomUUID();

  db.insert(webinarSignups)
    .values({
      id,
      webinarId: data.webinarId,
      name: data.name,
      email: data.email,
      question: data.question ?? null,
      privacyConsent: data.privacyConsent,
      marketingConsent: data.marketingConsent,
      disclaimerConsent: data.disclaimerConsent,
    })
    .run();

  return id;
}

/** Get signups for a specific webinar. */
export function getSignupsForWebinar(webinarId: string): WebinarSignup[] {
  return db
    .select()
    .from(webinarSignups)
    .where(eq(webinarSignups.webinarId, webinarId))
    .orderBy(webinarSignups.createdAt)
    .all();
}

/** Get signup count for a webinar. */
export function getSignupCount(webinarId: string): number {
  const result = db
    .select()
    .from(webinarSignups)
    .where(eq(webinarSignups.webinarId, webinarId))
    .all();
  return result.length;
}

// ---------------------------------------------------------------------------
// CSV Export
// ---------------------------------------------------------------------------

/** Export signups as a CSV string. */
export function exportSignupsCsv(webinarId: string): string {
  const signups = getSignupsForWebinar(webinarId);

  const headers = [
    'Imie',
    'Email',
    'Pytanie',
    'Zgoda prywatnosc',
    'Zgoda marketing',
    'Zgoda zastrzezenie',
    'Data zapisu',
  ];

  const rows = signups.map((s) => [
    escapeCsv(s.name),
    escapeCsv(s.email),
    escapeCsv(s.question ?? ''),
    s.privacyConsent ? 'Tak' : 'Nie',
    s.marketingConsent ? 'Tak' : 'Nie',
    s.disclaimerConsent ? 'Tak' : 'Nie',
    s.createdAt,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
