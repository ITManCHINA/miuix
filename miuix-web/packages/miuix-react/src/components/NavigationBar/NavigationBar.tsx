import React, { createContext, useContext } from 'react';
import './NavigationBar.css';

export type NavigationBarDisplayMode = 'IconAndText' | 'IconOnly' | 'TextOnly' | 'IconWithSelectedLabel';

const NavigationBarContext = createContext<{ mode: NavigationBarDisplayMode }>({ mode: 'IconAndText' });

export interface NavigationBarProps {
  mode?: NavigationBarDisplayMode;
  showDivider?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  mode = 'IconAndText',
  showDivider = true,
  className = '',
  style,
  children,
}) => {
  return (
    <NavigationBarContext.Provider value={{ mode }}>
      <div 
        className={`miuix-navigation-bar ${showDivider ? 'miuix-navigation-bar--divider' : ''} ${className}`}
        style={style}
        role="tablist"
      >
        <div className="miuix-navigation-bar-backdrop" />
        {children}
      </div>
    </NavigationBarContext.Provider>
  );
};

export interface NavigationBarItemProps {
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  className?: string;
  enabled?: boolean;
}

export const NavigationBarItem: React.FC<NavigationBarItemProps> = ({
  selected,
  onClick,
  icon,
  label,
  className = '',
  enabled = true,
}) => {
  const { mode } = useContext(NavigationBarContext);
  const isClickable = enabled;

  let content;

  if (mode === 'IconAndText') {
    content = (
      <>
        <div className="miuix-navigation-item-icon">{icon}</div>
        <div className="miuix-navigation-item-label">{label}</div>
      </>
    );
  } else if (mode === 'IconWithSelectedLabel') {
    content = (
      <>
        <div className={`miuix-navigation-item-icon ${selected ? 'miuix-navigation-item-icon--selected-top' : 'miuix-navigation-item-icon--center'}`}>{icon}</div>
        <div className={`miuix-navigation-item-label miuix-navigation-item-label--animated ${selected ? 'miuix-navigation-item-label--visible' : 'miuix-navigation-item-label--hidden'}`}>{label}</div>
      </>
    );
  } else if (mode === 'TextOnly') {
    content = <div className="miuix-navigation-item-label miuix-navigation-item-label--text-only">{label}</div>;
  } else {
    // IconOnly
    content = <div className="miuix-navigation-item-icon miuix-navigation-item-icon--center">{icon}</div>;
  }

  return (
    <div
      className={`miuix-navigation-item ${selected ? 'miuix-navigation-item--selected' : ''} ${!enabled ? 'miuix-navigation-item--disabled' : ''} ${className}`}
      onClick={isClickable ? onClick : undefined}
      role="tab"
      aria-selected={selected}
      tabIndex={enabled ? 0 : -1}
      onKeyDown={(e) => {
        if ((e.key === ' ' || e.key === 'Enter') && isClickable) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="miuix-navigation-item-content">
        {content}
      </div>
    </div>
  );
};
