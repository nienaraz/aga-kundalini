import type { Metadata } from 'next';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  /tools – Narz\u0119dzia interaktywne                                    */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Narz\u0119dzia',
  description:
    'Interaktywne narz\u0119dzia do samoobserwacji i regulacji uk\u0142adu nerwowego. Nie s\u0105 diagnoz\u0105 \u2013 s\u0105 chwil\u0105 uwagi dla siebie.',
  openGraph: {
    title: 'Narz\u0119dzia | Aga \u00b7 Joga Kundalini',
    description:
      'Interaktywne narz\u0119dzia do samoobserwacji i regulacji uk\u0142adu nerwowego.',
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
}

const TOOLS: ToolCard[] = [
  {
    href: '/tools/check-in',
    title: 'Gdzie jestem?',
    description: 'Kr\u00f3tkie sprawdzenie stanu uk\u0142adu nerwowego',
    icon: '\u25ce',
  },
  {
    href: '/tools/grounding-menu',
    title: 'Menu uziemienia',
    description: 'Gdy czujesz X, spr\u00f3buj Y',
    icon: '\u25cb',
  },
  {
    href: '/tools/trigger-journal',
    title: 'Dziennik reakcji',
    description: 'Zapisuj i obserwuj swoje wzorce',
    icon: '\u25a1',
  },
  {
    href: '/quiz',
    title: 'Quiz samoobserwacji',
    description: 'Sprawd\u017a tendencje swojego uk\u0142adu nerwowego',
    icon: '\u25c7',
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
        <header className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-earth-800 mb-3">
            Narz\u0119dzia
          </h1>
          <p className="text-earth-500 text-lg leading-relaxed max-w-2xl">
            Proste narz\u0119dzia do samoobserwacji i codziennej regulacji. Nie
            wymagaj\u0105 logowania. Dzia\u0142aj\u0105 ca\u0142kowicie lokalnie w Twojej
            przegl\u0105darce.
          </p>
        </header>

        {/* Tool cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card-calm group flex flex-col"
            >
              <span className="text-3xl text-sage-400 mb-4 block" aria-hidden="true">
                {tool.icon}
              </span>
              <h2 className="font-serif text-xl text-earth-800 mb-2 group-hover:text-sage-700 transition-colors">
                {tool.title}
              </h2>
              <p className="text-earth-500 text-sm leading-relaxed flex-1">
                {tool.description}
              </p>
              <span className="mt-4 text-sage-600 text-sm group-hover:text-sage-700 transition-colors">
                Otw\u00f3rz &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-warm-200 bg-warm-50 p-5">
          <p className="text-earth-500 text-sm leading-relaxed">
            <strong className="text-earth-600">Uwaga:</strong> Narz\u0119dzia
            dost\u0119pne na tej stronie nie s\u0105 narz\u0119dziami diagnostycznymi i nie
            zast\u0119puj\u0105 konsultacji z lekarzem, psychologiem ani terapeut\u0105. S\u0142u\u017c\u0105
            wy\u0142\u0105cznie celom edukacyjnym i wspieraj\u0105 samoobserwacj\u0119. Je\u015bli
            czujesz, \u017ce potrzebujesz profesjonalnej pomocy &mdash; si\u0119gnij po ni\u0105.
          </p>
        </div>
      </div>
    </div>
  );
}
