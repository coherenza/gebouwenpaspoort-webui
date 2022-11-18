import { useContext } from "react";
import { Gebouw } from "./schema";
import "./Hit.css";
import { AppContext } from "./App";

interface HitProps {
  hit: Gebouw;
}

export const HitLine = ({ hit }: HitProps) => {
  const { current, setCurrent } = useContext(AppContext);

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

  return (
    <div
      className={active ? "Hit Hit--active" : "Hit"}
      onClick={() => setCurrent(hit)}
    >
      {hit["bag-num-volledig"]}
      {/* {prop && <Highlight attribute={prop} hit={hit} tagName="mark" />} */}
    </div>
  );
};
