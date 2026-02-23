export interface ReadingTimeResult {
  /** Estimated reading time in minutes (rounded up) */
  minutes: number;
  /** Total word count */
  words: number;
}

/**
 * Calculate estimated reading time for a given text.
 * Default is 200 WPM, adjusted for Polish text which is slightly slower to read.
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200,
): ReadingTimeResult {
  const cleanedText = text
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleanedText ? cleanedText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return { minutes, words };
}
