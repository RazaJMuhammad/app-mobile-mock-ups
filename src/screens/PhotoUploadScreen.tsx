import { useState } from "react";
import { Camera, Image as ImageIcon, X } from "lucide-react";
import { IMAGES } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";

const POSES = ["front", "side", "back"] as const;

export function PhotoUploadScreen() {
  const { go } = useApp();
  const [pose, setPose] = useState<(typeof POSES)[number]>("front");
  const [note, setNote] = useState("");
  const [picked, setPicked] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <header className="px-3 pt-1 flex items-center justify-between">
        <button type="button" className="min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => go({ name: "progress" })} aria-label="Close">
          <X size={22} />
        </button>
        <h1 className="text-[17px] font-semibold">Upload photo</h1>
        <span className="w-11" />
      </header>

      <div className="px-5 flex-1 overflow-y-auto pb-4">
        <div className="relative aspect-[3/4] rounded-[12px] overflow-hidden bg-surface border border-line">
          {picked ? (
            <>
              <img src={IMAGES.photo4} alt="" className="w-full h-full object-cover" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 130">
                <ellipse cx="50" cy="28" rx="10" ry="12" fill="none" stroke="#A3E635" strokeWidth="0.8" opacity="0.8" />
                <path d="M50 42 L50 78 M36 54 L64 54 M50 78 L38 110 M50 78 L62 110" fill="none" stroke="#A3E635" strokeWidth="0.8" opacity="0.8" />
              </svg>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-muted">
              <Camera size={36} />
              <p className="text-[15px]">Camera or gallery</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => setPicked(true)}>
            <Camera size={16} /> Camera
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => setPicked(true)}>
            <ImageIcon size={16} /> Gallery
          </Button>
        </div>

        <p className="mt-5 text-[13px] font-medium text-muted">Guided pose</p>
        <div className="flex gap-2 mt-2">
          {POSES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPose(p)}
              className={`flex-1 min-h-[44px] rounded-[12px] border capitalize text-[15px] font-semibold ${
                pose === p ? "border-accent bg-accent/15 text-ink" : "border-line bg-surface text-muted"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <label className="block mt-4">
          <span className="text-[13px] font-medium text-muted">Caption / note</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Morning, fasted. Left hip felt fine."
            className="mt-1.5 w-full min-h-[88px] rounded-[10px] border border-line bg-surface text-[15px] text-ink p-3 outline-none"
          />
        </label>
      </div>

      <div className="px-5 pb-4">
        <Button variant="accent" fullWidth disabled={!picked} onClick={() => go({ name: "progress" })}>
          Submit to Warren
        </Button>
      </div>
    </div>
  );
}
