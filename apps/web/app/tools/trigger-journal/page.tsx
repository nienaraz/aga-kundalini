'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = 'Dziennik reakcji | Aga \u00b7 Joga Kundalini';
const PAGE_DESCRIPTION =
  'Zapisuj i obserwuj swoje wzorce reakcji. Dane s\u0105 przechowywane lokalnie w Twojej przegl\u0105darce.';

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
    label: 'Co si\u0119 wydarzy\u0142o?',
    placeholder: 'Opisz sytuacj\u0119, kt\u00f3ra wywo\u0142a\u0142a reakcj\u0119\u2026',
  },
  {
    key: 'body',
    label: 'Co poczu\u0142am/em w ciele?',
    placeholder: 'Np. napi\u0119cie w brzuchu, szybsze bicie serca, ciep\u0142o w twarzy\u2026',
  },
  {
    key: 'reaction',
    label: 'Jaka by\u0142a moja pierwsza reakcja?',
    placeholder: 'Co zrobi\u0142am/em lub chcia\u0142am/em zrobi\u0107\u2026',
  },
  {
    key: 'alternative',
    label: 'Co bym chcia\u0142a/chcia\u0142 zrobi\u0107 inaczej?',
    placeholder: 'Je\u015bli mog\u0142abym/m\u00f3g\u0142bym cofn\u0105\u0107 czas\u2026',
  },
  {
    key: 'lesson',
    label: 'Czego to mnie uczy o moim uk\u0142adzie nerwowym?',
    placeholder: 'Co zauwa\u017cam w swoich wzorcach\u2026',
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
      <div className="content-container">
        {/* Header */}
        <header className="mb-10">
          <nav className="mb-6">
            <Link
              href="/tools"
              className="text-sage-600 hover:text-sage-700 transition-colors text-sm"
            >
              &larr; Narz\u0119dzia
            </Link>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl text-earth-800 mb-3">
            Dziennik reakcji
          </h1>
          <p className="text-earth-500 text-lg leading-relaxed max-w-2xl">
            Zapisuj swoje obserwacje. Szukaj wzorc\u00f3w. Ucz si\u0119 z w\u0142asnego
            do\u015bwiadczenia.
          </p>
        </header>

        {/* Privacy note */}
        <div className="rounded-xl border border-sage-200 bg-sage-50 p-4 mb-8">
          <p className="text-sage-700 text-sm leading-relaxed">
            Ten dziennik jest tylko dla Ciebie. Dane s\u0105 przechowywane lokalnie
            w Twojej przegl\u0105darce i nie s\u0105 wysy\u0142ane na \u017caden serwer.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-8 print:space-y-4">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`field-${field.key}`}
                className="block text-earth-700 font-medium mb-2"
              >
                {field.label}
              </label>
              <textarea
                id={`field-${field.key}`}
                value={formData[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="w-full rounded-xl border border-warm-200 bg-white px-4 py-3
                           text-earth-800 placeholder:text-earth-300
                           focus:border-sage-400 focus:ring-1 focus:ring-sage-400
                           focus:outline-none transition-colors resize-y"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-10 print:hidden">
          <button
            onClick={handleSave}
            disabled={!hasContent}
            className="px-6 py-3 rounded-xl bg-sage-600 text-white font-medium
                       hover:bg-sage-700 transition-colors disabled:opacity-40
                       disabled:cursor-not-allowed"
          >
            {saved ? 'Zapisano' : 'Zapisz wpis'}
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-xl border border-warm-200 text-earth-600
                       hover:border-warm-300 hover:bg-warm-50 transition-colors"
          >
            Drukuj
          </button>
        </div>

        {/* History */}
        {entries.length > 0 && (
          <div className="mb-10 print:hidden">
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="flex items-center gap-2 text-earth-700 font-medium
                         hover:text-earth-900 transition-colors mb-4"
            >
              <span
                className={`inline-block transition-transform duration-200 ${
                  historyOpen ? 'rotate-90' : ''
                }`}
              >
                &#9654;
              </span>
              Historia wpis\u00f3w ({entries.length})
            </button>

            {historyOpen && (
              <div className="space-y-3 animate-fade-in">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-warm-200 bg-white overflow-hidden"
                  >
                    {/* Entry header */}
                    <button
                      onClick={() =>
                        setExpandedEntry(
                          expandedEntry === entry.id ? null : entry.id
                        )
                      }
                      className="w-full flex items-start justify-between gap-4 p-4
                                 text-left hover:bg-warm-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="block text-earth-400 text-sm mb-1">
                          {formatDate(entry.date)}
                        </span>
                        <span className="block text-earth-700 text-sm">
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
                      <div className="border-t border-warm-100 p-4 space-y-4 animate-fade-in">
                        {FIELDS.map(
                          (field) =>
                            entry[field.key] && (
                              <div key={field.key}>
                                <span className="block text-earth-500 text-sm font-medium mb-1">
                                  {field.label}
                                </span>
                                <p className="text-earth-700 text-sm leading-relaxed whitespace-pre-wrap">
                                  {entry[field.key]}
                                </p>
                              </div>
                            )
                        )}
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-earth-400 hover:text-earth-600 text-sm
                                     transition-colors mt-2"
                        >
                          Usu\u0144 wpis
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
        <div className="rounded-xl border border-warm-200 bg-warm-50 p-5 print:hidden">
          <p className="text-earth-500 text-sm leading-relaxed">
            <strong className="text-earth-600">Uwaga:</strong> Ten dziennik jest
            narz\u0119dziem samoobserwacji, a nie narz\u0119dziem diagnostycznym.
            Nie zast\u0119puje terapii ani pomocy psychologicznej. Je\u015bli
            zauwa\u017casz trudne wzorce, kt\u00f3re Ci\u0119 przyt\u0142aczaj\u0105 &mdash;
            si\u0119gnij po profesjonaln\u0105 pomoc.
          </p>
        </div>
      </div>
    </div>
  );
}
