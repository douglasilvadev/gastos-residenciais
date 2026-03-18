import type { ButtonHTMLAttributes, CSSProperties } from "react";

type ButtonVariant = "primary" | "danger" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: { background: "#2563eb" },
  danger: { background: "#dc2626" },
  secondary: { background: "#6b7280" },
};

export function Button({
  variant = "primary",
  style,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        color: "#ffffff",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}