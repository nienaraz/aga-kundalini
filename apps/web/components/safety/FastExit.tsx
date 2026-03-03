'use client';

import { useRouter } from 'next/navigation';

export function FastExit() {
  const router = useRouter();

  function handleExit() {
    router.push('/safety');
  }

  return (
    <button
      onClick={handleExit}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-600 hover:shadow-rose-500/30 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
      aria-label="Przerwij praktykę i przejdź do centrum bezpieczeństwa"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      Przerwij
    </button>
  );
}
