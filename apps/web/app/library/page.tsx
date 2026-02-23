import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { ArticleCard } from '@/components/content/ArticleCard';

export const metadata: Metadata = {
  title: 'Biblioteka',
  description:
    'Artykuly edukacyjne o ukladzie nerwowym, reaktywnosci, oddechu, cyklu stresu i kundalini.',
};

const categories = [
  { slug: 'uklad-nerwowy', label: 'Uklad nerwowy', description: 'Jak dziala Twoj uklad nerwowy i dlaczego to wazne.' },
  { slug: 'reaktywnosc-vs-reakcja', label: 'Reaktywnosc vs reakcja', description: 'Roznnica miedzy automatyczna reakcja a swiadoma odpowiedzia.' },
  { slug: 'oddech-i-sygnaly-ciala', label: 'Oddech i sygnaly ciala', description: 'Jak oddech i cialo komunikuja Twoj stan.' },
  { slug: 'domkniecie-cyklu-stresu', label: 'Domkniecie cyklu stresu', description: 'Jak zamykac cykl stresowy w bezpieczny sposob.' },
  { slug: 'kundalini-podstawy', label: 'Kundalini – podstawy', description: 'Podstawy jogi kundalini i jej wplyw na regulacje.' },
];

export default function LibraryPage() {
  const articles = getAllArticles();
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

  return (
    <div className="section-spacing">
      <div className="content-container">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Biblioteka
        </h1>
        <p className="text-calm-body text-earth-600 mb-12 max-w-2xl leading-relaxed">
          Artykuly edukacyjne o regulacji ukladu nerwowego, swiadomym reagowaniu
          i praktykach jogi kundalini.
        </p>

        {/* Category grid */}
        <section className="mb-16">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Kategorie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/library/${cat.slug}`}
                className="card-calm block group"
              >
                <h3 className="font-serif text-base text-earth-800 group-hover:text-sage-700 transition-colors mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs text-earth-500 leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured articles */}
        {featuredArticles.length > 0 && (
          <section>
            <h2 className="font-serif text-xl text-earth-800 mb-6">Wyroznione</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
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
          </section>
        )}
      </div>
    </div>
  );
}
