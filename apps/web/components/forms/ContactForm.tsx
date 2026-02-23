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
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message') }),
      });
      if (!res.ok) throw new Error('Nie udało się wysłać wiadomości.');
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
        <p className="text-sage-800 font-medium mb-1">Dziękuję za wiadomość!</p>
        <p className="text-body-sm text-sage-600">Odpowiem najszybciej jak to możliwe.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-body-sm text-sage-600 underline underline-offset-2 hover:text-sage-700"
        >
          Wyślij kolejną wiadomość
        </button>
      </div>
    );
  }

  const inputClasses = "w-full px-5 py-3 rounded-2xl border border-warm-200/60 text-earth-900 text-body-sm placeholder-earth-400 bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-body-sm font-medium text-earth-700 mb-2">Imię</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className={inputClasses} placeholder="Twoje imię" />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-body-sm font-medium text-earth-700 mb-2">Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className={inputClasses} placeholder="twoj@email.pl" />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-body-sm font-medium text-earth-700 mb-2">Wiadomość</label>
        <textarea id="contact-message" name="message" required rows={5} className={`${inputClasses} resize-y`} placeholder="Napisz do mnie..." />
      </div>

      <label className="flex items-start gap-3 text-body-sm text-earth-600 cursor-pointer">
        <input type="checkbox" name="consent-privacy" required className="mt-0.5 rounded border-earth-300 text-sage-600 focus:ring-sage-500" />
        <span>
          Akceptuję{' '}
          <a href="/legal/privacy" className="text-sage-600 underline underline-offset-2 hover:text-sage-700">politykę prywatności</a>.
          Moje dane będą użyte wyłącznie do odpowiedzi na wiadomość.
        </span>
      </label>

      {status === 'error' && <p className="text-body-sm text-rose-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-6 py-3.5 rounded-2xl bg-sage-600 text-white font-medium text-body-sm hover:bg-sage-700 active:bg-sage-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-soft"
      >
        {status === 'submitting' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>
    </form>
  );
}
