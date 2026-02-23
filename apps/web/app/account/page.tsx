'use client';

import { useSession, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const unauthorizedError = searchParams.get('error') === 'unauthorized';

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-earth-500 text-calm-body">Ładowanie...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Middleware handles redirect
  }

  const user = session.user;

  return (
    <div className="max-w-3xl mx-auto px-4 py-calm-lg">
      {/* Unauthorized warning */}
      {unauthorizedError && (
        <div className="mb-8 rounded-lg bg-warm-100 border border-warm-300 px-5 py-4 text-sm text-warm-800">
          Nie masz uprawnień do wyświetlenia tej strony.
        </div>
      )}

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-serif text-earth-900 mb-2">
          Moje konto
        </h1>
        <p className="text-earth-600">
          {user.name || user.email}
          {user.role !== 'guest' && (
            <span className="ml-2 inline-block rounded-full bg-sage-100 text-sage-700 text-xs px-2.5 py-0.5">
              {user.role}
            </span>
          )}
        </p>
      </div>

      {/* Sections grid */}
      <div className="space-y-8">
        {/* Favorites */}
        <section className="rounded-xl border border-earth-100 bg-warm-50 p-6">
          <h2 className="text-lg font-serif text-earth-800 mb-4">
            Moje ulubione
          </h2>
          <div className="text-earth-500 text-sm">
            <p>Nie masz jeszcze zapisanych ulubionych.</p>
            <p className="mt-2">
              Przeglądaj{' '}
              <a href="/praktyki" className="text-sage-600 underline hover:text-sage-700">
                praktyki
              </a>{' '}
              i{' '}
              <a href="/edukacja" className="text-sage-600 underline hover:text-sage-700">
                materiały edukacyjne
              </a>
              , aby dodać je do ulubionych.
            </p>
          </div>
        </section>

        {/* Paths / progress */}
        <section className="rounded-xl border border-earth-100 bg-warm-50 p-6">
          <h2 className="text-lg font-serif text-earth-800 mb-4">
            Moje ścieżki
          </h2>
          <div className="text-earth-500 text-sm">
            <p>Nie rozpocząłeś/aś jeszcze żadnej ścieżki.</p>
            <p className="mt-2">
              Sprawdź dostępne{' '}
              <a href="/sciezki" className="text-sage-600 underline hover:text-sage-700">
                ścieżki praktyki
              </a>
              .
            </p>
          </div>
        </section>

        {/* Quiz results */}
        <section className="rounded-xl border border-earth-100 bg-warm-50 p-6">
          <h2 className="text-lg font-serif text-earth-800 mb-4">
            Wyniki quizu
          </h2>
          <div className="text-earth-500 text-sm">
            <p>Brak zapisanych wyników.</p>
            <p className="mt-2">
              Wypróbuj{' '}
              <a
                href="/narzedzia/samosprawdzenie"
                className="text-sage-600 underline hover:text-sage-700"
              >
                narzędzie samosprawdzenia
              </a>
              , aby poznać swój aktualny stan regulacji.
            </p>
          </div>
        </section>
      </div>

      {/* Sign out */}
      <div className="mt-12 pt-8 border-t border-earth-100">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="rounded-lg border border-earth-200 px-5 py-2.5 text-sm text-earth-600
                     hover:bg-earth-50 hover:border-earth-300
                     focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2
                     transition-colors duration-200"
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
}
