import React, { useState, useRef } from 'react';
import {
  TopAppBar, Card, ArrowPreference, SwitchPreference, DropdownPreference,
  VerticalScrollBar, useScrollEndHaptic, BgEffectBackground
} from '@miuix/react';
import { useNavigator } from '../contexts/NavigatorContext';

export const AboutPage: React.FC = () => {
  const { pop, push } = useNavigator();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  // Background configurations
  const [isOs3Effect, setIsOs3Effect] = useState(true);
  const [dynamicBg, setDynamicBg] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [showConfig, setShowConfig] = useState(false);

  // Bind overscroll end physical vibration haptics
  useScrollEndHaptic(scrollRef);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    // Map first 180px of scroll progress to ratio (0 to 1)
    const ratio = Math.min(scrollTop / 180, 1);
    setScrollRatio(ratio);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'var(--miuix-color-background)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* TopAppBar with title fading in dynamically as user scrolls down */}
      <TopAppBar
        title={
          <div style={{ opacity: scrollRatio, transition: 'opacity 0.15s ease-out', fontWeight: 600 }}>
            About
          </div>
        }
        scrollBehavior="auto"
        onBackClick={pop}
      />

      {/* Dynamic fluid shader background fading out on scroll for clear contrast */}
      {dynamicBg && (
        <BgEffectBackground
          dynamicBackground={true}
          isOs3Effect={isOs3Effect}
          isDarkTheme={document.documentElement.getAttribute('data-theme') === 'dark'}
          deviceType={isFullScreen ? 'PAD' : 'PHONE'}
          alpha={(1 - scrollRatio) * 0.85}
        />
      )}

      {/* Main Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
          paddingBottom: 32,
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        {/* Animated Logo Header Section */}
        <div
          onClick={() => setShowConfig(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '64px 0 32px 0',
            cursor: 'pointer',
            transform: `scale(${1 - scrollRatio * 0.08}) translateY(${-scrollRatio * 16}px)`,
            opacity: 1 - scrollRatio,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <img
            src="https://raw.githubusercontent.com/compose-miuix-ui/miuix/main/docs/static/images/miuix-logo-new.png"
            alt="MIUIX Logo"
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              marginBottom: 16,
              boxShadow: 'var(--miuix-shadow-2)',
              backgroundColor: '#FFFFFF',
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--miuix-color-on-background)',
              letterSpacing: '-0.5px',
            }}
          >
            Miuix for Web
          </h1>
          <p
            style={{
              margin: '6px 0 0 0',
              fontSize: 14,
              color: 'var(--miuix-color-on-surface-variant-summary)',
            }}
          >
            v1.0.9 (1026)
          </p>
        </div>

        {/* Content Cards */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <ArrowPreference
              title="View Source"
              summary="compose-miuix-ui/miuix"
              onClick={() => window.open('https://github.com/compose-miuix-ui/miuix', '_blank')}
            />
            <ArrowPreference
              title="Join Group"
              summary="Telegram Channel"
              onClick={() => window.open('https://t.me/YuKongA13579', '_blank')}
            />
          </Card>

          <Card>
            <ArrowPreference
              title="License"
              summary="Apache-2.0"
              onClick={() => window.open('https://www.apache.org/licenses/LICENSE-2.0.txt', '_blank')}
            />
            <ArrowPreference
              title="Third Party Licenses"
              onClick={() => push('License')}
            />
          </Card>
        </div>

        <VerticalScrollBar containerRef={scrollRef} />
      </div>

      {/* Interactive Background Settings BottomSheet Modal */}
      {showConfig && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {/* Dimmed Scrim Backdrop */}
          <div
            onClick={() => setShowConfig(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              transition: 'opacity 0.25s ease',
            }}
          />

          {/* Sliding Bottom Panel */}
          <div
            style={{
              backgroundColor: 'var(--miuix-color-surface-container-high)',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              padding: '16px 20px 32px 20px',
              zIndex: 1001,
              boxShadow: '0 -8px 24px rgba(0,0,0,0.15)',
              transform: 'translateY(0)',
              transition: 'transform 0.3s cubic-bezier(0.1, 0.76, 0.55, 0.94)',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {/* Grab handle indicator */}
            <div
              style={{
                width: 36,
                height: 4,
                backgroundColor: 'var(--miuix-color-outline)',
                borderRadius: 2,
                margin: '0 auto 20px auto',
              }}
            />

            <h3
              style={{
                margin: '0 0 16px 0',
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--miuix-color-on-surface)',
                textAlign: 'center',
              }}
            >
              Background Effect
            </h3>

            <Card style={{ backgroundColor: 'var(--miuix-color-surface)' }}>
              <DropdownPreference
                title="Effect Variant"
                items={['OS2', 'OS3']}
                selectedIndex={isOs3Effect ? 1 : 0}
                onSelectedIndexChange={i => setIsOs3Effect(i === 1)}
              />
              <SwitchPreference
                title="Dynamic Background"
                checked={dynamicBg}
                onCheckedChange={setDynamicBg}
              />
              <SwitchPreference
                title="Full Screen Background"
                checked={isFullScreen}
                onCheckedChange={setIsFullScreen}
              />
            </Card>

            <button
              onClick={() => setShowConfig(false)}
              style={{
                marginTop: 20,
                width: '100%',
                padding: '12px',
                borderRadius: 12,
                backgroundColor: 'var(--miuix-color-primary)',
                color: 'var(--miuix-color-on-primary)',
                border: 'none',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: 'var(--miuix-shadow-1)',
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
