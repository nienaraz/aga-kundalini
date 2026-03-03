import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPaths, getPathBySlug } from '@/lib/content';
import { SaveToFavorites } from '@/components/content/SaveToFavorites';
import { SafetyNotes } from '@/components/content/SafetyNotes';
import { SafetyGate } from '@/components/safety/SafetyGate';
import { FastExit } from '@/components/safety/FastExit';
import { PathProgressTracker } from './PathProgressTracker';

export function generateStaticParams() {
  return getAllPaths().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const path = getPathBySlug(params.slug);
  if (!path) return { title: 'Nie znaleziono' };
  return {
    title: path.title,
    description: path.description,
  };
}

export default function PathDetailPage({ params }: { params: { slug: string } }) {
  const path = getPathBySlug(params.slug);
  if (!path) notFound();

  const safetyNotes = path.contraindications || [];

  return (
    <SafetyGate>
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-earth-700 bg-earth-50 px-3 py-1 rounded-full">
              {path.totalDays} dni
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-earth-900 leading-tight mb-4">
            {path.title}
          </h1>

          <p className="text-calm-body text-earth-600 leading-relaxed mb-4">
            {path.description}
          </p>

          <div className="rounded-lg bg-sage-50 border border-sage-200 px-4 py-3 mb-6">
            <p className="text-sm text-sage-800">
              <span className="font-medium">Cel:</span> {path.goal}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <SaveToFavorites
              id={`path-${path.slug}`}
              type="path"
              title={path.title}
            />
          </div>
        </header>

        {/* Prerequisites */}
        {path.prerequisites && path.prerequisites.length > 0 && (
          <div className="rounded-xl bg-sky-50 border border-sky-200 p-5 mb-8">
            <h2 className="font-serif text-base text-sky-800 mb-2">Wymagania wstepne</h2>
            <ul className="space-y-1.5">
              {path.prerequisites.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-sky-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Progress tracker (client component) */}
        <PathProgressTracker slug={path.slug} totalDays={path.totalDays} />

        {/* Day-by-day breakdown */}
        <section className="mb-10">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Plan dzien po dniu</h2>
          <div className="space-y-4">
            {path.days.map((day) => (
              <div key={day.dayNumber} className="card-calm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-earth-800">
                    Dzien {day.dayNumber}: {day.title}
                  </h3>
                  <span className="text-xs text-earth-400">
                    ~{day.estimatedTimeMin} min
                  </span>
                </div>
                <p className="text-sm text-earth-600 leading-relaxed mb-3">
                  {day.description}
                </p>
                {day.contentRefs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {day.contentRefs.map((ref) => (
                      <span
                        key={ref}
                        className="text-xs text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full"
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Safety notes */}
        {safetyNotes.length > 0 && <SafetyNotes notes={safetyNotes} />}
      </div>
      <FastExit />
    </div>
    </SafetyGate>
  );
}
