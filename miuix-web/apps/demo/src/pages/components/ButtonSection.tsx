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

export const ButtonSection = () => {
  return (
    <div className="demo-section">
      <SmallTitle text="Button" />
      <Card>
        <div style={{ padding: 16, display: 'flex', gap: 16 }}>
          <Button onClick={() => alert('Clicked!')}>Click Me</Button>
          <Button enabled={false}>Disabled</Button>
        </div>
      </Card>
    </div>
  );
};
