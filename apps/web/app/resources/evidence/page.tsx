import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllEvidence } from '@/lib/content';
import type { EvidenceLevel } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Biblioteka dowodow',
  description:
    'Przeglad badan naukowych i dowodow stojacych za praktykami prezentowanymi na tej stronie.',
};

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

export default function EvidenceLibraryPage() {
  const evidence = getAllEvidence();

  return (
    <div className="section-spacing">
      <div className="content-container max-w-3xl">
        {/* Header */}
        <header className="mb-14">
          <p className="label-editorial mb-4">Dowody</p>
          <h1 className="font-serif text-3xl md:text-4xl text-earth-900 leading-tight mb-4">
            Biblioteka dowodow
          </h1>
          <p className="text-calm-body text-earth-600 leading-relaxed max-w-2xl">
            Kazda praktyka na tej stronie powinna byc oparta na najlepszych
            dostepnych dowodach. Ponizej znajdziesz przeglad badan — razem z ich
            ograniczeniami.
          </p>
        </header>

        {/* Evidence level legend */}
        <section className="mb-12">
          <div className="section-divider mb-8" />
          <h2 className="font-serif text-lg text-earth-800 mb-4">
            Poziomy dowodow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(Object.entries(levelLabels) as [EvidenceLevel, string][]).map(
              ([level, label]) => (
                <div
                  key={level}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-xs font-semibold ${levelColors[level]}`}
                  >
                    {level}
                  </span>
                  <span className="text-earth-700">{label}</span>
                </div>
              )
            )}
          </div>
        </section>

        {/* Evidence entries */}
        <section>
          <div className="section-divider mb-8" />
          <h2 className="font-serif text-lg text-earth-800 mb-6">
            Wpisy ({evidence.length})
          </h2>

          {evidence.length === 0 ? (
            <p className="text-sm text-earth-500">
              Biblioteka dowodow jest w trakcie budowania. Wkrotce pojawia sie
              pierwsze wpisy.
            </p>
          ) : (
            <div className="space-y-4">
              {evidence.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/resources/evidence/${entry.slug}`}
                  className="block rounded-xl border border-earth-200/50 bg-white p-5 hover:border-sage-300/50 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold shrink-0 ${levelColors[entry.evidenceLevel]}`}
                    >
                      {entry.evidenceLevel}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base text-earth-800 group-hover:text-sage-700 transition-colors mb-1">
                        {entry.title}
                        {entry.controversyFlag && (
                          <span className="ml-2 inline-flex items-center text-xs text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                            kontrowersyjne
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-earth-600 leading-relaxed line-clamp-2">
                        {entry.description}
                      </p>
                      <p className="text-xs text-earth-400 mt-2">
                        {entry.sources.length}{' '}
                        {entry.sources.length === 1 ? 'zrodlo' : 'zrodel'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Disclaimer */}
        <div className="mt-14 rounded-xl bg-warm-100/60 border border-warm-200/40 p-5">
          <p className="text-xs text-earth-500 leading-relaxed">
            Ta biblioteka jest stale rozwijana. Dowody naukowe ewoluuja —
            staramy sie prezentowac aktualny stan wiedzy, ale nie gwarantujemy
            kompletnosci. Jesli zauwazylas blad lub chcesz zaproponowac
            zrodlo, napisz do nas.
          </p>
        </div>
      </div>
    </div>
  );
}
