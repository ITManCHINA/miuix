import React, { useRef, useState } from 'react';
import { BasicComponent, BasicComponentProps } from '../BasicComponent/BasicComponent';
import { DropdownMenu, DropdownItem } from '../DropdownMenu/DropdownMenu';

export interface DropdownPreferenceProps extends Omit<BasicComponentProps, 'endActions' | 'onClick'> {
  items: string[];
  selectedIndex: number;
  onSelectedIndexChange: (index: number) => void;
}

export const DropdownPreference: React.FC<DropdownPreferenceProps> = ({
  items,
  selectedIndex,
  onSelectedIndexChange,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const displayValue = items[selectedIndex] || '';

  return (
    <>
      <div ref={anchorRef}>
        <BasicComponent
          {...props}
          active={expanded}
          onClick={() => {
            if (props.enabled !== false) {
              setExpanded(true);
            }
          }}
          endActions={
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--miuix-color-on-surface-variant-summary)' }}>
              <span style={{ fontSize: 14 }}>{displayValue}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          }
        />
      </div>
      <DropdownMenu
        expanded={expanded}
        onDismissRequest={() => setExpanded(false)}
        anchorRef={anchorRef as React.RefObject<HTMLElement>}
        align="right"
      >
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            text={item}
            selected={selectedIndex === index}
            onClick={() => {
              onSelectedIndexChange(index);
              setExpanded(false);
            }}
          />
        ))}
      </DropdownMenu>
    </>
  );
};
