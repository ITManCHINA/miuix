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

export const CheckboxSection = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="demo-section">
      <SmallTitle text="Checkbox & RadioButton" />
      <Card>
        <BasicComponent 
          title="Enable feature" 
          endActions={<Checkbox state={checked ? 'On' : 'Off'} onStateChange={(s) => setChecked(s === 'On')} />} 
          onClick={() => setChecked(!checked)}
        />
        <BasicComponent 
          title="Indeterminate state" 
          endActions={<Checkbox state="Indeterminate" />} 
        />
        <BasicComponent 
          title="Disabled checkbox" 
          enabled={false}
          endActions={<Checkbox state="On" enabled={false} />} 
        />
        <BasicComponent 
          title="Radio selection" 
          endActions={<RadioButton selected={checked} onClick={() => setChecked(!checked)} />} 
          onClick={() => setChecked(!checked)}
        />
      </Card>
    </div>
  );
};
