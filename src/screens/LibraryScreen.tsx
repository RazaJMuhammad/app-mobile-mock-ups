import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { PROGRAMS, recommendProgram } from "../data/mock";
import { useApp } from "../context/AppContext";
import { ProgramCard } from "../components/ui/ProgramCard";
import type { Difficulty } from "../data/types";

const FILTERS = ["All", "Fitness", "Padel Conditioning", "Beginner", "Intermediate", "Advanced"] as const;

export function LibraryScreen() {
  const { go, purchasedIds, searchOpen, setSearchOpen, onboarding, downloadedIds } = useApp();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [q, setQ] = useState("");
  const pick = recommendProgram(onboarding.goal, onboarding.level);

  const list = useMemo(() => {
    return PROGRAMS.filter((p) => {
      if (filter === "Fitness" || filter === "Padel Conditioning") {
        if (p.category !== filter) return false;
      }
      if (filter === "Beginner" || filter === "Intermediate" || filter === "Advanced") {
        if (p.difficulty !== (filter as Difficulty)) return false;
      }
      if (q.trim()) {
        const s = `${p.name} ${p.tagline}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    }).sort((a, b) => (a.id === pick.id ? -1 : b.id === pick.id ? 1 : 0));
  }, [filter, q, pick.id]);

  return (
    <div className="relative h-full flex flex-col">
      <header className="px-5 pt-1 pb-3 flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-ink">Library</h1>
        <button
          type="button"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
        >
          <Search size={22} />
        </button>
      </header>

      <div className="px-5 flex gap-2 overflow-x-auto no-scrollbar pb-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`shrink-0 min-h-[36px] px-3 rounded-full text-[13px] font-medium border ${
              filter === f ? "bg-accent text-[#0F172A] border-accent" : "border-line text-muted bg-surface"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {list.map((p) => (
          <ProgramCard
            key={p.id}
            program={p}
            purchased={purchasedIds.includes(p.id)}
            recommended={p.id === pick.id && !purchasedIds.includes(p.id)}
            downloaded={downloadedIds.includes(p.id)}
            onClick={() => go({ name: "programDetail", programId: p.id })}
          />
        ))}
        {list.length === 0 && (
          <p className="text-center text-[15px] text-muted py-10">No programs match that filter.</p>
        )}
      </div>

      {searchOpen && (
        <div className="absolute inset-0 z-20 bg-app flex flex-col animate-[fade-in_0.15s_ease]">
          <div className="px-4 pt-2 flex items-center gap-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search programs"
              className="flex-1 min-h-[44px] px-3 rounded-[10px] bg-surface border border-line text-[15px] text-ink outline-none"
            />
            <button
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted"
              onClick={() => {
                setSearchOpen(false);
                setQ("");
              }}
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {PROGRAMS.filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(q.toLowerCase())).map((p) => (
              <ProgramCard
                key={p.id}
                program={p}
                purchased={purchasedIds.includes(p.id)}
                recommended={p.id === pick.id && !purchasedIds.includes(p.id)}
                downloaded={downloadedIds.includes(p.id)}
                onClick={() => {
                  setSearchOpen(false);
                  go({ name: "programDetail", programId: p.id });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
