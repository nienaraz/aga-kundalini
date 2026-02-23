import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPractices, getPracticeBySlug } from '@/lib/content';
import { SafetyNotes } from '@/components/content/SafetyNotes';
import { SaveToFavorites } from '@/components/content/SaveToFavorites';
import { ReadingModeToggle } from '@/components/content/ReadingModeToggle';

export function generateStaticParams() {
  const practices = getAllPractices();
  return practices.map((p) => ({
    category: p.practiceCategory,
    slug: p.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Metadata {
  const practice = getPracticeBySlug(params.slug);
  if (!practice) return { title: 'Nie znaleziono' };
  return {
    title: practice.title,
    description: practice.description,
  };
}

function IntensityDisplay({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Intensywnosc: ${level} z 5`}>
      <span className="text-xs text-earth-500">Intensywnosc:</span>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i < level ? 'bg-sage-500' : 'bg-warm-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function PracticeDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const practice = getPracticeBySlug(params.slug);
  if (!practice || practice.practiceCategory !== params.category) notFound();

  const safetyNotes = [
    ...(practice.contraindications || []),
    ...(practice.safetyNotes ? [practice.safetyNotes] : []),
  ];

  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 bg-sage-50 px-3 py-1 rounded-full">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {practice.durationMin} min
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-earth-400">
              {practice.practiceCategory}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-earth-900 leading-tight mb-4">
            {practice.title}
          </h1>

          <p className="text-calm-body text-earth-600 leading-relaxed mb-4">
            {practice.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap mb-6">
            <IntensityDisplay level={practice.intensity} />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <SaveToFavorites
              id={`practice-${practice.slug}`}
              type="practice"
              title={practice.title}
            />
            <ReadingModeToggle />
          </div>
        </header>

        {/* Prerequisites */}
        {practice.prerequisites && practice.prerequisites.length > 0 && (
          <div className="rounded-xl bg-sky-50 border border-sky-200 p-5 mb-8">
            <h2 className="font-serif text-base text-sky-800 mb-2">Wymagania wstepne</h2>
            <ul className="space-y-1.5">
              {practice.prerequisites.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-sky-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps */}
        <section className="mb-10">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Kroki</h2>
          <ol className="space-y-6">
            {practice.steps.map((step) => (
              <li key={step.order} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                  {step.order}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-earth-800 leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.durationSec && (
                    <span className="inline-block mt-1 text-xs text-earth-400">
                      ~{step.durationSec >= 60
                        ? `${Math.floor(step.durationSec / 60)} min ${step.durationSec % 60 > 0 ? `${step.durationSec % 60}s` : ''}`
                        : `${step.durationSec}s`
                      }
                    </span>
                  )}
                  {step.note && (
                    <p className="mt-1 text-xs text-earth-500 italic">{step.note}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Variations */}
        {practice.variations && practice.variations.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl text-earth-800 mb-4">Warianty</h2>
            <div className="space-y-4">
              {practice.variations.map((v, i) => (
                <div key={i} className="card-calm">
                  <h3 className="font-medium text-sm text-earth-800 mb-1">{v.name}</h3>
                  <p className="text-sm text-earth-600 leading-relaxed">{v.description}</p>
                  {v.forWhom && (
                    <p className="text-xs text-earth-500 mt-2">Dla: {v.forWhom}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cues to notice */}
        <section className="rounded-xl bg-earth-50 border border-earth-200 p-6 mb-8">
          <h2 className="font-serif text-lg text-earth-800 mb-3">Co obserwowac</h2>
          <ul className="space-y-2">
            {practice.cuesToNotice.map((cue, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-earth-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-earth-400 mt-2 shrink-0" />
                {cue}
              </li>
            ))}
          </ul>
        </section>

        {/* Safety notes */}
        {safetyNotes.length > 0 && <SafetyNotes notes={safetyNotes} />}

        {/* Tags */}
        {practice.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-8">
            {practice.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-earth-500 bg-warm-100 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
