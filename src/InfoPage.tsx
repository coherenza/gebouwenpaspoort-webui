import "./InfoPage.css";
import { GBPObjectTypes } from "./schema";
import { server, version } from "./config";

export function InfoPage() {
  return (
    <>
      <article>
        <h1>Gebouwenpaspoort</h1>

        <p>
          Versie {version} (data van{" "}
          {server.replace(/^https?:\/\//, "").replace(
            /^([A-Za-z0-9]+).*/,
            "$1",
          )})
        </p>

        <h2>Introductie</h2>

        <p>
          Het Gebouwenpaspoort is een webapplicatie voor eindgebruikers die
          informatie zoeken over gebouwen in de gemeente Utrecht. Deze
          informatie bestaat uit beschrijvende kenmerken over onderwerpen zoals
          bouw, milieu en energie die beschikbaar zijn in interne en externe
          bronsystemen. Een voorbeeld van een zoekopdracht is: Welke panden, met
          een bouwjaar tussen 1950 en 1960 hebben zonnepanelen?
        </p>

        <p>
          Deze beschrijvende kenmerken worden ingelezen in het Gebouwenpaspoort
          en gerelateerd aan adresseerbare objecten of andere objecten uit de
          Basisregistratie Adressen en Gebouwen (BAG), zoals panden en openbare
          ruimten (straten). Het streven is erop gericht om de gebruikte
          terminologie te standaardiseren. Dat doen we door aan te sluiten bij
          gestandaardiseerde begrippenkaders, zoals NL/SfB van Ketenstandaard
          bouw en techniek. Dit verhoogt de herkenbaarheid en de
          uitwisselbaarheid van gegevens. Zie{" "}
          <a
            href="/sfb-bouwtechnische-kenmerken.html"
            target="_blank"
          >
            NL/SfB Tabel-1: Functionele gebouwelementen
          </a>{" "}
          voor een voorbeeld van een begrippenkader.
        </p>

        <p>
          Het Gebouwenpaspoort bevat alleen de noodzakelijke gegevens om
          zoekopdrachten van eindgebruikers te kunnen beantwoorden. Het is de
          bedoeling dat eindgebruikers via een hyperlink kunnen doorspringen
          naar het desbetreffende bronsysteem, waarin zij vervolgens alle
          beschikbare informatie kunnen raadplegen.
        </p>

        <h2>Legenda</h2>
        <p>
          Na een zoekopdracht toont het gebouwenpaspoort de volgende
          informatietypen op de kaart en in het resultaat. Je kunt de betekenis
          van de kleuren zien door er met je muis over te hoveren, of in de
          lijst hieronder:
        </p>
        <ul>
          {Object.values(GBPObjectTypes).map((type) => (
            <li key={type.id} className="legend-item">
              <div
                className="hit-ball"
                style={{ backgroundColor: type.color }}
              >
              </div>{" "}
              {type.label}
            </li>
          ))}
        </ul>

        <h2>Gegevens</h2>
        <p>
          De volgende gegevens zijn opgenomen in deze versie van het
          Gebouwenpaspoort.
        </p>

        <ul>
          <li>
            <em>Woonplaatsen, Openbare ruimten en Adresseerbare objecten</em>
            {" "}
            (Standplaatsen, ligplaatsen en Verblijfsobjecten), afkomstig uit
            Basisregistratie Adressen en Gebouwen (BAG) van Kadaster.
          </li>
          <li>
            <em>Wijken en Buurten</em>, uit de Gebiedsindelingen van CBS.
          </li>
          <li>
            <em>Bouwtechnische kenmerken</em>, uit de interne bronsystemen
            Kwaliteitsmonitor en project Stalen liggers.
          </li>
          <li>
            <em>Zaakgegegevens</em> uit het interne bronsysteem Squitxo.
          </li>
          <li>
            <em>Officiële Bekendmakingen</em>, die zijn gepubliceerd in o.a.
            Staatscourant, Gemeenteblad, Provinciaal blad, Waterschapsblad en
            Blad gemeenschappelijke regeling en gekoppeld kunnen worden aan BAG
            objecten in Gemeente Utrecht.
          </li>
          <li>
            <em>Energielabels</em>, uit EP-Online, de officiële landelijke
            database waarin energielabels en energieprestatie-indicatoren van
            gebouwen zijn opgenomen.
          </li>
          <li>
            <em>Zonnepanelen</em>, uit de Zon op Dak analyse 2022.
          </li>
          <li>
            <em>Monumentenlijst</em>.
          </li>
        </ul>
      </article>
    </>
  );
}
