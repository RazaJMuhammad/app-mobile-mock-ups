import { Check, Minus } from "lucide-react";

type Status = "today" | "completed" | "scheduled" | "missed" | "rest";

type Props = {
  label: string;
  date: string;
  status: Status;
  onClick?: () => void;
};

export function DayChip({ label, date, status, onClick }: Props) {
  const ring =
    status === "today"
      ? "border-accent bg-accent/15 text-ink"
      : "border-line bg-surface text-ink";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[72px] px-2 rounded-[12px] border ${ring}`}
      aria-label={`${label} ${date}, ${status}`}
    >
      <span className="text-[11px] font-medium text-muted">{label}</span>
      <span className="text-[15px] font-semibold">{date}</span>
      <span className="h-4 flex items-center">
        {status === "completed" && <Check size={14} className="text-success" strokeWidth={2.5} />}
        {status === "missed" && <Minus size={14} className="text-muted" strokeWidth={2.5} />}
        {status === "scheduled" && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
        {status === "today" && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
      </span>
    </button>
  );
}
