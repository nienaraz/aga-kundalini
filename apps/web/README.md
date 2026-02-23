# @joga/web - Aplikacja Next.js

Glowna aplikacja webowa projektu Aga - Joga Kundalini. Zbudowana na Next.js 14 z App Router.

## Uruchomienie lokalne

### 1. Zmienne srodowiskowe

Skopiuj plik `.env.example` do `.env.local`:

```bash
cp .env.example .env.local
```

Zawartosc `.env.example`:

```
DATABASE_URL=./data/local.db
NEXTAUTH_SECRET=change-me-in-production
NEXTAUTH_URL=http://localhost:3000
```

Dla srodowiska deweloperskiego domyslne wartosci sa wystarczajace. W produkcji zmien `NEXTAUTH_SECRET` na losowy ciag znakow.

### 2. Instalacja i uruchomienie

```bash
# Z katalogu root monorepo
pnpm install

# Migracja bazy danych
pnpm --filter @joga/web db:migrate

# Wypelnienie danymi poczatkowymi (opcjonalnie)
pnpm --filter @joga/web db:seed

# Uruchomienie
pnpm --filter @joga/web dev
```

Aplikacja dostepna pod `http://localhost:3000`.

### 3. Generowanie indeksu wyszukiwania

Po dodaniu nowej tresci wygeneruj indeks wyszukiwania:

```bash
pnpm --filter @joga/web generate-search
```

Plik `public/search-index.json` zostanie zaktualizowany.

## Baza danych

Projekt uzywa SQLite przez Drizzle ORM. Plik bazy: `data/local.db`.

| Komenda          | Opis                                       |
| ---------------- | ------------------------------------------ |
| `db:generate`    | Generuj migracje po zmianie schematu       |
| `db:migrate`     | Zastosuj migracje                          |
| `db:seed`        | Wypelnij baze danymi poczatkowymi          |

### Workflow zmian w bazie

1. Zmodyfikuj schemat w `lib/db/schema.ts`
2. Wygeneruj migracje: `pnpm --filter @joga/web db:generate`
3. Zastosuj migracje: `pnpm --filter @joga/web db:migrate`

## Dodawanie tresci

### Artykul edukacyjny

1. Utworz katalog w `content/edukacja/<kategoria>/`
2. Utworz plik `.mdx` z wymaganym frontmatter
3. Napisz tresc w MDX
4. Uruchom walidacje: `pnpm --filter @joga/web validate-content`
5. Wygeneruj indeks wyszukiwania: `pnpm --filter @joga/web generate-search`

Przyklad frontmatter:

```yaml
---
title: "Tytuł artykułu"
slug: "slug-artykulu"
description: "Krótki opis (10-300 znaków)"
tags: ["tag1", "tag2"]
category: "uklad-nerwowy"
publishedAt: "2024-12-01"
featured: false
draft: false
difficulty: "podstawowy"
keyTakeaways:
  - "Punkt 1"
  - "Punkt 2"
whatToTryNow:
  - "Propozycja praktyczna"
safetyNotes:
  - "To materiał edukacyjny, nie porada medyczna"
---
```

### Praktyka

1. Utworz plik w `content/praktyki/<kategoria>/`
2. Uzyj frontmatter z polami `duration`, `intensity`, `steps`, `contraindications`
3. Zwaliduj i wygeneruj indeks

### Sciezka (Path)

1. Utworz plik w `content/sciezki/`
2. Zdefiniuj `totalDays`, `goal`, `days` z odwolaniami do tresci (`contentRefs`)

### Wpis do slownika

1. Utworz plik w `content/slownik/`
2. Uzyj prostego frontmatter z `title`, `slug`, `description`, `tags`

### Video

1. Edytuj plik `content/video/videos.json`
2. Dodaj nowy obiekt z polami: `title`, `slug`, `description`, `tags`, `publishedAt`, `platform`, `youtubeId`, `durationSec`, `topic`, `featured`, `draft`

Szczegoloowe szablony i wytyczne: [CONTENT_GUIDE.md](../../CONTENT_GUIDE.md)

## Struktura katalogow

```
app/
├── page.tsx                  # Strona glowna
├── layout.tsx                # Root layout
├── globals.css               # Style globalne + Tailwind
├── start/                    # Zacznij tutaj
├── library/                  # Biblioteka edukacyjna
│   └── [category]/[slug]/    # Dynamiczne strony artykulow
├── practices/                # Praktyki
│   └── [category]/[slug]/    # Dynamiczne strony praktyk
├── paths/                    # Sciezki wielodniowe
│   ├── [slug]/               # Pojedyncza sciezka
│   └── progress/             # Sledzenie postepu
├── tools/                    # Narzedzia interaktywne
│   ├── check-in/             # Samosprawdzenie
│   ├── grounding-menu/       # Menu uziemienia
│   └── trigger-journal/      # Dziennik wyzwalaczy
├── video/                    # Wideo
│   └── [slug]/               # Pojedynczy film
├── webinars/                 # Webinary
│   ├── [slug]/               # Pojedynczy webinar
│   └── archive/              # Archiwum
├── quiz/                     # Quiz regulacji
│   └── result/               # Wynik quizu
├── resources/                # Zasoby
│   ├── glossary/             # Slownik
│   │   └── [slug]/           # Haslo slownikowe
│   └── recommendations/      # Polecane
├── about/                    # O mnie
├── newsletter/               # Newsletter
├── account/                  # Konto uzytkownika
│   └── login/                # Logowanie
├── admin/                    # Panel administracyjny
│   └── webinars/             # Zarzadzanie webinarami
├── legal/                    # Strony prawne
│   ├── privacy/              # Polityka prywatnosci
│   ├── cookies/              # Cookies
│   └── disclaimer/           # Zastrzezenia
├── api/                      # Endpointy API
│   ├── auth/[...nextauth]/   # Autentykacja
│   ├── search/               # Wyszukiwanie
│   ├── contact/              # Formularz kontaktowy
│   ├── newsletter/           # Zapis do newslettera
│   └── quiz/save/            # Zapis wyniku quizu
└── feed.xml/                 # Kanal RSS
```

## Deployment na Vercel

### Krok po kroku

1. **Polacz repozytorium**: Wejdz na vercel.com/import i wybierz repozytorium
2. **Konfiguracja projektu**:
   - Root Directory: `apps/web`
   - Framework Preset: `Next.js`
   - Build Command: (domyslny - `next build`)
   - Output Directory: (domyslny - `.next`)
3. **Zmienne srodowiskowe**: Dodaj w panelu Vercel:
   - `NEXTAUTH_SECRET` - wygeneruj: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - pelny URL produkcyjny (np. `https://twoja-domena.pl`)
   - `DATABASE_URL` - sciezka do bazy (np. `./data/local.db`)
4. **Deploy**: Kliknij "Deploy". Vercel automatycznie zbuduje i wdrozy aplikacje
5. **Domena**: W ustawieniach projektu dodaj wlasna domene w zakladce "Domains"

### Automatyczne deploye

Kazdy push na branch `main` uruchomi automatyczny deploy na Vercel. Pull requesty utworza preview deploys.
