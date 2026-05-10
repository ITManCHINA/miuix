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

export const ProgressIndicatorSection = () => {
  return (
    <div className="demo-section">
      <SmallTitle text="Progress Indicators" />
      <Card>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <LinearProgressIndicator />
          <LinearProgressIndicator progress={0.5} />
          <div style={{ display: 'flex', gap: 16 }}>
            <CircularProgressIndicator />
            <CircularProgressIndicator progress={0.7} />
            <InfiniteProgressIndicator />
          </div>
        </div>
      </Card>
    </div>
  );
};
