import React from 'react';
import { Card, TopAppBar, SmallTitle } from '@miuix/react';

const SAMPLE_TEXT_CN = "天地玄黄 宇宙洪荒";
const SAMPLE_TEXT_EN = "The Quick Brown Fox Jumps";
const SAMPLE_TEXT_NUM = "0123456789 !@#$%&";

const TEXT_STYLES = [
  { name: "title1", fontSize: 32, fontWeight: 600, description: "32sp" },
  { name: "title2", fontSize: 24, fontWeight: 600, description: "24sp" },
  { name: "title3", fontSize: 20, fontWeight: 600, description: "20sp" },
  { name: "title4", fontSize: 18, fontWeight: 600, description: "18sp" },
  { name: "headline1", fontSize: 17, fontWeight: 600, description: "17sp" },
  { name: "headline2", fontSize: 16, fontWeight: 600, description: "16sp" },
  { name: "subtitle", fontSize: 14, fontWeight: 700, description: "14sp / Bold" },
  { name: "main", fontSize: 17, fontWeight: 400, description: "17sp" },
  { name: "paragraph", fontSize: 17, fontWeight: 400, lineHeight: 1.2, description: "17sp / lineHeight 1.2em" },
  { name: "body1", fontSize: 16, fontWeight: 400, description: "16sp" },
  { name: "body2", fontSize: 14, fontWeight: 400, description: "14sp" },
  { name: "button", fontSize: 17, fontWeight: 600, description: "17sp" },
  { name: "footnote1", fontSize: 13, fontWeight: 400, description: "13sp" },
  { name: "footnote2", fontSize: 11, fontWeight: 400, description: "11sp" }
];

const TextStyleItem = ({ entry }: { entry: typeof TEXT_STYLES[0] }) => (
  <div style={{ padding: '12px 0' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <div style={{ flex: 1, fontSize: 13, color: 'var(--miuix-color-on-surface)' }}>{entry.name}</div>
      <div style={{ fontSize: 11, color: 'var(--miuix-color-on-surface-variant-summary)' }}>{entry.description}</div>
    </div>
    
    <div style={{ 
      fontSize: entry.fontSize, 
      fontWeight: entry.fontWeight, 
      lineHeight: entry.lineHeight || 'normal',
      color: 'var(--miuix-color-on-surface)'
    }}>
      <div style={{ marginBottom: 2 }}>{SAMPLE_TEXT_CN}</div>
      <div style={{ marginBottom: 2 }}>{SAMPLE_TEXT_EN}</div>
      <div style={{ color: 'var(--miuix-color-on-surface-variant-summary)' }}>{SAMPLE_TEXT_NUM}</div>
    </div>
  </div>
);

const StyleGroup = ({ title, startIndex, endIndex }: { title: string, startIndex: number, endIndex: number }) => {
  const items = TEXT_STYLES.slice(startIndex, endIndex);
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

export const TextStylePage: React.FC = () => {
  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Text Style" largeTitle="Text Style" />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <StyleGroup title="Title Styles" startIndex={0} endIndex={4} />
        <StyleGroup title="Headline Styles" startIndex={4} endIndex={6} />
        <StyleGroup title="Body Styles" startIndex={6} endIndex={12} />
        <StyleGroup title="Footnote Styles" startIndex={12} endIndex={14} />
        <StyleGroup title="All Styles Overview" startIndex={0} endIndex={14} />
      </div>
    </div>
  );
};
