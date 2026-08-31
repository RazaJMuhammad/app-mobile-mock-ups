import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Flag, X } from "lucide-react";
import { WORKOUTS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";

export function ActiveWorkoutScreen() {
  const { screen, go, onboarding } = useApp();
  const id = screen.name === "activeWorkout" ? screen.workoutId : "w-today";
  const workout = WORKOUTS.find((w) => w.id === id) ?? WORKOUTS[0];
  const [ex, setEx] = useState(0);
  const [setN, setSetN] = useState(1);
  const [phase, setPhase] = useState<"work" | "rest">("work");
  const [rest, setRest] = useState(45);
  const [elapsed, setElapsed] = useState(0);
  const [useMod, setUseMod] = useState(Boolean(onboarding.injuries.trim()));
  const [flagged, setFlagged] = useState(false);

  const exercise = workout.exercises[ex];
  const totalSets = exercise.sets;
  const showingMod = useMod && exercise.modification;
  const displayName = showingMod ? exercise.modification!.name : exercise.name;
  const displayCue = showingMod ? exercise.modification!.cue : exercise.cue;

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (phase !== "rest") return;
    setRest(exercise.restSec);
    const t = setInterval(() => {
      setRest((r) => {
        if (r <= 1) {
          clearInterval(t);
          setPhase("work");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, exercise.restSec, ex, setN]);

  const completeSet = () => {
    setFlagged(false);
    if (setN >= totalSets) {
      if (ex >= workout.exercises.length - 1) {
        go({ name: "workoutComplete", workoutId: workout.id });
        return;
      }
      setEx((e) => e + 1);
      setSetN(1);
      setPhase("work");
      return;
    }
    setPhase("rest");
    setSetN((s) => s + 1);
  };

  const prev = () => {
    if (phase === "rest") {
      setPhase("work");
      return;
    }
    if (setN > 1) {
      setSetN((s) => s - 1);
      return;
    }
    if (ex > 0) {
      const prevEx = workout.exercises[ex - 1];
      setEx((e) => e - 1);
      setSetN(prevEx.sets);
    }
  };

  const nextEx = () => {
    if (ex >= workout.exercises.length - 1) {
      go({ name: "workoutComplete", workoutId: workout.id });
      return;
    }
    setEx((e) => e + 1);
    setSetN(1);
    setPhase("work");
  };

  const clock = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  const progress = (ex + (setN - 1) / totalSets) / workout.exercises.length;

  if (phase === "rest") {
    const max = exercise.restSec;
    const pct = rest / max;
    const dash = 2 * Math.PI * 54;
    return (
      <div className="flex flex-col h-full px-5">
        <header className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-muted tabular-nums">{clock}</span>
          <button type="button" className="min-h-[44px] text-[15px] font-semibold text-muted" onClick={() => setPhase("work")}>
            Skip rest
          </button>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-[13px] text-muted uppercase tracking-wider font-medium">Rest · breathe</p>
          <div className="relative mt-6">
            <svg width="160" height="160" className="-rotate-90">
              <circle cx="80" cy="80" r="54" fill="none" stroke="var(--app-border)" strokeWidth="8" />
              <circle
                cx="80"
                cy="80"
                r="54"
                fill="none"
                stroke="var(--app-accent)"
                strokeWidth="8"
                strokeDasharray={dash}
                strokeDashoffset={dash * (1 - pct)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[32px] font-bold text-ink">
              {rest}
            </span>
          </div>
          <p className="mt-6 text-[15px] text-muted text-center max-w-[280px]">
            Next: set {setN} · {displayName}
          </p>
          <p className="mt-3 text-[13px] text-ink text-center max-w-[260px] leading-relaxed">
            Warren: nasal in for 3, out for 4. Don’t scroll — stay ready for the next ball.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="px-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go({ name: "workoutDetail", workoutId: workout.id })}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close workout"
        >
          <X size={22} />
        </button>
        <span className="text-[13px] font-medium text-muted flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-error animate-[live-pulse_1.2s_ease-in-out_infinite]" />
          {clock}
          <span className="text-line">·</span>
          {ex + 1} / {workout.exercises.length}
        </span>
        <span className="w-11" />
      </header>
      <div className="h-1 bg-line mx-5 rounded-full overflow-hidden">
        <div className="h-full bg-accent" style={{ width: `${Math.max(6, progress * 100)}%` }} />
      </div>

      <div className="px-5 pt-4">
        <div className="relative aspect-video rounded-[12px] overflow-hidden bg-surface">
          <img src={exercise.thumbnail} alt="" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-2 text-[11px] font-medium bg-black/60 text-white px-2 py-1 rounded-full">
            Demo loop
          </span>
        </div>
        <h1 className="mt-4 text-[24px] font-bold text-ink leading-tight">{displayName}</h1>
        <p className="mt-1 text-[20px] font-semibold text-accent">
          Set {setN} of {totalSets} · {exercise.reps}
        </p>
        <p className="mt-3 text-[15px] text-muted leading-relaxed">{displayCue}</p>
        {exercise.modification && (
          <button
            type="button"
            onClick={() => setUseMod((v) => !v)}
            className="mt-3 min-h-[44px] text-[13px] font-semibold text-primary"
          >
            {useMod ? `Use original: ${exercise.name}` : `Use Warren’s swap (${exercise.modification.reason})`}
          </button>
        )}
        {flagged && <p className="mt-2 text-[13px] text-accent">Flagged — Warren will see this set.</p>}
      </div>

      <div className="mt-auto px-5 pb-4 pt-3 space-y-2">
        <Button variant="accent" fullWidth onClick={completeSet}>
          Complete Set
        </Button>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="secondary" onClick={prev} disabled={ex === 0 && setN === 1}>
            <ChevronLeft size={16} />
            Previous
          </Button>
          <Button variant="ghost" onClick={() => setFlagged(true)}>
            <Flag size={16} />
            Flag
          </Button>
          <Button variant="secondary" onClick={nextEx}>
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
