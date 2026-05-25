import React, { useRef } from 'react';
import {
  Card, TopAppBar, SmallTitle, VerticalScrollBar, useScrollEndHaptic
} from '@miuix/react';

const SAMPLE_TEXT_CN = '天地玄黄 宇宙洪荒';
const SAMPLE_TEXT_EN = 'The Quick Brown Fox Jumps';
const SAMPLE_TEXT_NUM = '0123456789 !@#$%&';

const TEXT_STYLES = [
  { name: 'title1', fontSize: 32, fontWeight: 600, description: '32sp' },
  { name: 'title2', fontSize: 24, fontWeight: 600, description: '24sp' },
  { name: 'title3', fontSize: 20, fontWeight: 600, description: '20sp' },
  { name: 'title4', fontSize: 18, fontWeight: 600, description: '18sp' },
  { name: 'headline1', fontSize: 17, fontWeight: 600, description: '17sp' },
  { name: 'headline2', fontSize: 16, fontWeight: 600, description: '16sp' },
  { name: 'subtitle', fontSize: 14, fontWeight: 700, description: '14sp / Bold' },
  { name: 'main', fontSize: 17, fontWeight: 400, description: '17sp' },
  { name: 'paragraph', fontSize: 17, fontWeight: 400, lineHeight: 1.2, description: '17sp / lineHeight 1.2em' },
  { name: 'body1', fontSize: 16, fontWeight: 400, description: '16sp' },
  { name: 'body2', fontSize: 14, fontWeight: 400, description: '14sp' },
  { name: 'button', fontSize: 17, fontWeight: 600, description: '17sp' },
  { name: 'footnote1', fontSize: 13, fontWeight: 400, description: '13sp' },
  { name: 'footnote2', fontSize: 11, fontWeight: 400, description: '11sp' },
];

const TextStyleItem = ({ entry }: { entry: typeof TEXT_STYLES[0] }) => (
  <div style={{ padding: '10px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <div style={{ flex: 1, fontSize: 13, color: 'var(--miuix-color-on-surface)' }}>{entry.name}</div>
      <div style={{ fontSize: 11, color: 'var(--miuix-color-on-surface-variant-summary)' }}>{entry.description}</div>
    </div>
    <div
      style={{
        fontSize: entry.fontSize,
        fontWeight: entry.fontWeight,
        lineHeight: entry.lineHeight || 'normal',
        color: 'var(--miuix-color-on-surface)',
      }}
    >
      <div style={{ marginBottom: 2 }}>{SAMPLE_TEXT_CN}</div>
      <div style={{ marginBottom: 2 }}>{SAMPLE_TEXT_EN}</div>
      <div style={{ color: 'var(--miuix-color-on-surface-variant-summary)' }}>{SAMPLE_TEXT_NUM}</div>
    </div>
  </div>
);

const StyleCard = ({ title, startIdx, endIdx }: { title: string; startIdx: number; endIdx: number }) => {
  const items = TEXT_STYLES.slice(startIdx, endIdx);
  return (
    <>
      <SmallTitle text={title} />
      <Card>
        <div style={{ padding: '0 16px' }}>
          {items.map((entry, idx) => (
            <React.Fragment key={entry.name}>
              {idx > 0 && <div style={{ height: 1, backgroundColor: 'var(--miuix-color-divider-line)' }} />}
              <TextStyleItem entry={entry} />
            </React.Fragment>
          ))}
        </div>
      </Card>
    </>
  );
};

function useIsWideScreen() {
  const [isWide, setIsWide] = React.useState(window.innerWidth > window.innerHeight);
  React.useEffect(() => {
    const handler = () => setIsWide(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isWide;
}

export const TextStylePage: React.FC = () => {
  const isWide = useIsWideScreen();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Bind boundary feedback vibration
  useScrollEndHaptic(scrollRef);

  return (
    <div
      ref={scrollRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflowY: 'auto',
        paddingBottom: 32,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopAppBar title="Text Style" largeTitle={isWide ? undefined : 'Text Style'} />
      <div style={{ padding: '0 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StyleCard title="Title Styles" startIdx={0} endIdx={4} />
        <StyleCard title="Headline Styles" startIdx={4} endIdx={6} />
        <StyleCard title="Body Styles" startIdx={6} endIdx={12} />
        <StyleCard title="Footnote Styles" startIdx={12} endIdx={14} />

        <SmallTitle text="All Styles Overview" />
        <Card style={{ marginBottom: 12 }}>
          <div style={{ padding: 16 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: 'var(--miuix-color-on-surface)' }}>
              MIUIX Design Typography
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.5, margin: '0 0 12px 0', color: 'var(--miuix-color-on-surface)' }}>
              Compose Miuix UI provides a complete set of typography specifications designed to be highly readable, elegant, and modern. 
              The system adapts sizes dynamically for Phone, Pad, and foldables.
            </p>
            <div style={{ fontSize: 13, color: 'var(--miuix-color-on-surface-variant-summary)' }}>
              Footnote: Generated and rendered fully matching KMP specifications.
            </div>
          </div>
        </Card>
      </div>
      <VerticalScrollBar containerRef={scrollRef} />
    </div>
  );
};
