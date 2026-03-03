#!/usr/bin/env tsx
/**
 * Copy audit — scans MDX content and page files for forbidden words.
 *
 * Usage:
 *   pnpm audit:copy           # warn mode (exit 0)
 *   pnpm audit:copy --strict  # fail mode (exit 1 on any match)
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import { allForbiddenWords, getForbiddenCategory } from '@joga/config/copyPolicy';

const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content');
const PAGES_DIR = join(ROOT, 'app');

const strict = process.argv.includes('--strict');

interface Violation {
  file: string;
  line: number;
  word: string;
  category: string;
  context: string;
}

function walk(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walk(full, extensions));
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function scanFile(filePath: string): Violation[] {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations: Violation[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip frontmatter keys, imports, code blocks
    if (line.trimStart().startsWith('import ')) continue;
    if (line.trimStart().startsWith('//')) continue;
    if (line.trimStart().startsWith('```')) continue;

    const lineLower = line.toLowerCase();

    // Skip template checklist lines (e.g. "[ ] Brak stwierdzeń typu ...")
    if (/\[[ x]\]/.test(line)) continue;

    for (const word of allForbiddenWords) {
      const wordLower = word.toLowerCase();
      const regex = new RegExp(`\\b${escapeRegex(wordLower)}\\b`, 'gi');
      if (regex.test(lineLower)) {
        // Skip negated context: "nie musisz", "nie jest diagnozą", "nie diagnoza", "nie leczy"
        const negationRegex = new RegExp(
          `\\bnie\\s+(?:\\w+\\s+){0,2}${escapeRegex(wordLower)}\\b`,
          'gi'
        );
        if (negationRegex.test(lineLower)) continue;

        const category = getForbiddenCategory(word) || 'unknown';
        violations.push({
          file: relative(ROOT, filePath),
          line: i + 1,
          word,
          category,
          context: line.trim().substring(0, 120),
        });
      }
    }
  }

  return violations;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const contentFiles = walk(CONTENT_DIR, ['.mdx', '.md']);
const pageFiles = walk(PAGES_DIR, ['.tsx', '.ts']).filter(
  (f) => f.includes('page.') || f.includes('layout.')
);

const allFiles = [...contentFiles, ...pageFiles];
const allViolations: Violation[] = [];

for (const file of allFiles) {
  allViolations.push(...scanFile(file));
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (allViolations.length === 0) {
  console.log('✓ Copy audit passed — no forbidden words found.');
  process.exit(0);
}

console.log(`\n⚠ Copy audit: ${allViolations.length} violation(s) found:\n`);

const grouped = new Map<string, Violation[]>();
for (const v of allViolations) {
  const key = v.file;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key)!.push(v);
}

for (const [file, violations] of grouped) {
  console.log(`  ${file}`);
  for (const v of violations) {
    console.log(`    L${v.line} [${v.category}] "${v.word}" → ${v.context}`);
  }
  console.log();
}

if (strict) {
  console.log('✗ Copy audit failed (--strict mode).');
  process.exit(1);
} else {
  console.log('⚠ Copy audit completed with warnings. Use --strict to enforce.');
  process.exit(0);
}
