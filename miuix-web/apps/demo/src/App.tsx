import React, { useState, useEffect } from 'react';
import { 
  PullToRefresh, 
  TopAppBar, 
  Button, 
  NavigationBar, 
  NavigationBarItem, 
  NavigationRail,
  NavigationRailItem,
  Snackbar 
} from '@miuix/react';
import { MainPage } from './pages/MainPage';
import { ColorPage } from './pages/ColorPage';
import { SettingsPage } from './pages/SettingsPage';
import { IconsPage } from './pages/IconsPage';
import { TextStylePage } from './pages/TextStylePage';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const isWideScreen = useMediaQuery('(min-width: 840px)');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 0: return <MainPage />;
      case 1: return <IconsPage />;
      case 2: return <ColorPage />;
      case 3: return <TextStylePage />;
      case 4: return <SettingsPage />;
      default: return null;
    }
  };

  const getPageTitle = () => {
    switch (currentTab) {
      case 0: return 'Home';
      case 1: return 'Icons';
      case 2: return 'Color';
      case 3: return 'TextStyle';
      case 4: return 'Settings';
      default: return 'Miuix Web';
    }
  };

  const navItems = [
    { label: 'Home', icon: <div style={{ fontSize: 20 }}>🏠</div> },
    { label: 'Icons', icon: <div style={{ fontSize: 20 }}>✒️</div> },
    { label: 'Color', icon: <div style={{ fontSize: 20 }}>🎨</div> },
    { label: 'TextStyle', icon: <div style={{ fontSize: 20 }}>📝</div> },
    { label: 'Settings', icon: <div style={{ fontSize: 20 }}>⚙️</div> }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', flexDirection: 'row' }}>
      {/* 桌面端/宽屏：左侧 NavigationRail */}
      {isWideScreen && (
        <NavigationRail mode="IconWithSelectedLabel">
          {navItems.map((item, index) => (
            <NavigationRailItem 
              key={index}
              selected={currentTab === index} 
              onClick={() => setCurrentTab(index)} 
              label={item.label} 
              icon={item.icon} 
            />
          ))}
        </NavigationRail>
      )}

      {/* 主内容区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: isWideScreen ? 'calc(100% - 80px)' : '100%' }}>
        <PullToRefresh isRefreshing={isRefreshing} onRefresh={handleRefresh}>
          <div style={{ paddingBottom: isWideScreen ? 0 : 80, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TopAppBar 
              title={getPageTitle()} 
              largeTitle={getPageTitle()}
              subtitle="Miuix Web React Demo"
              actions={
                <Button style={{ padding: '4px 12px', minHeight: 'unset', fontSize: 14 }}>Info</Button>
              }
            />

            <div style={{ flex: 1 }}>
              {renderContent()}
            </div>

            {/* 移动端/窄屏：底部 NavigationBar */}
            {!isWideScreen && (
              <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50 }}>
                <NavigationBar mode="IconWithSelectedLabel">
                  {navItems.map((item, index) => (
                    <NavigationBarItem 
                      key={index}
                      selected={currentTab === index} 
                      onClick={() => setCurrentTab(index)} 
                      label={item.label} 
                      icon={item.icon} 
                    />
                  ))}
                </NavigationBar>
              </div>
            )}

            <Snackbar 
              visible={snackbarVisible} 
              message="Hello from Miuix Snackbar!" 
              actionLabel="UNDO"
              onActionClick={() => alert('Undo clicked')}
              onDismiss={() => setSnackbarVisible(false)} 
            />
          </div>
        </PullToRefresh>
      </div>
    </div>
  );
}

export default App;
