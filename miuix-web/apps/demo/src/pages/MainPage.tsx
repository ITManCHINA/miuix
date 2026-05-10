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
  BottomSheet
} from '@miuix/react';

export const MainPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [pickerValue, setPickerValue] = useState(0);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [textValue, setTextValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div className="demo-section">
        <h2>SearchBar & TabRow</h2>
        <div className="demo-col">
          <SearchBar value={searchValue} onValueChange={setSearchValue} placeholder="Search settings..." />
          <div style={{ marginTop: 16 }}>
            <TabRow 
              tabs={['General', 'Display', 'Sound', 'Apps', 'Battery', 'Storage']} 
              selectedTabIndex={selectedTab} 
              onTabSelected={setSelectedTab} 
              withContour={true}
            />
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Number Picker</h2>
        <div className="demo-row">
          <Card>
            <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
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
      </div>

      <div className="demo-section">
        <h2>Surface & FAB</h2>
        <div className="demo-row">
          <Surface shadowElevation={2} borderRadius={16} style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Surface
          </Surface>
          <FloatingActionButton onClick={() => {}}>
            <span style={{ fontSize: 24 }}>+</span>
          </FloatingActionButton>
        </div>
      </div>

      <div className="demo-section">
        <h2>Progress Indicators</h2>
        <Card>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <LinearProgressIndicator />
            <LinearProgressIndicator progress={sliderValue} />
            <div className="demo-row">
              <CircularProgressIndicator />
              <CircularProgressIndicator progress={sliderValue} />
              <InfiniteProgressIndicator />
            </div>
          </div>
        </Card>
      </div>

      <div className="demo-section">
        <h2>Checkbox & RadioButton</h2>
        <div className="demo-row">
          <Checkbox state={switchChecked ? 'On' : 'Off'} onStateChange={(s) => setSwitchChecked(s === 'On')} />
          <Checkbox state="Indeterminate" />
          <Checkbox state="On" enabled={false} />
          <div style={{ width: 16 }} />
          <RadioButton selected={switchChecked} onClick={() => setSwitchChecked(!switchChecked)} />
          <RadioButton selected={true} enabled={false} />
        </div>
      </div>

      <div className="demo-section">
        <h2>Switch</h2>
        <div className="demo-row">
          <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
          <Switch checked={true} enabled={false} />
        </div>
      </div>

      <div className="demo-section">
        <h2>TextField</h2>
        <div className="demo-col">
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
      </div>

      <div className="demo-section">
        <h2>Slider</h2>
        <div className="demo-col">
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
      </div>

      <div className="demo-section">
        <h2>Button</h2>
        <div className="demo-row">
          <Button onClick={() => alert('Clicked!')}>Click Me</Button>
          <Button enabled={false}>Disabled</Button>
        </div>
      </div>

      <div className="demo-section">
        <h2>Overlays & Popups</h2>
        <div className="demo-row">
          <div ref={anchorRef as any}>
            <Button onClick={() => setDropdownOpen(true)}>
              Open Dropdown
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

          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          
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

          <Button onClick={() => setBottomSheetOpen(true)}>Open BottomSheet</Button>

          <BottomSheet
            show={bottomSheetOpen}
            onDismissRequest={() => setBottomSheetOpen(false)}
            title="Bottom Sheet Title"
            summary="Drag the handle or the background to dismiss."
          >
            <div style={{ padding: 24, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button onClick={() => setBottomSheetOpen(false)}>Close</Button>
            </div>
          </BottomSheet>
        </div>
      </div>
    </div>
  );
};
