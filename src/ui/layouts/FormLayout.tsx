import React from "react";
import TextInput from "./../components/SharedCompoent/TextInput"; // Sesuaikan path dengan lokasi file TextInput

interface FormLayoutProps {
  title?: string;
  className?: React.ReactNode;
  description?: string;
  fields: {
    name: string;
    label: string;
    placeholder?: string;
    type?: "text" | "number" | "date" | "email" | "password" | "tel";
    value?: string;
    onChange: (value: string) => void;
    required?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    errorMessage?: string;
    disabled?: boolean;
  }[];
  onSubmit: () => Promise<void> | void;
  buttonLabel?: string;
  loadingLabel?: string;
  loading?: boolean;
  error?: string | null;
}

const FormLayout = ({
  title = "Form",
  className = "w-full",
  description = "Please fill in the details below",
  fields,
  onSubmit,
  buttonLabel = "Submit",
  loadingLabel = "Submitting...",
  loading = false,
  error = null,
}: FormLayoutProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <div className={`flex flex-col justify-center ${className}`}>
      <div className="md:mb-6 mb-4 space-y-1 md:space-y-2">
        <h2 className="xl:text-2xl text-lg md:text-xl font-bold text-gray-800">
          {title}
        </h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div className="md:mb-6 mb-4" key={index}>
            <TextInput
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              startIcon={field.startIcon}
              endIcon={field.endIcon}
              errorMessage={field.errorMessage}
              disabled={field.disabled}
              className="w-full"
            />
          </div>
        ))}

        {/* General Error Message */}
        {error && (
          <div className="text-red-500 text-sm mb-4">
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full md:p-3 py-2 rounded-md text-white text-sm md:text-base font-semibold ${
            loading
              ? "bg-gray-400"
              : "bg-customColor-blue transition-all ease-out hover:bg-customColor-darkBlue"
          }`}
        >
          {loading ? loadingLabel : buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default FormLayout;
