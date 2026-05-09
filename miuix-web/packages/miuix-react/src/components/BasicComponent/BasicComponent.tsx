import React from 'react';
import './BasicComponent.css';

export interface BasicComponentProps {
  title?: React.ReactNode;
  summary?: React.ReactNode;
  startAction?: React.ReactNode;
  endActions?: React.ReactNode;
  bottomAction?: React.ReactNode;
  onClick?: () => void;
  enabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const BasicComponent: React.FC<BasicComponentProps> = ({
  title,
  summary,
  startAction,
  endActions,
  bottomAction,
  onClick,
  enabled = true,
  className = '',
  style,
}) => {
  return (
    <div
      className={`miuix-basic-component ${onClick ? 'miuix-basic-component--clickable' : ''} ${!enabled ? 'miuix-basic-component--disabled' : ''} ${className}`}
      onClick={() => {
        if (enabled && onClick) onClick();
      }}
      style={style}
    >
      <div className="miuix-basic-component-main">
        {startAction && (
          <div className="miuix-basic-component-start">
            {startAction}
          </div>
        )}
        
        <div className="miuix-basic-component-center">
          {title && <div className="miuix-basic-component-title">{title}</div>}
          {summary && <div className="miuix-basic-component-summary">{summary}</div>}
        </div>

        {endActions && (
          <div className="miuix-basic-component-end">
            {endActions}
          </div>
        )}
      </div>

      {bottomAction && (
        <div className="miuix-basic-component-bottom">
          {bottomAction}
        </div>
      )}
    </div>
  );
};
