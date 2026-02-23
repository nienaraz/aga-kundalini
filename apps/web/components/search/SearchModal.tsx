'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MiniSearch from 'minisearch';
import Link from 'next/link';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'practice' | 'path' | 'glossary';
  category: string;
  slug: string;
  tags: string[];
};

type SearchIndexItem = SearchResult;

const typeLabels: Record<string, string> = {
  article: 'Artykuly',
  practice: 'Praktyki',
  path: 'Sciezki',
  glossary: 'Slownik',
};

function getResultHref(result: SearchResult): string {
  switch (result.type) {
    case 'article':
      return `/library/${result.category}/${result.slug}`;
    case 'practice':
      return `/practices/${result.category}/${result.slug}`;
    case 'path':
      return `/paths/${result.slug}`;
    case 'glossary':
      return `/resources/glossary#${result.slug}`;
    default:
      return '#';
  }
}

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [engine, setEngine] = useState<MiniSearch<SearchIndexItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load search index on first open
  const loadIndex = useCallback(async () => {
    if (engine) return;
    setLoading(true);
    try {
      const res = await fetch('/search-index.json');
      const data: SearchIndexItem[] = await res.json();
      const ms = new MiniSearch<SearchIndexItem>({
        fields: ['title', 'description', 'tags'],
        storeFields: ['title', 'description', 'type', 'category', 'slug', 'tags'],
        searchOptions: {
          boost: { title: 3, tags: 2 },
          fuzzy: 0.2,
          prefix: true,
        },
      });
      ms.addAll(data);
      setEngine(ms);
    } catch (err) {
      console.error('[search] Failed to load index:', err);
    } finally {
      setLoading(false);
    }
  }, [engine]);

  // Open/close
  const open = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setResults([]);
    setActiveIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  // Listen for Cmd+K and custom event
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open();
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    }

    function handleCustomOpen() {
      open();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search', handleCustomOpen);
    };
  }, [isOpen, open, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      loadIndex();
      // Small delay for dialog to render
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, loadIndex]);

  // Search
  useEffect(() => {
    if (!engine || !query.trim()) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const found = engine.search(query) as unknown as SearchResult[];
    setResults(found.slice(0, 20));
    setActiveIndex(0);
  }, [query, engine]);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      close();
    }
  }

  // Scroll active result into view
  useEffect(() => {
    const container = resultsRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-index="${activeIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  // Group results by type
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const type = r.type || 'article';
    if (!acc[type]) acc[type] = [];
    acc[type].push(r);
    return acc;
  }, {});

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Szukaj"
        className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl border border-warm-200 overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-warm-100">
          <svg
            className="w-5 h-5 text-earth-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Szukaj..."
            className="flex-1 text-sm text-earth-800 placeholder-earth-400 bg-transparent outline-none"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={close}
            className="text-xs text-earth-400 bg-warm-100 px-2 py-0.5 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-8 text-center text-sm text-earth-400">
              Ladowanie indeksu...
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-earth-400">
              Brak wynikow dla &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="py-2">
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type}>
                  <div className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-earth-400">
                    {typeLabels[type] || type}
                  </div>
                  {items.map((result) => {
                    flatIndex++;
                    const idx = flatIndex;
                    const isActive = idx === activeIndex;
                    return (
                      <Link
                        key={result.id}
                        href={getResultHref(result)}
                        onClick={close}
                        data-index={idx}
                        className={`
                          block px-4 py-2.5 text-sm transition-colors
                          ${isActive ? 'bg-sage-50 text-sage-800' : 'text-earth-700 hover:bg-warm-50'}
                        `}
                      >
                        <div className="font-medium">{result.title}</div>
                        {result.description && (
                          <div className="text-xs text-earth-500 mt-0.5 line-clamp-1">
                            {result.description}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {!loading && !query.trim() && (
            <div className="px-4 py-8 text-center text-sm text-earth-400">
              Wpisz szukana fraze...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
