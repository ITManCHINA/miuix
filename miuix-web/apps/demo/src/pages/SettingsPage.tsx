import React from 'react';
import { 
  TopAppBar, 
  Card,
  SwitchPreference,
  ArrowPreference,
  DropdownPreference,
  SmallTitle
} from '@miuix/react';
import { useAppState } from '../contexts/AppStateContext';
import { useNavigator } from '../contexts/NavigatorContext';

const NavigationBarDisplayModeOptions = ['IconAndText', 'IconOnly', 'TextOnly', 'IconWithSelectedLabel'];
const NavigationRailDisplayModeOptions = ['IconAndText', 'IconOnly', 'TextOnly', 'IconWithSelectedLabel'];
const FloatingToolbarPositionOptions = ['TopStart', 'CenterStart', 'BottomStart', 'TopEnd', 'CenterEnd', 'BottomEnd', 'TopCenter', 'BottomCenter'];
const FloatingToolbarOrientationOptions = ['Horizontal', 'Vertical'];
const FabPositionOptions = ['Start', 'Center', 'End', 'EndOverlay'];
const ColorModeOptions = ['System', 'Light', 'Dark', 'MonetSystem', 'MonetLight', 'MonetDark'];

export const SettingsPage: React.FC = () => {
  const { appState, updateAppState } = useAppState();
  const { push } = useNavigator();

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar 
        title="Settings" 
        largeTitle="Settings" 
        subtitle="v0.1.0 (1)"
        scrollBehavior="auto"
      />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="demo-section">
          <SmallTitle text="Settings UI" />
          <Card>
            <SwitchPreference
              title="Show FPS Monitor"
              checked={appState.showFPSMonitor}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, showFPSMonitor: checked }))}
            />
            <SwitchPreference
              title="Enable Blur Effect"
              checked={appState.enableBlur}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, enableBlur: checked }))}
            />
            <SwitchPreference
              title="Show TopAppBar"
              checked={appState.showTopAppBar}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, showTopAppBar: checked }))}
            />
            <SwitchPreference
              title="Show NavigationBar"
              checked={appState.showNavigationBar}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, showNavigationBar: checked }))}
            />
            {appState.showNavigationBar && (
              <>
                <DropdownPreference
                  title="NavigationBar Mode"
                  items={NavigationBarDisplayModeOptions}
                  selectedIndex={appState.navigationBarMode}
                  onSelectedIndexChange={(i) => updateAppState(s => ({ ...s, navigationBarMode: i }))}
                />
                <DropdownPreference
                  title="NavigationRail Mode"
                  items={NavigationRailDisplayModeOptions}
                  selectedIndex={appState.navigationRailMode}
                  onSelectedIndexChange={(i) => updateAppState(s => ({ ...s, navigationRailMode: i }))}
                />
              </>
            )}
            <SwitchPreference
              title="Show FloatingToolbar"
              checked={appState.showFloatingToolbar}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, showFloatingToolbar: checked }))}
            />
            {appState.showFloatingToolbar && (
              <>
                <DropdownPreference
                  title="FloatingToolbar Position"
                  items={FloatingToolbarPositionOptions}
                  selectedIndex={appState.floatingToolbarPosition}
                  onSelectedIndexChange={(i) => updateAppState(s => ({ ...s, floatingToolbarPosition: i }))}
                />
                <DropdownPreference
                  title="FloatingToolbar Orientation"
                  items={FloatingToolbarOrientationOptions}
                  selectedIndex={appState.floatingToolbarOrientation}
                  onSelectedIndexChange={(i) => updateAppState(s => ({ ...s, floatingToolbarOrientation: i }))}
                />
              </>
            )}
            <SwitchPreference
              title="Show FloatingActionButton"
              checked={appState.showFloatingActionButton}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, showFloatingActionButton: checked }))}
            />
            {appState.showFloatingActionButton && (
              <DropdownPreference
                title="FloatingActionButton Position"
                items={FabPositionOptions}
                selectedIndex={appState.floatingActionButtonPosition}
                onSelectedIndexChange={(i) => updateAppState(s => ({ ...s, floatingActionButtonPosition: i }))}
              />
            )}
            <DropdownPreference
              title="Color Mode"
              items={ColorModeOptions}
              selectedIndex={appState.colorMode}
              onSelectedIndexChange={(i) => updateAppState(s => ({ ...s, colorMode: i }))}
            />
          </Card>
        </div>

        <div className="demo-section">
          <SmallTitle text="Settings Transition" />
          <Card>
            <SwitchPreference
              title="Enable Corner Clip"
              summary="Clip the top scene with rounded corners during transitions"
              checked={appState.enableCornerClip}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, enableCornerClip: checked }))}
            />
            <SwitchPreference
              title="Enable Dim"
              summary="Dim the scene behind during transitions"
              checked={appState.enableDim}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, enableDim: checked }))}
            />
            <SwitchPreference
              title="Block Input During Transition"
              summary="Block touch input on the non-target scene"
              checked={appState.blockInputDuringTransition}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, blockInputDuringTransition: checked }))}
            />
            <SwitchPreference
              title="Pop Follows Swipe Edge"
              summary="Pop animation direction follows the finger swipe edge"
              checked={appState.popDirectionFollowsSwipeEdge}
              onCheckedChange={(checked) => updateAppState(s => ({ ...s, popDirectionFollowsSwipeEdge: checked }))}
            />
          </Card>
        </div>

        <div className="demo-section">
          <SmallTitle text="Settings About" />
          <Card>
            <ArrowPreference
              title="About"
              summary="About this example App"
              onClick={() => push('About')}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
