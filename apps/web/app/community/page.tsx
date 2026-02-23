import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Społeczność',
  description:
    'Społeczność regulacji. Zasady, jak uczestniczyć i jak się wspieramy na drodze od reaktywności do odpowiedzi.',
};

export default function CommunityPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        {/* Header */}
        <header className="mb-14">
          <span className="label-editorial mb-4 block">Społeczność regulacji</span>
          <h1 className="font-serif text-display-sm md:text-display text-earth-950 mb-4">
            Praktyka odpowiedzi.
          </h1>
          <p className="text-body-lg text-earth-600 leading-relaxed">
            To przestrzeń dla osób, które chcą lepiej rozumieć swoje ciało, układ
            nerwowy i reakcje. Uczymy się przechodzić od automatycznej reaktywności
            do świadomej odpowiedzi.
          </p>
        </header>

        {/* What this is */}
        <section className="mb-14">
          <h2 className="font-serif text-heading-lg text-earth-900 mb-6">
            Co tu znajdziesz
          </h2>
          <div className="space-y-4">
            <div className="card-calm">
              <h3 className="font-serif text-heading-sm text-earth-900 mb-2">
                Edukacja o układzie nerwowym
              </h3>
              <p className="text-body-sm text-earth-600 leading-relaxed">
                Artykuły i materiały o tym jak działa Twoje ciało, czym jest okno
                tolerancji i dlaczego reagujemy tak, a nie inaczej.
              </p>
            </div>
            <div className="card-calm">
              <h3 className="font-serif text-heading-sm text-earth-900 mb-2">
                Praktyki do codziennego stosowania
              </h3>
              <p className="text-body-sm text-earth-600 leading-relaxed">
                Oddech, ruch, medytacja i krótkie resety. Od 2 do 15 minut. Bez
                wymagania perfekcji, w swoim tempie.
              </p>
            </div>
            <div className="card-calm">
              <h3 className="font-serif text-heading-sm text-earth-900 mb-2">
                Wspólne rytuały
              </h3>
              <p className="text-body-sm text-earth-600 leading-relaxed">
                Webinary, wielodniowe ścieżki i wyzwania grupowe. Kameralna
                atmosfera, dzielenie refleksji i wzajemne wspieranie się.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="mb-14">
          <h2 className="font-serif text-heading-lg text-earth-900 mb-6">
            Nasze zasady
          </h2>
          <div className="space-y-5">
            <Principle
              number="01"
              title="Bez cudownych obietnic"
              text="Nie obiecujemy uzdrowienia ani szybkich rezultatów. Dzielimy się wiedzą, praktyki robisz we własnym tempie."
            />
            <Principle
              number="02"
              title="Bezpieczeństwo i szacunek"
              text="Ta przestrzeń opiera się na wzajemnym szacunku. Każdy jest w innym miejscu drogi i to jest w porządku."
            />
            <Principle
              number="03"
              title="Edukacja, nie terapia"
              text="Materiały mają charakter edukacyjny. Nie zastępują opieki medycznej, psychologicznej ani terapeutycznej."
            />
            <Principle
              number="04"
              title="Delikatne prowadzenie"
              text="Sugerujemy, nie wymuszamy. Nie ma obowiązkowych harmonogramów ani kar za nieobecność. Praktyka ma służyć Tobie."
            />
            <Principle
              number="05"
              title="Prywatność"
              text="To co dzielisz w tej społeczności, zostaje w niej. Nie cytujemy, nie screenshotujemy, nie oceniamy."
            />
          </div>
        </section>

        {/* How to participate */}
        <section className="mb-14">
          <h2 className="font-serif text-heading-lg text-earth-900 mb-6">
            Jak uczestniczyć
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/newsletter" className="card-sage block group">
              <h3 className="font-serif text-heading-sm text-earth-900 mb-2 group-hover:text-sage-700 transition-colors">
                Newsletter
              </h3>
              <p className="text-body-sm text-earth-600">
                Cotygodniowe inspiracje o regulacji nerwowej. Bez spamu.
              </p>
            </Link>
            <Link href="/quiz" className="card-warm block group">
              <h3 className="font-serif text-heading-sm text-earth-900 mb-2 group-hover:text-sage-700 transition-colors">
                Quiz
              </h3>
              <p className="text-body-sm text-earth-600">
                Sprawdź swój stan i otrzymaj spersonalizowane sugestie.
              </p>
            </Link>
            <Link href="/practices" className="card-calm block group">
              <h3 className="font-serif text-heading-sm text-earth-900 mb-2 group-hover:text-sage-700 transition-colors">
                Praktyki
              </h3>
              <p className="text-body-sm text-earth-600">
                Zacznij od 2-minutowego resetu lub ćwiczenia oddechowego.
              </p>
            </Link>
            <Link href="/paths" className="card-gold block group">
              <h3 className="font-serif text-heading-sm text-earth-900 mb-2 group-hover:text-sage-700 transition-colors">
                Ścieżki
              </h3>
              <p className="text-body-sm text-earth-600">
                Wielodniowe programy z codzienną praktyką i materiałem.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="card-sage text-center py-10">
          <h2 className="font-serif text-heading-lg text-earth-900 mb-3">
            Nie wiesz od czego zacząć?
          </h2>
          <p className="text-body-base text-earth-600 mb-6 max-w-md mx-auto">
            Zacznij od krótkiego quizu lub przeczytaj pierwszy artykuł o układzie
            nerwowym.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quiz"
              className="px-7 py-3.5 rounded-2xl bg-sage-600 text-white text-body-sm font-medium hover:bg-sage-700 transition-colors shadow-soft"
            >
              Zrób quiz
            </Link>
            <Link
              href="/start"
              className="px-7 py-3.5 rounded-2xl bg-warm-100 text-earth-700 text-body-sm font-medium hover:bg-warm-200 transition-colors border border-warm-200/60"
            >
              Zacznij tutaj
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function Principle({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5">
      <span className="shrink-0 w-10 h-10 rounded-full bg-warm-100 text-earth-400 flex items-center justify-center text-body-xs font-medium">
        {number}
      </span>
      <div>
        <h3 className="font-serif text-heading-sm text-earth-900 mb-1">{title}</h3>
        <p className="text-body-sm text-earth-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
