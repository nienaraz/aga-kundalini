import Link from 'next/link';
import type { WebinarEvent } from '@/lib/webinar';

interface WebinarCardProps {
  webinar: WebinarEvent;
  signupCount?: number;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  upcoming: { label: 'Nadchodzący', className: 'bg-sage-100/70 text-sage-700' },
  live: { label: 'Na żywo', className: 'bg-rose-100/70 text-rose-700' },
  ended: { label: 'Zakończony', className: 'bg-warm-200/60 text-earth-600' },
};

export default function WebinarCard({ webinar, signupCount }: WebinarCardProps) {
  const status = statusConfig[webinar.status] ?? statusConfig.upcoming;

  const dateFormatted = new Date(webinar.startsAt).toLocaleDateString('pl-PL', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const timeFormatted = new Date(webinar.startsAt).toLocaleTimeString('pl-PL', {
    hour: '2-digit', minute: '2-digit',
  });

  const tags: string[] = (() => {
    try { return JSON.parse(webinar.tags); } catch { return []; }
  })();

  const hasCapacity = webinar.capacity != null;
  const spotsLeft = hasCapacity && signupCount != null
    ? Math.max(0, webinar.capacity! - signupCount)
    : null;

  return (
    <article className="card-calm flex flex-col">
      {/* Status + date */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${status.className}`}>
          {status.label}
        </span>
        <time dateTime={webinar.startsAt} className="text-xs text-earth-400">
          {dateFormatted}
        </time>
      </div>

      {/* Title */}
      <h3 className="font-serif text-heading-sm text-earth-900 leading-snug mb-2">
        {webinar.title}
      </h3>

      {/* Description */}
      {webinar.description && (
        <p className="text-body-sm text-earth-500 leading-relaxed line-clamp-3 mb-4">
          {webinar.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 text-body-sm text-earth-400 mb-4">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeFormatted}, {webinar.durationMin} min
        </span>

        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          {webinar.host}
        </span>

        {spotsLeft !== null && (
          <span className={`flex items-center gap-1.5 ${spotsLeft <= 5 ? 'text-rose-500 font-medium' : ''}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            {spotsLeft === 0 ? 'Brak miejsc' : `Pozostało ${spotsLeft} miejsc`}
          </span>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag: string) => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full bg-warm-100/60 text-earth-500 text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action */}
      <div className="mt-auto pt-2">
        {webinar.status === 'upcoming' ? (
          <Link
            href={`/webinars/${webinar.slug}`}
            className="inline-flex items-center justify-center w-full px-5 py-3.5 rounded-2xl bg-sage-600 text-white text-body-sm font-medium hover:bg-sage-700 active:bg-sage-800 transition-colors shadow-soft"
          >
            Zapisz się
          </Link>
        ) : webinar.status === 'ended' ? (
          <Link
            href={`/webinars/${webinar.slug}`}
            className="inline-flex items-center justify-center w-full px-5 py-3.5 rounded-2xl border border-warm-300/60 text-earth-600 text-body-sm font-medium hover:bg-warm-50 transition-colors"
          >
            Obejrzyj nagranie
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center w-full px-5 py-3.5 text-body-sm text-rose-600 font-medium">
            Trwa teraz
          </span>
        )}
      </div>
    </article>
  );
}
