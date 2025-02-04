import React, { createContext, useContext, useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

interface ToastData {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextProps {
  showToast: (type: ToastData["type"], message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToasterProvider");
  }
  return context;
};

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastData>) => {
      setToasts((prev) => [...prev, event.detail]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== event.detail.id));
      }, 3000);
    };

    window.addEventListener("show-toast", handleToast as any);
    return () => window.removeEventListener("show-toast", handleToast as any);
  }, []);

  const showToast = (type: ToastData["type"], message: string) => {
    const event = new CustomEvent("show-toast", {
      detail: { id: Date.now().toString(), type, message },
    });
    window.dispatchEvent(event);
  };

  const getIcon = (type: ToastData["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "error":
        return <XCircle className="text-red-500 w-5 h-5" />;
      case "info":
        return <Info className="text-blue-500 w-5 h-5" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-lg shadow-lg bg-white border transition-all duration-300 ease-in-out ${
              toast.type === "success" ? "border-green-500" : ""
            } ${toast.type === "error" ? "border-red-500" : ""} ${
              toast.type === "info" ? "border-blue-500" : ""
            }`}
          >
            {getIcon(toast.type)}
            <p className="text-gray-700 font-medium">{toast.message}</p>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="ml-4 hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
