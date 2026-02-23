import type { Metadata } from 'next';
import { getAllPaths } from '@/lib/content';
import { PathCard } from '@/components/content/PathCard';

export const metadata: Metadata = {
  title: 'Sciezki',
  description:
    'Wielodniowe programy praktyk do regulacji ukladu nerwowego. Wybierz cel i zacznij.',
};

export default function PathsPage() {
  const paths = getAllPaths();

  return (
    <div className="section-spacing">
      <div className="content-container">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Sciezki
        </h1>
        <p className="text-calm-body text-earth-600 mb-12 max-w-2xl leading-relaxed">
          Wielodniowe programy, ktore prowadza Cie krok po kroku. Kazda sciezka
          ma okreslony cel i skladniki dobrane tak, zeby sie wzajemnie uzupelnialy.
        </p>

        {paths.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path) => (
              <PathCard
                key={path.slug}
                title={path.title}
                slug={path.slug}
                description={path.description}
                totalDays={path.totalDays}
                goal={path.goal}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-earth-500">
            Sciezki sa w przygotowaniu. Wkrotce sie tu pojawia.
          </p>
        )}
      </div>
    </div>
  );
}
