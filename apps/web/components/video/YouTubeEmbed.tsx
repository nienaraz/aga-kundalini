'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

/* ------------------------------------------------------------------ */
/*  YouTubeEmbed – privacy-first, lazy-loaded YouTube player           */
/*  Uses youtube-nocookie.com. Shows thumbnail until user clicks.       */
/* ------------------------------------------------------------------ */

interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
}

export default function YouTubeEmbed({ youtubeId, title }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-earth-100 border border-warm-200">
      {/* 16:9 aspect ratio wrapper */}
      <div className="relative aspect-video">
        {loaded ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={handleLoad}
            aria-label={`Odtwórz: ${title}`}
            className="
              group absolute inset-0 w-full h-full
              cursor-pointer focus:outline-none
              focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2
              rounded-xl
            "
          >
            {/* Thumbnail */}
            <Image
              src={thumbnailUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
              className="object-cover rounded-xl"
              priority={false}
            />

            {/* Dark overlay */}
            <div
              className="
                absolute inset-0 bg-earth-950/30
                group-hover:bg-earth-950/20
                transition-colors duration-300
                rounded-xl
              "
            />

            {/* Play button */}
            <div
              className="
                absolute inset-0 flex items-center justify-center
              "
            >
              <div
                className="
                  w-16 h-16 sm:w-20 sm:h-20
                  flex items-center justify-center
                  rounded-full bg-white/90 shadow-lg
                  group-hover:bg-white group-hover:scale-110
                  transition-all duration-300
                "
              >
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-sage-700 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Privacy notice */}
            <span
              className="
                absolute bottom-3 left-3 right-3
                text-xs text-warm-200 text-center
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              Kliknij, aby zaladowac odtwarzacz YouTube (youtube-nocookie.com)
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
