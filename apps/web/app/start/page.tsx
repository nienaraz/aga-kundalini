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
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-6">
          Zacznij tutaj
        </h1>
        <p className="text-calm-body text-earth-700 mb-10 leading-relaxed">
          Ta strona to Twoj punkt wyjscia. Znajdziesz tu informacje o tym, jak korzystac
          z materiallow, na co zwrocic uwage i od czego zaczac.
        </p>

        {/* Jak korzystac */}
        <section className="mb-12">
          <h2 className="font-serif text-xl text-earth-800 mb-4">
            Jak korzystac z tej strony
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-earth-700 leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">1</span>
              <span><strong>Biblioteka</strong> – artykuly edukacyjne o ukladzie nerwowym, reaktywnosci, oddechu i kundalini.</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-earth-700 leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">2</span>
              <span><strong>Praktyki</strong> – cwiczenia oddechowe, ruchowe, medytacje i szybkie resety.</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-earth-700 leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">3</span>
              <span><strong>Sciezki</strong> – wielodniowe programy, ktore prowadza Cie krok po kroku.</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-earth-700 leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">4</span>
              <span><strong>Narzedzia</strong> – samosprawdzenie, dziennik reakcji i menu uziemienia.</span>
            </li>
          </ul>
        </section>

        {/* Bezpieczenstwo */}
        <section className="rounded-xl bg-rose-50 border border-rose-200 p-6 mb-12">
          <h2 className="font-serif text-xl text-rose-800 mb-3">Bezpieczenstwo</h2>
          <p className="text-sm text-rose-800 leading-relaxed mb-3">
            Tresci na tej stronie maja charakter edukacyjny i nie stanowia porady medycznej.
            Jesli doswiadczasz trudnosci zdrowotnych – fizycznych lub psychicznych –
            skonsultuj sie z lekarzem lub terapeutka.
          </p>
          <p className="text-sm text-rose-700 leading-relaxed">
            Praktyki wykonuj w swoim tempie. Jesli cos Cie niepokoi, przerwij i wrocdo
            prostego oddechu.
          </p>
        </section>

        {/* Proponowany start */}
        <section className="mb-12">
          <h2 className="font-serif text-xl text-earth-800 mb-4">
            Od czego zaczac?
          </h2>
          <div className="space-y-3">
            <Link
              href="/library/uklad-nerwowy"
              className="card-calm block text-sm text-earth-700 hover:text-sage-700"
            >
              Przeczytaj o ukladzie nerwowym – to fundament wszystkiego, co tu znajdziesz.
            </Link>
            <Link
              href="/practices/resety"
              className="card-calm block text-sm text-earth-700 hover:text-sage-700"
            >
              Wyprobuj krotki reset (2-5 min) – szybki sposob na regulacje.
            </Link>
            <Link
              href="/tools/check-in"
              className="card-calm block text-sm text-earth-700 hover:text-sage-700"
            >
              Zrob samosprawdzenie – zobacz, jak sie teraz czujesz.
            </Link>
            <Link
              href="/paths"
              className="card-calm block text-sm text-earth-700 hover:text-sage-700"
            >
              Wybierz sciezke – wielodniowy program dopasowany do celu.
            </Link>
          </div>
        </section>

        {/* Kluczowe linki */}
        <section>
          <h2 className="font-serif text-xl text-earth-800 mb-4">Przydatne linki</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/library" className="text-sm text-sage-600 underline underline-offset-2 hover:text-sage-700">Biblioteka</Link>
            <Link href="/practices" className="text-sm text-sage-600 underline underline-offset-2 hover:text-sage-700">Praktyki</Link>
            <Link href="/paths" className="text-sm text-sage-600 underline underline-offset-2 hover:text-sage-700">Sciezki</Link>
            <Link href="/tools" className="text-sm text-sage-600 underline underline-offset-2 hover:text-sage-700">Narzedzia</Link>
            <Link href="/resources/glossary" className="text-sm text-sage-600 underline underline-offset-2 hover:text-sage-700">Slownik</Link>
            <Link href="/about" className="text-sm text-sage-600 underline underline-offset-2 hover:text-sage-700">O mnie</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
