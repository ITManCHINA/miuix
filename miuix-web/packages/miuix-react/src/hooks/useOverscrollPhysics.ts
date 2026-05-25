import React, { useEffect, useRef } from 'react';

export interface UseOverscrollPhysicsOptions {
  enabled?: boolean;
  onRefresh?: () => void;
  refreshThreshold?: number;
}

export function useOverscrollPhysics(
  ref: React.RefObject<HTMLElement>,
  options: UseOverscrollPhysicsOptions = {}
) {
  const { enabled = true, onRefresh, refreshThreshold = 120 } = options;

  const startYRef = useRef<number | null>(null);
  const dragAmountRef = useRef<number>(0);
  const isOverscrollingRef = useRef<'top' | 'bottom' | null>(null);
  const activeOffsetRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Only track primary touch or mouse drag
      if (!e.isPrimary) return;
      startYRef.current = e.clientY;
      dragAmountRef.current = 0;
      isOverscrollingRef.current = null;
      el.style.transition = 'none';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (startYRef.current === null) return;

      const clientY = e.clientY;
      const deltaY = clientY - startYRef.current;
      dragAmountRef.current = deltaY;

      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Detect top overscroll boundary
      if (scrollTop <= 0 && deltaY > 0) {
        if (!isOverscrollingRef.current) {
          isOverscrollingRef.current = 'top';
          // Reset startY so overscroll calculation starts exactly from boundary
          startYRef.current = clientY;
        }
      }
      // Detect bottom overscroll boundary
      else if (scrollTop >= maxScroll - 1 && deltaY < 0) {
        if (!isOverscrollingRef.current) {
          isOverscrollingRef.current = 'bottom';
          // Reset startY
          startYRef.current = clientY;
        }
      }

      if (isOverscrollingRef.current === 'top') {
        // Prevent default scrolling physics
        if (e.cancelable) e.preventDefault();
        
        // Elastic pull-down math: Damped scroll displacement
        const rawDrag = Math.max(0, clientY - startYRef.current);
        // Formula: offset = A * Math.pow(x, p)
        const offset = Math.pow(rawDrag, 0.75) * 1.5;
        activeOffsetRef.current = offset;

        el.style.transform = `translateY(${offset}px)`;
        // Slightly scale down content or translate to add visual depth
        el.style.transformOrigin = 'top center';
      } else if (isOverscrollingRef.current === 'bottom') {
        if (e.cancelable) e.preventDefault();

        const rawDrag = Math.min(0, clientY - startYRef.current);
        const offset = -Math.pow(Math.abs(rawDrag), 0.75) * 1.5;
        activeOffsetRef.current = offset;

        el.style.transform = `translateY(${offset}px)`;
        el.style.transformOrigin = 'bottom center';
      }
    };

    const handlePointerUp = () => {
      if (startYRef.current === null) return;
      startYRef.current = null;

      if (isOverscrollingRef.current) {
        // Trigger pull-to-refresh if top threshold crossed
        if (isOverscrollingRef.current === 'top' && activeOffsetRef.current >= refreshThreshold) {
          if (onRefresh) {
            onRefresh();
          }
        }

        // Elastic rebound spring transition back to 0
        el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.3, 1.1)'; // Spring-back rebound curve
        el.style.transform = 'translateY(0px)';
        
        isOverscrollingRef.current = null;
        activeOffsetRef.current = 0;
      }
    };

    el.addEventListener('pointerdown', handlePointerDown, { passive: false });
    el.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      
      // Clean styles
      if (el) {
        el.style.transform = '';
        el.style.transition = '';
      }
    };
  }, [ref, enabled, onRefresh, refreshThreshold]);
}
