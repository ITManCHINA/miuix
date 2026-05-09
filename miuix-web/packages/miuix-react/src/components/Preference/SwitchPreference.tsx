import React from 'react';
import { BasicComponent, BasicComponentProps } from '../BasicComponent/BasicComponent';
import { Switch, SwitchProps } from '../Switch/Switch';

export interface SwitchPreferenceProps extends Omit<BasicComponentProps, 'endActions' | 'onClick'> {
  title: string;
  summary?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  switchProps?: Partial<SwitchProps>;
}

export const SwitchPreference: React.FC<SwitchPreferenceProps> = ({
  title,
  summary,
  checked,
  onCheckedChange,
  enabled = true,
  switchProps,
  ...rest
}) => {
  return (
    <BasicComponent
      title={title}
      summary={summary}
      enabled={enabled}
      onClick={() => {
        if (enabled) {
          onCheckedChange(!checked);
        }
      }}
      endActions={
        <Switch 
          checked={checked} 
          onCheckedChange={onCheckedChange} 
          enabled={enabled}
          {...switchProps}
        />
      }
      {...rest}
    />
  );
};
