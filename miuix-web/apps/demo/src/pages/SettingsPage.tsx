import React, { useState } from 'react';
import { 
  Card, 
  SwitchPreference, 
  CheckboxPreference, 
  RadioButtonPreference, 
  ArrowPreference, 
  DropdownPreference, 
  SpinnerPreference 
} from '@miuix/react';

export const SettingsPage: React.FC = () => {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div style={{ padding: 16 }}>
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
          <DropdownPreference
            title="Resolution"
            summary="Select video resolution"
            items={['1080p', '2K', '4K']}
            selectedIndex={selectedTab}
            onSelectedIndexChange={setSelectedTab}
          />
          <SpinnerPreference
            title="Playback Speed"
            summary="Adjust video playback speed"
            dialogTitle="Select Speed"
            items={['0.5x', '1.0x', '1.5x', '2.0x']}
            selectedIndex={selectedTab}
            onSelectedIndexChange={setSelectedTab}
          />
        </Card>
      </div>
    </div>
  );
};
