import { useState } from "react";
import { Download, ChevronDown, ChevronLeft, Star } from "lucide-react";
import { COACH, formatZar, PROGRAMS, recommendProgram } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";

export function ProgramDetailScreen() {
  const { screen, go, purchasedIds, onboarding, downloadedIds, toggleDownload } = useApp();
  const id = screen.name === "programDetail" ? screen.programId : PROGRAMS[0].id;
  const reviewsMode = screen.name === "programDetail" ? screen.reviews : undefined;
  const program = PROGRAMS.find((p) => p.id === id) ?? PROGRAMS[0];
  const owned = purchasedIds.includes(program.id);
  const rec = recommendProgram(onboarding.goal, onboarding.level);
  const isRec = rec.id === program.id && !owned;
  const [openWeek, setOpenWeek] = useState(1);
  const reviews = reviewsMode === "empty" ? [] : program.reviews;

  return (
    <div className="flex flex-col h-full">
      <div className="relative h-52 shrink-0">
        <img src={program.cover} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-app via-transparent to-black/30" />
        <button
          type="button"
          onClick={() => go({ name: "library" })}
          className="absolute top-3 left-3 min-h-[44px] min-w-[44px] rounded-full bg-app/70 flex items-center justify-center text-ink"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <h1 className="text-[24px] font-bold text-ink leading-tight -mt-2">{program.name}</h1>
        {isRec && (
          <p className="mt-2 text-[13px] font-semibold text-accent">Warren recommends this for your goal and level.</p>
        )}
        <button type="button" className="mt-3 flex items-center gap-2 min-h-[44px]">
          <img src={COACH.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          <span>
            <span className="block text-[15px] font-semibold text-ink">{COACH.name}</span>
            <span className="block text-[13px] text-muted">{COACH.title}, {COACH.club}</span>
          </span>
        </button>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge tone="primary">{program.durationWeeks} weeks</Badge>
          <Badge>{program.difficulty}</Badge>
          <Badge>{program.category}</Badge>
        </div>

        <p className="mt-4 text-[15px] text-ink leading-relaxed">{program.tagline}</p>
        <p className="mt-2 text-[13px] text-muted">Equipment: {program.equipment.join(" · ")}</p>
        {owned && (
          <button
            type="button"
            onClick={() => toggleDownload(program.id)}
            className="mt-4 min-h-[44px] w-full rounded-[12px] border border-line bg-surface flex items-center justify-center gap-2 text-[15px] font-semibold"
          >
            <Download size={18} />
            {downloadedIds.includes(program.id) ? "Downloaded for gym / court" : "Download for offline"}
          </button>
        )}

        <h2 className="mt-6 text-[20px] font-semibold text-ink">What’s included</h2>
        <div className="mt-3 space-y-2">
          {program.weekly.map((w) => (
            <button
              key={w.week}
              type="button"
              onClick={() => setOpenWeek(openWeek === w.week ? 0 : w.week)}
              className="w-full text-left rounded-[12px] border border-line bg-surface p-3 min-h-[44px]"
            >
              <span className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-ink">
                  Week {w.week} — {w.title}
                </span>
                <ChevronDown size={18} className={`text-muted ${openWeek === w.week ? "rotate-180" : ""}`} />
              </span>
              {openWeek === w.week && <p className="mt-2 text-[13px] text-muted">{w.detail}</p>}
            </button>
          ))}
        </div>

        <h2 className="mt-6 text-[20px] font-semibold text-ink">Reviews</h2>
        {reviews.length === 0 ? (
          <EmptyState
            icon={<Star size={28} />}
            title="No reviews yet"
            message="Be one of the first to train this block with Warren."
          />
        ) : (
          <div className="mt-3 space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-[16px] border border-line bg-surface p-4">
                <div className="flex items-center gap-2">
                  <img src={r.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold text-ink">{r.name}</p>
                    <p className="text-[11px] text-muted">{r.date}</p>
                  </div>
                  <span className="text-[13px] font-medium text-accent">{r.rating}.0</span>
                </div>
                <p className="mt-2 text-[15px] text-ink leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-line bg-app px-5 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[11px] text-muted">{owned ? "Purchased" : "One-time"}</p>
          <p className="text-[20px] font-semibold text-ink">{owned ? "In library" : formatZar(program.priceZar)}</p>
        </div>
        <Button
          variant="accent"
          onClick={() =>
            owned
              ? go({ name: "workoutDetail", workoutId: "w-today" })
              : go({ name: "checkout", programId: program.id, sheetOpen: true })
          }
        >
          {owned ? "Continue Program" : "Buy Now"}
        </Button>
      </div>
    </div>
  );
}
