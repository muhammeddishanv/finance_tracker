
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-neo-bg)]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-neo shadow-neo w-full max-w-sm animate-in zoom-in-95 duration-200 rounded-none">
        <div className="p-6">
          <div className="inline-block px-3 py-1 border-neo bg-[var(--color-neo-expense)] text-xs font-bold uppercase mb-6">
            {title}
          </div>
          <p className="text-[var(--color-neo-black)] font-bold mb-8 leading-relaxed uppercase text-sm">{message}</p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 font-bold uppercase text-[var(--color-neo-black)] bg-white border-neo hover:bg-slate-50 transition-colors shadow-neo-sm hover:translate-y-[-2px] hover:shadow-neo active:translate-y-0 active:shadow-none"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 font-bold uppercase text-white bg-[var(--color-neo-black)] border-neo hover:bg-slate-800 transition-colors shadow-neo-sm hover:translate-y-[-2px] hover:shadow-neo active:translate-y-0 active:shadow-none"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
