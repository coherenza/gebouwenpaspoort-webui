import { useCallback, useContext } from "react";
import {
  Attributes,
  displayAttributes,
  GBPObject,
  getObjectType,
} from "./schema";
import "./Hit.css";
import { AppContext } from "./App";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMap } from "react-map-gl";
import { zoomStreetLevel } from "./Map";

interface HitProps {
  hit: GBPObject;
}

// maps bag statuses to
const statusMapping = {
  "Verblijfsobject in gebruik": null,
  "Verblijfsobject in gebruik (niet ingemeten)": null,
  "Plaats aangewezen": null,
  "Verbouwing verblijfsobject": null,
  "Verblijfsobject gevormd": null,
  "Plaats ingetrokken": <TrashIcon />,
  "Verblijfsobject ingetrokken": <TrashIcon />,
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
  const {
    current,
    setCurrent,
    setLocationFilter,
    setLastInteractionOrigin,
    setShowDetails,
  } = useContext(AppContext);
  let { mainMap: map } = useMap();

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
  const { isAob, color, label } = getObjectType(hit);

  const status = hit["bag-aob"]
    ? hit["bag-aob"][Attributes.bag_aob_status.id]
    : undefined;
  const adres = `${hit.hoofdadres?.["bag-opr-naam"]} ${
    hit.hoofdadres?.["bag-num-huisnummer-letter-aanduiding"]
  }`;

  const handleClick = useCallback(() => {
    if (isAob) {
      let { lng, lat } = hit._geo;
      setLastInteractionOrigin("mapClick");
      map.flyTo({
        center: [lng, lat],
        animate: true,
        zoom: zoomStreetLevel,
        duration: 1000,
      });
      setCurrent(hit);
      setShowDetails(true);
    } else {
      setLocationFilter({ id: hit.id, name: hit.naam });
    }
  }, [hit, isAob, setCurrent, setLastInteractionOrigin, setLocationFilter]);

  return (
    <div className={active ? "Hit Hit--active" : "Hit"} onClick={handleClick}>
      {/* Click on area-filter -> set filter on pdok-locatie-id == hit.id */}
      <div
        className={`hit-naam ${
          status && shouldShowStatus(status) ? "hit-naam__deleted" : ""
        }`}
        title={isAob ? hit[displayAttributes[0].id] : hit["bag-object-type"]}
      >
        {isAob ? "" : "🔍 "}
        {isAob ? adres : hit[displayAttributes[0].id]}
      </div>
      <div className="hit-type-wrapper">
        {status && shouldShowStatus(status) && (
          <span title={status}>{getStatusIcon(status)}</span>
        )}
        {/* <div className="hit-type">{hit["bag-object-type"]}</div> */}
        <div
          className="hit-ball"
          title={hit["bag-object-type"] || label}
          style={{
            backgroundColor: color || "initial",
          }}
        />
      </div>
      {/* {prop && <Highlight attribute={prop} hit={hit} tagName="mark" />} */}
    </div>
  );
};
