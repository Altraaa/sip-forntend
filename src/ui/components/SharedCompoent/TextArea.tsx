import React from "react";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  onChange?: (T: string) => void;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

const TextArea = ({
  label,
  placeholder,
  startIcon,
  endIcon,
  id,
  name,
  className,
  value,
  onChange,
  errorMessage,
  required = false,
  disabled = false,
  rows = 4,
}: TextAreaProps) => {
  return (
    <div className={`md:space-y-3 space-y-2 text-left ${className}`}>
      <label className="text-sm md:text-md">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-start rounded-2xl border border-gray-400 bg-white p-2">
        {startIcon && <span className="ml-2 mt-2">{startIcon}</span>}
        <textarea
          id={id}
          name={name}
          className={`w-full rounded-2xl md:px-6 md:py-4 px-4 py-3 text-xs md:text-sm outline-none resize-none [&::-webkit-scrollbar]:w-1.5
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-customColor-blue
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:hover:bg-customColor-blue/80 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
          disabled={disabled}
          rows={rows}
        />
        {endIcon && <span className="md:mr-6 mr-4 mt-2">{endIcon}</span>}
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default TextArea;
