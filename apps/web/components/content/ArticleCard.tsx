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
  'oddech-i-cialo': 'Oddech i ciało',
  'domkniecie-cyklu-stresu': 'Cykl stresu',
  'cykl-stresu': 'Cykl stresu',
  'kundalini-podstawy': 'Kundalini',
};

/* Rotating tag colors — each tag gets a color from this palette */
const tagColors = [
  'bg-cobalt-100 text-cobalt-700 border-cobalt-200',
  'bg-sage-100 text-sage-700 border-sage-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-violet-50 text-violet-700 border-violet-200',
  'bg-teal-50 text-teal-700 border-teal-200',
];

/* Category accent — colored left bar */
const categoryAccent: Record<string, string> = {
  'uklad-nerwowy': 'from-cobalt-500 to-cobalt-400',
  'reaktywnosc-vs-reakcja': 'from-rose-400 to-orange-400',
  'oddech-i-sygnaly-ciala': 'from-teal-400 to-sage-400',
  'oddech-i-cialo': 'from-teal-400 to-sage-400',
  'domkniecie-cyklu-stresu': 'from-amber-400 to-yellow-400',
  'cykl-stresu': 'from-amber-400 to-yellow-400',
  'kundalini-podstawy': 'from-violet-400 to-purple-400',
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
  const accent = categoryAccent[category] || 'from-cobalt-500 to-cobalt-400';

  return (
    <Link
      href={`/library/${category}/${slug}`}
      className={`card-calm block group relative overflow-hidden ${featured ? 'ring-2 ring-cobalt-400/50' : ''}`}
    >
      {/* Category color bar — left edge */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${accent} rounded-l-2xl`} />

      {/* Category pill */}
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

      {/* Tags — colorful */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${tagColors[i % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
