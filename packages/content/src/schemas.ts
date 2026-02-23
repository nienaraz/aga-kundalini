import { z } from 'zod';

// Wspólne pola dla wszystkich treści
const baseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(10).max(300),
  tags: z.array(z.string()).min(1),
  category: z.string(),
  publishedAt: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  updatedAt: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

// Artykuł edukacyjny
export const articleSchema = baseSchema.extend({
  type: z.literal('article').default('article'),
  keyTakeaways: z.array(z.string()).min(1).max(7),
  somaticCues: z.array(z.string()).optional(), // np. "Zwróć uwagę na napięcie w szczęce"
  difficulty: z.enum(['podstawowy', 'średni', 'zaawansowany']).default('podstawowy'),
  relatedPractices: z.array(z.string()).optional(), // slugi powiązanych praktyk
});

// Praktyka (oddechowa, ruchowa, medytacja, reset)
export const practiceSchema = baseSchema.extend({
  type: z.literal('practice').default('practice'),
  durationMin: z.number().min(1).max(120),
  intensity: z.number().min(1).max(5),
  prerequisites: z.array(z.string()).optional(),
  contraindications: z.array(z.string()).optional(),
  steps: z.array(z.object({
    order: z.number(),
    instruction: z.string(),
    durationSec: z.number().optional(),
    note: z.string().optional(),
  })).min(1),
  variations: z.array(z.object({
    name: z.string(),
    description: z.string(),
    forWhom: z.string().optional(),
  })).optional(),
  cuesToNotice: z.array(z.string()).min(1), // "co obserwować podczas praktyki"
  safetyNotes: z.string().optional(),
  practiceCategory: z.enum(['oddech', 'ruch', 'medytacja', 'reset']),
});

// Ścieżka (program wielodniowy)
export const pathSchema = baseSchema.extend({
  type: z.literal('path').default('path'),
  days: z.array(z.object({
    dayNumber: z.number(),
    title: z.string(),
    description: z.string(),
    contentRefs: z.array(z.string()), // slugi artykułów/praktyk
    estimatedTimeMin: z.number(),
  })).min(3),
  goal: z.string(),
  prerequisites: z.array(z.string()).optional(),
  contraindications: z.array(z.string()).optional(),
  totalDays: z.number(),
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
  issueNumber: z.number(),
  draft: z.boolean().default(false),
});

// Typy wyeksportowane
export type Article = z.infer<typeof articleSchema>;
export type Practice = z.infer<typeof practiceSchema>;
export type Path = z.infer<typeof pathSchema>;
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>;
export type NewsletterIssue = z.infer<typeof newsletterSchema>;
export type ContentType = 'article' | 'practice' | 'path' | 'glossary' | 'newsletter';
