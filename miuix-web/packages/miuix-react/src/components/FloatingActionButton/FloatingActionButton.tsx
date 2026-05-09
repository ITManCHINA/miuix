import React from 'react';
import { Surface, SurfaceProps } from '../Surface/Surface';
import './FloatingActionButton.css';

export interface FloatingActionButtonProps extends Omit<SurfaceProps, 'color' | 'contentColor'> {
  containerColor?: string;
  minWidth?: number | string;
  minHeight?: number | string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  containerColor = 'var(--miuix-color-primary)',
  shadowElevation = 4,
  borderRadius = '50%',
  minWidth = 60,
  minHeight = 60,
  className = '',
  children,
  style,
  ...rest
}) => {
  return (
    <Surface
      onClick={onClick}
      color={containerColor}
      contentColor="var(--miuix-color-on-primary)"
      shadowElevation={shadowElevation}
      borderRadius={borderRadius}
      className={`miuix-fab ${className}`}
      style={{
        minWidth,
        minHeight,
        ...style,
      }}
      {...rest}
    >
      <div className="miuix-fab-content">
        {children}
      </div>
    </Surface>
  );
};
