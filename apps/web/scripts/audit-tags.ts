#!/usr/bin/env tsx
/**
 * Tag audit — scans MDX frontmatter for tags that are not in the
 * canonical taxonomy registry.
 *
 * Usage:
 *   pnpm audit:tags           # warn mode (exit 0)
 *   pnpm audit:tags --strict  # fail mode (exit 1 on any match)
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import matter from 'gray-matter';
import { isCanonicalTag } from '@joga/config/taxonomy';

const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content');
const strict = process.argv.includes('--strict');

interface TagViolation {
  file: string;
  tag: string;
  suggestion: string | null;
}

function walk(dir: string): string[] {
  const results: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (entry.startsWith('.') || entry.startsWith('_') || entry === 'node_modules') continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.endsWith('.mdx') || entry.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function extractTags(filePath: string): string[] {
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    if (Array.isArray(data.tags)) {
      return data.tags.filter((t: unknown): t is string => typeof t === 'string');
    }
  } catch {
    // skip files with parsing errors
  }
  return [];
}

// Simple suggestion: find closest canonical tag by Levenshtein-like similarity
function suggest(tag: string, canonicalTags: string[]): string | null {
  const lower = tag.toLowerCase();
  // Check for very close matches (e.g., different diacritics or spacing)
  for (const ct of canonicalTags) {
    if (ct.toLowerCase().includes(lower) || lower.includes(ct.toLowerCase())) {
      return ct;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// Import canonical tags for suggestions
import { canonicalTags } from '@joga/config/taxonomy';

const files = walk(CONTENT_DIR);
const allViolations: TagViolation[] = [];

for (const file of files) {
  const tags = extractTags(file);
  for (const tag of tags) {
    if (!isCanonicalTag(tag)) {
      allViolations.push({
        file: relative(ROOT, file),
        tag,
        suggestion: suggest(tag, [...canonicalTags]),
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (allViolations.length === 0) {
  console.log('✓ Tag audit passed — all tags are canonical.');
  process.exit(0);
}

console.log(`⚠ Tag audit: ${allViolations.length} non-canonical tag(s) found:\n`);

const grouped = new Map<string, TagViolation[]>();
for (const v of allViolations) {
  if (!grouped.has(v.file)) grouped.set(v.file, []);
  grouped.get(v.file)!.push(v);
}

for (const [file, violations] of grouped) {
  console.log(`  ${file}`);
  for (const v of violations) {
    const hint = v.suggestion ? ` (did you mean "${v.suggestion}"?)` : '';
    console.log(`    "${v.tag}"${hint}`);
  }
  console.log();
}

if (strict) {
  console.log('✗ Tag audit failed (--strict mode).');
  process.exit(1);
} else {
  console.log('⚠ Tag audit completed with warnings. Use --strict to enforce.');
  process.exit(0);
}
