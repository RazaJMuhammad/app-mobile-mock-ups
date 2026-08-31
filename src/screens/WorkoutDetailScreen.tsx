import { useMemo, useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { COACH, SESSION_BRIEF, WORKOUTS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";

export function WorkoutDetailScreen() {
  const { screen, go, hasProgram, onboarding } = useApp();
  const id = screen.name === "workoutDetail" ? screen.workoutId : "w-today";
  const workout = WORKOUTS.find((w) => w.id === id) ?? WORKOUTS[0];
  const gear = useMemo(() => {
    const fromProgram = ["Resistance bands", "Medicine ball", "Kettlebell", "Open space"];
    return fromProgram;
  }, []);
  const [ready, setReady] = useState<string[]>([]);
  const injured = Boolean(onboarding.injuries.trim());

  const toggleGear = (g: string) => {
    setReady((r) => (r.includes(g) ? r.filter((x) => x !== g) : [...r, g]));
  };

  return (
    <div className="flex flex-col h-full">
      <header className="px-3 pt-1 flex items-center gap-1">
        <button
          type="button"
          onClick={() => go({ name: hasProgram ? "home" : "library" })}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[17px] font-semibold text-ink truncate">Day {workout.dayNumber}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-24">
        <img src={workout.cover} alt="" className="w-full aspect-video object-cover rounded-[12px]" />
        <h2 className="mt-4 text-[24px] font-bold text-ink leading-tight">{workout.name}</h2>
        <p className="mt-1 text-[15px] text-muted">
          Week {workout.weekNumber} · Day {workout.dayNumber} · {workout.durationMin} min
        </p>

        <div className="mt-4 rounded-[16px] border border-line bg-surface p-4 flex gap-3">
          <img src={COACH.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-ink">{SESSION_BRIEF.title}</p>
            <p className="mt-1 text-[13px] text-muted leading-relaxed">{SESSION_BRIEF.body}</p>
          </div>
        </div>

        <h3 className="mt-6 text-[20px] font-semibold text-ink">Equipment</h3>
        <p className="text-[13px] text-muted mb-2">Tick what’s with you — gym or court.</p>
        <ul className="space-y-2">
          {gear.map((g) => {
            const on = ready.includes(g);
            return (
              <li key={g}>
                <button
                  type="button"
                  onClick={() => toggleGear(g)}
                  className={`w-full flex items-center gap-3 min-h-[44px] rounded-[12px] border px-3 ${
                    on ? "border-accent bg-accent/10" : "border-line bg-surface"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center ${on ? "bg-accent border-accent text-[#0F172A]" : "border-line"}`}>
                    {on && <Check size={14} strokeWidth={3} />}
                  </span>
                  <span className="text-[15px]">{g}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-6 text-[20px] font-semibold text-ink">Exercises</h3>
        <ul className="mt-3 space-y-2">
          {workout.exercises.map((e, i) => (
            <li key={e.id} className="flex gap-3 items-center rounded-[16px] border border-line bg-surface p-3">
              <img src={e.thumbnail} alt="" className="w-16 h-12 object-cover rounded-[12px]" />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-ink truncate">
                  {i + 1}. {e.name}
                </p>
                <p className="text-[13px] text-muted">
                  {e.sets} × {e.reps}
                </p>
                {injured && e.modification && (
                  <p className="text-[11px] font-medium text-accent mt-0.5">Modified for {e.modification.reason}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-app border-t border-line">
        <Button variant="accent" fullWidth onClick={() => go({ name: "activeWorkout", workoutId: workout.id })}>
          Start Workout
        </Button>
      </div>
    </div>
  );
}
