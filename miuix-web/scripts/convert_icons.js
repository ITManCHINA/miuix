const fs = require('fs');
const path = require('path');

const srcDir = 'c:/GitHub/miuix/miuix-icons/src/commonMain/kotlin/top/yukonga/miuix/kmp/icon/extended';
const destDir = 'c:/GitHub/miuix/miuix-web/packages/miuix-react/src/components/Icons';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.kt'));

let exportsContent = '';
const allIconsDict = {
  Light: [],
  Normal: [],
  Regular: [],
  Medium: [],
  Demibold: []
};

const VARIANTS = ['Light', 'Normal', 'Regular', 'Medium', 'Demibold'];

function extractPaths(block) {
  // group transform
  let transformStr = '';
  const groupMatch = block.match(/group\s*\((.*?)\)\s*\{/);
  if (groupMatch) {
    const scaleYMatch = groupMatch[1].match(/scaleY\s*=\s*(-?[0-9.]+)f/);
    const transYMatch = groupMatch[1].match(/translationY\s*=\s*(-?[0-9.]+)f/);
    const sy = scaleYMatch ? scaleYMatch[1] : 1;
    const ty = transYMatch ? transYMatch[1] : 0;
    transformStr = ` transform="translate(0, ${ty}) scale(1, ${sy})"`;
  }
  
  // paths
  const paths = [];
  const pathBlocks = [...block.matchAll(/addPath\(\s*pathData\s*=\s*listOf\(([\s\S]*?)\),\s*fill/g)];
  for (const pBlock of pathBlocks) {
    let d = '';
    const lines = pBlock[1].split('\n');
    for (const line of lines) {
      if (line.includes('PathNode.MoveTo')) {
        const m = line.match(/([-0-9.]+)f,\s*([-0-9.]+)f/);
        if (m) d += `M ${m[1]} ${m[2]} `;
      } else if (line.includes('PathNode.LineTo')) {
        const m = line.match(/([-0-9.]+)f,\s*([-0-9.]+)f/);
        if (m) d += `L ${m[1]} ${m[2]} `;
      } else if (line.includes('PathNode.QuadTo')) {
        const m = line.match(/([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f/);
        if (m) d += `Q ${m[1]} ${m[2]} ${m[3]} ${m[4]} `;
      } else if (line.includes('PathNode.CurveTo')) {
        const m = line.match(/([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f/);
        if (m) d += `C ${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]} ${m[6]} `;
      } else if (line.includes('PathNode.VerticalTo')) {
        const m = line.match(/([-0-9.]+)f/);
        if (m) d += `V ${m[1]} `;
      } else if (line.includes('PathNode.HorizontalTo')) {
        const m = line.match(/([-0-9.]+)f/);
        if (m) d += `H ${m[1]} `;
      } else if (line.includes('PathNode.Close')) {
        d += `Z `;
      }
    }
    paths.push(d.trim());
  }
  
  let svgInner = '';
  if (transformStr) {
    svgInner = `    <g${transformStr}>\n`;
    for (const d of paths) {
      svgInner += `      <path d="${d}" />\n`;
    }
    svgInner += `    </g>\n`;
  } else {
    for (const d of paths) {
      svgInner += `    <path d="${d}" />\n`;
    }
  }
  return svgInner;
}

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  const iconBaseName = file.replace('.kt', '');
  
  let reactCode = `import React from 'react';\n\n`;
  
  // Find all variants
  const builders = [...content.matchAll(/ImageVector\.Builder\([\s\S]*?name\s*=\s*"[^"]*\.(Light|Normal|Regular|Medium|Demibold|Fill)"[\s\S]*?viewportWidth\s*=\s*([0-9.]+)f[\s\S]*?viewportHeight\s*=\s*([0-9.]+)f[\s\S]*?\.apply\s*\{([\s\S]*?)\}\.build\(\)/g)];
  
  if (builders.length === 0) {
     // fallback
     const fb = /ImageVector\.Builder\([\s\S]*?viewportWidth\s*=\s*([0-9.]+)f[\s\S]*?viewportHeight\s*=\s*([0-9.]+)f[\s\S]*?\.apply\s*\{([\s\S]*?)\}\.build\(\)/;
     const match = content.match(fb);
     if (match) {
        const svgInner = extractPaths(match[3]);
        reactCode += `export const ${iconBaseName}Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 ${match[1]} ${match[2]}" width="1em" height="1em" fill="currentColor" {...props}>
${svgInner}  </svg>
);\n`;
        exportsContent += `export * from './${iconBaseName}Icon';\n`;
        VARIANTS.forEach(v => allIconsDict[v].push(`${iconBaseName}Icon`));
     }
  } else {
     let hasRegular = false;
     builders.forEach(b => {
       const variant = b[1];
       const vw = b[2];
       const vh = b[3];
       const block = b[4];
       const svgInner = extractPaths(block);
       
       let exportName = `${iconBaseName}${variant}Icon`;
       if (variant === 'Regular') {
         hasRegular = true;
       }
       
       reactCode += `export const ${exportName} = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 ${vw} ${vh}" width="1em" height="1em" fill="currentColor" {...props}>
${svgInner}  </svg>
);\n`;

       if (VARIANTS.includes(variant)) {
         allIconsDict[variant].push({ name: iconBaseName, exportName });
       }
     });
     
     // default export for 'Icon' is Regular if exists
     if (hasRegular) {
        reactCode += `export const ${iconBaseName}Icon = ${iconBaseName}RegularIcon;\n`;
     } else {
        reactCode += `export const ${iconBaseName}Icon = ${iconBaseName}${builders[0][1]}Icon;\n`;
     }
  }
  
  fs.writeFileSync(path.join(destDir, `${iconBaseName}Icon.tsx`), reactCode);
  exportsContent += `export * from './${iconBaseName}Icon';\n`;
}

// Generate AllIcons dict in index.ts
let dictCode = `import * as All from './all';\n\nexport const AllIcons = {\n`;
VARIANTS.forEach(v => {
  dictCode += `  ${v}: [\n`;
  allIconsDict[v].forEach(item => {
    if (typeof item === 'string') {
      dictCode += `    { name: "${item.replace('Icon', '')}", component: All.${item} },\n`;
    } else {
      dictCode += `    { name: "${item.name}", component: All.${item.exportName} },\n`;
    }
  });
  dictCode += `  ],\n`;
});
dictCode += `};\n`;

fs.writeFileSync(path.join(destDir, 'all.ts'), exportsContent);
fs.writeFileSync(path.join(destDir, 'index.ts'), `export * from './all';\n${dictCode}`);
console.log('Icons generated successfully.');
