import React, { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Highlight } from "react-instantsearch-dom";
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

/** A single SearchResult */
export const HitLineDialog = ({ hit }: HitProps) => {
  return (
    <Dialog.Root key={hit.id}>
      <Dialog.Trigger className="Hit">{hit["bag-num-volledig"]}</Dialog.Trigger>
      <Dialog.Portal>
        <>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              {hit["bag-num-volledig"] || "geen adres"}
            </Dialog.Title>
            <HitProps hit={hit} />
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

/** Render all property-value combinations available */
export const HitProps = ({ hit }: HitProps) => {
  return (
    <div className="HitProps">
      {Object.entries(hit).map(([key, _value]) => {
        let shown_key = key.replace(
          /^(bag-aob-|bag-opr-|bag-num-|bwk-num-|squitxo_)/,
          ""
        );
        // if (typeof _value == "object") {
        //   return null
        // }
        return (
          <>
            <strong key={`prop-${key}`}>{shown_key}: </strong>
            <Highlight
              key={`val-${key}`}
              attribute={key}
              hit={hit}
              tagName="mark"
            />
          </>
        );
      })}
    </div>
  );
};
