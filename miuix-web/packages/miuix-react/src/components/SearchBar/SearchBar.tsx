import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './SearchBar.css';

export interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onValueChange,
  placeholder = 'Search',
  onSearch,
  expanded = false,
  onExpandedChange,
  children,
  className = '',
  style,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const handleClear = () => {
    onValueChange('');
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    if (onExpandedChange) onExpandedChange(false);
    onValueChange('');
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
      if (onExpandedChange) onExpandedChange(false);
      inputRef.current?.blur();
    }
  };

  const SearchBarInput = (
    <div className={`miuix-search-bar-wrapper ${expanded ? 'miuix-search-bar-wrapper--expanded' : ''}`}>
      <div className="miuix-search-bar-input-container">
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
          onFocus={() => { if (onExpandedChange) onExpandedChange(true); }}
          onKeyDown={handleKeyDown}
        />
        {value.length > 0 && (
          <button 
            className="miuix-search-bar-clear" 
            onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" opacity="0.2" />
              <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {expanded && (
        <button 
          className="miuix-search-bar-cancel" 
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Inline Anchor */}
      <div className={`miuix-search-bar-anchor ${className}`} style={style}>
        {!expanded && SearchBarInput}
      </div>

      {/* Expanded Portal */}
      {expanded && createPortal(
        <div className="miuix-search-bar-portal">
          <div className="miuix-search-bar-backdrop" onClick={handleCancel} />
          <div className="miuix-search-bar-fullscreen">
            <div className="miuix-search-bar-fullscreen-header">
              {SearchBarInput}
            </div>
            <div className="miuix-search-bar-results">
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
