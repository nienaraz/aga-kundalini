/**
 * Safety data — crisis numbers, red flags, and professional help indicators.
 * Single source of truth for all safety-related copy and data.
 */

export interface CrisisLine {
  name: string;
  number: string;
  description: string;
  hours: string;
}

export const crisisLines: CrisisLine[] = [
  {
    name: 'Telefon Zaufania dla Dzieci i Mlodziezy',
    number: '116 111',
    description: 'Bezplatna pomoc psychologiczna dla mlodych osob',
    hours: 'codziennie 24/7',
  },
  {
    name: 'Telefon wsparcia emocjonalnego',
    number: '116 123',
    description: 'Dla osob w kryzysie emocjonalnym',
    hours: 'codziennie 24/7',
  },
  {
    name: 'Centrum Wsparcia dla osob doroslych w kryzysie psychicznym',
    number: '800 70 2222',
    description: 'Bezplatna linia wsparcia',
    hours: 'codziennie 14:00–22:00',
  },
];

/** Red flags — signs that practice should be stopped immediately */
export const redFlags: string[] = [
  'Silna dysocjacja — czujesz, ze nie jestes w swoim ciele lub tracisz kontakt z rzeczywistoscia',
  'Panika, ktora nie ustepuje po zakonczeniu praktyki',
  'Mysli samobojcze lub samookaleczenie',
  'Bol fizyczny, ktory narasta podczas praktyki',
  'Silne zawroty glowy, mroczki przed oczami, omdlenia',
  'Flashbacki traumatyczne lub intensywne wspomnienia, ktore przytlaczaja',
];

/** Signs you need a professional, not an app */
export const professionalHelpSigns: string[] = [
  'Objawy utrzymuja sie lub nasilaja mimo regularnej praktyki',
  'Praktyka wywoluje silne emocje, ktore trudno uregulowac samodzielnie',
  'Doswiadczasz przewleklego bolu, zaburzen snu lub problemow z jedzeniem',
  'Masz zdiagnozowane zaburzenia psychiczne lub neurologiczne',
  'Czujesz, ze potrzebujesz komus powiedziec o tym, przez co przechodzisz',
  'Ciaza, stan pooperacyjny lub powazna choroba przewlekla',
];

/** SafetyGate acknowledgment text */
export const safetyGateStatements = {
  primary: 'To nie jest terapia ani porada medyczna.',
  secondary:
    'Jesli czujesz silne objawy, przerwij i skonsultuj sie ze specjalista.',
  action: 'Rozumiem i chce kontynuowac',
  learnMore: 'Dowiedz sie wiecej o bezpieczenstwie',
} as const;
