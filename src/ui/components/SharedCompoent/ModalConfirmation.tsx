import React from "react";
import Button from "./Button";

interface ModalConfirmationProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 xl:px-16 flex flex-col xl:justify-center rounded-lg shadow-lg w-72 max-w-xs md:max-w-sm xl:max-w-xl xl:max-h-64 xl:h-full md:w-full">
        <h3 className="text-xl md:text-2xl xl:text-3xl font-semibold text-center mb-4">{title}</h3>
        <p className="text-center text-sm md:text-base xl:text-xl text-gray-600 mb-6">{message}</p>
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
              onClick={onConfirm}
              label={confirmText}
              variant="contained"
              color="danger"
              className="xl:px-16 md:px-9 px-4 text-sm md:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
