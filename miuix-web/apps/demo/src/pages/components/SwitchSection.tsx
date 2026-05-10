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

export const SwitchSection = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="demo-section">
      <SmallTitle text="Switch" />
      <Card>
        <BasicComponent 
          title="Wi-Fi" 
          summary="Connect to available networks"
          endActions={<Switch checked={checked} onCheckedChange={setChecked} />} 
          onClick={() => setChecked(!checked)}
        />
        <BasicComponent 
          title="Bluetooth" 
          summary="Disabled by policy"
          enabled={false}
          endActions={<Switch checked={true} enabled={false} />} 
        />
      </Card>
    </div>
  );
};
