import React, { useState } from 'react';
import { BasicComponent, BasicComponentProps } from '../BasicComponent/BasicComponent';
import { BottomSheet } from '../BottomSheet/BottomSheet';
import { RadioButton } from '../RadioButton/RadioButton';
import { Surface } from '../Surface/Surface';

export interface SpinnerPreferenceProps extends Omit<BasicComponentProps, 'endActions' | 'onClick'> {
  items: string[];
  selectedIndex: number;
  onSelectedIndexChange: (index: number) => void;
  dialogTitle?: string;
}

export const SpinnerPreference: React.FC<SpinnerPreferenceProps> = ({
  items,
  selectedIndex,
  onSelectedIndexChange,
  dialogTitle,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  const displayValue = items[selectedIndex] || '';

  return (
    <>
      <BasicComponent
        {...props}
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
      <BottomSheet
        show={expanded}
        onDismissRequest={() => setExpanded(false)}
        title={dialogTitle || (typeof props.title === 'string' ? props.title : undefined)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 16px', gap: '8px', maxHeight: '50vh', overflowY: 'auto' }}>
          {items.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <Surface
                key={index}
                onClick={() => {
                  onSelectedIndexChange(index);
                  setExpanded(false);
                }}
                borderRadius={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: 'transparent',
                }}
              >
                <span style={{ 
                  flex: 1, 
                  fontSize: 16, 
                  color: isSelected ? 'var(--miuix-color-primary)' : 'var(--miuix-color-on-surface)',
                  fontWeight: isSelected ? 600 : 400
                }}>
                  {item}
                </span>
                <RadioButton selected={isSelected} onClick={() => {
                  onSelectedIndexChange(index);
                  setExpanded(false);
                }} />
              </Surface>
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
};
