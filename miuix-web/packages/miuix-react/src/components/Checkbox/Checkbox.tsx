import React from 'react';
import './Checkbox.css';

export type ToggleableState = 'On' | 'Off' | 'Indeterminate';

export interface CheckboxProps {
  state: ToggleableState;
  onStateChange?: (state: ToggleableState) => void;
  enabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  state,
  onStateChange,
  enabled = true,
  className = '',
}) => {
  const handleClick = () => {
    if (!enabled || !onStateChange) return;
    if (state === 'Off') onStateChange('On');
    else if (state === 'On') onStateChange('Off');
    else onStateChange('On'); // Indeterminate -> On
  };

  const isChecked = state === 'On';
  const isIndeterminate = state === 'Indeterminate';

  // Path from miuix Checkbox: viewport 23x23
  // start: 5, 9.4 -> mid: 10.3, 14.9 -> end: 17.9, 5.1
  // We can normalize this to a 24x24 standard SVG viewBox for easier rendering
  const checkPath = "M 5.2 9.8 L 10.7 15.5 L 18.7 5.3";

  return (
    <div
      className={`miuix-checkbox miuix-checkbox--${state.toLowerCase()} ${!enabled ? 'miuix-checkbox--disabled' : ''} ${className}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : isChecked}
      aria-disabled={!enabled}
      tabIndex={enabled ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="miuix-checkbox-background" />
      <svg className="miuix-checkbox-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="miuix-checkbox-path"
          d={checkPath}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.1"
        />
      </svg>
    </div>
  );
};
