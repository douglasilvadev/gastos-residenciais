import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function Select({ hasError, style, children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: `1px solid ${hasError ? "#dc2626" : "#d1d5db"}`,
        ...style,
      }}
    >
      {children}
    </select>
  );
}