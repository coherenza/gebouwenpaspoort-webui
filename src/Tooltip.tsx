import "./Tooltip.css";

const hiddenProps = [
  "id",
  "geometry",
  "title",
  "color",
  "icon",
  "size",
  "sort-key",
  "text-size",
];

/** Shown when hovering over an item in the map */
export function ToolTip({ feature, x, y }) {
  return (
    <div className="tooltip" style={{ left: x, top: y }}>
      {/* show all properties as key values */}
      {Object.keys(feature.properties).map((key) =>
        hiddenProps.includes(key) ? null : (
          <div key={key}>
            <div className="tooltip__key">{key}</div>
            {feature.properties[key]}
          </div>
        )
      )}
    </div>
  );
}
