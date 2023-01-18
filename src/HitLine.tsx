import { useContext } from "react";
import { Attributes, GBPObject, GBPObjectTypes } from "./schema";
import "./Hit.css";
import { AppContext } from "./App";
import { TrashIcon } from "@radix-ui/react-icons";

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

  if (!hit) return null;

  const active = current?.id === hit.id;
  const isAob = GBPObjectTypes["" + hit["bag-object-type"]].isAob;
  const color = GBPObjectTypes["" + hit["bag-object-type"]].color;
  const gesloopt = hit[Attributes.pand_status.id]?.includes("Pand gesloopt");

  return (
    <div
      className={active ? "Hit Hit--active" : "Hit"}
      onClick={() => {
        isAob
          ? setCurrent(hit)
          : setLocationFilter({ id: hit.id, name: hit.naam });
      }}
    >
      {/* Click on area-filter -> set filter on pdok-locatie-id == hit.id */}
      <div className="hit-naam">
        {isAob ? "" : "🔍 "}
        {hit["naam"]}
      </div>
      {gesloopt && <TrashIcon />}
      <div className="hit-type-wrapper">
        <div className="hit-type">{hit["bag-object-type"]}</div>
        <div
          className="hit-ball"
          style={{
            backgroundColor: color || "initial",
          }}
        />
      </div>
      {/* {prop && <Highlight attribute={prop} hit={hit} tagName="mark" />} */}
    </div>
  );
};
