import "./Tour.css";

import type { StepType } from "@reactour/tour";

export const tourSteps: StepType[] = [
  {
    selector: ".app-header",
    content: "Welkom bij GebouwenPaspoort! Hier zoek je naar straatnamen, wijken of buurten.",
  },
  {
    selector: ".filter-panel",
    content: "Zet hier filters aan of uit.",
  },
  {
    selector: ".Results--open",
    content: "Dit zijn de resultaten van je zoekopdracht.",
  },
  {
    selector: "#copy-results",
    content: "Maak een deelbare link van je zoekopdracht en kopieer hem.",
  },
  {
    selector: "#close-results",
    content: "Sluit panelen als je meer ruimte wil hebben",
  },
  {
    selector: "#toggle-layers-view",
    content: "Je kunt extra lagen toevoegen, zoals satelietfoto's",
  },
  {
    selector: "#reset",
    content: "Terug naar start? Verwijder je zoekopdracht en filters met Reset.",
  },
  {
    selector: "#feedback-button",
    content: "Klachten of wensen? Geef hier feedback.",
  },
  {
    selector: "#root",
    content: "Klik op het kruisje om deze help te sluiten. Veel plezier met GebouwenPaspoort!",
  },
];
