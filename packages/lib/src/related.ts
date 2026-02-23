export interface Taggable {
  tags: string[];
  slug: string;
}

/**
 * Find related content based on shared tags.
 * Scores each item by the number of shared tags with the current item,
 * returns the top N results sorted by score descending.
 *
 * @param current - The current item to find related content for
 * @param all - All available items to search through
 * @param limit - Maximum number of related items to return (default: 3)
 */
export function findRelatedContent<T extends Taggable>(
  current: T,
  all: T[],
  limit: number = 3,
): T[] {
  const currentTags = new Set(current.tags);

  const scored = all
    .filter((item) => item.slug !== current.slug)
    .map((item) => {
      const sharedCount = item.tags.filter((tag) =>
        currentTags.has(tag),
      ).length;
      return { item, score: sharedCount };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ item }) => item);
}
