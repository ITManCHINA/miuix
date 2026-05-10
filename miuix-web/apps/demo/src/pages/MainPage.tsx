import React from 'react';
import { TopAppBar, Button } from '@miuix/react';
import { SettingsIcon, SortIcon, SelectAllIcon } from '@miuix/react';
import { TopAppBarActions } from './components/TopAppBarActions';
import { SearchBarSection } from './components/SearchBarSection';
import { TabRowSection } from './components/TabRowSection';
import { NumberPickerSection } from './components/NumberPickerSection';
import { SurfaceSection } from './components/SurfaceSection';
import { ProgressIndicatorSection } from './components/ProgressIndicatorSection';
import { CheckboxSection } from './components/CheckboxSection';
import { SwitchSection } from './components/SwitchSection';
import { TextFieldSection } from './components/TextFieldSection';
import { SliderSection } from './components/SliderSection';
import { ButtonSection } from './components/ButtonSection';
import { OverlaysSection } from './components/OverlaysSection';

export const MainPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar 
        title="Home" 
        largeTitle="Home"
        subtitle="Main page showcasing components"
        actions={<TopAppBarActions />}
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
