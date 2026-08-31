import { useApp } from "./context/AppContext";
import type { DemoPreset } from "./data/types";

const PRESETS: { id: DemoPreset; label: string }[] = [
  { id: "firstLaunch", label: "First launch" },
  { id: "returningEmpty", label: "Logged in, no program" },
  { id: "activeClient", label: "Active client" },
];

export function ViewerChrome({ screenLabel }: { screenLabel: string }) {
  const { theme, setTheme, device, setDevice, view, setView, preset, applyPreset } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/90 backdrop-blur">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center gap-3 text-sm">
        <span className="font-semibold text-white shrink-0">Warren Kuhn</span>
        <span className="hidden md:inline text-slate-500 truncate">{screenLabel}</span>
        <nav className="ml-auto flex items-center gap-1">
          {(["client", "gallery", "admin"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-3 h-9 rounded-lg capitalize ${
                view === v ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </nav>
        {view !== "admin" && (
          <>
            <select
              value={preset}
              onChange={(e) => applyPreset(e.target.value as DemoPreset)}
              className="h-9 rounded-lg bg-slate-800 text-slate-100 px-2 border border-slate-700"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setDevice(device === "ios" ? "android" : "ios")}
              className="h-9 px-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700"
            >
              {device === "ios" ? "iOS" : "Android"}
            </button>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 px-3 rounded-lg bg-slate-800 text-slate-100 border border-slate-700"
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export const SCREEN_LABELS: Record<string, string> = {
  splash: "4.1 Splash Screen",
  auth: "4.2 Login / Sign Up",
  onboarding: "4.3 Onboarding",
  home: "4.4 Home Dashboard",
  library: "4.5 Program Library",
  programDetail: "4.6 Program Detail",
  checkout: "4.7 Checkout / Purchase",
  purchaseConfirm: "4.7 Purchase confirmation",
  workoutDetail: "4.8 Workout Detail",
  activeWorkout: "4.9 Active Workout",
  workoutComplete: "4.9 Workout complete",
  progress: "4.10 Progress",
  photoUpload: "4.10 Upload Progress Photo",
  photoCompare: "4.10 Before / after",
  calendar: "4.11 Calendar",
  messages: "4.12 Messages",
  profile: "4.13 Profile / Settings",
  editProfile: "4.13 Edit Profile",
  subscription: "4.13 Subscription & Billing",
  notifications: "4.13 Notification Preferences",
  help: "4.13 Help & Support",
};
