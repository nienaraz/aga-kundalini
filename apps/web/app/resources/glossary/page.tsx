import type { Metadata } from 'next';
import { getAllGlossaryTerms } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Slownik',
  description: 'Slownik pojec zwiazanych z ukladem nerwowym, regulacja i yoga kundalini.',
};

export default function GlossaryPage() {
  const terms = getAllGlossaryTerms();

  // Group by first letter
  const grouped: Record<string, typeof terms> = {};
  for (const term of terms) {
    const letter = term.term.charAt(0).toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  }

  const letters = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b, 'pl')
  );

  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Slownik
        </h1>
        <p className="text-calm-body text-earth-600 mb-10 leading-relaxed">
          Wyjasnienia kluczowych pojec uzywanych na tej stronie.
        </p>

        {/* Letter navigation */}
        {letters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 rounded-lg bg-warm-100 text-earth-600 flex items-center justify-center text-sm font-medium hover:bg-sage-100 hover:text-sage-700 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        )}

        {/* Terms */}
        {letters.length > 0 ? (
          <div className="space-y-10">
            {letters.map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="font-serif text-2xl text-earth-800 mb-4 scroll-mt-20">
                  {letter}
                </h2>
                <div className="space-y-4">
                  {grouped[letter].map((term) => (
                    <div
                      key={term.slug}
                      id={term.slug}
                      className="card-calm scroll-mt-20"
                    >
                      <h3 className="font-serif text-base text-earth-800 mb-1">
                        {term.term}
                      </h3>
                      <p className="text-sm text-earth-600 leading-relaxed">
                        {term.shortDefinition}
                      </p>
                      {term.longDefinition && (
                        <p className="text-sm text-earth-500 leading-relaxed mt-2">
                          {term.longDefinition}
                        </p>
                      )}
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {term.relatedTerms.map((related) => (
                            <a
                              key={related}
                              href={`#${related}`}
                              className="text-xs text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full hover:bg-sage-100 transition-colors"
                            >
                              {related}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-sm text-earth-500">
            Slownik jest w przygotowaniu. Wkrotce sie tu pojawia.
          </p>
        )}
      </div>
    </div>
  );
}
