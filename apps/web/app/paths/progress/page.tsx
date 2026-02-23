'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type PathProgress = {
  slug: string;
  completedDays: number;
  startedAt: string;
};

function getAllPathProgress(): PathProgress[] {
  if (typeof window === 'undefined') return [];
  const results: PathProgress[] = [];
  const prefix = 'joga-path-progress-';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        const slug = key.replace(prefix, '');
        if (data.startedAt) {
          results.push({
            slug,
            completedDays: data.completedDays || 0,
            startedAt: data.startedAt,
          });
        }
      } catch {
        // skip invalid entries
      }
    }
  }

  return results.sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );
}

export default function PathsProgressPage() {
  const [paths, setPaths] = useState<PathProgress[]>([]);

  useEffect(() => {
    setPaths(getAllPathProgress());
  }, []);

  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Twoj postep
        </h1>
        <p className="text-calm-body text-earth-600 mb-10 leading-relaxed">
          Wszystkie sciezki, ktore rozpoczelas/rozpoczales. Postep jest zapisywany lokalnie
          w Twojej przegladarce.
        </p>

        {paths.length > 0 ? (
          <div className="space-y-4">
            {paths.map((path) => (
              <Link
                key={path.slug}
                href={`/paths/${path.slug}`}
                className="card-calm block"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-base text-earth-800">
                    {path.slug.replace(/-/g, ' ')}
                  </h2>
                  <span className="text-xs text-earth-400">
                    {path.completedDays} dni ukonczonych
                  </span>
                </div>

                <div className="w-full bg-warm-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sage-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, path.completedDays * 10)}%` }}
                  />
                </div>

                <p className="text-xs text-earth-400 mt-2">
                  Rozpoczeta: {new Date(path.startedAt).toLocaleDateString('pl-PL')}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-earth-500 mb-4">
              Jeszcze nie rozpoczales/rozpoczelas zadnej sciezki.
            </p>
            <Link
              href="/paths"
              className="inline-block text-sm text-sage-600 font-medium underline underline-offset-2 hover:text-sage-700"
            >
              Przegladaj sciezki
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
