import "./Attributes.css";
import { useState } from "react";
import { Attribute, GBPObject } from "./schema";
import {
  Highlight,
  useCurrentRefinements,
} from "react-instantsearch-hooks-web";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { Attributes } from "./schema";

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
  const isCollection =
    Array.isArray(hit[attribute.id]) && !!attribute.attributes;
  const count = (isCollection && hit[attribute?.id]?.length) || 0;

  if (!attribute.attributes) {
    return (
      <div className="Attribute__item" key={`ai_${attribute.id}`}>
        <PropValHighlights
          hit={hit}
          key={`pvhe_${attribute.id}`}
          attribute={attribute}
          useHighlight
          selectedAttributes={selectedAttributes}
        />
      </div>
    );
  } else if (isCollection && count == 0) {
    return false; // https://medium.com/@davidkelley87/stop-using-return-null-in-react-a2ebf08fc9cd
  } else if (
    !isCollection &&
    attribute.attributes.every(
      (a) => !!hit[attribute.id] && nothingToSee(hit[attribute.id][a.id])
    )
  ) {
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
          // The attribute represents an unidentified list of property-value combinations.
          <div className="Attribute__item" key={`ai_${attribute.id}`}>
            {attribute.attributes.map(
              (att, index) =>
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
            )}
          </div>
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
  return (
    <div className="Attribute">
      <div
        className={"Attribute__title__" + (open ? "open" : "closed")}
        onClick={() => setOpen(!open)}
      >
        {attribute.name} {showCount && `(${count})`}
        <span className="icon">
          {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </span>
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
  const { items } = useCurrentRefinements();
  // item = {"indexName":"gbp:location-sort-value:asc","indexId":"gbp","attribute":"zaakgegevens.zk-soort","label":"zaakgegevens.zk-soort","refinements":[{"attribute":"zaakgegevens.zk-soort","type":"disjunctive","value":"Projectcontrole Breedplaatvloeren","label":"Projectcontrole Breedplaatvloeren","count":12},{"attribute":"zaakgegevens.zk-soort","type":"disjunctive","value":"Projectcontrole BAR","label":"Projectcontrole BAR","count":310}]}
  // attribute = {"name":"Zaaksoort","type":"string","id":"zk-soort"}
  // refinement = {"attribute":"zaakgegevens.zk-soort","type":"disjunctive","value":"Projectcontrole BAR","label":"Projectcontrole BAR","count":310}
  // [[attribute, [refinement...]]...]
  const refinedAttributeValues =
    items.map((item) => {
      let attribute = Object.values(Attributes).find(a => a.id == item.attribute.replace(/.*\./, ''));
      return [ attribute, item.refinements ]
    });

  const hitItems = hit[collection.id];
  if (!hitItems) return null;
  hitItems.sort((a, b) =>
    collection.attributes[0].type == "date"
      ? a[collection.attributes[0].id] < b[collection.attributes[0].id]
        ? 1
        : -1
      : a[collection.attributes[0].id] > b[collection.attributes[0].id]
      ? 1
      : -1
  );
  return (
    <div className="Attribute__list">
      { hitItems.map((item, i) => {
        const filterMatch = refinedAttributeValues.some(([ attr, refs ]) => {
          const itemAttrValues = item[attr.id] || [];
          const match = refs.map(ref => ref.value).some((value) => itemAttrValues.includes(value));
          return match;
        });
        return (
          <AttributeItem
            key={`al_${item.id}${i}`}
            hit={hit}
            attribute={collection}
            item={item}
            collection={collection}
            startOpen={hitItems.length == 1}
            i={i}
            filterMatch={filterMatch}
          />
        )
      })}
    </div>
  );
}

function AttributeItem({
  hit,
  attribute,
  item,
  collection,
  i,
  startOpen = false,
  filterMatch = false
}) {
  const [open, setOpen] = useState(startOpen);

  let title = Array.isArray(item[collection.attributes[0].id])
    ? item[collection.attributes[0].id][0]
    : item[collection.attributes[0].id];
  if (collection.attributes[0].type == "date")
    title = new Date(title).toLocaleDateString();

  return (
    <div className="Attribute__item" key={`ai_${item.id}${i}`}>
      <h4 className={filterMatch ? 'Attribute__item__title Attribute__Refined' : 'Attribute__item__title'} onClick={() => setOpen(!open)}>
        <span className="icon">
          {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </span>
        {title}
      </h4>
      {open &&
        collection.attributes.map((attribute) => (
          // We can't use Highlight here, or maybe we can, but I don't know how to pass a path for
          // a resource that is stored in an array (e.g. `prop[0].subProp`) to the `Highlight` component.
          <PropValHighlights
            key={"pvhi_" + attribute.id}
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

  let hitValue = Array.isArray(hit)
    ? hit.join("\n")
    : typeof hit == "object"
    ? Array.isArray(hit[attribute.id])
      ? hit[attribute.id].join("\n")
      : hit[attribute.id]
    : hit;

  if (hitValue == undefined) return null;

  return (
    <div
      className={`Attribute__propval ${
        selected ? "Attribute__propval--selected" : ""
      }`}
    >
      {" "}
      {isLink ? (
        <a className="Attribute__link" href={hitValue} target="_blank">
          <div className="Attribute__propval__key">{attribute.name}</div>
          <span className="icon">
            <ExternalLinkIcon />
          </span>
        </a>
      ) : (
        <>
          <div className="Attribute__propval__key">{attribute.name}</div>
          <div className="Attribute__propval__value">
            {useHighlight && false ? (
              <Highlight
                key={`val_${attribute.id}`}
                attribute={attribute.id}
                // @ts-ignore
                hit={hitValue}
                // @ts-ignore
                tagname="mark"
              />
            ) : (
              hitValue
                ?.toString()
                .split("\n")
                .map((hv, index) => {
                  if (attribute.type == "date")
                    hv = new Date(hv).toLocaleDateString();
                  return <div key={`hv_${attribute.id}_${index}`}>{hv}</div>;
                })
            )}
          </div>
        </>
      )}
    </div>
  );
}
