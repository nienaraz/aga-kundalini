import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zacznij tutaj',
  description:
    'Dowiedz sie, jak korzystac z serwisu. Bezpieczenstwo, zalecenia i proponowana sciezka na start.',
};

export default function StartPage() {
  return (
    <div className="section-spacing">
      <div className="content-container-xs">
        {/* Hero */}
        <div className="mb-16">
          <span className="label-editorial-pill mb-5 inline-block">Punkt wyjscia</span>
          <h1 className="font-serif text-display-sm text-earth-950 mb-6">
            Zacznij tutaj
          </h1>
          <p className="text-body-base text-earth-600 leading-relaxed max-w-xl">
            Ta strona to Twoj punkt wyjscia. Znajdziesz tu informacje o tym, jak korzystac
            z materiallow, na co zwrocic uwage i od czego zaczac.
          </p>
        </div>

        {/* Jak korzystac */}
        <section className="mb-16">
          <span className="label-editorial mb-4 block">Przewodnik</span>
          <h2 className="font-serif text-heading-xl text-earth-950 mb-8">
            Jak korzystac z tej strony
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-cobalt-100 text-cobalt-700 flex items-center justify-center text-body-sm font-semibold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="text-body-base text-earth-950 font-medium">Biblioteka</p>
                <p className="text-body-sm text-earth-600 mt-0.5">
                  Artykuly edukacyjne o ukladzie nerwowym, reaktywnosci, oddechu i kundalini.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-cobalt-100 text-cobalt-700 flex items-center justify-center text-body-sm font-semibold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="text-body-base text-earth-950 font-medium">Praktyki</p>
                <p className="text-body-sm text-earth-600 mt-0.5">
                  Cwiczenia oddechowe, ruchowe, medytacje i szybkie resety.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-cobalt-100 text-cobalt-700 flex items-center justify-center text-body-sm font-semibold shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="text-body-base text-earth-950 font-medium">Sciezki</p>
                <p className="text-body-sm text-earth-600 mt-0.5">
                  Wielodniowe programy, ktore prowadza Cie krok po kroku.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-cobalt-100 text-cobalt-700 flex items-center justify-center text-body-sm font-semibold shrink-0 mt-0.5">
                4
              </span>
              <div>
                <p className="text-body-base text-earth-950 font-medium">Narzedzia</p>
                <p className="text-body-sm text-earth-600 mt-0.5">
                  Samosprawdzenie, dziennik reakcji i menu uziemienia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bezpieczenstwo */}
        <section className="mb-16">
          <div className="card-warm rounded-3xl">
            <span className="label-editorial text-rose-600 mb-3 block">Wazne</span>
            <h2 className="font-serif text-heading-xl text-earth-950 mb-4">Bezpieczenstwo</h2>
            <div className="space-y-3">
              <p className="text-body-sm text-earth-600 leading-relaxed">
                Tresci na tej stronie maja charakter edukacyjny i nie stanowia porady medycznej.
                Jesli doswiadczasz trudnosci zdrowotnych – fizycznych lub psychicznych –
                skonsultuj sie z lekarzem lub terapeutka.
              </p>
              <p className="text-body-sm text-earth-600 leading-relaxed">
                Praktyki wykonuj w swoim tempie. Jesli cos Cie niepokoi, przerwij i wrocdo
                prostego oddechu.
              </p>
            </div>
          </div>
        </section>

        {/* Proponowany start */}
        <section className="mb-16">
          <span className="label-editorial mb-4 block">Pierwszy krok</span>
          <h2 className="font-serif text-heading-xl text-earth-950 mb-8">
            Od czego zaczac?
          </h2>
          <div className="space-y-4">
            <Link
              href="/library/uklad-nerwowy"
              className="card-calm block group"
            >
              <h3 className="text-body-base text-earth-950 font-medium group-hover:text-sage-700 transition-colors mb-1">
                Przeczytaj o ukladzie nerwowym
              </h3>
              <p className="text-body-sm text-earth-600">
                To fundament wszystkiego, co tu znajdziesz.
              </p>
            </Link>
            <Link
              href="/practices/resety"
              className="card-calm block group"
            >
              <h3 className="text-body-base text-earth-950 font-medium group-hover:text-sage-700 transition-colors mb-1">
                Wyprobuj krotki reset (2-5 min)
              </h3>
              <p className="text-body-sm text-earth-600">
                Szybki sposob na regulacje.
              </p>
            </Link>
            <Link
              href="/tools/check-in"
              className="card-calm block group"
            >
              <h3 className="text-body-base text-earth-950 font-medium group-hover:text-sage-700 transition-colors mb-1">
                Zrob samosprawdzenie
              </h3>
              <p className="text-body-sm text-earth-600">
                Zobacz, jak sie teraz czujesz.
              </p>
            </Link>
            <Link
              href="/paths"
              className="card-calm block group"
            >
              <h3 className="text-body-base text-earth-950 font-medium group-hover:text-sage-700 transition-colors mb-1">
                Wybierz sciezke
              </h3>
              <p className="text-body-sm text-earth-600">
                Wielodniowy program dopasowany do celu.
              </p>
            </Link>
          </div>
        </section>

        {/* Kluczowe linki */}
        <section>
          <span className="label-editorial mb-4 block">Nawigacja</span>
          <h2 className="font-serif text-heading-xl text-earth-950 mb-6">Przydatne linki</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/library"
              className="inline-flex items-center text-body-sm text-sage-700 hover:text-sage-800 bg-sage-100/70 px-4 py-2 rounded-2xl shadow-soft transition-colors"
            >
              Biblioteka
            </Link>
            <Link
              href="/practices"
              className="inline-flex items-center text-body-sm text-sage-700 hover:text-sage-800 bg-sage-100/70 px-4 py-2 rounded-2xl shadow-soft transition-colors"
            >
              Praktyki
            </Link>
            <Link
              href="/paths"
              className="inline-flex items-center text-body-sm text-sage-700 hover:text-sage-800 bg-sage-100/70 px-4 py-2 rounded-2xl shadow-soft transition-colors"
            >
              Sciezki
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center text-body-sm text-sage-700 hover:text-sage-800 bg-sage-100/70 px-4 py-2 rounded-2xl shadow-soft transition-colors"
            >
              Narzedzia
            </Link>
            <Link
              href="/resources/glossary"
              className="inline-flex items-center text-body-sm text-sage-700 hover:text-sage-800 bg-sage-100/70 px-4 py-2 rounded-2xl shadow-soft transition-colors"
            >
              Slownik
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center text-body-sm text-sage-700 hover:text-sage-800 bg-sage-100/70 px-4 py-2 rounded-2xl shadow-soft transition-colors"
            >
              O mnie
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
