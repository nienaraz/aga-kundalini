'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = 'Dziennik reakcji | Aga · Joga Kundalini';
const PAGE_DESCRIPTION =
  'Zapisuj i obserwuj swoje wzorce reakcji. Dane są przechowywane lokalnie w Twojej przeglądarce.';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface JournalEntry {
  id: string;
  date: string;
  event: string;
  body: string;
  reaction: string;
  alternative: string;
  lesson: string;
}

/* ------------------------------------------------------------------ */
/*  LocalStorage                                                       */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'jk-trigger-journal';

function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage unavailable
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '\u2026';
}

/* ------------------------------------------------------------------ */
/*  Form fields config                                                 */
/* ------------------------------------------------------------------ */

interface FieldConfig {
  key: keyof Omit<JournalEntry, 'id' | 'date'>;
  label: string;
  placeholder: string;
}

const FIELDS: FieldConfig[] = [
  {
    key: 'event',
    label: 'Co się wydarzyło?',
    placeholder: 'Opisz sytuację, która wywołała reakcję\u2026',
  },
  {
    key: 'body',
    label: 'Co poczułam/em w ciele?',
    placeholder: 'Np. napięcie w brzuchu, szybsze bicie serca, ciepło w twarzy\u2026',
  },
  {
    key: 'reaction',
    label: 'Jaka była moja pierwsza reakcja?',
    placeholder: 'Co zrobiłam/em lub chciałam/em zrobić\u2026',
  },
  {
    key: 'alternative',
    label: 'Co bym chciała/chciał zrobić inaczej?',
    placeholder: 'Jeśli mogłabym/mógłbym cofnąć czas\u2026',
  },
  {
    key: 'lesson',
    label: 'Czego to mnie uczy o moim układzie nerwowym?',
    placeholder: 'Co zauważam w swoich wzorcach\u2026',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TriggerJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [formData, setFormData] = useState({
    event: '',
    body: '',
    reaction: '',
    alternative: '',
    lesson: '',
  });
  const [historyOpen, setHistoryOpen] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.title = PAGE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION);
    setEntries(loadEntries());
  }, []);

  const handleChange = useCallback(
    (key: string, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setSaved(false);
    },
    []
  );

  function handleSave() {
    // Require at least one field filled
    const hasContent = Object.values(formData).some((v) => v.trim().length > 0);
    if (!hasContent) return;

    const entry: JournalEntry = {
      id: generateId(),
      date: new Date().toISOString(),
      ...formData,
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setFormData({ event: '', body: '', reaction: '', alternative: '', lesson: '' });
    setSaved(true);

    // Auto-open history after first save
    if (!historyOpen) setHistoryOpen(true);
  }

  function handleDelete(id: string) {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
    if (expandedEntry === id) setExpandedEntry(null);
  }

  function handlePrint() {
    window.print();
  }

  const hasContent = Object.values(formData).some((v) => v.trim().length > 0);

  return (
    <div className="section-spacing">
      <div className="content-container-sm">
        {/* Header */}
        <header className="mb-14">
          <nav className="mb-6">
            <Link
              href="/tools"
              className="text-sage-600 hover:text-sage-700 transition-colors text-body-sm font-medium"
            >
              &larr; Narzędzia
            </Link>
          </nav>
          <span className="label-editorial-pill mb-6 inline-flex">Dziennik</span>
          <h1 className="font-serif text-display-sm text-earth-950 mb-4">
            Dziennik reakcji
          </h1>
          <p className="text-body-lg text-earth-600 leading-relaxed max-w-2xl">
            Zapisuj swoje obserwacje. Szukaj wzorców. Ucz się z własnego
            doświadczenia.
          </p>
        </header>

        {/* Privacy note */}
        <div className="rounded-3xl border border-sage-200/60 bg-sage-100/50 p-5 md:p-6 mb-10">
          <p className="text-body-sm text-sage-700 leading-relaxed">
            Ten dziennik jest tylko dla Ciebie. Dane są przechowywane lokalnie
            w Twojej przeglądarce i nie są wysyłane na żaden serwer.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-10 print:space-y-4">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`field-${field.key}`}
                className="block text-body-base text-earth-800 font-medium mb-2"
              >
                {field.label}
              </label>
              <textarea
                id={`field-${field.key}`}
                value={formData[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="w-full rounded-2xl bg-white border border-warm-200/60 px-5 py-4
                           text-body-base text-earth-800 placeholder:text-earth-400
                           focus:border-sage-400 focus:ring-2 focus:ring-sage-500/20
                           focus:outline-none transition-colors resize-y"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-14 print:hidden">
          <button
            onClick={handleSave}
            disabled={!hasContent}
            className="px-8 py-3.5 rounded-2xl bg-sage-600 text-white font-medium text-body-sm
                       hover:bg-sage-700 active:bg-sage-800 transition-colors shadow-soft
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saved ? 'Zapisano' : 'Zapisz wpis'}
          </button>
          <button
            onClick={handlePrint}
            className="px-8 py-3.5 rounded-2xl border border-warm-200/60 text-earth-700
                       font-medium text-body-sm bg-warm-100
                       hover:bg-warm-200 active:bg-warm-300 transition-colors"
          >
            Drukuj
          </button>
        </div>

        {/* History */}
        {entries.length > 0 && (
          <div className="mb-14 print:hidden">
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="flex items-center gap-2 text-earth-800 font-medium text-body-base
                         hover:text-earth-950 transition-colors mb-6"
            >
              <span
                className={`inline-block transition-transform duration-200 ${
                  historyOpen ? 'rotate-90' : ''
                }`}
              >
                &#9654;
              </span>
              Historia wpisów ({entries.length})
            </button>

            {historyOpen && (
              <div className="space-y-4 animate-fade-in">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-3xl border border-warm-200/60 bg-white overflow-hidden shadow-bento"
                  >
                    {/* Entry header */}
                    <button
                      onClick={() =>
                        setExpandedEntry(
                          expandedEntry === entry.id ? null : entry.id
                        )
                      }
                      className="w-full flex items-start justify-between gap-4 p-5 md:p-6
                                 text-left hover:bg-warm-100/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="block text-earth-500 text-body-sm mb-1">
                          {formatDate(entry.date)}
                        </span>
                        <span className="block text-earth-800 text-body-sm">
                          {truncate(entry.event || entry.body || entry.reaction || '(pusty wpis)', 80)}
                        </span>
                      </div>
                      <span
                        className={`text-earth-400 transition-transform duration-200 flex-shrink-0 mt-1 ${
                          expandedEntry === entry.id ? 'rotate-90' : ''
                        }`}
                      >
                        &#9654;
                      </span>
                    </button>

                    {/* Expanded content */}
                    {expandedEntry === entry.id && (
                      <div className="border-t border-warm-200/40 p-5 md:p-6 space-y-4 animate-fade-in">
                        {FIELDS.map(
                          (field) =>
                            entry[field.key] && (
                              <div key={field.key}>
                                <span className="block text-earth-600 text-body-sm font-medium mb-1">
                                  {field.label}
                                </span>
                                <p className="text-body-sm text-earth-700 leading-relaxed whitespace-pre-wrap">
                                  {entry[field.key]}
                                </p>
                              </div>
                            )
                        )}
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-earth-500 hover:text-earth-700 text-body-sm
                                     transition-colors mt-2"
                        >
                          Usuń wpis
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-3xl border border-warm-200/60 bg-warm-100/40 p-6 md:p-7 print:hidden">
          <p className="text-body-sm text-earth-600 leading-relaxed">
            <strong className="text-earth-700">Uwaga:</strong> Ten dziennik jest
            narzędziem samoobserwacji, a nie narzędziem diagnostycznym.
            Nie zastępuje terapii ani pomocy psychologicznej. Jeśli
            zauważasz trudne wzorce, które Cię przytłaczają &mdash;
            sięgnij po profesjonalną pomoc.
          </p>
        </div>
      </div>
    </div>
  );
}
