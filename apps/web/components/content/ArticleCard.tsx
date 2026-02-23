import Link from 'next/link';

type ArticleCardProps = {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  readingTime?: number;
  featured?: boolean;
};

const categoryLabels: Record<string, string> = {
  'uklad-nerwowy': 'Układ nerwowy',
  'reaktywnosc-vs-reakcja': 'Reaktywność vs reakcja',
  'oddech-i-sygnaly-ciala': 'Oddech i ciało',
  'domkniecie-cyklu-stresu': 'Cykl stresu',
  'kundalini-podstawy': 'Kundalini',
};

export function ArticleCard({
  title,
  slug,
  description,
  category,
  tags,
  readingTime,
  featured,
}: ArticleCardProps) {
  return (
    <Link
      href={`/library/${category}/${slug}`}
      className={`card-calm block group ${featured ? 'ring-2 ring-sage-200/60' : ''}`}
    >
      {/* Image placeholder */}
      <div className="img-placeholder-sage aspect-[16/9] rounded-2xl mb-5 flex items-center justify-center">
        <svg className="w-8 h-8 text-sage-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between mb-3">
        <span className="label-editorial-pill text-[10px]">
          {categoryLabels[category] || category}
        </span>
        {readingTime && (
          <span className="text-xs text-earth-400">{readingTime} min</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-serif text-heading-sm text-earth-900 group-hover:text-sage-700 transition-colors mb-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-earth-600 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-earth-500 bg-warm-100/60 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
