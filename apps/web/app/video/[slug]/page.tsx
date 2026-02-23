import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllVideos,
  getVideoBySlug,
  getVideosByTopic,
  formatDuration,
} from '@/lib/video';
import YouTubeEmbed from '@/components/video/YouTubeEmbed';
import VideoCard from '@/components/video/VideoCard';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  /video/[slug] – Single video detail page                            */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: { slug: string };
}

/* ---- Static params ------------------------------------------------ */

export function generateStaticParams() {
  return getAllVideos().map((v) => ({ slug: v.slug }));
}

/* ---- Metadata ----------------------------------------------------- */

export function generateMetadata({ params }: PageProps): Metadata {
  const video = getVideoBySlug(params.slug);
  if (!video) return { title: 'Nie znaleziono' };

  return {
    title: video.title,
    description: video.description,
    openGraph: {
      title: `${video.title} | Aga · Joga Kundalini`,
      description: video.description,
      type: 'video.other',
      images: [
        {
          url: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
    },
  };
}

/* ---- Page --------------------------------------------------------- */

export default function VideoDetailPage({ params }: PageProps) {
  const video = getVideoBySlug(params.slug);
  if (!video) notFound();

  // Related videos: same topic, excluding current
  const related = getVideosByTopic(video.topic)
    .filter((v) => v.slug !== video.slug)
    .slice(0, 3);

  const duration = formatDuration(video.durationSec);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    uploadDate: video.publishedAt,
    duration: `PT${Math.floor(video.durationSec / 60)}M${video.durationSec % 60}S`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: 'Aga \u00b7 Joga Kundalini',
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="section-spacing">
        <div className="content-container">
          {/* Breadcrumb */}
          <nav aria-label="Nawigacja" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-earth-400">
              <li>
                <Link href="/video" className="hover:text-sage-600 transition-colors">
                  Video
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-earth-600 truncate">{video.title}</li>
            </ol>
          </nav>

          {/* Video player */}
          <div className="mb-8">
            <YouTubeEmbed youtubeId={video.youtubeId} title={video.title} />
          </div>

          {/* Title & meta */}
          <header className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl text-earth-800 mb-3">
              {video.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-earth-400">
              <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-700 font-medium">
                {video.topic}
              </span>
              <span>{duration}</span>
              <span>
                {new Date(video.publishedAt).toLocaleDateString('pl-PL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </header>

          {/* Description */}
          <div className="prose-custom max-w-2xl mb-10">
            <p>{video.description}</p>
          </div>

          {/* Tags */}
          {video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    px-3 py-1 rounded-full
                    bg-warm-100 text-earth-600 text-sm
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* "Co zauważyć" section – placeholder */}
          <section
            className="
              mb-12 rounded-xl border border-warm-200
              bg-warm-50 p-6 sm:p-8
            "
          >
            <h2 className="font-serif text-xl text-earth-700 mb-3">
              Co zauwazyc podczas praktyki
            </h2>
            <ul className="space-y-2 text-earth-600 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-sage-500 mt-0.5" aria-hidden="true">&#8226;</span>
                <span>Obserwuj, jak zmienia sie Twoj oddech w trakcie i po praktyce.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-500 mt-0.5" aria-hidden="true">&#8226;</span>
                <span>Zwroc uwage na napieciw ciele -- ramiona, szczeka, brzuch.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-500 mt-0.5" aria-hidden="true">&#8226;</span>
                <span>Nie oceniaj swoich odczuc -- po prostu je zauważ.</span>
              </li>
            </ul>
          </section>

          {/* CTA to practices */}
          <div className="mb-12 flex flex-wrap gap-4">
            <Link
              href="/practices"
              className="
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-lg
                bg-sage-600 text-white text-sm font-medium
                hover:bg-sage-500 active:bg-sage-700
                transition-colors
              "
            >
              Przejdz do praktyk
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/paths"
              className="
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-lg
                border border-warm-300 text-earth-600 text-sm font-medium
                hover:bg-warm-100
                transition-colors
              "
            >
              Sciezki regulacji
            </Link>
          </div>

          {/* Related videos */}
          {related.length > 0 && (
            <section>
              <h2 className="font-serif text-xl text-earth-700 mb-6">
                Podobne materialy
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((v) => (
                  <VideoCard key={v.slug} video={v} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
