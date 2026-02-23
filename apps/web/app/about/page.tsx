import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'O mnie',
  description:
    'Poznaj Age – nauczycielke jogi kundalini i edukatorke w temacie regulacji ukladu nerwowego.',
};

export default function AboutPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        {/* Bio */}
        <section className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-6">
            O mnie
          </h1>

          <div className="space-y-5 text-sm text-earth-700 leading-relaxed">
            <p>
              [Uzupelnij: krotki bio Agi – kim jest, skad pochodzi, co ja napedza.]
            </p>
            <p>
              [Uzupelnij: droga do jogi kundalini i edukacji o ukladzie nerwowym.]
            </p>
            <p>
              [Uzupelnij: certyfikaty, wyksztalcenie, doswiadczenie.]
            </p>
          </div>
        </section>

        {/* Wartosci */}
        <section className="mb-16">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Wartosci</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Bezpieczenstwo',
                text: 'Kazda praktyka powinna byc bezpieczna. Nie forsuje – zapraszam.',
              },
              {
                title: 'Prostota',
                text: 'Tlumacze trudne tematy prostym jezykiem. Bez zbednego mistycyzmu.',
              },
              {
                title: 'Doswiadczanie',
                text: 'Wiedza jest wazna, ale prawdziwa zmiana przychodzi przez praktke.',
              },
              {
                title: 'Indywidualnosc',
                text: 'Kazdy uklad nerwowy jest inny. To, co dziala u mnie, nie musi dzialac u Ciebie.',
              },
            ].map((value) => (
              <div key={value.title} className="card-calm">
                <h3 className="font-medium text-sm text-earth-800 mb-1">{value.title}</h3>
                <p className="text-xs text-earth-600 leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Styl nauczania */}
        <section className="mb-16">
          <h2 className="font-serif text-xl text-earth-800 mb-4">Styl nauczania</h2>
          <div className="text-sm text-earth-700 leading-relaxed space-y-3">
            <p>
              [Uzupelnij: jak prowadze zajecia, co jest dla mnie wazne w kontakcie z uczestnikami.]
            </p>
            <p>
              [Uzupelnij: jakie podejscie stosujesz – somatyczne, trauma-informed, itp.]
            </p>
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt">
          <h2 className="font-serif text-xl text-earth-800 mb-6">Kontakt</h2>
          <p className="text-sm text-earth-600 leading-relaxed mb-6">
            Masz pytanie, chcesz sie podzielic doswiadczeniem lub nawiazac wspolprace?
            Napisz do mnie.
          </p>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
