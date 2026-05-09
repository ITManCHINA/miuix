import React from 'react';
import { BasicComponent, BasicComponentProps } from '../BasicComponent/BasicComponent';

export interface ArrowPreferenceProps extends Omit<BasicComponentProps, 'endActions'> {
  title: string;
  summary?: string;
  onClick?: () => void;
}

export const ArrowPreference: React.FC<ArrowPreferenceProps> = ({
  title,
  summary,
  onClick,
  ...rest
}) => {
  return (
    <BasicComponent
      title={title}
      summary={summary}
      onClick={onClick}
      endActions={
        <svg 
          width="10" 
          height="16" 
          viewBox="0 0 10 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.5 }}
        >
          <path 
            d="M2 2L8 8L2 14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      }
      {...rest}
    />
  );
};
