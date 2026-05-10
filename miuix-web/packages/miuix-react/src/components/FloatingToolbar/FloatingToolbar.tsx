import React from 'react';
import './FloatingToolbar.css';

export interface FloatingToolbarProps {
  orientation?: 'horizontal' | 'vertical';
  position?: 'TopStart' | 'CenterStart' | 'BottomStart' | 'TopEnd' | 'CenterEnd' | 'BottomEnd' | 'TopCenter' | 'BottomCenter';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  orientation = 'horizontal',
  position = 'BottomEnd',
  className = '',
  style,
  children,
}) => {
  return (
    <div 
      className={`miuix-floating-toolbar miuix-floating-toolbar--${position.toLowerCase()} miuix-floating-toolbar--${orientation} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
