/**
 * Content validation script.
 *
 * Loads every collection via @joga/content (which validates with Zod).
 * Reports per-collection results with colored output:
 *   green = valid, red = errors.
 * Exits with code 1 if any errors are found.
 *
 * Run with: pnpm validate-content
 */

import {
  getAllArticles,
  getAllPractices,
  getAllPaths,
  getAllGlossaryTerms,
  getAllNewsletterIssues,
} from '@joga/content';

let errors = 0;
let valid = 0;

function validate(name: string, fn: () => unknown[]) {
  try {
    const items = fn();
    console.log(`\x1b[32m\u2713 ${name}: ${items.length} elementow\x1b[0m`);
    valid += items.length;
  } catch (err: unknown) {
    const error = err as Error & { errors?: Array<{ path?: string[]; message: string }> };
    console.error(`\x1b[31m\u2717 ${name}: ${error.message}\x1b[0m`);
    if (error.errors) {
      for (const e of error.errors) {
        console.error(`  -> ${e.path?.join('.') ?? '?'}: ${e.message}`);
      }
    }
    errors++;
  }
}

console.log('Walidacja tresci...\n');

validate('Artykuly', getAllArticles);
validate('Praktyki', getAllPractices);
validate('Sciezki', getAllPaths);
validate('Slownik', getAllGlossaryTerms);
validate('Newsletter', getAllNewsletterIssues);

console.log(`\nPodsumowanie: ${valid} poprawnych, ${errors} bledow`);

if (errors > 0) {
  process.exit(1);
}
