import { slugify } from "./slug";

export interface TocItem {
  /** Generated ID for the heading (used as anchor) */
  id: string;
  /** Heading text content */
  text: string;
  /** Heading level: 2, 3, or 4 */
  level: number;
}

/**
 * Generate an anchor ID from heading text using slugify.
 */
export function generateTocId(text: string): string {
  return slugify(text);
}

/**
 * Extract table of contents from MDX content string.
 * Parses ## (h2), ### (h3), and #### (h4) headings.
 */
export function extractToc(mdxContent: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold
      .replace(/\*(.*?)\*/g, "$1") // remove italic
      .replace(/`(.*?)`/g, "$1") // remove inline code
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // remove links, keep text
      .trim();

    items.push({
      id: generateTocId(text),
      text,
      level,
    });
  }

  return items;
}
