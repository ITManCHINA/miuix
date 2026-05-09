import React from 'react';
import { BasicComponent, BasicComponentProps } from '../BasicComponent/BasicComponent';
import { RadioButton } from '../RadioButton/RadioButton';

export interface RadioButtonPreferenceProps extends Omit<BasicComponentProps, 'endActions' | 'onClick'> {
  title: string;
  summary?: string;
  selected: boolean;
  onClick: () => void;
}

export const RadioButtonPreference: React.FC<RadioButtonPreferenceProps> = ({
  title,
  summary,
  selected,
  onClick,
  enabled = true,
  ...rest
}) => {
  return (
    <BasicComponent
      title={title}
      summary={summary}
      enabled={enabled}
      onClick={() => {
        if (enabled && onClick) {
          onClick();
        }
      }}
      endActions={
        <RadioButton 
          selected={selected} 
          enabled={enabled}
        />
      }
      {...rest}
    />
  );
};
