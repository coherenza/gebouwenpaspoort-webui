import { useRefinementList, RefinementListProps } from "react-instantsearch";
import { CustomCheckbox } from "./CustomCheckbox";
import "./CustomCheckbox.css";

export function CustomRefinementList(props: RefinementListProps) {
  const { items, refine } = useRefinementList(props);

  return (
    <div className="ais-RefinementList">
      <ul className="ais-RefinementList-list">
        {items.map((item) => (
          <li
            key={item.value}
            className={`ais-RefinementList-item ${
              item.isRefined ? "ais-RefinementList-item--selected" : ""
            }`}
          >
            <CustomCheckbox
              checked={item.isRefined}
              onChange={() => refine(item.value)}
              label={item.label}
              count={item.count}
              className="refinement-checkbox"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
