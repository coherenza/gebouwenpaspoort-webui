export function InfoPage() {
  return (
    <>
      <article>
        <h1>Gebouwenpaspoort</h1>

        <p>Versie 0.2, december 2022</p>

        <h2>Introductie</h2>

        <p>Het Gebouwenpaspoort is een webapplicatie waarmee eindgebruikers kunnen zoeken in adressen in de gemeente Utrecht en 
          hieraan gerelateerde beschrijvende gegevens (zoals bouwtechnische milieu en energie-kenmerken) die over adressen en gebouwen 
          bekend zijn in diverse interne en externe bronsystemen.</p>

        <p>Deze beschrijvende kenmerken worden ingelezen in het Gebouwenpaspoort en gerelateerd aan adresseerbare objecten of andere 
          objecten uit de Basisregistratie Adressen en Gebouwen (BAG), zoals panden en openbare ruimten (straten). Het streven is 
          erop gericht om hierbij zoveel als mogelijk gebruik te maken van gestandaardiseerde termen, zoals NL/SfB van Ketenstandaard 
          bouw en techniek. Dit verhoogt het begrip en de uitwisselbaarheid van gegevens. Zie <a 
          href="https://gbp2.pandata.nl/sfb-bouwtechnische-kenmerken.html" target="_blank">NL/SfB Tabel-1: Functionele 
          gebouwelementen</a>.</p>

        <p>Het Gebouwenpaspoort bevat alleen de noodzakelijke gegevens om zoekopdrachten van eindgebruikers te kunnen beantwoorden. 
          Het is de bedoeling dat eindgebruikers via een hyperlink kunnen doorspringen naar het bronsysteem, waarin zij vervolgens
          alle beschikbare informatie kunnen raadplegen.</p>

        <h2>Gegevens</h2>
        <p>De volgende gegevens zijn opgenomen in deze versie van het Gebouwenpaspoort.</p>

        <ul>
          <li><em>Woonplaatsen, Openbare ruimten en Adresseerbare objecten</em> (Standplaatsen, ligplaatsen en Verblijfsobjecten), afkomstig
            uit Basisregistratie Adressen en Gebouwen (BAG) van Kadaster.</li>
          <li><em>Wijken en Buurten</em>, uit de Gebiedsindelingen van CBS.</li>
          <li><em>Bouwtechnische kenmerken</em>, uit de interne bronsystemen Kwaliteitsmonitor en project Stalen liggers.</li>
          <li><em>Zaakgegegevens</em> uit het interne bronsysteem Squitxo.</li>
          <li><em>Officiële Bekendmakingen</em>, die zijn gepubliceerd in o.a. Staatscourant, Gemeenteblad, Provinciaal blad, Waterschapsblad 
            en Blad gemeenschappelijke regeling en gekoppeld kunnen worden aan BAG objecten in Gemeente Utrecht.</li>
          <li><em>Energielabels</em>, uit EP-Online, de officiële landelijke database waarin energielabels en energieprestatie-indicatoren van 
            gebouwen zijn opgenomen.</li>
          <li><em>Zonnepanelen</em>, uit de Zon op Dak analyse 2022.</li>
          <li><em>Monumentenlijst</em>.</li>
        </ul>
      </article>
    </>
  );
}
