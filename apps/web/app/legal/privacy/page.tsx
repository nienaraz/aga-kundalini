import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka prywatnosci',
  description: 'Polityka prywatnosci serwisu Aga - Joga Kundalini. Zgodna z RODO.',
};

export default function PrivacyPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-8">
          Polityka prywatnosci
        </h1>

        <div className="prose-custom space-y-8">
          <section>
            <h2>1. Administrator danych</h2>
            <p>
              Administratorem Twoich danych osobowych jest [Uzupelnij: pelna nazwa,
              adres, NIP/REGON]. Kontakt: [Uzupelnij: adres e-mail].
            </p>
          </section>

          <section>
            <h2>2. Jakie dane zbieramy</h2>
            <p>W ramach korzystania z serwisu mozemy zbierac:</p>
            <ul>
              <li>Adres e-mail (przy zapisie na newsletter lub kontakcie)</li>
              <li>Imie (przy uzyciu formularza kontaktowego)</li>
              <li>Dane techniczne (adres IP, typ przegladarki, system operacyjny)</li>
              <li>Dane z plikow cookies (patrz: Polityka cookies)</li>
            </ul>
          </section>

          <section>
            <h2>3. Cel przetwarzania</h2>
            <p>Twoje dane przetwarzamy w celu:</p>
            <ul>
              <li>Wysylki newslettera (podstawa: Twoja zgoda, art. 6 ust. 1 lit. a RODO)</li>
              <li>Odpowiedzi na wiadomosci (podstawa: prawnie uzasadniony interes, art. 6 ust. 1 lit. f RODO)</li>
              <li>Analizy statystycznej ruchu na stronie (podstawa: prawnie uzasadniony interes)</li>
            </ul>
          </section>

          <section>
            <h2>4. Okres przechowywania</h2>
            <p>
              Dane przechowujemy przez okres niezbedny do realizacji celu, dla ktorego
              zostaly zebrane. Dane newsletterowe – do momentu wypisania sie. Dane
              kontaktowe – do 12 miesiecy od ostatniego kontaktu.
            </p>
          </section>

          <section>
            <h2>5. Twoje prawa</h2>
            <p>Masz prawo do:</p>
            <ul>
              <li>Dostepu do swoich danych</li>
              <li>Sprostowania danych</li>
              <li>Usuniecia danych (&quot;prawo do bycia zapomnianym&quot;)</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
              <li>Cofniecia zgody w dowolnym momencie</li>
              <li>Wniesienia skargi do Prezesa UODO</li>
            </ul>
          </section>

          <section>
            <h2>6. Przekazywanie danych</h2>
            <p>
              [Uzupelnij: informacja o podmiotach przetwarzajacych dane, np. dostawca
              hostingu, serwis mailingowy, narzedzia analityczne.]
            </p>
          </section>

          <section>
            <h2>7. Dane lokalne</h2>
            <p>
              Niektore funkcje serwisu (np. postep w sciezkach, ulubione, dziennik reakcji)
              przechowuja dane wylacznie w Twojej przegladarce (localStorage). Te dane nie
              sa przesylane na nasz serwer.
            </p>
          </section>

          <section>
            <h2>8. Zmiany</h2>
            <p>
              Zastrzegamy sobie prawo do zmian w niniejszej polityce. O istotnych zmianach
              poinformujemy na stronie glownej lub przez newsletter.
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
