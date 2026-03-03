'use client';

import { useState, useCallback } from 'react';

type Variant = 'light' | 'dark';

export function NewsletterForm({ variant = 'light' }: { variant?: Variant }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isDark = variant === 'dark';

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage('Zapisano! Sprawdź skrzynkę email.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.errors?.email?.[0] || data.message || 'Coś poszło nie tak.');
      }
    } catch {
      setStatus('error');
      setMessage('Błąd połączenia. Spróbuj ponownie.');
    }
  }, [email, status]);

  if (status === 'success') {
    return (
      <div className={`rounded-xl p-5 text-center ${isDark ? 'bg-sage-900/40 border border-sage-700/30' : 'bg-sage-50 border border-sage-200/50'}`}>
        <svg className="w-8 h-8 mx-auto mb-2 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className={`text-body-sm font-medium ${isDark ? 'text-sage-300' : 'text-sage-700'}`}>{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className={`flex flex-col sm:flex-row gap-2.5 ${isDark ? '' : 'max-w-md mx-auto'}`}>
        <label htmlFor={`nl-email-${variant}`} className="sr-only">Adres e-mail</label>
        <input
          id={`nl-email-${variant}`}
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          placeholder="twoj@email.pl"
          autoComplete="email"
          disabled={status === 'loading'}
          className={`
            flex-1 px-5 py-3.5 rounded-xl text-body-sm transition-all
            focus:outline-none focus:ring-2 focus:ring-sage-400/40 focus:border-transparent
            disabled:opacity-60
            ${isDark
              ? 'bg-earth-900 border border-earth-700 text-warm-100 placeholder-warm-600'
              : 'bg-white border border-cobalt-500/25 text-earth-900 placeholder-earth-400'
            }
          `}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`
            shrink-0 px-6 py-3.5 rounded-xl font-semibold text-body-sm transition-all
            disabled:opacity-60
            ${isDark
              ? 'bg-sage-600 text-white hover:bg-sage-500 active:bg-sage-700'
              : 'btn-editorial'
            }
          `}
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Zapisuję...
            </span>
          ) : 'Zapisz się'}
        </button>
      </div>

      {status === 'error' && (
        <p className={`text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>{message}</p>
      )}

      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-warm-600' : 'text-earth-400'}`}>
        Zapisując się, wyrażasz zgodę na przetwarzanie adresu email w celu wysyłki newslettera. Bez spamu, raz w tygodniu. Możesz się wypisać w każdej chwili.
      </p>
    </form>
  );
}
