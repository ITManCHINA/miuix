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

export const SliderSection = () => {
  const [sliderValue, setSliderValue] = useState(0.5);
  return (
    <div className="demo-section">
      <SmallTitle text="Slider" />
      <Card>
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Slider 
            value={sliderValue} 
            onValueChange={setSliderValue} 
          />
          <Slider 
            value={0.5} 
            onValueChange={() => {}} 
            enabled={false} 
          />
        </div>
      </Card>
    </div>
  );
};
