const STORAGE_KEY = "joga-kundalini-favorites";

export interface FavoriteItem {
  id: string;
  type: string;
  title: string;
  addedAt: string;
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

function readFavorites(): FavoriteItem[] {
  if (!isClient()) return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(items: FavoriteItem[]): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage might be full or unavailable
  }
}

/**
 * Get all favorite items from localStorage.
 */
export function getFavorites(): FavoriteItem[] {
  return readFavorites();
}

/**
 * Add an item to favorites. The addedAt timestamp is set automatically.
 */
export function addFavorite(item: Omit<FavoriteItem, "addedAt">): void {
  const favorites = readFavorites();
  if (favorites.some((f) => f.id === item.id)) return;

  favorites.push({
    ...item,
    addedAt: new Date().toISOString(),
  });
  writeFavorites(favorites);
}

/**
 * Remove an item from favorites by ID.
 */
export function removeFavorite(id: string): void {
  const favorites = readFavorites();
  writeFavorites(favorites.filter((f) => f.id !== id));
}

/**
 * Check if an item is in favorites by ID.
 */
export function isFavorite(id: string): boolean {
  return readFavorites().some((f) => f.id === id);
}
