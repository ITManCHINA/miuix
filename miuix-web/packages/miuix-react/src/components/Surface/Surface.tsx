import React from 'react';
import './Surface.css';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string; // e.g., 'var(--miuix-color-surface)'
  contentColor?: string; // e.g., 'var(--miuix-color-on-surface)'
  borderRadius?: number | string;
  shadowElevation?: number;
  border?: string;
  onClick?: () => void;
  enabled?: boolean;
}

export const Surface: React.FC<SurfaceProps> = ({
  color,
  contentColor,
  borderRadius = 0,
  shadowElevation = 0,
  border,
  onClick,
  enabled = true,
  className = '',
  style,
  children,
  ...rest
}) => {
  const customStyles: React.CSSProperties = {
    ...style,
    backgroundColor: color || 'var(--miuix-color-surface)',
    color: contentColor || 'var(--miuix-color-on-surface)',
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    boxShadow: shadowElevation > 0 ? `0px ${shadowElevation}px ${shadowElevation * 2}px rgba(0,0,0,0.15)` : undefined,
    border: border,
  };

  const isClickable = !!onClick && enabled;

  return (
    <div
      className={`miuix-surface ${isClickable ? 'miuix-surface--clickable' : ''} ${className}`}
      style={customStyles}
      onClick={isClickable ? onClick : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};
