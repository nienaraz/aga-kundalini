import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPractices } from '@/lib/content';
import { PracticeCard } from '@/components/content/PracticeCard';

export const metadata: Metadata = {
  title: 'Praktyki',
  description:
    'Cwiczenia oddechowe, ruchowe, medytacje i szybkie resety do regulacji ukladu nerwowego.',
};

const practiceCategories = [
  {
    slug: 'oddech',
    label: 'Oddech',
    description: 'Techniki oddechowe regulujace uklad nerwowy.',
    cardClass: 'card-sage',
  },
  {
    slug: 'ruch',
    label: 'Ruch',
    description: 'Cwiczenia ruchowe i krije z jogi kundalini.',
    cardClass: 'card-warm',
  },
  {
    slug: 'medytacja',
    label: 'Medytacja',
    description: 'Medytacje wspierajace spokoj i obecnosc.',
    cardClass: 'card-calm',
  },
  {
    slug: 'resety',
    label: 'Resety (2-5 min)',
    description: 'Szybkie praktyki do natychmiastowej regulacji.',
    cardClass: 'card-warm',
  },
];

export default function PracticesPage() {
  const practices = getAllPractices();
  const featured = practices.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="section-spacing">
      <div className="content-container">
        {/* Header */}
        <header className="mb-14">
          <span className="label-editorial mb-4 block">Praktyka</span>
          <h1 className="font-serif text-display-sm text-earth-950 mb-5">
            Praktyki
          </h1>
          <p className="text-body-base text-earth-600 max-w-2xl leading-relaxed">
            Cwiczenia oddechowe, ruchowe, medytacje i szybkie resety. Kazda praktyka
            ma okreslony czas trwania i poziom intensywnosci.
          </p>
        </header>

        {/* Category grid */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="label-editorial mb-3 block">Wybierz typ</span>
              <h2 className="font-serif text-heading-xl text-earth-950">Kategorie</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {practiceCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/practices/${cat.slug}`}
                className={`${cat.cardClass} block group flex flex-col justify-between min-h-[180px]`}
              >
                <div>
                  <span className="label-editorial-pill mb-4 inline-flex">{cat.label}</span>
                  <h3 className="font-serif text-heading-base text-earth-900 group-hover:text-sage-700 transition-colors mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-body-sm text-earth-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm group-hover:text-sage-800 transition-colors">
                  Przejdz
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured practices */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="label-editorial mb-3 block">Polecane</span>
                <h2 className="font-serif text-heading-xl text-earth-950">Wyroznione</h2>
              </div>
              <Link
                href="/practices/oddech"
                className="text-body-sm text-sage-600 font-medium hover:text-sage-700 transition-colors hidden sm:block"
              >
                Wszystkie praktyki
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((practice) => (
                <PracticeCard
                  key={practice.slug}
                  title={practice.title}
                  slug={practice.slug}
                  description={practice.description}
                  practiceCategory={practice.practiceCategory}
                  durationMin={practice.durationMin}
                  intensity={practice.intensity}
                  tags={practice.tags}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
