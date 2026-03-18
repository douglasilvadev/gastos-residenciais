interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{ display: "block", marginBottom: "6px" }}
      >
        {label}
      </label>

      {children}

      {error && (
        <span
          style={{
            color: "#dc2626",
            fontSize: "14px",
            marginTop: "4px",
            display: "block",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}