// ---------------------------------------------------------------------------
// Email – queue interface + mock provider
// ---------------------------------------------------------------------------

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}

export interface EmailProvider {
  send(payload: EmailPayload): Promise<{ success: boolean; messageId?: string }>;
}

// ---------------------------------------------------------------------------
// Mock provider – logs to console
// ---------------------------------------------------------------------------

class MockEmailProvider implements EmailProvider {
  async send(payload: EmailPayload) {
    console.log('[EMAIL MOCK]', JSON.stringify(payload, null, 2));
    return { success: true, messageId: `mock-${Date.now()}` };
  }
}

export const emailProvider: EmailProvider = new MockEmailProvider();

// ---------------------------------------------------------------------------
// Webinar-specific helpers
// ---------------------------------------------------------------------------

export async function sendWebinarConfirmation(to: string, webinarTitle: string) {
  return emailProvider.send({
    to,
    subject: `Potwierdzenie zapisu: ${webinarTitle}`,
    body: `Dziękujemy za zapis na webinar "${webinarTitle}". Szczegóły zostaną wysłane bliżej terminu.`,
  });
}
