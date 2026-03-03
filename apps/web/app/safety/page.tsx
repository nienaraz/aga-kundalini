import type { Metadata } from 'next';
import Link from 'next/link';
import {
  crisisLines,
  redFlags,
  professionalHelpSigns,
} from '@joga/config/safetyData';

export const metadata: Metadata = {
  title: 'Centrum bezpieczenstwa',
  description:
    'Informacje o bezpiecznym praktykowaniu, sygnaly ostrzegawcze i numery kryzysowe.',
};

export default function SafetyCenterPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        {/* Hero */}
        <header className="mb-14">
          <p className="label-editorial mb-4">Bezpieczenstwo</p>
          <h1 className="font-serif text-3xl md:text-4xl text-earth-900 leading-tight mb-4">
            Twoje bezpieczenstwo jest najwazniejsze
          </h1>
          <p className="text-calm-body text-earth-600 leading-relaxed">
            Praktyki na tej stronie maja charakter wspierajacy i edukacyjny.
            Nie zastepuja terapii, leczenia ani profesjonalnej pomocy
            psychologicznej. Ponizej znajdziesz informacje, ktore pomoga Ci
            praktykowac bezpiecznie.
          </p>
        </header>

        {/* Crisis numbers */}
        <section className="mb-14">
          <div className="section-divider mb-10" />
          <h2 className="font-serif text-xl text-earth-800 mb-6">
            Numery kryzysowe
          </h2>
          <p className="text-sm text-earth-600 mb-6 leading-relaxed">
            Jesli potrzebujesz natychmiastowej pomocy, zadzwon:
          </p>
          <div className="space-y-4">
            {crisisLines.map((line) => (
              <div
                key={line.number}
                className="rounded-xl border border-rose-200/40 bg-rose-50/40 p-5"
              >
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                  <h3 className="font-medium text-sm text-earth-800">
                    {line.name}
                  </h3>
                  <a
                    href={`tel:${line.number.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-base font-semibold text-rose-700 hover:text-rose-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    {line.number}
                  </a>
                </div>
                <p className="text-xs text-earth-600">{line.description}</p>
                <p className="text-xs text-earth-400 mt-1">{line.hours}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Red flags */}
        <section className="mb-14">
          <div className="section-divider mb-10" />
          <h2 className="font-serif text-xl text-earth-800 mb-4">
            Kiedy przerwac praktyke
          </h2>
          <p className="text-sm text-earth-600 mb-6 leading-relaxed">
            Jezeli podczas lub po praktyce doswiadczasz ktorejkolwiek z
            ponizszych sytuacji, przerwij natychmiast:
          </p>
          <ul className="space-y-3">
            {redFlags.map((flag, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-earth-700 leading-relaxed"
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                {flag}
              </li>
            ))}
          </ul>
        </section>

        {/* Professional help */}
        <section className="mb-14">
          <div className="section-divider mb-10" />
          <h2 className="font-serif text-xl text-earth-800 mb-4">
            Kiedy szukac profesjonalnej pomocy
          </h2>
          <p className="text-sm text-earth-600 mb-6 leading-relaxed">
            Ta strona nie zastepuje specjalisty. Rozważ kontakt z
            profesjonalista, jesli:
          </p>
          <ul className="space-y-3">
            {professionalHelpSigns.map((sign, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-earth-700 leading-relaxed"
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-cobalt-400 shrink-0" />
                {sign}
              </li>
            ))}
          </ul>
        </section>

        {/* Calm landing */}
        <section className="mb-10">
          <div className="section-divider mb-10" />
          <h2 className="font-serif text-xl text-earth-800 mb-4">
            Co mozesz teraz zrobic
          </h2>
          <p className="text-sm text-earth-600 mb-6 leading-relaxed">
            Jesli przerwales praktykę i szukasz spokoju:
          </p>
          <div className="space-y-3">
            <div className="rounded-xl border border-earth-200/50 bg-white p-5">
              <p className="text-sm text-earth-700 leading-relaxed mb-2">
                Oddychaj spokojnie — 4 sekundy wdech, 6 sekund wydech.
                Powtorz kilka razy.
              </p>
            </div>
            <div className="rounded-xl border border-earth-200/50 bg-white p-5">
              <p className="text-sm text-earth-700 leading-relaxed mb-2">
                Poczuj stopy na podlodze. Nazwij 3 rzeczy, ktore widzisz.
              </p>
            </div>
            <div className="rounded-xl border border-earth-200/50 bg-white p-5">
              <p className="text-sm text-earth-700 leading-relaxed">
                Nie musisz nic robic. Daj sobie chwile. Mozesz tez wrocic
                pozniej.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation links */}
        <div className="flex flex-wrap gap-4 mt-10">
          <Link
            href="/"
            className="btn-editorial-ghost text-sm"
          >
            Strona glowna
          </Link>
          <Link
            href="/legal/disclaimer"
            className="text-sm text-earth-500 hover:text-earth-700 underline underline-offset-2"
          >
            Pelne zastrzezenia medyczne
          </Link>
        </div>
      </div>
    </div>
  );
}
