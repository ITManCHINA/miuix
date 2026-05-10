import React, { useRef, useState, useEffect } from 'react';
import './PullToRefresh.css';

export interface PullToRefreshProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  children: React.ReactNode;
  refreshTexts?: [string, string, string, string]; // [Idle, Pulling, Refreshing, Complete]
  className?: string;
  style?: React.CSSProperties;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  isRefreshing,
  onRefresh,
  children,
  refreshTexts = ['', 'Pull to refresh', 'Refreshing...', 'Refresh complete'],
  className = '',
  style,
}) => {
  const [pullProgress, setPullProgress] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [internalState, setInternalState] = useState<'idle' | 'pulling' | 'threshold' | 'refreshing' | 'complete'>('idle');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isAtTop = useRef(true);

  const THRESHOLD = 80;
  const MAX_DRAG = 150;

  // Sync external isRefreshing state
  useEffect(() => {
    if (isRefreshing && internalState !== 'refreshing') {
      setInternalState('refreshing');
      setDragOffset(THRESHOLD);
    } else if (!isRefreshing && internalState === 'refreshing') {
      setInternalState('complete');
      setTimeout(() => {
        setInternalState('idle');
        setDragOffset(0);
        setPullProgress(0);
      }, 500); // Wait for completion animation
    }
  }, [isRefreshing]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (internalState === 'refreshing' || internalState === 'complete') return;
    
    // Check if we are at the top of the window
    if (typeof window !== 'undefined') {
      isAtTop.current = window.scrollY <= 0;
    }
    
    if (isAtTop.current) {
      startY.current = e.touches[0].clientY;
      currentY.current = startY.current;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || internalState === 'refreshing' || internalState === 'complete') return;
    
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0 && isAtTop.current) {
      // Prevent default scrolling when pulling down
      if (e.cancelable) e.preventDefault();
      
      // Apply some resistance
      const offset = Math.min(deltaY * 0.5, MAX_DRAG);
      setDragOffset(offset);
      setPullProgress(Math.min(offset / THRESHOLD, 1));
      
      setInternalState(offset >= THRESHOLD ? 'threshold' : 'pulling');
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling) return;
    setIsPulling(false);
    
    if (internalState === 'threshold') {
      // Trigger refresh
      setInternalState('refreshing');
      setDragOffset(THRESHOLD);
      onRefresh();
    } else if (internalState === 'pulling') {
      // Rebound
      setDragOffset(0);
      setPullProgress(0);
      setInternalState('idle');
    }
  };

  let statusText = refreshTexts[0];
  if (internalState === 'pulling' || internalState === 'threshold') statusText = internalState === 'threshold' ? refreshTexts[1] : refreshTexts[0];
  if (internalState === 'refreshing') statusText = refreshTexts[2];
  if (internalState === 'complete') statusText = refreshTexts[3];

  return (
    <div 
      className={`miuix-pull-to-refresh ${className}`} 
      style={style}
    >
      <div 
        className="miuix-pull-to-refresh-indicator"
        style={{
          height: Math.max(0, dragOffset),
          opacity: dragOffset > 0 ? 1 : 0,
        }}
      >
        <div className="miuix-pull-to-refresh-spinner-container">
          <svg 
            className={`miuix-pull-to-refresh-spinner ${internalState === 'refreshing' ? 'miuix-pull-to-refresh-spinner--spinning' : ''}`}
            viewBox="0 0 24 24" 
            style={{ 
              transform: internalState !== 'refreshing' ? `rotate(${pullProgress * 180}deg)` : undefined
            }}
          >
            <circle 
              cx="12" cy="12" r="10" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeDasharray={internalState === 'refreshing' ? '40 60' : `${pullProgress * 50} 100`}
            />
          </svg>
        </div>
        {statusText && <span className="miuix-pull-to-refresh-text">{statusText}</span>}
      </div>
      
      <div 
        ref={containerRef}
        className={`miuix-pull-to-refresh-content ${!isPulling ? 'miuix-pull-to-refresh-content--animating' : ''}`}
        style={{
          transform: `translateY(${dragOffset}px)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};
