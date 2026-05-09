import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import './Slider.css';

export interface SliderColors {
  foregroundColor: string;
  disabledForegroundColor: string;
  backgroundColor: string;
  disabledBackgroundColor: string;
  thumbColor: string;
  disabledThumbColor: string;
}

export const SliderDefaults = {
  minHeight: 28,
  sliderColors: (
    foregroundColor = 'var(--miuix-color-primary)',
    disabledForegroundColor = 'var(--miuix-color-disabled-primary-slider)',
    backgroundColor = 'var(--miuix-color-slider-background)',
    disabledBackgroundColor = 'var(--miuix-color-disabled-secondary)',
    thumbColor = 'var(--miuix-color-on-primary)',
    disabledThumbColor = 'var(--miuix-color-disabled-on-primary)'
  ): SliderColors => ({
    foregroundColor,
    disabledForegroundColor,
    backgroundColor,
    disabledBackgroundColor,
    thumbColor,
    disabledThumbColor,
  }),
};

export interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  enabled?: boolean;
  colors?: SliderColors;
  className?: string;
  style?: React.CSSProperties;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 1,
  enabled = true,
  colors,
  className = '',
  style,
}) => {
  const mergedColors = useMemo(() => colors || SliderDefaults.sliderColors(), [colors]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const foregroundColor = enabled ? mergedColors.foregroundColor : mergedColors.disabledForegroundColor;
  const backgroundColor = enabled ? mergedColors.backgroundColor : mergedColors.disabledBackgroundColor;
  const thumbColor = enabled ? mergedColors.thumbColor : mergedColors.disabledThumbColor;

  const fraction = Math.max(0, Math.min(1, (value - min) / (max - min)));

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!enabled) return;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateValue(e.clientX);
    if (navigator.vibrate) navigator.vibrate(5);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging || !enabled) return;
    updateValue(e.clientX);
  }, [isDragging, enabled, min, max, onValueChange]);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  const updateValue = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const thumbRadius = SliderDefaults.minHeight / 2;
    const availableWidth = Math.max(0, rect.width - 2 * thumbRadius);
    
    let newFraction = (clientX - rect.left - thumbRadius) / availableWidth;
    newFraction = Math.max(0, Math.min(1, newFraction));
    onValueChange(min + newFraction * (max - min));
  };

  useEffect(() => {
    const handleMove = (e: PointerEvent) => handlePointerMove(e);
    const handleUp = (e: PointerEvent) => handlePointerUp(e);

    if (isDragging) {
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    }

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const thumbSize = SliderDefaults.minHeight;
  const thumbScale = isDragging || isHovering ? 1.127 : 1;
  const fillWidth = `calc(${thumbSize}px + ${fraction} * (100% - ${thumbSize}px))`;

  return (
    <div
      className={`miuix-slider ${!enabled ? 'miuix-slider--disabled' : ''} ${className}`}
      style={{
        ...style,
        height: SliderDefaults.minHeight,
        borderRadius: SliderDefaults.minHeight / 2,
        backgroundColor: backgroundColor,
      }}
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      <div 
        className="miuix-slider-fill"
        style={{
          width: fillWidth,
          backgroundColor: foregroundColor,
          borderRadius: SliderDefaults.minHeight / 2,
        }}
      />
      <div 
        className="miuix-slider-thumb"
        style={{
          backgroundColor: thumbColor,
          transform: `scale(${thumbScale})`,
          left: `calc(${fraction} * (100% - ${thumbSize}px))`,
          width: thumbSize,
          height: thumbSize,
        }}
      />
    </div>
  );
};
