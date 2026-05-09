import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Snackbar.css';

export interface SnackbarProps {
  message: string;
  actionLabel?: string;
  onActionClick?: () => void;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
  className?: string;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  actionLabel,
  onActionClick,
  visible,
  onDismiss,
  duration = 3000,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let unmountTimer: ReturnType<typeof setTimeout>;

    if (visible) {
      setMounted(true);
      requestAnimationFrame(() => setIsShowing(true));

      // Auto dismiss
      if (duration > 0) {
        hideTimer = setTimeout(() => {
          onDismiss();
        }, duration);
      }
    } else {
      setIsShowing(false);
      unmountTimer = setTimeout(() => {
        setMounted(false);
      }, 300); // Wait for exit animation
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [visible, duration, onDismiss]);

  if (!mounted) return null;

  return createPortal(
    <div className={`miuix-snackbar-portal ${className}`}>
      <div className={`miuix-snackbar ${isShowing ? 'miuix-snackbar--visible' : ''}`}>
        <span className="miuix-snackbar-message">{message}</span>
        {actionLabel && (
          <button 
            className="miuix-snackbar-action" 
            onClick={() => {
              if (onActionClick) onActionClick();
              onDismiss();
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};
