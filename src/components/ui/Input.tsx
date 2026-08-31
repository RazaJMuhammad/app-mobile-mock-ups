import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  right?: ReactNode;
};

export function TextInput({ label, error, hint, right, id, className = "", ...rest }: Props) {
  const inputId = id ?? rest.name;
  return (
    <label className="block w-full">
      {label && (
        <span className="block mb-1.5 text-[13px] font-medium text-muted">{label}</span>
      )}
      <span className="relative flex">
        <input
          id={inputId}
          className={[
            "w-full min-h-[48px] px-3.5 rounded-[10px] bg-surface text-ink text-[15px] outline-none",
            "border placeholder:text-muted/70",
            error ? "border-error" : "border-line focus:border-primary",
            right ? "pr-12" : "",
            className,
          ].join(" ")}
          {...rest}
        />
        {right && (
          <span className="absolute right-1 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center">
            {right}
          </span>
        )}
      </span>
      {error && <span className="mt-1 block text-[12px] text-error">{error}</span>}
      {hint && !error && <span className="mt-1 block text-[12px] text-muted">{hint}</span>}
    </label>
  );
}
