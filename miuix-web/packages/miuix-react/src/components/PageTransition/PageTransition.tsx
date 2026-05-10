import React, { useEffect, useState } from 'react';
import './PageTransition.css';

export interface PageTransitionProps {
  children: React.ReactNode;
  animation?: 'slide-left' | 'slide-right' | 'fade' | 'zoom';
  in?: boolean;
  onExited?: () => void;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  animation = 'slide-left',
  in: inProp = true,
  onExited,
  className = '',
}) => {
  const [stage, setStage] = useState<'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited'>(
    inProp ? 'enter' : 'exited'
  );

  useEffect(() => {
    if (inProp) {
      if (stage !== 'entered' && stage !== 'entering') {
        setStage('enter');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setStage('entering'));
        });
      }
    } else {
      if (stage !== 'exited' && stage !== 'exiting') {
        setStage('exit');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setStage('exiting'));
        });
      }
    }
  }, [inProp, stage]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (stage === 'entering') {
      timer = setTimeout(() => setStage('entered'), 300);
    } else if (stage === 'exiting') {
      timer = setTimeout(() => {
        setStage('exited');
        if (onExited) onExited();
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [stage, onExited]);

  if (stage === 'exited' && !inProp) {
    return null;
  }

  const animClass = `miuix-transition-${animation}`;
  const stageClass = `miuix-transition--${stage}`;

  return (
    <div className={`miuix-page-transition ${animClass} ${stageClass} ${className}`}>
      {children}
    </div>
  );
};
