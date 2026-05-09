import React from 'react';
import { BasicComponent, BasicComponentProps } from '../BasicComponent/BasicComponent';
import { Checkbox, ToggleableState } from '../Checkbox/Checkbox';

export interface CheckboxPreferenceProps extends Omit<BasicComponentProps, 'endActions' | 'onClick'> {
  title: string;
  summary?: string;
  state: ToggleableState;
  onStateChange: (state: ToggleableState) => void;
}

export const CheckboxPreference: React.FC<CheckboxPreferenceProps> = ({
  title,
  summary,
  state,
  onStateChange,
  enabled = true,
  ...rest
}) => {
  return (
    <BasicComponent
      title={title}
      summary={summary}
      enabled={enabled}
      onClick={() => {
        if (enabled) {
          if (state === 'Off') onStateChange('On');
          else if (state === 'On') onStateChange('Off');
          else onStateChange('On');
        }
      }}
      endActions={
        <Checkbox 
          state={state} 
          onStateChange={onStateChange} 
          enabled={enabled}
        />
      }
      {...rest}
    />
  );
};
