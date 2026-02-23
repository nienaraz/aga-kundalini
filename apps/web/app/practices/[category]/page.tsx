import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPracticesByCategory, getAllTags } from '@/lib/content';
import { PracticeCard } from '@/components/content/PracticeCard';

const categoryMeta: Record<string, { label: string; description: string }> = {
  oddech: {
    label: 'Oddech',
    description: 'Techniki oddechowe regulujace uklad nerwowy. Od prostych do zaawansowanych.',
  },
  ruch: {
    label: 'Ruch',
    description: 'Cwiczenia ruchowe i krije z jogi kundalini wspierajace regulacje.',
  },
  medytacja: {
    label: 'Medytacja',
    description: 'Medytacje wspierajace spokoj, obecnosc i wewnetrzna stabilnosc.',
  },
  resety: {
    label: 'Resety (2-5 min)',
    description: 'Szybkie praktyki do natychmiastowej regulacji ukladu nerwowego.',
  },
};

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const meta = categoryMeta[params.category];
  if (!meta) return { title: 'Praktyki' };
  return {
    title: meta.label,
    description: meta.description,
  };
}

export default function PracticeCategoryPage({ params }: { params: { category: string } }) {
  const meta = categoryMeta[params.category];
  if (!meta) notFound();

  const practices = getPracticesByCategory(params.category);

  return (
    <div className="section-spacing">
      <div className="content-container">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-3">
          {meta.label}
        </h1>
        <p className="text-calm-body text-earth-600 mb-10 max-w-2xl leading-relaxed">
          {meta.description}
        </p>

        {practices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practices.map((practice) => (
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
        ) : (
          <p className="text-sm text-earth-500">
            Brak praktyk w tej kategorii. Wkrotce sie tu pojawia.
          </p>
        )}
      </div>
    </div>
  );
}
