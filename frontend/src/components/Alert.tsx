type AlertVariant = "error" | "success";

interface AlertProps {
  variant: AlertVariant;
  message: string | null;
}

const alertStyles = {
  error: {
    background: "#fee2e2",
    color: "#991b1b",
  },
  success: {
    background: "#dcfce7",
    color: "#166534",
  },
};

export function Alert({ variant, message }: AlertProps) {
  if (!message) return null;

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "16px",
        ...alertStyles[variant],
      }}
    >
      {message}
    </div>
  );
}