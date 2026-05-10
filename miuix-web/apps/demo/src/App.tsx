import React, { useEffect } from 'react';
import { AppStateProvider } from './contexts/AppStateContext';
import { NavigatorProvider, useNavigator } from './contexts/NavigatorContext';
import { NavDisplay } from './components/NavDisplay';
import { MainShell } from './components/MainShell';
import { AboutPage } from './pages/AboutPage';
import { LicensePage } from './pages/LicensePage';
import { PullToRefreshPage } from './pages/PullToRefreshPage';
import { MultiScaffoldTestPage } from './pages/MultiScaffoldTestPage';
import { NavigationTestPage } from './pages/NavigationTestPage';

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
    <div style={{ width: '100vw', minHeight: '100vh', overflowX: 'hidden' }}>
      <NavDisplay>
        {renderRoute()}
      </NavDisplay>
    </div>
  );
};

function App() {
  return (
    <AppStateProvider>
      <NavigatorProvider>
        <AppContent />
      </NavigatorProvider>
    </AppStateProvider>
  );
}

export default App;
