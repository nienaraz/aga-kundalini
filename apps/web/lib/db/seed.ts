import { db } from './index';
import { users, webinarEvents } from './schema';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('[seed] Starting seed...');

  // ------------------------------------------------------------------
  // 1. Admin user
  // ------------------------------------------------------------------
  const adminEmail = 'aga@example.com';
  const existingUser = db
    .select()
    .from(users)
    .where(eq(users.email, adminEmail))
    .get();

  if (!existingUser) {
    const now = new Date().toISOString();
    db.insert(users)
      .values({
        id: crypto.randomUUID(),
        email: adminEmail,
        name: 'Aga',
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      })
      .run();
    console.log('[seed] Created admin user: aga@example.com');
  } else {
    console.log('[seed] Admin user already exists, skipping.');
  }

  // ------------------------------------------------------------------
  // 2. Upcoming webinar (2 weeks from now)
  // ------------------------------------------------------------------
  const webinarSlug = 'regulacja-ukladu-nerwowego-wprowadzenie';
  const existingWebinar = db
    .select()
    .from(webinarEvents)
    .where(eq(webinarEvents.slug, webinarSlug))
    .get();

  if (!existingWebinar) {
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    twoWeeksFromNow.setHours(18, 0, 0, 0); // 18:00

    db.insert(webinarEvents)
      .values({
        id: crypto.randomUUID(),
        title: 'Regulacja układu nerwowego \u2013 wprowadzenie',
        slug: webinarSlug,
        description:
          'Dowiedz si\u0119, jak dzia\u0142a Tw\u00f3j uk\u0142ad nerwowy i poznaj proste techniki regulacji, kt\u00f3re mo\u017cesz stosowa\u0107 na co dzie\u0144.',
        startsAt: twoWeeksFromNow.toISOString(),
        durationMin: 60,
        host: 'Aga',
        language: 'pl',
        capacity: 50,
        status: 'upcoming',
        tags: JSON.stringify(['uk\u0142ad nerwowy', 'regulacja', 'wprowadzenie']),
        featured: false,
        draft: false,
        createdAt: new Date().toISOString(),
      })
      .run();
    console.log('[seed] Created webinar: Regulacja uk\u0142adu nerwowego \u2013 wprowadzenie');
  } else {
    console.log('[seed] Webinar already exists, skipping.');
  }

  console.log('[seed] Seed complete.');
}

seed().catch((err) => {
  console.error('[seed] Error:', err);
  process.exit(1);
});
