'use client';

import { useState, useEffect, useCallback } from 'react';

type PathProgressTrackerProps = {
  slug: string;
  totalDays: number;
};

function getStorageKey(slug: string) {
  return `joga-path-progress-${slug}`;
}

function getProgress(slug: string): { completedDays: number; startedAt: string | null } {
  if (typeof window === 'undefined') return { completedDays: 0, startedAt: null };
  try {
    const stored = localStorage.getItem(getStorageKey(slug));
    if (!stored) return { completedDays: 0, startedAt: null };
    return JSON.parse(stored);
  } catch {
    return { completedDays: 0, startedAt: null };
  }
}

function saveProgress(slug: string, completedDays: number, startedAt: string) {
  localStorage.setItem(
    getStorageKey(slug),
    JSON.stringify({ completedDays, startedAt })
  );
}

export function PathProgressTracker({ slug, totalDays }: PathProgressTrackerProps) {
  const [completedDays, setCompletedDays] = useState(0);
  const [startedAt, setStartedAt] = useState<string | null>(null);

  useEffect(() => {
    const progress = getProgress(slug);
    setCompletedDays(progress.completedDays);
    setStartedAt(progress.startedAt);
  }, [slug]);

  const progressPercent = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  const isStarted = startedAt !== null;
  const isComplete = completedDays >= totalDays;

  const handleStart = useCallback(() => {
    const now = new Date().toISOString();
    setStartedAt(now);
    setCompletedDays(0);
    saveProgress(slug, 0, now);
  }, [slug]);

  const handleCompleteDay = useCallback(() => {
    if (completedDays >= totalDays) return;
    const next = completedDays + 1;
    const started = startedAt || new Date().toISOString();
    setCompletedDays(next);
    setStartedAt(started);
    saveProgress(slug, next, started);
  }, [slug, completedDays, totalDays, startedAt]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(getStorageKey(slug));
    setCompletedDays(0);
    setStartedAt(null);
  }, [slug]);

  return (
    <div className="rounded-xl bg-warm-50 border border-warm-200 p-6 mb-10">
      <h2 className="font-serif text-lg text-earth-800 mb-4">Twoj postep</h2>

      {/* Progress bar */}
      <div className="w-full bg-warm-200 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className="bg-sage-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <p className="text-sm text-earth-600 mb-4">
        {isComplete
          ? 'Ukonczona! Gratulacje.'
          : `${completedDays} z ${totalDays} dni (${progressPercent}%)`}
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        {!isStarted && (
          <button
            type="button"
            onClick={handleStart}
            className="px-5 py-2 rounded-lg bg-sage-600 text-white text-sm font-medium hover:bg-sage-500 transition-colors"
          >
            Zacznij sciezke
          </button>
        )}

        {isStarted && !isComplete && (
          <button
            type="button"
            onClick={handleCompleteDay}
            className="px-5 py-2 rounded-lg bg-sage-600 text-white text-sm font-medium hover:bg-sage-500 transition-colors"
          >
            Oznacz dzien {completedDays + 1} jako ukonczony
          </button>
        )}

        {isStarted && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-sm text-earth-500 hover:text-earth-700 hover:bg-warm-100 transition-colors"
          >
            Resetuj postep
          </button>
        )}
      </div>
    </div>
  );
}
