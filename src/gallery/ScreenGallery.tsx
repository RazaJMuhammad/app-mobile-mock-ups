import type { ReactNode } from "react";
import { Camera, Dumbbell, MessageCircle } from "lucide-react";
import { AppProvider, useApp } from "../context/AppContext";
import { PhoneShell } from "../components/PhoneShell";
import { ActiveScreen } from "../screens/ActiveScreen";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/Input";
import { ProgramCard } from "../components/ui/ProgramCard";
import { WorkoutHero } from "../components/ui/WorkoutHero";
import { DayChip } from "../components/ui/DayChip";
import { EmptyState } from "../components/ui/EmptyState";
import { ProgressThumb } from "../components/ui/ProgressThumb";
import { Badge } from "../components/ui/Badge";
import { IMAGES, PROGRAMS, WORKOUTS } from "../data/mock";
import type { DemoPreset, Screen } from "../data/types";

type Item = {
  spec: string;
  title: string;
  screen: Screen;
  preset?: DemoPreset;
  purchasedIds?: string[];
  device?: "ios" | "android";
};

const ITEMS: Item[] = [
  { spec: "4.1", title: "Splash Screen", screen: { name: "splash" }, preset: "firstLaunch" },
  { spec: "4.2", title: "Login / Sign Up", screen: { name: "auth" }, preset: "firstLaunch" },
  { spec: "4.3", title: "Onboarding — fitness level", screen: { name: "onboarding", step: 0 }, preset: "firstLaunch" },
  { spec: "4.3", title: "Onboarding — goal", screen: { name: "onboarding", step: 1 }, preset: "firstLaunch" },
  { spec: "4.3", title: "Onboarding — injuries", screen: { name: "onboarding", step: 2 }, preset: "firstLaunch" },
  { spec: "4.3", title: "Onboarding — days / week", screen: { name: "onboarding", step: 3 }, preset: "firstLaunch" },
  { spec: "4.3", title: "Onboarding — summary", screen: { name: "onboarding", step: 4 }, preset: "firstLaunch" },
  { spec: "4.4", title: "Home — populated", screen: { name: "home" }, preset: "activeClient" },
  { spec: "4.4", title: "Home — empty (no program)", screen: { name: "home" }, preset: "returningEmpty" },
  { spec: "4.5", title: "Program Library", screen: { name: "library" }, preset: "returningEmpty" },
  { spec: "4.6", title: "Program Detail", screen: { name: "programDetail", programId: "padel-6w" }, preset: "returningEmpty" },
  { spec: "4.6", title: "Program Detail — no reviews", screen: { name: "programDetail", programId: "court-speed", reviews: "empty" }, preset: "returningEmpty" },
  { spec: "4.7", title: "Checkout / IAP sheet", screen: { name: "checkout", programId: "padel-6w", sheetOpen: true }, preset: "returningEmpty" },
  { spec: "4.7", title: "Purchase confirmation", screen: { name: "purchaseConfirm", programId: "padel-6w" }, preset: "activeClient" },
  { spec: "4.8", title: "Workout Detail", screen: { name: "workoutDetail", workoutId: "w-today" }, preset: "activeClient" },
  { spec: "4.9", title: "Active Workout", screen: { name: "activeWorkout", workoutId: "w-today" }, preset: "activeClient" },
  { spec: "4.9", title: "Workout complete + RPE", screen: { name: "workoutComplete", workoutId: "w-today" }, preset: "activeClient" },
  { spec: "4.10", title: "Progress — photos", screen: { name: "progress", segment: "photos" }, preset: "activeClient" },
  { spec: "4.10", title: "Progress — no photos", screen: { name: "progress", segment: "photos", emptyPhotos: true }, preset: "activeClient" },
  { spec: "4.10", title: "Progress — measurements", screen: { name: "progress", segment: "measurements" }, preset: "activeClient" },
  { spec: "4.10", title: "Upload progress photo", screen: { name: "photoUpload" }, preset: "activeClient" },
  { spec: "4.10", title: "Before / after slider", screen: { name: "photoCompare", aId: "p1", bId: "p4" }, preset: "activeClient" },
  { spec: "4.11", title: "Calendar — month", screen: { name: "calendar", view: "month" }, preset: "activeClient" },
  { spec: "4.11", title: "Calendar — week", screen: { name: "calendar", view: "week" }, preset: "activeClient" },
  { spec: "4.12", title: "Messages", screen: { name: "messages" }, preset: "activeClient" },
  { spec: "4.12", title: "Messages — empty", screen: { name: "messages", empty: true }, preset: "returningEmpty" },
  { spec: "4.13", title: "Profile", screen: { name: "profile" }, preset: "activeClient" },
  { spec: "4.13", title: "Subscription & Billing", screen: { name: "subscription" }, preset: "activeClient" },
  { spec: "4.13", title: "Notification Preferences", screen: { name: "notifications" }, preset: "activeClient" },
  { spec: "Android", title: "Home + Material nav", screen: { name: "home" }, preset: "activeClient", device: "android" },
];

export function ScreenGallery() {
  const app = useApp();

  const open = (item: Item) => {
    const preset = item.preset ?? "activeClient";
    app.applyPreset(preset);
    if (item.purchasedIds) app.setPurchasedIds(item.purchasedIds);
    if (item.device) app.setDevice(item.device);
    else app.setDevice("ios");
    app.go(item.screen);
    app.setView("client");
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 pb-16">
      <h1 className="text-white text-2xl font-bold pt-2">Screen gallery</h1>
      <p className="text-slate-400 text-sm mt-1 mb-8">
        Tap a frame to open it in the client viewer. Theme toggle in the header applies to every screen.
      </p>

      <ComponentLibrarySheet />

      <h2 className="text-white text-lg font-semibold mt-12 mb-4">Screens</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-8">
        {ITEMS.map((item) => (
          <button key={item.spec + item.title} type="button" onClick={() => open(item)} className="text-left group">
            <div className="h-[360px] overflow-hidden rounded-[22px] ring-1 ring-white/10 bg-black/40 group-hover:ring-lime-400/50">
              <div className="origin-top-left pointer-events-none" style={{ transform: "scale(0.42)", width: 390 }}>
                <AppProvider
                  key={`${app.theme}-${item.device ?? "ios"}-${item.title}`}
                  freeze
                  initial={{
                    theme: app.theme,
                    preset: item.preset ?? "activeClient",
                    screen: item.screen,
                    device: item.device ?? "ios",
                    purchasedIds: item.preset === "returningEmpty" || item.preset === "firstLaunch" ? [] : ["padel-6w"],
                  }}
                >
                  <ThemedMini>
                    <PhoneShell deviceOverride={item.device ?? "ios"}>
                      <ActiveScreen />
                    </PhoneShell>
                  </ThemedMini>
                </AppProvider>
              </div>
            </div>
            <p className="mt-2 text-[11px] font-medium text-lime-400">{item.spec}</p>
            <p className="text-[13px] text-white font-medium leading-snug">{item.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemedMini({ children }: { children: ReactNode }) {
  const { theme } = useApp();
  return <div data-theme={theme}>{children}</div>;
}

function ComponentLibrarySheet() {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <h2 className="text-white text-lg font-semibold mb-1">5. Component library</h2>
      <p className="text-slate-400 text-sm mb-6">Shared pieces — not one-offs. Dark surface preview.</p>
      <div data-theme="dark" className="rounded-[16px] bg-[#0F172A] text-[#F8FAFC] p-6 space-y-8">
        <div>
          <p className="text-[11px] font-medium text-slate-400 mb-2">Buttons</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Start / Buy</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
        <div className="max-w-sm space-y-3">
          <p className="text-[11px] font-medium text-slate-400">Text input</p>
          <TextInput label="Email" defaultValue="alex.naidoo@email.com" />
          <TextInput label="Password" defaultValue="" error="Required" placeholder="••••••••" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-400 mb-2">Badges + day chips</p>
          <div className="flex gap-2 mb-3">
            <Badge tone="accent">Continue</Badge>
            <Badge tone="primary">6 weeks</Badge>
            <Badge>Intermediate</Badge>
          </div>
          <div className="flex gap-2">
            <DayChip label="M" date="31" status="today" />
            <DayChip label="T" date="1" status="rest" />
            <DayChip label="W" date="2" status="scheduled" />
            <DayChip label="F" date="22" status="missed" />
            <DayChip label="S" date="23" status="completed" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
          <ProgramCard program={PROGRAMS[0]} />
          <WorkoutHero title={WORKOUTS[0].name} meta="Today · 42 min" cover={WORKOUTS[0].cover} onStart={() => undefined} />
        </div>
        <div className="grid grid-cols-3 gap-3 max-w-md">
          <ProgressThumb url={IMAGES.photo1} date="2026-07-12" pose="front" />
          <ProgressThumb url={IMAGES.photo4} date="2026-08-23" pose="front" selected />
        </div>
        <EmptyState
          icon={<Dumbbell size={28} />}
          title="Empty state"
          message="Short message plus a strong CTA — used on Home, Progress, and Messages."
          cta="Browse Library"
          onCta={() => undefined}
        />
        <div className="flex gap-6 text-slate-400 text-sm">
          <span className="flex items-center gap-2">
            <Camera size={16} /> Photos empty
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle size={16} /> Messages empty
          </span>
        </div>
      </div>
    </section>
  );
}
