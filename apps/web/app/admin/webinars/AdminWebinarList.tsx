'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  AdminWebinarList – interactive list of webinars with signup mgmt    */
/* ------------------------------------------------------------------ */

interface WebinarWithCount {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  startsAt: string;
  durationMin: number;
  host: string;
  language: string;
  capacity: number | null;
  status: string;
  tags: string;
  featured: boolean;
  draft: boolean;
  createdAt: string;
  signupCount: number;
}

interface AdminWebinarListProps {
  webinars: WebinarWithCount[];
}

/** Status badge config. */
const statusConfig: Record<string, { label: string; className: string }> = {
  upcoming: { label: 'Nadchodzacy', className: 'bg-sage-100 text-sage-700' },
  live: { label: 'Na zywo', className: 'bg-rose-100 text-rose-700' },
  ended: { label: 'Zakonczony', className: 'bg-warm-200 text-earth-600' },
};

export default function AdminWebinarList({ webinars }: AdminWebinarListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [signups, setSignups] = useState<Record<string, SignupRow[]>>({});
  const [loading, setLoading] = useState<string | null>(null);

  async function loadSignups(webinarId: string) {
    if (signups[webinarId]) {
      // Toggle visibility
      setExpandedId(expandedId === webinarId ? null : webinarId);
      return;
    }

    setLoading(webinarId);
    try {
      const res = await fetch(`/api/admin/webinars/${webinarId}/signups`);
      if (!res.ok) throw new Error('Failed to load signups');
      const data = await res.json();
      setSignups((prev) => ({ ...prev, [webinarId]: data.signups }));
      setExpandedId(webinarId);
    } catch (err) {
      console.error('Error loading signups:', err);
    } finally {
      setLoading(null);
    }
  }

  function handleExportCsv(webinarId: string) {
    // Trigger CSV download via browser
    window.open(`/api/admin/webinars/${webinarId}/signups?format=csv`, '_blank');
  }

  if (webinars.length === 0) {
    return (
      <div className="rounded-xl border border-warm-200 bg-warm-50 p-8 text-center">
        <p className="text-earth-500">Brak webinarow w bazie danych.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {webinars.map((webinar) => {
        const status = statusConfig[webinar.status] ?? statusConfig.upcoming;
        const isExpanded = expandedId === webinar.id;
        const webinarSignups = signups[webinar.id] ?? [];

        const dateFormatted = new Date(webinar.startsAt).toLocaleDateString(
          'pl-PL',
          { year: 'numeric', month: 'short', day: 'numeric' },
        );

        return (
          <div
            key={webinar.id}
            className="rounded-xl border border-warm-200 bg-white overflow-hidden"
          >
            {/* Webinar row */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`
                      inline-block px-2 py-0.5 rounded-full text-xs font-medium
                      ${status.className}
                    `}
                  >
                    {status.label}
                  </span>
                  {webinar.draft && (
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-earth-100 text-earth-500">
                      Szkic
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg text-earth-800 truncate">
                  {webinar.title}
                </h3>
                <p className="text-sm text-earth-400">
                  {dateFormatted} &middot; {webinar.durationMin} min &middot;{' '}
                  Zapisy:{' '}
                  <strong className="text-earth-600">
                    {webinar.signupCount}
                  </strong>
                  {webinar.capacity != null && (
                    <span> / {webinar.capacity}</span>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => loadSignups(webinar.id)}
                  disabled={loading === webinar.id}
                  className="
                    px-3 py-2 rounded-lg text-sm font-medium
                    border border-warm-200 text-earth-600
                    hover:bg-warm-100
                    disabled:opacity-50
                    transition-colors
                  "
                >
                  {loading === webinar.id
                    ? 'Ladowanie...'
                    : isExpanded
                      ? 'Schowaj zapisy'
                      : `Pokaz zapisy (${webinar.signupCount})`}
                </button>

                <button
                  type="button"
                  onClick={() => handleExportCsv(webinar.id)}
                  className="
                    px-3 py-2 rounded-lg text-sm font-medium
                    bg-sage-600 text-white
                    hover:bg-sage-500
                    transition-colors
                  "
                >
                  Eksport CSV
                </button>

                <Link
                  href={`/webinars/${webinar.slug}`}
                  className="
                    px-3 py-2 rounded-lg text-sm font-medium
                    text-sage-600 hover:text-sage-700
                    underline underline-offset-2
                    transition-colors
                  "
                >
                  Podglad
                </Link>
              </div>
            </div>

            {/* Expanded signups table */}
            {isExpanded && (
              <div className="border-t border-warm-100 bg-warm-50/50 p-5">
                {webinarSignups.length === 0 ? (
                  <p className="text-sm text-earth-400 text-center py-4">
                    Brak zapisow na ten webinar.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs font-medium uppercase tracking-wider text-earth-400 border-b border-warm-200">
                          <th className="pb-2 pr-4">Imie</th>
                          <th className="pb-2 pr-4">Email</th>
                          <th className="pb-2 pr-4">Pytanie</th>
                          <th className="pb-2 pr-4">Marketing</th>
                          <th className="pb-2">Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-100">
                        {webinarSignups.map((signup) => (
                          <tr key={signup.id} className="text-earth-600">
                            <td className="py-2 pr-4 font-medium">
                              {signup.name}
                            </td>
                            <td className="py-2 pr-4">{signup.email}</td>
                            <td className="py-2 pr-4 max-w-xs truncate">
                              {signup.question || (
                                <span className="text-earth-300">-</span>
                              )}
                            </td>
                            <td className="py-2 pr-4">
                              <span
                                className={`
                                  px-2 py-0.5 rounded-full text-xs
                                  ${
                                    signup.marketingConsent
                                      ? 'bg-sage-100 text-sage-700'
                                      : 'bg-warm-100 text-earth-400'
                                  }
                                `}
                              >
                                {signup.marketingConsent ? 'Tak' : 'Nie'}
                              </span>
                            </td>
                            <td className="py-2 text-earth-400 text-xs">
                              {new Date(signup.createdAt).toLocaleDateString(
                                'pl-PL',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                },
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---- Internal type for signup rows (matches API response) ----------
interface SignupRow {
  id: string;
  webinarId: string;
  name: string;
  email: string;
  question: string | null;
  privacyConsent: boolean;
  marketingConsent: boolean;
  disclaimerConsent: boolean;
  createdAt: string;
}
