import { BookOpen, Home, TrendingUp, User } from "lucide-react";
import type { TabId } from "../../data/types";

const TABS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "profile", label: "Profile", icon: User },
];

type Props = {
  active: TabId;
  onChange: (t: TabId) => void;
  variant?: "ios" | "android";
};

export function TabBar({ active, onChange, variant = "ios" }: Props) {
  if (variant === "android") {
    return (
      <nav className="h-20 bg-surface border-t border-line flex items-stretch px-2 pb-2">
        {TABS.map((t) => {
          const on = t.id === active;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[48px]"
            >
              <span
                className={`flex items-center justify-center h-8 w-16 rounded-full ${
                  on ? "bg-primary/20 text-primary" : "text-muted"
                }`}
              >
                <Icon size={22} strokeWidth={on ? 2.4 : 2} fill={on ? "currentColor" : "none"} />
              </span>
              <span className={`text-[12px] font-medium ${on ? "text-ink" : "text-muted"}`}>{t.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="h-[49px] bg-surface/95 border-t border-line flex items-stretch backdrop-blur">
      {TABS.map((t) => {
        const on = t.id === active;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[44px]"
          >
            <Icon
              size={22}
              strokeWidth={2}
              className={on ? "text-accent" : "text-muted"}
              fill={on ? "currentColor" : "none"}
            />
            <span className={`text-[10px] font-medium ${on ? "text-accent" : "text-muted"}`}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
