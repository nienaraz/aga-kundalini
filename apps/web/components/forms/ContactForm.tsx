'use client';

import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });

      if (!res.ok) {
        throw new Error('Nie udalo sie wyslac wiadomosci.');
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
        <p className="text-sage-800 font-medium mb-1">Dziekuje za wiadomosc!</p>
        <p className="text-sm text-sage-600">Odpowiem najszybciej jak to mozliwe.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-sage-600 underline underline-offset-2 hover:text-sage-700"
        >
          Wyslij kolejna wiadomosc
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-earth-700 mb-1.5">
          Imie
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="
            w-full px-4 py-2.5 rounded-lg border border-warm-200
            text-earth-800 text-sm placeholder-earth-400
            bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
            transition-colors
          "
          placeholder="Twoje imie"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-earth-700 mb-1.5">
          Email
        </label>
        <input
          id="contact-email"
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

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-earth-700 mb-1.5">
          Wiadomosc
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="
            w-full px-4 py-2.5 rounded-lg border border-warm-200
            text-earth-800 text-sm placeholder-earth-400
            bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
            transition-colors resize-y
          "
          placeholder="Napisz do mnie..."
        />
      </div>

      {/* Consent */}
      <div className="space-y-2">
        <label className="flex items-start gap-2.5 text-sm text-earth-600 cursor-pointer">
          <input
            type="checkbox"
            name="consent-privacy"
            required
            className="mt-0.5 rounded border-earth-300 text-sage-600 focus:ring-sage-500"
          />
          <span>
            Akceptuje{' '}
            <a href="/legal/privacy" className="text-sage-600 underline underline-offset-2 hover:text-sage-700">
              polityke prywatnosci
            </a>
            . Moje dane beda uzyte wylacznie do odpowiedzi na wiadomosc.
          </span>
        </label>
      </div>

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
        {status === 'submitting' ? 'Wysylanie...' : 'Wyslij wiadomosc'}
      </button>
    </form>
  );
}
