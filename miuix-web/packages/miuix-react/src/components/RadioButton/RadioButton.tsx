import React from 'react';
import './RadioButton.css';

export interface RadioButtonProps {
  selected: boolean;
  onClick?: () => void;
  enabled?: boolean;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onClick,
  enabled = true,
  className = '',
}) => {
  return (
    <div
      className={`miuix-radio-button ${selected ? 'miuix-radio-button--selected' : ''} ${!enabled ? 'miuix-radio-button--disabled' : ''} ${className}`}
      onClick={() => {
        if (enabled && onClick) {
          onClick();
        }
      }}
      role="radio"
      aria-checked={selected}
      aria-disabled={!enabled}
      tabIndex={enabled ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (enabled && onClick) onClick();
        }
      }}
    >
      <svg className="miuix-radio-button-icon" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="miuix-radio-button-path"
          d="M 10.9 29 L 23.1 40.8 L 44 16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="7"
        />
      </svg>
    </div>
  );
};
