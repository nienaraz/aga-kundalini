'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = 'Menu uziemienia | Aga · Joga Kundalini';
const PAGE_DESCRIPTION =
  'Gdy czujesz X, spróbuj Y. Praktyczne techniki uziemienia dopasowane do Twojego stanu.';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GroundingTechnique {
  instruction: string;
  time: string;
  type: 'body' | 'breath' | 'sensory' | 'movement';
  link?: string;
  linkLabel?: string;
}

interface EmotionalState {
  id: string;
  label: string;
  icon: string;
  description: string;
  techniques: GroundingTechnique[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TYPE_LABELS: Record<GroundingTechnique['type'], string> = {
  body: 'ciało',
  breath: 'oddech',
  sensory: 'zmysły',
  movement: 'ruch',
};

const STATES: EmotionalState[] = [
  {
    id: 'lek',
    label: 'Lęk / niepokój',
    icon: '○',
    description: 'Kiedy czujesz przyspieszone serce, niespokojne myśli lub napięcie.',
    techniques: [
      {
        instruction: 'Wydłuż wydech – wdech na 4, wydech na 6–8. Powtórz 5 razy.',
        time: '1–2 min',
        type: 'breath',
        link: '/practices/oddech',
        linkLabel: 'Więcej praktyk oddechowych',
      },
      {
        instruction: 'Poczuj stopy na podłodze. Wciśnij je mocno. Poczuj podłoże.',
        time: '30 s',
        type: 'body',
      },
      {
        instruction: 'Nazwać 5 rzeczy, które widzisz. 4, które słyszysz. 3, które czujesz dotykiem.',
        time: '1–2 min',
        type: 'sensory',
      },
      {
        instruction: 'Połóż jedną dłoń na klatce piersiowej, drugą na brzuchu. Oddychaj powoli.',
        time: '1 min',
        type: 'body',
      },
    ],
  },
  {
    id: 'zlosc',
    label: 'Złość / irytacja',
    icon: '○',
    description: 'Kiedy czujesz gorąco, napięcie w szczęce lub dłoniach.',
    techniques: [
      {
        instruction: 'Potrząśnij dłońmi energicznie przez 30 sekund. Pozwól energii wyjść.',
        time: '30 s',
        type: 'movement',
        link: '/practices/ruch',
        linkLabel: 'Więcej praktyk ruchowych',
      },
      {
        instruction: 'Wydech ustami z dźwiękiem \u201ehaaa\u201d. Powtórz 5–8 razy.',
        time: '1 min',
        type: 'breath',
      },
      {
        instruction: 'Dotknij czegoś zimnego – kranu, szklanki z wodą, ściany.',
        time: '30 s',
        type: 'sensory',
      },
      {
        instruction: 'Napiąj wszystkie mięśnie na 5 sekund, potem puść. Powtórz 3 razy.',
        time: '1 min',
        type: 'body',
      },
    ],
  },
  {
    id: 'odciecie',
    label: 'Odcięcie / zamrożenie',
    icon: '○',
    description: 'Kiedy czujesz odrętwienie, pustkę, jakbyś był/a daleko.',
    techniques: [
      {
        instruction: 'Potupuj mocno stopami o podłogę. Poczuj wibracje w nogach.',
        time: '30 s',
        type: 'movement',
        link: '/practices/ruch',
        linkLabel: 'Więcej praktyk ruchowych',
      },
      {
        instruction: 'Spłucz twarz zimną wodą lub przytrzymaj kostkę lodu w dłoni.',
        time: '30 s',
        type: 'sensory',
      },
      {
        instruction: 'Rozejrzyj się po pokoju i na głos nazwij kolory, które widzisz.',
        time: '1 min',
        type: 'sensory',
      },
      {
        instruction: 'Energiczny wdech nosem, krótki wydech ustami. 10 powtorzeń.',
        time: '1 min',
        type: 'breath',
        link: '/practices/oddech',
        linkLabel: 'Więcej praktyk oddechowych',
      },
    ],
  },
  {
    id: 'przebodzcowanie',
    label: 'Przebodźcowanie',
    icon: '○',
    description: 'Kiedy wszystko jest za głośne, za szybkie, za dużo.',
    techniques: [
      {
        instruction: 'Zakryj oczy dłońmi. Oddychaj powoli w ciemność.',
        time: '1–2 min',
        type: 'body',
      },
      {
        instruction: 'Wydłuż wydech na 8 sekund. Wdech na 4. Powtórz 6 razy.',
        time: '1–2 min',
        type: 'breath',
        link: '/practices/oddech',
        linkLabel: 'Więcej praktyk oddechowych',
      },
      {
        instruction: 'Dotknij dłońmi ramion (uścisk motyla). Delikatnie klepnij na przemian.',
        time: '1 min',
        type: 'body',
      },
      {
        instruction: 'Jeśli możesz – wyjdź na zewnątrz. Poczuj powietrze na skórze.',
        time: '2 min',
        type: 'sensory',
      },
    ],
  },
  {
    id: 'smutek',
    label: 'Smutek / ciężkość',
    icon: '○',
    description: 'Kiedy czujesz ciężar, brak energii, łzy.',
    techniques: [
      {
        instruction: 'Połóż dłoń na sercu. Powiedz do siebie: \u201eTo, co czuję, jest w porządku.\u201d',
        time: '1 min',
        type: 'body',
      },
      {
        instruction: 'Delikatnie kołysz się w przód i w tył, siedząc lub stojąc.',
        time: '1–2 min',
        type: 'movement',
      },
      {
        instruction: 'Głęboki wdech nosem, długi wydech z westchnieniem.',
        time: '1 min',
        type: 'breath',
      },
      {
        instruction: 'Owiń się kocem lub swetrem. Pozwól sobie na ciepło.',
        time: '2 min',
        type: 'sensory',
        link: '/practices/medytacja',
        linkLabel: 'Spróbuj łagodnej medytacji',
      },
    ],
  },
  {
    id: 'nie-wiem',
    label: 'Nie wiem, co czuję',
    icon: '○',
    description: 'I to jest w porządku. Zacznij od ciała.',
    techniques: [
      {
        instruction: 'Zeskanuj ciało od stóp do głowy. Gdzie czujesz coś? Co to jest?',
        time: '2 min',
        type: 'body',
        link: '/practices/medytacja',
        linkLabel: 'Spróbuj medytacji skanowania ciała',
      },
      {
        instruction: 'Połóż dłonie na brzuchu. Po prostu oddychaj i obserwuj.',
        time: '1–2 min',
        type: 'breath',
      },
      {
        instruction: 'Dotknij różnych powierzchni wokół siebie. Co czujesz pod palcami?',
        time: '1 min',
        type: 'sensory',
      },
      {
        instruction: 'Powoli obróć głowę w jedną stronę, potem w drugą. Poczuj szyję.',
        time: '30 s',
        type: 'movement',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GroundingMenuPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = PAGE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION);
  }, []);

  const selected = STATES.find((s) => s.id === selectedId) || null;

  return (
    <div className="section-spacing">
      <div className="content-container-sm">
        {/* Header */}
        <header className="mb-14">
          <nav className="mb-6">
            <Link
              href="/tools"
              className="text-sage-600 hover:text-sage-700 transition-colors text-body-sm font-medium"
            >
              &larr; Narzędzia
            </Link>
          </nav>
          <span className="label-editorial-pill mb-6 inline-flex">Uziemienie</span>
          <h1 className="font-serif text-display-sm text-earth-950 mb-4">
            Menu uziemienia
          </h1>
          <p className="text-body-lg text-earth-600 leading-relaxed max-w-2xl">
            Gdy czujesz X, spróbuj Y. Wybierz stan, który jest Ci teraz najbliższy.
          </p>
        </header>

        {/* State buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {STATES.map((state) => (
            <button
              key={state.id}
              onClick={() => setSelectedId(state.id === selectedId ? null : state.id)}
              className={`
                p-5 rounded-2xl border text-left transition-all duration-300 ease-gentle
                ${
                  state.id === selectedId
                    ? 'border-sage-300 bg-sage-100/60 shadow-soft'
                    : 'border-warm-200/60 bg-white hover:border-warm-300/60 hover:shadow-bento'
                }
              `}
            >
              <span className="block text-earth-900 font-medium text-body-base mb-1">
                {state.label}
              </span>
              <span className="block text-earth-500 text-body-sm">
                {state.description}
              </span>
            </button>
          ))}
        </div>

        {/* Techniques for selected state */}
        {selected && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-heading-xl text-earth-950 mb-2">
              {selected.label}
            </h2>
            <p className="text-body-base text-earth-600 mb-8">{selected.description}</p>

            <div className="space-y-4 mb-10">
              {selected.techniques.map((tech, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-warm-200/60 bg-white p-6 md:p-7 shadow-bento"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="label-editorial-pill">
                      {TYPE_LABELS[tech.type]}
                    </span>
                    <span className="text-earth-500 text-body-sm whitespace-nowrap">
                      {tech.time}
                    </span>
                  </div>
                  <p className="text-body-base text-earth-700 leading-relaxed mb-3">
                    {tech.instruction}
                  </p>
                  {tech.link && (
                    <Link
                      href={tech.link}
                      className="inline-flex items-center gap-2 text-sage-700 font-medium text-body-sm
                                 hover:text-sage-800 transition-colors"
                    >
                      {tech.linkLabel}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedId(null)}
              className="px-8 py-3.5 rounded-2xl border border-warm-200/60 text-earth-700
                         font-medium text-body-sm bg-warm-100
                         hover:bg-warm-200 active:bg-warm-300 transition-colors"
            >
              Wróć do wyboru
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-3xl border border-warm-200/60 bg-warm-100/40 p-6 md:p-7 mt-14">
          <p className="text-body-sm text-earth-600 leading-relaxed">
            <strong className="text-earth-700">Uwaga:</strong> Te sugestie nie
            zastępują terapii ani pomocy medycznej. Są to proste praktyki, które
            mogą pomóc w codziennej regulacji. Jeśli Twoje trudności się
            utrzymują, sięgnij po profesjonalne wsparcie.
          </p>
        </div>
      </div>
    </div>
  );
}
