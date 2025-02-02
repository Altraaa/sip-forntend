interface DropdownProps {
  options: { id: string | number; name: string }[];
  selectedValue: string | number | null;
  onChange: (id: string | number) => void;
  placeholder?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  selectedValue,
  className,
  onChange,
  placeholder,
  startIcon,
  endIcon,
  disabled = false,
}: DropdownProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center border border-gray-400 rounded-2xl p-3 text-sm">
        {startIcon && <span className="mr-2">{startIcon}</span>}{" "}
        <select
          className="w-full outline-none"
          value={selectedValue || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </div>
    </div>
  );
};

export default Dropdown;
