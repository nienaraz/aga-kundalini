import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ZodError } from 'zod';
import {
  articleSchema,
  practiceSchema,
  pathSchema,
  glossaryTermSchema,
  newsletterSchema,
} from './schemas';

// ─── Kolory dla terminala ─────────────────────────────────────────────
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

// ─── Definicje kolekcji ───────────────────────────────────────────────
interface CollectionDef {
  name: string;
  dir: string;
  schema: { parse: (data: unknown) => unknown };
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

const collections: CollectionDef[] = [
  { name: 'Artykuły (edukacja)', dir: 'edukacja', schema: articleSchema },
  { name: 'Praktyki', dir: 'praktyki', schema: practiceSchema },
  { name: 'Ścieżki', dir: 'sciezki', schema: pathSchema },
  { name: 'Słownik', dir: 'slownik', schema: glossaryTermSchema },
  { name: 'Newsletter', dir: 'newsletter', schema: newsletterSchema },
];

// ─── Pomocnicze funkcje ───────────────────────────────────────────────
function getAllMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatZodError(error: ZodError): string {
  return error.issues
    .map(issue => {
      const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
      return `    ${RED}✗${RESET} ${YELLOW}${path}${RESET}: ${issue.message}`;
    })
    .join('\n');
}

// ─── Główna walidacja ─────────────────────────────────────────────────
function validate(): void {
  console.log(`\n${BOLD}${CYAN}═══ Walidacja treści @joga/content ═══${RESET}\n`);

  let totalFiles = 0;
  let totalValid = 0;
  let totalErrors = 0;
  const errorDetails: string[] = [];

  for (const collection of collections) {
    const fullDir = path.join(CONTENT_DIR, collection.dir);
    const files = getAllMdxFiles(fullDir);

    console.log(`${BOLD}📂 ${collection.name}${RESET} (${collection.dir}/)`);

    if (files.length === 0) {
      console.log(`   ${YELLOW}⚠ Brak plików .md/.mdx${RESET}\n`);
      continue;
    }

    let collectionValid = 0;
    let collectionErrors = 0;

    for (const filePath of files) {
      totalFiles++;
      const relativePath = path.relative(CONTENT_DIR, filePath);

      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(raw);
        collection.schema.parse(data);
        collectionValid++;
        totalValid++;
        console.log(`   ${GREEN}✓${RESET} ${relativePath}`);
      } catch (err) {
        collectionErrors++;
        totalErrors++;

        if (err instanceof ZodError) {
          const details = formatZodError(err);
          console.log(`   ${RED}✗${RESET} ${relativePath}`);
          console.log(details);
          errorDetails.push(`${relativePath}:\n${details}`);
        } else {
          const message = err instanceof Error ? err.message : String(err);
          console.log(`   ${RED}✗${RESET} ${relativePath}`);
          console.log(`    ${RED}Błąd parsowania:${RESET} ${message}`);
          errorDetails.push(`${relativePath}: ${message}`);
        }
      }
    }

    const status = collectionErrors === 0
      ? `${GREEN}${collectionValid}/${files.length} poprawnych${RESET}`
      : `${RED}${collectionErrors}/${files.length} z błędami${RESET}`;
    console.log(`   Podsumowanie: ${status}\n`);
  }

  // ─── Podsumowanie końcowe ─────────────────────────────────────────
  console.log(`${BOLD}${CYAN}═══ Podsumowanie ═══${RESET}`);
  console.log(`  Plików sprawdzonych: ${totalFiles}`);
  console.log(`  ${GREEN}Poprawnych: ${totalValid}${RESET}`);

  if (totalErrors > 0) {
    console.log(`  ${RED}Z błędami: ${totalErrors}${RESET}`);
    console.log(`\n${RED}${BOLD}Walidacja zakończona z błędami.${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`\n${GREEN}${BOLD}Wszystkie treści są poprawne!${RESET}\n`);
    process.exit(0);
  }
}

// ─── Uruchomienie ─────────────────────────────────────────────────────
validate();
