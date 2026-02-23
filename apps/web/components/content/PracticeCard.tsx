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

const categoryColors: Record<string, string> = {
  oddech: 'bg-sky-100/60',
  ruch: 'bg-earth-100/60',
  medytacja: 'bg-sage-100/60',
  resety: 'bg-rose-100/60',
};

function IntensityDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Intensywność: ${level} z 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i < level ? 'bg-sage-500' : 'bg-warm-200/60'
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
  const placeholderBg = categoryColors[practiceCategory] || 'bg-warm-100/60';

  return (
    <Link
      href={`/practices/${practiceCategory}/${slug}`}
      className="card-calm block group"
    >
      {/* Image placeholder with category color */}
      <div className={`${placeholderBg} aspect-[16/10] rounded-2xl mb-5 flex items-center justify-center`}>
        <svg className="w-8 h-8 text-earth-300/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
        </svg>
      </div>

      {/* Top row: duration + category */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-sage-700 bg-sage-50/70 px-3 py-1.5 rounded-full">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {durationMin} min
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-earth-400">
          {categoryLabels[practiceCategory] || practiceCategory}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-heading-sm text-earth-900 group-hover:text-sage-700 transition-colors mb-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-earth-600 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Bottom: intensity + tags */}
      <div className="flex items-center justify-between">
        <IntensityDots level={intensity} />
        {tags.length > 0 && (
          <div className="flex gap-1.5">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-earth-500 bg-warm-100/60 px-2.5 py-0.5 rounded-full"
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
