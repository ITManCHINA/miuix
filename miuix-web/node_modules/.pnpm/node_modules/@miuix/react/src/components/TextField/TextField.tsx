import React, { useState } from 'react';
import './TextField.css';

export const TextFieldDefaults = {
  cornerRadius: 16,
  insideMargin: { width: 16, height: 16 },
  borderWidth: 2,
};

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  backgroundColor?: string;
  labelColor?: string;
  borderColor?: string;
  cornerRadius?: number;
  useLabelAsPlaceholder?: boolean;
  enabled?: boolean;
  insideMargin?: { width: number; height: number };
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  onValueChange,
  label = '',
  backgroundColor = 'var(--miuix-color-secondary-container)',
  labelColor = 'var(--miuix-color-on-secondary-container)',
  borderColor = 'var(--miuix-color-primary)',
  cornerRadius = TextFieldDefaults.cornerRadius,
  useLabelAsPlaceholder = false,
  enabled = true,
  insideMargin = TextFieldDefaults.insideMargin,
  className = '',
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value.length > 0;
  
  let labelState = 'normal';
  if (label === '') labelState = 'hidden';
  else if (useLabelAsPlaceholder && hasValue) labelState = 'placeholder';
  else if (hasValue || isFocused) labelState = 'floating';

  return (
    <div
      className={`miuix-text-field ${isFocused ? 'miuix-text-field--focused' : ''} ${className}`}
      style={{
        ...style,
        backgroundColor: isFocused ? 'transparent' : backgroundColor,
        borderRadius: cornerRadius,
        boxShadow: isFocused ? `inset 0 0 0 ${TextFieldDefaults.borderWidth}px ${borderColor}` : 'none',
        padding: `${insideMargin.height}px ${insideMargin.width}px`,
      }}
    >
      {labelState !== 'hidden' && labelState !== 'placeholder' && (
        <div 
          className={`miuix-text-field-label miuix-text-field-label--${labelState}`}
          style={{ color: labelColor }}
        >
          {label}
        </div>
      )}
      <div className={`miuix-text-field-input-wrapper ${labelState === 'floating' ? 'miuix-text-field-input-wrapper--floating' : ''}`}>
        <input
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          disabled={!enabled}
          className="miuix-text-field-input"
          placeholder={useLabelAsPlaceholder && !hasValue ? label : props.placeholder}
          {...props}
        />
      </div>
    </div>
  );
};
