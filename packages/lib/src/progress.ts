const STORAGE_KEY_PREFIX = "joga-kundalini-progress-";

export interface PathProgress {
  pathSlug: string;
  completedDays: number[];
  startedAt: string;
  lastActivityAt: string;
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

function getStorageKey(pathSlug: string): string {
  return `${STORAGE_KEY_PREFIX}${pathSlug}`;
}

function readProgress(pathSlug: string): PathProgress | null {
  if (!isClient()) return null;
  try {
    const stored = localStorage.getItem(getStorageKey(pathSlug));
    return stored ? (JSON.parse(stored) as PathProgress) : null;
  } catch {
    return null;
  }
}

function writeProgress(progress: PathProgress): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(
      getStorageKey(progress.pathSlug),
      JSON.stringify(progress),
    );
  } catch {
    // localStorage might be full or unavailable
  }
}

/**
 * Get the progress for a specific learning path.
 * Returns null if no progress exists or if running on the server.
 */
export function getPathProgress(pathSlug: string): PathProgress | null {
  return readProgress(pathSlug);
}

/**
 * Mark a specific day as complete in a learning path.
 * Creates progress entry if it doesn't exist yet.
 */
export function markDayComplete(pathSlug: string, dayIndex: number): void {
  const now = new Date().toISOString();
  const existing = readProgress(pathSlug);

  if (existing) {
    if (!existing.completedDays.includes(dayIndex)) {
      existing.completedDays.push(dayIndex);
      existing.completedDays.sort((a, b) => a - b);
    }
    existing.lastActivityAt = now;
    writeProgress(existing);
  } else {
    writeProgress({
      pathSlug,
      completedDays: [dayIndex],
      startedAt: now,
      lastActivityAt: now,
    });
  }
}

/**
 * Calculate the completion percentage for a learning path.
 * Returns a number between 0 and 100.
 */
export function getCompletionPercentage(
  pathSlug: string,
  totalDays: number,
): number {
  if (totalDays <= 0) return 0;

  const progress = readProgress(pathSlug);
  if (!progress) return 0;

  const percentage = (progress.completedDays.length / totalDays) * 100;
  return Math.min(100, Math.round(percentage));
}

/**
 * Reset all progress for a specific learning path.
 */
export function resetPathProgress(pathSlug: string): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(getStorageKey(pathSlug));
  } catch {
    // localStorage might be unavailable
  }
}
