import { Cross1Icon } from "@radix-ui/react-icons";
import "./Dialog.css";

interface DialogProps {
  feature: any;
  onClose: () => void;
}

export function Dialog({ feature, onClose }: DialogProps) {
  if (!feature) return null;

  return (
    <div className="Dialog__overlay" onClick={onClose}>
      <div className="Dialog__content" onClick={e => e.stopPropagation()}>
        <button className="Dialog__close-button" onClick={onClose}>
          <Cross1Icon />
        </button>
        <h2>Feature Details</h2>
        <div className="Dialog__properties">
          {Object.entries(feature.properties).map(([key, value]) => (
            <div key={key} className="Dialog__property">
              <div className="Dialog__property-key">{key}</div>
              <div className="Dialog__property-value">{String(value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
