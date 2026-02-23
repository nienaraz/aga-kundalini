'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError('Nie znaleziono konta z tym adresem email.');
      } else if (result?.ok) {
        setSuccess(true);
        // Redirect after short delay so user sees success state
        window.location.href = callbackUrl;
      }
    } catch {
      setError('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-calm-lg">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-serif text-earth-900 mb-3">
            Zaloguj się
          </h1>
          <p className="text-earth-600 text-calm-body leading-relaxed">
            Konto umożliwia zapisywanie ulubionych i śledzenie postępów.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-earth-700 mb-2"
            >
              Adres email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              className="w-full rounded-lg border border-earth-200 bg-warm-50 px-4 py-3
                         text-earth-900 placeholder:text-earth-400
                         focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent
                         transition-colors duration-200"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="rounded-lg bg-sage-50 border border-sage-200 px-4 py-3 text-sm text-sage-700">
              Zalogowano pomyślnie. Przekierowywanie...
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full rounded-lg bg-sage-600 px-6 py-3 text-white font-medium
                       hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        {/* Registration placeholder */}
        <div className="mt-8 text-center">
          <p className="text-sm text-earth-500">
            Nie masz jeszcze konta?{' '}
            <span className="text-sage-600 font-medium cursor-default">
              Rejestracja wkrótce dostępna
            </span>
          </p>
        </div>

        {/* Subtle divider */}
        <div className="mt-8 border-t border-earth-100 pt-6">
          <p className="text-xs text-earth-400 text-center leading-relaxed">
            Logując się, akceptujesz naszą{' '}
            <a href="/prawne/polityka-prywatnosci" className="underline hover:text-earth-600">
              politykę prywatności
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
