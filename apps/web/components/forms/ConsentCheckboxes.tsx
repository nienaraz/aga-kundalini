'use client';

import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  ConsentCheckboxes – reusable consent group (3 checkboxes)           */
/*  Privacy (required), Marketing (optional), Disclaimer (required)     */
/* ------------------------------------------------------------------ */

export interface ConsentValues {
  privacyConsent: boolean;
  marketingConsent: boolean;
  disclaimerConsent: boolean;
}

interface ConsentCheckboxesProps {
  values: ConsentValues;
  onChange: (values: ConsentValues) => void;
}

export default function ConsentCheckboxes({
  values,
  onChange,
}: ConsentCheckboxesProps) {
  const update = (key: keyof ConsentValues, checked: boolean) => {
    onChange({ ...values, [key]: checked });
  };

  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Zgody</legend>

      {/* Privacy – required */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={values.privacyConsent}
          onChange={(e) => update('privacyConsent', e.target.checked)}
          required
          className="
            mt-0.5 h-4 w-4 rounded border-warm-300
            text-sage-600 focus:ring-sage-500
            cursor-pointer
          "
        />
        <span className="text-sm text-earth-600 leading-relaxed">
          Akceptuje{' '}
          <Link
            href="/legal/privacy"
            target="_blank"
            className="text-sage-600 underline underline-offset-2 hover:text-sage-700"
          >
            polityke prywatnosci
          </Link>
          <span className="text-rose-500 ml-0.5">*</span>
        </span>
      </label>

      {/* Marketing – optional */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={values.marketingConsent}
          onChange={(e) => update('marketingConsent', e.target.checked)}
          className="
            mt-0.5 h-4 w-4 rounded border-warm-300
            text-sage-600 focus:ring-sage-500
            cursor-pointer
          "
        />
        <span className="text-sm text-earth-600 leading-relaxed">
          Wyrazam zgode na komunikacje marketingowa
          <span className="text-earth-400 ml-1">(opcjonalne)</span>
        </span>
      </label>

      {/* Disclaimer – required */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={values.disclaimerConsent}
          onChange={(e) => update('disclaimerConsent', e.target.checked)}
          required
          className="
            mt-0.5 h-4 w-4 rounded border-warm-300
            text-sage-600 focus:ring-sage-500
            cursor-pointer
          "
        />
        <span className="text-sm text-earth-600 leading-relaxed">
          Rozumiem, ze tresci nie stanowia porady medycznej
          <span className="text-rose-500 ml-0.5">*</span>
        </span>
      </label>
    </fieldset>
  );
}
