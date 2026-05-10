import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './DropdownMenu.css';

export interface DropdownMenuProps {
  expanded: boolean;
  onDismissRequest: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right' | 'center';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  expanded,
  onDismissRequest,
  anchorRef,
  children,
  className = '',
  align = 'left',
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left?: number; right?: number; transformOrigin: string }>({ top: 0, left: 0, transformOrigin: 'top left' });

  useEffect(() => {
    if (expanded) {
      setMounted(true);
    } else {
      // Force reflow for animation
      if (menuRef.current) void menuRef.current.offsetHeight;
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 200); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [expanded]);

  useEffect(() => {
    if (mounted && expanded && !visible) {
      updatePosition();
      // Force reflow
      if (menuRef.current) void menuRef.current.offsetHeight;
      // Trigger animation
      requestAnimationFrame(() => setVisible(true));
    }
  }, [mounted, expanded, visible]);

  const updatePosition = () => {
    if (!anchorRef.current || !menuRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();

    const margin = 8;
    let top = anchorRect.bottom + margin;
    let left: number | undefined = anchorRect.left;
    let right: number | undefined = undefined;
    let transformOrigin = 'top left';

    if (align === 'right') {
      left = undefined;
      right = window.innerWidth - anchorRect.right;
      transformOrigin = 'top right';
    } else if (align === 'center') {
      const actualWidth = menuRef.current.offsetWidth || 160;
      left = anchorRect.left + (anchorRect.width - actualWidth) / 2;
      transformOrigin = 'top center';
    }

    // Basic collision detection vertical
    // Note: getBoundingClientRect height is affected by scale, so we use offsetHeight or just fallback to fixed size
    const actualHeight = menuRef.current.offsetHeight || 200;
    if (top + actualHeight > window.innerHeight) {
      top = anchorRect.top - actualHeight - margin;
      transformOrigin = transformOrigin.replace('top', 'bottom');
    }

    setPosition({ top, left, right, transformOrigin });
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
          left: position.left !== undefined ? position.left : undefined,
          right: position.right !== undefined ? position.right : undefined,
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
