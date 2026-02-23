/** Konfiguracja nawigacji strony */

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  { label: 'Start', href: '/start' },
  {
    label: 'Edukacja',
    href: '/library',
    children: [
      { label: 'Układ nerwowy', href: '/library/uklad-nerwowy' },
      { label: 'Reaktywność vs reakcja', href: '/library/reaktywnosc-vs-reakcja' },
      { label: 'Oddech i sygnały ciała', href: '/library/oddech-i-sygnaly-ciala' },
      { label: 'Domknięcie cyklu stresu', href: '/library/domkniecie-cyklu-stresu' },
      { label: 'Kundalini – podstawy', href: '/library/kundalini-podstawy' },
    ],
  },
  {
    label: 'Praktyki',
    href: '/practices',
    children: [
      { label: 'Oddech', href: '/practices/oddech' },
      { label: 'Ruch', href: '/practices/ruch' },
      { label: 'Medytacja', href: '/practices/medytacja' },
      { label: 'Resety (2–5 min)', href: '/practices/resety' },
    ],
  },
  { label: 'Ścieżki', href: '/paths' },
  { label: 'Narzędzia', href: '/tools' },
  { label: 'Video', href: '/video' },
  { label: 'Webinary', href: '/webinars' },
];

export const secondaryNavigation: NavItem[] = [
  { label: 'O mnie', href: '/about' },
  { label: 'Zasoby', href: '/resources' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Kontakt', href: '/about#kontakt' },
];

export const footerNavigation = {
  main: mainNavigation,
  secondary: secondaryNavigation,
  legal: [
    { label: 'Polityka prywatności', href: '/legal/privacy' },
    { label: 'Cookies', href: '/legal/cookies' },
    { label: 'Zastrzeżenia', href: '/legal/disclaimer' },
  ] as NavItem[],
};

export const regulationBarItems = [
  { label: '2 min reset', href: '/practices/resety', emoji: '🫁' },
  { label: '5 min oddech', href: '/practices/oddech', emoji: '🌬️' },
  { label: 'Uziemienie', href: '/tools/grounding-menu', emoji: '🌿' },
];
