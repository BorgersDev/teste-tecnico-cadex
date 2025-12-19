import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-cadex-secondary/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 transform transition-all scale-100 animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-cadex-text">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-cadex-primary text-3xl transition-colors">&times;</button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};