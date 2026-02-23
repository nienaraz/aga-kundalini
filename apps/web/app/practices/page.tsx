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
  },
  {
    slug: 'ruch',
    label: 'Ruch',
    description: 'Cwiczenia ruchowe i krije z jogi kundalini.',
  },
  {
    slug: 'medytacja',
    label: 'Medytacja',
    description: 'Medytacje wspierajace spokoj i obecnosc.',
  },
  {
    slug: 'resety',
    label: 'Resety (2-5 min)',
    description: 'Szybkie praktyki do natychmiastowej regulacji.',
  },
];

export default function PracticesPage() {
  const practices = getAllPractices();
  const featured = practices.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="section-spacing">
      <div className="content-container">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Praktyki
        </h1>
        <p className="text-calm-body text-earth-600 mb-12 max-w-2xl leading-relaxed">
          Cwiczenia oddechowe, ruchowe, medytacje i szybkie resety. Kazda praktyka
          ma okreslony czas trwania i poziom intensywnosci.
        </p>

        {/* Category grid */}
        <section className="mb-16">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Kategorie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {practiceCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/practices/${cat.slug}`}
                className="card-calm block group"
              >
                <h3 className="font-serif text-base text-earth-800 group-hover:text-sage-700 transition-colors mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs text-earth-500 leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured practices */}
        {featured.length > 0 && (
          <section>
            <h2 className="font-serif text-xl text-earth-800 mb-6">Wyroznione</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
