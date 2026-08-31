import type { ReactNode } from "react";

type Props = { children: ReactNode; tone?: "accent" | "muted" | "primary" };

export function Badge({ children, tone = "muted" }: Props) {
  const map = {
    accent: "bg-accent/15 text-ink",
    primary: "bg-primary/15 text-primary",
    muted: "bg-surface text-muted border border-line",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}
