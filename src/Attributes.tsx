import "./Attributes.css";
import { useState } from "react";
import { Attribute, GBPObject } from "./schema";
import {
  Highlight,
  useCurrentRefinements,
} from "react-instantsearch-hooks-web";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";

interface DetailSectionProps {
  attribute: Attribute;
  hit: GBPObject;
}

function nothingToSee(value) {
  const nTS =
    value == undefined ||
    value == null ||
    value == "" ||
    typeof value == "symbol" ||
    typeof value == "function" ||
    (Array.isArray(value) && value.length == 0);
  // typeof (value) == 'object' && Object.entries(value).length == 0 ||
  // typeof (value) == 'object' && Object.keys(value).every(k => nothingToSee(value[k]))
  return nTS;
}

/**
 * Renders a single section in the Details view, for one attribute.
 */
export function AttributeView({ attribute, hit, selectedAttributes }) {
  const isCollection = Array.isArray(hit[attribute.id]) && !!attribute.attributes;
  const count = isCollection && hit[attribute?.id]?.length || 0;

  if (!attribute.attributes) {
    return (
      <PropValHighlights
        hit={hit}
        key={`pvhe_${attribute.id}`}
        attribute={attribute}
        useHighlight
        selectedAttributes={selectedAttributes}
      />
    );
  } else if (isCollection && count == 0) {
    return false; // https://medium.com/@davidkelley87/stop-using-return-null-in-react-a2ebf08fc9cd
  } else if ( !isCollection && attribute.attributes.every((a) => !!hit[attribute.id] && nothingToSee(hit[attribute.id][a.id])) ) {
    // Do not show attribute sets when all attributes are empty.
    return false;
  } else if (!isCollection && hit[attribute.id] == undefined) {
    return false;
  } else {
    return (
      <AttributeCollapsible
        attribute={attribute}
        showCount={isCollection}
        count={count}
      >
        {isCollection ? (
          <AttributeCollection collection={attribute} hit={hit} />
        ) : (
          // The attribute represents an unidentified list of property-value combinations
          attribute.attributes.map(
            (att) =>
              att &&
              att.name &&
              att.id && (
                <PropValHighlights
                  selectedAttributes={selectedAttributes}
                  key={`pvha_${att.id}`}
                  hit={hit[attribute.id]}
                  attribute={att}
                  useHighlight={true}
                />
              )
          )
        )}
      </AttributeCollapsible>
    );
  }
}

interface AttributeTitleProps {
  attribute: Attribute;
  showCount?: boolean;
  count?: number;
  children?: React.ReactNode;
}

export function AttributeCollapsible({
  attribute,
  showCount,
  count,
  children,
}: AttributeTitleProps) {
  const [open, setOpen] = useState(false);
  const { items: selectedAttributes } = useCurrentRefinements();

  return (
    <div className="Attribute">
      <div className="Attribute__title" onClick={() => setOpen(!open)}>
        {open ? <ChevronDownIcon /> : <ChevronRightIcon />} {attribute.name}{" "}
        {showCount && `(${count})`}
      </div>
      {
        <div className={"Attribute__content__" + (open ? "open" : "closed")}>
          {children}
        </div>
      }
    </div>
  );
}

function AttributeCollection({ hit, collection }) {
  const items = hit[collection.id];
  if (!items) return null;
  return (
    <div className="Attribute__list">
      {items.map((item, i) => (
        <AttributeItem
          key={`${item.id}${i}`}
          hit={hit}
          attribute={collection}
          item={item}
          collection={collection}
          startOpen={items.length == 1}
          i={i}
        />
      ))}
    </div>
  );
}

function AttributeItem({ hit, attribute, item, collection, i, startOpen = false }) {
  const [open, setOpen] = useState(startOpen);

  const title = (Array.isArray(item[collection.attributes[0].id])) ? item[collection.attributes[0].id][0] : item[collection.attributes[0].id];

  return (
    <div className="Attribute__item" key={`${item.id}${i}`}>
      <h4 className="Attribute__item__title" onClick={() => setOpen(!open)}>
        {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
        {title}
      </h4>
      {open &&
        collection.attributes.map((attribute) => (
          // We can't use Highlight here, or maybe we can, but I don't know how to pass a path for
          // a resource that is stored in an array (e.g. `prop[0].subProp`) to the `Highlight` component.
          <PropValHighlights
            key={'pvhi_'+attribute.id}
            hit={item[attribute.id]}
            attribute={attribute}
          />
        ))}
    </div>
  );
}

/** A single highlighted prop-val */
function PropValHighlights({
  hit,
  attribute,
  useHighlight = false,
  selectedAttributes = [],
}) {
  if (!hit || nothingToSee(hit)) return null;

  let selected = false;
  selectedAttributes.forEach((a) => {
    if (a.attribute === attribute.id) selected = true;
  });

  const isLink = attribute.type == "URL";

  let hitValue =
    ( Array.isArray(hit)
    ? hit.join('\n')
    : typeof(hit) == 'object'
    ? hit[attribute.id]
    : hit
    );

  if (hitValue == undefined) return null;

  return (
    <div
      className={`Attribute__propval ${
        selected ? "Attribute__propval--selected" : ""
      }`}
    >
      {" "}
      {
        isLink ? ( <a
            className="Attribute__link"
            href={hitValue}
            target="_blank"
          >
            {attribute.name}
            <ExternalLinkIcon />
          </a>
        ) : (
          <>
            <div className="Attribute__propval__key">{attribute.name}</div>
            <div className="Attribute__propval__value">
              {useHighlight && false ? (
                <Highlight
                  key={`val-${attribute.id}`}
                  attribute={attribute.id}
                  // @ts-ignore
                  hit={hitValue}
                  // @ts-ignore
                  tagname="mark"
                />
              ) : (
                hitValue?.toString().split('\n').map((hv) => ( <div>{hv}</div> ))
              )}
            </div>
          </>
        )
      }
    </div>
  );
}
