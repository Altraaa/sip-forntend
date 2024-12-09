interface CardProps {
  title?: string;
  className?: string;
  color?: "primary" | "secondary" | "third" | "fourth";
  variant?: "outlined" | "contained";
  desc?: string;
  icon?: React.ReactNode;
  iconColor?: "iconPrimary" | "iconSecondary" | "iconThird" | "iconFourth";
  iconVariant?: "iconContained" | "iconOutlined";
}

const Card = ({
  title,
  className,
  color = "primary",
  variant = "contained",
  desc,
  icon,
  iconColor = "iconPrimary",
  iconVariant = "iconContained",
}: CardProps) => {
  const containedBlue = "bg-customColor-blue text-white";
  const containedDarkBlue = "bg-customColor-darkBlue text-white";
  const containedOrange = "bg-customColor-oranye text-white";
  const containedCream = "bg-customColor-cream text-black";

  const outlined = "border-2 border-gray-300 text-black";
  const outlinedBlue = "border-2 border-customColor-blue text-black";
  const outlinedDarkBlue = "border-2 border-customColor-darkBlue text-black";
  const outlinedOrange = "border-2 border-customColor-oranye text-black";
  const outlinedCream = "border-2 border-customColor-cream text-black";

  const iconContainedBlue = "bg-customColor-coldblue text-white";
  const iconContainedDarkBlue = "bg-customColor-lightBlue text-black";
  const iconContainedOrange = "bg-customColor-cream text-black";
  const iconContainedCream = "bg-customColor-oranye text-cream";

  const iconOutlined = "border-2 border-gray-300 text-black";
  const iconOutlinedBlue = "border-2 border-customColor-blue text-black";
  const iconOutlinedDarkBlue =
    "border-2 border-customColor-darkBlue text-black";
  const iconOutlinedOrange = "border-2 border-customColor-oranye text-black";
  const iconOutlinedCream = "border-2 border-customColor-cream text-black";

  const styles: string[] = [];

  if (variant === "contained") {
    if (color === "primary") styles.push(containedBlue);
    if (color === "secondary") styles.push(containedDarkBlue);
    if (color === "third") styles.push(containedOrange);
    if (color === "fourth") styles.push(containedCream);
  }

  if (variant === "outlined") {
    styles.push(outlined);
    if (color === "primary") styles.push(outlinedBlue);
    if (color === "secondary") styles.push(outlinedDarkBlue);
    if (color === "third") styles.push(outlinedOrange);
    if (color === "fourth") styles.push(outlinedCream);
  }

  if (iconVariant === "iconContained") {
    if (iconColor === "iconPrimary") styles.push(iconContainedBlue);
    if (iconColor === "iconSecondary") styles.push(iconContainedDarkBlue);
    if (iconColor === "iconThird") styles.push(iconContainedOrange);
    if (iconColor === "iconFourth") styles.push(iconContainedCream);
  }

  if (iconVariant === "iconOutlined") {
    styles.push(iconOutlined);
    if (iconColor === "iconPrimary") styles.push(iconOutlinedBlue);
    if (iconColor === "iconSecondary") styles.push(iconOutlinedDarkBlue);
    if (iconColor === "iconThird") styles.push(iconOutlinedOrange);
    if (iconColor === "iconFourth") styles.push(iconOutlinedCream);
  }

  console.log(iconColor, iconVariant); // Cek nilai yang diterima
  return (
    <div
      className={`${styles.join(
        " "
      )} ${className} w-full flex gap-2 md:p-5 p-3 justify-center items-center rounded-xl shadow-xl`}
    >
      <div
        className={`${iconColor} ${iconVariant} flex rounded-xl items-center p-4`}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-xs">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
