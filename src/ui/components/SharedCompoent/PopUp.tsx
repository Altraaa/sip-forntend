import { ReactNode } from "react";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface PopUpHeaderProps {
  children: ReactNode;
}

interface PopUpContentProps {
  children: ReactNode;
}

interface PopUpFooterProps {
  children: ReactNode;
  className?: string;
}

export const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg relative w-[400px]">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* Konten PopUp */}
        {children}
      </div>
    </div>
  );
};

export const PopUpHeader: React.FC<PopUpHeaderProps> = ({ children }) => {
  return <div className="text-lg font-bold border-b pb-2">{children}</div>;
};

export const PopUpContent: React.FC<PopUpContentProps> = ({ children }) => {
  return <div className="mt-4 text-sm text-gray-600">{children}</div>;
};

export const PopUpFooter: React.FC<PopUpFooterProps> = ({ children, className }) => {
   return (
     <div className={`mt-4 flex justify-end gap-2 ${className}`}>
       {children}
     </div>
   );
};




