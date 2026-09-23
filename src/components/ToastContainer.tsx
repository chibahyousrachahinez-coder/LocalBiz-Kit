import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { ToastNotification } from '../types';

interface ToastProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className="pointer-events-auto flex items-center justify-between p-3.5 rounded-lg shadow-md border bg-white text-[#1E252B] border-[#E2E0D8] transition-all duration-200 transform translate-y-0 opacity-100"
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#1E6B52] shrink-0" />}
              {isWarning && <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />}
              {!isSuccess && !isWarning && <Info className="w-4 h-4 text-[#0F2942] shrink-0" />}
              <span className="text-sm font-medium text-[#1E252B]">{toast.message}</span>
            </div>
            <button
              id={`toast-dismiss-${toast.id}`}
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-[#64748B] hover:text-[#1E252B] transition-colors rounded"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
