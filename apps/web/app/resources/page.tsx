import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zasoby',
  description: 'Slownik pojec i polecane materialy dotyczace regulacji ukladu nerwowego i jogi kundalini.',
};

export default function ResourcesPage() {
  return (
    <div className="section-spacing">
      <div className="content-container">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Zasoby
        </h1>
        <p className="text-calm-body text-earth-600 mb-12 max-w-2xl leading-relaxed">
          Dodatkowe materialy, ktore pomoga Ci poglebic wiedze.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
          <Link href="/resources/evidence" className="card-calm block group">
            <h2 className="font-serif text-lg text-earth-800 group-hover:text-sage-700 transition-colors mb-2">
              Biblioteka dowodow
            </h2>
            <p className="text-sm text-earth-600 leading-relaxed">
              Przeglad badan naukowych stojacych za praktykami — razem z ich ograniczeniami.
            </p>
          </Link>

          <Link href="/resources/glossary" className="card-calm block group">
            <h2 className="font-serif text-lg text-earth-800 group-hover:text-sage-700 transition-colors mb-2">
              Slownik
            </h2>
            <p className="text-sm text-earth-600 leading-relaxed">
              Wyjasnienia kluczowych pojec: uklad nerwowy, regulacja, okno tolerancji i wiele innych.
            </p>
          </Link>

          <Link href="/resources/recommendations" className="card-calm block group">
            <h2 className="font-serif text-lg text-earth-800 group-hover:text-sage-700 transition-colors mb-2">
              Polecane
            </h2>
            <p className="text-sm text-earth-600 leading-relaxed">
              Ksiazki, podcasty i inne materialy, ktore warto poznac.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
