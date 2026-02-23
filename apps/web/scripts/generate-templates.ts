/**
 * Template generator script.
 *
 * Scans category directories under content/edukacja/ and content/praktyki/.
 * For each category that has no .mdx files yet (excluding templates),
 * creates a template MDX file based on the content type.
 *
 * Run with: pnpm generate-templates
 */

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const EDUKACJA_DIR = path.join(CONTENT_DIR, 'edukacja');
const PRAKTYKI_DIR = path.join(CONTENT_DIR, 'praktyki');

// ---------------------------------------------------------------------------
// Category definitions
// ---------------------------------------------------------------------------

const educationCategories = [
  'uklad-nerwowy',
  'reaktywnosc-vs-reakcja',
  'oddech-i-sygnaly-ciala',
  'domkniecie-cyklu-stresu',
  'kundalini-podstawy',
];

const practiceCategories = ['oddech', 'ruch', 'medytacja', 'resety'];

// ---------------------------------------------------------------------------
// Template content
// ---------------------------------------------------------------------------

function articleTemplate(category: string): string {
  return `---
title: "[Uzupelnij: Tytul artykulu]"
slug: "[Uzupelnij: slug-artykulu]"
description: "[Uzupelnij: 1-2 zdania, do 160 znakow]"
tags: ["[tag1]", "[tag2]", "[tag3]"]
category: "${category}"
publishedAt: "[RRRR-MM-DD]"
featured: false
draft: true
keyTakeaways:
  - "[Uzupelnij: Najwazniejsza mysl 1]"
  - "[Uzupelnij: Najwazniejsza mysl 2]"
  - "[Uzupelnij: Najwazniejsza mysl 3]"
whatToTryNow:
  - "[Uzupelnij: Proste cwiczenie do wyprobowania]"
  - "[Uzupelnij: Drugie cwiczenie]"
safetyNotes:
  - "To material edukacyjny, nie porada medyczna"
difficulty: "podstawowy"
---

## [Uzupelnij: Naglowek sekcji 1]

[Uzupelnij: Wprowadzenie do tematu -- 2-3 akapity]

## [Uzupelnij: Naglowek sekcji 2]

[Uzupelnij: Rozwinienie tematu]

## [Uzupelnij: Naglowek sekcji 3]

[Uzupelnij: Praktyczne zastosowanie]

> [Uzupelnij: Krotki cytat podsumowujacy]
`;
}

function practiceTemplate(category: string): string {
  return `---
title: "[Uzupelnij: Nazwa praktyki]"
slug: "[Uzupelnij: slug-praktyki]"
description: "[Uzupelnij: 1-2 zdania, do 160 znakow]"
tags: ["${category}", "[tag2]", "[tag3]"]
category: "${category}"
practiceCategory: "${category}"
publishedAt: "[RRRR-MM-DD]"
featured: false
draft: true
durationMin: 5
intensity: 1
steps:
  - order: 1
    instruction: "[Uzupelnij: Krok 1]"
    durationSec: 30
  - order: 2
    instruction: "[Uzupelnij: Krok 2]"
    durationSec: 60
  - order: 3
    instruction: "[Uzupelnij: Krok 3]"
    durationSec: 60
cuesToNotice:
  - "[Uzupelnij: Co obserwowac podczas praktyki?]"
  - "[Uzupelnij: Na co zwrocic uwage po praktyce?]"
safetyNotes: "To praktyka wspierajaca, nie terapia. Nie zastepuje pomocy medycznej."
---

## O tej praktyce

[Uzupelnij: Krotki opis -- czym jest ta praktyka i komu moze pomoc]

## Kiedy moze sie przydac?

- [Uzupelnij: Sytuacja 1]
- [Uzupelnij: Sytuacja 2]
- [Uzupelnij: Sytuacja 3]

## Wazne

[Uzupelnij: Zastrzezenia dotyczace bezpieczenstwa]

> [Uzupelnij: Krotki cytat podsumowujacy]
`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasMdxFiles(dir: string): boolean {
  if (!fs.existsSync(dir)) return false;
  const entries = fs.readdirSync(dir);
  return entries.some(
    (entry) =>
      (entry.endsWith('.mdx') || entry.endsWith('.md')) &&
      !entry.startsWith('_SZABLON')
  );
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

let created = 0;

console.log('Generowanie szablonow tresci...\n');

// Education categories
for (const category of educationCategories) {
  const categoryDir = path.join(EDUKACJA_DIR, category);
  ensureDir(categoryDir);

  if (!hasMdxFiles(categoryDir)) {
    const templatePath = path.join(categoryDir, `_SZABLON-${category}.mdx`);
    fs.writeFileSync(templatePath, articleTemplate(category), 'utf-8');
    console.log(`  Utworzono: content/edukacja/${category}/_SZABLON-${category}.mdx`);
    created++;
  } else {
    console.log(`  Pominieto: content/edukacja/${category}/ (ma juz tresci)`);
  }
}

// Practice categories
for (const category of practiceCategories) {
  const categoryDir = path.join(PRAKTYKI_DIR, category);
  ensureDir(categoryDir);

  if (!hasMdxFiles(categoryDir)) {
    const templatePath = path.join(categoryDir, `_SZABLON-${category}.mdx`);
    fs.writeFileSync(templatePath, practiceTemplate(category), 'utf-8');
    console.log(`  Utworzono: content/praktyki/${category}/_SZABLON-${category}.mdx`);
    created++;
  } else {
    console.log(`  Pominieto: content/praktyki/${category}/ (ma juz tresci)`);
  }
}

console.log(`\nGotowe! Utworzono ${created} szablonow.`);
if (created === 0) {
  console.log('Wszystkie kategorie maja juz tresci lub szablony.');
}
