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
  LinkIcon,
  HorizontalSplitIcon,
  CreateIcon,
  ImageIcon
} from '@miuix/react';
import { MainPage } from '../pages/MainPage';
import { ColorPage } from '../pages/ColorPage';
import { SettingsPage } from '../pages/SettingsPage';
import { IconsPage } from '../pages/IconsPage';
import { TextStylePage } from '../pages/TextStylePage';
import { FPSMonitor } from './FPSMonitor';
import { useAppState } from '../contexts/AppStateContext';

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

export const MainShell: React.FC = () => {
  const { appState } = useAppState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const isWideScreen = useMediaQuery('(min-aspect-ratio: 1/1)');

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
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', flexDirection: 'row' }}>
      {/* 桌面端/宽屏：左侧 NavigationRail */}
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

      {/* 主内容区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: isWideScreen && appState.showNavigationBar ? 'calc(100% - 80px)' : '100%', position: 'relative' }}>
        <PullToRefresh isRefreshing={isRefreshing} onRefresh={handleRefresh}>
          <div style={{ paddingBottom: (!isWideScreen && appState.showNavigationBar) ? 80 : 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <PageTransition key={currentTab} in={true} animation="fade">
                {renderContent()}
              </PageTransition>
            </div>

            {/* 移动端/窄屏：底部 NavigationBar */}
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

            {/* 悬浮导航栏 FloatingNavigationBar */}
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

            {/* 悬浮工具栏 FloatingToolbar */}
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

            {/* 悬浮按钮 FloatingActionButton */}
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
