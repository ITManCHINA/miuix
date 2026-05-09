import React, { useMemo } from 'react';
import './Switch.css';

export interface SwitchColors {
  checkedThumbColor: string;
  uncheckedThumbColor: string;
  disabledCheckedThumbColor: string;
  disabledUncheckedThumbColor: string;
  checkedTrackColor: string;
  uncheckedTrackColor: string;
  disabledCheckedTrackColor: string;
  disabledUncheckedTrackColor: string;
}

export const SwitchDefaults = {
  switchColors: (
    checkedThumbColor = 'var(--miuix-color-on-primary)',
    uncheckedThumbColor = 'var(--miuix-color-on-secondary)',
    disabledCheckedThumbColor = 'var(--miuix-color-surface)',
    disabledUncheckedThumbColor = 'var(--miuix-color-disabled-on-secondary)',
    checkedTrackColor = 'var(--miuix-color-primary)',
    uncheckedTrackColor = 'var(--miuix-color-secondary)',
    disabledCheckedTrackColor = 'var(--miuix-color-disabled-primary)',
    disabledUncheckedTrackColor = 'var(--miuix-color-disabled-secondary)'
  ): SwitchColors => ({
    checkedThumbColor,
    uncheckedThumbColor,
    disabledCheckedThumbColor,
    disabledUncheckedThumbColor,
    checkedTrackColor,
    uncheckedTrackColor,
    disabledCheckedTrackColor,
    disabledUncheckedTrackColor,
  }),
};

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  colors?: SwitchColors;
  enabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  className = '',
  colors,
  enabled = true,
  style,
  ...props
}) => {
  const mergedColors = useMemo(() => colors || SwitchDefaults.switchColors(), [colors]);

  const thumbColor = enabled
    ? (checked ? mergedColors.checkedThumbColor : mergedColors.uncheckedThumbColor)
    : (checked ? mergedColors.disabledCheckedThumbColor : mergedColors.disabledUncheckedThumbColor);

  const trackColor = enabled
    ? (checked ? mergedColors.checkedTrackColor : mergedColors.uncheckedTrackColor)
    : (checked ? mergedColors.disabledCheckedTrackColor : mergedColors.disabledUncheckedTrackColor);

  return (
    <div
      className={`miuix-switch ${checked ? 'miuix-switch--checked' : ''} ${!enabled ? 'miuix-switch--disabled' : ''} ${className}`}
      style={{
        ...style,
        backgroundColor: trackColor,
      }}
      onClick={() => {
        if (enabled && onCheckedChange) {
          onCheckedChange(!checked);
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
        }
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => enabled && onCheckedChange?.(e.target.checked)}
        disabled={!enabled}
        className="miuix-switch-input"
        {...props}
      />
      <div 
        className="miuix-switch-thumb"
        style={{ backgroundColor: thumbColor }}
      />
    </div>
  );
};
