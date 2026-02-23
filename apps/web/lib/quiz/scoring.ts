import { quizQuestions, quizStates, type QuizState } from './config';

export type QuizAnswers = Record<string, number>; // questionId -> value (0-3)

export type StateScore = {
  state: QuizState;
  score: number;
  maxScore: number;
};

/**
 * Oblicza wynik dla każdego stanu.
 * Scoring: suma odpowiedzi na pytania przypisane do danego stanu.
 * Każdy stan ma 4 pytania, max 12 pkt.
 */
export function calculateStateScores(answers: QuizAnswers): StateScore[] {
  return quizStates.map((state) => {
    const score = state.questionIds.reduce((sum, qId) => {
      return sum + (answers[qId] ?? 0);
    }, 0);
    const maxScore = state.questionIds.length * 3;
    return { state, score, maxScore };
  });
}

/**
 * Określa główny stan (i opcjonalnie drugi, jeśli różnica <= 1).
 * Tie-breaker: jeśli dwa najwyższe mają różnicę <= 1, pokaż oba.
 */
export function determineResult(answers: QuizAnswers): {
  primary: StateScore;
  secondary: StateScore | null;
} {
  const scores = calculateStateScores(answers);
  const sorted = [...scores].sort((a, b) => b.score - a.score);

  const primary = sorted[0];
  const runner = sorted[1];

  const secondary =
    runner && primary.score - runner.score <= 1 ? runner : null;

  return { primary, secondary };
}

export function isQuizComplete(answers: QuizAnswers): boolean {
  return quizQuestions.every((q) => answers[q.id] !== undefined);
}
