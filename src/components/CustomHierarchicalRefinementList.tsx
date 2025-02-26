import { useRefinementList } from "react-instantsearch";
import { CustomCheckbox } from "./CustomCheckbox";
import "./CustomCheckbox.css";
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import "./CustomRefinementList.css";

interface HierarchicalRefinementListProps {
  attribute: string;
  sortBy?: any;
  limit?: number;
  vocabulary: any[];
}

export function CustomHierarchicalRefinementList({
  attribute,
  sortBy,
  limit = 1000,
  vocabulary,
}: HierarchicalRefinementListProps) {
  const { items, refine } = useRefinementList({
    attribute,
    operator: "or",
    sortBy,
    limit: 1000,
  });

  // Store open state for each term
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  // Toggle function for a specific term
  const toggleTerm = (termLabel: string) => {
    setOpenStates(prev => ({
      ...prev,
      [termLabel]: !prev[termLabel]
    }));
  };

  return (
    <div className="ais-RefinementList">
      {displayTermList(vocabulary, items, false)}
    </div>
  );

  function displayTermList(terms, items, nested) {
    return (
      <ul className={`ais-RefinementList-list ${nested ? "nested-list" : ""}`}>
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
    const isOpen = openStates[term.label] || false;

    return (
      <li
        key={term.label}
        className={`ais-RefinementList-item ${
          isRefined ? "ais-RefinementList-item--selected" : ""
        }`}
      >
        <div className="hierarchical-item">
          {nestedTerms ? (
            <div
              className="toggle-button-wrapper"
              onClick={() => toggleTerm(term.label)}
            >
              {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
          ) : (
            <div style={{ width: '24px', height: '24px' }}></div>
          )}

          <CustomCheckbox
            checked={isRefined}
            onChange={() => refine(term.label)}
            label={term.label}
            count={count}
            className="refinement-checkbox"
          />
        </div>

        {nestedTerms && isOpen && displayTermList(nestedTerms, items, true)}
      </li>
    );
  }
}
