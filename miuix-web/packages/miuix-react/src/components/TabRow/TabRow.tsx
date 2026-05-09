import React, { useEffect, useRef, useState } from 'react';
import './TabRow.css';

export interface TabRowProps {
  tabs: string[];
  selectedTabIndex: number;
  onTabSelected: (index: number) => void;
  withContour?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TabRow: React.FC<TabRowProps> = ({
  tabs,
  selectedTabIndex,
  onTabSelected,
  withContour = false,
  className = '',
  style,
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: 'translateX(0px)' });
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs]);

  useEffect(() => {
    const selectedTab = tabRefs.current[selectedTabIndex];
    const container = containerRef.current;
    
    if (selectedTab && container) {
      // Calculate offset relative to the scrolling container
      const containerRect = container.getBoundingClientRect();
      const tabRect = selectedTab.getBoundingClientRect();
      
      const offsetLeft = tabRect.left - containerRect.left + container.scrollLeft;

      setIndicatorStyle({
        width: tabRect.width,
        transform: `translateX(${offsetLeft}px)`,
      });

      // Scroll into view if out of bounds (simplified version)
      const padding = 20;
      if (tabRect.left < containerRect.left + padding) {
        container.scrollBy({ left: tabRect.left - containerRect.left - padding, behavior: 'smooth' });
      } else if (tabRect.right > containerRect.right - padding) {
        container.scrollBy({ left: tabRect.right - containerRect.right + padding, behavior: 'smooth' });
      }
    }
  }, [selectedTabIndex, tabs]);

  return (
    <div 
      className={`miuix-tab-row ${withContour ? 'miuix-tab-row--contour' : ''} ${className}`}
      style={style}
    >
      <div className="miuix-tab-row-scroll-container" ref={containerRef}>
        <div className="miuix-tab-row-indicator" style={indicatorStyle} />
        {tabs.map((tab, index) => {
          const isSelected = selectedTabIndex === index;
          return (
            <div
              key={index}
              ref={el => tabRefs.current[index] = el}
              className={`miuix-tab-item ${isSelected ? 'miuix-tab-item--selected' : ''}`}
              onClick={() => onTabSelected(index)}
              role="tab"
              aria-selected={isSelected}
            >
              {tab}
            </div>
          );
        })}
      </div>
    </div>
  );
};
