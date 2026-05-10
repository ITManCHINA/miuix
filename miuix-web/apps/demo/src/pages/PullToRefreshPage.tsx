import React, { useState } from 'react';
import { TopAppBar, PullToRefresh, Card, BasicComponent } from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

export const PullToRefreshPage: React.FC = () => {
  const { pop } = useNavigator();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [items, setItems] = useState<number[]>([]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setItems(prev => [Date.now(), ...prev]);
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--miuix-color-background)' }}>
      <TopAppBar 
        title="Pull To Refresh" 
        largeTitle="Pull To Refresh"
        scrollBehavior="auto"
        onBackClick={pop}
      />
      <div style={{ flex: 1 }}>
        <PullToRefresh isRefreshing={isRefreshing} onRefresh={handleRefresh}>
          <div style={{ padding: '16px', minHeight: 'calc(100vh - 60px)' }}>
            <Card>
              <BasicComponent 
                title="Pull down to refresh" 
                summary="A new item with timestamp will be prepended." 
              />
              {items.map(item => (
                <BasicComponent 
                  key={item} 
                  title={`Item ${item}`} 
                  summary={new Date(item).toLocaleTimeString()} 
                />
              ))}
            </Card>
          </div>
        </PullToRefresh>
      </div>
    </div>
  );
};
