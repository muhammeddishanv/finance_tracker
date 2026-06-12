import { useEffect } from 'react';
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
    success: 'bg-[var(--color-neo-lime)]',
    error: 'bg-[var(--color-neo-expense)]',
  };

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-[var(--color-neo-black)]" strokeWidth={3} />,
    error: <XCircle className="w-6 h-6 text-[var(--color-neo-black)]" strokeWidth={3} />,
  };

  return (
    <div className="fixed bottom-16 right-4 md:right-8 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-4 px-5 py-4 border-neo shadow-neo rounded-none ${bgColors[type]}`}>
        {icons[type]}
        <p className="font-bold uppercase text-sm pr-6 text-[var(--color-neo-black)] tracking-wide">{message}</p>
        <button onClick={onClose} className="p-1 hover:bg-white/50 border-2 border-transparent hover:border-[var(--color-neo-black)] transition-all absolute right-2 top-1/2 -translate-y-1/2">
          <X className="w-5 h-5 text-[var(--color-neo-black)]" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
