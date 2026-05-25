import React, { useRef } from 'react';
import {
  TopAppBar, Card, Button, VerticalScrollBar, useScrollEndHaptic
} from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

export const NavigationTestPage: React.FC = () => {
  const { push, pop, backStack } = useNavigator();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Bind boundary feedback vibration
  useScrollEndHaptic(scrollRef);

  // Find out how many times this route is in the stack
  const index = backStack.filter(r => r === 'Navigation').length;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--miuix-color-background)',
      }}
    >
      <TopAppBar
        title={`Navigation Test ${index}`}
        largeTitle={`Navigation Test ${index}`}
        scrollBehavior="auto"
        onBackClick={pop}
      />
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
          padding: '0 16px',
        }}
      >
        <Card style={{ marginTop: 12 }}>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, color: 'var(--miuix-color-on-surface)' }}>
              This page tests deep navigation stack. Current depth of this route: {index}.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <Button onClick={() => push('Navigation')}>Push another</Button>
              <Button onClick={pop}>Pop</Button>
            </div>
          </div>
        </Card>
        <VerticalScrollBar containerRef={scrollRef} />
      </div>
    </div>
  );
};
