import { useCallback, useContext } from "react";
import { Attributes, GBPObject, GBPObjectTypes, getObjectType } from "./schema";
import "./Hit.css";
import { AppContext } from "./App";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMap } from "react-map-gl";

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

const streetLevel = 18;

export const HitLine = ({ hit }: HitProps) => {
  const { current, setCurrent, setLocationFilter, setLastInteractionOrigin } =
    useContext(AppContext);
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
  const { isAob, color } = getObjectType(hit);

  const status = hit[Attributes.bag_aob_status.id];
  const adres = `${hit.hoofdadres['bag-opr-naam']} ${hit.hoofdadres['bag-num-huisnummer-letter-aanduiding']}`;

  const handleClick = useCallback(() => {
    if (isAob) {
      let { lng, lat } = hit._geo;
      setLastInteractionOrigin("results");
      map.flyTo({
        center: [lng, lat],
        animate: true,
        zoom: streetLevel,
        duration: 1000,
      });
      setCurrent(hit);
    } else {
      setLocationFilter({ id: hit.id, name: hit.naam });
    }
  }, [hit, isAob, setCurrent, setLastInteractionOrigin, setLocationFilter]);

  return (
    <div className={active ? "Hit Hit--active" : "Hit"} onClick={handleClick}>
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
