'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Metadata (exported via generateMetadata is not available in        */
/*  client components, so we set document title manually)              */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = 'Gdzie jestem w ukladzie nerwowym? | Aga · Joga Kundalini';
const PAGE_DESCRIPTION =
  'Krotkie sprawdzenie stanu ukladu nerwowego. Nie jest to diagnoza – to chwila uwagi dla siebie.';

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
  { id: 'napiecie', label: 'Czuję napięcie w ciele', category: 'tension' },
  { id: 'oddech', label: 'Oddech jest płytki', category: 'tension' },
  { id: 'mysli', label: 'Myśli się kręcą', category: 'tension' },
  { id: 'odciecie', label: 'Czuję się odcięta/y', category: 'disconnection' },
  { id: 'zmeczenie', label: 'Czuję zmęczenie', category: 'disconnection' },
  { id: 'spokoj', label: 'Czuję się spokojna/y', category: 'calm' },
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
      text: 'Świetnie. Może to dobry moment na medytację?',
      link: '/practices/medytacja',
      linkLabel: 'Przejdź do medytacji',
    };
  }

  if (categories.has('tension')) {
    return {
      text: 'Może spróbuj wydłużonego wydechu. Pomóż ciału się rozluźnić.',
      link: '/practices/oddech',
      linkLabel: 'Przejdź do praktyk oddechowych',
    };
  }

  if (categories.has('disconnection')) {
    return {
      text: 'Może spróbuj delikatnego ruchu. Pozwól ciału się obudzić.',
      link: '/practices/ruch',
      linkLabel: 'Przejdź do praktyk ruchowych',
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
          <span className="label-editorial-pill mb-6 inline-flex">Samosprawdzenie</span>
          <h1 className="font-serif text-display-sm text-earth-950 mb-4">
            Gdzie jestem w układzie nerwowym?
          </h1>
          <p className="text-body-lg text-earth-600 leading-relaxed max-w-2xl">
            Zatrzymaj się na chwilę. Zaznacz to, co teraz czujesz. Bez oceniania.
          </p>
        </header>

        {/* Checkboxes */}
        <div className="space-y-3 mb-10">
          {CHECK_ITEMS.map((item) => (
            <label
              key={item.id}
              className={`
                flex items-center gap-4 p-5 rounded-2xl border cursor-pointer
                transition-all duration-300 ease-gentle
                ${
                  checked.includes(item.id)
                    ? 'border-sage-300 bg-sage-100/60 shadow-soft'
                    : 'border-warm-200/60 bg-white hover:border-warm-300/60 hover:shadow-bento'
                }
              `}
            >
              <input
                type="checkbox"
                checked={checked.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 rounded-lg border-warm-300 text-sage-600
                           focus:ring-sage-500 focus:ring-offset-0 accent-sage-600"
              />
              <span className="text-body-base text-earth-700">{item.label}</span>
            </label>
          ))}
        </div>

        {/* Suggestion */}
        {suggestion && (
          <div className="rounded-3xl border border-sage-200/60 bg-sage-100/50 p-6 md:p-7 mb-10 animate-fade-in">
            <p className="text-body-lg text-earth-800 mb-4">{suggestion.text}</p>
            <Link
              href={suggestion.link}
              className="inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm
                         hover:text-sage-800 transition-colors"
            >
              {suggestion.linkLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-14">
          <button
            onClick={handleSave}
            disabled={checked.length === 0 || saved}
            className="px-8 py-3.5 rounded-2xl bg-sage-600 text-white font-medium text-body-sm
                       hover:bg-sage-700 active:bg-sage-800 transition-colors shadow-soft
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saved ? 'Zapisano' : 'Zapisz sprawdzenie'}
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-3.5 rounded-2xl border border-warm-200/60 text-earth-700
                       font-medium text-body-sm bg-warm-100
                       hover:bg-warm-200 active:bg-warm-300 transition-colors"
          >
            Zacznij od nowa
          </button>
        </div>

        {/* Disclaimer */}
        <div className="rounded-3xl border border-warm-200/60 bg-warm-100/40 p-6 md:p-7">
          <p className="text-body-sm text-earth-600 leading-relaxed">
            <strong className="text-earth-700">Uwaga:</strong> To nie jest diagnoza
            medyczna ani psychologiczna. To chwila uwagi dla siebie &mdash; prosty
            moment zatrzymania i obserwacji. Jeśli czujesz, że potrzebujesz
            wsparcia, sięgnij po profesjonalną pomoc.
          </p>
        </div>
      </div>
    </div>
  );
}
