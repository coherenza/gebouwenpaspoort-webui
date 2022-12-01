import "./Attributes.css";
import { useState } from "react";
import { Attribute, GBPObject } from "./schema";
import { Highlight } from "react-instantsearch-hooks-web";

interface DetailSectionProps {
  attribute: Attribute;
  hit: GBPObject;
}

/**
 * Renders a single section in the Details view, for one attribute.
 */
export function AttributeView({ attribute, hit }: DetailSectionProps) {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);
  return (
    <div className="Attribute">
      <div className="Attribute__title" onClick={toggleOpen}>
        {open ? "▼" : "▶"} {attribute.name}
      </div>
      {open && (
        <div className={"Attribute__content"}>
          {attribute.id && attribute.attributes ? (
            // The attribute represents an array of objects
            <AttributeList collection={attribute} hit={hit} />
          ) : attribute.attributes ? (
            // The attribute represents a collection of attributes
            attribute.attributes.map(att => (
              <PropValHighlights key={`${att.name} ${att.id}`} hit={hit} attribute={att} />
            ))
          ) : (
            // The attribute represents a single property
            <PropValHighlights hit={hit} attribute={attribute} />
          )}
        </div>
      )}
    </div>
  );
}

function AttributeList({ hit, collection }) {
  const items = hit[collection.id];
  if (!items) return null;
  return (
    <div className="Attribute__list">
      {items.map((item) => (
        collection.attributes.map((attribute) => (
          // We can't use Highlight here, or maybe we can, but I don't know how to pass a path for
          // a resource that is stored in an array (e.g. `prop[0].subProp`) to the `Highlight` component.
          <PropVal key={attribute.name} item={item[attribute.id]} attribute={attribute} />
        ))
      ))}
    </div>
  );
}

/** A single highlighted prop-val */
function PropValHighlights({ hit, attribute }) {

  return (
    <div className="Attribute__propval">
      <div className="Attribute__propval__key">{attribute.name}</div>
      <div className="Attribute__propval__value">
        <Highlight
          key={`val-${attribute.id}`}
          attribute={attribute.id}
          // @ts-ignore
          hit={hit}
          // @ts-ignore
          tagName="mark"
        />
      </div>
    </div>
  );
}

function PropVal({ item, attribute }) {
  if (!item) return null;
  return (
    <div className="Attribute__propval">
      <div className="Attribute__propval__key">{attribute.name}</div>
      <div className="Attribute__propval__value">{item.toString()}</div>
    </div>
  );
}
