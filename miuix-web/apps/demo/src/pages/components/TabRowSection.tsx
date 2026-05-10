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

export const TabRowSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="demo-section">
      <SmallTitle text="TabRow" />
      <TabRow 
        tabs={['General', 'Display', 'Sound', 'Apps', 'Battery', 'Storage']} 
        selectedTabIndex={selectedTab} 
        onTabSelected={setSelectedTab} 
        withContour={true}
      />
    </div>
  );
};
