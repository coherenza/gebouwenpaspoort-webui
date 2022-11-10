import React from "react";

import {
  Highlight,
  Snippet
} from "react-instantsearch-dom";
import { Gebouw } from "./schema";

interface HitProps {
  hit: Gebouw;
}

export const Hit = ({ hit }: HitProps) => (
  <div key={hit.id}>
    <div className="hit-name">
      <Highlight attribute="name" hit={hit} />
    </div>
    <div className="hit-description">
      <Snippet attribute="epl_pand_gebouwtype_s" hit={hit} />
    </div>
  </div>
);
