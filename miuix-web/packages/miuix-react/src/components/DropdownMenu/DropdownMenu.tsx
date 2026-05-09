import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './DropdownMenu.css';

export interface DropdownMenuProps {
  expanded: boolean;
  onDismissRequest: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  expanded,
  onDismissRequest,
  anchorRef,
  children,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, transformOrigin: 'top left' });

  useEffect(() => {
    if (expanded) {
      setMounted(true);
      // Give React a tick to mount the DOM node so we can calculate positions
      requestAnimationFrame(() => {
        updatePosition();
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 200); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [expanded]);

  const updatePosition = () => {
    if (!anchorRef.current || !menuRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    const margin = 8;
    let top = anchorRect.bottom + margin;
    let left = anchorRect.left;
    let transformOrigin = 'top left';

    // Basic collision detection
    if (top + menuRect.height > window.innerHeight) {
      top = anchorRect.top - menuRect.height - margin;
      transformOrigin = 'bottom left';
    }
    if (left + menuRect.width > window.innerWidth) {
      left = anchorRect.right - menuRect.width;
      transformOrigin = top < anchorRect.top ? 'bottom right' : 'top right';
    }

    setPosition({ top, left, transformOrigin });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onDismissRequest();
      }
    };
    const handleResize = () => updatePosition();

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [visible, onDismissRequest]);

  if (!mounted) return null;

  return createPortal(
    <div className={`miuix-dropdown-menu-portal ${visible ? 'visible' : ''}`}>
      <div
        ref={menuRef}
        className={`miuix-dropdown-menu ${visible ? 'miuix-dropdown-menu--expanded' : ''} ${className}`}
        style={{
          top: position.top,
          left: position.left,
          transformOrigin: position.transformOrigin,
        }}
      >
        <div className="miuix-dropdown-menu-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export interface DropdownItemProps {
  text: string;
  summary?: string;
  selected?: boolean;
  enabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  text,
  summary,
  selected = false,
  enabled = true,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`miuix-dropdown-item ${selected ? 'miuix-dropdown-item--selected' : ''} ${!enabled ? 'miuix-dropdown-item--disabled' : ''} ${className}`}
      onClick={() => {
        if (enabled && onClick) {
          onClick();
        }
      }}
    >
      <div className="miuix-dropdown-item-content">
        <span className="miuix-dropdown-item-text">{text}</span>
        {summary && <span className="miuix-dropdown-item-summary">{summary}</span>}
      </div>
      {selected && (
        <svg className="miuix-dropdown-item-check" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
};
