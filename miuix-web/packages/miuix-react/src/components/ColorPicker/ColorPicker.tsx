import React, { useRef, useState, useEffect } from 'react';
import { Transforms, RGBA, rgbaToCssString } from '../../utils/colorUtils';
import { Slider } from '../Slider/Slider';
import './ColorPicker.css';

export interface ColorPickerProps {
  color: RGBA;
  onColorChange: (color: RGBA) => void;
  colorSpace?: 'HSV' | 'OkLCH'; // Support for future OkLCH
  showAlpha?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onColorChange,
  colorSpace = 'HSV',
  showAlpha = false,
  className = '',
  style,
}) => {
  if (colorSpace === 'HSV') {
    return <HsvColorPicker color={color} onColorChange={onColorChange} showAlpha={showAlpha} className={className} style={style} />;
  }
  // Fallback to HSV until OkLCH is fully implemented
  return <HsvColorPicker color={color} onColorChange={onColorChange} showAlpha={showAlpha} className={className} style={style} />;
};

interface HsvColorPickerProps extends Omit<ColorPickerProps, 'colorSpace'> {}

const HsvColorPicker: React.FC<HsvColorPickerProps> = ({
  color,
  onColorChange,
  showAlpha,
  className = '',
  style,
}) => {
  // Internal HSV state to prevent hue jumping when saturation is 0
  const [hsv, setHsv] = useState(() => Transforms.colorToHsv(color));
  const [alpha, setAlpha] = useState(color.a ?? 1);
  
  const boxRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Sync from props if color changes externally
  useEffect(() => {
    if (!isDragging.current) {
      const newHsv = Transforms.colorToHsv(color);
      // Only update if it's a meaningful change to avoid overwriting internal Hue when Saturation is 0
      if (Math.abs(newHsv[1] - hsv[1]) > 0.01 || Math.abs(newHsv[2] - hsv[2]) > 0.01) {
        setHsv(newHsv);
      }
      setAlpha(color.a ?? 1);
    }
  }, [color]);

  const handleHsvChange = (newH: number, newS: number, newV: number) => {
    setHsv([newH, newS, newV]);
    onColorChange(Transforms.hsvToColor(newH, newS, newV, alpha));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updateFromPointer(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const updateFromPointer = (e: React.PointerEvent) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    const s = x / rect.width;
    const v = 1 - (y / rect.height);

    handleHsvChange(hsv[0], s, v);
  };

  const baseHueColor = rgbaToCssString(Transforms.hsvToColor(hsv[0], 1, 1));
  const currentColorCss = rgbaToCssString(color);

  return (
    <div className={`miuix-color-picker ${className}`} style={style}>
      {/* 2D Saturation/Value Map */}
      <div 
        ref={boxRef}
        className="miuix-color-picker-box"
        style={{ backgroundColor: baseHueColor }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="miuix-color-picker-box-white" />
        <div className="miuix-color-picker-box-black" />
        
        {/* Thumb */}
        <div 
          className="miuix-color-picker-thumb"
          style={{
            left: `${hsv[1] * 100}%`,
            top: `${(1 - hsv[2]) * 100}%`,
            backgroundColor: currentColorCss,
          }}
        />
      </div>

      <div className="miuix-color-picker-controls">
        <div className="miuix-color-picker-preview" style={{ backgroundColor: currentColorCss }} />
        <div className="miuix-color-picker-sliders">
          {/* Hue Slider */}
          <div className="miuix-color-picker-hue-track">
            <Slider 
              value={hsv[0] / 360} 
              onValueChange={(val) => handleHsvChange(val * 360, hsv[1], hsv[2])} 
            />
          </div>
          
          {/* Alpha Slider */}
          {showAlpha && (
            <div className="miuix-color-picker-alpha-track" style={{ '--current-color': currentColorCss } as React.CSSProperties}>
              <Slider 
                value={alpha} 
                onValueChange={(val) => {
                  setAlpha(val);
                  onColorChange({ ...color, a: val });
                }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
