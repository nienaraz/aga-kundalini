import Link from 'next/link';

type RelatedItem = {
  title: string;
  slug: string;
  type: 'article' | 'practice' | 'path' | 'glossary';
  category: string;
};

type RelatedContentProps = {
  items: RelatedItem[];
};

const typeLabels: Record<string, string> = {
  article: 'Artykul',
  practice: 'Praktyka',
  path: 'Sciezka',
  glossary: 'Slownik',
};

function getHref(item: RelatedItem): string {
  switch (item.type) {
    case 'article':
      return `/library/${item.category}/${item.slug}`;
    case 'practice':
      return `/practices/${item.category}/${item.slug}`;
    case 'path':
      return `/paths/${item.slug}`;
    case 'glossary':
      return `/resources/glossary#${item.slug}`;
    default:
      return '#';
  }
}

export function RelatedContent({ items }: RelatedContentProps) {
  if (items.length === 0) return null;

  return (
    <section className="my-12">
      <h3 className="font-serif text-xl text-earth-800 mb-4">Powiazane tresci</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.slug}`}
            href={getHref(item)}
            className="flex items-center gap-3 p-4 rounded-lg border border-warm-200 bg-white hover:border-sage-200 hover:shadow-sm transition-all group"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-earth-400 bg-warm-50 px-2 py-0.5 rounded shrink-0">
              {typeLabels[item.type] || item.type}
            </span>
            <span className="text-sm text-earth-700 group-hover:text-sage-700 transition-colors truncate">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
