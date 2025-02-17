import React from "react";
import TextInput from "../components/SharedCompoent/TextInput";
import Dropdown from "../components/SharedCompoent/Dropdown";
import TextArea from "../components/SharedCompoent/TextArea";

interface FormLayoutProps {
  title?: string;
  className?: React.ReactNode;
  description?: string;
  fields: (
    | {
        type: "text" | "number" | "date" | "email" | "password" | "tel";
        name?: string;
        label: string;
        placeholder?: string;
        value?: string;
        onChange: (value: string) => void;
        required?: boolean;
        startIcon?: React.ReactNode;
        endIcon?: React.ReactNode;
        errorMessage?: string;
        disabled?: boolean;
      }
    | {
        type: "dropdown";
        label: string;
        options: { id: string | number; name: string }[];
        value: string | number | null;
        onChange: (id: string | number) => void;
        required?: boolean;
        placeholder?: string;
      }
    | {
        type: "textarea";
        label: string;
        placeholder?: string;
        value?: string;
        onChange: (value: string) => void;
        required?: boolean;
        rows?: number;
        errorMessage?: string;
        disabled?: boolean;
      }
    | {
        type: "image"; // Added image field type
        label: string;
        value: string; // Store the image base64 or file URL
        onChange: (file: File) => void; // Callback for handling the file change
        required?: boolean;
      }
  )[];
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
            {field.type === "dropdown" ? (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <Dropdown
                  options={field.options}
                  selectedValue={field.value}
                  onChange={field.onChange}
                  placeholder={field.placeholder || "Select an option"}
                />
              </>
            ) : field.type === "textarea" ? (
              <TextArea
                label={field.label}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                rows={field.rows}
                errorMessage={field.errorMessage}
                disabled={field.disabled}
                className="w-full"
              />
            ) : field.type === "image" ? ( // Handle image input
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                  className="w-full border p-2 rounded-md"
                />
              </>
            ) : (
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
            )}
          </div>
        ))}

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
