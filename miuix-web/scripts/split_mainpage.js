const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '../apps/demo/src/pages/MainPage.tsx');
const destDir = path.join(__dirname, '../apps/demo/src/pages/components');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let content = fs.readFileSync(srcFile, 'utf-8');

const sectionRegex = /const (\w+Section) = \(\) => \{([\s\S]*?)\n};\n/g;
let match;
const sections = [];

while ((match = sectionRegex.exec(content)) !== null) {
  const name = match[1];
  const body = match[0];
  sections.push(name);
  
  const imports = `import React, { useState, useRef } from 'react';
import {
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

`;
  fs.writeFileSync(path.join(destDir, `${name}.tsx`), imports + `export ` + body);
}

const mainPageNewContent = `import React from 'react';
import { TopAppBar, Button } from '@miuix/react';
import { SettingsIcon, SortIcon, SelectAllIcon } from '@miuix/react';
${sections.map(s => `import { ${s} } from './components/${s}';`).join('\n')}

export const MainPage: React.FC = () => {
  return (
    <div style={{ paddingBottom: 32, display: 'flex', flexDirection: 'column' }}>
      <TopAppBar 
        title="Home" 
        largeTitle="Home"
        subtitle="Main page showcasing components"
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button style={{ padding: '4px 8px', minHeight: 'unset' }}><SettingsIcon /></Button>
            <Button style={{ padding: '4px 8px', minHeight: 'unset' }}><SortIcon /></Button>
            <Button style={{ padding: '4px 8px', minHeight: 'unset' }}><SelectAllIcon /></Button>
          </div>
        }
      />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
${sections.map(s => `        <${s} />`).join('\n')}
      </div>
    </div>
  );
};
`;

fs.writeFileSync(srcFile, mainPageNewContent);
console.log('Split completed');
