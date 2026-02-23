// Slug utilities
export { slugify, deslugify } from "./slug";

// Reading time
export { calculateReadingTime } from "./reading-time";
export type { ReadingTimeResult } from "./reading-time";

// Table of contents
export { extractToc, generateTocId } from "./toc";
export type { TocItem } from "./toc";

// SEO utilities
export { generateMetadata, generateJsonLd } from "./seo";
export type {
  MetadataParams,
  JsonLdArticle,
  JsonLdCourse,
  JsonLdWebPage,
  JsonLdFAQPage,
} from "./seo";

// Search
export { createSearchIndex, searchContent } from "./search";
export type { SearchDocument, SearchResult, SearchOptions } from "./search";

// Analytics
export { trackEvent, trackPageView, useAnalytics } from "./analytics";
export type { AnalyticsEvent } from "./analytics";

// Related content
export { findRelatedContent } from "./related";
export type { Taggable } from "./related";

// Favorites (localStorage)
export {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "./favorites";
export type { FavoriteItem } from "./favorites";

// Path progress (localStorage)
export {
  getPathProgress,
  markDayComplete,
  getCompletionPercentage,
  resetPathProgress,
} from "./progress";
export type { PathProgress } from "./progress";
