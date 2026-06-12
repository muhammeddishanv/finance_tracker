import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type = 'success', isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-rose-50 border-rose-200 text-rose-800',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-rose-500" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg shadow-black/5 ${bgColors[type]}`}>
        {icons[type]}
        <p className="font-medium pr-6 text-sm">{message}</p>
        <button onClick={onClose} className="p-1.5 hover:bg-black/5 rounded-md absolute right-2 top-1/2 -translate-y-1/2 transition-colors">
          <X className="w-4 h-4 opacity-70 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}
