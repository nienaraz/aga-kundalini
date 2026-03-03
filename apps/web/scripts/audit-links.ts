#!/usr/bin/env tsx
/**
 * Link audit — scans MDX and page files for internal links pointing
 * to routes behind disabled feature flags.
 *
 * Usage:
 *   pnpm audit:links           # warn mode (exit 0)
 *   pnpm audit:links --strict  # fail mode (exit 1 on any match)
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import { getDisabledRoutes } from '@joga/config/featureFlags';

const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content');
const PAGES_DIR = join(ROOT, 'app');
const COMPONENTS_DIR = join(ROOT, 'components');

const strict = process.argv.includes('--strict');

interface LinkViolation {
  file: string;
  line: number;
  link: string;
  blockedByRoute: string;
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

function scanFile(filePath: string, disabledRoutes: string[]): LinkViolation[] {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations: LinkViolation[] = [];

  // Skip files that are themselves behind a disabled route
  // e.g. app/webinars/page.tsx is behind /webinars — self-links are expected
  const relPath = relative(ROOT, filePath).replace(/\\/g, '/');
  if (relPath.startsWith('app/')) {
    for (const route of disabledRoutes) {
      const routeDir = 'app' + route;
      if (relPath.startsWith(routeDir + '/')) {
        return violations;
      }
    }
  }

  // Match: href="/...", href='/...', [text](/...), Link href="/..."
  const linkPatterns = [
    /href=["'](\/([\w\-/]+))["']/g,
    /\[.*?\]\((\/([\w\-/]+))\)/g,
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const pattern of linkPatterns) {
      // Reset regex lastIndex for each line
      const regex = new RegExp(pattern.source, pattern.flags);
      let match;
      while ((match = regex.exec(line)) !== null) {
        const link = match[1];
        for (const route of disabledRoutes) {
          if (link === route || link.startsWith(route + '/')) {
            violations.push({
              file: relative(ROOT, filePath),
              line: i + 1,
              link,
              blockedByRoute: route,
              context: line.trim().substring(0, 120),
            });
          }
        }
      }
    }
  }

  return violations;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const disabledRoutes = getDisabledRoutes();

if (disabledRoutes.length === 0) {
  console.log('✓ Link audit passed — no feature flags are disabled.');
  process.exit(0);
}

console.log(`Disabled routes: ${disabledRoutes.join(', ')}\n`);

const contentFiles = walk(CONTENT_DIR, ['.mdx', '.md']);
const pageFiles = walk(PAGES_DIR, ['.tsx', '.ts']);
const componentFiles = walk(COMPONENTS_DIR, ['.tsx', '.ts']);

const allFiles = [...contentFiles, ...pageFiles, ...componentFiles];
const allViolations: LinkViolation[] = [];

for (const file of allFiles) {
  allViolations.push(...scanFile(file, disabledRoutes));
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (allViolations.length === 0) {
  console.log('✓ Link audit passed — no links point to disabled routes.');
  process.exit(0);
}

console.log(`⚠ Link audit: ${allViolations.length} violation(s) found:\n`);

const grouped = new Map<string, LinkViolation[]>();
for (const v of allViolations) {
  const key = v.file;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key)!.push(v);
}

for (const [file, violations] of grouped) {
  console.log(`  ${file}`);
  for (const v of violations) {
    console.log(`    L${v.line} "${v.link}" → blocked by ${v.blockedByRoute}`);
  }
  console.log();
}

if (strict) {
  console.log('✗ Link audit failed (--strict mode).');
  process.exit(1);
} else {
  console.log('⚠ Link audit completed with warnings. Use --strict to enforce.');
  process.exit(0);
}
