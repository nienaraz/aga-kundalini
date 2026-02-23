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

const categoryCardStyles = [
  'card-sage',
  'card-warm',
  'card-calm',
  'card-sage',
  'card-warm',
];

export default function LibraryPage() {
  const articles = getAllArticles();
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

  return (
    <div className="section-spacing">
      <div className="content-container">
        {/* ================================================================ */}
        {/*  PAGE HEADER                                                      */}
        {/* ================================================================ */}
        <div className="mb-14">
          <span className="label-editorial mb-4 block">Edukacja</span>
          <h1 className="font-serif text-display-sm md:text-display text-earth-950 leading-tight mb-5">
            Biblioteka
          </h1>
          <p className="text-body-lg text-earth-600 max-w-2xl leading-relaxed">
            Artykuly edukacyjne o regulacji ukladu nerwowego, swiadomym reagowaniu
            i praktykach jogi kundalini.
          </p>
        </div>

        {/* ================================================================ */}
        {/*  CATEGORIES                                                       */}
        {/* ================================================================ */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="label-editorial mb-3 block">Tematy</span>
              <h2 className="font-serif text-heading-xl text-earth-950">Kategorie</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/library/${cat.slug}`}
                className={`${categoryCardStyles[i % categoryCardStyles.length]} block group`}
              >
                <div className="flex flex-col justify-between min-h-[160px]">
                  <div>
                    <span className="label-editorial-pill mb-4 inline-flex">
                      {cat.label}
                    </span>
                    <p className="text-body-sm text-earth-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm group-hover:text-sage-800 transition-colors">
                    Czytaj
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/*  FEATURED ARTICLES                                                */}
        {/* ================================================================ */}
        {featuredArticles.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="label-editorial mb-3 block">Polecane</span>
                <h2 className="font-serif text-heading-xl text-earth-950">Wyroznione</h2>
              </div>
              <Link
                href="/library"
                className="text-body-sm text-sage-600 font-medium hover:text-sage-700 transition-colors hidden sm:block"
              >
                Wszystkie artykuly
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
