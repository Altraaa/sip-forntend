interface DropdownProps {
  options: { id: string | number; name: string }[];
  selectedValue: string | number | null;
  onChange: (id: string | number) => void;
  placeholder?: string;
  className?: string;
}

const Dropdown = ({
  options,
  selectedValue,
  className,
  onChange,
  placeholder,
}: DropdownProps) => {
  return (
    <div className={`relative ${className}`}>
      <select
        className="w-full rounded-2xl border border-gray-400 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-customColor-blue"
        value={selectedValue || ""}
        onChange={(e) => onChange(e.target.value)}
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
    </div>
  );
};

export default Dropdown;
