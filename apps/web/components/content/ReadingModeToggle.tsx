'use client';

import { useCalmMode } from '@/components/providers/CalmModeProvider';

export function ReadingModeToggle() {
  const { isCalm, toggle } = useCalmMode();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isCalm ? 'Przelacz na tryb normalny' : 'Przelacz na tryb spokojny'}
      className="
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
        text-earth-500 bg-warm-50 hover:bg-warm-100
        transition-colors duration-200
      "
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {isCalm ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
      </svg>
      {isCalm ? 'Tryb normalny' : 'Tryb spokojny'}
    </button>
  );
}
