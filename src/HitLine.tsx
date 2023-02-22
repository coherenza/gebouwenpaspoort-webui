import { useContext } from "react";
import { Attributes, GBPObject, GBPObjectTypes, getObjectType } from "./schema";
import "./Hit.css";
import { AppContext } from "./App";
import { TrashIcon } from "@radix-ui/react-icons";

interface HitProps {
  hit: GBPObject;
}

// maps bag statuses to
const statusMapping = {
  "Verblijfsobject in gebruik": null,
  "Verblijfsobject in gebruik (niet ingemeten)": null,
  "Plaats aangewezen": <TrashIcon />,
  "Plaats ingetrokken": <TrashIcon />,
  "Verblijfsobject ingetrokken": <TrashIcon />,
  "Verbouwing verblijfsobject": <TrashIcon />,
  "Verblijfsobject gevormd": <TrashIcon />,
  "Niet gerealiseerd verblijfsobject": <TrashIcon />,
  "Verblijfsobject buiten gebruik": <TrashIcon />,
  "Verblijfsobject ten onrechte opgevoerd": <TrashIcon />,
};

function getStatusIcon(status: string) {
  return statusMapping[status];
}

function shouldShowStatus(status: string) {
  return !!statusMapping[status];
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
  const { isAob, color } = getObjectType(current);

  const status = hit[Attributes.bag_status.id];

  const adres = `${hit[Attributes.straatnaam.id]} ${
    hit[Attributes.huisnummerLetter.id]
  }`;

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
        {isAob ? adres : hit["naam"]}
      </div>
      <div className="hit-type-wrapper">
        {status && shouldShowStatus(status) && (
          <span title={status}>{getStatusIcon(status)}</span>
        )}
        {/* <div className="hit-type">{hit["bag-object-type"]}</div> */}
        <div
          className="hit-ball"
          title={hit["bag-object-type"]}
          style={{
            backgroundColor: color || "initial",
          }}
        />
      </div>
      {/* {prop && <Highlight attribute={prop} hit={hit} tagName="mark" />} */}
    </div>
  );
};
