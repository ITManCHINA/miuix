import React, { Children, cloneElement, isValidElement } from 'react';
import './NavigationRail.css';

export type NavigationRailMode = 'TextOnly' | 'IconOnly' | 'IconWithLabel' | 'IconWithSelectedLabel';

export interface NavigationRailProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: NavigationRailMode;
  children: React.ReactNode;
  showDivider?: boolean;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  mode = 'IconWithLabel',
  children,
  showDivider = true,
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`miuix-navigation-rail ${showDivider ? 'miuix-navigation-rail--divider' : ''} ${className}`}
      {...props}
    >
      <div className="miuix-navigation-rail-backdrop" />
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, { mode } as any);
        }
        return child;
      })}
    </div>
  );
};

export interface NavigationRailItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
  enabled?: boolean;
  mode?: NavigationRailMode; // passed from parent
}

export const NavigationRailItem: React.FC<NavigationRailItemProps> = ({
  selected = false,
  onClick,
  icon,
  label,
  enabled = true,
  mode = 'IconWithLabel',
  className = '',
  ...props
}) => {
  const handleClick = () => {
    if (enabled && onClick) {
      onClick();
    }
  };

  const getIconClass = () => {
    if (mode === 'IconWithSelectedLabel') {
      return selected ? 'miuix-navigation-rail-item-icon--selected-top' : 'miuix-navigation-rail-item-icon--center';
    }
    return '';
  };

  const getLabelClass = () => {
    if (mode === 'IconWithSelectedLabel') {
      return selected 
        ? 'miuix-navigation-rail-item-label--animated miuix-navigation-rail-item-label--visible' 
        : 'miuix-navigation-rail-item-label--animated miuix-navigation-rail-item-label--hidden';
    }
    if (mode === 'TextOnly') {
      return 'miuix-navigation-rail-item-label--text-only';
    }
    return '';
  };

  return (
    <div 
      className={`miuix-navigation-rail-item ${selected ? 'miuix-navigation-rail-item--selected' : ''} ${!enabled ? 'miuix-navigation-rail-item--disabled' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <div className="miuix-navigation-rail-item-content">
        {mode !== 'TextOnly' && icon && (
          <div className={`miuix-navigation-rail-item-icon ${getIconClass()}`}>
            {icon}
          </div>
        )}
        
        {mode !== 'IconOnly' && label && (
          <div className={`miuix-navigation-rail-item-label ${getLabelClass()}`}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
