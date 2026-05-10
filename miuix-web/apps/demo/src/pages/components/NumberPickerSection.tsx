import React, { useState, useRef } from 'react';
import {
  Button,
  SearchBar,
  TabRow,
  NumberPicker,
  Card,
  Surface,
  FloatingActionButton,
  LinearProgressIndicator,
  CircularProgressIndicator,
  InfiniteProgressIndicator,
  Checkbox,
  RadioButton,
  Switch,
  TextField,
  Slider,
  DropdownMenu,
  DropdownItem,
  Dialog,
  BottomSheet,
  SmallTitle,
  BasicComponent
} from '@miuix/react';

export const NumberPickerSection = () => {
  const [pickerValue, setPickerValue] = useState(0);
  return (
    <div className="demo-section">
      <SmallTitle text="Number Picker" />
      <Card>
        <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'center' }}>
          <NumberPicker 
            value={pickerValue} 
            onValueChange={setPickerValue} 
            range={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]} 
          />
          <div style={{ display: 'flex', alignItems: 'center', margin: '0 16px', fontSize: 24, fontWeight: 'bold' }}>:</div>
          <NumberPicker 
            value={0} 
            onValueChange={() => {}} 
            range={[0,15,30,45]} 
          />
        </div>
      </Card>
    </div>
  );
};
