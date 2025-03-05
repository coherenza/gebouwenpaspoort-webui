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
import CustomIcons from "./Icons";
import { useMap } from "react-map-gl";
import { zoomStreetLevel } from "./Map";

interface HitProps {
  hit: GBPObject;
}

// maps bag statuses to icons
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

// icons for different object types
const icons = Object.fromEntries(
  CustomIcons.map((icon) => {
    const customIcon = new Image(24, 24);
    customIcon.src = icon.src;
    return [icon.name, customIcon];
  })
);

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
  const { isAob, color, label, icon } = getObjectType(hit);

  const status = hit["bag-aob"]
    ? hit["bag-aob"][Attributes.bag_aob_status.id]
    : undefined;
  const adres = `${hit.hoofdadres?.["bag-opr-naam"]} ${
    hit.hoofdadres?.["bag-num-huisnummer-letter-aanduiding"]
  }`;

  const handleClick = useCallback(() => {
    if (isAob) {
      let { lng, lat } = hit._geo;
      setLastInteractionOrigin("results");
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
        title={isAob ? hit["bag-object-type"] : hit[displayAttributes[0].id]}
      >
        {isAob ? "" : icon ? [ <img src={icons[icon].src} alt={label} title={label} className="Icon"/>, " " ] : "🔍 "}
        {isAob ? adres : hit[displayAttributes[0].id]}
      </div>
      <div className="hit-type-wrapper">
        {status && shouldShowStatus(status) && (
          <span title={status}>{getStatusIcon(status)}</span>
        )}
        {/* <div className="hit-type">{hit["bag-object-type"]}</div> */}
        {/* icon ? <img src={icons[icon].src} height="24" width="24"/> : "" */}
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
