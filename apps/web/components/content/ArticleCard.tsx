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
  'uklad-nerwowy': 'Uklad nerwowy',
  'reaktywnosc-vs-reakcja': 'Reaktywnosc vs reakcja',
  'oddech-i-sygnaly-ciala': 'Oddech i cialo',
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
      className={`card-calm block group ${featured ? 'ring-2 ring-sage-200' : ''}`}
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-block text-xs font-medium uppercase tracking-wider text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full">
          {categoryLabels[category] || category}
        </span>
        {readingTime && (
          <span className="text-xs text-earth-400">{readingTime} min czytania</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg text-earth-800 group-hover:text-sage-700 transition-colors mb-2 leading-snug">
        {title}
      </h3>

      {/* Description – truncated */}
      <p className="text-sm text-earth-600 leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-earth-500 bg-warm-100 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Featured indicator */}
      {featured && (
        <div className="mt-3 pt-3 border-t border-warm-100">
          <span className="text-xs font-medium text-warm-500">Wyrozniony</span>
        </div>
      )}
    </Link>
  );
}
