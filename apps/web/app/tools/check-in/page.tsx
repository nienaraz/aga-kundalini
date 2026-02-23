'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Metadata (exported via generateMetadata is not available in        */
/*  client components, so we set document title manually)              */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = 'Gdzie jestem w ukladzie nerwowym? | Aga \u00b7 Joga Kundalini';
const PAGE_DESCRIPTION =
  'Krotkie sprawdzenie stanu ukladu nerwowego. Nie jest to diagnoza \u2013 to chwila uwagi dla siebie.';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CheckItem {
  id: string;
  label: string;
  category: 'tension' | 'disconnection' | 'calm';
}

interface CheckInEntry {
  date: string;
  checked: string[];
  suggestion: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CHECK_ITEMS: CheckItem[] = [
  { id: 'napiecie', label: 'Czuj\u0119 napi\u0119cie w ciele', category: 'tension' },
  { id: 'oddech', label: 'Oddech jest p\u0142ytki', category: 'tension' },
  { id: 'mysli', label: 'My\u015bli si\u0119 kr\u0119c\u0105', category: 'tension' },
  { id: 'odciecie', label: 'Czuj\u0119 si\u0119 odci\u0119ta/y', category: 'disconnection' },
  { id: 'zmeczenie', label: 'Czuj\u0119 zm\u0119czenie', category: 'disconnection' },
  { id: 'spokoj', label: 'Czuj\u0119 si\u0119 spokojna/y', category: 'calm' },
];

interface Suggestion {
  text: string;
  link: string;
  linkLabel: string;
}

function getSuggestion(checked: string[]): Suggestion | null {
  if (checked.length === 0) return null;

  const items = CHECK_ITEMS.filter((item) => checked.includes(item.id));
  const categories = new Set(items.map((i) => i.category));

  // Priority: calm > tension > disconnection
  if (categories.has('calm') && categories.size === 1) {
    return {
      text: '\u015awietnie. Mo\u017ce to dobry moment na medytacj\u0119?',
      link: '/practices/medytacja',
      linkLabel: 'Przejd\u017a do medytacji',
    };
  }

  if (categories.has('tension')) {
    return {
      text: 'Mo\u017ce spr\u00f3buj wyd\u0142u\u017conego wydechu. Pom\u00f3\u017c cia\u0142u si\u0119 rozlu\u017ani\u0107.',
      link: '/practices/oddech',
      linkLabel: 'Przejd\u017a do praktyk oddechowych',
    };
  }

  if (categories.has('disconnection')) {
    return {
      text: 'Mo\u017ce spr\u00f3buj delikatnego ruchu. Pozw\u00f3l cia\u0142u si\u0119 obudzi\u0107.',
      link: '/practices/ruch',
      linkLabel: 'Przejd\u017a do praktyk ruchowych',
    };
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  LocalStorage                                                       */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'jk-checkin-history';

function saveEntry(entry: CheckInEntry) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const history: CheckInEntry[] = raw ? JSON.parse(raw) : [];
    history.unshift(entry);
    // Keep last 50 entries
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
  } catch {
    // localStorage unavailable
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CheckInPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  useEffect(() => {
    document.title = PAGE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION);
  }, []);

  useEffect(() => {
    setSuggestion(getSuggestion(checked));
    setSaved(false);
  }, [checked]);

  function toggleItem(id: string) {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSave() {
    if (checked.length === 0) return;
    const entry: CheckInEntry = {
      date: new Date().toISOString(),
      checked,
      suggestion: suggestion?.text || '',
    };
    saveEntry(entry);
    setSaved(true);
  }

  function handleReset() {
    setChecked([]);
    setSaved(false);
    setSuggestion(null);
  }

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
            Gdzie jestem w uk\u0142adzie nerwowym?
          </h1>
          <p className="text-earth-500 text-lg leading-relaxed max-w-2xl">
            Zatrzymaj si\u0119 na chwil\u0119. Zaznacz to, co teraz czujesz. Bez oceniania.
          </p>
        </header>

        {/* Checkboxes */}
        <div className="space-y-3 mb-8">
          {CHECK_ITEMS.map((item) => (
            <label
              key={item.id}
              className={`
                flex items-center gap-4 p-4 rounded-xl border cursor-pointer
                transition-all duration-200
                ${
                  checked.includes(item.id)
                    ? 'border-sage-300 bg-sage-50'
                    : 'border-warm-200 bg-white hover:border-warm-300'
                }
              `}
            >
              <input
                type="checkbox"
                checked={checked.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 rounded border-warm-300 text-sage-600
                           focus:ring-sage-500 focus:ring-offset-0 accent-sage-600"
              />
              <span className="text-earth-700 text-calm-body">{item.label}</span>
            </label>
          ))}
        </div>

        {/* Suggestion */}
        {suggestion && (
          <div className="rounded-xl border border-sage-200 bg-sage-50 p-6 mb-8 animate-fade-in">
            <p className="text-earth-700 text-lg mb-4">{suggestion.text}</p>
            <Link
              href={suggestion.link}
              className="inline-block text-sage-600 hover:text-sage-700
                         underline underline-offset-2 transition-colors"
            >
              {suggestion.linkLabel} &rarr;
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={handleSave}
            disabled={checked.length === 0 || saved}
            className="px-6 py-3 rounded-xl bg-sage-600 text-white font-medium
                       hover:bg-sage-700 transition-colors disabled:opacity-40
                       disabled:cursor-not-allowed"
          >
            {saved ? 'Zapisano' : 'Zapisz sprawdzenie'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl border border-warm-200 text-earth-600
                       hover:border-warm-300 hover:bg-warm-50 transition-colors"
          >
            Zacznij od nowa
          </button>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-warm-200 bg-warm-50 p-5">
          <p className="text-earth-500 text-sm leading-relaxed">
            <strong className="text-earth-600">Uwaga:</strong> To nie jest diagnoza
            medyczna ani psychologiczna. To chwila uwagi dla siebie &mdash; prosty
            moment zatrzymania i obserwacji. Je\u015bli czujesz, \u017ce potrzebujesz
            wsparcia, si\u0119gnij po profesjonaln\u0105 pomoc.
          </p>
        </div>
      </div>
    </div>
  );
}
