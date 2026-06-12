import React from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">{message}</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors shadow-md shadow-rose-500/20"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
