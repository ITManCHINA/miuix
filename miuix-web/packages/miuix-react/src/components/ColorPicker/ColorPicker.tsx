import React, { useRef, useState, useEffect } from 'react';
import { Transforms, RGBA, rgbaToCssString } from '../../utils/colorUtils';
import { Slider } from '../Slider/Slider';
import './ColorPicker.css';

export interface ColorPickerProps {
  color: RGBA;
  onColorChange: (color: RGBA) => void;
  colorSpace?: 'HSV' | 'OkLCH' | 'OkLab';
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
  if (colorSpace === 'OkLCH') {
    return <OkLchColorPicker color={color} onColorChange={onColorChange} showAlpha={showAlpha} className={className} style={style} />;
  }
  if (colorSpace === 'OkLab') {
    return <OkLabColorPicker color={color} onColorChange={onColorChange} showAlpha={showAlpha} className={className} style={style} />;
  }
  return <HsvColorPicker color={color} onColorChange={onColorChange} showAlpha={showAlpha} className={className} style={style} />;
};

interface SubPickerProps extends Omit<ColorPickerProps, 'colorSpace'> {}

const CustomColorSlider = ({ 
  value, 
  onValueChange, 
  colors,
  checkerboard = false 
}: { 
  value: number, 
  onValueChange: (v: number) => void, 
  colors: string[],
  checkerboard?: boolean
}) => {
  const gradient = `linear-gradient(to right, ${colors.join(', ')})`;
  const background = checkerboard 
    ? `${gradient}, conic-gradient(#ccc 25%, white 25%, white 50%, #ccc 50%, #ccc 75%, white 75%, white 100%)`
    : gradient;
  const backgroundSize = checkerboard ? '100% 100%, 16px 16px' : 'auto';

  return (
    <div className="miuix-custom-color-slider" style={{ background, backgroundSize }}>
      <Slider value={value} onValueChange={onValueChange} />
    </div>
  );
};

const OkLchColorPicker: React.FC<SubPickerProps> = ({ color, onColorChange, showAlpha, className = '', style }) => {
  const [lch, setLch] = useState(() => Transforms.colorToOklch(color));
  const [alpha, setAlpha] = useState(color.a ?? 1);

  const isInternalChange = useRef(false);

  useEffect(() => {
    if (!isInternalChange.current) {
      const newLch = Transforms.colorToOklch(color);
      // Avoid resetting Hue if Chroma is 0
      if (Math.abs(newLch[1] - lch[1]) > 0.01 || Math.abs(newLch[0] - lch[0]) > 0.01) {
        setLch(newLch);
      }
      setAlpha(color.a ?? 1);
    }
    isInternalChange.current = false;
  }, [color]);

  const handleChange = (l: number, c: number, h: number, a: number) => {
    setLch([l, c, h]);
    setAlpha(a);
    isInternalChange.current = true;
    onColorChange(Transforms.oklchToColor(l, c, h, a));
  };

  const l = lch[0];
  const c = lch[1];
  const h = lch[2];

  const hueColors = React.useMemo(() => 
    Transforms.generateOkLchHueColors(l, c, 36).map(rgbaToCssString),
  [l, c]);

  const lightColors = React.useMemo(() => [
    rgbaToCssString(Transforms.oklchToColor(0, c, h, 1)),
    rgbaToCssString(Transforms.oklchToColor(1, c, h, 1))
  ], [c, h]);

  const chromaColors = React.useMemo(() => [
    rgbaToCssString(Transforms.oklchToColor(l, 0, h, 1)),
    rgbaToCssString(Transforms.oklchToColor(l, 0.4, h, 1))
  ], [l, h]);

  const currentColorCss = rgbaToCssString(color);
  const alphaColors = [
    rgbaToCssString({ ...color, a: 0 }),
    rgbaToCssString({ ...color, a: 1 })
  ];

  return (
    <div className={`miuix-color-picker ${className}`} style={style}>
      <div className="miuix-color-picker-controls" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="miuix-color-picker-preview" style={{ backgroundColor: currentColorCss }} />
          <div className="miuix-color-picker-sliders" style={{ flex: 1 }}>
            <CustomColorSlider 
              value={h / 360} 
              onValueChange={(v) => handleChange(l, c, v * 360, alpha)} 
              colors={hueColors} 
            />
            <CustomColorSlider 
              value={l} 
              onValueChange={(v) => handleChange(v, c, h, alpha)} 
              colors={lightColors} 
            />
          </div>
        </div>
        <div className="miuix-color-picker-sliders">
          <CustomColorSlider 
            value={c / 0.4} 
            onValueChange={(v) => handleChange(l, v * 0.4, h, alpha)} 
            colors={chromaColors} 
          />
          {showAlpha && (
            <CustomColorSlider 
              value={alpha} 
              onValueChange={(v) => handleChange(l, c, h, v)} 
              colors={alphaColors} 
              checkerboard 
            />
          )}
        </div>
      </div>
    </div>
  );
};

const OkLabColorPicker: React.FC<SubPickerProps> = ({ color, onColorChange, showAlpha, className = '', style }) => {
  const [lab, setLab] = useState(() => {
    const arr = Transforms.rgbToOkLab(color.r, color.g, color.b);
    return [arr[0], arr[1], arr[2]]; // L, a, b
  });
  const [alpha, setAlpha] = useState(color.a ?? 1);

  const isInternalChange = useRef(false);

  useEffect(() => {
    if (!isInternalChange.current) {
      setLab(Transforms.rgbToOkLab(color.r, color.g, color.b));
      setAlpha(color.a ?? 1);
    }
    isInternalChange.current = false;
  }, [color]);

  const handleChange = (l: number, a: number, b: number, al: number) => {
    setLab([l, a, b]);
    setAlpha(al);
    isInternalChange.current = true;
    onColorChange(Transforms.okLabToColor(l, a, b, al));
  };

  const L = lab[0];
  const A = lab[1];
  const B = lab[2];

  const lightColors = React.useMemo(() => {
    const res = [];
    for (let i = 0; i <= 7; i++) {
      res.push(rgbaToCssString(Transforms.okLabToColor(i / 7, A, B, 1)));
    }
    return res;
  }, [A, B]);

  const aColors = React.useMemo(() => {
    const res = [];
    for (let i = 0; i <= 8; i++) {
      const aVal = -0.3 + (0.6 * i / 8);
      res.push(rgbaToCssString(Transforms.okLabToColor(L, aVal, B, 1)));
    }
    return res;
  }, [L, B]);

  const bColors = React.useMemo(() => {
    const res = [];
    for (let i = 0; i <= 8; i++) {
      const bVal = -0.3 + (0.6 * i / 8);
      res.push(rgbaToCssString(Transforms.okLabToColor(L, A, bVal, 1)));
    }
    return res;
  }, [L, A]);

  const currentColorCss = rgbaToCssString(color);
  const alphaColors = [
    rgbaToCssString({ ...color, a: 0 }),
    rgbaToCssString({ ...color, a: 1 })
  ];

  return (
    <div className={`miuix-color-picker ${className}`} style={style}>
      <div className="miuix-color-picker-controls" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="miuix-color-picker-preview" style={{ backgroundColor: currentColorCss }} />
          <div className="miuix-color-picker-sliders" style={{ flex: 1 }}>
            <CustomColorSlider 
              value={L} 
              onValueChange={(v) => handleChange(v, A, B, alpha)} 
              colors={lightColors} 
            />
            <CustomColorSlider 
              value={(A + 0.3) / 0.6} 
              onValueChange={(v) => handleChange(L, v * 0.6 - 0.3, B, alpha)} 
              colors={aColors} 
            />
          </div>
        </div>
        <div className="miuix-color-picker-sliders">
          <CustomColorSlider 
            value={(B + 0.3) / 0.6} 
            onValueChange={(v) => handleChange(L, A, v * 0.6 - 0.3, alpha)} 
            colors={bColors} 
          />
          {showAlpha && (
            <CustomColorSlider 
              value={alpha} 
              onValueChange={(v) => handleChange(L, A, B, v)} 
              colors={alphaColors} 
              checkerboard 
            />
          )}
        </div>
      </div>
    </div>
  );
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
