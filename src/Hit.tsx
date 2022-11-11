import React from "react";

import {
  Highlight,
  Snippet
} from "react-instantsearch-dom";
import { Gebouw } from "./schema";

interface HitProps {
  hit: Gebouw;
}

/** A single SearchResult */
export const Hit = ({ hit }: HitProps) => (
  <div key={hit.id}>
    <div className="hit-name">
      <Highlight attribute="bag-num-volledig" hit={hit} />
    </div>
    <div className="hit-description">
      <Snippet attribute="bag-num-volledig" hit={hit} />
    </div>
  </div>
);
