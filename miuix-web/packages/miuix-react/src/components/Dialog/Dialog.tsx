import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';

export interface DialogProps {
  show: boolean;
  onDismissRequest?: () => void;
  title?: string;
  summary?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  show,
  onDismissRequest,
  title,
  summary,
  children,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!mounted) return null;

  return createPortal(
    <div className={`miuix-dialog-portal ${visible ? 'visible' : ''}`}>
      <div className="miuix-dialog-backdrop" onClick={onDismissRequest} />
      <div className={`miuix-dialog ${visible ? 'miuix-dialog--expanded' : ''} ${className}`}>
        {title && <h2 className="miuix-dialog-title">{title}</h2>}
        {summary && <p className="miuix-dialog-summary">{summary}</p>}
        <div className="miuix-dialog-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
