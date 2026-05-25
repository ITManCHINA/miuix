import React, { useRef } from 'react';
import {
  TopAppBar, Card, ArrowPreference, VerticalScrollBar, useScrollEndHaptic
} from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

interface Library {
  uniqueId: string;
  name: string;
  artifactVersion: string;
  licenses: string[];
  website?: string;
}

const STATIC_LIBRARIES: Library[] = [
  {
    uniqueId: 'compose-multiplatform',
    name: 'Compose Multiplatform',
    artifactVersion: '1.6.11',
    licenses: ['Apache 2.0'],
    website: 'https://github.com/JetBrains/compose-multiplatform',
  },
  {
    uniqueId: 'kotlin',
    name: 'Kotlin Standard Library',
    artifactVersion: '2.0.0',
    licenses: ['Apache 2.0'],
    website: 'https://kotlinlang.org',
  },
  {
    uniqueId: 'react',
    name: 'React Core',
    artifactVersion: '18.3.1',
    licenses: ['MIT'],
    website: 'https://react.dev',
  },
  {
    uniqueId: 'vite',
    name: 'Vite Build Tool',
    artifactVersion: '5.2.11',
    licenses: ['MIT'],
    website: 'https://vitejs.dev',
  },
  {
    uniqueId: 'typescript',
    name: 'TypeScript',
    artifactVersion: '5.4.5',
    licenses: ['Apache 2.0'],
    website: 'https://typescriptlang.org',
  },
  {
    uniqueId: 'compose-miuix-ui',
    name: 'Compose Miuix UI (KMP)',
    artifactVersion: '1.0.1-beta02',
    licenses: ['Apache 2.0'],
    website: 'https://github.com/ITManCHINA/miuix',
  },
  {
    uniqueId: 'miuix-web-react',
    name: 'Miuix Web (React Refactor)',
    artifactVersion: '1.0.0',
    licenses: ['Apache 2.0'],
    website: 'https://github.com/ITManCHINA/miuix/miuix-web',
  },
  {
    uniqueId: 'runtime-shader-blur',
    name: 'Runtime Shader KMP Blur',
    artifactVersion: '1.0.4',
    licenses: ['Apache 2.0'],
    website: 'https://github.com/yukonga/miuix-blur',
  },
  {
    uniqueId: 'webgl-fluid-gradient',
    name: 'WebGL Fluid Gradient Engine',
    artifactVersion: '1.0.0',
    licenses: ['MIT'],
    website: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API',
  },
  {
    uniqueId: 'overscroll-spring-physics',
    name: 'Overscroll Spring Physics Engine',
    artifactVersion: '0.9.2',
    licenses: ['MIT'],
    website: 'https://github.com/miuix-web/spring-physics',
  },
];

export const LicensePage: React.FC = () => {
  const { pop } = useNavigator();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Bind boundary feedback vibration
  useScrollEndHaptic(scrollRef);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--miuix-color-background)',
      }}
    >
      <TopAppBar
        title="Third Party Licenses"
        largeTitle="Third Party Licenses"
        scrollBehavior="auto"
        onBackClick={pop}
      />
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div style={{ padding: '0 12px 12px 12px' }}>
          {STATIC_LIBRARIES.map(library => (
            <Card key={library.uniqueId} style={{ marginTop: 12 }}>
              <ArrowPreference
                title={library.name}
                summary={`${library.artifactVersion}, ${library.licenses[0]}`}
                onClick={() => {
                  if (library.website) {
                    window.open(library.website, '_blank', 'noopener,noreferrer');
                  }
                }}
              />
            </Card>
          ))}
        </div>
        <VerticalScrollBar containerRef={scrollRef} />
      </div>
    </div>
  );
};
