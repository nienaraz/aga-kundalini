import Link from 'next/link';

type PracticeCardProps = {
  title: string;
  slug: string;
  description: string;
  practiceCategory: string;
  durationMin: number;
  intensity: number;
  tags: string[];
};

const categoryLabels: Record<string, string> = {
  oddech: 'Oddech',
  ruch: 'Ruch',
  medytacja: 'Medytacja',
  resety: 'Resety',
};

function IntensityDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Intensywnosc: ${level} z 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level ? 'bg-sage-500' : 'bg-warm-200'
          }`}
        />
      ))}
    </div>
  );
}

export function PracticeCard({
  title,
  slug,
  description,
  practiceCategory,
  durationMin,
  intensity,
  tags,
}: PracticeCardProps) {
  return (
    <Link
      href={`/practices/${practiceCategory}/${slug}`}
      className="card-calm block group"
    >
      {/* Top row: duration + category */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 bg-sage-50 px-3 py-1 rounded-full">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {durationMin} min
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-earth-400">
          {categoryLabels[practiceCategory] || practiceCategory}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg text-earth-800 group-hover:text-sage-700 transition-colors mb-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-earth-600 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Bottom row: intensity + tags */}
      <div className="flex items-center justify-between">
        <IntensityDots level={intensity} />
        {tags.length > 0 && (
          <div className="flex gap-1">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-earth-500 bg-warm-100 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
