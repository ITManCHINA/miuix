import React, { useEffect, useState } from 'react';

export const FPSMonitor: React.FC = () => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = () => {
      const now = performance.now();
      frameCount++;
      
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      right: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: '#00FF00',
      padding: '4px 8px',
      borderRadius: 16,
      fontFamily: 'monospace',
      fontSize: 12,
      fontWeight: 'bold',
      zIndex: 9999,
      pointerEvents: 'none',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      {fps} FPS
    </div>
  );
};
