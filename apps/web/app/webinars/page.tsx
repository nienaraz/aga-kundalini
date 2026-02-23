import type { Metadata } from 'next';
import Link from 'next/link';
import { getUpcomingWebinars, getArchivedWebinars, getSignupCount } from '@/lib/webinar';
import WebinarCard from '@/components/webinar/WebinarCard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Webinary',
  description:
    'Darmowe webinary o regulacji układu nerwowego i jodze kundalini. Zapisz się na nadchodzące spotkanie na żywo.',
  openGraph: {
    title: 'Webinary | Aga \u00b7 Joga Kundalini',
    description: 'Darmowe webinary o regulacji układu nerwowego i jodze kundalini.',
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
        <header className="mb-14">
          <span className="label-editorial mb-4 block">Spotkania na żywo</span>
          <h1 className="font-serif text-display-sm md:text-display text-earth-950 mb-4">
            Webinary
          </h1>
          <p className="text-body-lg text-earth-600 leading-relaxed max-w-2xl">
            Spotkania na żywo o regulacji układu nerwowego, oddychaniu i jodze
            kundalini. Bezpłatne, w kameralnej atmosferze.
          </p>
        </header>

        {/* Upcoming */}
        <section className="mb-16">
          <h2 className="font-serif text-heading-lg text-earth-900 mb-8">
            Nadchodzące webinary
          </h2>

          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcoming.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} signupCount={getSignupCount(webinar.id)} />
              ))}
            </div>
          ) : (
            <div className="card-warm text-center py-12">
              <p className="text-body-lg text-earth-600 mb-2">
                Aktualnie nie ma zaplanowanych webinarów.
              </p>
              <p className="text-body-sm text-earth-500 mb-6">
                Zapisz się na newsletter, żeby nie przegapić następnego spotkania.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex px-7 py-3.5 rounded-2xl bg-sage-600 text-white text-body-sm font-medium hover:bg-sage-700 transition-colors shadow-soft"
              >
                Zapisz się na newsletter
              </Link>
            </div>
          )}
        </section>

        {/* Archive */}
        {hasArchived && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-heading-lg text-earth-900">Archiwum</h2>
              <Link
                href="/webinars/archive"
                className="text-body-sm text-sage-600 hover:text-sage-700 font-medium transition-colors"
              >
                Wszystkie ({archived.length})
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
