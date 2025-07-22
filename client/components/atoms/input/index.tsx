// components/HeroInput.tsx
import { Input } from "@heroui/input";

type HeroInputProps = {
  label?: string;
  defaultValue?: string;
  type?: string;
  variant?: "bordered" | "flat" | "underlined";
  isReadOnly?: boolean;
  isRequired?: boolean;
  className?: string;
};

function HeroInput({
  label = "Email",
  defaultValue = "",
  type = "text",
  variant = "bordered",
  isReadOnly = false,
  isRequired = false,
  className = "w-full",
}: HeroInputProps) {
  return (
    <Input
      className={className}
      defaultValue={defaultValue}
      label={label}
      type={type}
      variant={variant}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
    />
  );
}

export default HeroInput;
