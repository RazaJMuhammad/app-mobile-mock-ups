import { useState } from "react";
import { UPCOMING, WORKOUTS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";

const RPE = [
  { id: "easy", label: "Easy", hint: "Could have done more" },
  { id: "right", label: "Just right", hint: "Worked, still sharp" },
  { id: "tough", label: "Tough", hint: "Gassed — note for Warren" },
] as const;

export function WorkoutCompleteScreen() {
  const { screen, go, setSessionLog } = useApp();
  const id = screen.name === "workoutComplete" ? screen.workoutId : "w-today";
  const workout = WORKOUTS.find((w) => w.id === id) ?? WORKOUTS[0];
  const [feel, setFeel] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const next = UPCOMING[0];

  const save = () => {
    if (!feel) return;
    setSessionLog({ workoutId: workout.id, feel, note });
    go({ name: "home" });
  };

  return (
    <div className="flex flex-col h-full px-5">
      <div className="flex-1 overflow-y-auto pt-4 pb-2">
        <p className="text-[13px] font-medium uppercase tracking-wider text-accent">Session done</p>
        <h1 className="mt-2 text-[24px] font-bold text-ink">{workout.name}</h1>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label="Time" value={`${workout.durationMin} min`} />
          <Stat label="Exercises" value={`${workout.exercises.length}`} />
        </div>
        <h2 className="mt-8 text-[20px] font-semibold text-ink">How did it feel?</h2>
        <div className="mt-3 space-y-2">
          {RPE.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setFeel(r.id)}
              className={`w-full text-left rounded-[16px] border p-4 min-h-[44px] ${
                feel === r.id ? "border-accent bg-accent/10" : "border-line bg-surface"
              }`}
            >
              <span className="block text-[17px] font-semibold text-ink">{r.label}</span>
              <span className="block text-[13px] text-muted">{r.hint}</span>
            </button>
          ))}
        </div>
        <label className="block mt-5">
          <span className="text-[13px] font-medium text-muted">Note to Warren</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Hip behaved. Shuffles felt sloppy after set 4."
            className="mt-1.5 w-full min-h-[88px] rounded-[10px] border border-line bg-surface text-[15px] text-ink p-3 outline-none"
          />
        </label>
        {feel === "tough" && (
          <p className="mt-3 text-[13px] text-muted">
            Logged as tough — Warren can drop Wednesday density if you’re on court Thursday.
          </p>
        )}
        <button
          type="button"
          onClick={() => go({ name: "workoutDetail", workoutId: next.workoutId })}
          className="mt-5 w-full text-left rounded-[16px] border border-line bg-surface p-4"
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Up next</p>
          <p className="text-[17px] font-semibold text-ink mt-1">
            {next.day} · {next.name}
          </p>
        </button>
      </div>
      <div className="pb-4 pt-2">
        <Button variant="accent" fullWidth disabled={!feel} onClick={save}>
          Save & return Home
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-surface border border-line p-4">
      <p className="text-[13px] text-muted">{label}</p>
      <p className="text-[20px] font-semibold text-ink mt-1">{value}</p>
    </div>
  );
}
