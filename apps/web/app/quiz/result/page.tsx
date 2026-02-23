'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { quizStates } from '@/lib/quiz/config';
import type { QuizState } from '@/lib/quiz/config';
import {
  getLastQuizResult,
  clearQuizResult,
  syncQuizResultToDb,
} from '@/lib/quiz/storage';
import type { StoredQuizResult } from '@/lib/quiz/storage';
import type { QuizScores } from '@/lib/quiz/scoring';

export default function QuizResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredQuizResult | null>(null);
  const [state, setState] = useState<QuizState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getLastQuizResult();
    if (!stored) {
      router.replace('/quiz');
      return;
    }

    setResult(stored);

    const matchedState = quizStates.find((s) => s.id === stored.stateId);
    setState(matchedState ?? quizStates[quizStates.length - 1]);
    setLoading(false);
  }, [router]);

  const handleRetake = useCallback(() => {
    clearQuizResult();
    router.push('/quiz');
  }, [router]);

  const handleSave = useCallback(async () => {
    if (!result || saving) return;
    setSaving(true);
    await syncQuizResultToDb(result);
    setSaving(false);
    setSaved(true);
  }, [result, saving]);

  if (loading || !state || !result) {
    return (
      <div className="section-spacing">
        <div className="content-container max-w-2xl text-center">
          <p className="text-earth-400">Wczytuję wynik...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Twój wynik | Aga &middot; Joga Kundalini</title>

      <div className="section-spacing">
        <div className="content-container max-w-2xl">
          {/* ---------------------------------------------------------------- */}
          {/* Top disclaimer                                                    */}
          {/* ---------------------------------------------------------------- */}
          <div
            className="mb-8 rounded-xl border border-warm-300 bg-warm-100/60 px-5 py-4"
            role="alert"
          >
            <p className="text-sm text-earth-700 leading-relaxed">
              <strong className="text-earth-800">Pamiętaj:</strong> To
              narzędzie samoobserwacji, nie diagnoza. Wynik odzwierciedla
              Twoje odpowiedzi w tym momencie i może się zmieniać.
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Result card                                                       */}
          {/* ---------------------------------------------------------------- */}
          <div className="animate-fade-in rounded-2xl border border-sage-200 bg-white p-6 md:p-8 shadow-sm mb-8">
            <p className="text-xs font-medium text-sage-600 mb-2 uppercase tracking-wide">
              Twój profil regulacji
            </p>
            <h1 className="font-serif text-2xl md:text-3xl text-earth-800 mb-4">
              {state.name}
            </h1>
            <p className="text-earth-600 leading-relaxed mb-6">
              {state.description}
            </p>

            {/* Dimension scores mini-chart */}
            <DimensionChart scores={result.scores} />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* What to try                                                       */}
          {/* ---------------------------------------------------------------- */}
          <div className="animate-slide-up rounded-2xl border border-warm-200 bg-warm-50 p-6 md:p-8 mb-8">
            <h2 className="font-serif text-xl text-earth-800 mb-4">
              Co możesz wypróbować
            </h2>
            <ul className="space-y-3">
              {state.whatToTry.map((tip, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700 text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-earth-700 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Recommendations                                                   */}
          {/* ---------------------------------------------------------------- */}
          <RecommendationCards recommendations={state.recommendations} />

          {/* ---------------------------------------------------------------- */}
          {/* Actions                                                           */}
          {/* ---------------------------------------------------------------- */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRetake}
              className="rounded-xl border border-sage-300 px-6 py-3 text-sm font-medium text-sage-700 transition-colors hover:bg-sage-50"
            >
              Powtórz quiz
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || saved}
              className={`rounded-xl px-6 py-3 text-sm font-medium transition-colors ${
                saved
                  ? 'bg-sage-100 text-sage-600 cursor-default'
                  : saving
                    ? 'bg-warm-200 text-earth-400 cursor-wait'
                    : 'bg-sage-600 text-white hover:bg-sage-700'
              }`}
            >
              {saved
                ? 'Zapisano'
                : saving
                  ? 'Zapisuję...'
                  : 'Zapisz wynik'}
            </button>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Footer disclaimer                                                 */}
          {/* ---------------------------------------------------------------- */}
          <footer className="mt-16 rounded-xl border border-warm-300 bg-warm-100/40 px-5 py-5">
            <h3 className="text-sm font-semibold text-earth-700 mb-2">
              Zastrzeżenie medyczne
            </h3>
            <p className="text-xs text-earth-500 leading-relaxed">
              Ten quiz jest narzędziem edukacyjnym i samoobserwacyjnym. Nie
              stanowi diagnozy medycznej, psychologicznej ani psychiatrycznej.
              Nie zastępuje profesjonalnej pomocy. Jeśli doświadczasz
              poważnych objawów, takich jak: uporczywe problemy ze snem,
              ataki paniki, chroniczne zmęczenie, odcięcie od emocji lub
              myśli samobójcze — skontaktuj się ze specjalistą. W nagłych
              wypadkach dzwoń na Telefon Zaufania dla Dzieci i Młodzieży:
              116 111 lub Centrum Wsparcia dla osób dorosłych: 800 70 2222.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Dimension Chart – wizualizacja wyników w 4 wymiarach
// ---------------------------------------------------------------------------
function DimensionChart({ scores }: { scores: QuizScores }) {
  const dimensions = [
    { key: 'activation' as const, label: 'Aktywacja', max: 9 },
    { key: 'shutdown' as const, label: 'Wygaszenie', max: 9 },
    { key: 'reactivity' as const, label: 'Reaktywność', max: 6 },
    { key: 'regulation' as const, label: 'Regulacja', max: 6 },
  ];

  return (
    <div className="space-y-3">
      {dimensions.map(({ key, label, max }) => {
        const value = scores[key];
        const pct = Math.min(100, Math.round((value / max) * 100));

        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-earth-600">{label}</span>
              <span className="text-xs text-earth-400">
                {value}/{max}
              </span>
            </div>
            <div className="h-2 rounded-full bg-warm-200 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${pct}%`,
                  backgroundColor:
                    key === 'regulation'
                      ? // Regulation odwrotnie — niższy wynik = lepiej
                        pct < 40
                        ? '#587d58'
                        : pct < 70
                          ? '#dea45c'
                          : '#cc3361'
                      : pct < 40
                        ? '#587d58'
                        : pct < 70
                          ? '#dea45c'
                          : '#cc3361',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Recommendation Cards
// ---------------------------------------------------------------------------
function RecommendationCards({
  recommendations,
}: {
  recommendations: QuizState['recommendations'];
}) {
  const cards: { label: string; href: string; icon: string }[] = [];

  if (recommendations.video) {
    cards.push({
      label: 'Obejrzyj wideo',
      href: `/video/${recommendations.video}`,
      icon: 'video',
    });
  }
  if (recommendations.practice) {
    cards.push({
      label: 'Wypróbuj praktykę',
      href: `/praktyki/${recommendations.practice}`,
      icon: 'practice',
    });
  }
  if (recommendations.article) {
    cards.push({
      label: 'Przeczytaj artykuł',
      href: `/edukacja/${recommendations.article}`,
      icon: 'article',
    });
  }
  if (recommendations.path) {
    cards.push({
      label: 'Rozpocznij ścieżkę',
      href: `/sciezki/${recommendations.path}`,
      icon: 'path',
    });
  }

  if (cards.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="font-serif text-xl text-earth-800 mb-4">
        Polecane dla Ciebie
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="card-calm flex items-center gap-4 group"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage-100 text-sage-700 transition-colors group-hover:bg-sage-200">
              <CardIcon type={card.icon} />
            </span>
            <span className="text-earth-700 font-medium group-hover:text-sage-700 transition-colors">
              {card.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Simple SVG icons for cards
// ---------------------------------------------------------------------------
function CardIcon({ type }: { type: string }) {
  const cls = 'h-5 w-5';

  switch (type) {
    case 'video':
      return (
        <svg
          className={cls}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      );
    case 'practice':
      return (
        <svg
          className={cls}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      );
    case 'article':
      return (
        <svg
          className={cls}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      );
    case 'path':
      return (
        <svg
          className={cls}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
      );
    default:
      return null;
  }
}
