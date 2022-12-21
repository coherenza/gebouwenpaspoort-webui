import { RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import { useEffect, useState } from "react";
import { useRefinementList } from "react-instantsearch-hooks-web";
import "./RefinementList.css";

interface RefinementListProps {
  attribute: string;
  sortBy?: any;
  limit?: number;
}

export function RefinementList({ attribute, sortBy, limit = 10 }: RefinementListProps) {
  const { items, refine } =
    useRefinementList({
      attribute,
      operator: "or",
      sortBy,
      // We use a large limit, because we do our own 'show more' button.
      limit: 30,
  });

  const [savedItems, setSavedItems] = useState<RefinementListItem[]>([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (items.length > savedItems.length) {
      setSavedItems(items);
    } else {
      // Do not update savedItems that are missing in the new `items`.
      // This is to make sure the list of checkboxes shows all options - even if some options are no longer in the items list.
      const newSavedItems = savedItems.map((savedItem) => {
        const newItem = items.find((item) => item.label === savedItem.label);
        // However, we do need to remove items that are unchecked.
        // If the user unchecks an item, we don't want it to appear checked in the next render
        // because that would confuse the user.
        if (!newItem) {
          savedItem.isRefined = false;
          return savedItem;
        } else {
          return newItem;
        }
      });
      setSavedItems(newSavedItems);
    }
  }, [items]);

  const limitedSavedItems = showMore ? savedItems : savedItems.slice(0, limit);

  return (
    <div className="RefinementList">
      <ul>
        {limitedSavedItems.map((item) => (
          <li key={item.label}>
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={(_event) => refine(item.value)}
            />
            <label>
              <span>{item.label}</span>
              <span className="RefinementList__count">{item.count}</span>
            </label>
          </li>
        ))}
      </ul>
      {savedItems.length > limit && <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "minder" : "meer"}
      </button>}
    </div>
  );
}
