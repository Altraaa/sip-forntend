import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "date" | "email" | "password" | "tel";
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
}

const TextInput = ({
  label,
  placeholder,
  type = "text",
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
}: TextInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={`md:space-y-3 space-y-2 text-left ${className}`}>
      <label className="text-sm md:text-md">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center rounded-2xl border border-gray-400 bg-white">
        {startIcon && <span className="ml-10">{startIcon}</span>}
        <input
          id={id}
          name={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          className={`w-full rounded-3xl md:px-6 md:py-4 px-4 py-3 text-xs md:text-sm outline-none ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
          disabled={disabled}
        />

        {type === "password" && (
          <span
            className="md:mr-6 mr-4 cursor-pointer"
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          >
            {isPasswordVisible ? (
              <Eye className="text-gray-500" size="24" />
            ) : (
              <EyeOff className="text-gray-500" size="24" />
            )}
          </span>
        )}
        {endIcon && <span className="md:mr-6 mr-4">{endIcon}</span>}
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
