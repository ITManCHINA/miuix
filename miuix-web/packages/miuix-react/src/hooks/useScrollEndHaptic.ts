import React, { useEffect, useRef } from 'react';
import { useHapticFeedback } from './useHapticFeedback';

export function useScrollEndHaptic(
  ref: React.RefObject<HTMLElement>,
  enabled: boolean = true
) {
  const { performHapticFeedback } = useHapticFeedback();
  const lastScrollTopRef = useRef<number>(0);
  const boundaryTriggeredRef = useRef<'top' | 'bottom' | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) return;

      const delta = scrollTop - lastScrollTopRef.current;
      lastScrollTopRef.current = scrollTop;

      if (scrollTop <= 0) {
        if (boundaryTriggeredRef.current !== 'top' && delta < 0) {
          performHapticFeedback('light'); // Light bump haptic
          boundaryTriggeredRef.current = 'top';
        }
      } else if (scrollTop >= maxScroll - 1) {
        if (boundaryTriggeredRef.current !== 'bottom' && delta > 0) {
          performHapticFeedback('light'); // Light bump haptic
          boundaryTriggeredRef.current = 'bottom';
        }
      } else {
        boundaryTriggeredRef.current = null;
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [ref, enabled, performHapticFeedback]);
}
