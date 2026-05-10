import React, { useEffect } from 'react';
import { AppStateProvider } from './contexts/AppStateContext';
import { NavigatorProvider, useNavigator } from './contexts/NavigatorContext';
import { NavDisplay } from './components/NavDisplay';
import { MainShell } from './components/MainShell';
// Placeholder for other pages
const AboutPage = () => <div style={{ padding: 100 }}>About Page (WIP) <button onClick={() => window.dispatchEvent(new CustomEvent('popRoute'))}>Back</button></div>;
const LicensePage = () => <div style={{ padding: 100 }}>License Page (WIP) <button onClick={() => window.dispatchEvent(new CustomEvent('popRoute'))}>Back</button></div>;
const PullToRefreshPage = () => <div style={{ padding: 100 }}>PullToRefresh Test Page (WIP) <button onClick={() => window.dispatchEvent(new CustomEvent('popRoute'))}>Back</button></div>;
const MultiScaffoldTestPage = () => <div style={{ padding: 100 }}>MultiScaffold Test Page (WIP) <button onClick={() => window.dispatchEvent(new CustomEvent('popRoute'))}>Back</button></div>;
const NavigationTestPage = () => <div style={{ padding: 100 }}>Navigation Test Page (WIP) <button onClick={() => window.dispatchEvent(new CustomEvent('popRoute'))}>Back</button></div>;

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
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
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
