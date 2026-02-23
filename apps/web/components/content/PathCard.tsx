'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type PathCardProps = {
  title: string;
  slug: string;
  description: string;
  totalDays: number;
  goal: string;
};

function getPathProgress(slug: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const stored = localStorage.getItem(`joga-path-progress-${slug}`);
    if (!stored) return 0;
    const data = JSON.parse(stored);
    return typeof data.completedDays === 'number' ? data.completedDays : 0;
  } catch {
    return 0;
  }
}

export function PathCard({ title, slug, description, totalDays, goal }: PathCardProps) {
  const [completedDays, setCompletedDays] = useState(0);

  useEffect(() => {
    setCompletedDays(getPathProgress(slug));
  }, [slug]);

  const progressPercent = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  const hasProgress = completedDays > 0;

  return (
    <Link href={`/paths/${slug}`} className="card-calm block group">
      {/* Days badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-earth-700 bg-earth-50 px-3 py-1 rounded-full">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          {totalDays} dni
        </span>
        {hasProgress && (
          <span className="text-xs font-medium text-sage-600">
            {progressPercent}%
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg text-earth-800 group-hover:text-sage-700 transition-colors mb-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-earth-600 leading-relaxed mb-3 line-clamp-2">
        {description}
      </p>

      {/* Goal */}
      <p className="text-xs text-sage-600 mb-4">
        <span className="font-medium">Cel:</span> {goal}
      </p>

      {/* Progress bar */}
      {hasProgress && (
        <div className="w-full bg-warm-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-sage-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Postep: ${progressPercent}%`}
          />
        </div>
      )}
    </Link>
  );
}
