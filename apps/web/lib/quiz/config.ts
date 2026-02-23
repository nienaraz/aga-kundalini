// ---------------------------------------------------------------------------
// Quiz Configuration – Admin-editable
// ---------------------------------------------------------------------------
// Ten plik zawiera pytania, stany i scoring quizu.
// Aga może edytować pytania, opisy stanów i rekomendacje bez zmiany logiki.
// ---------------------------------------------------------------------------

export type QuizQuestion = {
  id: string; // q1–q10
  text: string;
  helpText?: string;
  options: { value: number; label: string }[];
};

export type QuizState = {
  id: string;
  name: string;
  /** Stany, których sumy porównujemy: klucze to ID pytań */
  questionIds: string[];
  description: string;
  whatToTry: string[];
  recommendations: {
    video?: string;
    practice?: string;
    article?: string;
    path?: string;
  };
};

// Wspólne opcje odpowiedzi (skala 0-3)
const scaleOptions: QuizQuestion['options'] = [
  { value: 0, label: 'Wcale / prawie nigdy' },
  { value: 1, label: 'Czasem, lekko' },
  { value: 2, label: 'Często / wyraźnie' },
  { value: 3, label: 'Bardzo często / mocno' },
];

// ---------------------------------------------------------------------------
// Pytania Q1–Q10 (dokładnie wg specyfikacji)
// ---------------------------------------------------------------------------
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'W ostatnich 24–48h moje ciało jest w napięciu (szczęka, kark, brzuch, klatka).',
    options: scaleOptions,
  },
  {
    id: 'q2',
    text: 'Trudno mi się zatrzymać: jestem w pośpiechu, "muszę", trudno odpuścić.',
    options: scaleOptions,
  },
  {
    id: 'q3',
    text: 'Mam kłopot z wyciszeniem wieczorem (scroll, gonitwa myśli, trudny sen).',
    options: scaleOptions,
  },
  {
    id: 'q4',
    text: 'Łatwo mnie "odpala": drobiazgi wywołują mocniejszą reakcję niż bym chciała.',
    options: scaleOptions,
  },
  {
    id: 'q5',
    text: 'Czuję się przeciążona bodźcami (dźwięki, ludzie, powiadomienia, multitasking).',
    options: scaleOptions,
  },
  {
    id: 'q6',
    text: 'Czuję się odłączona / jak za szybą: mniej czuję ciało albo emocje.',
    options: scaleOptions,
  },
  {
    id: 'q7',
    text: 'Mam mało energii i sprawczości: trudno mi zacząć, nawet małe rzeczy są ciężkie.',
    options: scaleOptions,
  },
  {
    id: 'q8',
    text: 'Oddycham płytko albo wstrzymuję oddech w stresie / w ciągu dnia.',
    options: scaleOptions,
  },
  {
    id: 'q9',
    text: 'Trudno mi nazwać, co czuję i czego potrzebuję w danym momencie.',
    options: scaleOptions,
  },
  {
    id: 'q10',
    text: 'Po stresie trudno mi wrócić do "OK" (reset trwa długo).',
    options: scaleOptions,
  },
];

// ---------------------------------------------------------------------------
// Stany wynikowe – scoring oparte na sumie konkretnych pytań
// ---------------------------------------------------------------------------
// A: Napięcie / pobudzenie    = Q1 + Q2 + Q8 + Q10
// B: Przebodźcowanie          = Q5 + Q2 + Q3 + Q10
// C: Wysoka reaktywność       = Q4 + Q2 + Q9 + Q1
// D: Zamrożenie / odcięcie    = Q6 + Q7 + Q9 + Q8
// E: Rozregulowanie wieczorne = Q3 + Q10 + Q8 + Q1
// ---------------------------------------------------------------------------

export const quizStates: QuizState[] = [
  {
    id: 'tension',
    name: 'Napięcie / pobudzenie',
    questionIds: ['q1', 'q2', 'q8', 'q10'],
    description:
      'Twoje odpowiedzi wskazują na podwyższone napięcie i pobudzenie w ciele. Układ współczulny może być mocno zaangażowany — ciało jest w trybie „działaj". To naturalna reakcja na obciążenie, ale gdy utrzymuje się długo, warto świadomie wspierać regulację. Zacznij od oddechu i kontaktu z ciałem.',
    whatToTry: [
      'Wydłużony wydech: wdech na 4, wydech na 6–8 (powtórz 5 razy)',
      'Zimna woda na nadgarstki lub twarz (aktywacja nerwu błędnego)',
      'Powolny spacer z uwagą na kontakt stóp z podłożem',
    ],
    recommendations: {
      video: '60-sekund-reset',
      practice: 'oddech-uspokajajacy',
      article: 'uklad-nerwowy-podstawy',
    },
  },
  {
    id: 'overstimulation',
    name: 'Przebodźcowanie',
    questionIds: ['q5', 'q2', 'q3', 'q10'],
    description:
      'Twoje odpowiedzi sugerują, że możesz odczuwać przeciążenie bodźcami. Układ nerwowy ma trudność z przetworzeniem ilości informacji i sygnałów. To nie znaczy, że jesteś „za wrażliwa/y" — Twój system potrzebuje przestrzeni i redukcji wejść. Wyciszenie i ochrona granic sensorycznych mogą pomóc.',
    whatToTry: [
      'Wyłącz powiadomienia i ogranicz ekrany na 30 minut',
      '5 minut w ciszy lub z zatyczkami do uszu',
      'Oddech brzuszny: ręce na brzuchu, spokojny wdech nosem, wydech ustami',
    ],
    recommendations: {
      video: '60-sekund-reset',
      practice: 'oddech-uspokajajacy',
      article: 'uklad-nerwowy-podstawy',
    },
  },
  {
    id: 'high-reactivity',
    name: 'Wysoka reaktywność',
    questionIds: ['q4', 'q2', 'q9', 'q1'],
    description:
      'Twoje odpowiedzi wskazują na tendencję do szybkich, intensywnych reakcji. Okno tolerancji może być węższe niż zwykle — mniej bodźców wystarczy, by „wyjść" poza strefę komfortu. To nie wada — to informacja. Kluczem jest budowanie pauzy między bodźcem a reakcją.',
    whatToTry: [
      'Pauza przed reakcją: policz do 5 i zrób jeden świadomy oddech',
      'Dziennik reakcji: zapisz co się stało, co poczułaś/eś, co zrobiłaś/eś',
      'Technika STOP: Stop, Take a breath, Observe, Proceed',
    ],
    recommendations: {
      article: 'reaktywnosc-vs-odpowiedz',
      practice: 'reset-2-minuty',
      path: '7-dni-mniej-reaktywnosci',
    },
  },
  {
    id: 'freeze',
    name: 'Zamrożenie / odcięcie',
    questionIds: ['q6', 'q7', 'q9', 'q8'],
    description:
      'Twoje odpowiedzi sugerują tendencję do „zamrożenia" — stan, w którym układ nerwowy przechodzi w tryb ochronny. Możesz czuć odcięcie od ciała, emocji lub otoczenia. To mechanizm przetrwania, nie Twoja wina. Delikatne, powolne ruchy i zmiana temperatury mogą pomóc ciału wrócić do kontaktu.',
    whatToTry: [
      'Delikatne ruchy: potrząsanie dłońmi, kołysanie ciała z boku na bok',
      'Kontakt z czymś zimnym lub ciepłym (zmiana temperatury budzi ciało)',
      'Nazwij 5 rzeczy, które widzisz wokół siebie (technika 5-4-3-2-1)',
    ],
    recommendations: {
      video: '3-minuty-uziemienia',
      practice: 'ruch-przebudzenie',
    },
  },
  {
    id: 'evening-dysregulation',
    name: 'Rozregulowanie wieczorne',
    questionIds: ['q3', 'q10', 'q8', 'q1'],
    description:
      'Twoje odpowiedzi wskazują na trudności z wyciszeniem pod koniec dnia. Układ nerwowy może mieć trudność z przejściem z trybu aktywności do odpoczynku. To częste, zwłaszcza przy dużym obciążeniu. Wieczorny rytuał i świadome domknięcie dnia mogą stopniowo pomóc.',
    whatToTry: [
      'Wieczorny rytuał: 5 minut oddechu brzusznego przed snem',
      'Ograniczenie ekranów 30 min przed snem',
      'Krótki body scan — zauważ napięcia, nie próbuj ich zmieniać',
    ],
    recommendations: {
      practice: 'oddech-uspokajajacy',
      article: 'uklad-nerwowy-podstawy',
    },
  },
];

// ---------------------------------------------------------------------------
// Disclaimer (wyświetlany na stronie quizu i wyniku)
// ---------------------------------------------------------------------------
export const quizDisclaimer =
  'Ten quiz nie jest diagnozą ani poradą medyczną. To narzędzie orientacyjne, które pomaga dobrać łagodną praktykę. Jeśli doświadczasz silnych lub niepokojących objawów, skonsultuj się ze specjalistą.';
