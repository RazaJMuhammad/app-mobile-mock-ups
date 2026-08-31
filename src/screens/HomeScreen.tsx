import { useState } from "react";
import { Dumbbell, MessageCircle, Pause, Play } from "lucide-react";
import {
  ANNOUNCEMENT,
  COACH,
  greeting,
  IMAGES,
  LEAGUE,
  UPCOMING,
  USER,
  WEEK_STRIP,
  WEEKLY_FOCUS,
  WORKOUTS,
} from "../data/mock";
import { useApp } from "../context/AppContext";
import { DayChip } from "../components/ui/DayChip";
import { WorkoutHero } from "../components/ui/WorkoutHero";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";

export function HomeScreen() {
  const { go, hasProgram, sessionLog, onboarding } = useApp();
  const workout = WORKOUTS[0];
  const [playing, setPlaying] = useState(false);
  const rec = onboarding.goal === "fitness" ? "Foundations Strength Block" : "6-Week Padel Conditioning";

  return (
    <div className="px-5 pb-6">
      <header className="flex items-center justify-between pt-1 pb-4">
        <div>
          <p className="text-[13px] text-muted">{greeting()},</p>
          <h1 className="text-[24px] font-bold text-ink">{USER.firstName}</h1>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => go({ name: "messages" })}
            className="relative min-h-[44px] min-w-[44px] flex items-center justify-center text-ink"
            aria-label="Messages"
          >
            <MessageCircle size={22} />
            {ANNOUNCEMENT.unread && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-accent" />
            )}
          </button>
          <button
            type="button"
            onClick={() => go({ name: "profile" })}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Profile"
          >
            <img src={USER.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
          </button>
        </div>
      </header>

      {hasProgram ? (
        <>
          <WorkoutHero
            title={workout.name}
            meta={`Today · Day ${workout.dayNumber} · ${workout.durationMin} min`}
            cover={workout.cover}
            onClick={() => go({ name: "workoutDetail", workoutId: workout.id })}
            onStart={() => go({ name: "workoutDetail", workoutId: workout.id })}
          />

          {sessionLog && (
            <p className="mt-3 text-[13px] text-muted">
              Last session logged as <span className="text-ink font-medium">{feelLabel(sessionLog.feel)}</span>
              {sessionLog.note ? " — Warren will see your note." : "."}
            </p>
          )}

          <section className="mt-6">
            <h2 className="text-[20px] font-semibold text-ink mb-3">This week</h2>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {WEEK_STRIP.map((d) => (
                <DayChip
                  key={d.label + d.date}
                  label={d.label}
                  date={d.date}
                  status={d.status}
                  onClick={() => {
                    if (d.workoutId) go({ name: "workoutDetail", workoutId: d.workoutId });
                    else go({ name: "calendar" });
                  }}
                />
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {UPCOMING.map((u) => (
                <button
                  key={u.day + u.name}
                  type="button"
                  onClick={() => go({ name: "workoutDetail", workoutId: u.workoutId })}
                  className="w-full flex items-center justify-between min-h-[44px] rounded-[12px] border border-line bg-surface px-3 text-left"
                >
                  <span>
                    <span className="text-[13px] font-semibold text-accent">{u.day}</span>
                    <span className="text-[15px] text-ink ml-2">{u.name}</span>
                  </span>
                  <span className="text-[13px] text-muted">{u.duration}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[16px] border border-line bg-surface p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-accent">Week {WEEKLY_FOCUS.week} focus</p>
            <h3 className="mt-1 text-[17px] font-semibold text-ink">{WEEKLY_FOCUS.title}</h3>
            <p className="mt-1 text-[13px] text-muted leading-relaxed">{WEEKLY_FOCUS.body}</p>
          </section>

          <button
            type="button"
            onClick={() => go({ name: "messages" })}
            className="mt-4 w-full text-left rounded-[16px] bg-surface border border-line p-4 min-h-[44px]"
          >
            <p className="text-[11px] font-medium text-warning">{LEAGUE.day} · {LEAGUE.venue}</p>
            <p className="mt-1 text-[15px] text-ink leading-snug">{LEAGUE.note}</p>
          </button>

          <section className="mt-4">
            <button
              type="button"
              onClick={() => go({ name: "messages" })}
              className="w-full text-left rounded-[16px] bg-surface border border-line p-4 min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <img src={COACH.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-semibold text-ink">{ANNOUNCEMENT.title}</h3>
                    {ANNOUNCEMENT.unread && (
                      <span className="text-[11px] font-medium text-accent">Unread</span>
                    )}
                  </div>
                  <p className="text-[13px] text-muted truncate">{ANNOUNCEMENT.preview}</p>
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaying((p) => !p);
                  }}
                  onKeyDown={() => undefined}
                  className="min-h-[44px] min-w-[44px] rounded-full bg-accent text-[#0F172A] flex items-center justify-center"
                  aria-label={playing ? "Pause voice note" : "Play voice note"}
                >
                  {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </span>
              </div>
              {playing && (
                <div className="mt-3 flex items-end gap-0.5 h-8 px-1">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      className="flex-1 bg-accent rounded-full origin-bottom"
                      style={{
                        height: `${30 + ((i * 17) % 70)}%`,
                        animation: `wave 0.9s ease-in-out ${i * 0.05}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          </section>
        </>
      ) : (
        <div className="rounded-[16px] overflow-hidden border border-line bg-surface">
          <div className="relative h-44">
            <img src={IMAGES.padelCourt} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-app to-transparent" />
          </div>
          <EmptyState
            icon={<Dumbbell size={32} />}
            title="No program yet"
            message={`Warren’s pick for you: ${rec}. Built for padel weeks, not hotel-gym filler.`}
            cta="Browse Library"
            onCta={() => go({ name: "library" })}
          />
        </div>
      )}

      {hasProgram && (
        <Button variant="secondary" fullWidth className="mt-6" onClick={() => go({ name: "calendar" })}>
          Open calendar
        </Button>
      )}
    </div>
  );
}

function feelLabel(id: string) {
  if (id === "easy") return "Easy";
  if (id === "tough") return "Tough";
  return "Just right";
}
