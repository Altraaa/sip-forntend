import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

const ModernToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<Toast>) => {
      const newToast = event.detail;
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 3000);
    };

    window.addEventListener("show-toast" as any, handleToast as any);
    return () =>
      window.removeEventListener("show-toast" as any, handleToast as any);
  }, []);

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-6 h-6" />;
      case "error":
        return <XCircle className="text-red-500 w-6 h-6" />;
      case "info":
        return <Info className="text-blue-500 w-6 h-6" />;
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-4 w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-4 p-4 rounded-lg shadow-lg
            bg-white border border-gray-100
            transform transition-all duration-300 ease-in-out
            animate-toast-slide-in max-w-lg
            ${toast.type === "success" && "border-green-500"}
            ${toast.type === "error" && "border-red-500"}
            ${toast.type === "info" && "border-blue-500"}
          `}
        >
          {getIcon(toast.type)}
          <p className="text-gray-700 text-base font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

const showToast = (type: Toast["type"], message: string) => {
  const event = new CustomEvent("show-toast", {
    detail: {
      id: Date.now().toString(),
      type,
      message,
    },
  });
  window.dispatchEvent(event);
};

export const showModernToast = {
  success: (message: string) => showToast("success", message),
  error: (message: string) => showToast("error", message),
  info: (message: string) => showToast("info", message),
};

export default ModernToastContainer;
