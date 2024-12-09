interface ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: "primary" | "secondary" | "default" | "danger";
  variant?: "text" | "outlined" | "contained";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

const Button = ({
    label,
    onClick,
    startIcon,
    endIcon,
    color = "primary",
    variant = "contained",
    disabled = false,
    type = "button",
    className
}: ButtonProps) => {
    
    const containedOrange =
      "bg-orange-800 hover:bg-orange-700 active:bg-orange-900 text-white";
    const containedGray = "bg-gray-300 hover:bg-gray-400 active:bg-gray-500";
    const containedBlue =
      "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white";
    const containedRed =
      "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white";

    const outlined = "border bg-white";
    const outlinedOrange = `text-orange-800 
    border-orange-800 
    hover:border-orange-700 
    active:border-orange-900`;
    const outlinedGray = `text-gray-500 
    border-gray-500 
    hover:border-gray-600 
    active:border-gray-700`;
    const outlinedBlue = `text-blue-500 
    border-blue-500 
    hover:border-blue-600 
    active:border-blue-700`;
    const outlinedRed = `text-red-500
    border-red-500
    hover:border-red-600
    active:border-red-700`;

    const textOrange =
      "text-orange-800 hover:text-orange-700 active:text-orange-900";
    const textGray = "text-gray-500 hover:text-gray-600 active:text-gray-700";
    const textBlue = "text-blue-500 hover:text-blue-600 active:text-blue-700";
    const textRed = "text-red-500 hover:text-red-600 active:text-red-700";

    const styles: string[] = [];

    if (variant == "contained") {
      if (color == "primary") styles.push(containedOrange);
      if (color == "secondary") styles.push(containedBlue);
      if (color == "default") styles.push(containedGray);
      if (color == "danger") styles.push(containedRed);
    }

    if (variant == "outlined") {
      styles.push(outlined);
      if (color == "primary") styles.push(outlinedOrange);
      if (color == "secondary") styles.push(outlinedBlue);
      if (color == "default") styles.push(outlinedGray);
      if (color == "danger") styles.push(outlinedRed);
    }

    if (variant == "text") {
      if (color == "primary") styles.push(textOrange);
      if (color == "secondary") styles.push(textBlue);
      if (color == "default") styles.push(textGray);
      if (color == "danger") styles.push(textRed);
    }

    return (
      <button
        className={`${styles.join(" ")}
    rounded-md py-3 px-12 flex items-center justify-center
    ${className}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        <span className="mr-4">{startIcon}</span> {label}{" "}
        <span className="ml-4">{endIcon}</span>
      </button>
    );
}

export default Button;