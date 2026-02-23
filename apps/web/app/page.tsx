import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { getFeaturedVideos } from '@/lib/video';
import { ArticleCard } from '@/components/content/ArticleCard';

export default function HomePage() {
  const featuredArticles = getAllArticles()
    .filter((a) => a.featured)
    .slice(0, 3);

  const latestVideos = getFeaturedVideos(3);

  return (
    <>
      {/* ================================================================ */}
      {/*  HERO — Split layout with bento feel                              */}
      {/* ================================================================ */}
      <section className="section-spacing bg-[var(--color-bg)]">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left: text */}
            <div className="max-w-xl">
              <span className="label-editorial-pill mb-6 inline-flex">Joga Kundalini</span>
              <h1 className="font-serif text-display-sm md:text-display text-earth-950 leading-tight mb-6 animate-fade-in">
                Zrozum swój
                <br />
                układ nerwowy.
              </h1>
              <p className="text-body-lg text-earth-600 leading-relaxed mb-10 max-w-md animate-slide-up">
                Edukacja o regulacji nerwowej, praktyki oddechowe i ruchowe
                inspirowane jogą kundalini. Odpowiadaj zamiast reagować.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-up">
                <Link
                  href="/start"
                  className="
                    px-8 py-4 rounded-2xl
                    bg-sage-600 text-white font-medium
                    hover:bg-sage-700 active:bg-sage-800
                    transition-colors text-body-sm
                    shadow-soft
                  "
                >
                  Zacznij tutaj
                </Link>
                <Link
                  href="/practices/resety"
                  className="
                    px-8 py-4 rounded-2xl
                    bg-warm-100 text-earth-700 font-medium
                    hover:bg-warm-200 active:bg-warm-300
                    transition-colors text-body-sm
                    border border-warm-200/60
                  "
                >
                  2 min reset
                </Link>
              </div>
            </div>

            {/* Right: image placeholder + decorative shapes */}
            <div className="relative">
              <div className="img-placeholder aspect-[4/5] rounded-[2rem]">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-200/60 flex items-center justify-center">
                    <svg className="w-7 h-7 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                  </div>
                  <p className="text-earth-400 text-body-sm">Zdjęcie Agi</p>
                </div>
              </div>
              {/* Decorative blob */}
              <div className="organic-blob w-32 h-32 bg-sage-300 -top-6 -right-6" />
              <div className="organic-blob w-24 h-24 bg-gold-300 -bottom-4 -left-4" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  BENTO GRID — Features overview                                   */}
      {/* ================================================================ */}
      <section className="section-spacing-sm bg-warm-100/40">
        <div className="content-container">
          <div className="text-center mb-14">
            <span className="label-editorial mb-4 block">Czym się zajmuję</span>
            <h2 className="font-serif text-heading-xl md:text-display-sm text-earth-950">
              Przestrzeń do regulacji
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: Edukacja — sage */}
            <div className="card-sage lg:col-span-2 flex flex-col justify-between min-h-[260px]">
              <div>
                <span className="label-editorial-pill mb-4 inline-flex">Edukacja</span>
                <h3 className="font-serif text-heading-lg text-earth-900 mb-3">
                  Zrozum jak działa Twój układ nerwowy
                </h3>
                <p className="text-body-base text-earth-600 max-w-lg">
                  Artykuły i materiały o regulacji, oknie tolerancji, reaktywności i świadomym
                  odpowiadaniu na stres.
                </p>
              </div>
              <Link
                href="/library"
                className="mt-6 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm hover:text-sage-800 transition-colors"
              >
                Biblioteka
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Card 2: Praktyki — white */}
            <div className="card-calm flex flex-col justify-between min-h-[260px]">
              <div>
                <span className="label-editorial-pill mb-4 inline-flex">Praktyki</span>
                <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                  Oddech, ruch, medytacja
                </h3>
                <p className="text-body-sm text-earth-600">
                  Krótkie praktyki do codziennego stosowania. Od 2 do 15 minut.
                </p>
              </div>
              <Link
                href="/practices"
                className="mt-6 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm hover:text-sage-800 transition-colors"
              >
                Praktyki
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Card 3: Ścieżki — warm */}
            <div className="card-warm flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="label-editorial-pill mb-4 inline-flex">Ścieżki</span>
                <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                  Programy krok po kroku
                </h3>
                <p className="text-body-sm text-earth-600">
                  7-dniowe ścieżki tematyczne z codzienną praktyką i materiałem.
                </p>
              </div>
              <Link
                href="/paths"
                className="mt-6 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm hover:text-sage-800 transition-colors"
              >
                Ścieżki
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Card 4: Quiz — gold accent */}
            <div className="card-gold flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="label-editorial-pill mb-4 inline-flex">Narzędzia</span>
                <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                  Sprawdź swój stan
                </h3>
                <p className="text-body-sm text-earth-600">
                  Quiz, check-in, dziennik reakcji i menu uziemienia.
                </p>
              </div>
              <Link
                href="/quiz"
                className="mt-6 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm hover:text-sage-800 transition-colors"
              >
                Zrób quiz
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Card 5: Video — image placeholder */}
            <div className="card-calm flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="label-editorial-pill mb-4 inline-flex">Video</span>
                <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                  Shorts i praktyki wideo
                </h3>
                <p className="text-body-sm text-earth-600">
                  Krótkie filmy z ćwiczeniami i wyjaśnieniami.
                </p>
              </div>
              <Link
                href="/video"
                className="mt-6 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm hover:text-sage-800 transition-colors"
              >
                Oglądaj
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  WEBINAR CTA — Full-width banner                                  */}
      {/* ================================================================ */}
      <section className="section-spacing-sm">
        <div className="content-container">
          <div className="card-sage text-center py-12 md:py-16 relative overflow-hidden">
            <div className="organic-blob w-48 h-48 bg-sage-300 -top-12 -right-12" />
            <div className="relative z-10">
              <span className="label-editorial-pill mb-5 inline-flex">Webinar</span>
              <h2 className="font-serif text-heading-xl text-earth-900 mb-3">
                [Tytuł najbliższego webinaru]
              </h2>
              <p className="text-body-base text-earth-600 mb-8 max-w-lg mx-auto">
                [Data i krótki opis webinaru]
              </p>
              <Link
                href="/webinars"
                className="
                  inline-flex px-8 py-4 rounded-2xl
                  bg-sage-600 text-white font-medium text-body-sm
                  hover:bg-sage-700 transition-colors shadow-soft
                "
              >
                Sprawdź szczegóły
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  LATEST SHORTS                                                    */}
      {/* ================================================================ */}
      {latestVideos.length > 0 && (
        <section className="section-spacing-sm bg-warm-100/30">
          <div className="content-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="label-editorial mb-3 block">Najnowsze</span>
                <h2 className="font-serif text-heading-xl text-earth-950">Shorts</h2>
              </div>
              <Link
                href="/video"
                className="text-body-sm text-sage-600 font-medium hover:text-sage-700 transition-colors hidden sm:block"
              >
                Wszystkie filmy
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestVideos.map((video) => (
                <Link
                  key={video.slug}
                  href={`/video/${video.slug}`}
                  className="card-calm block group"
                >
                  <div className="img-placeholder-sage aspect-video rounded-2xl mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-sage-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-heading-sm text-earth-900 group-hover:text-sage-700 transition-colors mb-1">
                    {video.title}
                  </h3>
                  <p className="text-body-sm text-earth-500">{video.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  FROM THE LIBRARY                                                 */}
      {/* ================================================================ */}
      <section className="section-spacing">
        <div className="content-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="label-editorial mb-3 block">Z biblioteki</span>
              <h2 className="font-serif text-heading-xl text-earth-950">Artykuły</h2>
            </div>
            <Link
              href="/library"
              className="text-body-sm text-sage-600 font-medium hover:text-sage-700 transition-colors hidden sm:block"
            >
              Zobacz wszystko
            </Link>
          </div>

          {featuredArticles.length > 0 ? (
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
          ) : (
            <div className="card-warm text-center py-12">
              <p className="text-body-base text-earth-500">[Dodaj wyróżnione artykuły]</p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/*  NEWSLETTER — centered editorial block                            */}
      {/* ================================================================ */}
      <section className="section-spacing bg-warm-100/40">
        <div className="content-container-xs text-center">
          <span className="label-editorial mb-4 block">Newsletter</span>
          <h2 className="font-serif text-heading-xl text-earth-950 mb-4">
            Bądź na bieżąco
          </h2>
          <p className="text-body-base text-earth-600 mb-8 max-w-md mx-auto leading-relaxed">
            Krótkie inspiracje o regulacji nerwowej i jodze.
            Bez spamu, raz w tygodniu.
          </p>

          <form
            action="/api/newsletter"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="home-email" className="sr-only">Adres e-mail</label>
            <input
              id="home-email"
              name="email"
              type="email"
              required
              placeholder="twoj@email.pl"
              autoComplete="email"
              className="
                flex-1 px-5 py-3.5 rounded-2xl
                bg-white border border-warm-200/60
                text-earth-900 placeholder-earth-400
                text-body-sm
                focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent
                transition-colors
              "
            />
            <button
              type="submit"
              className="
                px-8 py-3.5 rounded-2xl
                bg-sage-600 text-white text-body-sm font-medium
                hover:bg-sage-700 active:bg-sage-800
                transition-colors shadow-soft shrink-0
              "
            >
              Zapisz się
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
