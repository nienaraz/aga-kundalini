'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { safetyGateStatements } from '@joga/config/safetyData';

const STORAGE_KEY = 'safety-gate-acknowledged';

export function SafetyGate({ children }: { children: React.ReactNode }) {
  const [acknowledged, setAcknowledged] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    setAcknowledged(stored === 'true');
  }, []);

  function handleAcknowledge() {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setAcknowledged(true);
  }

  // SSR / hydration: render children immediately (server-rendered page is visible)
  if (acknowledged === null) return <>{children}</>;

  if (acknowledged) return <>{children}</>;

  return (
    <div className="section-spacing">
      <div className="content-container max-w-lg">
        <div className="rounded-2xl border border-rose-200/50 bg-white p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>

          <h2 className="font-serif text-xl text-earth-900 mb-3">
            Zanim zaczniesz
          </h2>

          <div className="space-y-3 mb-8">
            <p className="text-sm text-earth-700 leading-relaxed">
              {safetyGateStatements.primary}
            </p>
            <p className="text-sm text-earth-600 leading-relaxed">
              {safetyGateStatements.secondary}
            </p>
          </div>

          <button
            onClick={handleAcknowledge}
            className="btn-editorial w-full mb-4"
          >
            {safetyGateStatements.action}
          </button>

          <Link
            href="/safety"
            className="text-xs text-sage-600 hover:text-sage-700 underline underline-offset-2"
          >
            {safetyGateStatements.learnMore}
          </Link>
        </div>
      </div>
    </div>
  );
}
