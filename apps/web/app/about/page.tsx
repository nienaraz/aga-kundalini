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
      <div className="content-container-xs">
        {/* Bio */}
        <section className="mb-20">
          <span className="label-editorial-pill mb-5 inline-block">Poznaj mnie</span>
          <h1 className="font-serif text-display-sm text-earth-950 mb-8">
            O mnie
          </h1>

          {/* Photo placeholder */}
          <div className="img-placeholder rounded-3xl aspect-[4/3] mb-10">
            <span className="text-body-sm text-earth-400">Zdjecie</span>
          </div>

          <div className="space-y-5 text-body-base text-earth-600 leading-relaxed">
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
        <section className="mb-20">
          <span className="label-editorial mb-4 block">Fundament</span>
          <h2 className="font-serif text-heading-xl text-earth-950 mb-8">Wartosci</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            ].map((value, index) => (
              <div
                key={value.title}
                className={index % 2 === 0 ? 'card-sage rounded-3xl' : 'card-warm rounded-3xl'}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-7 h-7 rounded-full bg-cobalt-100 text-cobalt-700 flex items-center justify-center text-body-sm font-semibold shrink-0">
                    {index + 1}
                  </span>
                  <h3 className="font-serif text-heading-sm text-earth-950">{value.title}</h3>
                </div>
                <p className="text-body-sm text-earth-600 leading-relaxed pl-10">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Styl nauczania */}
        <section className="mb-20">
          <span className="label-editorial mb-4 block">Podejscie</span>
          <h2 className="font-serif text-heading-xl text-earth-950 mb-6">Styl nauczania</h2>
          <div className="text-body-base text-earth-600 leading-relaxed space-y-4">
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
          <span className="label-editorial mb-4 block">Napisz do mnie</span>
          <h2 className="font-serif text-heading-xl text-earth-950 mb-4">Kontakt</h2>
          <p className="text-body-base text-earth-600 leading-relaxed mb-8">
            Masz pytanie, chcesz sie podzielic doswiadczeniem lub nawiazac wspolprace?
            Napisz do mnie.
          </p>
          <div className="card-calm rounded-3xl">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
