import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const newsletterSchema = z.object({
  email: z
    .string()
    .email('Podaj prawidlowy adres email'),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Musisz wyrazic zgode na przetwarzanie danych',
    }),
});

// ---------------------------------------------------------------------------
// Newsletter provider adapter pattern
// ---------------------------------------------------------------------------

interface NewsletterProvider {
  subscribe(email: string): Promise<{ success: boolean; message?: string }>;
}

class MockNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string) {
    console.log(`[NEWSLETTER MOCK] Nowy subskrybent: ${email}`);
    return { success: true };
  }
}

// In production, swap with a real provider:
// class MailerLiteProvider implements NewsletterProvider { ... }
// class ConvertKitProvider implements NewsletterProvider { ... }

const provider: NewsletterProvider = new MockNewsletterProvider();

// ---------------------------------------------------------------------------
// POST /api/newsletter
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const subscribeResult = await provider.subscribe(email);

    if (!subscribeResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: subscribeResult.message || 'Nie udalo sie zapisac. Sprobuj ponownie.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Dziekujemy za zapis! Sprawdz skrzynke email, aby potwierdzic subskrypcje.',
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Wystapil blad serwera. Sprobuj ponownie pozniej.',
      },
      { status: 500 }
    );
  }
}
