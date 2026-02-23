'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/lib/quiz/config';
import { calculateScores, determineState } from '@/lib/quiz/scoring';
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

    const scores = calculateScores(answers);
    const state = determineState(scores);

    saveQuizResult({
      answers,
      scores,
      stateId: state.id,
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
        <div className="content-container max-w-2xl">
          {/* ---------------------------------------------------------------- */}
          {/* Header                                                            */}
          {/* ---------------------------------------------------------------- */}
          <header className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-earth-800 mb-3">
              Samosprawdzenie
            </h1>
            <p className="text-earth-500 text-lg leading-relaxed">
              Sprawdź, jak teraz funkcjonuje Twój układ nerwowy. To zajmie
              około 2 minut.
            </p>
          </header>

          {/* ---------------------------------------------------------------- */}
          {/* Disclaimer                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div
            className="mb-8 rounded-xl border border-warm-300 bg-warm-100/60 px-5 py-4"
            role="alert"
          >
            <p className="text-sm text-earth-700 leading-relaxed">
              <strong className="text-earth-800">Ważne:</strong> To narzędzie
              samoobserwacji, nie diagnoza medyczna. Wynik nie zastępuje
              konsultacji ze specjalistą. W przypadku poważnych objawów
              skonsultuj się z lekarzem lub psychologiem.
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Progress Bar                                                      */}
          {/* ---------------------------------------------------------------- */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-earth-500">
                {answeredCount} z {totalQuestions} pytań
              </span>
              <span className="text-sm text-earth-500">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-warm-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-sage-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* View mode toggle                                                  */}
          {/* ---------------------------------------------------------------- */}
          <div className="mb-6 flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode('step')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'step'
                  ? 'bg-sage-600 text-white'
                  : 'bg-warm-100 text-earth-600 hover:bg-warm-200'
              }`}
            >
              Krok po kroku
            </button>
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'all'
                  ? 'bg-sage-600 text-white'
                  : 'bg-warm-100 text-earth-600 hover:bg-warm-200'
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
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className={`rounded-xl px-8 py-3.5 text-base font-medium transition-all duration-300 ${
                allAnswered && !isSubmitting
                  ? 'bg-sage-600 text-white hover:bg-sage-700 shadow-md hover:shadow-lg'
                  : 'bg-warm-200 text-earth-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Obliczam...' : 'Zobacz wynik'}
            </button>
            {!allAnswered && (
              <p className="text-sm text-earth-400">
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
      <div className="card-calm">
        <p className="text-xs font-medium text-sage-600 mb-3 uppercase tracking-wide">
          Pytanie {questionIndex + 1} z {totalQuestions}
        </p>
        <h2 className="font-serif text-xl text-earth-800 mb-6 leading-relaxed">
          {question.text}
        </h2>
        {question.helpText && (
          <p className="text-sm text-earth-400 mb-4 italic">
            {question.helpText}
          </p>
        )}
        <div className="space-y-3">
          {question.options.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-4 rounded-lg border px-4 py-3.5 cursor-pointer transition-all duration-200 ${
                selectedValue === option.value
                  ? 'border-sage-400 bg-sage-50 shadow-sm'
                  : 'border-warm-200 bg-white hover:border-sage-200 hover:bg-warm-50'
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
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selectedValue === option.value
                    ? 'border-sage-500 bg-sage-500'
                    : 'border-earth-300'
                }`}
              >
                {selectedValue === option.value && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              <span className="text-earth-700">{option.label}</span>
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
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
            canGoPrev
              ? 'text-earth-600 hover:bg-warm-100'
              : 'text-earth-300 cursor-not-allowed'
          }`}
        >
          &larr; Wstecz
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
            canGoNext
              ? 'bg-warm-100 text-earth-700 hover:bg-warm-200'
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
        <div key={question.id} className="card-calm">
          <p className="text-xs font-medium text-sage-600 mb-2 uppercase tracking-wide">
            {idx + 1}/{questions.length}
          </p>
          <h2 className="font-serif text-lg text-earth-800 mb-4 leading-relaxed">
            {question.text}
          </h2>
          {question.helpText && (
            <p className="text-sm text-earth-400 mb-3 italic">
              {question.helpText}
            </p>
          )}
          <div className="space-y-2">
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all duration-200 ${
                  answers[question.id] === option.value
                    ? 'border-sage-400 bg-sage-50 shadow-sm'
                    : 'border-warm-200 bg-white hover:border-sage-200 hover:bg-warm-50'
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
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    answers[question.id] === option.value
                      ? 'border-sage-500 bg-sage-500'
                      : 'border-earth-300'
                  }`}
                >
                  {answers[question.id] === option.value && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
                <span className="text-earth-700 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
