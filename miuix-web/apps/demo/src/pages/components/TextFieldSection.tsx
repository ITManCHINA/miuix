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

export const TextFieldSection = () => {
  const [textValue, setTextValue] = useState('');
  return (
    <div className="demo-section">
      <SmallTitle text="TextField" />
      <Card>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField 
            value={textValue} 
            onValueChange={setTextValue} 
            label="Username" 
          />
          <TextField 
            value="" 
            onValueChange={() => {}} 
            label="Disabled" 
            enabled={false} 
          />
        </div>
      </Card>
    </div>
  );
};
