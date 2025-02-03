import React, { useEffect, useState } from "react";
import { Check, X, Info } from "lucide-react";
import { cn } from "../../../lib/utils";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

const ModernToast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseClasses =
    "fixed left-1/2 right-1/2 transform -translate-x-1/2 flex items-center gap-2 p-4 rounded-lg shadow-lg transition-all duration-300";
  const variants = {
    success: {
      background: "bg-emerald-50 border border-emerald-200",
      icon: <Check className="w-5 h-5 text-emerald-500" />,
      text: "text-emerald-800",
    },
    error: {
      background: "bg-red-50 border border-red-200",
      icon: <X className="w-5 h-5 text-red-500" />,
      text: "text-red-800",
    },
    info: {
      background: "bg-blue-50 border border-blue-200",
      icon: <Info className="w-5 h-5 text-blue-500" />,
      text: "text-blue-800",
    },
  };

  const currentVariant = variants[type];

  return (
    <div
      className={cn(
        baseClasses,
        currentVariant.background,
        currentVariant.text,
        isLeaving
          ? "translate-y-[-100%] opacity-0"
          : "translate-y-4 opacity-100",
        "transform transition-all duration-300"
      )}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0">{currentVariant.icon}</div>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsLeaving(true);
          setTimeout(onClose, 300);
        }}
        className="ml-4 shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ModernToast;
