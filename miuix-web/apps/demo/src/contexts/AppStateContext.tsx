import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppState {
  showFPSMonitor: boolean;
  enableBlur: boolean;
  showTopAppBar: boolean;
  showNavigationBar: boolean;
  navigationRailMode: number; // 0=IconAndText, 1=IconOnly, 2=TextOnly, 3=IconWithSelectedLabel
  navigationBarMode: number;  // 0=IconAndText, 1=IconOnly, 2=TextOnly, 3=IconWithSelectedLabel
  useFloatingNavigationBar: boolean;
  floatingNavigationBarStyle: number;
  floatingNavigationBarPosition: number;
  showFloatingToolbar: boolean;
  floatingToolbarPosition: number;
  floatingToolbarOrientation: number;
  showFloatingActionButton: boolean;
  floatingActionButtonPosition: number;
  enableScrollEndHaptic: boolean;
  enablePageUserScroll: boolean;
  colorMode: number; // 0=System, 1=Light, 2=Dark, ...
  seedIndex: number;
  paletteStyle: number;
  colorSpec: number;
  enableCornerClip: boolean;
  enableDim: boolean;
  blockInputDuringTransition: boolean;
  popDirectionFollowsSwipeEdge: boolean;
  dynamicBackground: boolean;
  isOs3Effect: boolean;
}

const defaultAppState: AppState = {
  showFPSMonitor: true,
  enableBlur: true,
  showTopAppBar: true,
  showNavigationBar: true,
  navigationRailMode: 3,
  navigationBarMode: 3,
  useFloatingNavigationBar: false,
  floatingNavigationBarStyle: 0,
  floatingNavigationBarPosition: 0,
  showFloatingToolbar: false,
  floatingToolbarPosition: 0,
  floatingToolbarOrientation: 0,
  showFloatingActionButton: true,
  floatingActionButtonPosition: 2, // End
  enableScrollEndHaptic: true,
  enablePageUserScroll: false, // Wait, demo usually uses false or true? True for horizontal swipe, but web usually disables it for tabs.
  colorMode: 0,
  seedIndex: 0,
  paletteStyle: 0,
  colorSpec: 0,
  enableCornerClip: false,
  enableDim: true,
  blockInputDuringTransition: true,
  popDirectionFollowsSwipeEdge: false,
  dynamicBackground: true,
  isOs3Effect: true,
};

interface AppStateContextType {
  appState: AppState;
  updateAppState: (updater: (state: AppState) => AppState) => void;
}

const AppStateContext = createContext<AppStateContextType>({
  appState: defaultAppState,
  updateAppState: () => {},
});

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(defaultAppState);

  const updateAppState = (updater: (state: AppState) => AppState) => {
    setAppState((prev) => updater(prev));
  };

  useEffect(() => {
    const html = document.documentElement;
    if (appState.colorMode === 0 || appState.colorMode === 3) {
      // System or MonetSystem
      html.removeAttribute('data-theme');
    } else if (appState.colorMode === 1 || appState.colorMode === 4) {
      // Light or MonetLight
      html.setAttribute('data-theme', 'light');
    } else if (appState.colorMode === 2 || appState.colorMode === 5) {
      // Dark or MonetDark
      html.setAttribute('data-theme', 'dark');
    }
  }, [appState.colorMode]);

  return (
    <AppStateContext.Provider value={{ appState, updateAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
