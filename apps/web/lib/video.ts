import { z } from 'zod';
import videosData from '@/content/video/videos.json';

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

export const videoItemSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  platform: z.literal('youtube'),
  youtubeId: z.string().min(1),
  durationSec: z.number().int().positive(),
  topic: z.string().min(1),
  featured: z.boolean(),
  draft: z.boolean(),
});

export type VideoItem = z.infer<typeof videoItemSchema>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseVideos(): VideoItem[] {
  const parsed = z.array(videoItemSchema).safeParse(videosData);
  if (!parsed.success) {
    console.error('[video] Invalid videos.json:', parsed.error.flatten());
    return [];
  }
  return parsed.data;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** All published videos, newest first. */
export function getAllVideos(): VideoItem[] {
  return parseVideos()
    .filter((v) => !v.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Single video by slug, or null. */
export function getVideoBySlug(slug: string): VideoItem | null {
  return parseVideos().find((v) => v.slug === slug && !v.draft) ?? null;
}

/** Videos filtered by topic. */
export function getVideosByTopic(topic: string): VideoItem[] {
  return getAllVideos().filter((v) => v.topic === topic);
}

/** Featured videos, limited. */
export function getFeaturedVideos(limit = 3): VideoItem[] {
  return getAllVideos()
    .filter((v) => v.featured)
    .slice(0, limit);
}

/** All unique topics from published videos. */
export function getAllTopics(): string[] {
  const topics = new Set(getAllVideos().map((v) => v.topic));
  return Array.from(topics).sort();
}

/** All unique tags from published videos. */
export function getAllTags(): string[] {
  const tags = new Set(getAllVideos().flatMap((v) => v.tags));
  return Array.from(tags).sort();
}

/** Format seconds into MM:SS string. */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
