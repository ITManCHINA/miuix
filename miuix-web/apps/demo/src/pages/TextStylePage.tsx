import React from 'react';
import { TopAppBar } from '@miuix/react';

export const TextStylePage: React.FC = () => {
  return (
    <div style={{ paddingBottom: 32 }}>
      <TopAppBar title="TextStyle" largeTitle="TextStyle" subtitle="Typography" />
      <div style={{ padding: 16 }}>
        <h2>Typography & Text Styles</h2>
        <p style={{ color: 'var(--miuix-color-on-surface-variant-summary)' }}>
        Displaying various text styles used in MIUIX.
      </p>
    </div>
  </div>
  );
};
