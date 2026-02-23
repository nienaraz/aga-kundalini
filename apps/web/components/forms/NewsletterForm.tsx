'use client';

import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email') }),
      });
      if (!res.ok) throw new Error('Nie udało się zapisać. Spróbuj ponownie.');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Wystąpił błąd. Spróbuj ponownie.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-sage-50/60 border border-sage-200/40 p-7 text-center">
        <p className="text-sage-800 font-medium mb-1">Dziękuję za zapis!</p>
        <p className="text-body-sm text-sage-600">Sprawdź skrzynkę – wysłałam potwierdzenie.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="newsletter-email" className="block text-body-sm font-medium text-earth-700 mb-2">
          Adres e-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-5 py-3 rounded-2xl border border-warm-200/60 text-earth-900 text-body-sm placeholder-earth-400 bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors"
          placeholder="twoj@email.pl"
        />
      </div>

      <label className="flex items-start gap-3 text-body-sm text-earth-600 cursor-pointer">
        <input
          type="checkbox"
          name="consent-privacy"
          required
          className="mt-0.5 rounded border-earth-300 text-sage-600 focus:ring-sage-500"
        />
        <span>
          Zgadzam się na przetwarzanie mojego adresu e-mail w celu wysyłki newslettera.{' '}
          <a href="/legal/privacy" className="text-sage-600 underline underline-offset-2 hover:text-sage-700">
            Polityka prywatności
          </a>
        </span>
      </label>

      {status === 'error' && <p className="text-body-sm text-rose-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-6 py-3.5 rounded-2xl bg-sage-600 text-white font-medium text-body-sm hover:bg-sage-700 active:bg-sage-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-soft"
      >
        {status === 'submitting' ? 'Zapisywanie...' : 'Zapisz się do newslettera'}
      </button>
    </form>
  );
}
