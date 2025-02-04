import { useEffect, useState } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast";

interface ToastData {
  id: string;
  title?: string;
  description: string;
  variant?: "default" | "success" | "destructive";
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastData>) => {
      const { detail } = event;
      const id = Math.random().toString(36).substr(2, 9);

      setToasts((currentToasts) => [...currentToasts, { ...detail, id }]);

      // Hapus toast setelah 5 detik
      setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((toast) => toast.id !== id)
        );
      }, 1000);
    };

    window.addEventListener("show-toast" as any, handleToast as any);

    return () => {
      window.removeEventListener("show-toast" as any, handleToast as any);
    };
  }, []);

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
