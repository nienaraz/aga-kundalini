import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { getFeaturedVideos } from '@/lib/video';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Marquee } from '@/components/ui/Marquee';

export default function HomePage() {
  const featuredArticles = getAllArticles()
    .filter((a) => a.featured)
    .slice(0, 3);

  const latestVideos = getFeaturedVideos(3);

  return (
    <>
      {/* ================================================================ */}
      {/*  HERO — Blue background with dynamic elements                    */}
      {/* ================================================================ */}
      <section className="hero-blue relative overflow-hidden">
        {/* Geometric grid background */}
        <div className="absolute inset-0 geo-dots opacity-30" />

        {/* Floating decorative shapes */}
        <div className="absolute top-20 left-[10%] w-20 h-20 rounded-full bg-white/10 animate-float" />
        <div className="absolute top-40 right-[15%] w-14 h-14 rounded-full bg-white/8 animate-float-delayed" />
        <div className="absolute bottom-20 left-[25%] w-10 h-10 rounded-full bg-white/6 animate-float-slow" />
        <div className="absolute top-32 right-[35%] w-3 h-3 rounded-full bg-white/30 animate-pulse-soft" />
        <div className="absolute bottom-40 right-[20%] w-4 h-4 rounded-full bg-white/20 animate-pulse-soft" />

        {/* Pixel-style squares (inspired by checkerboard) */}
        <div className="absolute top-16 right-[8%] w-8 h-8 bg-white/10 animate-bounce-soft" />
        <div className="absolute top-24 right-[12%] w-5 h-5 bg-white/8" />
        <div className="absolute bottom-32 left-[8%] w-6 h-6 bg-white/10 animate-wiggle" />

        <div className="section-spacing relative z-10">
          <div className="content-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              {/* Left: text */}
              <div className="max-w-xl">
                <span className="label-editorial-pill mb-6 inline-flex animate-fade-in">
                  Społeczność regulacji
                </span>
                <h1 className="font-serif text-display-sm md:text-display text-white leading-tight mb-6 animate-fade-in">
                  Praktyka
                  <br />
                  odpowiedzi.
                </h1>
                <p className="text-body-lg text-white/80 leading-relaxed mb-10 max-w-md animate-slide-up">
                  Przestrzeń dla ludzi, którzy chcą zrozumieć swój układ nerwowy
                  i świadomie przechodzić od reaktywności do odpowiedzi.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-up">
                  <Link
                    href="/start"
                    className="
                      px-8 py-4 rounded-2xl
                      bg-white text-sage-600 font-semibold
                      hover:bg-white/90 active:bg-white/80
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
                      bg-white/15 text-white font-medium
                      hover:bg-white/25 active:bg-white/30
                      transition-colors text-body-sm
                      border border-white/20 backdrop-blur-sm
                    "
                  >
                    2 min reset
                  </Link>
                </div>
              </div>

              {/* Right: image placeholder */}
              <div className="relative animate-scale-in">
                <div className="aspect-[4/5] rounded-[2rem] bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/15 flex items-center justify-center animate-breathe">
                      <svg className="w-7 h-7 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                    <p className="text-white/40 text-body-sm">Zdjęcie Agi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  MARQUEE — Dynamic text strip                                    */}
      {/* ================================================================ */}
      <div className="bg-earth-950 py-4 overflow-hidden">
        <Marquee
          items={[
            'Oddech',
            'Regulacja',
            'Układ nerwowy',
            'Kundalini',
            'Medytacja',
            'Okno tolerancji',
            'Praktyka',
            'Uziemienie',
            'Odpowiedź',
          ]}
          className="text-body-sm text-white/50 font-medium tracking-wide"
        />
      </div>

      {/* ================================================================ */}
      {/*  BENTO GRID — Features overview                                   */}
      {/* ================================================================ */}
      <section className="section-spacing-sm">
        <div className="content-container">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="label-editorial mb-4 block">Czym się zajmuję</span>
              <h2 className="font-serif text-heading-xl md:text-display-sm text-earth-950">
                Przestrzeń do regulacji
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 1: Edukacja — blue solid */}
              <div className="card-blue lg:col-span-2 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/10 animate-breathe" />
                <div className="relative z-10">
                  <span className="inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-white/80 bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20 mb-4">
                    Edukacja
                  </span>
                  <h3 className="font-serif text-heading-lg text-white mb-3">
                    Zrozum jak działa Twój układ nerwowy
                  </h3>
                  <p className="text-body-base text-white/70 max-w-lg">
                    Artykuły i materiały o regulacji, oknie tolerancji, reaktywności i świadomym
                    odpowiadaniu na stres.
                  </p>
                </div>
                <Link
                  href="/library"
                  className="relative z-10 mt-6 inline-flex items-center gap-2 text-white font-medium text-body-sm hover:text-white/80 transition-colors"
                >
                  Biblioteka
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Card 2: Praktyki */}
              <div className="card-calm flex flex-col justify-between min-h-[260px] group hover:-translate-y-1">
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
                  className="mt-6 inline-flex items-center gap-2 text-sage-500 font-medium text-body-sm hover:text-sage-600 transition-colors"
                >
                  Praktyki
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Card 3: Ścieżki */}
              <div className="card-warm flex flex-col justify-between min-h-[240px] group hover:-translate-y-1">
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
                  className="mt-6 inline-flex items-center gap-2 text-sage-500 font-medium text-body-sm hover:text-sage-600 transition-colors"
                >
                  Ścieżki
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Card 4: Quiz — blue tint */}
              <div className="card-sage flex flex-col justify-between min-h-[240px] relative overflow-hidden group hover:-translate-y-1">
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-sage-200/30 animate-float-slow" />
                <div className="relative z-10">
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
                  className="relative z-10 mt-6 inline-flex items-center gap-2 text-sage-500 font-medium text-body-sm hover:text-sage-600 transition-colors"
                >
                  Zrób quiz
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Card 5: Video */}
              <div className="card-calm flex flex-col justify-between min-h-[240px] group hover:-translate-y-1">
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
                  className="mt-6 inline-flex items-center gap-2 text-sage-500 font-medium text-body-sm hover:text-sage-600 transition-colors"
                >
                  Oglądaj
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  COMMUNITY PROMISE                                               */}
      {/* ================================================================ */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute inset-0 geo-grid" />

        <div className="content-container-xs text-center relative z-10">
          <ScrollReveal>
            <span className="label-editorial mb-4 block">Społeczność</span>
            <h2 className="font-serif text-heading-xl md:text-display-sm text-earth-950 mb-6">
              Co tu znajdziesz
            </h2>
            <p className="text-body-base text-earth-600 leading-relaxed mb-12 max-w-lg mx-auto">
              To miejsce dla osób, które chcą lepiej rozumieć siebie i swoje reakcje.
              Bez cudownych obietnic, bez presji. W swoim tempie.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="card-calm group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 flex items-center justify-center mb-4 group-hover:bg-sage-200 transition-colors">
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="font-serif text-heading-sm text-earth-900 mb-2">Wiedza</h3>
                <p className="text-body-sm text-earth-600 leading-relaxed">
                  Rzetelna edukacja o układzie nerwowym, regulacji i jodze kundalini.
                </p>
              </div>

              <div className="card-calm group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 flex items-center justify-center mb-4 group-hover:bg-sage-200 transition-colors">
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="font-serif text-heading-sm text-earth-900 mb-2">Praktyka</h3>
                <p className="text-body-sm text-earth-600 leading-relaxed">
                  Codzienne ćwiczenia oddechowe, ruchowe i medytacje. Od 2 minut.
                </p>
              </div>

              <div className="card-calm group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 flex items-center justify-center mb-4 group-hover:bg-sage-200 transition-colors">
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-heading-sm text-earth-900 mb-2">Wspólnota</h3>
                <p className="text-body-sm text-earth-600 leading-relaxed">
                  Webinary, wyzwania i ścieżki w kameralnej, bezpiecznej atmosferze.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <p className="text-body-xs text-earth-400 mt-10">
            Ta strona nie stanowi porady medycznej ani terapeutycznej.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CTA — Quiz (blue solid card)                                    */}
      {/* ================================================================ */}
      <section className="section-spacing-sm">
        <div className="content-container">
          <ScrollReveal>
            <div className="card-blue text-center py-12 md:py-16 relative overflow-hidden">
              <div className="absolute top-6 right-10 w-20 h-20 rounded-full bg-white/10 animate-float" />
              <div className="absolute bottom-8 left-12 w-14 h-14 rounded-full bg-white/8 animate-float-delayed" />
              <div className="absolute top-1/2 right-[20%] w-3 h-3 rounded-full bg-white/20 animate-pulse-soft" />

              <div className="relative z-10">
                <span className="inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-white/80 bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20 mb-5">
                  Dla nowych
                </span>
                <h2 className="font-serif text-heading-xl text-white mb-3">
                  Nie wiesz od czego zacząć?
                </h2>
                <p className="text-body-base text-white/70 mb-8 max-w-lg mx-auto">
                  Sprawdź swój stan w krótkim quizie i otrzymaj spersonalizowane
                  sugestie praktyk i materiałów.
                </p>
                <Link
                  href="/quiz"
                  className="
                    inline-flex px-8 py-4 rounded-2xl
                    bg-white text-sage-600 font-semibold text-body-sm
                    hover:bg-white/90 transition-colors shadow-soft
                  "
                >
                  Zrób quiz
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  LATEST SHORTS                                                    */}
      {/* ================================================================ */}
      {latestVideos.length > 0 && (
        <section className="section-spacing-sm">
          <div className="content-container">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="label-editorial mb-3 block">Najnowsze</span>
                  <h2 className="font-serif text-heading-xl text-earth-950">Shorts</h2>
                </div>
                <Link
                  href="/video"
                  className="text-body-sm text-sage-500 font-medium hover:text-sage-600 transition-colors hidden sm:block"
                >
                  Wszystkie filmy
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {latestVideos.map((video) => (
                  <Link
                    key={video.slug}
                    href={`/video/${video.slug}`}
                    className="card-calm block group hover:-translate-y-1"
                  >
                    <div className="img-placeholder-sage aspect-video rounded-2xl mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-sage-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-heading-sm text-earth-900 group-hover:text-sage-600 transition-colors mb-1">
                      {video.title}
                    </h3>
                    <p className="text-body-sm text-earth-500">{video.description}</p>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  FROM THE LIBRARY                                                 */}
      {/* ================================================================ */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute inset-0 geo-dots opacity-50" />
        <div className="content-container relative z-10">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="label-editorial mb-3 block">Z biblioteki</span>
                <h2 className="font-serif text-heading-xl text-earth-950">Artykuły</h2>
              </div>
              <Link
                href="/library"
                className="text-body-sm text-sage-500 font-medium hover:text-sage-600 transition-colors hidden sm:block"
              >
                Zobacz wszystko
              </Link>
            </div>
          </ScrollReveal>

          {featuredArticles.length > 0 ? (
            <ScrollReveal stagger>
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
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="card-warm text-center py-12">
                <p className="text-body-base text-earth-500">Artykuły wkrótce.</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/*  NEWSLETTER                                                      */}
      {/* ================================================================ */}
      <section className="section-spacing">
        <div className="content-container-xs text-center">
          <ScrollReveal>
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
                  bg-white border border-warm-200
                  text-earth-900 placeholder-earth-400
                  text-body-sm
                  focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent
                  transition-colors
                "
              />
              <button
                type="submit"
                className="
                  px-8 py-3.5 rounded-2xl
                  bg-sage-500 text-white text-body-sm font-medium
                  hover:bg-sage-600 active:bg-sage-700
                  transition-colors shadow-blue shrink-0
                "
              >
                Zapisz się
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
