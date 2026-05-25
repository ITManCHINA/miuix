import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './DropdownMenu.css';

export interface DropdownMenuProps {
  expanded: boolean;
  onDismissRequest: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right' | 'center';
  isSubMenu?: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  expanded,
  onDismissRequest,
  anchorRef,
  children,
  className = '',
  align = 'left',
  isSubMenu = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left?: number;
    right?: number;
    transformOrigin: string;
  }>({ top: 0, left: 0, transformOrigin: 'top left' });

  // ── position calculation ──────────────────────────────────────────────────
  const updatePosition = useCallback(() => {
    if (!anchorRef.current || !menuRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuH = menuRef.current.offsetHeight || 150;
    const menuW = menuRef.current.offsetWidth || 200;

    const V_MARGIN = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top: number;
    let left: number | undefined;
    let right: number | undefined;
    let originV: string;
    let originH: string;

    if (isSubMenu) {
      // Horizontal placement for cascading menus (next to the item)
      const spaceRight = vw - anchorRect.right - 8;
      if (spaceRight >= menuW) {
        left = anchorRect.right + 2;
        originH = 'left';
      } else {
        left = anchorRect.left - menuW - 2;
        originH = 'right';
      }
      
      // Align top edges
      top = anchorRect.top;
      originV = 'top';
    } else {
      // Vertical placement
      const spaceBelow = vh - anchorRect.bottom - V_MARGIN;
      const spaceAbove = anchorRect.top - V_MARGIN;

      if (spaceBelow >= menuH || spaceBelow >= spaceAbove) {
        top = anchorRect.bottom + V_MARGIN;
        originV = 'top';
      } else {
        top = anchorRect.top - V_MARGIN - menuH;
        originV = 'bottom';
      }

      // Horizontal placement
      if (align === 'right') {
        right = vw - anchorRect.right;
        originH = 'right';
      } else if (align === 'center') {
        left = anchorRect.left + (anchorRect.width - menuW) / 2;
        originH = 'center';
      } else {
        left = anchorRect.left;
        originH = 'left';
      }
    }

    // Clamp boundary protections
    if (left !== undefined) {
      left = Math.max(8, Math.min(left, vw - menuW - 8));
    }
    top = Math.max(8, Math.min(top, vh - menuH - 8));

    setPosition({
      top: top + window.scrollY,
      left: left !== undefined ? left + window.scrollX : undefined,
      right: right !== undefined ? right - window.scrollX : undefined,
      transformOrigin: `${originV} ${originH}`,
    });
  }, [anchorRef, align, isSubMenu]);

  // ── mount / unmount lifecycle ─────────────────────────────────────────────
  useEffect(() => {
    if (expanded) {
      setMounted(true);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [expanded]);

  // ── trigger enter animation after mount ───────────────────────────────────
  useEffect(() => {
    if (mounted && expanded && !visible) {
      updatePosition();
      if (menuRef.current) void menuRef.current.offsetHeight;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }
  }, [mounted, expanded, visible, updatePosition]);

  // ── outside click / resize ────────────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
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
  }, [visible, onDismissRequest, updatePosition]);

  if (!mounted) return null;

  return createPortal(
    <div className={`miuix-dropdown-menu-portal ${visible ? 'visible' : ''} ${isSubMenu ? 'submenu-portal' : ''}`}>
      {/* Scrim — Only display for the parent, top-level dropdown */}
      {!isSubMenu && (
        <div
          className="miuix-dropdown-menu-scrim"
          onMouseDown={(e) => {
            e.preventDefault();
            onDismissRequest();
          }}
        />
      )}
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
  children?: React.ReactNode; // Nested sub-menu elements
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  text,
  summary,
  selected = false,
  enabled = true,
  onClick,
  className = '',
  children,
}) => {
  const [subOpen, setSubOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const hasSubMenu = React.Children.toArray(children).some(
    (c) => React.isValidElement(c) && (c.type === DropdownMenu)
  );

  const handleItemClick = (e: React.MouseEvent) => {
    if (!enabled) return;
    if (hasSubMenu) {
      e.stopPropagation();
      setSubOpen(!subOpen);
    } else {
      if (onClick) onClick();
    }
  };

  return (
    <div
      ref={itemRef}
      className={`miuix-dropdown-item ${selected ? 'miuix-dropdown-item--selected' : ''} ${!enabled ? 'miuix-dropdown-item--disabled' : ''} ${hasSubMenu ? 'miuix-dropdown-item--has-submenu' : ''} ${className}`}
      onClick={handleItemClick}
    >
      <div className="miuix-dropdown-item-content">
        <span className="miuix-dropdown-item-text">{text}</span>
        {summary && <span className="miuix-dropdown-item-summary">{summary}</span>}
      </div>
      
      {selected && !hasSubMenu && (
        <svg className="miuix-dropdown-item-check" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {hasSubMenu && (
        <>
          <svg className="miuix-dropdown-item-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          {/* Inject isSubMenu automatically into children DropdownMenu */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === DropdownMenu) {
              return React.cloneElement(child as React.ReactElement<any>, {
                expanded: subOpen,
                onDismissRequest: () => setSubOpen(false),
                anchorRef: itemRef,
                isSubMenu: true,
              });
            }
            return child;
          })}
        </>
      )}
    </div>
  );
};

// ── Monet Schema Types and Overlay Wrappers ──────────────────────────────────
export interface DropdownItemData {
  text: string;
  summary?: string;
  selected?: boolean;
  enabled?: boolean;
  onClick?: () => void;
  children?: DropdownItemData[];
}

export interface DropdownEntryData {
  items: DropdownItemData[];
}

interface OverlayIconDropdownMenuProps {
  entries: DropdownEntryData[];
  collapseOnSelection?: boolean;
  children: React.ReactNode;
}

export const OverlayIconDropdownMenu: React.FC<OverlayIconDropdownMenuProps> = ({
  entries,
  collapseOnSelection = true,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={anchorRef}
      className="miuix-overlay-menu-trigger"
      style={{ display: 'inline-flex', cursor: 'pointer', position: 'relative' }}
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(!expanded);
      }}
    >
      {children}
      <DropdownMenu
        expanded={expanded}
        onDismissRequest={() => setExpanded(false)}
        anchorRef={anchorRef}
        align="right"
      >
        {entries.map((entry, ei) => (
          <React.Fragment key={ei}>
            {ei > 0 && <div className="miuix-dropdown-divider" />}
            {entry.items.map((item, ii) => (
              <DropdownItem
                key={ii}
                text={item.text}
                summary={item.summary}
                selected={item.selected}
                enabled={item.enabled}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  if (collapseOnSelection) setExpanded(false);
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </DropdownMenu>
    </div>
  );
};

// Helper for rendering cascading item trees recursively
const CascadingItemTree: React.FC<{ item: DropdownItemData; collapseMenu: () => void }> = ({
  item,
  collapseMenu,
}) => {
  if (item.children && item.children.length > 0) {
    return (
      <DropdownItem text={item.text} enabled={item.enabled}>
        <DropdownMenu expanded={false} onDismissRequest={() => {}} anchorRef={{ current: null }}>
          {item.children.map((sub, si) => (
            <CascadingItemTree key={si} item={sub} collapseMenu={collapseMenu} />
          ))}
        </DropdownMenu>
      </DropdownItem>
    );
  }

  return (
    <DropdownItem
      text={item.text}
      summary={item.summary}
      selected={item.selected}
      enabled={item.enabled}
      onClick={() => {
        if (item.onClick) item.onClick();
        collapseMenu();
      }}
    />
  );
};

export const OverlayIconCascadingDropdownMenu: React.FC<OverlayIconDropdownMenuProps> = ({
  entries,
  collapseOnSelection = true,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const collapse = () => {
    if (collapseOnSelection) setExpanded(false);
  };

  return (
    <div
      ref={anchorRef}
      className="miuix-overlay-menu-trigger"
      style={{ display: 'inline-flex', cursor: 'pointer', position: 'relative' }}
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(!expanded);
      }}
    >
      {children}
      <DropdownMenu
        expanded={expanded}
        onDismissRequest={() => setExpanded(false)}
        anchorRef={anchorRef}
        align="right"
      >
        {entries.map((entry, ei) => (
          <React.Fragment key={ei}>
            {ei > 0 && <div className="miuix-dropdown-divider" />}
            {entry.items.map((item, ii) => (
              <CascadingItemTree key={ii} item={item} collapseMenu={collapse} />
            ))}
          </React.Fragment>
        ))}
      </DropdownMenu>
    </div>
  );
};
