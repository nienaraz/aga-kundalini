# Aga - Joga Kundalini

Polska strona edukacyjna o regulacji ukladu nerwowego i jodze kundalini. Swiadome odpowiadanie zamiast reaktywnosci.

## Stack technologiczny

| Warstwa        | Technologia                              |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 14 (App Router)                  |
| Jezyk          | TypeScript 5                             |
| Styl           | Tailwind CSS 3                           |
| Tresc          | MDX (gray-matter + next-mdx-remote)      |
| Baza danych    | SQLite (better-sqlite3) + Drizzle ORM    |
| Autentykacja   | NextAuth.js 4                            |
| Wyszukiwanie   | MiniSearch (client-side)                 |
| Monorepo       | pnpm workspaces + Turborepo              |
| Deployment     | Vercel                                   |

## Struktura monorepo

```
joga-kundalini/
├── apps/
│   └── web/                  # Aplikacja Next.js
│       ├── app/              # Routing (App Router)
│       ├── components/       # Komponenty React
│       ├── content/          # Tresc MDX (artykuly, praktyki, sciezki, video)
│       ├── data/             # Baza SQLite
│       ├── lib/              # Logika aplikacji, DB, walidacja
│       └── scripts/          # Skrypty pomocnicze
├── packages/
│   ├── config/               # Wspolna konfiguracja (ESLint, Prettier, TS, Tailwind)
│   ├── lib/                  # Biblioteka narzedzi (slug, toc, search, reading-time)
│   └── ui/                   # Wspolne komponenty UI
├── turbo.json                # Konfiguracja Turborepo
├── pnpm-workspace.yaml       # Definicja workspace
└── package.json              # Skrypty root
```

## Szybki start

### Wymagania

- **Node.js** >= 20
- **pnpm** >= 9

### Instalacja

```bash
# Klonowanie repozytorium
git clone <url-repozytorium>
cd joga-kundalini

# Instalacja zaleznosci
pnpm install
```

### Uruchomienie lokalne

```bash
# Tryb deweloperski (wszystkie pakiety)
pnpm dev

# Tylko aplikacja web
pnpm --filter @joga/web dev
```

Aplikacja dostepna pod `http://localhost:3000`.

### Build produkcyjny

```bash
pnpm build
```

### Testy

```bash
pnpm test
```

## Komendy

| Komenda                     | Opis                                          |
| --------------------------- | --------------------------------------------- |
| `pnpm dev`                  | Uruchom tryb deweloperski                     |
| `pnpm build`                | Zbuduj wszystkie pakiety                      |
| `pnpm lint`                 | Uruchom linter                                |
| `pnpm test`                 | Uruchom testy (Vitest)                        |
| `pnpm format`               | Sformatuj kod (Prettier)                      |
| `pnpm validate-content`     | Waliduj tresc MDX (frontmatter, wymagane pola)|
| `pnpm generate-search`      | Wygeneruj indeks wyszukiwania                 |

### Komendy aplikacji web

Uruchamiane z `pnpm --filter @joga/web <komenda>`:

| Komenda                | Opis                                     |
| ---------------------- | ---------------------------------------- |
| `dev`                  | Serwer deweloperski Next.js              |
| `build`                | Build produkcyjny                        |
| `start`                | Uruchom build produkcyjny                |
| `lint`                 | Linting Next.js                          |
| `validate-content`     | Waliduj pliki MDX                        |
| `generate-search`      | Generuj search-index.json                |
| `generate-templates`   | Generuj szablony tresci                  |
| `db:generate`          | Generuj migracje Drizzle                 |
| `db:migrate`           | Uruchom migracje bazy danych             |
| `db:seed`              | Wypelnij baze danymi poczatkowymi        |

## Deployment na Vercel

1. Polacz repozytorium z Vercel (https://vercel.com/import)
2. Ustaw **Root Directory** na `apps/web`
3. Ustaw **Framework Preset** na `Next.js`
4. Dodaj zmienne srodowiskowe:
   - `NEXTAUTH_SECRET` - losowy ciag znakow (min. 32 znaki)
   - `NEXTAUTH_URL` - URL produkcyjny strony
   - `DATABASE_URL` - sciezka do bazy SQLite
5. Deploy uruchomi sie automatycznie przy kazdym push na `main`

## Zarzadzanie trescia

Cala tresc strony jest przechowywana jako pliki MDX w katalogu `apps/web/content/`. Szczegolowy przewodnik dodawania tresci znajdziesz w [CONTENT_GUIDE.md](./CONTENT_GUIDE.md).

## Dokumentacja

- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) - Przewodnik dodawania tresci
- [ROUTES.md](./ROUTES.md) - Mapa stron i API
- [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - System designu (kolory, typografia, spacing)
- [apps/web/README.md](./apps/web/README.md) - Dokumentacja aplikacji web
