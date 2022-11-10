import { useState } from "react";

export const Panel = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={id}>
      <h5 onClick={toggleOpen}>
        <i className="fa fa-chevron-right" /> {title}
      </h5>
      {isOpen && children}
    </div>
  );
};
