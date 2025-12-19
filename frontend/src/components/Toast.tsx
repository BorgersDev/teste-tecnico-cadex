import React from 'react';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-3 items-center w-full max-w-md pointer-events-none">
      {toasts.map(toast => (
        <div 
          key={toast.id}
          className={`
            pointer-events-auto px-6 py-4 rounded-xl shadow-2xl text-white font-semibold text-center
            transform transition-all duration-500 ease-out animate-bounce-in border-l-4
            ${toast.type === 'success' ? 'bg-cadex-primary border-cadex-secondary' : 'bg-red-500 border-red-700'}
            flex justify-between items-center w-full backdrop-blur-md bg-opacity-95
          `}
        >
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="ml-4 text-white/60 hover:text-white font-bold text-xl">&times;</button>
        </div>
      ))}
    </div>
  );
};