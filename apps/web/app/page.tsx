import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { getFeaturedVideos } from '@/lib/video';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

export default function HomePage() {
  const featuredArticles = getAllArticles()
    .filter((a) => a.featured)
    .slice(0, 3);

  const latestVideos = getFeaturedVideos(3);

  return (
    <>
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40"
        style={{ background: 'linear-gradient(135deg, #f3efe7 0%, #e8e4dc 30%, #dbeafe 70%, #eff6ff 100%)' }}
      >
        {/* Decorative gradient blobs */}
        <div className="absolute top-[-120px] right-[-80px] w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, #1d4ed8 40%, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] right-[15%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2f8f74 0%, #196350 40%, transparent 70%)' }} />
        <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }} />

        {/* Geometric accent — right side */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[380px] h-[380px]">
          <div className="relative w-full h-full">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cobalt-400/25" />
            {/* Inner ring */}
            <div className="absolute inset-12 rounded-full border-2 border-sage-400/30" />
            {/* Center dot */}
            <div className="absolute inset-[42%] rounded-full bg-gradient-to-br from-cobalt-500/20 to-sage-500/20" />
            {/* Crosshair lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cobalt-400/15" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-cobalt-400/15" />
          </div>
        </div>

        <div className="content-container relative z-10">
          <div className="max-w-3xl">
            <ScrollReveal>
              <span className="label-editorial mb-6 block">Społeczność regulacji</span>
              <h1 className="font-serif text-display-sm md:text-display lg:text-display-hero text-earth-950 mb-8">
                Praktyka
                <br />
                odpowiedzi.
              </h1>
              <p className="text-body-lg text-earth-600 leading-relaxed mb-12 max-w-xl">
                Przestrzeń dla ludzi, którzy chcą zrozumieć swój układ nerwowy
                i świadomie przechodzić od reaktywności do odpowiedzi.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/start" className="btn-editorial">
                  Zacznij tutaj
                </Link>
                <Link href="/practices/resety" className="btn-editorial-ghost">
                  2 min reset
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  02 — OFFERINGS                                                  */}
      {/* ================================================================ */}
      <div className="section-divider" />
      <section className="section-spacing">
        <div className="content-container">
          <ScrollReveal>
            <span className="label-editorial mb-4 block">Czym się zajmuję</span>
            <h2 className="font-serif text-display-sm text-earth-950 mb-16">
              Przestrzeń do regulacji
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Edukacja — spans 2 columns */}
              <div className="card-editorial-accent lg:col-span-2 flex flex-col justify-between min-h-[240px]">
                <div>
                  <span className="label-editorial mb-4 block">Edukacja</span>
                  <h3 className="font-serif text-heading-lg text-earth-900 mb-3">
                    Zrozum jak działa Twój układ nerwowy
                  </h3>
                  <p className="text-body-base text-earth-500 max-w-lg">
                    Artykuły i materiały o regulacji, oknie tolerancji, reaktywności i świadomym
                    odpowiadaniu na stres.
                  </p>
                </div>
                <Link
                  href="/library"
                  className="mt-6 inline-flex items-center gap-2 text-sage-500 font-medium text-body-sm hover:text-sage-600 transition-colors"
                >
                  Biblioteka
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Praktyki */}
              <div className="card-editorial flex flex-col justify-between min-h-[240px]">
                <div>
                  <span className="label-editorial mb-4 block">Praktyki</span>
                  <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                    Oddech, ruch, medytacja
                  </h3>
                  <p className="text-body-sm text-earth-500">
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

              {/* Ścieżki */}
              <div className="card-editorial flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="label-editorial mb-4 block">Ścieżki</span>
                  <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                    Programy krok po kroku
                  </h3>
                  <p className="text-body-sm text-earth-500">
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

              {/* Narzędzia */}
              <div className="card-editorial flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="label-editorial mb-4 block">Narzędzia</span>
                  <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                    Sprawdź swój stan
                  </h3>
                  <p className="text-body-sm text-earth-500">
                    Quiz, check-in, dziennik reakcji i menu uziemienia.
                  </p>
                </div>
                <Link
                  href="/quiz"
                  className="mt-6 inline-flex items-center gap-2 text-sage-500 font-medium text-body-sm hover:text-sage-600 transition-colors"
                >
                  Zrób quiz
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Video */}
              <div className="card-editorial flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="label-editorial mb-4 block">Video</span>
                  <h3 className="font-serif text-heading-base text-earth-900 mb-3">
                    Shorts i praktyki wideo
                  </h3>
                  <p className="text-body-sm text-earth-500">
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
      {/*  03 — COMMUNITY PROMISE                                          */}
      {/* ================================================================ */}
      <div className="section-divider" />
      <section className="section-spacing">
        <div className="content-container-xs text-center">
          <ScrollReveal>
            <span className="label-editorial mb-4 block">Społeczność</span>
            <h2 className="font-serif text-display-sm text-earth-950 mb-6">
              Co tu znajdziesz
            </h2>
            <p className="text-body-base text-earth-500 leading-relaxed mb-14 max-w-lg mx-auto">
              To miejsce dla osób, które chcą lepiej rozumieć siebie i swoje reakcje.
              Bez cudownych obietnic, bez presji. W swoim tempie.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="card-editorial">
                <div className="w-10 h-10 rounded-full border border-cobalt-400/40 bg-cobalt-50/50 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-cobalt-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="font-serif text-heading-sm text-earth-900 mb-2">Wiedza</h3>
                <p className="text-body-sm text-earth-500 leading-relaxed">
                  Rzetelna edukacja o układzie nerwowym, regulacji i jodze kundalini.
                </p>
              </div>

              <div className="card-editorial">
                <div className="w-10 h-10 rounded-full border border-sage-400/40 bg-sage-50/50 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="font-serif text-heading-sm text-earth-900 mb-2">Praktyka</h3>
                <p className="text-body-sm text-earth-500 leading-relaxed">
                  Codzienne ćwiczenia oddechowe, ruchowe i medytacje. Od 2 minut.
                </p>
              </div>

              <div className="card-editorial">
                <div className="w-10 h-10 rounded-full border border-cobalt-400/40 bg-cobalt-50/50 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-cobalt-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-heading-sm text-earth-900 mb-2">Wspólnota</h3>
                <p className="text-body-sm text-earth-500 leading-relaxed">
                  Webinary, wyzwania i ścieżki w kameralnej, bezpiecznej atmosferze.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <p className="text-body-xs text-earth-400 mt-12">
            Ta strona nie stanowi porady medycznej ani terapeutycznej.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  04 — CTA QUIZ                                                   */}
      {/* ================================================================ */}
      <div className="section-divider" />
      <section className="section-spacing">
        <div className="content-container-xs text-center">
          <ScrollReveal>
            <span className="label-editorial mb-4 block">Dla nowych</span>
            <h2 className="font-serif text-display-sm text-earth-950 mb-4">
              Nie wiesz od czego zacząć?
            </h2>
            <p className="text-body-base text-earth-500 mb-10 max-w-lg mx-auto leading-relaxed">
              Sprawdź swój stan w krótkim quizie i otrzymaj spersonalizowane
              sugestie praktyk i materiałów.
            </p>
            <Link href="/quiz" className="btn-editorial">
              Zrób quiz
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  05 — LATEST SHORTS                                              */}
      {/* ================================================================ */}
      {latestVideos.length > 0 && (
        <>
          <div className="section-divider" />
          <section className="section-spacing-sm">
            <div className="content-container">
              <ScrollReveal>
                <div className="flex items-end justify-between mb-12">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestVideos.map((video) => (
                    <Link
                      key={video.slug}
                      href={`/video/${video.slug}`}
                      className="card-editorial block group"
                    >
                      <div className="img-placeholder aspect-video rounded-xl mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-earth-300" fill="currentColor" viewBox="0 0 24 24">
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
        </>
      )}

      {/* ================================================================ */}
      {/*  06 — FROM THE LIBRARY                                           */}
      {/* ================================================================ */}
      <div className="section-divider" />
      <section className="section-spacing">
        <div className="content-container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
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
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="card-editorial text-center py-12">
                <p className="text-body-base text-earth-500">Artykuły wkrótce.</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/*  07 — NEWSLETTER                                                 */}
      {/* ================================================================ */}
      <div className="section-divider" />
      <section className="section-spacing">
        <div className="content-container-xs text-center">
          <ScrollReveal>
            <span className="label-editorial mb-4 block">Newsletter</span>
            <h2 className="font-serif text-heading-xl text-earth-950 mb-4">
              Bądź na bieżąco
            </h2>
            <p className="text-body-base text-earth-500 mb-10 max-w-md mx-auto leading-relaxed">
              Krótkie inspiracje o regulacji nerwowej i jodze.
              Bez spamu, raz w tygodniu.
            </p>

            <NewsletterForm variant="light" />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
