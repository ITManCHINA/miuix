import React from 'react';
import { NavigationBarDisplayMode } from '../NavigationBar/NavigationBar';

export interface FloatingNavigationBarProps {
  mode?: NavigationBarDisplayMode;
  alignment?: 'center' | 'start' | 'end';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const FloatingNavigationBar: React.FC<FloatingNavigationBarProps> = ({
  alignment = 'center',
  className = '',
  style,
  children,
}) => {
  let justifyContent = 'center';
  if (alignment === 'start') justifyContent = 'flex-start';
  if (alignment === 'end') justifyContent = 'flex-end';

  return (
    <div 
      className={`miuix-floating-navigation-bar ${className}`}
      style={{
        ...style,
        justifyContent
      }}
    >
      <div className="miuix-floating-navigation-bar-container">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // Pass mode to children implicitly by cloning, or rely on context
            // NavigationBarItem reads from NavigationBarContext, so we should wrap in it.
            // But since FloatingNavigationBarItem is often the same, we can just use the standard item 
            // inside a context.
            return child;
          }
          return child;
        })}
      </div>
    </div>
  );
};
