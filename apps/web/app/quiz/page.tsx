'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/lib/quiz/config';
import { calculateStateScores, determineResult } from '@/lib/quiz/scoring';
import { saveQuizResult } from '@/lib/quiz/storage';
import type { QuizAnswers } from '@/lib/quiz/scoring';

// ---------------------------------------------------------------------------
// Metadata cannot be exported from 'use client' — set via <title> in head
// ---------------------------------------------------------------------------

type ViewMode = 'step' | 'all';

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('step');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = quizQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const currentQuestion = quizQuestions[currentStep];

  const handleAnswer = useCallback(
    (questionId: string, value: number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));

      // W trybie krokowym automatycznie przejdź do następnego pytania
      if (viewMode === 'step') {
        setTimeout(() => {
          if (currentStep < totalQuestions - 1) {
            setCurrentStep((s) => s + 1);
          }
        }, 350);
      }
    },
    [viewMode, currentStep, totalQuestions],
  );

  const handleSubmit = useCallback(async () => {
    if (!allAnswered || isSubmitting) return;
    setIsSubmitting(true);

    const result = determineResult(answers);

    saveQuizResult({
      answers,
      scores: calculateStateScores(answers),
      stateId: result.primary.state.id,
      completedAt: new Date().toISOString(),
    });

    router.push('/quiz/result');
  }, [answers, allAnswered, isSubmitting, router]);

  // Czy bieżące pytanie (w trybie step) jest odpowiedziane
  const currentAnswered = currentQuestion
    ? answers[currentQuestion.id] !== undefined
    : false;

  return (
    <>
      <title>Samosprawdzenie | Aga &middot; Joga Kundalini</title>

      <div className="section-spacing">
        <div className="content-container-xs">
          {/* ---------------------------------------------------------------- */}
          {/* Header                                                            */}
          {/* ---------------------------------------------------------------- */}
          <header className="mb-10">
            <span className="label-editorial-pill mb-5 inline-flex">
              Narzędzie
            </span>
            <h1 className="font-serif text-display-sm text-earth-950 mb-4">
              Samosprawdzenie
            </h1>
            <p className="text-body-lg text-earth-600 leading-relaxed max-w-lg">
              Sprawdź, jak teraz funkcjonuje Twój układ nerwowy. To zajmie
              około 2 minut.
            </p>
          </header>

          {/* ---------------------------------------------------------------- */}
          {/* Disclaimer                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div className="card-warm mb-10" role="alert">
            <p className="text-body-sm text-earth-700 leading-relaxed">
              <strong className="text-earth-950 font-semibold">Ważne:</strong>{' '}
              To narzędzie samoobserwacji, nie diagnoza medyczna. Wynik nie
              zastępuje konsultacji ze specjalistą. W przypadku poważnych
              objawów skonsultuj się z lekarzem lub psychologiem.
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Progress Bar                                                      */}
          {/* ---------------------------------------------------------------- */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-body-sm text-earth-600">
                {answeredCount} z {totalQuestions} pytań
              </span>
              <span className="text-body-sm text-earth-600">{progress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-warm-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-sage-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* View mode toggle                                                  */}
          {/* ---------------------------------------------------------------- */}
          <div className="mb-8 flex gap-3">
            <button
              type="button"
              onClick={() => setViewMode('step')}
              className={`rounded-2xl px-5 py-2.5 text-body-sm font-medium transition-all duration-300 ${
                viewMode === 'step'
                  ? 'bg-sage-600 text-white shadow-soft'
                  : 'bg-warm-100 text-earth-600 hover:bg-warm-200 border border-warm-200/60'
              }`}
            >
              Krok po kroku
            </button>
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`rounded-2xl px-5 py-2.5 text-body-sm font-medium transition-all duration-300 ${
                viewMode === 'all'
                  ? 'bg-sage-600 text-white shadow-soft'
                  : 'bg-warm-100 text-earth-600 hover:bg-warm-200 border border-warm-200/60'
              }`}
            >
              Wszystkie naraz
            </button>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Questions                                                         */}
          {/* ---------------------------------------------------------------- */}
          {viewMode === 'step' ? (
            <StepView
              question={currentQuestion}
              questionIndex={currentStep}
              totalQuestions={totalQuestions}
              selectedValue={answers[currentQuestion.id]}
              onAnswer={handleAnswer}
              onPrev={() => setCurrentStep((s) => Math.max(0, s - 1))}
              onNext={() =>
                setCurrentStep((s) => Math.min(totalQuestions - 1, s + 1))
              }
              canGoPrev={currentStep > 0}
              canGoNext={currentStep < totalQuestions - 1 && currentAnswered}
            />
          ) : (
            <AllQuestionsView
              questions={quizQuestions}
              answers={answers}
              onAnswer={handleAnswer}
            />
          )}

          {/* ---------------------------------------------------------------- */}
          {/* Submit                                                            */}
          {/* ---------------------------------------------------------------- */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className={`rounded-2xl px-10 py-4 text-body-base font-medium transition-all duration-300 ${
                allAnswered && !isSubmitting
                  ? 'bg-sage-600 text-white hover:bg-sage-700 shadow-soft hover:shadow-soft-lg'
                  : 'bg-warm-200 text-earth-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Obliczam...' : 'Zobacz wynik'}
            </button>
            {!allAnswered && (
              <p className="text-body-sm text-earth-500">
                Odpowiedz na wszystkie pytania, aby zobaczyć wynik
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Step View – jedno pytanie na raz
// ---------------------------------------------------------------------------
function StepView({
  question,
  questionIndex,
  totalQuestions,
  selectedValue,
  onAnswer,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: {
  question: (typeof quizQuestions)[number];
  questionIndex: number;
  totalQuestions: number;
  selectedValue: number | undefined;
  onAnswer: (id: string, value: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}) {
  return (
    <div className="animate-fade-in">
      <div className="bento-card bg-white border border-warm-200/60 shadow-bento">
        <span className="label-editorial mb-4 block">
          Pytanie {questionIndex + 1} z {totalQuestions}
        </span>
        <h2 className="font-serif text-heading-base text-earth-950 mb-6 leading-relaxed">
          {question.text}
        </h2>
        {question.helpText && (
          <p className="text-body-sm text-earth-500 mb-5 italic">
            {question.helpText}
          </p>
        )}
        <div className="space-y-3">
          {question.options.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-4 rounded-2xl border px-5 py-4 cursor-pointer transition-all duration-300 ease-gentle ${
                selectedValue === option.value
                  ? 'border-sage-400 bg-sage-50 shadow-soft'
                  : 'border-warm-200/60 bg-white hover:border-sage-200 hover:bg-warm-50'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onAnswer(question.id, option.value)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                  selectedValue === option.value
                    ? 'border-sage-500 bg-sage-500'
                    : 'border-earth-300'
                }`}
              >
                {selectedValue === option.value && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              <span className="text-body-base text-earth-700">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`rounded-2xl px-6 py-3 text-body-sm font-medium transition-all duration-300 ${
            canGoPrev
              ? 'text-earth-600 hover:bg-warm-100 hover:shadow-soft'
              : 'text-earth-300 cursor-not-allowed'
          }`}
        >
          &larr; Wstecz
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={`rounded-2xl px-6 py-3 text-body-sm font-medium transition-all duration-300 ${
            canGoNext
              ? 'bg-warm-100 text-earth-700 hover:bg-warm-200 shadow-soft border border-warm-200/60'
              : 'text-earth-300 cursor-not-allowed'
          }`}
        >
          Dalej &rarr;
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// All Questions View – wszystkie pytania naraz
// ---------------------------------------------------------------------------
function AllQuestionsView({
  questions,
  answers,
  onAnswer,
}: {
  questions: typeof quizQuestions;
  answers: QuizAnswers;
  onAnswer: (id: string, value: number) => void;
}) {
  return (
    <div className="space-y-6">
      {questions.map((question, idx) => (
        <div
          key={question.id}
          className="bento-card bg-white border border-warm-200/60 shadow-bento"
        >
          <span className="label-editorial mb-3 block">
            {idx + 1}/{questions.length}
          </span>
          <h2 className="font-serif text-heading-sm text-earth-950 mb-5 leading-relaxed">
            {question.text}
          </h2>
          {question.helpText && (
            <p className="text-body-sm text-earth-500 mb-4 italic">
              {question.helpText}
            </p>
          )}
          <div className="space-y-2.5">
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-3.5 cursor-pointer transition-all duration-300 ease-gentle ${
                  answers[question.id] === option.value
                    ? 'border-sage-400 bg-sage-50 shadow-soft'
                    : 'border-warm-200/60 bg-white hover:border-sage-200 hover:bg-warm-50'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={() => onAnswer(question.id, option.value)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    answers[question.id] === option.value
                      ? 'border-sage-500 bg-sage-500'
                      : 'border-earth-300'
                  }`}
                >
                  {answers[question.id] === option.value && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
                <span className="text-body-sm text-earth-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
