import { RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import { useEffect, useState } from "react";
import { useRefinementList } from "react-instantsearch-hooks-web";
import { filterAttributes } from "./schema";

interface HierarchicalRefinementListProps {
  attribute: string;
  sortBy?: any;
  limit?: number;
  vocabulary: any[];
}

export function HierarchicalRefinementList({ attribute, sortBy, limit = 1000, vocabulary }: HierarchicalRefinementListProps) {
  const { items, refine } =
    useRefinementList({
      attribute,
      operator: "or",
      sortBy,
      // We use a large limit, because we do our own 'show more' button.
      limit: 1000,
  });

  return (
    <div className="ais-RefinementList">
      { displayTermList(vocabulary, items) }
    </div>
  );

  function displayTermList(terms, items) {
    return (
      <ul className="ais-RefinementList-list">
        { terms.map(term => {
            if (Array.isArray(term)) {
              return displayTerm(term[0], items, term.slice(1));
            } else {
              return displayTerm(term, items, null);
            }
          })
        }
      </ul>
    )
  }

  function displayTerm(term, items, nestedTerms) {
    const item = items.find(item => item.value == term.label);
    const isRefined = item ? item.isRefined : false;
    const count = item ? item.count : 0;
    return (
      <li
        key={term.label}
        className={cx(
          'ais-RefinementList-item',
          isRefined && 'ais-RefinementList-item--selected'
        )}
      >
        <label className="ais-RefinementList-label">
          <input
            className="ais-RefinementList-checkbox"
            type="checkbox"
            value={term.label}
            checked={isRefined}
            onChange={() => refine(term.label)}
          />
          <span className="ais-RefinementList-labelText">{term.label}</span>
          <span className="ais-RefinementList-count">{count}</span>
        </label>
        {
          nestedTerms ? displayTermList(nestedTerms, items) : false
        }
      </li>
    )
  }

  function cx(...classNames) {
    return classNames.filter(Boolean).join(' ');
  }

}
