import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getAllTags } from '@/lib/content';
import { ArticleCard } from '@/components/content/ArticleCard';
import { FilterBar } from '@/components/content/FilterBar';

const categoryMeta: Record<string, { label: string; description: string }> = {
  'uklad-nerwowy': {
    label: 'Uklad nerwowy',
    description: 'Artykuly o tym, jak dziala uklad nerwowy i dlaczego jego regulacja jest kluczowa.',
  },
  'reaktywnosc-vs-reakcja': {
    label: 'Reaktywnosc vs reakcja',
    description: 'Roznica miedzy automatyczna reaktywnoscia a swiadoma odpowiedzia.',
  },
  'oddech-i-sygnaly-ciala': {
    label: 'Oddech i sygnaly ciala',
    description: 'Jak oddech i cialo komunikuja Twoj stan wewnetrzny.',
  },
  'domkniecie-cyklu-stresu': {
    label: 'Domkniecie cyklu stresu',
    description: 'Jak zamykac cykl stresowy w bezpieczny sposob.',
  },
  'kundalini-podstawy': {
    label: 'Kundalini – podstawy',
    description: 'Podstawy jogi kundalini i jej wplyw na regulacje ukladu nerwowego.',
  },
};

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const meta = categoryMeta[params.category];
  if (!meta) return { title: 'Biblioteka' };
  return {
    title: meta.label,
    description: meta.description,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const meta = categoryMeta[params.category];
  if (!meta) notFound();

  const articles = getArticlesByCategory(params.category);
  const tags = getAllTags('article');

  return (
    <div className="section-spacing">
      <div className="content-container">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-3">
          {meta.label}
        </h1>
        <p className="text-calm-body text-earth-600 mb-10 max-w-2xl leading-relaxed">
          {meta.description}
        </p>

        <LibraryCategoryContent articles={articles} tags={tags} />
      </div>
    </div>
  );
}

/* Client wrapper for filtering – we need to keep the page as server component
   but FilterBar is client-side. For simplicity, render all articles and let
   FilterBar operate via CSS or a wrapping client component in the future. */
function LibraryCategoryContent({
  articles,
  tags,
}: {
  articles: ReturnType<typeof getArticlesByCategory>;
  tags: string[];
}) {
  if (articles.length === 0) {
    return (
      <p className="text-sm text-earth-500">
        Brak artykulow w tej kategorii. Wkrotce sie tu pojawia.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          title={article.title}
          slug={article.slug}
          description={article.description}
          category={article.category}
          tags={article.tags}
          featured={article.featured}
        />
      ))}
    </div>
  );
}
