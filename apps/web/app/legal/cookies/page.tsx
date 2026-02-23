import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka cookies',
  description: 'Informacje o plikach cookies uzywanych na stronie Aga - Joga Kundalini.',
};

export default function CookiesPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-8">
          Polityka cookies
        </h1>

        <div className="prose-custom space-y-8">
          <section>
            <h2>Czym sa pliki cookies?</h2>
            <p>
              Pliki cookies (ciasteczka) to male pliki tekstowe zapisywane w Twojej
              przegladarce. Pomagaja nam zapamietac Twoje preferencje i analizowac
              ruch na stronie.
            </p>
          </section>

          <section>
            <h2>Jakie cookies uzywamy</h2>

            <h3>Niezbedne</h3>
            <p>
              Konieczne do dzialania strony. Nie wymagaja zgody.
            </p>
            <ul>
              <li>Sesja uzytkownika (uwierzytelnianie)</li>
              <li>Preferencje trybu spokojnego</li>
            </ul>

            <h3>Analityczne</h3>
            <p>
              [Uzupelnij: czy uzywasz Google Analytics, Plausible, Umami itp.]
              Pomagaja nam zrozumiec, jak uzytkownicy korzystaja z serwisu.
            </p>

            <h3>Funkcjonalne</h3>
            <p>
              Zapamietuja Twoje ustawienia, np. wybrany jezyk lub tryb wyswietlania.
            </p>
          </section>

          <section>
            <h2>localStorage</h2>
            <p>
              Korzystamy takze z localStorage (pamiec lokalna przegladarki) do
              przechowywania:
            </p>
            <ul>
              <li>Postepu w sciezkach praktyk</li>
              <li>Listy ulubionych</li>
              <li>Ustawien trybu spokojnego</li>
              <li>Wpisow dziennika reakcji</li>
            </ul>
            <p>
              Dane te nie sa wysylane na nasz serwer. Pozostaja wylacznie w Twojej
              przegladarce.
            </p>
          </section>

          <section>
            <h2>Zarzadzanie cookies</h2>
            <p>
              Mozesz w kazdej chwili zmienic ustawienia cookies w swojej przegladarce.
              Wylaczenie niektorych cookies moze wplynac na dzialanie strony.
            </p>
            <p>
              [Uzupelnij: link do ustawien cookies przegladarek lub panel zarzadzania cookies.]
            </p>
          </section>

          <section>
            <h2>Zmiany</h2>
            <p>
              Zastrzegamy sobie prawo do zmian w niniejszej polityce cookies. O istotnych
              zmianach poinformujemy na stronie.
            </p>
          </section>

          <p className="text-sm text-earth-400 mt-8">
            Ostatnia aktualizacja: [Uzupelnij: data]
          </p>
        </div>
      </div>
    </div>
  );
}
