import { useState, useRef } from 'react';
import { Button, Switch, TextField, Slider, DropdownMenu, DropdownItem, Dialog, BottomSheet, Checkbox, RadioButton, Card, LinearProgressIndicator, CircularProgressIndicator, InfiniteProgressIndicator, SwitchPreference, CheckboxPreference, RadioButtonPreference, ArrowPreference, Surface, FloatingActionButton, TopAppBar, NavigationBar, NavigationBarItem } from '@miuix/react';
import '@miuix/theme/src/colors.css';
import './App.css';

function App() {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [textValue, setTextValue] = useState('');
  const [sliderValue, setSliderValue] = useState(0.5);
  
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <div style={{ paddingBottom: 80, minHeight: '200vh' }}>
      <TopAppBar 
        title="Settings" 
        largeTitle="Settings"
        subtitle="Miuix Web React"
        actions={
          <Button style={{ padding: '4px 12px', minHeight: 'unset', fontSize: 14 }}>Save</Button>
        }
      />

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div className="demo-section">
          <h2>Surface & FAB</h2>
          <div className="demo-row">
            <Surface shadowElevation={2} borderRadius={16} style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Surface
            </Surface>
            <FloatingActionButton onClick={() => alert('FAB Clicked')}>
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
          <h2>Preferences</h2>
          <Card pressFeedback="sink">
            <SwitchPreference
              title="Wi-Fi"
              summary="Connect to Wi-Fi networks"
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
            <CheckboxPreference
              title="Sync Data"
              summary="Automatically sync your data"
              state={switchChecked ? 'On' : 'Off'}
              onStateChange={(s) => setSwitchChecked(s === 'On')}
            />
            <RadioButtonPreference
              title="High Quality"
              summary="Stream at the highest quality"
              selected={switchChecked}
              onClick={() => setSwitchChecked(!switchChecked)}
            />
            <ArrowPreference
              title="More Settings"
              summary="Advanced configuration options"
              onClick={() => alert('Clicked ArrowPreference')}
            />
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

      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50 }}>
        <NavigationBar mode="IconWithSelectedLabel">
          <NavigationBarItem selected={true} onClick={() => {}} label="Home" icon={<div style={{ fontSize: 20 }}>🏠</div>} />
          <NavigationBarItem selected={false} onClick={() => {}} label="Search" icon={<div style={{ fontSize: 20 }}>🔍</div>} />
          <NavigationBarItem selected={false} onClick={() => {}} label="Profile" icon={<div style={{ fontSize: 20 }}>👤</div>} />
        </NavigationBar>
      </div>
    </div>
  );
}

export default App;
