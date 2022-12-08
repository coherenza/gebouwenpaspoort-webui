import { useContext } from "react";
import { GBPObject, GBPObjectTypes } from "./schema";
import "./Hit.css";
import { AppContext } from "./App";

interface HitProps {
  hit: GBPObject;
}


export const HitLine = ({ hit }: HitProps) => {
  const { current, setCurrent, setLocationFilter } = useContext(AppContext);

  // function findHightLightedProp() {
  //   for (const prop of Object.keys(hit._highlightResult)) {
  //     const val = hit._highlightResult[prop]?.value;
  //     if (val?.includes?.("ais-highlight")) {
  //       return prop;
  //     }
  //   }
  // }

  // let prop = findHightLightedProp();

  const active = current?.id === hit.id;

  const isAob = hit && GBPObjectTypes[""+hit["bag-object-type"]].isAob;

  const color = hit && GBPObjectTypes[""+hit["bag-object-type"]].color;

  return (
    <div
      className={active ? "Hit Hit--active" : "Hit"}
      onClick={() => { isAob ? setCurrent(hit) : setLocationFilter({id: hit.id, name: hit.naam}) } }
    >
      {/* Click on area-filter -> set filter on pdok-locatie-id == hit.id */}
      <div className="hit-naam">{isAob ? '' : '🔍 '}{hit["naam"]}</div>
      <div className="hit-type" style={{
        color: color || 'initial'
      }}>{hit["bag-object-type"]}</div>
      {/* {prop && <Highlight attribute={prop} hit={hit} tagName="mark" />} */}
    </div>
  );
};
