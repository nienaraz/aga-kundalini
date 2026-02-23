'use client';

import { useState, useMemo } from 'react';
import VideoCard from './VideoCard';
import type { VideoItem } from '@/lib/video';

/* ------------------------------------------------------------------ */
/*  VideoFilter – client-side topic/tag filter for the video grid       */
/* ------------------------------------------------------------------ */

interface VideoFilterProps {
  videos: VideoItem[];
  topics: string[];
  tags: string[];
}

/** Topic label map (Polish). */
const topicLabels: Record<string, string> = {
  reset: 'Reset',
  edukacja: 'Edukacja',
  praktyka: 'Praktyka',
  medytacja: 'Medytacja',
  oddech: 'Oddech',
};

export default function VideoFilter({ videos, topics, tags }: VideoFilterProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = videos;
    if (activeTopic) {
      result = result.filter((v) => v.topic === activeTopic);
    }
    if (activeTag) {
      result = result.filter((v) => v.tags.includes(activeTag));
    }
    return result;
  }, [videos, activeTopic, activeTag]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 space-y-4">
        {/* Topic filters */}
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-earth-400 mr-3">
            Temat:
          </span>
          <div className="inline-flex flex-wrap gap-2 mt-1">
            <button
              type="button"
              onClick={() => setActiveTopic(null)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium
                transition-colors duration-200
                ${
                  activeTopic === null
                    ? 'bg-sage-600 text-white'
                    : 'bg-warm-100 text-earth-600 hover:bg-warm-200'
                }
              `}
            >
              Wszystkie
            </button>
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setActiveTopic(topic === activeTopic ? null : topic)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-200
                  ${
                    activeTopic === topic
                      ? 'bg-sage-600 text-white'
                      : 'bg-warm-100 text-earth-600 hover:bg-warm-200'
                  }
                `}
              >
                {topicLabels[topic] ?? topic}
              </button>
            ))}
          </div>
        </div>

        {/* Tag filters */}
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-earth-400 mr-3">
            Tag:
          </span>
          <div className="inline-flex flex-wrap gap-2 mt-1">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium
                transition-colors duration-200
                ${
                  activeTag === null
                    ? 'bg-earth-700 text-warm-100'
                    : 'bg-warm-100 text-earth-600 hover:bg-warm-200'
                }
              `}
            >
              Wszystkie
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium
                  transition-colors duration-200
                  ${
                    activeTag === tag
                      ? 'bg-earth-700 text-warm-100'
                      : 'bg-warm-100 text-earth-600 hover:bg-warm-200'
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-earth-400 mb-6">
        {filtered.length === 1
          ? '1 materiał'
          : `${filtered.length} materiałów`}
      </p>

      {/* Video grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-earth-400 text-lg">
            Brak materiałów pasujących do wybranych filtrów.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTopic(null);
              setActiveTag(null);
            }}
            className="
              mt-4 px-4 py-2 rounded-lg
              bg-warm-100 text-earth-600
              hover:bg-warm-200
              transition-colors text-sm
            "
          >
            Wyczyść filtry
          </button>
        </div>
      )}
    </div>
  );
}
