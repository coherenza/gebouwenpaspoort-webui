import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  count?: number;
  className?: string;
}

export function CustomCheckbox({ checked, onChange, label, count, className = "" }: CustomCheckboxProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent default behavior if the click is not on the input element
    if ((e.target as HTMLElement).tagName.toLowerCase() !== "input") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div className={`custom-checkbox-container ${className}`} onClick={handleClick}>
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`}>
        {checked && <CheckIcon className="check-icon" />}
      </div>
      <span className="custom-checkbox-label">{label}</span>
      {count !== undefined && <span className="custom-checkbox-count">{count}</span>}
    </div>
  );
}
