import { useState } from "react";
import "./Panel.css";

export const Panel = ({ title, children, id, startOpen }) => {
  const [isOpen, setIsOpen] = useState(!!startOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={id} className="panel">
      <button onClick={toggleOpen} className="panel-label">
        <i className="fa fa-chevron-right" /> {title} {isOpen ? "▼" : "►"}
      </button>
      {isOpen && children}
    </div>
  );
};
