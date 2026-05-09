import { useState, useRef } from 'react';
import { Button, Switch, TextField, Slider, DropdownMenu, DropdownItem, Dialog, BottomSheet } from '@miuix/react';
import '@miuix/theme/src/colors.css';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [text, setText] = useState('');
  const [sliderValue, setSliderValue] = useState(0.5);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownAnchorRef = useRef<HTMLButtonElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="demo-container">
      <div className="demo-card">
        <h1>Miuix Web Demo</h1>
        
        <div className="demo-section">
          <h2>Theme Toggle</h2>
          <Button onClick={toggleTheme}>
            Toggle Theme ({theme})
          </Button>
        </div>

        <div className="demo-section">
          <h2>Button</h2>
          <div className="demo-row">
            <Button onClick={() => alert('Clicked!')}>Normal Button</Button>
            <Button enabled={false} onClick={() => {}}>Disabled Button</Button>
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
              value={text} 
              onValueChange={setText} 
              label="Normal TextField" 
            />
            <div style={{ height: 16 }} />
            <TextField 
              value={text} 
              onValueChange={setText} 
              label="Floating TextField" 
              useLabelAsPlaceholder
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
            <div style={{ height: 16 }} />
            <Slider 
              value={0.8} 
              onValueChange={() => {}} 
              enabled={false}
            />
          </div>
        </div>

        <div className="demo-section">
          <h2>Overlays & Popups</h2>
          <div className="demo-row">
            <div ref={dropdownAnchorRef as any}>
              <Button onClick={() => setDropdownOpen(true)}>Dropdown</Button>
            </div>
            <Button onClick={() => setDialogOpen(true)}>Dialog</Button>
            <Button onClick={() => setBottomSheetOpen(true)}>BottomSheet</Button>
          </div>
        </div>
      </div>

      <DropdownMenu 
        expanded={dropdownOpen} 
        onDismissRequest={() => setDropdownOpen(false)} 
        anchorRef={dropdownAnchorRef as any}
      >
        <DropdownItem text="Option 1" summary="This is a summary" selected />
        <DropdownItem text="Option 2" />
        <DropdownItem text="Disabled Option" enabled={false} />
      </DropdownMenu>

      <Dialog
        show={dialogOpen}
        onDismissRequest={() => setDialogOpen(false)}
        title="Miuix Dialog"
        summary="This is a beautiful center dialog replicated from Compose"
      >
        <div style={{ padding: '0 12px 12px', textAlign: 'center', color: 'var(--miuix-color-on-surface-secondary)' }}>
          You can put any custom content here.
        </div>
        <div className="demo-row" style={{ justifyContent: 'center' }}>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </div>
      </Dialog>

      <BottomSheet
        show={bottomSheetOpen}
        onDismissRequest={() => setBottomSheetOpen(false)}
        title="Miuix BottomSheet"
        summary="Swipe down to dismiss"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ padding: '12px', backgroundColor: 'var(--miuix-color-surface-container)', borderRadius: '12px' }}>
              List item {i + 1}
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}

export default App;
