import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { MiuixColors, lightBaseColors, darkBaseColors, generateColorsFromSeed, ThemePaletteStyle, ThemeColorSpec } from '../../utils/themeEngine';

export interface MiuixThemeContextType {
  colors: MiuixColors;
  isDark: boolean;
  colorMode: number;
}

const MiuixThemeContext = createContext<MiuixThemeContextType>({
  colors: lightBaseColors,
  isDark: false,
  colorMode: 0
});

export const useMiuixTheme = () => useContext(MiuixThemeContext);

export interface MiuixThemeProviderProps {
  children: React.ReactNode;
  seedColor?: string; // Hex color, e.g. '#6750A4'
  colorMode?: number; // 0=System, 1=Light, 2=Dark, 3=MonetSystem, 4=MonetLight, 5=MonetDark
  paletteStyle?: ThemePaletteStyle;
  colorSpec?: ThemeColorSpec;
  isDarkSystem?: boolean; // System prefers-color-scheme dark state
}

export const MiuixThemeProvider: React.FC<MiuixThemeProviderProps> = ({
  children,
  seedColor = '#6750A4',
  colorMode = 0,
  paletteStyle = 'TonalSpot',
  colorSpec = 'Spec2021',
  isDarkSystem = false
}) => {
  // Determine if the theme should be dark
  const isDark = useMemo(() => {
    if (colorMode === 0 || colorMode === 3) {
      return isDarkSystem;
    }
    return colorMode === 2 || colorMode === 5;
  }, [colorMode, isDarkSystem]);

  // Compute active colors
  const activeColors = useMemo(() => {
    const isMonet = colorMode >= 3;
    if (isMonet && seedColor) {
      try {
        return generateColorsFromSeed(seedColor, paletteStyle, colorSpec, isDark);
      } catch (e) {
        console.error('Failed to generate Monet colors from seed:', e);
        return isDark ? darkBaseColors : lightBaseColors;
      }
    }
    return isDark ? darkBaseColors : lightBaseColors;
  }, [seedColor, paletteStyle, colorSpec, colorMode, isDark]);

  // Write colors to css custom properties dynamically on root (or wrapper)
  useEffect(() => {
    const root = document.documentElement;
    // Set theme attribute
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }

    // If Monet mode is active, inject dynamic colors. Otherwise, clear them and let standard CSS handles it.
    const isMonet = colorMode >= 3;
    if (isMonet) {
      Object.entries(activeColors).forEach(([key, val]) => {
        // Map camelCase key to kebab-case css property
        const cssKey = `--miuix-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssKey, val);
      });
    } else {
      // Clear monet styles to let color.css handle base colors
      Object.keys(activeColors).forEach(key => {
        const cssKey = `--miuix-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.removeProperty(cssKey);
      });
    }
  }, [activeColors, isDark, colorMode]);

  return (
    <MiuixThemeContext.Provider value={{ colors: activeColors, isDark, colorMode }}>
      {children}
    </MiuixThemeContext.Provider>
  );
};
