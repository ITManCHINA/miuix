import React from 'react';
import { useNavigator } from '../contexts/NavigatorContext';
import { PageTransition } from '@miuix/react';

interface NavDisplayProps {
  children: React.ReactNode;
}

export const NavDisplay: React.FC<NavDisplayProps> = ({ children }) => {
  const { current } = useNavigator();
  const currentRoute = current();

  // In a real implementation this would manage enter/exit animations for all stack entries.
  // For now, we just render the top of the stack and use PageTransition to fade/slide it in.

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <PageTransition key={currentRoute} in={true} animation="slide-left">
        {children}
      </PageTransition>
    </div>
  );
};
