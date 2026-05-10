import React, { useState } from 'react';
import { TopAppBar, SearchBar, AllIcons, ExpandLessIcon, ExpandMoreIcon } from '@miuix/react';

const weights = ['Light', 'Normal', 'Regular', 'Medium', 'Demibold'] as const;

export const IconsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const regularIcons = AllIcons.Regular;

  const filteredIndices = regularIcons
    .map((icon, idx) => ({ name: icon.name, idx }))
    .filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ idx }) => idx);

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Icon" largeTitle="Icon" />
      <div style={{ padding: '0 16px' }}>
        <div style={{ marginBottom: 16 }}>
          <SearchBar 
            value={searchValue} 
            onValueChange={setSearchValue} 
            placeholder="Search icons" 
            expanded={searchExpanded}
            onExpandedChange={setSearchExpanded}
          />
        </div>
        
        <div style={{ backgroundColor: 'var(--miuix-color-surface-container)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '12px 16px 8px', color: 'var(--miuix-color-on-surface-variant-actions)' }}>
            <div style={{ flex: 1, fontSize: 13 }}>Name</div>
            <div style={{ fontSize: 13 }}>Tap to compare weights</div>
          </div>
          
          {filteredIndices.map((iconIdx, displayIdx) => {
            const isLast = displayIdx === filteredIndices.length - 1;
            const expanded = expandedIndex === iconIdx;
            const regularIconObj = regularIcons[iconIdx];
            const RegularIconComp = regularIconObj.component;
            
            return (
              <div 
                key={iconIdx} 
                style={{ 
                  padding: '6px 16px', 
                  paddingBottom: isLast ? 12 : 6,
                  cursor: 'pointer'
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
    </div>
  );
};
