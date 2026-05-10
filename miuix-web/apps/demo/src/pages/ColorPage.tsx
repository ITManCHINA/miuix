import React, { useState, useMemo } from 'react';
import { Card, ColorPicker, DropdownPreference, TopAppBar, SmallTitle } from '@miuix/react';

const COLORS = [
  "primary", "on-primary", "primary-variant", "on-primary-variant", 
  "error", "on-error", "error-container", "on-error-container",
  "disabled-primary", "disabled-on-primary", "disabled-primary-button", "disabled-on-primary-button",
  "disabled-primary-slider", "primary-container", "on-primary-container",
  "secondary", "on-secondary", "secondary-variant", "on-secondary-variant",
  "disabled-secondary", "disabled-on-secondary", "disabled-secondary-variant", "disabled-on-secondary-variant",
  "secondary-container", "on-secondary-container", "secondary-container-variant", "on-secondary-container-variant",
  "tertiary-container", "on-tertiary-container", "tertiary-container-variant",
  "background", "background-transparent", "on-background", "on-background-variant",
  "surface", "surface-transparent", "on-surface", "surface-variant", "surface-variant-transparent",
  "on-surface-secondary", "on-surface-variant-summary", "on-surface-variant-actions", "disabled-on-surface",
  "surface-container", "on-surface-container", "on-surface-container-variant",
  "surface-container-high", "on-surface-container-high", "surface-container-highest", "on-surface-container-highest",
  "outline", "divider-line", "slider-key-point", "slider-key-point-foreground", "slider-background"
];

function kebabToTitle(str: string) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Function to calculate luminance and return text color (black or white)
// Here we just map known 'on-*' colors or fallback to a hardcoded contrast
function getTextColorFor(colorKey: string) {
  if (colorKey.startsWith('on-')) {
    const base = colorKey.replace('on-', '');
    if (COLORS.includes(base)) return `var(--miuix-color-${base})`;
  } else {
    const onBase = `on-${colorKey}`;
    if (COLORS.includes(onBase)) return `var(--miuix-color-${onBase})`;
  }
  return 'inherit'; // Fallback to CSS inversion or outline
}

export const ColorPage: React.FC = () => {
  const [colorSpace, setColorSpace] = useState('HSV');
  const [pickerColor, setPickerColor] = useState({ r: 52, g: 130, b: 255, a: 1 });

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Color" largeTitle="Color" />
      <div style={{ padding: '0 16px' }}>
        
        <SmallTitle text="Theme Colors" />
        <Card>
          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {COLORS.map(colorKey => {
              const varName = `--miuix-color-${colorKey}`;
              const textColor = getTextColorFor(colorKey);
              
              return (
                <div 
                  key={colorKey}
                  style={{
                    backgroundColor: `var(${varName})`,
                    color: textColor,
                    border: `1px solid ${textColor !== 'inherit' ? textColor : 'var(--miuix-color-outline)'}`,
                    borderRadius: 12,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 12,
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  {kebabToTitle(colorKey)}
                </div>
              );
            })}
          </div>
        </Card>

        <SmallTitle text="Color Picker" />
        <Card>
          <div style={{ padding: '24px 24px 0 24px' }}>
            <DropdownPreference
              title="Color Space"
              summary="Select the color model for the picker"
              items={['HSV', 'OkLCH', 'OkLab']}
              selectedIndex={['HSV', 'OkLCH', 'OkLab'].indexOf(colorSpace)}
              onSelectedIndexChange={(i) => setColorSpace(['HSV', 'OkLCH', 'OkLab'][i])}
            />
          </div>
          <div style={{ padding: 24 }}>
            <ColorPicker 
              color={pickerColor} 
              onColorChange={setPickerColor} 
              showAlpha={true}
              colorSpace={colorSpace as any}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
