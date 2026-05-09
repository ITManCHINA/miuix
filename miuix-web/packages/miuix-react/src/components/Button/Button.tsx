import React, { useMemo } from 'react';
import '@miuix/theme/src/colors.css';
import './Button.css';

export interface ButtonColors {
  color: string;
  disabledColor: string;
  contentColor: string;
  disabledContentColor: string;
}

export const ButtonDefaults = {
  minWidth: 58,
  minHeight: 40,
  cornerRadius: 16,
  insideMargin: { horizontal: 16, vertical: 13 },
  buttonColors: (
    color = 'var(--miuix-color-secondary-variant)',
    disabledColor = 'var(--miuix-color-disabled-secondary-variant)',
    contentColor = 'var(--miuix-color-on-secondary-variant)',
    disabledContentColor = 'var(--miuix-color-disabled-on-secondary-variant)'
  ): ButtonColors => ({
    color,
    disabledColor,
    contentColor,
    disabledContentColor,
  })
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  enabled?: boolean;
  cornerRadius?: number;
  minWidth?: number;
  minHeight?: number;
  colors?: ButtonColors;
  insideMargin?: { horizontal: number; vertical: number };
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className = '',
  enabled = true,
  cornerRadius = ButtonDefaults.cornerRadius,
  minWidth = ButtonDefaults.minWidth,
  minHeight = ButtonDefaults.minHeight,
  colors,
  insideMargin = ButtonDefaults.insideMargin,
  children,
  style,
  ...props
}) => {
  const mergedColors = useMemo(() => {
    return colors || ButtonDefaults.buttonColors();
  }, [colors]);

  const buttonStyle: React.CSSProperties = {
    ...style,
    minWidth: `${minWidth}px`,
    minHeight: `${minHeight}px`,
    borderRadius: `${cornerRadius}px`,
    padding: `${insideMargin.vertical}px ${insideMargin.horizontal}px`,
    backgroundColor: enabled ? mergedColors.color : mergedColors.disabledColor,
    color: enabled ? mergedColors.contentColor : mergedColors.disabledContentColor,
    opacity: enabled ? 1 : 0.6,
  };

  return (
    <button
      onClick={enabled ? onClick : undefined}
      disabled={!enabled}
      className={`miuix-button ${className}`}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};
