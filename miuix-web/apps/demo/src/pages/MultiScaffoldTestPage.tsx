import React from 'react';
import { TopAppBar, Card, Button } from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

export const MultiScaffoldTestPage: React.FC = () => {
  const { pop } = useNavigator();

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--miuix-color-background)' }}>
      <TopAppBar 
        title="MultiScaffold Test" 
        largeTitle="MultiScaffold Test"
        scrollBehavior="auto"
        onBackClick={pop}
      />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, color: 'var(--miuix-color-on-surface)' }}>
              This page demonstrates how multiple Scaffolds (or in this React version, nested flex layouts) can coexist without interfering with safe areas and scrolling.
            </p>
            <Button onClick={pop}>Go Back</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
