import React, { useRef, useState } from 'react';
import './SearchBar.css';

export interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onValueChange,
  placeholder = 'Search',
  onSearch,
  className = '',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onValueChange('');
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    setIsFocused(false);
    onValueChange('');
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`miuix-search-bar-container ${isFocused ? 'miuix-search-bar-container--focused' : ''} ${className}`} style={style}>
      <div className="miuix-search-bar">
        <div className="miuix-search-bar-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <input
          ref={inputRef}
          className="miuix-search-bar-input"
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
        {value.length > 0 && (
          <button 
            className="miuix-search-bar-clear" 
            onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()} // Prevent blur
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" opacity="0.2" />
              <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <button 
        className="miuix-search-bar-cancel" 
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
};
