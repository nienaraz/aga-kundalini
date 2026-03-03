import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articleSchema, practiceSchema, pathSchema, glossaryTermSchema, newsletterSchema, evidenceSchema } from './schemas';
import type { Article, Practice, Path, GlossaryTerm, NewsletterIssue, Evidence } from './schemas';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// Generyczny loader MDX z walidacją
function loadCollection<T>(
  dir: string,
  schema: { parse: (data: unknown) => T },
  recursive = true
): (T & { content: string; filePath: string })[] {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];

  const files = getAllMdxFiles(fullDir, recursive);

  const results: (T & { content: string; filePath: string })[] = [];
  for (const filePath of files) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const parsed = schema.parse(data);
      results.push({ ...parsed, content, filePath });
    } catch {
      // Skip files with parsing errors (YAML, schema validation)
    }
  }
  return results;
}

function getAllMdxFiles(dir: string, recursive: boolean): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && recursive) {
      files.push(...getAllMdxFiles(fullPath, recursive));
    } else if (entry.isFile() && !entry.name.startsWith('_') && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllArticles() {
  return loadCollection<Article>('edukacja', articleSchema)
    .filter(a => !a.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getAllPractices() {
  return loadCollection<Practice>('praktyki', practiceSchema)
    .filter(p => !p.draft)
    .sort((a, b) => a.durationMin - b.durationMin);
}

export function getAllPaths() {
  return loadCollection<Path>('sciezki', pathSchema)
    .filter(p => !p.draft);
}

export function getAllGlossaryTerms() {
  return loadCollection<GlossaryTerm>('slownik', glossaryTermSchema)
    .sort((a, b) => a.term.localeCompare(b.term, 'pl'));
}

export function getAllNewsletterIssues() {
  return loadCollection<NewsletterIssue>('newsletter', newsletterSchema)
    .filter(n => !n.draft)
    .sort((a, b) => b.issueNumber - a.issueNumber);
}

// Wyszukiwanie po slug
export function getArticleBySlug(slug: string) {
  return getAllArticles().find(a => a.slug === slug) ?? null;
}

export function getPracticeBySlug(slug: string) {
  return getAllPractices().find(p => p.slug === slug) ?? null;
}

export function getPathBySlug(slug: string) {
  return getAllPaths().find(p => p.slug === slug) ?? null;
}

// Wyszukiwanie po kategorii
export function getArticlesByCategory(category: string) {
  return getAllArticles().filter(a => a.category === category);
}

export function getPracticesByCategory(category: string) {
  return getAllPractices().filter(p => p.practiceCategory === category);
}

// Unikalne kategorie i tagi
export function getAllCategories(type: 'article' | 'practice') {
  const items = type === 'article' ? getAllArticles() : getAllPractices();
  return [...new Set(items.map(i => type === 'article' ? i.category : (i as Practice).practiceCategory))];
}

export function getAllTags(type: 'article' | 'practice') {
  const items = type === 'article' ? getAllArticles() : getAllPractices();
  return [...new Set(items.flatMap(i => i.tags))];
}

// Evidence Library
export function getAllEvidence() {
  return loadCollection<Evidence>('dowody', evidenceSchema)
    .filter(e => !e.draft)
    .sort((a, b) => a.evidenceLevel.localeCompare(b.evidenceLevel));
}

export function getEvidenceBySlug(slug: string) {
  return getAllEvidence().find(e => e.slug === slug) ?? null;
}

export function getEvidenceByLevel(level: string) {
  return getAllEvidence().filter(e => e.evidenceLevel === level);
}
