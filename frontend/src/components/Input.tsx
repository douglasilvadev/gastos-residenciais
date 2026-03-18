import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ hasError, style, ...props }: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: `1px solid ${hasError ? "#dc2626" : "#d1d5db"}`,
        ...style,
      }}
    />
  );
}