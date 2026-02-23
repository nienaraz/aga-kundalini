'use client';

import { useState, type FormEvent } from 'react';
import ConsentCheckboxes, {
  type ConsentValues,
} from '@/components/forms/ConsentCheckboxes';

/* ------------------------------------------------------------------ */
/*  WebinarSignupForm – client form submitting to /api/webinars/signup  */
/* ------------------------------------------------------------------ */

interface WebinarSignupFormProps {
  webinarId: string;
  webinarTitle: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function WebinarSignupForm({
  webinarId,
  webinarTitle,
}: WebinarSignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [consents, setConsents] = useState<ConsentValues>({
    privacyConsent: false,
    marketingConsent: false,
    disclaimerConsent: false,
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    consents.privacyConsent &&
    consents.disclaimerConsent;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/webinars/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webinarId,
          name: name.trim(),
          email: email.trim(),
          question: question.trim() || undefined,
          privacyConsent: consents.privacyConsent,
          marketingConsent: consents.marketingConsent,
          disclaimerConsent: consents.disclaimerConsent,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Wystapil blad. Sprobuj ponownie.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Wystapil nieoczekiwany blad.',
      );
    }
  }

  // ---- Success state ------------------------------------------------
  if (status === 'success') {
    return (
      <div
        className="
          rounded-xl border border-sage-200 bg-sage-50/50
          p-6 sm:p-8 text-center
        "
      >
        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-sage-100">
          <svg
            className="w-6 h-6 text-sage-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-earth-800 mb-2">
          Dziekujemy za zapis!
        </h3>
        <p className="text-earth-500 text-sm leading-relaxed">
          Potwierdzenie zostalo wyslane na adres{' '}
          <strong className="text-earth-700">{email}</strong>.
          Szczegoly webinaru &ldquo;{webinarTitle}&rdquo; otrzymasz blizej terminu.
        </p>
      </div>
    );
  }

  // ---- Form ---------------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-xl border border-warm-200 bg-white
        p-6 sm:p-8 space-y-5
      "
    >
      <h3 className="font-serif text-xl text-earth-800 mb-1">
        Zapisz sie na webinar
      </h3>
      <p className="text-sm text-earth-400 mb-4">
        Pola oznaczone <span className="text-rose-500">*</span> sa wymagane.
      </p>

      {/* Name */}
      <div>
        <label
          htmlFor="signup-name"
          className="block text-sm font-medium text-earth-700 mb-1.5"
        >
          Imie <span className="text-rose-500">*</span>
        </label>
        <input
          id="signup-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Twoje imie"
          autoComplete="given-name"
          className="
            w-full px-4 py-2.5 rounded-lg
            border border-warm-200 bg-warm-50
            text-earth-800 placeholder-earth-300
            text-sm
            focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
            transition-colors
          "
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="signup-email"
          className="block text-sm font-medium text-earth-700 mb-1.5"
        >
          Adres e-mail <span className="text-rose-500">*</span>
        </label>
        <input
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twoj@email.pl"
          autoComplete="email"
          className="
            w-full px-4 py-2.5 rounded-lg
            border border-warm-200 bg-warm-50
            text-earth-800 placeholder-earth-300
            text-sm
            focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
            transition-colors
          "
        />
      </div>

      {/* Question (optional) */}
      <div>
        <label
          htmlFor="signup-question"
          className="block text-sm font-medium text-earth-700 mb-1.5"
        >
          Pytanie do prowadzacej{' '}
          <span className="text-earth-400 font-normal">(opcjonalne)</span>
        </label>
        <textarea
          id="signup-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Czy jest cos, o czym chcialbys/chcialabys porozmawiac?"
          rows={3}
          className="
            w-full px-4 py-2.5 rounded-lg
            border border-warm-200 bg-warm-50
            text-earth-800 placeholder-earth-300
            text-sm resize-y
            focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
            transition-colors
          "
        />
      </div>

      {/* Consents */}
      <div className="pt-2">
        <ConsentCheckboxes values={consents} onChange={setConsents} />
      </div>

      {/* Error message */}
      {status === 'error' && errorMessage && (
        <div
          className="
            rounded-lg border border-rose-200 bg-rose-50
            px-4 py-3 text-sm text-rose-700
          "
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!canSubmit || status === 'submitting'}
        className="
          w-full px-5 py-3 rounded-lg
          bg-sage-600 text-white text-sm font-medium
          hover:bg-sage-500 active:bg-sage-700
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
      >
        {status === 'submitting' ? 'Zapisywanie...' : 'Zapisz sie'}
      </button>
    </form>
  );
}
