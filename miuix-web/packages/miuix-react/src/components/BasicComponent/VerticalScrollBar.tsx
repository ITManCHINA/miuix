import React, { useEffect, useState } from 'react';
import './VerticalScrollBar.css';

export interface VerticalScrollBarProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const VerticalScrollBar: React.FC<VerticalScrollBarProps> = ({ containerRef }) => {
  const [thumbStyle, setThumbStyle] = useState<{
    opacity: number;
    height: number;
    top: number;
  }>({
    opacity: 0,
    height: 0,
    top: 0
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let fadeTimeout: any;

    const handleScroll = () => {
      const sh = el.scrollHeight;
      const ch = el.clientHeight;
      const st = el.scrollTop;

      if (sh <= ch) {
        setThumbStyle(prev => ({ ...prev, opacity: 0 }));
        return;
      }

      const ratio = ch / sh;
      const thumbH = Math.max(30, ch * ratio);
      const maxScroll = sh - ch;
      const maxThumbTop = ch - thumbH - 12; // 6px inset top and bottom
      const thumbTop = 6 + (st / maxScroll) * maxThumbTop;

      setThumbStyle({
        opacity: 0.35, // Premium subtle opacity matching native
        height: thumbH,
        top: thumbTop
      });

      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(() => {
        setThumbStyle(prev => ({ ...prev, opacity: 0 }));
      }, 800);
    };

    // Attach resize listener to recompute if window/container resizes
    const resizeObserver = new ResizeObserver(() => handleScroll());
    resizeObserver.observe(el);

    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      clearTimeout(fadeTimeout);
    };
  }, [containerRef]);

  return (
    <div className="miuix-scrollbar-track">
      <div 
        className="miuix-scrollbar-thumb" 
        style={{
          height: thumbStyle.height,
          top: thumbStyle.top,
          opacity: thumbStyle.opacity,
          transition: thumbStyle.opacity === 0 ? 'opacity 0.4s ease' : 'none'
        }}
      />
    </div>
  );
};
