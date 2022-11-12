import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Highlight } from "react-instantsearch-hooks-web";
import { Gebouw } from "./schema";
import "./Hit.css";
import { Hit } from "meilisearch";

interface HitProps {
  hit: Hit<Gebouw>;
}

/** A single SearchResult */
export const MyHit = ({ hit }: HitProps) => {
  return (
    <Dialog.Root key={hit.id}>
      <Dialog.Trigger className="Hit">{hit["bag-num-volledig"]}</Dialog.Trigger>
      <Dialog.Portal>
        <>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              {hit["bag-num-volledig"] || 'geen adres'}
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
const HitProps = ({ hit }: HitProps) => {
  return (
    <div className="HitProps">
      {Object.entries(hit).map(([key, value]) => {
        return (
          <>
            <strong>{key}: </strong>
            <Highlight attribute={key} hit={hit} tagName="mark" />
          </>
        );
      })}
    </div>
  );
};
