import { useMemo, useState } from "react";
import { Camera, Plus } from "lucide-react";
import { COACH, MEASUREMENTS, PHOTOS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { ProgressThumb } from "../components/ui/ProgressThumb";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";
import { Sheet } from "../components/ui/Sheet";
import type { ProgressPhoto } from "../data/types";

export function ProgressScreen() {
  const { screen, go, units } = useApp();
  const emptyPhotos = screen.name === "progress" && screen.emptyPhotos;
  const initialSeg = screen.name === "progress" && screen.segment === "measurements" ? "measurements" : "photos";
  const [seg, setSeg] = useState<"photos" | "measurements">(initialSeg);
  const [selected, setSelected] = useState<string[]>([]);
  const [review, setReview] = useState<ProgressPhoto | null>(null);
  const photos = emptyPhotos ? [] : PHOTOS;

  const toggle = (p: ProgressPhoto) => {
    if (p.review && selected.length === 0) {
      setReview(p);
      return;
    }
    setSelected((s) => {
      if (s.includes(p.id)) return s.filter((x) => x !== p.id);
      if (s.length >= 2) return [s[1], p.id];
      return [...s, p.id];
    });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="px-5 pt-1 flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-ink">Progress</h1>
        <button
          type="button"
          onClick={() => go({ name: "calendar" })}
          className="text-[15px] font-semibold text-primary min-h-[44px]"
        >
          Calendar
        </button>
      </header>

      <div className="px-5 mt-2">
        <div className="flex p-1 rounded-[12px] bg-surface border border-line">
          {(["photos", "measurements"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeg(s)}
              className={`flex-1 min-h-[44px] rounded-[10px] text-[15px] font-semibold capitalize ${
                seg === s ? "bg-primary text-white" : "text-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {seg === "photos" ? (
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
          {photos.length === 0 ? (
            <EmptyState
              icon={<Camera size={32} />}
              title="No progress photos yet"
              message="Upload a front, side, or back shot. Warren reviews these on his side."
              cta="Upload Progress Photo"
              onCta={() => go({ name: "photoUpload" })}
            />
          ) : (
            <>
              <p className="text-[13px] text-muted mb-3">Tap a reviewed shot to read Warren’s note, or select two dates to compare.</p>
              <div className="grid grid-cols-2 gap-3">
                {photos.map((p) => (
                  <ProgressThumb
                    key={p.id}
                    url={p.url}
                    date={p.date}
                    pose={p.pose}
                    selected={selected.includes(p.id)}
                    reviewed={Boolean(p.review)}
                    onClick={() => toggle(p)}
                  />
                ))}
              </div>
              {selected.length === 2 && (
                <Button
                  variant="accent"
                  fullWidth
                  className="mt-4"
                  onClick={() => go({ name: "photoCompare", aId: selected[0], bId: selected[1] })}
                >
                  Compare selected
                </Button>
              )}
            </>
          )}
        </div>
      ) : (
        <Measurements units={units.weight} />
      )}

      {seg === "photos" && photos.length > 0 && (
        <button
          type="button"
          onClick={() => go({ name: "photoUpload" })}
          className="absolute right-5 bottom-6 w-14 h-14 rounded-full bg-accent text-[#0F172A] flex items-center justify-center shadow-lg"
          aria-label="Upload progress photo"
        >
          <Plus size={26} />
        </button>
      )}

      <Sheet open={Boolean(review)} onClose={() => setReview(null)} title="Warren reviewed">
        {review?.review && (
          <div className="flex gap-3">
            <img src={COACH.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-[13px] text-muted">{review.review.date}</p>
              <p className="mt-1 text-[15px] text-ink leading-relaxed">{review.review.text}</p>
              <Button variant="secondary" className="mt-4" onClick={() => go({ name: "messages" })}>
                Reply in Messages
              </Button>
              <Button
                variant="ghost"
                className="mt-1"
                onClick={() => {
                  if (review) setSelected((s) => (s.includes(review.id) ? s : [...s, review.id].slice(-2)));
                  setReview(null);
                }}
              >
                Select for compare
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}

function Measurements({ units }: { units: "kg" | "lbs" }) {
  const [showLog, setShowLog] = useState(false);
  const last = MEASUREMENTS[MEASUREMENTS.length - 1];
  const toUnit = (kg: number) => (units === "kg" ? kg : +(kg * 2.2046).toFixed(1));
  const unit = units === "kg" ? "kg" : "lb";
  const points = useMemo(() => {
    const vals = MEASUREMENTS.map((m) => toUnit(m.weightKg));
    const min = Math.min(...vals) - 1;
    const max = Math.max(...vals) + 1;
    return vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min)) * 100;
      return `${x},${y}`;
    });
  }, [units]);

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">
      <div className="rounded-[16px] border border-line bg-surface p-4">
        <p className="text-[13px] text-muted">Latest weight</p>
        <p className="text-[32px] font-bold text-ink">
          {toUnit(last.weightKg)} <span className="text-[15px] font-medium text-muted">{unit}</span>
        </p>
        <p className="text-[13px] text-success">−{toUnit(MEASUREMENTS[0].weightKg - last.weightKg).toFixed(1)} {unit} since 12 Jul</p>
        <svg viewBox="0 0 100 100" className="mt-4 w-full h-28" preserveAspectRatio="none">
          <polyline fill="none" stroke="var(--app-accent)" strokeWidth="2" points={points.join(" ")} />
        </svg>
        <p className="text-[11px] text-muted">Weight trend · 12 Jul – 30 Aug 2026</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-[20px] font-semibold">Log</h2>
        <Button variant="secondary" onClick={() => setShowLog((s) => !s)}>
          {showLog ? "Close" : "Add entry"}
        </Button>
      </div>

      {showLog && (
        <div className="mt-3 rounded-[16px] border border-line bg-surface p-4 space-y-2">
          <p className="text-[13px] text-muted">Weight ({unit}), optional waist / chest</p>
          <Button variant="accent" fullWidth onClick={() => setShowLog(false)}>
            Save entry
          </Button>
        </div>
      )}

      <ul className="mt-3 space-y-2">
        {[...MEASUREMENTS].reverse().map((m) => (
          <li key={m.date} className="flex justify-between rounded-[12px] border border-line bg-surface px-4 py-3">
            <span className="text-[13px] text-muted">
              {new Date(m.date + "T12:00:00").toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
            </span>
            <span className="text-[15px] font-semibold">
              {toUnit(m.weightKg)} {unit}
              {m.waistCm ? ` · ${m.waistCm} cm` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
