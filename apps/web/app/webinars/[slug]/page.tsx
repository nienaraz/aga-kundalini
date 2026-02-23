import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWebinarBySlug, getSignupCount } from '@/lib/webinar';
import WebinarSignupForm from '@/components/webinar/WebinarSignupForm';

export const dynamic = 'force-dynamic';

/* ------------------------------------------------------------------ */
/*  /webinars/[slug] – Webinar detail page                              */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: { slug: string };
}

/* ---- Metadata ----------------------------------------------------- */

export function generateMetadata({ params }: PageProps): Metadata {
  const webinar = getWebinarBySlug(params.slug);
  if (!webinar) return { title: 'Nie znaleziono' };

  return {
    title: webinar.title,
    description: webinar.description ?? 'Webinar o regulacji ukladu nerwowego.',
    openGraph: {
      title: `${webinar.title} | Aga \u00b7 Joga Kundalini`,
      description: webinar.description ?? undefined,
    },
  };
}

/* ---- Page --------------------------------------------------------- */

export default function WebinarDetailPage({ params }: PageProps) {
  const webinar = getWebinarBySlug(params.slug);
  if (!webinar) notFound();

  const signupCount = getSignupCount(webinar.id);

  const dateFormatted = new Date(webinar.startsAt).toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeFormatted = new Date(webinar.startsAt).toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const tags: string[] = (() => {
    try {
      return JSON.parse(webinar.tags);
    } catch {
      return [];
    }
  })();

  const hasCapacity = webinar.capacity != null;
  const spotsLeft =
    hasCapacity ? Math.max(0, webinar.capacity! - signupCount) : null;
  const isFull = spotsLeft === 0;
  const isUpcoming = webinar.status === 'upcoming';
  const isEnded = webinar.status === 'ended';

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
            <li className="text-earth-600 truncate">{webinar.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left column – details */}
          <div className="lg:col-span-3">
            {/* Status badge */}
            {isEnded && (
              <span className="inline-block px-3 py-1 rounded-full bg-warm-200 text-earth-600 text-sm font-medium mb-4">
                Webinar zakonczony
              </span>
            )}

            <h1 className="font-serif text-2xl md:text-3xl text-earth-800 mb-4">
              {webinar.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-earth-500 mb-6">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <time dateTime={webinar.startsAt}>{dateFormatted}</time>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {timeFormatted}, {webinar.durationMin} min
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Prowadzaca: {webinar.host}
              </div>
            </div>

            {/* Capacity info */}
            {spotsLeft !== null && isUpcoming && (
              <p
                className={`
                  text-sm mb-6 font-medium
                  ${spotsLeft <= 5 ? 'text-rose-500' : 'text-earth-400'}
                `}
              >
                {isFull
                  ? 'Wszystkie miejsca sa zajete.'
                  : `Pozostalo ${spotsLeft} z ${webinar.capacity} miejsc.`}
              </p>
            )}

            {/* Description */}
            {webinar.description && (
              <div className="prose-custom mb-8">
                <p>{webinar.description}</p>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-warm-100 text-earth-600 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Ended message */}
            {isEnded && (
              <div
                className="
                  rounded-xl border border-warm-200 bg-warm-50
                  p-6 text-center
                "
              >
                <p className="text-earth-500 text-lg mb-2">
                  Ten webinar juz sie zakonczyl.
                </p>
                <p className="text-earth-400 text-sm mb-4">
                  Zapisz sie na newsletter, zeby nie przegapic nastepnego spotkania.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/newsletter"
                    className="
                      px-5 py-2.5 rounded-lg
                      bg-sage-600 text-white text-sm font-medium
                      hover:bg-sage-500 transition-colors
                    "
                  >
                    Newsletter
                  </Link>
                  <Link
                    href="/webinars"
                    className="
                      px-5 py-2.5 rounded-lg
                      border border-warm-300 text-earth-600 text-sm font-medium
                      hover:bg-warm-100 transition-colors
                    "
                  >
                    Wszystkie webinary
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right column – signup form (only if upcoming and not full) */}
          <div className="lg:col-span-2">
            {isUpcoming && !isFull && (
              <div className="lg:sticky lg:top-24">
                <WebinarSignupForm
                  webinarId={webinar.id}
                  webinarTitle={webinar.title}
                />
              </div>
            )}

            {isUpcoming && isFull && (
              <div
                className="
                  rounded-xl border border-warm-200 bg-warm-50
                  p-6 text-center
                "
              >
                <p className="text-earth-600 font-medium mb-2">
                  Zapisy zamkniete
                </p>
                <p className="text-earth-400 text-sm">
                  Wszystkie miejsca sa juz zajete. Zapisz sie na newsletter,
                  aby dowiedziec sie o nastepnych webinarach.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
