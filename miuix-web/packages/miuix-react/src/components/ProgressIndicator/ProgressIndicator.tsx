import React from 'react';
import './ProgressIndicator.css';

export interface LinearProgressIndicatorProps {
  progress?: number; // 0.0 to 1.0, undefined for indeterminate
  className?: string;
  style?: React.CSSProperties;
}

export const LinearProgressIndicator: React.FC<LinearProgressIndicatorProps> = ({
  progress,
  className = '',
  style,
}) => {
  const isIndeterminate = progress === undefined;
  const clampedProgress = !isIndeterminate ? Math.max(0, Math.min(1, progress)) : 0;

  return (
    <div 
      className={`miuix-linear-progress ${isIndeterminate ? 'miuix-linear-progress--indeterminate' : ''} ${className}`}
      style={style}
      role="progressbar"
      aria-valuenow={!isIndeterminate ? clampedProgress * 100 : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="miuix-linear-progress-track" />
      <div 
        className="miuix-linear-progress-bar" 
        style={!isIndeterminate ? { width: `${clampedProgress * 100}%` } : {}}
      />
      {isIndeterminate && <div className="miuix-linear-progress-bar miuix-linear-progress-bar--second" />}
    </div>
  );
};

export interface CircularProgressIndicatorProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({
  progress,
  size = 30,
  strokeWidth = 4,
  className = '',
  style,
}) => {
  const isIndeterminate = progress === undefined;
  const clampedProgress = !isIndeterminate ? Math.max(0, Math.min(1, progress)) : 0;
  
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div 
      className={`miuix-circular-progress ${isIndeterminate ? 'miuix-circular-progress--indeterminate' : ''} ${className}`}
      style={{ width: size, height: size, ...style }}
      role="progressbar"
      aria-valuenow={!isIndeterminate ? clampedProgress * 100 : undefined}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="miuix-circular-progress-svg">
        <circle
          className="miuix-circular-progress-track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="miuix-circular-progress-bar"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={!isIndeterminate ? circumference * (1 - clampedProgress) : circumference * 0.25}
        />
      </svg>
    </div>
  );
};

export interface InfiniteProgressIndicatorProps {
  size?: number;
  strokeWidth?: number;
  orbitingDotSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const InfiniteProgressIndicator: React.FC<InfiniteProgressIndicatorProps> = ({
  size = 20,
  strokeWidth = 2,
  orbitingDotSize = 2,
  className = '',
  style,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const orbitRadius = radius - 2 * orbitingDotSize;

  return (
    <div 
      className={`miuix-infinite-progress ${className}`}
      style={{ width: size, height: size, ...style }}
      role="progressbar"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="miuix-infinite-progress-svg">
        <circle
          className="miuix-infinite-progress-track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* The dot's animation is driven by CSS transform on the whole SVG or group */}
        <g className="miuix-infinite-progress-dot-group" style={{ transformOrigin: 'center' }}>
          <circle
            className="miuix-infinite-progress-dot"
            cx={center + orbitRadius}
            cy={center}
            r={orbitingDotSize}
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
};
