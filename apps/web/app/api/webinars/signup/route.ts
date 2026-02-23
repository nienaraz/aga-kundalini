import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createWebinarSignup, getWebinarBySlug, getSignupCount } from '@/lib/webinar';
import { webinarEvents } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { sendWebinarConfirmation } from '@/lib/email';

/* ------------------------------------------------------------------ */
/*  POST /api/webinars/signup – Register for a webinar                  */
/* ------------------------------------------------------------------ */

const signupSchema = z.object({
  webinarId: z.string().min(1, 'Brak identyfikatora webinaru.'),
  name: z.string().min(1, 'Imie jest wymagane.').max(100),
  email: z.string().email('Podaj prawidlowy adres e-mail.'),
  question: z.string().max(1000).optional(),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'Akceptacja polityki prywatnosci jest wymagana.' }),
  }),
  marketingConsent: z.boolean(),
  disclaimerConsent: z.literal(true, {
    errorMap: () => ({
      message: 'Akceptacja zastrzezenia medycznego jest wymagana.',
    }),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Nieprawidlowe dane.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Verify webinar exists and is upcoming
    const webinar = db
      .select()
      .from(webinarEvents)
      .where(eq(webinarEvents.id, data.webinarId))
      .get();

    if (!webinar) {
      return NextResponse.json(
        { error: 'Webinar nie zostal znaleziony.' },
        { status: 404 },
      );
    }

    if (webinar.status !== 'upcoming') {
      return NextResponse.json(
        { error: 'Zapisy na ten webinar sa zamkniete.' },
        { status: 400 },
      );
    }

    // Check capacity
    if (webinar.capacity != null) {
      const currentCount = getSignupCount(webinar.id);
      if (currentCount >= webinar.capacity) {
        return NextResponse.json(
          { error: 'Brak wolnych miejsc.' },
          { status: 400 },
        );
      }
    }

    // Create signup
    const signupId = createWebinarSignup({
      webinarId: data.webinarId,
      name: data.name,
      email: data.email,
      question: data.question,
      privacyConsent: data.privacyConsent,
      marketingConsent: data.marketingConsent,
      disclaimerConsent: data.disclaimerConsent,
    });

    // Send confirmation email (mock)
    await sendWebinarConfirmation(data.email, webinar.title);

    return NextResponse.json(
      {
        success: true,
        signupId,
        message: 'Zapis zakonczony pomyslnie.',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('[api/webinars/signup] Error:', error);
    return NextResponse.json(
      { error: 'Wystapil blad serwera. Sprobuj ponownie pozniej.' },
      { status: 500 },
    );
  }
}
