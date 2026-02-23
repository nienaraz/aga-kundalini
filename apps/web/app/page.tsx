import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { getFeaturedVideos } from '@/lib/video';
import { ArticleCard } from '@/components/content/ArticleCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export default function HomePage() {
  const featuredArticles = getAllArticles()
    .filter((a) => a.featured)
    .slice(0, 3);

  const latestVideos = getFeaturedVideos(3);

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="section-spacing bg-warm-50">
        <div className="content-container text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-earth-900 leading-tight mb-6 animate-fade-in">
            Zrozum swoj uklad nerwowy.
            <br />
            Odpowiadaj zamiast reagowac.
          </h1>
          <p className="text-calm-body text-earth-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            Edukacja o regulacji nerwowej, praktyki oddechowe, ruchowe i medytacyjne
            inspirowane yoga kundalini. Prowadzi Aga.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link
              href="/start"
              className="
                px-8 py-3.5 rounded-xl
                bg-sage-600 text-white font-medium
                hover:bg-sage-500 active:bg-sage-700
                transition-colors text-sm
              "
            >
              Zacznij tutaj
            </Link>
            <Link
              href="/practices/resety"
              className="
                px-8 py-3.5 rounded-xl
                bg-warm-100 text-earth-700 font-medium
                hover:bg-warm-200 active:bg-warm-300
                transition-colors text-sm
              "
            >
              2 min reset
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Najnowsze Shorts ---- */}
      {latestVideos.length > 0 && (
        <section className="section-spacing">
          <div className="content-container">
            <h2 className="font-serif text-2xl text-earth-800 mb-8">Najnowsze Shorts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestVideos.map((video) => (
                <Link
                  key={video.slug}
                  href={`/video/${video.slug}`}
                  className="card-calm block group"
                >
                  <div className="aspect-video bg-earth-100 rounded-lg mb-3 flex items-center justify-center">
                    <svg className="w-10 h-10 text-earth-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-base text-earth-800 group-hover:text-sage-700 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-earth-500 mt-1">{video.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Najblizszy webinar ---- */}
      <section className="section-spacing bg-sage-50/50">
        <div className="content-container">
          <div className="card-calm max-w-xl mx-auto text-center">
            <span className="inline-block text-xs font-medium uppercase tracking-wider text-sage-600 bg-sage-100 px-3 py-1 rounded-full mb-4">
              Webinar
            </span>
            <h2 className="font-serif text-xl text-earth-800 mb-2">
              [Uzupelnij: tytul najblizszego webinaru]
            </h2>
            <p className="text-sm text-earth-600 mb-4">
              [Uzupelnij: data i krotki opis webinaru]
            </p>
            <Link
              href="/webinars"
              className="inline-block text-sm text-sage-600 font-medium underline underline-offset-2 hover:text-sage-700"
            >
              Sprawdz szczegoly
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Z biblioteki ---- */}
      <section className="section-spacing">
        <div className="content-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-earth-800">Z biblioteki</h2>
            <Link
              href="/library"
              className="text-sm text-sage-600 font-medium hover:text-sage-700 transition-colors"
            >
              Zobacz wszystko
            </Link>
          </div>

          {featuredArticles.length > 0 ? (
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
          ) : (
            <p className="text-sm text-earth-500">[Uzupelnij: dodaj wyroznione artykuly]</p>
          )}
        </div>
      </section>

      {/* ---- Newsletter ---- */}
      <section className="section-spacing bg-warm-100/50">
        <div className="content-container max-w-lg text-center">
          <h2 className="font-serif text-2xl text-earth-800 mb-3">Newsletter</h2>
          <p className="text-sm text-earth-600 mb-6 leading-relaxed">
            Krotkie inspiracje o regulacji nerwowej i jodze. Bez spamu, raz w tygodniu.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
