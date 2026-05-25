import React, { useState } from 'react';
import {
  BasicComponent, Card, SmallTitle, Checkbox, RadioButton,
  Switch, SwitchPreference, ArrowPreference, DropdownPreference,
  SpinnerPreference, Dialog, BottomSheet, Button, Slider,
  TextField, TabRow, NumberPicker, ColorPicker, LinearProgressIndicator,
  CircularProgressIndicator, InfiniteProgressIndicator, type RGBA
} from '@miuix/react';
import { useNavigator } from '../../contexts/NavigatorContext';

export const BasicComponentSection: React.FC = () => (
  <>
    <SmallTitle text="Basic Component"/>
    <Card>
      <BasicComponent title="Title" summary="Summary" startAction={<span style={{fontSize:14,color:'var(--miuix-color-on-background)'}}>Start</span>} endActions={<span style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-actions)'}}>End1&nbsp;&nbsp;End2</span>}/>
      <BasicComponent title="Title" summary="Summary" enabled={false} startAction={<span style={{fontSize:14,color:'var(--miuix-color-disabled-on-secondary-variant)'}}>Start</span>} endActions={<span style={{fontSize:14,color:'var(--miuix-color-disabled-on-secondary-variant)'}}>End1&nbsp;&nbsp;End2</span>}/>
    </Card>
  </>
);

export const CheckboxSection: React.FC = () => {
  const [cb1, setCb1] = useState(false);
  const [cb2, setCb2] = useState(true);
  const [cbI, setCbI] = useState<'Off' | 'On' | 'Indeterminate'>('Indeterminate');
  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);
  return (
    <>
      <SmallTitle text="Checkbox"/>
      <Card>
        <div style={{display:'flex',justifyContent:'space-between',padding:16}}>
          <Checkbox state={cb1 ? 'On' : 'Off'} onStateChange={s=>setCb1(s==='On')}/>
          <Checkbox state={cb2 ? 'On' : 'Off'} onStateChange={s=>setCb2(s==='On')}/>
          <Checkbox state={cbI} onStateChange={s=>setCbI(s as any)}/>
          <Checkbox state="Off" enabled={false}/><Checkbox state="On" enabled={false}/><Checkbox state="Indeterminate" enabled={false}/>
        </div>
        <BasicComponent title="Checkbox" endActions={<><span style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-actions)',marginRight:8}}>{p1?'true':'false'}</span><Checkbox state={p1?'On':'Off'} onStateChange={s=>setP1(s==='On')}/></>} onClick={()=>setP1(v=>!v)}/>
        <BasicComponent title="Checkbox" summary={`State: ${p2}`} endActions={<Checkbox state={p2?'On':'Off'} onStateChange={s=>setP2(s==='On')}/>} onClick={()=>setP2(v=>!v)}/>
        <BasicComponent title="Disabled Checkbox" enabled={false} endActions={<Checkbox state="On" enabled={false}/>}/>
      </Card>
    </>
  );
};

export const RadioButtonSection: React.FC = () => {
  const [sel, setSel] = useState(0);
  return (
    <>
      <SmallTitle text="RadioButton"/>
      <Card>
        {['Option A','Option B','Option C'].map((l,i)=><BasicComponent key={i} title={l} endActions={<RadioButton selected={sel===i} onClick={()=>setSel(i)}/>} onClick={()=>setSel(i)}/>)}
        <BasicComponent title="Disabled RadioButton" enabled={false} endActions={<RadioButton selected={true} enabled={false}/>}/>
      </Card>
    </>
  );
};

export const SwitchSection: React.FC = () => {
  const [sw1, setSw1] = useState(false);
  const [sw2, setSw2] = useState(true);
  const [anim, setAnim] = useState(false);
  const [inner, setInner] = useState(false);
  return (
    <>
      <SmallTitle text="Switch"/>
      <Card>
        <div style={{display:'flex',justifyContent:'space-between',padding:16}}>
          <Switch checked={sw1} onCheckedChange={setSw1}/><Switch checked={sw2} onCheckedChange={setSw2}/>
          <Switch checked={false} enabled={false}/><Switch checked={true} enabled={false}/>
        </div>
        <SwitchPreference title="Switch" summary="Click to expand a Switch" checked={anim} onCheckedChange={setAnim}/>
        {anim && <BasicComponent title="Switch" endActions={<><span style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-actions)',marginRight:4}}>{String(inner)}</span><Switch checked={inner} onCheckedChange={setInner}/></>} onClick={()=>setInner(v=>!v)}/>}
        <SwitchPreference title="Disabled Switch" checked={true} enabled={false} onCheckedChange={()=>{}}/>
      </Card>
    </>
  );
};

export const ArrowSection: React.FC = () => (
  <>
    <SmallTitle text="Arrow"/>
    <Card>
      <ArrowPreference title="Arrow Item" onClick={()=>{}}/>
      <ArrowPreference title="With Summary" summary="Go to next page" onClick={()=>{}}/>
      <ArrowPreference title="Disabled Arrow" enabled={false} onClick={()=>{}}/>
    </Card>
  </>
);

export const DialogSection: React.FC = () => {
  const [d, setD] = useState(false);
  return (
    <>
      <SmallTitle text="Dialog"/>
      <Card>
        <BasicComponent title="Open Dialog" onClick={()=>setD(true)}/>
      </Card>
      <Dialog show={d} onDismissRequest={()=>setD(false)} title="Dialog Title" summary="This is a dialog message.">
        <div style={{display:'flex',gap:12,marginTop:16}}>
          <Button style={{flex:1}} onClick={()=>setD(false)}>Cancel</Button>
          <Button style={{flex:1,backgroundColor:'var(--miuix-color-primary)',color:'var(--miuix-color-on-primary)'}} onClick={()=>setD(false)}>Confirm</Button>
        </div>
      </Dialog>
    </>
  );
};

export const BottomSheetSection: React.FC = () => {
  const [s, setS] = useState(false);
  return (
    <>
      <SmallTitle text="BottomSheet"/>
      <Card>
        <BasicComponent title="Open BottomSheet" onClick={()=>setS(true)}/>
      </Card>
      <BottomSheet show={s} onDismissRequest={()=>setS(false)} title="BottomSheet Title" summary="This is a bottom sheet.">
        <BasicComponent title="Sheet Item 1"/><BasicComponent title="Sheet Item 2"/>
      </BottomSheet>
    </>
  );
};

export const DropdownSection: React.FC = () => {
  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(0);
  const opts = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  return (
    <>
      <SmallTitle text="Dropdown"/>
      <Card>
        <DropdownPreference title="DropdownPref (O)" summary={opts[s1]} items={opts} selectedIndex={s1} onSelectedIndexChange={setS1}/>
        <DropdownPreference title="DropdownPref Grouped" summary={opts[s2]} items={opts} selectedIndex={s2} onSelectedIndexChange={setS2}/>
        <DropdownPreference title="Disabled DropdownPref" items={['Option 1']} selectedIndex={0} onSelectedIndexChange={()=>{}} enabled={false}/>
      </Card>
    </>
  );
};

export const SpinnerSection: React.FC = () => {
  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(1);
  const spinnerItems = ['Option 1 (Red)', 'Option 2 (Green)', 'Option 3 (Blue)', 'Option 4 (Yellow)'];
  return (
    <>
      <SmallTitle text="Spinner"/>
      <Card>
        <SpinnerPreference title="SpinnerPref (O)" summary="Overlay mode" items={spinnerItems} selectedIndex={s1} onSelectedIndexChange={setS1}/>
        <SpinnerPreference title="SpinnerPref (W)" summary="Window mode" items={spinnerItems} selectedIndex={s2} onSelectedIndexChange={setS2}/>
        <SpinnerPreference title="Disabled SpinnerPref" summary="Collapsed" items={['Option 5']} selectedIndex={0} onSelectedIndexChange={()=>{}} enabled={false}/>
      </Card>
    </>
  );
};

export const ButtonSection: React.FC = () => {
  const [l1, setL1] = useState('Cancel');
  const [l2, setL2] = useState('Submit');
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  return (
    <>
      <SmallTitle text="Button"/>
      <div style={{display:'flex',gap:12,marginBottom:12,padding:'0 12px'}}>
        <Button style={{flex:1}} onClick={()=>{const n=c1+1;setC1(n);setL1(`Click: ${n}`)}}>{l1}</Button>
        <Button style={{flex:1,backgroundColor:'var(--miuix-color-primary)',color:'var(--miuix-color-on-primary)'}} onClick={()=>{const n=c2+1;setC2(n);setL2(`Click: ${n}`)}}>{l2}</Button>
      </div>
      <div style={{display:'flex',gap:12,padding:'0 12px'}}>
        <Button style={{flex:1}} enabled={false}>Disabled</Button>
        <Button style={{flex:1,backgroundColor:'var(--miuix-color-primary)',color:'var(--miuix-color-on-primary)'}} enabled={false}>Disabled</Button>
      </div>
    </>
  );
};

export const ProgressSection: React.FC = () => (
  <>
    <SmallTitle text="ProgressIndicator"/>
    <Card>
      <div style={{padding:'16px 16px 8px'}}>
        <LinearProgressIndicator style={{marginBottom:12}}/>
        <LinearProgressIndicator progress={0.3} style={{marginBottom:12}}/>
        <div style={{display:'flex',gap:16,alignItems:'center',justifyContent:'center'}}>
          <CircularProgressIndicator progress={0.3} size={48}/>
          <CircularProgressIndicator size={48}/>
          <InfiniteProgressIndicator size={48}/>
        </div>
      </div>
    </Card>
  </>
);

export const TextFieldSection: React.FC = () => {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  return (
    <>
      <SmallTitle text="TextField"/>
      <Card>
        <div style={{padding:16,display:'flex',flexDirection:'column',gap:16}}>
          <TextField value={v1} onValueChange={setV1} label="Input field"/>
          <TextField value={v2} onValueChange={setV2} label="Disabled" enabled={false}/>
        </div>
      </Card>
    </>
  );
};

export const SliderSection: React.FC = () => {
  const [v1, setV1] = useState(0.3);
  const [v2, setV2] = useState(0.7);
  return (
    <>
      <SmallTitle text="Slider"/>
      <Card>
        <div style={{padding:'16px 24px'}}>
          <p style={{fontSize:14,marginBottom:4,color:'var(--miuix-color-on-surface)'}}>Normal: {Math.round(v1*100)}%</p>
          <Slider value={v1} onValueChange={setV1} style={{marginBottom:16}}/>
          <p style={{fontSize:14,marginBottom:4,color:'var(--miuix-color-on-surface)'}}>Disabled: {Math.round(v2*100)}%</p>
          <Slider value={v2} onValueChange={setV2} enabled={false}/>
        </div>
      </Card>
    </>
  );
};

export const TabRowSection: React.FC = () => {
  const [tab, setTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const tabs6 = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6'];
  const [tab6, setTab6] = useState(0);
  return (
    <>
      <SmallTitle text="TabRow"/>
      <TabRow tabs={tabs} selectedTabIndex={tab} onTabSelected={setTab} style={{margin:'0 12px 12px'}}/>
      <Card>
        <div style={{padding:16}}>
          <TabRow tabs={tabs6} selectedTabIndex={tab6} onTabSelected={setTab6}/>
          <p style={{marginTop:12,fontSize:14,color:'var(--miuix-color-on-surface)'}}>Content of {tabs6[tab6]}</p>
        </div>
      </Card>
    </>
  );
};

export const NumberPickerSection: React.FC = () => {
  const [h, setH] = useState(8);
  const [m, setM] = useState(30);
  const hours = Array.from({length:24},(_,i)=>i);
  const mins = Array.from({length:60},(_,i)=>i);
  return (
    <>
      <SmallTitle text="NumberPicker"/>
      <Card>
        <div style={{padding:16,display:'flex',justifyContent:'center',gap:24}}>
          <NumberPicker value={h} onValueChange={setH} range={hours}/>
          <NumberPicker value={m} onValueChange={setM} range={mins}/>
        </div>
      </Card>
    </>
  );
};

export const ColorPickerSection: React.FC = () => {
  const [color, setColor] = useState<RGBA>({ r: 0.2, g: 0.51, b: 1, a: 1 });
  const hex = `#${[color.r,color.g,color.b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('').toUpperCase()}`;
  return (
    <>
      <SmallTitle text="ColorPicker (HSV)"/>
      <Card>
        <div style={{padding:16}}>
          <p style={{fontSize:14,marginBottom:12,color:'var(--miuix-color-on-surface)'}}>RGBA: {Math.round(color.r*255)}, {Math.round(color.g*255)}, {Math.round(color.b*255)}, {Math.round((color.a??1)*100)/100} &nbsp; HEX: {hex}</p>
          <ColorPicker color={color} onColorChange={setColor}/>
        </div>
      </Card>
    </>
  );
};

export const BlurSection: React.FC = () => {
  const [blurRadius, setBlurRadius] = useState(0.5);
  const [brightness, setBrightness] = useState(0.5);
  const [contrast, setContrast] = useState(0.5);
  const [saturation, setSaturation] = useState(0.5);
  const blur = Math.round(blurRadius * 100);
  const bright = (brightness * 2).toFixed(1);
  const cont = (contrast * 2).toFixed(1);
  const sat = (saturation * 2).toFixed(1);

  return (
    <>
      <SmallTitle text="Texture Blur"/>
      <Card style={{padding:0,overflow:'hidden',marginBottom:12}}>
        <div style={{position:'relative',height:220,background:'linear-gradient(135deg,#4a90d9,#7b5ea7,#e07b54)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{
            position:'absolute',inset:0,
            backdropFilter:`blur(${blur/5}px) brightness(${bright}) contrast(${cont}) saturate(${sat})`,
            WebkitBackdropFilter:`blur(${blur/5}px) brightness(${bright}) contrast(${cont}) saturate(${sat})`,
          }}/>
          <div style={{position:'relative',background:'rgba(255,255,255,0.25)',backdropFilter:'blur(20px)',borderRadius:16,padding:'16px 24px',textAlign:'center'}}>
            <p style={{fontWeight:600,fontSize:16,color:'#fff'}}>Texture Blur | R={blur}</p>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.8)'}}>Colored Thick | Small Container</p>
          </div>
        </div>
        <div style={{padding:'0 12px 12px'}}>
          <BasicComponent title="Blur Radius" endActions={<span style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-actions)'}}>{blur}</span>}/>
          <Slider value={blurRadius} onValueChange={setBlurRadius}/>
          <BasicComponent title="Brightness" endActions={<span style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-actions)'}}>{bright}</span>}/>
          <Slider value={brightness} onValueChange={setBrightness}/>
          <BasicComponent title="Contrast" endActions={<span style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-actions)'}}>{cont}</span>}/>
          <Slider value={contrast} onValueChange={setContrast}/>
          <BasicComponent title="Saturation" endActions={<span style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-actions)'}}>{sat}</span>}/>
          <Slider value={saturation} onValueChange={setSaturation}/>
        </div>
      </Card>

      <SmallTitle text="Foreground Blur"/>
      <Card style={{padding:0,overflow:'hidden',marginBottom:12}}>
        <div style={{position:'relative',height:200,background:'linear-gradient(135deg,#c9d6f0,#e8c9f0,#f0d4c9)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{position:'relative',textAlign:'center',padding:'0 24px'}}>
            <p style={{fontSize:14,color:'#8b73a0',fontWeight:500,marginBottom:4}}>Foreground Blur</p>
            <p style={{fontSize:28,color:'#6a5acd',fontWeight:700}}>Miuix Demo</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export const CardSection: React.FC = () => {
  const [dlg, setDlg] = useState(false);
  return (
    <>
      <SmallTitle text="Card"/>
      <Card style={{backgroundColor:'var(--miuix-color-primary-variant)'}}>
        <div style={{padding:16}}>
          <p style={{fontSize:19,fontWeight:600,color:'var(--miuix-color-on-primary-variant)'}}>Card</p>
          <p style={{fontSize:17,color:'var(--miuix-color-on-primary-variant)'}}>ShowIndication: true</p>
        </div>
      </Card>
      <div style={{display:'flex',gap:12,padding:'12px 0'}}>
        <Card style={{flex:1}} onClick={()=>{}}>
          <div style={{padding:16}}>
            <p style={{fontSize:18,fontWeight:500}}>Card</p>
            <p style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-summary)'}}>PressFeedbackType: Sink</p>
          </div>
        </Card>
        <Card style={{flex:1}} onLongPress={()=>{}}>
          <div style={{padding:16}}>
            <p style={{fontSize:18,fontWeight:500}}>Card</p>
            <p style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-summary)'}}>PressFeedbackType: Tilt</p>
          </div>
        </Card>
      </div>
      <Card onLongPress={()=>setDlg(true)}>
        <div style={{padding:16}}>
          <p style={{fontSize:18,fontWeight:500}}>Card</p>
          <p style={{fontSize:14,color:'var(--miuix-color-on-surface-variant-summary)'}}>Long press to show dialog</p>
        </div>
      </Card>
      <Dialog show={dlg} onDismissRequest={()=>setDlg(false)} title="Long Press Action" summary="Triggered by long pressing the card.">
        <div style={{display:'flex',gap:12,marginTop:16}}>
          <Button style={{flex:1}} onClick={()=>setDlg(false)}>Cancel</Button>
          <Button style={{flex:1,backgroundColor:'var(--miuix-color-primary)',color:'var(--miuix-color-on-primary)'}} onClick={()=>setDlg(false)}>Confirm</Button>
        </div>
      </Dialog>
    </>
  );
};

export const OthersSection: React.FC = () => {
  const { push } = useNavigator();
  return (
    <>
      <SmallTitle text="Others"/>
      <Card>
        <ArrowPreference title="PullToRefresh Test" summary="Navigate to a PullToRefresh Page" onClick={()=>push('PullToRefresh')}/>
        <ArrowPreference title="Navigation test" summary="Navigate to a Navigation Page" onClick={()=>push('Navigation')}/>
        <ArrowPreference title="MultiScaffold Test" summary="Navigate to a MultiScaffold Page" onClick={()=>push('MultiScaffold')}/>
      </Card>
    </>
  );
};
