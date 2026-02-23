import Link from 'next/link';
import Image from 'next/image';
import { formatDuration, type VideoItem } from '@/lib/video';

/* ------------------------------------------------------------------ */
/*  VideoCard – thumbnail card linking to /video/[slug]                 */
/* ------------------------------------------------------------------ */

interface VideoCardProps {
  video: VideoItem;
}

/** Topic label map (Polish). */
const topicLabels: Record<string, string> = {
  reset: 'Reset',
  edukacja: 'Edukacja',
  praktyka: 'Praktyka',
  medytacja: 'Medytacja',
  oddech: 'Oddech',
};

export default function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
  const duration = formatDuration(video.durationSec);
  const topicLabel = topicLabels[video.topic] ?? video.topic;

  return (
    <Link
      href={`/video/${video.slug}`}
      className="
        group card-calm flex flex-col overflow-hidden
        focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-earth-100 -mx-6 -mt-6 mb-4">
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            group-hover:scale-105
            transition-transform duration-500 ease-out
          "
        />

        {/* Duration badge */}
        <span
          className="
            absolute bottom-2 right-2
            px-2 py-0.5 rounded-md
            bg-earth-900/80 text-warm-100 text-xs font-medium
            backdrop-blur-sm
          "
        >
          {duration}
        </span>

        {/* Play icon overlay */}
        <div
          className="
            absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-md">
            <svg className="w-5 h-5 text-sage-700 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Topic badge */}
      <span
        className="
          inline-block self-start mb-2
          px-2.5 py-0.5 rounded-full
          text-xs font-medium
          bg-sage-100 text-sage-700
        "
      >
        {topicLabel}
      </span>

      {/* Title */}
      <h3
        className="
          font-serif text-lg text-earth-800
          group-hover:text-sage-700
          transition-colors duration-200
          leading-snug
        "
      >
        {video.title}
      </h3>

      {/* Description */}
      <p className="mt-1.5 text-sm text-earth-500 leading-relaxed line-clamp-2">
        {video.description}
      </p>
    </Link>
  );
}
