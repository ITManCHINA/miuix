import React from 'react';
import './Card.css';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLongPress?: () => void;
  pressFeedback?: 'none' | 'sink' | 'tilt';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  style,
  onClick,
  onLongPress,
  pressFeedback = 'none',
}) => {
  const isClickable = !!onClick || !!onLongPress;
  
  // A simple long press implementation
  let timerId: ReturnType<typeof setTimeout>;
  
  const handlePointerDown = () => {
    if (onLongPress) {
      timerId = setTimeout(() => {
        onLongPress();
      }, 500); // 500ms for long press
    }
  };

  const handlePointerUp = () => {
    if (timerId) clearTimeout(timerId);
  };

  return (
    <div
      className={`miuix-card ${isClickable ? 'miuix-card--clickable' : ''} miuix-card--feedback-${pressFeedback} ${className}`}
      style={style}
      onClick={onClick}
      onPointerDown={isClickable ? handlePointerDown : undefined}
      onPointerUp={isClickable ? handlePointerUp : undefined}
      onPointerLeave={isClickable ? handlePointerUp : undefined}
    >
      {children}
    </div>
  );
};
