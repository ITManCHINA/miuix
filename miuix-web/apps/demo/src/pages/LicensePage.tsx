import React from 'react';
import { TopAppBar, Card } from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

export const LicensePage: React.FC = () => {
  const { pop } = useNavigator();

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--miuix-color-background)' }}>
      <TopAppBar 
        title="License" 
        largeTitle="License"
        scrollBehavior="auto"
        onBackClick={pop}
      />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card>
          <div style={{ padding: 16, fontSize: 14, color: 'var(--miuix-color-on-surface-variant-summary)', lineHeight: 1.6 }}>
            <p><strong>Apache License</strong><br/>Version 2.0, January 2004<br/><a href="http://www.apache.org/licenses/" target="_blank" rel="noreferrer" style={{color: 'var(--miuix-color-primary)'}}>http://www.apache.org/licenses/</a></p>
            <p>TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION</p>
            <p>1. Definitions.</p>
            <p>"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.</p>
            <p>... (Truncated for brevity in Web Demo) ...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
