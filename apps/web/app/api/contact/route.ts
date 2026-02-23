import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Imie musi miec co najmniej 2 znaki')
    .max(100, 'Imie moze miec maksymalnie 100 znakow'),
  email: z
    .string()
    .email('Podaj prawidlowy adres email'),
  message: z
    .string()
    .min(10, 'Wiadomosc musi miec co najmniej 10 znakow')
    .max(5000, 'Wiadomosc moze miec maksymalnie 5000 znakow'),
});

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

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

    const { name, email, message } = result.data;

    // Mock: log to console (replace with email service / DB in production)
    console.log('[CONTACT] Nowa wiadomosc:');
    console.log(`  Od: ${name} <${email}>`);
    console.log(`  Tresc: ${message.slice(0, 100)}${message.length > 100 ? '...' : ''}`);

    // TODO: integrate with email provider (e.g. Resend, SendGrid)
    // await sendEmail({ to: 'aga@...', subject: `Kontakt: ${name}`, body: message });

    return NextResponse.json(
      {
        success: true,
        message: 'Dziekujemy za wiadomosc! Odpowiemy najszybciej jak to mozliwe.',
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
