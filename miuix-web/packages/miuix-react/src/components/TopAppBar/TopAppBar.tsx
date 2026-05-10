import React, { useEffect, useState, useRef } from 'react';
import './TopAppBar.css';

export interface TopAppBarProps {
  title: string;
  largeTitle?: string;
  subtitle?: string;
  navigationIcon?: React.ReactNode;
  actions?: React.ReactNode;
  onBackClick?: () => void;
  scrollBehavior?: 'pinned' | 'auto'; // 'auto' will listen to scroll
  className?: string;
  style?: React.CSSProperties;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  largeTitle,
  subtitle,
  navigationIcon,
  actions,
  onBackClick,
  scrollBehavior = 'auto',
  className = '',
  style,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const appBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollBehavior !== 'auto') return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollBehavior]);

  const displayLargeTitle = largeTitle || title;
  
  // Calculate dynamic heights and opacities based on scroll
  const maxScroll = 50; 
  const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  
  // Backdrop blur alpha (0 to 1 as we scroll)
  const backdropAlpha = scrollProgress;

  // Small title fades in and translates up slightly
  const smallTitleAlpha = scrollProgress;
  const smallTitleTranslateY = 15 * (1 - scrollProgress);

  // Large title shrinks and fades out slightly, but its container height reduces
  const largeTitleAlpha = 1 - (scrollProgress * 0.3);
  const largeTitleScale = 1 - (scrollProgress * 0.1);
  
  // Base height is 52px (top row) + approx 60px (large title area)
  // We reduce the height of the large title area as we scroll down
  const largeContainerHeight = 60 * (1 - scrollProgress);

  return (
    <div 
      ref={appBarRef}
      className={`miuix-top-app-bar ${className}`}
      style={{
        ...style,
        backgroundColor: scrollProgress > 0 ? 'transparent' : 'var(--miuix-color-background, #F2F2F2)'
      }}
    >
      <div 
        className="miuix-top-app-bar-backdrop" 
        style={{ opacity: backdropAlpha }}
      />
      
      <div className="miuix-top-app-bar-top-row">
        {(navigationIcon || onBackClick) && (
          <div 
            className="miuix-top-app-bar-nav-icon"
            onClick={onBackClick}
            style={onBackClick ? { cursor: 'pointer' } : {}}
          >
            {navigationIcon || (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            )}
          </div>
        )}
        <div 
          className="miuix-top-app-bar-small-title-container"
          style={{
            opacity: smallTitleAlpha,
            transform: `translateY(${smallTitleTranslateY}px)`
          }}
        >
          <div className="miuix-top-app-bar-small-title">{title}</div>
          {subtitle && <div className="miuix-top-app-bar-small-subtitle">{subtitle}</div>}
        </div>
        <div className="miuix-top-app-bar-actions">
          {actions}
        </div>
      </div>
      
      <div 
        className="miuix-top-app-bar-large-title-container"
        style={{
          height: `${largeContainerHeight}px`,
          opacity: largeTitleAlpha,
          transform: `scale(${largeTitleScale})`,
          pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto',
          overflow: 'hidden'
        }}
      >
        <div className="miuix-top-app-bar-large-title">{displayLargeTitle}</div>
        {subtitle && <div className="miuix-top-app-bar-large-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};
