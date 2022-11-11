import { useState } from "react";

export const Panel = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(false);

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
