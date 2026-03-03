import { z } from 'zod';

// Wspólne pola dla wszystkich treści
const baseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(10).max(300),
  tags: z.array(z.string()).min(1),
  category: z.string().optional().default(''),
  publishedAt: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  updatedAt: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  featured: z.coerce.boolean().default(false),
  draft: z.coerce.boolean().default(false),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

// Artykuł edukacyjny
export const articleSchema = baseSchema.extend({
  type: z.literal('article').default('article'),
  keyTakeaways: z.array(z.string()).min(1).max(7),
  somaticCues: z.array(z.string()).optional(),
  difficulty: z.enum(['podstawowy', 'średni', 'zaawansowany']).default('podstawowy'),
  relatedPractices: z.array(z.string()).optional(),
});

// Praktyka (oddechowa, ruchowa, medytacja, reset)
// Step schema accepts both naming conventions from content files
const stepSchema = z.object({
  order: z.coerce.number(),
  // Accept either 'instruction' or 'title'+'description' for the step text
  instruction: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  durationSec: z.coerce.number().optional(),
  durationSeconds: z.coerce.number().optional(),
  note: z.string().optional(),
}).transform((step) => ({
  order: step.order,
  instruction: step.instruction || step.description || step.title || '',
  title: step.title,
  durationSec: step.durationSec ?? step.durationSeconds,
  note: step.note,
}));

export const practiceSchema = baseSchema.extend({
  type: z.literal('practice').default('practice'),
  durationMin: z.coerce.number().min(1).max(120).optional(),
  duration: z.coerce.number().optional(),
  intensity: z.coerce.number().min(1).max(5),
  prerequisites: z.array(z.string()).optional(),
  contraindications: z.array(z.string()).optional(),
  steps: z.array(stepSchema).min(1),
  variations: z.array(z.object({
    name: z.string(),
    description: z.string(),
    forWhom: z.string().optional(),
  })).optional(),
  cuesToNotice: z.array(z.string()).min(1),
  safetyNotes: z.union([z.string(), z.array(z.string())]).optional(),
  practiceCategory: z.enum(['oddech', 'ruch', 'medytacja', 'reset']),
}).transform((p) => ({
  ...p,
  durationMin: p.durationMin ?? p.duration ?? 10,
  safetyNotes: Array.isArray(p.safetyNotes)
    ? p.safetyNotes.join(' ')
    : p.safetyNotes,
}));

// Ścieżka (program wielodniowy)
export const pathSchema = baseSchema.extend({
  type: z.literal('path').default('path'),
  days: z.array(z.object({
    dayNumber: z.coerce.number(),
    title: z.string(),
    description: z.string(),
    contentRefs: z.array(z.string()),
    estimatedTimeMin: z.coerce.number(),
  })).min(3),
  goal: z.string(),
  prerequisites: z.array(z.string()).optional(),
  contraindications: z.array(z.string()).optional(),
  safetyNotes: z.union([z.string(), z.array(z.string())]).optional(),
  totalDays: z.coerce.number(),
  difficulty: z.string().optional(),
});

// Termin słownikowy
export const glossaryTermSchema = z.object({
  term: z.string().min(1),
  slug: z.string().min(1),
  shortDefinition: z.string().min(10).max(200),
  longDefinition: z.string().optional(),
  relatedTerms: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

// Newsletter
export const newsletterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  publishedAt: z.string(),
  issueNumber: z.coerce.number(),
  draft: z.coerce.boolean().default(false),
});

// Dowód naukowy (Evidence Library)
export const evidenceLevels = ['A', 'B', 'C', 'D', 'E'] as const;
export type EvidenceLevel = (typeof evidenceLevels)[number];

const sourceSchema = z.object({
  author: z.string(),
  year: z.coerce.number(),
  title: z.string().optional(),
  journal: z.string().optional(),
  doi: z.string().optional(),
});

export const evidenceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(10).max(500),
  evidenceLevel: z.enum(evidenceLevels),
  sources: z.array(sourceSchema).min(1),
  limitations: z.string().min(1),
  controversyFlag: z.coerce.boolean().default(false),
  controversyNote: z.string().optional(),
  relatedContent: z.array(z.string()).optional(),
  tags: z.array(z.string()).min(1),
  publishedAt: z.string(),
  draft: z.coerce.boolean().default(false),
});

// Typy wyeksportowane
export type Article = z.infer<typeof articleSchema>;
export type Practice = z.output<typeof practiceSchema>;
export type Path = z.infer<typeof pathSchema>;
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>;
export type NewsletterIssue = z.infer<typeof newsletterSchema>;
export type Evidence = z.infer<typeof evidenceSchema>;
export type EvidenceSource = z.infer<typeof sourceSchema>;
export type ContentType = 'article' | 'practice' | 'path' | 'glossary' | 'newsletter' | 'evidence';
