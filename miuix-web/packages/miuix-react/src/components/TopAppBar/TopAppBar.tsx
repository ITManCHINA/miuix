import React, { useEffect, useState } from 'react';
import './TopAppBar.css';

export interface TopAppBarProps {
  title: string;
  largeTitle?: string;
  subtitle?: string;
  navigationIcon?: React.ReactNode;
  actions?: React.ReactNode;
  scrollBehavior?: 'pinned' | 'auto'; // 'auto' will listen to window scroll
  className?: string;
  style?: React.CSSProperties;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  largeTitle,
  subtitle,
  navigationIcon,
  actions,
  scrollBehavior = 'auto',
  className = '',
  style,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (scrollBehavior !== 'auto') return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollBehavior]);

  const displayLargeTitle = largeTitle || title;
  
  // Max scroll distance to collapse
  const maxScroll = 60;
  const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

  // Small title fades in, translates up
  const smallTitleAlpha = scrollProgress;
  const smallTitleTranslateY = 20 * (1 - scrollProgress);

  // Large title fades out
  const largeTitleAlpha = 1 - scrollProgress;
  const largeTitleTranslateY = -scrollY;

  return (
    <div 
      className={`miuix-top-app-bar ${className}`}
      style={style}
    >
      <div className="miuix-top-app-bar-top-row">
        <div className="miuix-top-app-bar-nav-icon">
          {navigationIcon}
        </div>
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
          opacity: largeTitleAlpha,
          transform: `translateY(${largeTitleTranslateY}px)`,
          pointerEvents: largeTitleAlpha > 0 ? 'auto' : 'none'
        }}
      >
        <div className="miuix-top-app-bar-large-title">{displayLargeTitle}</div>
        {subtitle && <div className="miuix-top-app-bar-large-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};
