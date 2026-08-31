import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useApp } from "../context/AppContext";
import { recommendProgram } from "../data/mock";
import type { FitnessLevel, Goal } from "../data/types";

const LEVELS: { id: FitnessLevel; title: string; body: string }[] = [
  { id: "beginner", title: "Beginner", body: "New to structured training or returning after a break." },
  { id: "intermediate", title: "Intermediate", body: "You train weekly and want court-specific fitness." },
  { id: "advanced", title: "Advanced", body: "Competitive play. You can handle density and load." },
];

const GOALS: { id: Goal; title: string; body: string }[] = [
  { id: "fitness", title: "General fitness", body: "Strength, energy, and a body that holds up." },
  { id: "padel", title: "Padel conditioning", body: "Speed, repeat efforts, and power for match play." },
  { id: "both", title: "Both", body: "Look after the engine and the court game together." },
];

const DAYS = [2, 3, 4, 5, 6];

export function OnboardingScreen() {
  const { screen, go, onboarding, setOnboarding } = useApp();
  const step = screen.name === "onboarding" ? screen.step : 0;

  const next = () => {
    if (step < 4) go({ name: "onboarding", step: step + 1 });
    else {
      const rec = recommendProgram(onboarding.goal, onboarding.level);
      go({ name: "programDetail", programId: rec.id });
    }
  };
  const back = () => {
    if (step === 0) go({ name: "auth" });
    else go({ name: "onboarding", step: step - 1 });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={back} className="text-[15px] text-muted min-h-[44px]">
            Back
          </button>
          <span className="text-[13px] text-muted">{step + 1} of 5</span>
        </div>
        <div className="flex gap-1.5 mb-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-accent" : "bg-line"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 overflow-y-auto">
        {step === 0 && (
          <Question title="What’s your fitness level?">
            {LEVELS.map((l) => (
              <Choice
                key={l.id}
                title={l.title}
                body={l.body}
                selected={onboarding.level === l.id}
                onClick={() => setOnboarding({ level: l.id })}
              />
            ))}
          </Question>
        )}
        {step === 1 && (
          <Question title="What’s the primary goal?">
            {GOALS.map((g) => (
              <Choice
                key={g.id}
                title={g.title}
                body={g.body}
                selected={onboarding.goal === g.id}
                onClick={() => setOnboarding({ goal: g.id })}
              />
            ))}
          </Question>
        )}
        {step === 2 && (
          <Question title="Any injuries or limitations?">
            <p className="text-[13px] text-muted -mt-2 mb-3">Optional. Warren reads this before programming notes.</p>
            <textarea
              value={onboarding.injuries}
              onChange={(e) => setOnboarding({ injuries: e.target.value })}
              placeholder="e.g. left hip pinch on deep lunges, old right shoulder"
              className="w-full min-h-[140px] rounded-[10px] border border-line bg-surface text-ink text-[15px] p-3.5 outline-none focus:border-primary placeholder:text-muted/70"
            />
          </Question>
        )}
        {step === 3 && (
          <Question title="Days per week you can train?">
            <div className="grid grid-cols-5 gap-2">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setOnboarding({ days: d })}
                  className={`min-h-[64px] rounded-[12px] border text-[20px] font-semibold ${
                    onboarding.days === d
                      ? "border-accent bg-accent/15 text-ink"
                      : "border-line bg-surface text-ink"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-muted">We’ll keep rest days honest. Quality over volume.</p>
          </Question>
        )}
        {step === 4 && (
          <div>
            <h1 className="text-[24px] font-bold text-ink leading-tight mb-4">Here’s what we’ve got</h1>
            <div className="rounded-[16px] bg-surface border border-line p-4 space-y-3">
              <Row label="Level" value={labelLevel(onboarding.level)} />
              <Row label="Goal" value={labelGoal(onboarding.goal)} />
              <Row label="Days / week" value={onboarding.days ? `${onboarding.days} days` : "Not set"} />
              <Row
                label="Notes"
                value={onboarding.injuries.trim() || "None — we’ll keep sessions conservative to start."}
              />
            </div>
            {(() => {
              const rec = recommendProgram(onboarding.goal, onboarding.level);
              return (
                <button
                  type="button"
                  onClick={() => go({ name: "programDetail", programId: rec.id })}
                  className="mt-4 w-full text-left rounded-[16px] border border-accent bg-accent/10 p-4"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wider text-accent">Warren’s pick for you</p>
                  <p className="mt-1 text-[17px] font-semibold text-ink">{rec.name}</p>
                  <p className="mt-1 text-[13px] text-muted">{rec.tagline}</p>
                </button>
              );
            })()}
            <p className="mt-4 text-[15px] text-muted leading-relaxed">
              Built for real court weeks, not hotel-gym filler. You can still browse the full library.
            </p>
          </div>
        )}
      </div>

      <div className="px-5 pb-3 pt-2 space-y-1">
        <Button
          variant="accent"
          fullWidth
          onClick={next}
          disabled={
            (step === 0 && !onboarding.level) ||
            (step === 1 && !onboarding.goal) ||
            (step === 3 && !onboarding.days)
          }
        >
          {step === 4 ? "See Warren’s pick" : "Continue"}
        </Button>
        {step === 2 && (
          <Button variant="ghost" fullWidth onClick={next}>
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}

function Question({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="text-[24px] font-bold text-ink leading-tight mb-5">{title}</h1>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Choice({
  title,
  body,
  selected,
  onClick,
}: {
  title: string;
  body: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-[16px] border p-4 min-h-[44px] ${
        selected ? "border-accent bg-accent/10" : "border-line bg-surface"
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className="block text-[17px] font-semibold text-ink">{title}</span>
          <span className="block mt-1 text-[13px] text-muted leading-snug">{body}</span>
        </span>
        {selected && <Check size={20} className="text-accent shrink-0" />}
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[13px] text-muted">{label}</span>
      <span className="text-[15px] font-medium text-ink text-right">{value}</span>
    </div>
  );
}

function labelLevel(l: FitnessLevel | null) {
  if (l === "beginner") return "Beginner";
  if (l === "advanced") return "Advanced";
  return "Intermediate";
}
function labelGoal(g: Goal | null) {
  if (g === "fitness") return "General fitness";
  if (g === "padel") return "Padel conditioning";
  return "Both";
}
