import type { Metadata } from 'next';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  /tools – Narzędzia interaktywne                                    */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Narzędzia',
  description:
    'Interaktywne narzędzia do samoobserwacji i regulacji układu nerwowego. Nie są diagnozą – są chwilą uwagi dla siebie.',
  openGraph: {
    title: 'Narzędzia | Aga · Joga Kundalini',
    description:
      'Interaktywne narzędzia do samoobserwacji i regulacji układu nerwowego.',
  },
};

/* ------------------------------------------------------------------ */
/*  Tool cards data                                                    */
/* ------------------------------------------------------------------ */

interface ToolCard {
  href: string;
  title: string;
  description: string;
  icon: string;
  cardClass: string;
}

const TOOLS: ToolCard[] = [
  {
    href: '/tools/check-in',
    title: 'Gdzie jestem?',
    description: 'Krótkie sprawdzenie stanu układu nerwowego',
    icon: '◎',
    cardClass: 'card-sage',
  },
  {
    href: '/tools/grounding-menu',
    title: 'Menu uziemienia',
    description: 'Gdy czujesz X, spróbuj Y',
    icon: '○',
    cardClass: 'card-warm',
  },
  {
    href: '/tools/trigger-journal',
    title: 'Dziennik reakcji',
    description: 'Zapisuj i obserwuj swoje wzorce',
    icon: '□',
    cardClass: 'card-gold',
  },
  {
    href: '/quiz',
    title: 'Quiz samoobserwacji',
    description: 'Sprawdź tendencje swojego układu nerwowego',
    icon: '◇',
    cardClass: 'card-calm',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ToolsPage() {
  return (
    <div className="section-spacing">
      <div className="content-container">
        {/* Header */}
        <header className="mb-14">
          <span className="label-editorial-pill mb-6 inline-flex">Narzędzia</span>
          <h1 className="font-serif text-display-sm text-earth-950 mb-4">
            Narzędzia
          </h1>
          <p className="text-body-lg text-earth-600 leading-relaxed max-w-2xl">
            Proste narzędzia do samoobserwacji i codziennej regulacji. Nie
            wymagają logowania. Działają całkowicie lokalnie w Twojej
            przeglądarce.
          </p>
        </header>

        {/* Tool cards grid — bento style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`${tool.cardClass} group flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <span className="text-3xl text-sage-400 mb-4 block" aria-hidden="true">
                  {tool.icon}
                </span>
                <h2 className="font-serif text-heading-base text-earth-900 mb-2 group-hover:text-sage-700 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-body-sm text-earth-600 leading-relaxed flex-1">
                  {tool.description}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm group-hover:text-sage-800 transition-colors">
                Otwórz
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-3xl border border-warm-200/60 bg-warm-100/40 p-6 md:p-7">
          <p className="text-body-sm text-earth-600 leading-relaxed">
            <strong className="text-earth-700">Uwaga:</strong> Narzędzia
            dostępne na tej stronie nie są narzędziami diagnostycznymi i nie
            zastępują konsultacji z lekarzem, psychologiem ani terapeutą. Służą
            wyłącznie celom edukacyjnym i wspierają samoobserwację. Jeśli
            czujesz, że potrzebujesz profesjonalnej pomocy &mdash; sięgnij po nią.
          </p>
        </div>
      </div>
    </div>
  );
}
