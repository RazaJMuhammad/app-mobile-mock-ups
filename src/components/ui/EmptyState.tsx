import type { ReactNode } from "react";
import { Button } from "./Button";

type Props = {
  icon: ReactNode;
  title: string;
  message: string;
  cta?: string;
  onCta?: () => void;
};

export function EmptyState({ icon, title, message, cta, onCta }: Props) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-10">
      <div className="w-20 h-20 rounded-full bg-surface border border-line flex items-center justify-center text-accent mb-5">
        {icon}
      </div>
      <h3 className="text-[17px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[15px] text-muted leading-relaxed max-w-[280px]">{message}</p>
      {cta && onCta && (
        <Button variant="accent" className="mt-6" onClick={onCta}>
          {cta}
        </Button>
      )}
    </div>
  );
}
