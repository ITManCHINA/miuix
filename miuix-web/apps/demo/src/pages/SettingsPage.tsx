import React from 'react';
import { TopAppBar, Card, SwitchPreference, ArrowPreference, DropdownPreference } from '@miuix/react';
import { useAppState } from '../contexts/AppStateContext';
import { useNavigator } from '../contexts/NavigatorContext';

const NavBarModeOpts = ['IconAndText', 'IconOnly', 'TextOnly', 'IconWithSelectedLabel'];
const NavRailModeOpts = ['IconAndText', 'IconOnly', 'TextOnly', 'IconWithSelectedLabel'];
const FloatingNavBarStyleOpts = ['Default', 'iOS-like'];
const FloatingNavBarPosOpts = ['Center', 'Start', 'End'];
const FloatingToolbarPosOpts = ['TopStart','CenterStart','BottomStart','TopEnd','CenterEnd','BottomEnd','TopCenter','BottomCenter'];
const FloatingToolbarOrientOpts = ['Horizontal', 'Vertical'];
const FabPosOpts = ['Start', 'Center', 'End', 'EndOverlay'];
const ColorModeOpts = ['System', 'Light', 'Dark', 'MonetSystem', 'MonetLight', 'MonetDark'];
const KeyColorOpts = ['Default', 'Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink'];

function useIsWideScreen() {
  const [w,setW] = React.useState(() => window.matchMedia('(min-aspect-ratio: 1/1)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(min-aspect-ratio: 1/1)');
    const h = (e: MediaQueryListEvent) => setW(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return w;
}

export const SettingsPage: React.FC = () => {
  const { appState, updateAppState } = useAppState();
  const { push } = useNavigator();
  const isWide = useIsWideScreen();
  const up = (fn: (s: typeof appState) => typeof appState) => updateAppState(fn);

  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar title="Settings" largeTitle={isWide ? undefined : "Settings"} subtitle="v1.0.9 (1026)" scrollBehavior="auto"/>
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Main UI Card */}
        <Card>
          <SwitchPreference title="Show FPS Monitor" checked={appState.showFPSMonitor} onCheckedChange={v=>up(s=>({...s,showFPSMonitor:v}))}/>
          <SwitchPreference title="Enable Blur Effect" checked={appState.enableBlur} onCheckedChange={v=>up(s=>({...s,enableBlur:v}))}/>
          <SwitchPreference title="Show TopAppBar" checked={appState.showTopAppBar} onCheckedChange={v=>up(s=>({...s,showTopAppBar:v}))}/>
          <SwitchPreference title={isWide?'Show NavigationRail':'Show NavigationBar'} checked={appState.showNavigationBar} onCheckedChange={v=>up(s=>({...s,showNavigationBar:v}))}/>
          {appState.showNavigationBar && !isWide && !appState.useFloatingNavigationBar && (
            <DropdownPreference title="NavigationBar Mode" items={NavBarModeOpts} selectedIndex={appState.navigationBarMode??0} onSelectedIndexChange={i=>up(s=>({...s,navigationBarMode:i}))}/>
          )}
          {appState.showNavigationBar && isWide && (
            <DropdownPreference title="NavigationRail Mode" items={NavRailModeOpts} selectedIndex={appState.navigationRailMode} onSelectedIndexChange={i=>up(s=>({...s,navigationRailMode:i}))}/>
          )}
          {appState.showNavigationBar && !isWide && (
            <>
              <SwitchPreference title="Use FloatingNavigationBar" checked={appState.useFloatingNavigationBar??false} onCheckedChange={v=>up(s=>({...s,useFloatingNavigationBar:v}))}/>
              {appState.useFloatingNavigationBar && (
                <>
                  <DropdownPreference title="FloatingNavigationBar Style" items={FloatingNavBarStyleOpts} selectedIndex={appState.floatingNavigationBarStyle??0} onSelectedIndexChange={i=>up(s=>({...s,floatingNavigationBarStyle:i}))}/>
                  {(appState.floatingNavigationBarStyle??0)===0 && (
                    <DropdownPreference title="FloatingNavigationBar Position" items={FloatingNavBarPosOpts} selectedIndex={appState.floatingNavigationBarPosition??0} onSelectedIndexChange={i=>up(s=>({...s,floatingNavigationBarPosition:i}))}/>
                  )}
                </>
              )}
            </>
          )}
          <SwitchPreference title="Show FloatingToolbar" checked={appState.showFloatingToolbar} onCheckedChange={v=>up(s=>({...s,showFloatingToolbar:v}))}/>
          {appState.showFloatingToolbar && (
            <>
              <DropdownPreference title="FloatingToolbar Position" items={FloatingToolbarPosOpts} selectedIndex={appState.floatingToolbarPosition} onSelectedIndexChange={i=>up(s=>({...s,floatingToolbarPosition:i}))}/>
              <DropdownPreference title="FloatingToolbar Orientation" items={FloatingToolbarOrientOpts} selectedIndex={appState.floatingToolbarOrientation} onSelectedIndexChange={i=>up(s=>({...s,floatingToolbarOrientation:i}))}/>
            </>
          )}
          <SwitchPreference title="Show FloatingActionButton" checked={appState.showFloatingActionButton} onCheckedChange={v=>up(s=>({...s,showFloatingActionButton:v}))}/>
          {appState.showFloatingActionButton && (
            <DropdownPreference title="FloatingActionButton Position" items={FabPosOpts} selectedIndex={appState.floatingActionButtonPosition} onSelectedIndexChange={i=>up(s=>({...s,floatingActionButtonPosition:i}))}/>
          )}
          <SwitchPreference title="Enable Scroll End Haptic" checked={appState.enableScrollEndHaptic} onCheckedChange={v=>up(s=>({...s,enableScrollEndHaptic:v}))}/>
          <SwitchPreference title="Enable Page User Scroll" checked={appState.enablePageUserScroll} onCheckedChange={v=>up(s=>({...s,enablePageUserScroll:v}))}/>
          <SwitchPreference title="Dynamic Fluid Background" summary="Render WebGL OS2/OS3 fluid backgrounds at 60 FPS" checked={appState.dynamicBackground} onCheckedChange={v=>up(s=>({...s,dynamicBackground:v}))}/>
          <SwitchPreference title="OS3 Fluid Effect" summary="Toggle OS2 vs OS3 gradient formulas" checked={appState.isOs3Effect} onCheckedChange={v=>up(s=>({...s,isOs3Effect:v}))}/>
          <DropdownPreference title="Color Mode" items={ColorModeOpts} selectedIndex={appState.colorMode} onSelectedIndexChange={i=>up(s=>({...s,colorMode:i}))}/>
          {appState.colorMode>=3 && (
            <DropdownPreference title="Key Color" items={KeyColorOpts} selectedIndex={appState.seedIndex??0} onSelectedIndexChange={i=>up(s=>({...s,seedIndex:i}))}/>
          )}
        </Card>

        {/* Transition Card */}
        <Card>
          <SwitchPreference title="Enable Corner Clip" summary="Clip the top scene with rounded corners during transitions" checked={appState.enableCornerClip} onCheckedChange={v=>up(s=>({...s,enableCornerClip:v}))}/>
          <SwitchPreference title="Enable Dim" summary="Dim the scene behind during transitions" checked={appState.enableDim} onCheckedChange={v=>up(s=>({...s,enableDim:v}))}/>
          <SwitchPreference title="Block Input During Transition" summary="Block touch input on the non-target scene" checked={appState.blockInputDuringTransition} onCheckedChange={v=>up(s=>({...s,blockInputDuringTransition:v}))}/>
          <SwitchPreference title="Pop Follows Swipe Edge" summary="Pop animation direction follows the finger swipe edge" checked={appState.popDirectionFollowsSwipeEdge} onCheckedChange={v=>up(s=>({...s,popDirectionFollowsSwipeEdge:v}))}/>
        </Card>

        {/* About Card */}
        <Card>
          <ArrowPreference title="About" summary="About this example App" onClick={()=>push('About')}/>
        </Card>

        <div style={{height:12}}/>
      </div>
    </div>
  );
};
