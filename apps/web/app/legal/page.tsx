import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Prawne',
  description: 'Informacje prawne: polityka prywatnosci, pliki cookies, zastrzezenia medyczne.',
};

const legalPages = [
  {
    title: 'Polityka prywatnosci',
    href: '/legal/privacy',
    description: 'Jak przetwarzamy Twoje dane osobowe zgodnie z RODO.',
  },
  {
    title: 'Pliki cookies',
    href: '/legal/cookies',
    description: 'Jakie pliki cookies uzywamy i w jakim celu.',
  },
  {
    title: 'Zastrzezenia medyczne',
    href: '/legal/disclaimer',
    description: 'Informacja o charakterze edukacyjnym tresci na stronie.',
  },
];

export default function LegalPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Informacje prawne
        </h1>
        <p className="text-calm-body text-earth-600 mb-10 leading-relaxed">
          Ponizej znajdziesz dokumenty prawne dotyczace korzystania z tej strony.
        </p>

        <div className="space-y-4">
          {legalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="card-calm block group"
            >
              <h2 className="font-serif text-lg text-earth-800 group-hover:text-sage-700 transition-colors mb-1">
                {page.title}
              </h2>
              <p className="text-sm text-earth-600 leading-relaxed">
                {page.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
