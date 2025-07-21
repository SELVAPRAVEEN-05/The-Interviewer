// components/HeroButton.tsx
import { Button } from "@heroui/button";

type HeroButtonProps = {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  color?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
  radius?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
};

function HeroButton({
  children,
  variant = "solid",
  color = "primary",
  size = "md",
  isDisabled = false,
  className = "w-full",
  radius = "sm",
  type = "button",
}: HeroButtonProps) {
  return (
    <Button
      variant={variant}
      color={color}
      radius={radius}
      size={size}
      isDisabled={isDisabled}
      type={type}
      className={className}
    >
      {children}
    </Button>
  );
}

export default HeroButton;
