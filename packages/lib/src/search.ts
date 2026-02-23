import MiniSearch from "minisearch";

export interface SearchDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  type: "article" | "practice" | "path" | "glossary";
  url: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  score: number;
}

export interface SearchOptions {
  limit?: number;
  category?: string;
}

function createMiniSearchInstance(): MiniSearch<SearchDocument> {
  return new MiniSearch<SearchDocument>({
    fields: ["title", "description", "content", "tags"],
    storeFields: ["title", "description", "url", "type", "category"],
    searchOptions: {
      boost: { title: 3, tags: 2, description: 1.5 },
      fuzzy: 0.2,
      prefix: true,
    },
  });
}

/**
 * Create a serialized MiniSearch index from an array of documents.
 * Returns JSON string that can be stored and loaded later.
 */
export function createSearchIndex(documents: SearchDocument[]): string {
  const miniSearch = createMiniSearchInstance();

  const indexableDocuments = documents.map((doc) => ({
    ...doc,
    tags: doc.tags.join(" "),
  }));

  miniSearch.addAll(indexableDocuments as unknown as SearchDocument[]);
  return JSON.stringify(miniSearch);
}

/**
 * Search content using a previously serialized MiniSearch index.
 */
export function searchContent(
  indexJson: string,
  query: string,
  options: SearchOptions = {},
): SearchResult[] {
  const { limit = 10, category } = options;

  const miniSearch = MiniSearch.loadJSON<SearchDocument>(indexJson, {
    fields: ["title", "description", "content", "tags"],
    storeFields: ["title", "description", "url", "type", "category"],
  });

  let results = miniSearch.search(query, {
    boost: { title: 3, tags: 2, description: 1.5 },
    fuzzy: 0.2,
    prefix: true,
  });

  if (category) {
    results = results.filter((r) => r.category === category);
  }

  return results.slice(0, limit).map((result) => ({
    id: result.id,
    title: result.title as string,
    description: result.description as string,
    url: result.url as string,
    type: result.type as string,
    score: result.score,
  }));
}
