import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
};

const styles: Record<Variant, string> = {
  primary: "bg-primary text-white active:bg-primary-dark",
  accent: "bg-accent text-[#0F172A] active:opacity-90",
  secondary: "bg-transparent text-ink border border-line active:bg-surface",
  ghost: "bg-transparent text-muted active:text-ink",
};

export function Button({
  variant = "primary",
  fullWidth,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      className={[
        "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[12px] text-[16px] font-semibold leading-none",
        "disabled:opacity-40 disabled:pointer-events-none",
        fullWidth ? "w-full" : "",
        styles[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
