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
import type { StateScore } from '@/lib/quiz/scoring';

// ---------------------------------------------------------------------------
// State-based color mapping for the bento result card
// ---------------------------------------------------------------------------
const stateColorMap: Record<
  string,
  { bg: string; border: string; pill: string; pillText: string }
> = {
  regulated: {
    bg: 'bg-sage-100/60',
    border: 'border-sage-200/40',
    pill: 'bg-sage-200/70',
    pillText: 'text-sage-800',
  },
  activation: {
    bg: 'bg-gold-50',
    border: 'border-gold-200/40',
    pill: 'bg-gold-200/70',
    pillText: 'text-gold-900',
  },
  shutdown: {
    bg: 'bg-warm-100/60',
    border: 'border-warm-200/40',
    pill: 'bg-warm-300/50',
    pillText: 'text-earth-800',
  },
  mixed: {
    bg: 'bg-rose-50',
    border: 'border-rose-200/40',
    pill: 'bg-rose-200/50',
    pillText: 'text-rose-800',
  },
};

const defaultColors = {
  bg: 'bg-warm-100/60',
  border: 'border-warm-200/40',
  pill: 'bg-warm-300/50',
  pillText: 'text-earth-800',
};

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
        <div className="content-container-xs text-center">
          <p className="text-body-base text-earth-500">Wczytuję wynik...</p>
        </div>
      </div>
    );
  }

  const colors = stateColorMap[state.id] ?? defaultColors;

  return (
    <>
      <title>Twój wynik | Aga &middot; Joga Kundalini</title>

      <div className="section-spacing">
        <div className="content-container-xs">
          {/* ---------------------------------------------------------------- */}
          {/* Top disclaimer                                                    */}
          {/* ---------------------------------------------------------------- */}
          <div className="card-warm mb-10" role="alert">
            <p className="text-body-sm text-earth-700 leading-relaxed">
              <strong className="text-earth-950 font-semibold">
                Pamiętaj:
              </strong>{' '}
              To narzędzie samoobserwacji, nie diagnoza. Wynik odzwierciedla
              Twoje odpowiedzi w tym momencie i może się zmieniać.
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Result card — bento style with state-based color                  */}
          {/* ---------------------------------------------------------------- */}
          <div
            className={`animate-fade-in bento-card ${colors.bg} ${colors.border} border mb-10`}
          >
            <span
              className={`inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] ${colors.pillText} ${colors.pill} px-3.5 py-1.5 rounded-full mb-5`}
            >
              Twój profil regulacji
            </span>
            <h1 className="font-serif text-display-sm text-earth-950 mb-5">
              {state.name}
            </h1>
            <p className="text-body-base text-earth-700 leading-relaxed mb-8">
              {state.description}
            </p>

            {/* Dimension scores mini-chart */}
            <DimensionChart scores={result.scores} />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* What to try                                                       */}
          {/* ---------------------------------------------------------------- */}
          <div className="animate-slide-up card-sage mb-10">
            <h2 className="font-serif text-heading-base text-earth-950 mb-5">
              Co możesz wypróbować
            </h2>
            <ul className="space-y-4">
              {state.whatToTry.map((tip, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-200/70 text-sage-800 text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-body-base text-earth-700 leading-relaxed">
                    {tip}
                  </span>
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
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRetake}
              className="rounded-2xl border border-sage-300 px-8 py-3.5 text-body-sm font-medium text-sage-700 transition-all duration-300 hover:bg-sage-50 hover:shadow-soft"
            >
              Powtórz quiz
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || saved}
              className={`rounded-2xl px-8 py-3.5 text-body-sm font-medium transition-all duration-300 ${
                saved
                  ? 'bg-sage-100 text-sage-700 cursor-default border border-sage-200/40'
                  : saving
                    ? 'bg-warm-200 text-earth-400 cursor-wait'
                    : 'bg-sage-600 text-white hover:bg-sage-700 shadow-soft hover:shadow-soft-lg'
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
          <footer className="mt-20 card-warm">
            <h3 className="text-body-sm font-semibold text-earth-800 mb-2.5">
              Zastrzeżenie medyczne
            </h3>
            <p className="text-xs text-earth-600 leading-relaxed">
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
// Dimension Chart – wizualizacja wyników w każdym stanie
// ---------------------------------------------------------------------------
function DimensionChart({ scores }: { scores: StateScore[] }) {
  return (
    <div className="space-y-4">
      {scores.map(({ state, score, maxScore }) => {
        const pct = maxScore > 0 ? Math.min(100, Math.round((score / maxScore) * 100)) : 0;

        return (
          <div key={state.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-body-sm text-earth-700 font-medium">
                {state.name}
              </span>
              <span className="text-xs text-earth-500">
                {score}/{maxScore}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-warm-200/80 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${pct}%`,
                  backgroundColor:
                    pct < 40
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
// Recommendation Cards — bento-style grid
// ---------------------------------------------------------------------------
function RecommendationCards({
  recommendations,
}: {
  recommendations: QuizState['recommendations'];
}) {
  const cardStyles = [
    'card-calm',
    'card-sage',
    'card-warm',
    'card-gold',
  ];

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
    <div className="mb-10">
      <h2 className="font-serif text-heading-base text-earth-950 mb-5">
        Polecane dla Ciebie
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <Link
            key={card.href}
            href={card.href}
            className={`${cardStyles[idx % cardStyles.length]} flex items-center gap-4 group bento-card-hover`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-100/80 text-sage-700 transition-colors duration-300 group-hover:bg-sage-200">
              <CardIcon type={card.icon} />
            </span>
            <span className="text-body-base text-earth-700 font-medium group-hover:text-sage-700 transition-colors duration-300">
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
