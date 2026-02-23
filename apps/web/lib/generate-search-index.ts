/**
 * Build-time script: generates the client-side search index.
 *
 * Loads all content collections, creates SearchDocument objects,
 * builds a MiniSearch index via @joga/lib, and writes
 * public/search-index.json.
 *
 * Run with: pnpm generate-search
 */

import { getAllArticles, getAllPractices, getAllPaths, getAllGlossaryTerms } from '@joga/content';
import { createSearchIndex, type SearchDocument } from '@joga/lib';
import fs from 'fs';
import path from 'path';

const documents: SearchDocument[] = [];

// ---------------------------------------------------------------------------
// Artykuly edukacyjne
// ---------------------------------------------------------------------------
for (const a of getAllArticles()) {
  documents.push({
    id: `article-${a.slug}`,
    title: a.title,
    description: a.description,
    content: a.content.slice(0, 1000), // limit for index size
    category: a.category,
    tags: a.tags,
    type: 'article',
    url: `/library/${a.category}/${a.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Praktyki
// ---------------------------------------------------------------------------
for (const p of getAllPractices()) {
  documents.push({
    id: `practice-${p.slug}`,
    title: p.title,
    description: p.description,
    content: p.content.slice(0, 500),
    category: p.practiceCategory,
    tags: p.tags,
    type: 'practice',
    url: `/practices/${p.practiceCategory}/${p.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Sciezki (programy wielodniowe)
// ---------------------------------------------------------------------------
for (const p of getAllPaths()) {
  documents.push({
    id: `path-${p.slug}`,
    title: p.title,
    description: p.description,
    content: p.content.slice(0, 500),
    category: 'sciezki',
    tags: p.tags,
    type: 'path',
    url: `/paths/${p.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Slownik
// ---------------------------------------------------------------------------
for (const g of getAllGlossaryTerms()) {
  documents.push({
    id: `glossary-${g.slug}`,
    title: g.term,
    description: g.shortDefinition,
    content: g.longDefinition || g.shortDefinition,
    category: 'slownik',
    tags: g.tags || [],
    type: 'glossary',
    url: `/resources/glossary#${g.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Zapis indeksu
// ---------------------------------------------------------------------------
const indexJson = createSearchIndex(documents);
const outPath = path.join(process.cwd(), 'public', 'search-index.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, indexJson, 'utf-8');

console.log(`Zaindeksowano ${documents.length} dokumentow -> ${outPath}`);
