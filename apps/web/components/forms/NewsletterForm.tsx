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
        body: JSON.stringify({
          email: data.get('email'),
        }),
      });

      if (!res.ok) {
        throw new Error('Nie udalo sie zapisac. Sprobuj ponownie.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Wystapil blad. Sprobuj ponownie.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-sage-50 border border-sage-200 p-6 text-center">
        <p className="text-sage-800 font-medium mb-1">Dziekuje za zapis!</p>
        <p className="text-sm text-sage-600">
          Sprawdz skrzynke – wyslalam potwierdzenie.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-earth-700 mb-1.5">
          Adres e-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="
            w-full px-4 py-2.5 rounded-lg border border-warm-200
            text-earth-800 text-sm placeholder-earth-400
            bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
            transition-colors
          "
          placeholder="twoj@email.pl"
        />
      </div>

      {/* Privacy consent */}
      <label className="flex items-start gap-2.5 text-sm text-earth-600 cursor-pointer">
        <input
          type="checkbox"
          name="consent-privacy"
          required
          className="mt-0.5 rounded border-earth-300 text-sage-600 focus:ring-sage-500"
        />
        <span>
          Zgadzam sie na przetwarzanie mojego adresu e-mail w celu wysylki newslettera.
          Mozesz sie wypisac w kazdej chwili.{' '}
          <a href="/legal/privacy" className="text-sage-600 underline underline-offset-2 hover:text-sage-700">
            Polityka prywatnosci
          </a>
        </span>
      </label>

      {/* Error */}
      {status === 'error' && (
        <p className="text-sm text-rose-600">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="
          w-full px-6 py-3 rounded-lg
          bg-sage-600 text-white font-medium text-sm
          hover:bg-sage-500 active:bg-sage-700
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-colors
        "
      >
        {status === 'submitting' ? 'Zapisywanie...' : 'Zapisz sie do newslettera'}
      </button>
    </form>
  );
}
