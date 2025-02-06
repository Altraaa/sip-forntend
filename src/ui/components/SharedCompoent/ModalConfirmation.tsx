import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { showModernToast } from "./ModernToastContainer";

interface ModalConfirmationProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  color?: "primary" | "secondary" | "default" | "danger";
  confirmText?: string;
  cancelText?: string;
  isLogout?: boolean;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  isOpen,
  title,
  message,
  color,
  onClose,
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLogout = false,
}) => {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      await onConfirm();
      if (isLogout) {
        showModernToast.info("Logout successfully");
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/login");
      }
      onClose();
    } catch (error) {
      showModernToast.error("error logout");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 xl:px-16 flex flex-col xl:justify-center rounded-lg shadow-lg w-72 max-w-xs md:max-w-sm xl:max-w-xl xl:max-h-64 xl:h-full md:w-full">
        <h3 className="text-xl md:text-2xl xl:text-3xl font-semibold text-center mb-4">
          {title}
        </h3>
        <p className="text-center text-sm md:text-base xl:text-xl text-gray-600 mb-6">
          {message}
        </p>
        <div className="flex justify-between items-center">
          <div className="w-1/2 flex justify-start">
            <Button
              onClick={onClose}
              label={cancelText}
              variant="contained"
              color="default"
              className="xl:px-16 md:px-8 px-4 text-sm md:text-base"
            />
          </div>
          <div className="w-1/2 flex justify-end">
            <Button
              onClick={handleConfirm}
              label={confirmText}
              variant="contained"
              color={color}
              className="xl:px-16 md:px-9 px-4 text-sm md:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
