const polishCharMap: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
  Ą: "a",
  Ć: "c",
  Ę: "e",
  Ł: "l",
  Ń: "n",
  Ó: "o",
  Ś: "s",
  Ź: "z",
  Ż: "z",
};

/**
 * Convert a string to a URL-friendly slug.
 * Handles Polish diacritical characters.
 */
export function slugify(text: string): string {
  return text
    .split("")
    .map((char) => polishCharMap[char] ?? char)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Convert a slug back to a human-readable string.
 * Capitalizes the first letter and replaces hyphens with spaces.
 */
export function deslugify(slug: string): string {
  const text = slug.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}
