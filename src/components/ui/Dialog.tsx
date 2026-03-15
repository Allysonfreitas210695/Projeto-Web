import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DialogType = 'info' | 'warning' | 'error' | 'success';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  type?: DialogType;
  children?: React.ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  type = 'info',
  children,
  confirmLabel = 'OK',
  onConfirm,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const icons = {
    info: <Info className="text-blue-500" size={24} />,
    warning: <AlertCircle className="text-amber-500" size={24} />,
    error: <AlertCircle className="text-destructive" size={24} />,
    success: <CheckCircle2 className="text-emerald-500" size={24} />,
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={cn(
          'relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden',
          'animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300'
        )}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0">{icons[type]}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
              {description && (
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-1 hover:bg-muted rounded-md transition-colors text-muted-foreground"
            >
              <X size={18} />
            </button>
          </div>

          {children && <div className="mt-4">{children}</div>}

          <div className="mt-6 flex justify-end gap-3">
            {onConfirm && (
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium border border-border rounded-xl hover:bg-muted transition-all"
              >
                Cancelar
              </button>
            )}
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
              className={cn(
                'px-6 py-2 text-sm font-medium rounded-xl transition-all shadow-sm',
                type === 'error'
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
