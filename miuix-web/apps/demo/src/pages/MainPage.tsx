import React, { useState, useRef } from 'react';
import {
  TopAppBar,
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

const SearchBarSection = () => {
  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="demo-section">
      <SmallTitle text="SearchBar" />
      <SearchBar 
        value={searchValue} 
        onValueChange={setSearchValue} 
        placeholder="Search components..." 
        expanded={expanded}
        onExpandedChange={setExpanded}
      >
        <div style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>
          {searchValue ? `Searching for "${searchValue}"...` : 'No recent searches'}
        </div>
      </SearchBar>
    </div>
  );
};

const TabRowSection = () => {
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

const NumberPickerSection = () => {
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

const SurfaceSection = () => {
  return (
    <div className="demo-section">
      <SmallTitle text="Surface & FAB" />
      <div style={{ display: 'flex', gap: 16 }}>
        <Surface shadowElevation={2} borderRadius={16} style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Surface
        </Surface>
        <FloatingActionButton onClick={() => {}}>
          <span style={{ fontSize: 24 }}>+</span>
        </FloatingActionButton>
      </div>
    </div>
  );
};

const ProgressIndicatorSection = () => {
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

const CheckboxSection = () => {
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

const SwitchSection = () => {
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

const TextFieldSection = () => {
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

const SliderSection = () => {
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

const ButtonSection = () => {
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

const OverlaysSection = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="demo-section">
      <SmallTitle text="Overlays & Popups" />
      <Card>
        <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div ref={anchorRef as any}>
            <Button onClick={() => setDropdownOpen(true)}>
              Dropdown
            </Button>
          </div>
          
          <DropdownMenu
            expanded={dropdownOpen}
            onDismissRequest={() => setDropdownOpen(false)}
            anchorRef={anchorRef as any}
          >
            <DropdownItem onClick={() => setDropdownOpen(false)} text="Option 1" />
            <DropdownItem onClick={() => setDropdownOpen(false)} text="Option 2" />
            <DropdownItem onClick={() => setDropdownOpen(false)} enabled={false} text="Disabled Option" />
          </DropdownMenu>

          <Button onClick={() => setDialogOpen(true)}>Dialog</Button>
          
          <Dialog 
            show={dialogOpen} 
            onDismissRequest={() => setDialogOpen(false)}
            title="Dialog Title"
            summary="This is a custom dialog rendered via Portal."
          >
            <div style={{ padding: '0 24px 24px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setDialogOpen(false)}>Close</Button>
              </div>
            </div>
          </Dialog>

          <Button onClick={() => setBottomSheetOpen(true)}>BottomSheet</Button>

          <BottomSheet
            show={bottomSheetOpen}
            onDismissRequest={() => setBottomSheetOpen(false)}
            title="Bottom Sheet"
            summary="Drag the handle or the background to dismiss."
          >
            <div style={{ padding: 24, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button onClick={() => setBottomSheetOpen(false)}>Close</Button>
            </div>
          </BottomSheet>
        </div>
      </Card>
    </div>
  );
};

export const MainPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar 
        title="Home" 
        largeTitle="Home"
        subtitle="Main page showcasing components"
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button style={{ padding: '4px 8px', minHeight: 'unset', fontSize: 18 }}>🎛️</Button>
            <Button style={{ padding: '4px 8px', minHeight: 'unset', fontSize: 18 }}>↕️</Button>
            <Button style={{ padding: '4px 8px', minHeight: 'unset', fontSize: 18 }}>☑️</Button>
          </div>
        }
      />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SearchBarSection />
        <TabRowSection />
        <NumberPickerSection />
        <SurfaceSection />
        <ProgressIndicatorSection />
        <CheckboxSection />
        <SwitchSection />
        <TextFieldSection />
        <SliderSection />
        <ButtonSection />
        <OverlaysSection />
      </div>
    </div>
  );
};
