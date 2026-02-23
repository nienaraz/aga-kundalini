import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zastrzezenia medyczne',
  description: 'Zastrzezenia dotyczace charakteru edukacyjnego tresci na stronie Aga - Joga Kundalini.',
};

export default function DisclaimerPage() {
  return (
    <div className="section-spacing">
      <div className="content-container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl text-earth-900 mb-8">
          Zastrzezenia medyczne
        </h1>

        <div className="prose-custom space-y-8">
          {/* Main disclaimer */}
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-6">
            <p className="text-rose-800 font-medium leading-relaxed">
              Tresci zamieszczone na tej stronie maja charakter wylacznie edukacyjny
              i informacyjny. Nie stanowia porady medycznej, psychologicznej ani
              terapeutycznej.
            </p>
          </div>

          <section>
            <h2>Charakter tresci</h2>
            <p>
              Materialy na tej stronie – artykuly, praktyki, sciezki i narzedzia –
              powstaly w celach edukacyjnych. Ich celem jest zwiekszenie swiadomosci
              na temat dzialania ukladu nerwowego i mozliwosci jego regulacji.
            </p>
            <p>
              Tresci nie powinny byc traktowane jako zamiennik profesjonalnej opieki
              medycznej, psychologicznej lub psychiatrycznej.
            </p>
          </section>

          <section>
            <h2>Kiedy szukac pomocy profesjonalnej</h2>
            <p>Skonsultuj sie z lekarzem lub specjalista, jesli:</p>
            <ul>
              <li>Doswiadczasz chronicznego bolu, zawrotow glowy lub dusznosci</li>
              <li>Masz zdiagnozowane zaburzenia psychiczne lub neurologiczne</li>
              <li>Podczas praktyki pojawia sie silny lak, dysocjacja lub panika</li>
              <li>Jestes w ciazy lub po niedawnej operacji</li>
              <li>Czujesz, ze potrzebujesz wsparcia, ktorego nie zapewni strona internetowa</li>
            </ul>
          </section>

          <section>
            <h2>Odpowiedzialnosc</h2>
            <p>
              Praktyki prezentowane na stronie wykonujesz na wlasna odpowiedzialnosc.
              Autorka strony nie ponosi odpowiedzialnosci za skutki wynikajace z
              zastosowania prezentowanych tresci.
            </p>
            <p>
              Zawsze sluchaj swojego ciala. Jesli cos Cie niepokoi – przerwij praktyke
              i wroc do prostego, spokojnego oddechu.
            </p>
          </section>

          <section>
            <h2>Kwalifikacje autorki</h2>
            <p>
              [Uzupelnij: informacje o kwalifikacjach Agi – certyfikaty nauczycielskie
              jogi kundalini, ewentualne szkolenia z zakresu pracy z traumie,
              somatyki, regulacji nerwowej itp.]
            </p>
          </section>

          <section>
            <h2>Zrodla wiedzy</h2>
            <p>
              Tresci na stronie opieraja sie na aktualnej wiedzy z zakresu neurobiologii,
              teorii poliwagalnej i tradycji jogi kundalini. Staramy sie cytowac zrodla
              tam, gdzie to mozliwe.
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
