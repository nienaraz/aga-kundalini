'use client';

import { useState, useEffect, useCallback } from 'react';

type SaveToFavoritesProps = {
  id: string;
  type: string;
  title: string;
};

type FavoriteEntry = {
  id: string;
  type: string;
  title: string;
  addedAt: string;
};

const STORAGE_KEY = 'joga-favorites';

function getFavorites(): FavoriteEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function isFavorite(id: string): boolean {
  return getFavorites().some((f) => f.id === id);
}

function addFavorite(entry: Omit<FavoriteEntry, 'addedAt'>): void {
  const favorites = getFavorites();
  if (favorites.some((f) => f.id === entry.id)) return;
  favorites.push({ ...entry, addedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function removeFavorite(id: string): void {
  const favorites = getFavorites().filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function SaveToFavorites({ id, type, title }: SaveToFavoritesProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(id));
  }, [id]);

  const toggle = useCallback(() => {
    if (saved) {
      removeFavorite(id);
      setSaved(false);
    } else {
      addFavorite({ id, type, title });
      setSaved(true);
    }
  }, [saved, id, type, title]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? `Usun "${title}" z ulubionych` : `Dodaj "${title}" do ulubionych`}
      aria-pressed={saved}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
        transition-colors duration-200
        ${
          saved
            ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
            : 'text-earth-500 bg-warm-50 hover:bg-warm-100'
        }
      `}
    >
      <svg
        className="w-4 h-4"
        fill={saved ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {saved ? 'Zapisano' : 'Zapisz'}
    </button>
  );
}
