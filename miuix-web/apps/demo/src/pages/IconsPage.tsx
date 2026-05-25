import React, { useState, useEffect, useRef } from 'react';
import {
  TopAppBar, SearchBar, AllIcons, ExpandLessIcon, ExpandMoreIcon, Card,
  VerticalScrollBar, useScrollEndHaptic
} from '@miuix/react';

const weights = ['Light', 'Normal', 'Regular', 'Medium', 'Demibold'] as const;

function useIsWideScreen() {
  const [isWide, setIsWide] = useState(window.innerWidth > window.innerHeight);
  useEffect(() => {
    const handler = () => setIsWide(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isWide;
}

export const IconsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Bind physical boundary vibrations
  useScrollEndHaptic(scrollRef);

  const regularIcons = AllIcons.Regular;

  // Search filtering
  const filteredIndices = regularIcons
    .map((icon, idx) => ({ name: icon.name, idx }))
    .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ idx }) => idx);

  const isWide = useIsWideScreen();

  const handleSuggestionClick = (iconIdx: number) => {
    setSearchExpanded(false);
    setSearchValue('');
    setExpandedIndex(iconIdx);

    // Smooth scroll to focused card in viewport (KMP 1:1)
    setTimeout(() => {
      const el = document.getElementById(`icon-card-${iconIdx}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

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
      <TopAppBar title="Icon" largeTitle={isWide ? undefined : 'Icon'} />
      <div style={{ padding: '0 16px', flex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <SearchBar
            value={searchValue}
            onValueChange={setSearchValue}
            placeholder="Search icons"
            expanded={searchExpanded}
            onExpandedChange={setSearchExpanded}
          >
            {/* Search Suggestion Portal Content (KMP 1:1) */}
            <div style={{ padding: '8px 0' }}>
              {filteredIndices.map(iconIdx => (
                <div
                  key={iconIdx}
                  style={{ padding: '4px 12px' }}
                  onClick={() => handleSuggestionClick(iconIdx)}
                >
                  <Card>
                    <div
                      style={{
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        cursor: 'pointer',
                      }}
                    >
                      {React.createElement(regularIcons[iconIdx].component, {
                        style: { fontSize: 24, color: 'var(--miuix-color-on-background)' },
                      })}
                      <span style={{ fontSize: 16, color: 'var(--miuix-color-on-surface)' }}>
                        {regularIcons[iconIdx].name}
                      </span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </SearchBar>
        </div>

        <div style={{ backgroundColor: 'var(--miuix-color-surface-container)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '12px 16px 8px', color: 'var(--miuix-color-on-surface-variant-actions)' }}>
            <div style={{ flex: 1, fontSize: 13 }}>Name</div>
            <div style={{ fontSize: 13 }}>Tap to compare weights</div>
          </div>

          {regularIcons.map((regularIconObj, iconIdx) => {
            const isLast = iconIdx === regularIcons.length - 1;
            const expanded = expandedIndex === iconIdx;
            const RegularIconComp = regularIconObj.component;

            return (
              <div
                id={`icon-card-${iconIdx}`}
                key={iconIdx}
                style={{
                  padding: '6px 16px',
                  paddingBottom: isLast ? 12 : 6,
                  cursor: 'pointer',
                  borderBottom: isLast ? 'none' : '1px solid var(--miuix-color-divider-line)',
                  transition: 'background-color 0.2s',
                  backgroundColor: expanded ? 'var(--miuix-color-surface-container-high)' : 'transparent',
                }}
                onClick={() => setExpandedIndex(expanded ? -1 : iconIdx)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1, fontSize: 15, color: 'var(--miuix-color-on-surface)' }}>{regularIconObj.name}</div>
                  <RegularIconComp style={{ fontSize: 24, color: 'var(--miuix-color-on-background)' }} />
                  <div style={{ width: 8 }} />
                  <div style={{ fontSize: 18, color: 'var(--miuix-color-on-surface-variant-actions)' }}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </div>
                </div>

                {expanded && (
                  <div style={{ display: 'flex', marginTop: 10, marginBottom: 4 }}>
                    {weights.map(weight => {
                      const variantList = AllIcons[weight] as { name: string; component: any }[];
                      const variantObj = variantList.find(v => v.name === regularIconObj.name);
                      if (!variantObj) return <div key={weight} style={{ flex: 1 }} />;
                      const VariantComp = variantObj.component;

                      return (
                        <div key={weight} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <VariantComp style={{ fontSize: 28, color: 'var(--miuix-color-on-background)' }} />
                          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--miuix-color-on-surface-variant-actions)' }}>
                            {weight}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <VerticalScrollBar containerRef={scrollRef} />
    </div>
  );
};
