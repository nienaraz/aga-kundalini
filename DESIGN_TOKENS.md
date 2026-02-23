# Design Tokens

System designu dla strony Aga – Joga Kundalini. Inspiracja: editorial yoga studios (Hygge, Tranquille, The Practice Space). Ciepła, spokojna estetyka z dużymi zaokrągleniami, serif headings i bento-grid layoutem.

---

## Typografia

### Fonty (Google Fonts)

| Rola       | Font                     | Wagi                    | Zastosowanie              |
| ---------- | ------------------------ | ----------------------- | ------------------------- |
| **Serif**  | Cormorant Garamond       | 400, 500, 600, 700      | Nagłówki (h1–h4)         |
| **Sans**   | DM Sans                  | 300, 400, 500, 600, 700 | Body, UI, przyciski       |

### Skala typograficzna

| Token          | Rozmiar   | Line-height | Zastosowanie                |
| -------------- | --------- | ----------- | --------------------------- |
| `display`      | 3.5rem    | 1.08        | Hero H1 (desktop)           |
| `display-sm`   | 2.75rem   | 1.1         | Hero H1 (mobile), sekcje    |
| `heading-xl`   | 2.25rem   | 1.15        | Nagłówki sekcji             |
| `heading-lg`   | 1.875rem  | 1.2         | Nagłówki podsekcji          |
| `heading-base` | 1.5rem    | 1.25        | Karty, h3                   |
| `heading-sm`   | 1.25rem   | 1.3         | Małe nagłówki               |
| `body-lg`      | 1.125rem  | 1.75        | Lead text                   |
| `body-base`    | 1rem      | 1.7         | Tekst body                  |
| `body-sm`      | 0.875rem  | 1.6         | Meta, drobne info            |
| `calm-body`    | 1.125rem  | 1.85        | Body w trybie spokojnym     |

---

## Paleta kolorów

### Warm (Cream base) – `#faf7f2`
Główny kolor tła. Ciepła biel, kremowa, przytulna.

| Token       | Hex       | Zastosowanie               |
| ----------- | --------- | -------------------------- |
| `warm-50`   | `#faf7f2` | Tło strony                 |
| `warm-100`  | `#f5f0e8` | Tło sekcji, hover          |
| `warm-200`  | `#ebe4d6` | Bordery, separatory        |
| `warm-300`  | `#ddd3c0` | Dekoracje                  |

### Sage (Olive accent) – `#57724c`
Główny kolor interakcji. Oliwkowy, spokojny, naturalny.

| Token       | Hex       | Zastosowanie               |
| ----------- | --------- | -------------------------- |
| `sage-50`   | `#f5f7f3` | Tło kart sage              |
| `sage-100`  | `#e8ede4` | Tło badges, pills          |
| `sage-200`  | `#d2dccb` | Selection, bordery         |
| `sage-600`  | `#57724c` | Przyciski, linki           |
| `sage-700`  | `#465c3e` | Hover na akcentach         |

### Earth (Text tones) – `#3a2a22`
Ciepła szarość zamiast czerni. Łagodna dla oczu.

| Token       | Hex       | Zastosowanie               |
| ----------- | --------- | -------------------------- |
| `earth-400` | `#b49c82` | Placeholder                |
| `earth-500` | `#a4856a` | Muted text                 |
| `earth-600` | `#97735d` | Tekst drugorzędny          |
| `earth-900` | `#554139` | Tekst nagłówków            |
| `earth-950` | `#3a2a22` | Tekst główny               |

### Gold (Accent) – `#e7b243`
Ciepły akcent inspirowany "The Practice Space".

### Sky (Oddech) – `#4d90bf`
Spokojna informacyjność.

### Rose (Ostrzeżenia) – `#d76363`
Delikatne ostrzeżenia i safety notes.

---

## Border Radius

| Token         | Wartość   | Zastosowanie                      |
| ------------- | --------- | --------------------------------- |
| `rounded-2xl` | 1rem      | Przyciski, inputy, małe elementy  |
| `rounded-3xl` | 1.5rem    | Karty, sekcje, modals             |
| `rounded-4xl` | 2rem      | Hero obrazy, dekoracje            |
| `rounded-full`| 9999px    | Pills, badges, avatary            |

---

## Shadows

| Token          | Zastosowanie                         |
| -------------- | ------------------------------------ |
| `shadow-bento` | Domyślny cień kart (bardzo subtelny) |
| `shadow-card`  | Hover na kartach                     |
| `shadow-soft`  | Przyciski CTA, floating elements     |
| `shadow-soft-lg`| Modals, dropdowns                   |

---

## Wzorce komponentów

### Karty

```
.card-calm  → biała, border warm-200/60, shadow-bento, rounded-3xl
.card-sage  → sage-100/60 bg, sage-200/40 border
.card-warm  → warm-100/60 bg, warm-200/40 border
.card-gold  → gold-50 bg, gold-200/40 border
```

### Etykiety

```
.label-editorial      → xs, uppercase, tracking-[0.15em], sage-600
.label-editorial-pill  → jak editorial + sage-100/70 bg, rounded-full, px-3.5
```

### Kontenery

```
.content-container     → max-w-6xl, px-5/8/10
.content-container-sm  → max-w-4xl
.content-container-xs  → max-w-2xl
```

### Sekcje

```
.section-spacing       → py-16/20/28
.section-spacing-sm    → py-10/14/18
```

### Placeholdery zdjęć

```
.img-placeholder       → rounded-3xl, warm-200/50 bg
.img-placeholder-sage  → rounded-3xl, sage-100/60 bg
```

---

## Animacje

Zasady: wolne, spokojne, minimalne. Nic agresywnego.

| Nazwa          | Opis                       | Czas   | Easing   |
| -------------- | -------------------------- | ------ | -------- |
| `fade-in`      | opacity 0→1                | 600ms  | ease-out |
| `slide-up`     | translate + opacity        | 600ms  | ease-out |
| `slide-down`   | translate + opacity        | 600ms  | ease-out |
| `breathe`      | scale 1→1.03→1             | 4s     | ease-in-out, infinite |
| `float`        | translateY 0→-8px→0        | 6s     | ease-in-out, infinite |

Transition easing:
- `calm` → cubic-bezier(0.4, 0, 0.2, 1)
- `gentle` → cubic-bezier(0.25, 0.1, 0.25, 1)

---

## Tryb spokojny (Calm Mode)

Aktywowany klasą `calm-mode` na `<body>`. Zwiększa czytelność, zmniejsza bodźce.

| Element              | Normalny              | Spokojny               |
| -------------------- | --------------------- | ---------------------- |
| Body font-size       | body-base (1rem)      | calm-body (1.125rem)   |
| Content container    | max-w-6xl             | max-w-3xl, px-8        |
| Ogólne wrażenie      | Pełny layout          | Więcej przestrzeni     |
