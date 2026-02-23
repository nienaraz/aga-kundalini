import type { Metadata } from 'next';
import Link from 'next/link';
import { getUpcomingWebinars, getArchivedWebinars, getSignupCount } from '@/lib/webinar';
import WebinarCard from '@/components/webinar/WebinarCard';

/* ------------------------------------------------------------------ */
/*  /webinars – Webinar listing page (upcoming + link to archive)       */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Webinary',
  description:
    'Darmowe webinary o regulacji ukladu nerwowego i jodze kundalini. Zapisz sie na nadchodzace spotkanie na zywo.',
  openGraph: {
    title: 'Webinary | Aga \u00b7 Joga Kundalini',
    description:
      'Darmowe webinary o regulacji ukladu nerwowego i jodze kundalini.',
  },
};

export default function WebinarsPage() {
  const upcoming = getUpcomingWebinars();
  const archived = getArchivedWebinars();
  const hasArchived = archived.length > 0;

  return (
    <div className="section-spacing">
      <div className="content-container">
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-earth-800 mb-3">
            Webinary
          </h1>
          <p className="text-earth-500 text-lg leading-relaxed max-w-2xl">
            Spotkania na zywo o regulacji ukladu nerwowego, oddychaniu i jodze
            kundalini. Bezplatne, w kameralnej atmosferze.
          </p>
        </header>

        {/* Upcoming webinars */}
        <section className="mb-16">
          <h2 className="font-serif text-xl text-earth-700 mb-6">
            Nadchodzace webinary
          </h2>

          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((webinar) => (
                <WebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  signupCount={getSignupCount(webinar.id)}
                />
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
                Aktualnie nie ma zaplanowanych webinarow.
              </p>
              <p className="text-earth-400 text-sm mb-4">
                Zapisz sie na newsletter, zeby nie przegapic nastepnego spotkania.
              </p>
              <Link
                href="/newsletter"
                className="
                  inline-flex items-center gap-2
                  px-5 py-2.5 rounded-lg
                  bg-sage-600 text-white text-sm font-medium
                  hover:bg-sage-500 active:bg-sage-700
                  transition-colors
                "
              >
                Zapisz sie na newsletter
              </Link>
            </div>
          )}
        </section>

        {/* Link to archive */}
        {hasArchived && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl text-earth-700">
                Archiwum
              </h2>
              <Link
                href="/webinars/archive"
                className="
                  text-sm text-sage-600 hover:text-sage-700
                  underline underline-offset-2
                  transition-colors
                "
              >
                Zobacz wszystkie ({archived.length})
              </Link>
            </div>

            {/* Show first 2 archived */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {archived.slice(0, 2).map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
