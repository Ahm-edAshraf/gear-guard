'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    warning: <AlertTriangle className="text-yellow-500" />
  };

  const borders = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={clsx(
          "fixed bottom-6 right-6 z-50 bg-[#141414] border-l-4 p-4 pr-12 shadow-2xl flex items-start gap-4 max-w-md",
          borders[type]
        )}
      >
        <div className="mt-0.5">{icons[type]}</div>
        <div>
          <h4 className="font-mono text-sm uppercase tracking-wider text-white font-bold mb-1">
            {type}
          </h4>
          <p className="font-mono text-sm text-gray-400">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <XCircle size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
