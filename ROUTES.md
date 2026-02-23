# Mapa stron i tras (Routes)

Pelna mapa wszystkich stron i endpointow API w aplikacji.

## Legenda

- **Typ**: `page` = strona, `api` = endpoint API, `feed` = kanal RSS
- **Auth**: `--` = publiczna, `user` = wymaga logowania, `admin` = wymaga roli admina

---

## Strony publiczne

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/`                                | Strona glowna            | page   | --      |
| `/start`                           | Zacznij tutaj            | page   | --      |
| `/about`                           | O mnie                   | page   | --      |

## Biblioteka edukacyjna

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/library`                         | Biblioteka               | page   | --      |
| `/library/[category]`              | Kategoria artykulow      | page   | --      |
| `/library/[category]/[slug]`       | Artykul                  | page   | --      |

Kategorie: `uklad-nerwowy`, `reaktywnosc-vs-odpowiedz`, `oddech-i-cialo`, `cykl-stresu`, `kundalini-podstawy`

## Praktyki

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/practices`                       | Lista praktyk            | page   | --      |
| `/practices/[category]`            | Kategoria praktyk        | page   | --      |
| `/practices/[category]/[slug]`     | Praktyka                 | page   | --      |

Kategorie: `oddech`, `ruch`, `medytacja`, `resety`

## Sciezki

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/paths`                           | Lista sciezek            | page   | --      |
| `/paths/[slug]`                    | Sciezka                  | page   | --      |
| `/paths/progress`                  | Postep sciezek           | page   | --      |

## Narzedzia

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/tools/check-in`                  | Samosprawdzenie          | page   | --      |
| `/tools/grounding-menu`            | Menu uziemienia          | page   | --      |
| `/tools/trigger-journal`           | Dziennik wyzwalaczy      | page   | --      |

## Video

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/video`                           | Lista filmow             | page   | --      |
| `/video/[slug]`                    | Pojedynczy film          | page   | --      |

## Webinary

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/webinars`                        | Nadchodzace webinary     | page   | --      |
| `/webinars/[slug]`                 | Szczegoly webinaru       | page   | --      |
| `/webinars/archive`                | Archiwum webinarow       | page   | --      |

## Quiz

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/quiz`                            | Quiz regulacji           | page   | --      |
| `/quiz/result`                     | Wynik quizu              | page   | --      |

## Zasoby

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/resources/glossary`              | Slownik                  | page   | --      |
| `/resources/glossary/[slug]`       | Haslo slownikowe         | page   | --      |
| `/resources/recommendations`       | Polecane                 | page   | --      |

## Newsletter

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/newsletter`                      | Zapis do newslettera     | page   | --      |

## Strony prawne

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/legal/privacy`                   | Polityka prywatnosci     | page   | --      |
| `/legal/cookies`                   | Polityka cookies         | page   | --      |
| `/legal/disclaimer`               | Zastrzezenia             | page   | --      |

## Konto uzytkownika

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/account`                         | Panel konta              | page   | user    |
| `/account/login`                   | Logowanie                | page   | --      |

## Administracja

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/admin`                           | Panel admina             | page   | admin   |
| `/admin/webinars`                  | Zarzadzanie webinarami   | page   | admin   |

## Endpointy API

| Trasa                              | Nazwa                    | Typ    | Auth    | Metody       |
| ---------------------------------- | ------------------------ | ------ | ------- | ------------ |
| `/api/auth/[...nextauth]`          | Autentykacja (NextAuth)  | api    | --      | GET, POST    |
| `/api/search`                      | Wyszukiwanie tresci      | api    | --      | GET          |
| `/api/contact`                     | Formularz kontaktowy     | api    | --      | POST         |
| `/api/newsletter`                  | Zapis do newslettera     | api    | --      | POST         |
| `/api/quiz/save`                   | Zapis wyniku quizu       | api    | user    | POST         |

## Kanal RSS

| Trasa                              | Nazwa                    | Typ    | Auth    |
| ---------------------------------- | ------------------------ | ------ | ------- |
| `/feed.xml`                        | Kanal RSS/Atom           | feed   | --      |
