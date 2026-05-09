import { useState } from 'react';
import { Button, Switch, TextField, Slider } from '@miuix/react';
import '@miuix/theme/src/colors.css';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [text, setText] = useState('');
  const [sliderValue, setSliderValue] = useState(0.5);

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
      </div>
    </div>
  );
}

export default App;
