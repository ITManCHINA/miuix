import React, { useState } from 'react';
import { Card, ColorPicker, DropdownPreference } from '@miuix/react';

export const ColorPage: React.FC = () => {
  const [colorSpace, setColorSpace] = useState('HSV');
  const [pickerColor, setPickerColor] = useState('#3482FF');

  return (
    <div style={{ padding: 16 }}>
      <div className="demo-section">
        <h2>Color Picker</h2>
        <Card>
          <div style={{ padding: '24px 24px 0 24px' }}>
            <DropdownPreference
              title="Color Space"
              summary="Select the color model for the picker"
              items={['HSV', 'OkLCH', 'OkLab']}
              selectedIndex={['HSV', 'OkLCH', 'OkLab'].indexOf(colorSpace)}
              onSelectedIndexChange={(i) => setColorSpace(['HSV', 'OkLCH', 'OkLab'][i])}
            />
          </div>
          <div style={{ padding: 24 }}>
            <ColorPicker 
              color={pickerColor} 
              onColorChange={setPickerColor} 
              showAlpha={true}
              colorSpace={colorSpace as any}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
