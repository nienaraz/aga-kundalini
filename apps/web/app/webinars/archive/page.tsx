import type { Metadata } from 'next';
import Link from 'next/link';
import { getArchivedWebinars } from '@/lib/webinar';
import WebinarCard from '@/components/webinar/WebinarCard';

/* ------------------------------------------------------------------ */
/*  /webinars/archive – Archived (ended) webinars                       */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Archiwum webinarow',
  description:
    'Nagrania z poprzednich webinarow o regulacji ukladu nerwowego i jodze kundalini.',
  openGraph: {
    title: 'Archiwum webinarow | Aga \u00b7 Joga Kundalini',
    description: 'Nagrania z poprzednich webinarow.',
  },
};

export default function WebinarArchivePage() {
  const archived = getArchivedWebinars();

  return (
    <div className="section-spacing">
      <div className="content-container">
        {/* Breadcrumb */}
        <nav aria-label="Nawigacja" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-earth-400">
            <li>
              <Link
                href="/webinars"
                className="hover:text-sage-600 transition-colors"
              >
                Webinary
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-earth-600">Archiwum</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-earth-800 mb-3">
            Archiwum webinarow
          </h1>
          <p className="text-earth-500 text-lg leading-relaxed max-w-2xl">
            Nagrania z poprzednich spotkan. Obejrzyj w swoim tempie.
          </p>
        </header>

        {/* Grid */}
        {archived.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {archived.map((webinar) => (
              <WebinarCard key={webinar.id} webinar={webinar} />
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-xl border border-warm-200 bg-warm-50
              p-8 text-center
            "
          >
            <p className="text-earth-500 text-lg mb-2">
              Nie ma jeszcze archiwalnych webinarow.
            </p>
            <Link
              href="/webinars"
              className="
                mt-4 inline-flex items-center gap-2
                text-sage-600 hover:text-sage-700
                underline underline-offset-2
                text-sm transition-colors
              "
            >
              Wroc do webinarow
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
