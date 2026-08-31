import { useState } from "react";
import { X } from "lucide-react";
import { PHOTOS } from "../data/mock";
import { useApp } from "../context/AppContext";

export function PhotoCompareScreen() {
  const { screen, go } = useApp();
  const aId = screen.name === "photoCompare" ? screen.aId : PHOTOS[0].id;
  const bId = screen.name === "photoCompare" ? screen.bId : PHOTOS[PHOTOS.length - 1].id;
  const a = PHOTOS.find((p) => p.id === aId) ?? PHOTOS[0];
  const b = PHOTOS.find((p) => p.id === bId) ?? PHOTOS[PHOTOS.length - 1];
  const [split, setSplit] = useState(50);

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <header className="px-3 pt-1 flex items-center justify-between text-white">
        <button type="button" className="min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => go({ name: "progress" })} aria-label="Close">
          <X size={22} />
        </button>
        <p className="text-[13px] font-medium">
          {fmt(a.date)} → {fmt(b.date)}
        </p>
        <span className="w-11" />
      </header>
      <div className="flex-1 relative mx-5 mb-8 rounded-[12px] overflow-hidden">
        <img src={b.url} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${split}%` }}>
          <img src={a.url} alt="Before" className="absolute inset-0 h-full object-cover" style={{ width: `${10000 / split}%`, maxWidth: "none" }} />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${split}%` }}>
          <div className="w-0.5 h-full bg-accent" />
        </div>
        <input
          type="range"
          min={5}
          max={95}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize"
          aria-label="Before after slider"
        />
      </div>
    </div>
  );
}

function fmt(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}
