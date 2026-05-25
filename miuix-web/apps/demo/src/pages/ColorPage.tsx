import React, { useRef } from 'react';
import {
  Card, TopAppBar, SmallTitle, VerticalScrollBar,
  useScrollEndHaptic, generateColorsFromSeed
} from '@miuix/react';

const COLOR_KEYS = [
  { name: 'primary', key: 'primary', onKey: 'onPrimary' },
  { name: 'primaryVariant', key: 'primaryVariant', onKey: 'onPrimaryVariant' },
  { name: 'error', key: 'error', onKey: 'onError' },
  { name: 'errorContainer', key: 'errorContainer', onKey: 'onErrorContainer' },
  { name: 'disabledPrimary', key: 'disabledPrimary', onKey: 'disabledOnPrimary' },
  { name: 'disabledPrimaryButton', key: 'disabledPrimaryButton', onKey: 'disabledOnPrimaryButton' },
  { name: 'primaryContainer', key: 'primaryContainer', onKey: 'onPrimaryContainer' },
  { name: 'secondary', key: 'secondary', onKey: 'onSecondary' },
  { name: 'secondaryVariant', key: 'secondaryVariant', onKey: 'onSecondaryVariant' },
  { name: 'disabledSecondary', key: 'disabledSecondary', onKey: 'disabledOnSecondary' },
  { name: 'disabledSecondaryVariant', key: 'disabledSecondaryVariant', onKey: 'disabledOnSecondaryVariant' },
  { name: 'secondaryContainer', key: 'secondaryContainer', onKey: 'onSecondaryContainer' },
  { name: 'secondaryContainerVariant', key: 'secondaryContainerVariant', onKey: 'onSecondaryContainerVariant' },
  { name: 'tertiaryContainer', key: 'tertiaryContainer', onKey: 'onTertiaryContainer' },
  { name: 'background', key: 'background', onKey: 'onBackground' },
  { name: 'surface', key: 'surface', onKey: 'onSurface' },
  { name: 'surfaceVariant', key: 'surfaceVariant', onKey: 'onSurface' },
  { name: 'surfaceContainer', key: 'surfaceContainer', onKey: 'onSurfaceContainer' },
  { name: 'surfaceContainerHigh', key: 'surfaceContainerHigh', onKey: 'onSurfaceContainerHigh' },
  { name: 'surfaceContainerHighest', key: 'surfaceContainerHighest', onKey: 'onSurfaceContainerHighest' },
  { name: 'outline', key: 'outline', onKey: 'onBackground' },
  { name: 'dividerLine', key: 'dividerLine', onKey: 'onBackground' },
];

function camelToDisplay(s: string) {
  return s.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
}

const ColorsPreview: React.FC<{ colors: Record<string, string> }> = ({ colors }) => {
  // Chunk color blocks into pairs of 2 for grid layout
  const rows: typeof COLOR_KEYS[] = [];
  for (let i = 0; i < COLOR_KEYS.length; i += 2) {
    rows.push(COLOR_KEYS.slice(i, i + 2));
  }

  return (
    <div style={{ padding: '16px 0' }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          {row.map(({ name, key, onKey }) => {
            const surfaceColor = colors[key] || 'transparent';
            const textColor = colors[onKey] || '#FFFFFF';

            return (
              <div
                key={name}
                style={{
                  flex: 1,
                  backgroundColor: surfaceColor,
                  color: textColor,
                  border: `1px solid ${textColor}`,
                  borderRadius: 12,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 12,
                  fontSize: 12,
                  fontWeight: 500,
                  boxSizing: 'border-box',
                }}
              >
                {camelToDisplay(name)}
              </div>
            );
          })}
          {row.length < 2 && <div style={{ flex: 1 }} />}
        </div>
      ))}
    </div>
  );
};

function useIsWideScreen() {
  const [isWide, setIsWide] = React.useState(window.innerWidth > window.innerHeight);
  React.useEffect(() => {
    const handler = () => setIsWide(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isWide;
}

export const ColorPage: React.FC = () => {
  const isWide = useIsWideScreen();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Enable boundary overscroll haptics
  useScrollEndHaptic(scrollRef);

  // Generate light/dark dynamic and static colors from default seed color (Mi Brand Blue)
  const seedColor = '#3482FF'; // Default blue seed
  const lightColors = generateColorsFromSeed(seedColor, 'TonalSpot', 'Spec2021', false);
  const darkColors = generateColorsFromSeed(seedColor, 'TonalSpot', 'Spec2021', true);
  const dynamicLight = generateColorsFromSeed(seedColor, 'Monochrome', 'Spec2021', false);
  const dynamicDark = generateColorsFromSeed(seedColor, 'Monochrome', 'Spec2021', true);

  // Helper to resolve CSS variable properties currently active in browser DOM
  const getActiveThemeColors = () => {
    const resolved: Record<string, string> = {};
    const style = getComputedStyle(document.documentElement);
    COLOR_KEYS.forEach(({ key, onKey }) => {
      resolved[key] = style.getPropertyValue(`--miuix-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`).trim();
      resolved[onKey] = style.getPropertyValue(`--miuix-color-${onKey.replace(/([A-Z])/g, '-$1').toLowerCase()}`).trim();
    });
    return resolved;
  };

  const currentColors = getActiveThemeColors();

  return (
    <div
      ref={scrollRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflowY: 'auto',
        paddingBottom: 32,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopAppBar title="Color" largeTitle={isWide ? undefined : 'Color'} />
      <div style={{ padding: '0 12px', flex: 1 }}>
        <SmallTitle text="Current Theme Colors" />
        <Card>
          <div style={{ padding: '0 16px' }}>
            <ColorsPreview colors={currentColors} />
          </div>
        </Card>
        <div style={{ height: 12 }} />

        <SmallTitle text="Light Theme Colors" />
        <Card>
          <div style={{ padding: '0 16px' }}>
            <ColorsPreview colors={lightColors as any} />
          </div>
        </Card>
        <div style={{ height: 12 }} />

        <SmallTitle text="Dynamic Light Colors" />
        <Card>
          <div style={{ padding: '0 16px' }}>
            <ColorsPreview colors={dynamicLight as any} />
          </div>
        </Card>
        <div style={{ height: 12 }} />

        <SmallTitle text="Dark Theme Colors" />
        <Card>
          <div style={{ padding: '0 16px' }}>
            <ColorsPreview colors={darkColors as any} />
          </div>
        </Card>
        <div style={{ height: 12 }} />

        <SmallTitle text="Dynamic Dark Colors" />
        <Card>
          <div style={{ padding: '0 16px' }}>
            <ColorsPreview colors={dynamicDark as any} />
          </div>
        </Card>
        <div style={{ height: 12 }} />
      </div>

      <VerticalScrollBar containerRef={scrollRef} />
    </div>
  );
};
