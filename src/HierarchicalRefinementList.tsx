import { RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import { useEffect, useState } from "react";
import { useRefinementList } from "react-instantsearch";
import { filterAttributes } from "./schema";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface HierarchicalRefinementListProps {
  attribute: string;
  sortBy?: any;
  limit?: number;
  vocabulary: any[];
}

export function HierarchicalRefinementList({
  attribute,
  sortBy,
  limit = 1000,
  vocabulary,
}: HierarchicalRefinementListProps) {
  const { items, refine } = useRefinementList({
    attribute,
    operator: "or",
    sortBy,
    // We use a large limit, because we do our own 'show more' button.
    limit: 1000,
  });

  return (
    <div className="ais-RefinementList">
      {displayTermList(vocabulary, items, false)}
    </div>
  );

  function displayTermList(terms, items, nested) {
    return (
      <ul className={cx("ais-RefinementList-list", nested && "invisible")}>
        {terms.map((term) => {
          if (Array.isArray(term)) {
            return displayTerm(term[0], items, term.slice(1));
          } else {
            return displayTerm(term, items, null);
          }
        })}
      </ul>
    );
  }

  function displayTerm(term, items, nestedTerms) {
    const item = items.find((item) => item.value == term.label);
    const isRefined = item ? item.isRefined : false;
    const count = item ? item.count : 0;
    return (
      <li
        key={term.label}
        className={cx(
          "ais-RefinementList-item",
          isRefined && "ais-RefinementList-item--selected"
        )}
      >
        <label
          className={cx("ais-RefinementList-label", nestedTerms && "closed")}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() == "input") {
            } else {
              e.preventDefault();
              e.stopPropagation();
              if (nestedTerms) {
                target.closest("label").classList.toggle("closed");
                target
                  .closest("label")
                  .nextElementSibling.classList.toggle("invisible");
              }
            }
          }}
        >
          <input
            className="ais-RefinementList-checkbox"
            type="checkbox"
            value={term.label}
            checked={isRefined}
            onChange={() => refine(term.label)}
          />
          {nestedTerms ? (
            <>
              <span className="icon open">
                <ChevronDownIcon />
              </span>
              <span className="icon closed">
                <ChevronUpIcon />
              </span>
            </>
          ) : (
            false
          )}
          <span className="ais-RefinementList-labelText">{term.label}</span>
          {count ? ( // Count is zero when the facet limit of 100 is surpassed.
            <span className="ais-RefinementList-count">{count}</span>
          ) : (
            false
          )}
        </label>
        {nestedTerms ? displayTermList(nestedTerms, items, true) : false}
      </li>
    );
  }

  function cx(...classNames) {
    return classNames.filter(Boolean).join(" ");
  }
}
