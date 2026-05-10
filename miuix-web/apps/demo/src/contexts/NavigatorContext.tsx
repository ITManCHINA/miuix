import React, { createContext, useContext, useState } from 'react';

export type RouteKey = 'Main' | 'PullToRefresh' | 'About' | 'License' | 'Navigation' | 'MultiScaffold';

export interface NavigatorContextType {
  backStack: RouteKey[];
  push: (route: RouteKey) => void;
  pop: () => void;
  current: () => RouteKey;
}

const NavigatorContext = createContext<NavigatorContextType>({
  backStack: ['Main'],
  push: () => {},
  pop: () => {},
  current: () => 'Main',
});

export const NavigatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backStack, setBackStack] = useState<RouteKey[]>(['Main']);

  const push = (route: RouteKey) => {
    setBackStack((prev) => [...prev, route]);
  };

  const pop = () => {
    setBackStack((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, prev.length - 1);
      }
      return prev;
    });
  };

  const current = () => backStack[backStack.length - 1];

  return (
    <NavigatorContext.Provider value={{ backStack, push, pop, current }}>
      {children}
    </NavigatorContext.Provider>
  );
};

export const useNavigator = () => useContext(NavigatorContext);
