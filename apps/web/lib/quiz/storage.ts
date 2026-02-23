import type { QuizAnswers, StateScore } from './scoring';

const STORAGE_KEY = 'joga-quiz-result';

export type StoredQuizResult = {
  answers: QuizAnswers;
  scores: StateScore[];
  stateId: string;
  completedAt: string;
};

/**
 * Zapisuje wynik quizu do localStorage.
 */
export function saveQuizResult(result: StoredQuizResult): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

/**
 * Odczytuje ostatni wynik quizu z localStorage.
 */
export function getLastQuizResult(): StoredQuizResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Usuwa wynik quizu z localStorage.
 */
export function clearQuizResult(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Opcjonalna persystencja do bazy danych (gdy użytkownik zalogowany).
 * localStorage jest zawsze fallbackiem.
 */
export async function syncQuizResultToDb(
  result: StoredQuizResult,
): Promise<void> {
  try {
    await fetch('/api/quiz/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
  } catch {
    // Cicha obsługa — localStorage jest zawsze fallbackiem
  }
}
