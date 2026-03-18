import type { CSSProperties } from "react";

interface CardProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export function Card({ children, style }: CardProps) {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        ...style,
      }}
    >
      {children}
    </section>
  );
}