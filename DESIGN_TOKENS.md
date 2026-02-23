# Design Tokens

System designu dla strony Aga - Joga Kundalini. Ciepla, spokojna estetyka wspierajaca regulacje ukladu nerwowego.

---

## Paleta kolorow

### Warm (Cieplo) -- kolor tla i bazowy

Glowny kolor bazowy strony. Cieplo, bezpieczenstwo, przytulnosc.

| Token        | Hex       | Zastosowanie                                |
| ------------ | --------- | ------------------------------------------- |
| `warm-50`    | `#fdf8f0` | Tlo strony (`--color-bg`)                   |
| `warm-100`   | `#f9eed9` | Hover na kartach (`--color-card-hover`)      |
| `warm-200`   | `#f3dbb2` | Obramowania (`--color-border`)              |
| `warm-300`   | `#e9c285` | Dekoracje, subtelne akcenty                 |
| `warm-400`   | `#dea45c` | Akcenty drugorzedne                         |
| `warm-500`   | `#d48a3c` | Ikony, badges                               |
| `warm-600`   | `#c47232` | Hover na akcentach                          |
| `warm-700`   | `#a3572b` | Silne akcenty                               |
| `warm-800`   | `#844629` | Ciemne elementy                             |
| `warm-900`   | `#6c3b24` | Bardzo ciemne akcenty                       |
| `warm-950`   | `#3a1d11` | Najciemniejszy wariant                      |

### Sage (Szalwia) -- kolor akcentowy

Glowny kolor interakcji. Spokojny, naturalny, uziemiony.

| Token        | Hex       | Zastosowanie                                |
| ------------ | --------- | ------------------------------------------- |
| `sage-50`    | `#f4f7f4` | Tlo sekcji akcentowych                      |
| `sage-100`   | `#e3ebe3` | Tlo akcentu (`--color-accent-light`)        |
| `sage-200`   | `#c7d7c7` | Zaznaczenie tekstu (`::selection`)           |
| `sage-300`   | `#a0baa0` | Obramowania cytatow                         |
| `sage-400`   | `#749a74` | Ikony drugorzedne                           |
| `sage-500`   | `#587d58` | Focus ring (`:focus-visible`)               |
| `sage-600`   | `#446444` | Linki, akcent (`--color-accent`)            |
| `sage-700`   | `#385038` | Hover na linkach                            |
| `sage-800`   | `#2f412f` | Ciemne elementy akcentowe                   |
| `sage-900`   | `#283628` | Bardzo ciemny akcent                        |
| `sage-950`   | `#131e13` | Najciemniejszy wariant                      |

### Earth (Ziemia) -- kolor tekstu

Ciepla szarosc zamiast czystej czerni. Lagodny dla oczu.

| Token        | Hex       | Zastosowanie                                |
| ------------ | --------- | ------------------------------------------- |
| `earth-50`   | `#f8f5f0` | Tlo alternatywne                            |
| `earth-100`  | `#ede6d8` | Separatory                                  |
| `earth-200`  | `#dccdb4` | Obramowania subtilne                        |
| `earth-300`  | `#c7ae88` | Placeholder tekst                           |
| `earth-400`  | `#b59466` | Ikony nieaktywne                            |
| `earth-500`  | `#a88157` | Tekst wyciszony (`--color-muted`)           |
| `earth-600`  | `#916a4a` | Tekst drugorzedny                           |
| `earth-700`  | `#78533e` | Naglowki h3, tekst li                       |
| `earth-800`  | `#644538` | Naglowki h2, tekst p                        |
| `earth-900`  | `#543b31` | Tekst glowny (`--color-text`)               |
| `earth-950`  | `#2f1e19` | Najciemniejszy -- prawie czarny             |

### Sky (Niebo) -- kolor informacyjny

Uzywany do informacji, podpowiedzi, elementow edukacyjnych.

| Token        | Hex       | Zastosowanie                                |
| ------------ | --------- | ------------------------------------------- |
| `sky-50`     | `#f0f7fc` | Tlo info-boxow                              |
| `sky-100`    | `#ddedf8` | Tlo podpowiedzi                             |
| `sky-200`    | `#c3e0f3` | Obramowania info                            |
| `sky-300`    | `#9accea` | Ikony informacyjne                          |
| `sky-400`    | `#6ab1de` | Linki informacyjne                          |
| `sky-500`    | `#4896d2` | Akcent informacyjny                         |
| `sky-600`    | `#367bc6` | Hover info                                  |
| `sky-700`    | `#2e65b5` | Ciemny info                                 |
| `sky-800`    | `#2b5394` | Bardzo ciemny info                          |
| `sky-900`    | `#284775` | Tekst na jasnym tle info                    |
| `sky-950`    | `#1c2d49` | Najciemniejszy info                         |

### Rose (Roza) -- kolor ostrzezen

Uzywany do ostrzezen, przeciwwskazan, waznych uwag bezpieczenstwa.

| Token        | Hex       | Zastosowanie                                |
| ------------ | --------- | ------------------------------------------- |
| `rose-50`    | `#fdf2f4` | Tlo ostrzezen                               |
| `rose-100`   | `#fce7eb` | Tlo delikatnych ostrzezen                   |
| `rose-200`   | `#f9d0d9` | Obramowania ostrzezen                       |
| `rose-300`   | `#f4aabb` | Ikony ostrzegawcze (lagodne)                |
| `rose-400`   | `#ed7d99` | Ikony ostrzegawcze                          |
| `rose-500`   | `#e05478` | Akcent ostrzegawczy                         |
| `rose-600`   | `#cc3361` | Hover na ostrzezeniach                      |
| `rose-700`   | `#ac254f` | Silne ostrzezenia                           |
| `rose-800`   | `#902247` | Ciemne ostrzezenia                          |
| `rose-900`   | `#7b2041` | Tekst na jasnym tle ostrzezenia             |
| `rose-950`   | `#440d20` | Najciemniejszy wariant                      |

---

## Typografia

### Fonty

| Rola       | Font stack                                                  | Zastosowanie                |
| ---------- | ----------------------------------------------------------- | --------------------------- |
| **Serif**  | Georgia, Cambria, "Times New Roman", serif                  | Naglowki (h1, h2, h3)      |
| **Sans**   | system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif | Tekst body, UI, przyciski  |

### Skala typograficzna

| Token          | Rozmiar     | Line-height | Zastosowanie               |
| -------------- | ----------- | ----------- | -------------------------- |
| `text-sm`      | 0.875rem    | 1.25rem     | Drobne informacje, captiony|
| `text-base`    | 1rem        | 1.5rem      | Tekst body (tryb normalny) |
| `calm-body`    | 1.125rem    | 1.85        | Tekst body (tryb spokojny) |
| `calm-lg`      | 1.25rem     | 1.85        | Wiekszy tekst spokojny     |
| `calm-xl`      | 1.5rem      | 1.6         | Lead text spokojny         |
| `text-xl`      | 1.25rem     | 1.75rem     | h3 (mobile)                |
| `text-2xl`     | 1.5rem      | 2rem        | h3 (desktop), h2 (mobile)  |
| `text-3xl`     | 1.875rem    | 2.25rem     | h2 (desktop)               |
| `text-4xl`     | 2.25rem     | 2.5rem      | h1 (mobile), calm h2       |
| `text-5xl`     | 3rem        | 1           | h1 (desktop), calm h1      |

### Line-height

- Tekst body: `1.8` (prose)
- Tekst body leading-relaxed: `1.625`
- Tryb spokojny: `1.85`
- Naglowki: `1.0` - `1.6`

---

## Spacing

### Bazowy system

Tailwind CSS domyslny system spacing (4px base unit).

### Spacing spokojnego trybu

Dodatkowe tokeny spacing dla trybu spokojnego (calm-mode):

| Token        | Wartosc   | Zastosowanie                                  |
| ------------ | --------- | --------------------------------------------- |
| `calm-sm`    | 1.5rem    | Odstep miedzy elementami w karcie             |
| `calm-md`    | 2.5rem    | Odstep miedzy sekcjami w karcie               |
| `calm-lg`    | 4rem      | Odstep miedzy sekcjami na stronie             |
| `calm-xl`    | 6rem      | Duzy odstep -- hero, sekcje glowne            |

### Spacing komponentow

| Klasa              | Wartosc                        | Zastosowanie                    |
| ------------------ | ------------------------------ | ------------------------------- |
| `section-spacing`  | py: 3rem / 4rem / 5rem        | Odstep pionowy sekcji (resp.)   |
| `content-container`| max-w: 56rem, px: 1-2rem      | Kontener tresci                 |
| Prose `max-width`  | 72ch                           | Szerokosc kolumny tekstu        |

---

## Border radius

| Zmienna    | Wartosc    | Zastosowanie                                    |
| ---------- | ---------- | ----------------------------------------------- |
| `--radius` | `0.75rem`  | Domyslny radius (karty, przyciski, inputy)      |
| `rounded-xl`| `0.75rem` | Klasa Tailwind -- karty `.card-calm`            |
| `rounded-sm`| `0.125rem`| Focus ring                                      |

---

## Animacje

### Zasady ogolne

- Tylko **fade-in** i **slide-up** -- minimalna ilosc animacji
- Czas trwania: **600ms** lub wiecej -- wolne, spokojne przejscia
- Easing: **ease-out** -- naturalne zwalnianie
- Brak agresywnych animacji (bounce, shake, pulse)
- Animacje nie powinny rozpraszac ani przytlaczac

### Zdefiniowane animacje

| Nazwa        | Keyframes                                          | Czas     | Easing   |
| ------------ | -------------------------------------------------- | -------- | -------- |
| `fade-in`    | opacity: 0 -> 1                                   | 600ms    | ease-out |
| `slide-up`   | opacity: 0, translateY(12px) -> opacity: 1, translateY(0) | 600ms | ease-out |

### Przejscia (transitions)

| Element          | Wlasciwosc                 | Czas     | Easing   |
| ---------------- | -------------------------- | -------- | -------- |
| `.card-calm`     | all                        | 300ms    | ease-out |
| Linki (`a`)      | color                      | 150ms    | default  |

---

## Tryb spokojny (Calm Mode)

Tryb spokojny aktywowany jest klasa `calm-mode` na elemencie `<body>`. Zwieksza czytelnosc i zmniejsza ilosc bodzcy wizualnych.

### Zmiany w trybie spokojnym

| Element            | Tryb normalny             | Tryb spokojny              |
| ------------------ | ------------------------- | -------------------------- |
| Tekst body         | `text-base` (1rem)        | `calm-body` (1.125rem)     |
| Line-height        | 1.5                       | 1.85                       |
| h1                 | text-3xl / text-4xl       | text-4xl / text-5xl        |
| h2                 | text-2xl / text-3xl       | text-3xl / text-4xl        |
| h3                 | text-xl / text-2xl        | text-2xl / text-3xl        |
| Content container  | max-w-4xl, px-4/6/8       | max-w-3xl, px-8            |
| Ogolne wrazenie    | Standardowy uklad         | Wiecej przestrzeni, mniej UI|

---

## Wzorce komponentow

### card-calm

Spokojna karta z delikatnym hover.

```css
.card-calm {
  border-radius: 0.75rem;          /* rounded-xl */
  border: 1px solid #f3dbb2;       /* warm-200 */
  background: white;
  padding: 1.5rem;                 /* p-6 */
  transition: all 300ms ease-out;
}
.card-calm:hover {
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);  /* shadow-md */
  border-color: #c7d7c7;           /* sage-200 */
}
```

### content-container

Kontener tresci z responsywnym paddingiem.

```css
.content-container {
  max-width: 56rem;    /* max-w-4xl */
  margin: 0 auto;
  padding-left: 1rem;  /* px-4 */
  padding-right: 1rem;
}
@media (min-width: 640px) {
  .content-container { padding-left: 1.5rem; padding-right: 1.5rem; }  /* sm:px-6 */
}
@media (min-width: 1024px) {
  .content-container { padding-left: 2rem; padding-right: 2rem; }      /* lg:px-8 */
}
```

### section-spacing

Odstep pionowy sekcji -- responsywny.

```css
.section-spacing {
  padding-top: 3rem;      /* py-12 */
  padding-bottom: 3rem;
}
@media (min-width: 768px) {
  .section-spacing { padding-top: 4rem; padding-bottom: 4rem; }   /* md:py-16 */
}
@media (min-width: 1024px) {
  .section-spacing { padding-top: 5rem; padding-bottom: 5rem; }   /* lg:py-20 */
}
```

### prose-custom

Style dla tresci MDX.

| Element       | Style                                                    |
| ------------- | -------------------------------------------------------- |
| `h2`          | font-serif, text-2xl/3xl, earth-800, mt-12 mb-4         |
| `h3`          | font-serif, text-xl/2xl, earth-700, mt-8 mb-3           |
| `p`           | mb-6, earth-800, leading-relaxed                         |
| `ul`          | mb-6, pl-6, space-y-2                                    |
| `li`          | earth-700                                                |
| `blockquote`  | border-l-4 sage-300, pl-4, italic, earth-600             |
| `strong`      | earth-900, font-semibold                                 |
| `a`           | sage-600, underline, hover: sage-700                     |

---

## Zmienne CSS (Custom Properties)

Zdefiniowane w `:root` w `globals.css`:

| Zmienna               | Wartosc domyslna     | Opis                     |
| --------------------- | -------------------- | ------------------------ |
| `--color-bg`          | warm-50              | Kolor tla                |
| `--color-text`        | earth-900            | Kolor tekstu             |
| `--color-muted`       | earth-500            | Tekst wyciszony          |
| `--color-accent`      | sage-600             | Kolor akcentowy          |
| `--color-accent-light`| sage-100             | Jasny akcent             |
| `--color-border`      | warm-200             | Obramowania              |
| `--color-card`        | white                | Tlo kart                 |
| `--color-card-hover`  | warm-100             | Tlo kart po hover        |
| `--radius`            | 0.75rem              | Domyslny border-radius   |
