import React, { useEffect } from 'react';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { NavigatorProvider, useNavigator } from './contexts/NavigatorContext';
import { NavDisplay } from './components/NavDisplay';
import { MainShell } from './components/MainShell';
import { AboutPage } from './pages/AboutPage';
import { LicensePage } from './pages/LicensePage';
import { PullToRefreshPage } from './pages/PullToRefreshPage';
import { MultiScaffoldTestPage } from './pages/MultiScaffoldTestPage';
import { NavigationTestPage } from './pages/NavigationTestPage';
import { MiuixThemeProvider } from '@miuix/react';

const SEED_COLORS = [
  '#6750A4', // Default
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFE500', // Yellow
  '#8A00FF', // Purple
  '#FF7A00', // Orange
  '#FF007A'  // Pink
];

const PALETTE_STYLES = [
  'TonalSpot',
  'Neutral',
  'Vibrant',
  'Expressive',
  'Rainbow',
  'FruitSalad',
  'Monochrome',
  'Fidelity',
  'Content'
] as const;

const COLOR_SPECS = [
  'Spec2021',
  'Spec2025'
] as const;

function useIsDarkSystem() {
  const [dark, setDark] = React.useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const h = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return dark;
}

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { appState } = useAppState();
  const isDarkSystem = useIsDarkSystem();

  const seedColor = SEED_COLORS[appState.seedIndex] || '#6750A4';
  const paletteStyle = PALETTE_STYLES[appState.paletteStyle] || 'TonalSpot';
  const colorSpec = COLOR_SPECS[appState.colorSpec] || 'Spec2021';

  return (
    <MiuixThemeProvider
      seedColor={seedColor}
      colorMode={appState.colorMode}
      paletteStyle={paletteStyle}
      colorSpec={colorSpec}
      isDarkSystem={isDarkSystem}
    >
      {children}
    </MiuixThemeProvider>
  );
};

const AppContent: React.FC = () => {
  const { current, pop } = useNavigator();
  const currentRoute = current();

  // Hacky back button support for quick testing without a real AppBar back button yet
  useEffect(() => {
    const handlePop = () => pop();
    window.addEventListener('popRoute', handlePop);
    return () => window.removeEventListener('popRoute', handlePop);
  }, [pop]);

  const renderRoute = () => {
    switch (currentRoute) {
      case 'About': return <AboutPage />;
      case 'License': return <LicensePage />;
      case 'PullToRefresh': return <PullToRefreshPage />;
      case 'MultiScaffold': return <MultiScaffoldTestPage />;
      case 'Navigation': return <NavigationTestPage />;
      case 'Main':
      default:
        return <MainShell />;
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <NavDisplay>
        {renderRoute()}
      </NavDisplay>
    </div>
  );
};

function App() {
  return (
    <AppStateProvider>
      <ThemeProviderWrapper>
        <NavigatorProvider>
          <AppContent />
        </NavigatorProvider>
      </ThemeProviderWrapper>
    </AppStateProvider>
  );
}

export default App;
