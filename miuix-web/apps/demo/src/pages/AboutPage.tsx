import React from 'react';
import { TopAppBar, Card, BasicComponent } from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

export const AboutPage: React.FC = () => {
  const { pop } = useNavigator();

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--miuix-color-background)' }}>
      <TopAppBar 
        title="About" 
        largeTitle="About"
        scrollBehavior="auto"
        onBackClick={pop}
      />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0' }}>
          <img 
            src="https://raw.githubusercontent.com/compose-miuix-ui/miuix/main/docs/static/images/miuix-logo-new.png" 
            alt="MIUIX Logo" 
            style={{ width: 120, height: 120, borderRadius: 24, marginBottom: 16 }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500, color: 'var(--miuix-color-on-background)' }}>MIUIX Web</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: 'var(--miuix-color-on-surface-variant-summary)' }}>
            v0.1.0 (1)
          </p>
        </div>

        <Card>
          <BasicComponent 
            title="GitHub Repository" 
            summary="compose-miuix-ui/miuix"
            onClick={() => window.open('https://github.com/compose-miuix-ui/miuix', '_blank')}
          />
          <BasicComponent 
            title="License" 
            summary="Apache 2.0"
          />
        </Card>
      </div>
    </div>
  );
};
