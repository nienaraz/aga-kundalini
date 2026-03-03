import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllEvidence, getEvidenceBySlug } from '@/lib/content';
import type { EvidenceLevel } from '@/lib/content';

export function generateStaticParams() {
  return getAllEvidence().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const entry = getEvidenceBySlug(params.slug);
  if (!entry) return { title: 'Nie znaleziono' };
  return {
    title: `${entry.title} — Dowody`,
    description: entry.description,
  };
}

const levelLabels: Record<EvidenceLevel, string> = {
  A: 'Silne dowody',
  B: 'Umiarkowane dowody',
  C: 'Wstepne dowody',
  D: 'Tradycja / doswiadczenie',
  E: 'Opinia ekspercka',
};

const levelColors: Record<EvidenceLevel, string> = {
  A: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  B: 'bg-sky-100 text-sky-800 border-sky-200',
  C: 'bg-amber-100 text-amber-800 border-amber-200',
  D: 'bg-earth-100 text-earth-700 border-earth-200',
  E: 'bg-warm-200 text-earth-600 border-warm-300',
};

export default function EvidenceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = getEvidenceBySlug(params.slug);
  if (!entry) notFound();

  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/resources/evidence"
            className="text-xs text-sage-600 hover:text-sage-700 underline underline-offset-2"
          >
            Biblioteka dowodow
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold ${levelColors[entry.evidenceLevel]}`}
            >
              {entry.evidenceLevel}
            </span>
            <span className="text-sm text-earth-500">
              {levelLabels[entry.evidenceLevel]}
            </span>
            {entry.controversyFlag && (
              <span className="inline-flex items-center text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                kontrowersyjne
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl md:text-3xl text-earth-900 leading-tight mb-4">
            {entry.title}
          </h1>

          <p className="text-calm-body text-earth-600 leading-relaxed">
            {entry.description}
          </p>
        </header>

        {/* Controversy note */}
        {entry.controversyFlag && entry.controversyNote && (
          <div className="rounded-xl bg-amber-50/60 border border-amber-200/40 p-5 mb-8">
            <h2 className="font-serif text-base text-amber-800 mb-2">
              Kontrowersje i debata
            </h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              {entry.controversyNote}
            </p>
          </div>
        )}

        {/* Limitations */}
        <section className="mb-10">
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-lg text-earth-800 mb-3">
            Ograniczenia
          </h2>
          <p className="text-sm text-earth-600 leading-relaxed">
            {entry.limitations}
          </p>
        </section>

        {/* Sources */}
        <section className="mb-10">
          <div className="section-divider mb-6" />
          <h2 className="font-serif text-lg text-earth-800 mb-4">
            Zrodla ({entry.sources.length})
          </h2>
          <ol className="space-y-3">
            {entry.sources.map((source, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-earth-700 leading-relaxed"
              >
                <span className="text-earth-400 shrink-0">{i + 1}.</span>
                <div>
                  <span className="font-medium">{source.author}</span>{' '}
                  <span className="text-earth-500">({source.year})</span>
                  {source.title && (
                    <>
                      .{' '}
                      <span className="italic">{source.title}</span>
                    </>
                  )}
                  {source.journal && (
                    <>
                      .{' '}
                      <span className="text-earth-500">{source.journal}</span>
                    </>
                  )}
                  {source.doi && (
                    <>
                      .{' '}
                      <a
                        href={`https://doi.org/${source.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sage-600 hover:text-sage-700 underline underline-offset-2"
                      >
                        DOI
                      </a>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Related content */}
        {entry.relatedContent && entry.relatedContent.length > 0 && (
          <section className="mb-10">
            <div className="section-divider mb-6" />
            <h2 className="font-serif text-lg text-earth-800 mb-4">
              Powiazane tresci
            </h2>
            <div className="flex flex-wrap gap-2">
              {entry.relatedContent.map((ref) => (
                <span
                  key={ref}
                  className="text-xs text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full"
                >
                  {ref}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-8">
            {entry.tags.map((tag) => (
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
