import React, { useRef, useEffect, useState } from 'react';
import './NumberPicker.css';

export interface NumberPickerProps {
  value: number;
  onValueChange: (value: number) => void;
  range: Iterable<number> | number[];
  className?: string;
  style?: React.CSSProperties;
  itemHeight?: number;
  visibleItems?: number;
}

export const NumberPicker: React.FC<NumberPickerProps> = ({
  value,
  onValueChange,
  range,
  className = '',
  style,
  itemHeight = 44,
  visibleItems = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numbers, setNumbers] = useState<number[]>([]);
  const isScrolling = useRef(false);

  useEffect(() => {
    setNumbers(Array.isArray(range) ? range : Array.from(range));
  }, [range]);

  useEffect(() => {
    if (numbers.length === 0 || isScrolling.current) return;
    
    const index = numbers.indexOf(value);
    if (index !== -1 && containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, [value, numbers, itemHeight]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    isScrolling.current = true;
    
    // Clear previous timeout
    if ((containerRef.current as any).scrollTimeout) {
      clearTimeout((containerRef.current as any).scrollTimeout);
    }
    
    // Set a timeout to detect when scrolling stops
    (containerRef.current as any).scrollTimeout = setTimeout(() => {
      isScrolling.current = false;
      const scrollTop = containerRef.current!.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      
      if (index >= 0 && index < numbers.length && numbers[index] !== value) {
        onValueChange(numbers[index]);
      }
    }, 150);
  };

  const containerHeight = itemHeight * visibleItems;
  const paddingHeight = (visibleItems - 1) / 2 * itemHeight;

  return (
    <div 
      className={`miuix-number-picker ${className}`} 
      style={{ ...style, height: containerHeight }}
    >
      <div className="miuix-number-picker-highlight" style={{ height: itemHeight, top: paddingHeight }} />
      <div 
        ref={containerRef}
        className="miuix-number-picker-scroll-container"
        onScroll={handleScroll}
        style={{
          paddingTop: paddingHeight,
          paddingBottom: paddingHeight,
        }}
      >
        {numbers.map((num) => {
          const isSelected = num === value;
          return (
            <div 
              key={num}
              className={`miuix-number-picker-item ${isSelected ? 'miuix-number-picker-item--selected' : ''}`}
              style={{ height: itemHeight }}
              onClick={() => {
                onValueChange(num);
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    top: numbers.indexOf(num) * itemHeight,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {num.toString().padStart(2, '0')}
            </div>
          );
        })}
      </div>
    </div>
  );
};
