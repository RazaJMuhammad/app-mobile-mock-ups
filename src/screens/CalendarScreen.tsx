import { useState } from "react";
import { Check, ChevronLeft, Minus } from "lucide-react";
import { CALENDAR, RECOVERY } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Sheet } from "../components/ui/Sheet";
import { Button } from "../components/ui/Button";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function CalendarScreen() {
  const { screen, go } = useApp();
  const [mode, setMode] = useState<"month" | "week">(
    screen.name === "calendar" && screen.view === "week" ? "week" : "month",
  );

  const first = new Date(2026, 7, 1);
  const startPad = (first.getDay() + 6) % 7;
  const cells: (typeof CALENDAR[number] | null)[] = [...Array(startPad).fill(null), ...CALENDAR];
  while (cells.length % 7) cells.push(null);

  const [recovery, setRecovery] = useState(false);

  const weekCells = CALENDAR.filter((d) => {
    const dt = new Date(d.date + "T12:00:00");
    return dt >= new Date(2026, 7, 31) && dt <= new Date(2026, 8, 6);
  });

  const openDay = (day: (typeof CALENDAR)[number] | null) => {
    if (!day) return;
    if (day.workoutId) go({ name: "workoutDetail", workoutId: day.workoutId });
    else if (day.status === "rest") setRecovery(true);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="px-3 pt-1 flex items-center gap-1">
        <button type="button" className="min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => go({ name: "progress" })} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[24px] font-bold flex-1">August 2026</h1>
      </header>

      <div className="px-5 mt-2">
        <div className="flex p-1 rounded-[12px] bg-surface border border-line">
          {(["month", "week"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 min-h-[44px] rounded-[10px] text-[15px] font-semibold capitalize ${
                mode === m ? "bg-primary text-white" : "text-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="text-center text-[11px] font-medium text-muted">
              {d}
            </div>
          ))}
        </div>
        {mode === "month" ? (
          <div className="grid grid-cols-7 gap-y-2">
            {cells.map((c, i) => (
              <DayCell key={i} day={c} onOpen={openDay} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {weekCells.map((c) => (
              <DayCell key={c.date} day={c} onOpen={openDay} />
            ))}
          </div>
        )}
      </div>

      <div className="px-5 mt-6 space-y-2 text-[13px] text-muted">
        <p className="flex items-center gap-2">
          <Check size={14} className="text-success" /> Completed
        </p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Scheduled
        </p>
        <p className="flex items-center gap-2">
          <Minus size={14} /> Missed — next session still counts
        </p>
      </div>

      <Sheet open={recovery} onClose={() => setRecovery(false)} title={RECOVERY.title}>
        <p className="text-[13px] text-muted mb-3">{RECOVERY.minutes} min · optional, not a skip</p>
        <ul className="space-y-2 mb-4">
          {RECOVERY.items.map((item) => (
            <li key={item} className="text-[15px] text-ink border border-line rounded-[12px] px-3 py-2 bg-surface">
              {item}
            </li>
          ))}
        </ul>
        <Button variant="accent" fullWidth onClick={() => setRecovery(false)}>
          I’ll do the flow
        </Button>
      </Sheet>
    </div>
  );
}

function DayCell({
  day,
  onOpen,
}: {
  day: (typeof CALENDAR)[number] | null;
  onOpen: (day: (typeof CALENDAR)[number] | null) => void;
}) {
  if (!day) return <div />;
  const n = Number(day.date.slice(-2));
  const today = day.status === "today";
  return (
    <button
      type="button"
      onClick={() => onOpen(day)}
      className={`mx-auto flex flex-col items-center justify-center w-11 h-14 rounded-[12px] ${
        today ? "bg-accent/20" : ""
      }`}
    >
      <span className={`text-[15px] font-semibold ${today ? "text-ink" : "text-ink"}`}>{n}</span>
      <span className="h-4 flex items-center">
        {day.status === "completed" && <Check size={12} className="text-success" strokeWidth={2.5} />}
        {day.status === "missed" && <Minus size={12} className="text-muted" />}
        {(day.status === "scheduled" || day.status === "today") && day.workoutId && (
          <span className={`w-1.5 h-1.5 rounded-full ${today ? "bg-accent" : "bg-primary"}`} />
        )}
      </span>
    </button>
  );
}
