interface CardProps {
  title?: string;
  className?: string;
  color?: "primary" | "secondary" | "third" | "fourth" | "border";
  variant?: "outlined" | "contained";
  desc?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  children?: React.ReactNode;
}

const Card = ({
  title,
  className,
  color = "primary",
  variant = "contained",
  desc,
  icon,
  iconClassName,
  children,
}: CardProps) => {
  const containedBlue = "bg-customColor-blue text-black";
  const containedDarkBlue = "bg-customColor-darkBlue text-white";
  const containedOrange = "bg-customColor-oranye text-white";
  const containedCream = "bg-customColor-cream text-black";

  const outlined = "border-gray-300 border-2 text-black";
  const outlinedBlue = "border-customColor-blue border-2 text-black";
  const outlinedDarkBlue = "border-customColor-darkBlue border-2 text-black";
  const outlinedOrange = "border-customColor-oranye border-2 text-black";
  const outlinedCream = "border-customColor-cream border-2 text-black";

  const styles: string[] = [];

  if (variant === "contained") {
    if (color === "primary") styles.push(containedBlue);
    if (color === "secondary") styles.push(containedDarkBlue);
    if (color === "third") styles.push(containedOrange);
    if (color === "fourth") styles.push(containedCream);
  }

  if (variant === "outlined") {
    if (color === "border") styles.push(outlined);
    if (color === "primary") styles.push(outlinedBlue);
    if (color === "secondary") styles.push(outlinedDarkBlue);
    if (color === "third") styles.push(outlinedOrange);
    if (color === "fourth") styles.push(outlinedCream);
  }

  return (
    <div
      className={`${styles.join(
        " "
      )} ${className} w-full flex gap-2 md:p-5 p-3 justify-center items-center rounded-xl shadow-xl`}
    >
      {icon && (
        <div className={`${iconClassName} flex rounded-xl items-center p-4`}>
          {icon}
        </div>
      )}
      {children ? (
        children
      ) : (
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs">{desc}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
