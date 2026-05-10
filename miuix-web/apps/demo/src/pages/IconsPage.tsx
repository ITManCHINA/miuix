import React from 'react';
import { TopAppBar } from '@miuix/react';

export const IconsPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: 32 }}>
      <TopAppBar title="Icons" largeTitle="Icons" subtitle="Miuix Icons" />
      <div style={{ padding: 16 }}>
        <h2>Icons</h2>
        <p style={{ color: 'var(--miuix-color-on-surface-variant-summary)' }}>
        Various system icons used in MIUIX.
      </p>
    </div>
  </div>
  );
};
