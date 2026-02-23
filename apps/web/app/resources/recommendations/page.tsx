import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polecane',
  description: 'Polecane ksiazki, podcasty i materialy o regulacji ukladu nerwowego i jodze kundalini.',
};

const recommendations = {
  books: [
    {
      title: '[Uzupelnij: tytul ksiazki]',
      author: '[Uzupelnij: autor]',
      description: '[Uzupelnij: krotki opis dlaczego polecam]',
    },
    {
      title: '[Uzupelnij: tytul ksiazki]',
      author: '[Uzupelnij: autor]',
      description: '[Uzupelnij: krotki opis dlaczego polecam]',
    },
  ],
  podcasts: [
    {
      title: '[Uzupelnij: nazwa podcastu]',
      host: '[Uzupelnij: prowadzacy]',
      description: '[Uzupelnij: krotki opis dlaczego polecam]',
    },
  ],
  other: [
    {
      title: '[Uzupelnij: nazwa zasobu]',
      description: '[Uzupelnij: krotki opis]',
      url: '#',
    },
  ],
};

export default function RecommendationsPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-4">
          Polecane
        </h1>
        <p className="text-calm-body text-earth-600 mb-12 leading-relaxed">
          Materialy, ktore polecam – ksiazki, podcasty i inne zrodla wiedzy o regulacji
          ukladu nerwowego i jodze.
        </p>

        {/* Books */}
        <section className="mb-12">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Ksiazki</h2>
          <div className="space-y-4">
            {recommendations.books.map((book, i) => (
              <div key={i} className="card-calm">
                <h3 className="font-medium text-sm text-earth-800">{book.title}</h3>
                <p className="text-xs text-earth-500 mb-1">{book.author}</p>
                <p className="text-sm text-earth-600 leading-relaxed">{book.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Podcasts */}
        <section className="mb-12">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Podcasty</h2>
          <div className="space-y-4">
            {recommendations.podcasts.map((podcast, i) => (
              <div key={i} className="card-calm">
                <h3 className="font-medium text-sm text-earth-800">{podcast.title}</h3>
                <p className="text-xs text-earth-500 mb-1">{podcast.host}</p>
                <p className="text-sm text-earth-600 leading-relaxed">{podcast.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other */}
        <section>
          <h2 className="font-serif text-xl text-earth-800 mb-6">Inne</h2>
          <div className="space-y-4">
            {recommendations.other.map((item, i) => (
              <div key={i} className="card-calm">
                <h3 className="font-medium text-sm text-earth-800">{item.title}</h3>
                <p className="text-sm text-earth-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
