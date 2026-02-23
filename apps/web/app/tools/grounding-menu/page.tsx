'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = 'Menu uziemienia | Aga \u00b7 Joga Kundalini';
const PAGE_DESCRIPTION =
  'Gdy czujesz X, spr\u00f3buj Y. Praktyczne techniki uziemienia dopasowane do Twojego stanu.';

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
  body: 'cia\u0142o',
  breath: 'oddech',
  sensory: 'zmys\u0142y',
  movement: 'ruch',
};

const STATES: EmotionalState[] = [
  {
    id: 'lek',
    label: 'L\u0119k / niepok\u00f3j',
    icon: '\u25cb',
    description: 'Kiedy czujesz przyspieszone serce, niespokojne my\u015bli lub napi\u0119cie.',
    techniques: [
      {
        instruction: 'Wyd\u0142u\u017c wydech \u2013 wdech na 4, wydech na 6\u20138. Powt\u00f3rz 5 razy.',
        time: '1\u20132 min',
        type: 'breath',
        link: '/practices/oddech',
        linkLabel: 'Wi\u0119cej praktyk oddechowych',
      },
      {
        instruction: 'Poczuj stopy na pod\u0142odze. Wci\u015bnij je mocno. Poczuj pod\u0142o\u017ce.',
        time: '30 s',
        type: 'body',
      },
      {
        instruction: 'Nazwa\u0107 5 rzeczy, kt\u00f3re widzisz. 4, kt\u00f3re s\u0142yszysz. 3, kt\u00f3re czujesz dotykiem.',
        time: '1\u20132 min',
        type: 'sensory',
      },
      {
        instruction: 'Po\u0142\u00f3\u017c jedn\u0105 d\u0142o\u0144 na klatce piersiowej, drug\u0105 na brzuchu. Oddychaj powoli.',
        time: '1 min',
        type: 'body',
      },
    ],
  },
  {
    id: 'zlosc',
    label: 'Z\u0142o\u015b\u0107 / irytacja',
    icon: '\u25cb',
    description: 'Kiedy czujesz gor\u0105co, napi\u0119cie w szcz\u0119ce lub d\u0142oniach.',
    techniques: [
      {
        instruction: 'Potrz\u0105\u015bnij d\u0142o\u0144mi energicznie przez 30 sekund. Pozw\u00f3l energii wyj\u015b\u0107.',
        time: '30 s',
        type: 'movement',
        link: '/practices/ruch',
        linkLabel: 'Wi\u0119cej praktyk ruchowych',
      },
      {
        instruction: 'Wydech ustami z d\u017awi\u0119kiem \u201ehaaa\u201d. Powt\u00f3rz 5\u20138 razy.',
        time: '1 min',
        type: 'breath',
      },
      {
        instruction: 'Dotknij czego\u015b zimnego \u2013 kranu, szklanki z wod\u0105, \u015bciany.',
        time: '30 s',
        type: 'sensory',
      },
      {
        instruction: 'Napi\u0105j wszystkie mi\u0119\u015bnie na 5 sekund, potem pu\u015b\u0107. Powt\u00f3rz 3 razy.',
        time: '1 min',
        type: 'body',
      },
    ],
  },
  {
    id: 'odciecie',
    label: 'Odci\u0119cie / zamro\u017cenie',
    icon: '\u25cb',
    description: 'Kiedy czujesz odr\u0119twienie, pustk\u0119, jakby\u015b by\u0142/a daleko.',
    techniques: [
      {
        instruction: 'Potupuj mocno stopami o pod\u0142og\u0119. Poczuj wibracje w nogach.',
        time: '30 s',
        type: 'movement',
        link: '/practices/ruch',
        linkLabel: 'Wi\u0119cej praktyk ruchowych',
      },
      {
        instruction: 'Sp\u0142ucz twarz zimn\u0105 wod\u0105 lub przytrzymaj kostk\u0119 lodu w d\u0142oni.',
        time: '30 s',
        type: 'sensory',
      },
      {
        instruction: 'Rozejrzyj si\u0119 po pokoju i na g\u0142os nazwij kolory, kt\u00f3re widzisz.',
        time: '1 min',
        type: 'sensory',
      },
      {
        instruction: 'Energiczny wdech nosem, kr\u00f3tki wydech ustami. 10 powtorze\u0144.',
        time: '1 min',
        type: 'breath',
        link: '/practices/oddech',
        linkLabel: 'Wi\u0119cej praktyk oddechowych',
      },
    ],
  },
  {
    id: 'przebodzcowanie',
    label: 'Przebod\u017acowanie',
    icon: '\u25cb',
    description: 'Kiedy wszystko jest za g\u0142o\u015bne, za szybkie, za du\u017co.',
    techniques: [
      {
        instruction: 'Zakryj oczy d\u0142o\u0144mi. Oddychaj powoli w ciemno\u015b\u0107.',
        time: '1\u20132 min',
        type: 'body',
      },
      {
        instruction: 'Wyd\u0142u\u017c wydech na 8 sekund. Wdech na 4. Powt\u00f3rz 6 razy.',
        time: '1\u20132 min',
        type: 'breath',
        link: '/practices/oddech',
        linkLabel: 'Wi\u0119cej praktyk oddechowych',
      },
      {
        instruction: 'Dotknij d\u0142o\u0144mi ramion (u\u015bcisk motyla). Delikatnie klepnij na przemian.',
        time: '1 min',
        type: 'body',
      },
      {
        instruction: 'Je\u015bli mo\u017cesz \u2013 wyjd\u017a na zewn\u0105trz. Poczuj powietrze na sk\u00f3rze.',
        time: '2 min',
        type: 'sensory',
      },
    ],
  },
  {
    id: 'smutek',
    label: 'Smutek / ci\u0119\u017cko\u015b\u0107',
    icon: '\u25cb',
    description: 'Kiedy czujesz ci\u0119\u017car, brak energii, \u0142zy.',
    techniques: [
      {
        instruction: 'Po\u0142\u00f3\u017c d\u0142o\u0144 na sercu. Powiedz do siebie: \u201eTo, co czuj\u0119, jest w porz\u0105dku.\u201d',
        time: '1 min',
        type: 'body',
      },
      {
        instruction: 'Delikatnie ko\u0142ysz si\u0119 w prz\u00f3d i w ty\u0142, siedz\u0105c lub stoj\u0105c.',
        time: '1\u20132 min',
        type: 'movement',
      },
      {
        instruction: 'G\u0142\u0119boki wdech nosem, d\u0142ugi wydech z westchnieniem.',
        time: '1 min',
        type: 'breath',
      },
      {
        instruction: 'Owi\u0144 si\u0119 kocem lub swetrem. Pozw\u00f3l sobie na ciep\u0142o.',
        time: '2 min',
        type: 'sensory',
        link: '/practices/medytacja',
        linkLabel: 'Spr\u00f3buj \u0142agodnej medytacji',
      },
    ],
  },
  {
    id: 'nie-wiem',
    label: 'Nie wiem, co czuj\u0119',
    icon: '\u25cb',
    description: 'I to jest w porz\u0105dku. Zacznij od cia\u0142a.',
    techniques: [
      {
        instruction: 'Zeskanuj cia\u0142o od st\u00f3p do g\u0142owy. Gdzie czujesz co\u015b? Co to jest?',
        time: '2 min',
        type: 'body',
        link: '/practices/medytacja',
        linkLabel: 'Spr\u00f3buj medytacji skanowania cia\u0142a',
      },
      {
        instruction: 'Po\u0142\u00f3\u017c d\u0142onie na brzuchu. Po prostu oddychaj i obserwuj.',
        time: '1\u20132 min',
        type: 'breath',
      },
      {
        instruction: 'Dotknij r\u00f3\u017cnych powierzchni wok\u00f3\u0142 siebie. Co czujesz pod palcami?',
        time: '1 min',
        type: 'sensory',
      },
      {
        instruction: 'Powoli obr\u00f3\u0107 g\u0142ow\u0119 w jedn\u0105 stron\u0119, potem w drug\u0105. Poczuj szyj\u0119.',
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
      <div className="content-container">
        {/* Header */}
        <header className="mb-10">
          <nav className="mb-6">
            <Link
              href="/tools"
              className="text-sage-600 hover:text-sage-700 transition-colors text-sm"
            >
              &larr; Narz\u0119dzia
            </Link>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl text-earth-800 mb-3">
            Menu uziemienia
          </h1>
          <p className="text-earth-500 text-lg leading-relaxed max-w-2xl">
            Gdy czujesz X, spr\u00f3buj Y. Wybierz stan, kt\u00f3ry jest Ci teraz najbli\u017cszy.
          </p>
        </header>

        {/* State buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {STATES.map((state) => (
            <button
              key={state.id}
              onClick={() => setSelectedId(state.id === selectedId ? null : state.id)}
              className={`
                p-4 rounded-xl border text-left transition-all duration-200
                ${
                  state.id === selectedId
                    ? 'border-sage-400 bg-sage-50 shadow-sm'
                    : 'border-warm-200 bg-white hover:border-warm-300 hover:bg-warm-50'
                }
              `}
            >
              <span className="block text-earth-800 font-medium mb-1">
                {state.label}
              </span>
              <span className="block text-earth-400 text-sm">
                {state.description}
              </span>
            </button>
          ))}
        </div>

        {/* Techniques for selected state */}
        {selected && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-2xl text-earth-800 mb-2">
              {selected.label}
            </h2>
            <p className="text-earth-500 mb-6">{selected.description}</p>

            <div className="space-y-4 mb-10">
              {selected.techniques.map((tech, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-warm-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <span className="inline-block text-xs font-medium uppercase tracking-wider text-sage-600 bg-sage-50 px-2 py-1 rounded">
                      {TYPE_LABELS[tech.type]}
                    </span>
                    <span className="text-earth-400 text-sm whitespace-nowrap">
                      {tech.time}
                    </span>
                  </div>
                  <p className="text-earth-700 text-calm-body leading-relaxed mb-3">
                    {tech.instruction}
                  </p>
                  {tech.link && (
                    <Link
                      href={tech.link}
                      className="text-sage-600 hover:text-sage-700 text-sm
                                 underline underline-offset-2 transition-colors"
                    >
                      {tech.linkLabel} &rarr;
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedId(null)}
              className="px-6 py-3 rounded-xl border border-warm-200 text-earth-600
                         hover:border-warm-300 hover:bg-warm-50 transition-colors"
            >
              Wr\u00f3\u0107 do wyboru
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-xl border border-warm-200 bg-warm-50 p-5 mt-10">
          <p className="text-earth-500 text-sm leading-relaxed">
            <strong className="text-earth-600">Uwaga:</strong> Te sugestie nie
            zast\u0119puj\u0105 terapii ani pomocy medycznej. S\u0105 to proste praktyki, kt\u00f3re
            mog\u0105 pom\u00f3c w codziennej regulacji. Je\u015bli Twoje trudno\u015bci si\u0119
            utrzymuj\u0105, si\u0119gnij po profesjonalne wsparcie.
          </p>
        </div>
      </div>
    </div>
  );
}
