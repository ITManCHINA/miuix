import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './BottomSheet.css';

export interface BottomSheetProps {
  show: boolean;
  onDismissRequest: () => void;
  title?: string;
  summary?: string;
  children?: React.ReactNode;
  className?: string;
  enableDragToDismiss?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  show,
  onDismissRequest,
  title,
  summary,
  children,
  className = '',
  enableDragToDismiss = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Drag state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const lastDragY = useRef(0);
  const dragStartTime = useRef(0);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setDragOffset(0);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        setDragOffset(0);
      }, 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!enableDragToDismiss) return;
    setIsDragging(true);
    dragStartY.current = e.clientY;
    lastDragY.current = e.clientY;
    dragStartTime.current = Date.now();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentY = e.clientY;
    const deltaY = currentY - dragStartY.current;
    lastDragY.current = currentY;
    
    // Only allow dragging downwards (positive deltaY)
    if (deltaY > 0) {
      setDragOffset(deltaY);
    } else {
      // Add resistance when dragging upwards
      setDragOffset(deltaY * 0.2);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaY = lastDragY.current - dragStartY.current;
    const deltaTime = Date.now() - dragStartTime.current;
    const velocity = deltaY / deltaTime; // px per ms

    // Dismiss if dragged down more than 150px OR swiped fast downwards (> 0.5 px/ms)
    if (deltaY > 150 || (velocity > 0.5 && deltaY > 20)) {
      onDismissRequest();
    } else {
      // Spring back to original position
      setDragOffset(0);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className={`miuix-bottom-sheet-portal ${visible ? 'visible' : ''}`}>
      <div 
        className="miuix-bottom-sheet-backdrop" 
        onClick={onDismissRequest} 
        style={{
          opacity: visible ? Math.max(0, 1 - (dragOffset > 0 ? dragOffset / window.innerHeight : 0)) : 0
        }}
      />
      <div 
        ref={sheetRef}
        className={`miuix-bottom-sheet ${visible && !isDragging ? 'miuix-bottom-sheet--expanded' : ''} ${isDragging ? 'miuix-bottom-sheet--dragging' : ''} ${className}`}
        style={{
          transform: isDragging || dragOffset !== 0 
            ? `translateY(${Math.max(-20, dragOffset)}px)` 
            : undefined
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="miuix-bottom-sheet-drag-handle" />
        {title && <h2 className="miuix-bottom-sheet-title">{title}</h2>}
        {summary && <p className="miuix-bottom-sheet-summary">{summary}</p>}
        <div className="miuix-bottom-sheet-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
