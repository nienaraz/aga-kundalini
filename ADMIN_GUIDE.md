# Przewodnik administracji strony

Przewodnik dla Agi -- jak dodawac i edytowac tresci na stronie Joga Kundalini.

---

## Szybki start

### Wymagania

- Node.js 18+ (zalecane 20)
- pnpm (`npm install -g pnpm`)

### Uruchomienie lokalne

```bash
pnpm install
pnpm dev
```

Strona bedzie dostepna pod `http://localhost:3000`.

### Build produkcyjny

```bash
pnpm build
```

---

## Struktura tresci

Wszystkie tresci znajduja sie w `apps/web/content/`. Kazdy plik to `.mdx` (Markdown z frontmatter YAML na gorze).

```
content/
  edukacja/           -- Artykuly edukacyjne
    uklad-nerwowy/
    reaktywnosc-vs-reakcja/
    ...
  praktyki/           -- Praktyki (oddech, ruch, medytacja, resety)
    oddech/
    ruch/
    medytacja/
    resety/
  sciezki/            -- Programy wielodniowe
  slownik/            -- Terminy slownikowe
  newsletter/         -- Archiwum newslettera
  video/              -- Konfiguracja wideo (videos.json)
```

### Pliki szablonow

W kazdym folderze jest plik `_SZABLON-*.mdx` -- to wzorzec do kopiowania. Pliki zaczynajace sie od `_` sa automatycznie pomijane.

---

## Jak dodac nowy artykul

1. Skopiuj szablon `content/edukacja/_SZABLON-ARTYKUL.mdx`
2. Stworz folder z nazwa kategorii (np. `content/edukacja/oddech-i-cialo/`)
3. Wklej plik i zmien nazwe na slug artykulu (np. `jak-dziala-oddech.mdx`)
4. Uzupelnij frontmatter (dane na gorze miedzy `---`)
5. Napisz tresc w Markdown ponizej frontmattera

### Wymagane pola frontmatter (artykul)

```yaml
---
title: "Tytul artykulu"
slug: "slug-bez-polskich-znakow"
description: "Krotki opis (10-300 znakow)"
tags: ["tag1", "tag2"]
category: "nazwa-kategorii"
publishedAt: "2024-12-01"
keyTakeaways:
  - "Najwazniejszy wniosek 1"
  - "Najwazniejszy wniosek 2"
  - "Najwazniejszy wniosek 3"
difficulty: "podstawowy"     # podstawowy | sredni | zaawansowany
draft: false                 # true = nie widoczny na stronie
featured: false              # true = wyrozniany na stronie glownej
---
```

### Opcjonalne pola

```yaml
somaticCues:
  - "Zwroc uwage na napiecie w szczece"
relatedPractices:
  - "oddech-uspokajajacy"
  - "reset-2-minuty"
safetyNotes:
  - "To material edukacyjny, nie porada medyczna"
image: "/images/artykul.jpg"
imageAlt: "Opis obrazka"
updatedAt: "2025-01-15"
```

---

## Jak dodac nowa praktyke

1. Skopiuj `content/praktyki/_SZABLON-PRAKTYKA.mdx`
2. Umiec w odpowiednim folderze: `oddech/`, `ruch/`, `medytacja/` lub `resety/`
3. Uzupelnij frontmatter

### Wymagane pola (praktyka)

```yaml
---
title: "Nazwa praktyki"
slug: "slug-praktyki"
description: "Opis praktyki (10-300 znakow)"
tags: ["tag1", "tag2"]
category: "oddech"
practiceCategory: "oddech"   # oddech | ruch | medytacja | reset
publishedAt: "2024-12-01"
duration: 5                  # czas w minutach
intensity: 2                 # 1-5
steps:
  - order: 1
    title: "Nazwa kroku"
    description: "Opis co robic"
    durationSeconds: 30
  - order: 2
    title: "Drugi krok"
    description: "Opis drugiego kroku"
    durationSeconds: 60
cuesToNotice:
  - "Czy oddech jest wolniejszy niz na poczatku?"
  - "Gdzie czujesz napiecie?"
draft: false
---
```

---

## Jak dodac sciezke (program wielodniowy)

1. Skopiuj `content/sciezki/_SZABLON-SCIEZKA.mdx`
2. Uzupelnij frontmatter

### Wymagane pola (sciezka)

```yaml
---
title: "7 dni mniej reaktywnosci"
slug: "7-dni-mniej-reaktywnosci"
description: "Opis sciezki"
tags: ["sciezka", "reaktywnosc"]
publishedAt: "2024-12-01"
totalDays: 7
goal: "Cel sciezki w jednym zdaniu"
days:
  - dayNumber: 1
    title: "Dzien 1 - tytul"
    description: "Co sie wydarzy"
    contentRefs:
      - "slug-artykulu-lub-praktyki"
    estimatedTimeMin: 10
  - dayNumber: 2
    title: "Dzien 2 - tytul"
    description: "Co sie wydarzy"
    contentRefs:
      - "slug-praktyki"
    estimatedTimeMin: 15
  # ... minimum 3 dni
draft: false
---
```

---

## Jak dodac termin do slownika

Stworz plik w `content/slownik/`, np. `nowy-termin.mdx`:

```yaml
---
term: "Okno tolerancji"
slug: "okno-tolerancji"
shortDefinition: "Zakres pobudzenia, w ktorym mozesz funkcjonowac komfortowo."
category: "uklad-nerwowy"
tags: ["regulacja", "uklad nerwowy"]
relatedTerms: ["regulacja", "uklad-nerwowy"]
---

Dluzsze wyjasnienie terminu w Markdown...
```

---

## Jak dodac wideo

Edytuj plik `content/video/videos.json`. Dodaj nowy obiekt:

```json
{
  "slug": "nazwa-wideo",
  "title": "Tytul wideo",
  "description": "Opis wideo",
  "youtubeId": "ID_Z_YOUTUBE",
  "topic": "regulacja",
  "durationSeconds": 65,
  "publishedAt": "2024-12-01",
  "featured": true
}
```

---

## Quiz -- edycja pytan i stanow

Plik: `apps/web/lib/quiz/config.ts`

### Zmiana pytan

Edytuj tablice `quizQuestions`. Kazde pytanie:

```typescript
{
  id: 'q1',               // unikalny identyfikator
  text: 'Tresc pytania',  // to co widzi uzytkownik
  options: scaleOptions,   // wspolna skala 0-3
}
```

### Zmiana stanow wynikowych

Edytuj tablice `quizStates`. Kazdy stan:

```typescript
{
  id: 'tension',
  name: 'Napiecie / pobudzenie',
  questionIds: ['q1', 'q2', 'q8', 'q10'],  // ktore pytania wchodza w sume
  description: 'Opis wyswietlany uzytkownikowi...',
  whatToTry: [
    'Wskazowka 1',
    'Wskazowka 2',
  ],
  recommendations: {
    video: 'slug-wideo',
    practice: 'slug-praktyki',
    article: 'slug-artykulu',
  },
}
```

---

## Webinary

Webinary sa zarzadzane przez baze danych (SQLite). Aby dodac webinar:

1. Zaloguj sie jako admin (`/account/login`)
2. Przejdz do `/admin/webinars`
3. Dodaj nowy webinar

Alternatywnie, uruchom seed:

```bash
cd apps/web
npx tsx lib/db/seed.ts
```

---

## Zmienne srodowiskowe

Stworz plik `.env.local` w `apps/web/`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=losowy-dluga-fraza-co-najmniej-32-znaki

# Email (opcjonalnie - do logowania magic link)
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=noreply@jogakundalini.pl

# Baza danych (opcjonalnie - domyslnie ./data/local.db)
DATABASE_URL=./data/local.db
```

---

## Deploy na Vercel

1. Polacz repo GitHub z Vercel
2. Framework: **Next.js**
3. Root directory: `apps/web`
4. Build command: `cd ../.. && pnpm build --filter=@joga/web`
5. Output directory: `apps/web/.next`
6. Dodaj zmienne srodowiskowe (NEXTAUTH_SECRET, NEXTAUTH_URL)

---

## Formatowanie Markdown

W tresciach mozesz uzywac:

- `**pogrubienie**` -- **pogrubienie**
- `*kursywa*` -- *kursywa*
- `## Naglowek` -- naglowki (h2, h3, h4)
- `- lista` -- lista punktowana
- `1. lista` -- lista numerowana
- `> cytat` -- cytat blokowy
- `` `kod` `` -- kod w linii
- `[tekst](url)` -- link

---

## Wskazowki

- **Slug** to adres URL bez polskich znakow, np. `uklad-nerwowy-podstawy`
- **draft: true** ukrywa tresc ze strony (ale plik zostaje)
- **featured: true** wyroznia tresc na stronie glownej
- Nowa tresc pojawi sie po ponownym buildzie (lub natychmiast w trybie `pnpm dev`)
- Szablony (`_SZABLON-*.mdx`) nigdy nie sa wyswietlane na stronie
- Minimum 3 key takeaways na artykul, max 7
- Minimum 3 dni na sciezke
