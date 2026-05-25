import React, { useState, useEffect } from 'react';
import {
  PullToRefresh,
  NavigationBar,
  NavigationBarItem,
  NavigationRail,
  NavigationRailItem,
  Snackbar,
  PageTransition,
  FloatingNavigationBar,
  FloatingToolbar,
  FloatingActionButton,
  SettingsIcon,
  EditIcon,
  DeleteIcon,
  MoreIcon,
  LinkIcon,
  HorizontalSplitIcon,
  CreateIcon,
  ImageIcon,
  BgEffectBackground,
} from '@miuix/react';
import { MainPage } from '../pages/MainPage';
import { ColorPage } from '../pages/ColorPage';
import { SettingsPage } from '../pages/SettingsPage';
import { IconsPage } from '../pages/IconsPage';
import { TextStylePage } from '../pages/TextStylePage';
import { FPSMonitor } from './FPSMonitor';
import { useAppState } from '../contexts/AppStateContext';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') return window.matchMedia(query).matches;
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export const MainShell: React.FC = () => {
  const { appState } = useAppState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const isWideScreen = useMediaQuery('(min-aspect-ratio: 1/1)');

  useEffect(() => {
    if (!appState.enableBlur) {
      document.body.classList.add('miuix-blur-disabled');
    } else {
      document.body.classList.remove('miuix-blur-disabled');
    }
  }, [appState.enableBlur]);

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

  const navItems = [
    { label: 'Home', icon: <HorizontalSplitIcon /> },
    { label: 'Icon', icon: <CreateIcon /> },
    { label: 'Color', icon: <ImageIcon /> },
    { label: 'TextStyle', icon: <EditIcon /> },
    { label: 'Settings', icon: <SettingsIcon /> }
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      flexDirection: 'row',
      overflow: 'hidden',
      backgroundColor: 'var(--miuix-color-surface)',
    }}>
      {/* Wide screen: left NavigationRail */}
      {isWideScreen && appState.showNavigationBar && (
        <NavigationRail mode={['IconAndText', 'IconOnly', 'TextOnly', 'IconWithSelectedLabel'][appState.navigationRailMode] as any}>
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

      {/* Main content area — scrollable */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        backgroundColor: appState.dynamicBackground ? 'transparent' : 'var(--miuix-color-surface)',
      }}>
        {appState.dynamicBackground && (
          <BgEffectBackground
            dynamicBackground={true}
            isOs3Effect={appState.isOs3Effect}
            isDarkTheme={document.documentElement.getAttribute('data-theme') === 'dark' || appState.colorMode === 2}
            deviceType={isWideScreen ? 'PAD' : 'PHONE'}
            alpha={0.85}
          />
        )}
        <PullToRefresh isRefreshing={isRefreshing} onRefresh={handleRefresh}>
          <div style={{ paddingBottom: (!isWideScreen && appState.showNavigationBar) ? 80 : 0, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <PageTransition key={currentTab} in={true} animation="fade">
                {renderContent()}
              </PageTransition>
            </div>

            {/* Mobile/narrow: bottom NavigationBar */}
            {!isWideScreen && appState.showNavigationBar && !appState.useFloatingNavigationBar && (
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

            {/* Floating NavigationBar */}
            {!isWideScreen && appState.showNavigationBar && appState.useFloatingNavigationBar && (
              <FloatingNavigationBar alignment={['center', 'start', 'end'][appState.floatingNavigationBarPosition] as any}>
                <NavigationBar mode="IconWithSelectedLabel" showDivider={false}>
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
              </FloatingNavigationBar>
            )}

            {/* Floating Toolbar */}
            {appState.showFloatingToolbar && (
              <FloatingToolbar
                position={['TopStart', 'CenterStart', 'BottomStart', 'TopEnd', 'CenterEnd', 'BottomEnd', 'TopCenter', 'BottomCenter'][appState.floatingToolbarPosition] as any}
                orientation={['horizontal', 'vertical'][appState.floatingToolbarOrientation] as any}
              >
                <div style={{ padding: '4px 8px', display: 'flex' }}><EditIcon /></div>
                <div style={{ padding: '4px 8px', display: 'flex' }}><DeleteIcon /></div>
                <div style={{ padding: '4px 8px', display: 'flex' }}><MoreIcon /></div>
              </FloatingToolbar>
            )}

            {/* FloatingActionButton */}
            {appState.showFloatingActionButton && (
              <div style={{
                position: 'fixed',
                zIndex: 90,
                bottom: appState.floatingActionButtonPosition >= 2 ? 100 : undefined,
                top: appState.floatingActionButtonPosition === 0 ? 100 : undefined,
                right: appState.floatingActionButtonPosition === 2 || appState.floatingActionButtonPosition === 3 ? 24 : undefined,
                left: appState.floatingActionButtonPosition === 0 ? 24 : undefined,
                transform: appState.floatingActionButtonPosition === 1 ? 'translateX(-50%)' : 'none',
                ...(appState.floatingActionButtonPosition === 1 && { left: '50%', bottom: 100 })
              }}>
                <FloatingActionButton onClick={() => window.open('https://github.com/compose-miuix-ui/miuix', '_blank')}>
                  <LinkIcon />
                </FloatingActionButton>
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
      {appState.showFPSMonitor && <FPSMonitor />}
    </div>
  );
};
