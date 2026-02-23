# Przewodnik dodawania tresci

Przewodnik dla Agi -- jak dodawac i edytowac tresc na stronie.

## Spis tresci

- [Jak dodawac tresci -- krok po kroku](#jak-dodawac-tresci)
- [Szablony](#szablony)
  - [Artykul edukacyjny](#artykul-edukacyjny)
  - [Praktyka](#praktyka)
  - [Sciezka (Path)](#sciezka-path)
  - [Slownik](#slownik)
  - [Newsletter](#newsletter)
  - [Video](#video)
- [Styl i ton](#styl-i-ton)
- [Checklista bezpieczenstwa](#checklista-bezpieczenstwa)
- [Checklista jakosci](#checklista-jakosci)
- [Jak dodac video](#jak-dodac-video)
- [Jak utworzyc webinar](#jak-utworzyc-webinar)

---

## Jak dodawac tresci

### Krok po kroku

1. **Okresl typ tresci**: artykul, praktyka, sciezka, slownik, newsletter czy video?
2. **Utworz plik**: Dodaj plik `.mdx` w odpowiednim katalogu (patrz nizej)
3. **Wypelnij frontmatter**: Skopiuj szablon i uzupelnij wszystkie wymagane pola
4. **Napisz tresc**: Uzyj formatu MDX (Markdown + komponenty)
5. **Sprawdz checklisty**: Przejdz przez checkliste bezpieczenstwa i jakosci
6. **Zwaliduj**: Uruchom `pnpm validate-content`
7. **Wygeneruj indeks**: Uruchom `pnpm generate-search`
8. **Sprawdz lokalnie**: Uruchom `pnpm dev` i sprawdz strone w przegladarce

### Gdzie umieszczac pliki

| Typ tresci   | Katalog                                  |
| ------------ | ---------------------------------------- |
| Artykul      | `apps/web/content/edukacja/<kategoria>/` |
| Praktyka     | `apps/web/content/praktyki/<kategoria>/` |
| Sciezka      | `apps/web/content/sciezki/`              |
| Slownik      | `apps/web/content/slownik/`              |
| Newsletter   | `apps/web/content/newsletter/`           |
| Video        | `apps/web/content/video/videos.json`     |

### Kategorie artykulow

- `uklad-nerwowy` -- anatomia, fizjologia, okno tolerancji
- `reaktywnosc-vs-odpowiedz` -- automatyczne reakcje vs swiadomy wybor
- `oddech-i-cialo` -- polaczenie ciala i oddechu
- `cykl-stresu` -- jak dziala stres, jak z niego wychodzic
- `kundalini-podstawy` -- wprowadzenie do jogi kundalini

### Kategorie praktyk

- `oddech` -- techniki oddechowe (pranayama)
- `ruch` -- cwiczenia ruchowe, krije
- `medytacja` -- medytacje prowadzone
- `resety` -- krotkie praktyki resetujace (1-5 min)

---

## Szablony

### Artykul edukacyjny

Plik: `apps/web/content/edukacja/<kategoria>/<slug>.mdx`

```yaml
---
# WYMAGANE
title: "Tytuł artykułu"              # Jasny, opisowy tytuł
slug: "slug-artykulu"                 # URL-friendly identyfikator (bez polskich znakow)
description: "Krótki opis artykułu"   # 10-300 znakow, pojawia sie w kartach i SEO
tags: ["tag1", "tag2"]                # Min. 1 tag, max. 8
category: "uklad-nerwowy"            # Jedna z kategorii artykulow (patrz wyzej)
publishedAt: "2024-12-01"            # Data publikacji (RRRR-MM-DD)
draft: false                          # true = nie widoczny na stronie

# WYMAGANE -- tresc wspierajaca
keyTakeaways:                         # 3-7 punktow -- co czytelnik wyniesie
  - "Punkt 1"
  - "Punkt 2"
  - "Punkt 3"
whatToTryNow:                         # Min. 1 -- co mozna sprobowac od razu
  - "Propozycja do wyprobowania"
safetyNotes:                          # Min. 1 -- zastrzezenia bezpieczenstwa
  - "To materiał edukacyjny, nie porada medyczna"

# OPCJONALNE
featured: false                       # true = wyswietlany na stronie glownej
difficulty: "podstawowy"              # "podstawowy" | "sredni" | "zaawansowany"
---

## Pierwszy naglowek

Tresc artykulu w formacie MDX...
```

### Praktyka

Plik: `apps/web/content/praktyki/<kategoria>/<slug>.mdx`

```yaml
---
# WYMAGANE
title: "Nazwa praktyki"
slug: "slug-praktyki"
description: "Krotki opis praktyki"   # 10-300 znakow
tags: ["oddech", "regulacja"]
category: "oddech"                    # Kategoria dla routingu
practiceCategory: "oddech"            # Kategoria praktyki (oddech/ruch/medytacja/resety)
publishedAt: "2024-12-01"
draft: false

# WYMAGANE -- parametry praktyki
duration: 5                           # Czas trwania w minutach
intensity: 1                          # Intensywnosc: 1 (lagodna) - 5 (intensywna)
difficulty: "podstawowy"              # "podstawowy" | "sredni" | "zaawansowany"

# WYMAGANE -- kroki praktyki
steps:
  - order: 1                          # Numer kroku
    title: "Nazwa kroku"              # Krotka nazwa
    description: "Co robic"           # Instrukcja
    durationSeconds: 30               # Czas trwania kroku w sekundach

# WYMAGANE -- bezpieczenstwo
safetyNotes:
  - "To praktyka wspierająca, nie terapia"

# OPCJONALNE
featured: false
cuesToNotice:                         # Na co zwrocic uwage po praktyce
  - "Czy oddech jest wolniejszy?"
contraindications:                    # Przeciwwskazania
  - "Jeśli oddychanie wywołuje lęk, przerwij"
---
```

### Sciezka (Path)

Plik: `apps/web/content/sciezki/<slug>.mdx`

```yaml
---
# WYMAGANE
title: "Nazwa ścieżki"
slug: "slug-sciezki"
description: "Opis sciezki"
tags: ["ścieżka", "regulacja"]
publishedAt: "2024-12-01"
draft: false

# WYMAGANE -- parametry sciezki
totalDays: 7                          # Laczna liczba dni
goal: "Cel ścieżki w jednym zdaniu"
difficulty: "podstawowy"

# WYMAGANE -- definicja dni
days:
  - dayNumber: 1                      # Numer dnia
    title: "Tytuł dnia"
    description: "Co robimy tego dnia"
    contentRefs:                      # Lista slugow tresci do wyswietlenia
      - "slug-artykulu-lub-praktyki"
    estimatedTimeMin: 10              # Szacowany czas w minutach

# WYMAGANE -- bezpieczenstwo
safetyNotes:
  - "Ta ścieżka ma charakter edukacyjny"

# OPCJONALNE
featured: false
---

## O tej sciezce

Tresc opisowa w MDX...
```

### Slownik

Plik: `apps/web/content/slownik/<slug>.mdx`

```yaml
---
# WYMAGANE
title: "Hasło słownikowe"             # Nazwa terminu
slug: "slug-hasla"
description: "Krótka definicja"       # 10-300 znakow
tags: ["układ nerwowy"]               # Min. 1 tag

# OPCJONALNE
relatedTerms:                         # Slugi powiazanych hasel
  - "inne-haslo"
seeAlso:                              # Linki do artykulow
  - slug: "uklad-nerwowy-podstawy"
    title: "Układ nerwowy -- podstawy"
---

Rozszerzona definicja i wyjasnienie terminu...
```

### Newsletter

Plik: `apps/web/content/newsletter/<slug>.mdx`

```yaml
---
# WYMAGANE
title: "Tytuł wydania"
slug: "slug-wydania"
description: "O czym jest ten newsletter"
publishedAt: "2024-12-01"
issueNumber: 1                        # Numer wydania

# OPCJONALNE
featured: false
draft: false
tags: ["newsletter"]
---

Tresc newslettera...
```

### Video

Plik: `apps/web/content/video/videos.json`

Dodaj nowy obiekt do tablicy JSON:

```json
{
  "title": "Tytuł filmu",
  "slug": "slug-filmu",
  "description": "Krótki opis filmu",
  "tags": ["oddech", "reset"],
  "publishedAt": "2024-12-01",
  "platform": "youtube",
  "youtubeId": "ID_FILMU_Z_YOUTUBE",
  "durationSec": 120,
  "topic": "reset",
  "featured": false,
  "draft": false
}
```

Pola:

| Pole          | Opis                                              |
| ------------- | ------------------------------------------------- |
| `title`       | Tytul filmu                                       |
| `slug`        | URL-friendly identyfikator                        |
| `description` | Krotki opis                                       |
| `tags`        | Tagi (tablica stringow)                           |
| `publishedAt` | Data publikacji (RRRR-MM-DD)                      |
| `platform`    | Platforma: `"youtube"`                            |
| `youtubeId`   | ID filmu z YouTube (z URL: `?v=ID_TUTAJ`)         |
| `durationSec` | Dlugosc filmu w sekundach                         |
| `topic`       | Temat: `"reset"`, `"edukacja"`, `"praktyka"`      |
| `featured`    | Czy wyrozniany na stronie glownej                 |
| `draft`       | `true` = ukryty, `false` = widoczny               |

---

## Styl i ton

### Zasady ogolne

- **Cieplo i blisko** -- pisz tak, jakbys rozmawial(a) z kims, komu zalezy, ale kto dopiero zaczyna
- **Uziemienie** -- opieraj sie na fizjologii i doswiadczeniu, nie na mistyce
- **Bez pouczania** -- unikaj tonu "musisz to robic" albo "to jedyna droga"
- **Zapraszaj, nie nakazuj** -- "moze warto sprobowac" zamiast "zrob to teraz"
- **Proste slowa** -- unikaj zargonu; jesli uzywasz terminu fachowego, wyjasni go

### Dlugosc

- Artykuly: 800-2000 slow (4-10 min czytania)
- Praktyki: frontmatter + opcjonalny krotki wstep
- Slownik: 50-300 slow na haslo
- Newsletter: 300-800 slow

### Formatowanie

- Uzywaj naglowkow `##` i `###` do strukturyzowania tresci
- Kroc akapity -- max 3-4 zdania
- Uzywaj list punktowanych do wyliczen
- Wyrozniaj kluczowe pojecia **boldzie**
- Uzywaj cytatow `>` do refleksji lub zaproszen do zatrzymania sie
- Dodawaj odstepy miedzy sekcjami -- daj tresci oddychac

### Przyklad dobrego tonu

Dobrze:
> Autonomiczny uklad nerwowy dziala w tle -- reguluje bicie serca, trawienie, oddech. Nie musisz o nim myslec, zeby dzialal. Ale kiedy zaczniesz go zauwazac, mozesz tez zaczac z nim wspolpracowac.

Zle:
> Musisz zrozumiec swoj uklad nerwowy, zeby moc go kontrolowac. Bez tej wiedzy nie bedziesz w stanie prawidlowo funkcjonowac.

---

## Checklista bezpieczenstwa

Przed publikacja kazdej tresci sprawdz:

- [ ] **Nie zawiera obietnic medycznych** -- nie obiecujemy wyleczenia, usuniecia objawow, diagnozy
- [ ] **Zawiera zastrzezenia** -- "To nie jest porada medyczna", "To material edukacyjny"
- [ ] **Uzywa jezyka mozliwosci** -- "moze", "warto sprobowac", "niektorym pomaga" zamiast "musisz", "to dziala", "to wyleczy"
- [ ] **Wskazuje na specjaliste** -- gdy temat dotyczy silnych objawow, traumy, stanow klinicznych
- [ ] **Nie stawia diagnoz** -- nie mowimy "masz dysregulacje" ani "Twoj uklad nerwowy jest uszkodzony"
- [ ] **Nie obiecuje wynikow** -- nie mowimy "po tygodniu poczujesz sie lepiej"
- [ ] **Daje pozwolenie na przerwanie** -- praktyki zawieraja informacje, ze mozna przerwac w kazdej chwili

---

## Checklista jakosci

Przed publikacja sprawdz:

- [ ] **Tytul jasny i opisowy** -- czytelnik wie, czego sie spodziewac
- [ ] **Opis 10-300 znakow** -- zwiezly, zachecajacy, informacyjny
- [ ] **Min. 1 tag** -- kategoria tematyczna do wyszukiwania
- [ ] **keyTakeaways (3-7 punktow)** -- co czytelnik wyniesie z artykulu
- [ ] **whatToTryNow (min. 1 punkt)** -- cos do zrobienia od razu
- [ ] **safetyNotes (min. 1)** -- zastrzezenie bezpieczenstwa
- [ ] **Slug poprawny** -- bez polskich znakow, male litery, myslniki zamiast spacji
- [ ] **Data poprawna** -- format RRRR-MM-DD
- [ ] **draft: false** -- jesli tresc ma byc widoczna
- [ ] **Walidacja przeszla** -- `pnpm validate-content` nie zglasza bledow
- [ ] **Wyglada dobrze lokalnie** -- sprawdzono w przegladarce na `localhost:3000`

---

## Jak dodac video

1. Wgraj film na YouTube
2. Skopiuj ID filmu z URL (np. dla `https://youtube.com/watch?v=abc123` ID to `abc123`)
3. Otworz `apps/web/content/video/videos.json`
4. Dodaj nowy obiekt na koncu tablicy (przed zamykajacym `]`)
5. Uzupelnij wszystkie pola (patrz szablon Video wyzej)
6. Ustaw `draft: false` gdy film ma byc widoczny
7. Uruchom `pnpm validate-content` i `pnpm generate-search`
8. Sprawdz na `localhost:3000/video`

## Jak utworzyc webinar

1. Utworz strone webinaru w panelu administracyjnym:
   - Zaloguj sie na `/account/login`
   - Przejdz do `/admin/webinars`
   - Kliknij "Nowy webinar"
2. Wypelnij formularz:
   - Tytul webinaru
   - Opis (co uczestnicy dowiedza sie / doswiadcza)
   - Data i godzina
   - Link do platformy (Zoom, Google Meet itp.)
   - Czy webinar jest darmowy
3. Opublikuj -- webinar pojawi sie na `/webinars`
4. Po zakonczeniu webinaru:
   - Jesli nagrywano, dodaj nagranie jako video (patrz wyzej)
   - Webinar automatycznie przeniesie sie do archiwum (`/webinars/archive`)
