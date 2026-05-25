import React, { useRef } from 'react';
import {
  TopAppBar, Button, VerticalScrollBar, useScrollEndHaptic
} from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

export const MultiScaffoldTestPage: React.FC = () => {
  const { pop } = useNavigator();
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const scrollRef3 = useRef<HTMLDivElement>(null);
  const scrollRef4 = useRef<HTMLDivElement>(null);

  // Bind boundary physical bump vibrations to all independent scrolls
  useScrollEndHaptic(scrollRef1);
  useScrollEndHaptic(scrollRef2);
  useScrollEndHaptic(scrollRef3);
  useScrollEndHaptic(scrollRef4);

  const subScaffolds = [
    { ref: scrollRef1, title: 'Scaffold A-1', desc: 'Validates local portals and scrolling A.' },
    { ref: scrollRef2, title: 'Scaffold A-2', desc: 'Validates local portals and scrolling B.' },
    { ref: scrollRef3, title: 'Scaffold B-1', desc: 'Validates local portals and scrolling C.' },
    { ref: scrollRef4, title: 'Scaffold B-2', desc: 'Validates local portals and scrolling D.' },
  ];

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
        title="MultiScaffold 2x2 Grid"
        largeTitle="MultiScaffold 2x2"
        scrollBehavior="auto"
        onBackClick={pop}
      />
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 12,
          padding: 12,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {subScaffolds.map((item, idx) => (
          <div
            key={idx}
            ref={item.ref}
            style={{
              border: '1px solid var(--miuix-color-outline)',
              borderRadius: 16,
              overflowY: 'auto',
              position: 'relative',
              backgroundColor: 'var(--miuix-color-surface-container)',
              padding: 16,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--miuix-color-primary)', fontSize: 16 }}>{item.title}</h4>
            <p style={{ fontSize: 13, margin: '0 0 12px 0', color: 'var(--miuix-color-on-surface-variant-summary)', flexGrow: 1 }}>
              {item.desc}
            </p>
            <div
              style={{
                height: 120,
                backgroundColor: 'rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                marginBottom: 12,
                fontSize: 13,
                color: 'var(--miuix-color-on-surface-variant-actions)',
              }}
            >
              Scroll down me!
            </div>
            <Button onClick={pop} style={{ width: '100%' }}>
              Back
            </Button>
            <VerticalScrollBar containerRef={item.ref} />
          </div>
        ))}
      </div>
    </div>
  );
};
