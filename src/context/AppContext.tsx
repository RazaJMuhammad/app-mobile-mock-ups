import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AppView,
  DemoPreset,
  Device,
  FitnessLevel,
  Goal,
  Screen,
  TabId,
  Theme,
} from "../data/types";

const MODAL_SCREENS = new Set<Screen["name"]>([
  "splash",
  "auth",
  "onboarding",
  "checkout",
  "purchaseConfirm",
  "activeWorkout",
  "workoutComplete",
  "photoUpload",
  "photoCompare",
]);

const TAB_SCREENS = new Set<Screen["name"]>(["home", "library", "progress", "profile"]);

export type OnboardingState = {
  level: FitnessLevel | null;
  goal: Goal | null;
  injuries: string;
  days: number | null;
};

export type AppState = {
  theme: Theme;
  device: Device;
  view: AppView;
  preset: DemoPreset;
  screen: Screen;
  tab: TabId;
  purchasedIds: string[];
  searchOpen: boolean;
  onboarding: OnboardingState;
  units: { weight: "kg" | "lbs"; length: "cm" | "in" };
  notifications: { workouts: boolean; messages: boolean; announcements: boolean };
  downloadedIds: string[];
  sessionLog: { workoutId: string; feel: string; note: string } | null;
};

type AppContextValue = AppState & {
  frozen: boolean;
  setTheme: (t: Theme) => void;
  setDevice: (d: Device) => void;
  setView: (v: AppView) => void;
  applyPreset: (p: DemoPreset) => void;
  go: (s: Screen) => void;
  setTab: (t: TabId) => void;
  purchase: (programId: string) => void;
  setPurchasedIds: (ids: string[]) => void;
  setSearchOpen: (v: boolean) => void;
  setOnboarding: (p: Partial<OnboardingState>) => void;
  setUnits: (u: AppState["units"]) => void;
  setNotifications: (n: AppState["notifications"]) => void;
  toggleDownload: (id: string) => void;
  setSessionLog: (l: AppState["sessionLog"]) => void;
  showTabBar: boolean;
  hasProgram: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

function presetState(p: DemoPreset): Pick<AppState, "screen" | "tab" | "purchasedIds" | "onboarding"> {
  if (p === "firstLaunch") {
    return {
      screen: { name: "splash" },
      tab: "home",
      purchasedIds: [],
      onboarding: { level: null, goal: null, injuries: "", days: null },
    };
  }
  if (p === "returningEmpty") {
    return {
      screen: { name: "home" },
      tab: "home",
      purchasedIds: [],
      onboarding: { level: "intermediate", goal: "both", injuries: "", days: 4 },
    };
  }
  return {
    screen: { name: "home" },
    tab: "home",
    purchasedIds: ["padel-6w"],
    onboarding: { level: "intermediate", goal: "both", injuries: "Old left hip pinch on deep laterals", days: 4 },
  };
}

export function AppProvider({
  children,
  freeze,
  initial,
}: {
  children: ReactNode;
  freeze?: boolean;
  initial?: Partial<AppState> & { screen?: Screen };
}) {
  const start = presetState(initial?.preset ?? "activeClient");
  const [theme, setTheme] = useState<Theme>(initial?.theme ?? "dark");
  const [device, setDevice] = useState<Device>(initial?.device ?? "ios");
  const [view, setView] = useState<AppView>(initial?.view ?? "client");
  const [preset, setPreset] = useState<DemoPreset>(initial?.preset ?? "activeClient");
  const [screen, setScreen] = useState<Screen>(initial?.screen ?? start.screen);
  const [tab, setTabState] = useState<TabId>(initial?.tab ?? start.tab);
  const [purchasedIds, setPurchasedIds] = useState<string[]>(initial?.purchasedIds ?? start.purchasedIds);
  const [searchOpen, setSearchOpen] = useState(false);
  const [onboarding, setOnboardingState] = useState<OnboardingState>(initial?.onboarding ?? start.onboarding);
  const [units, setUnits] = useState<AppState["units"]>(initial?.units ?? { weight: "kg", length: "cm" });
  const [notifications, setNotifications] = useState<AppState["notifications"]>(
    initial?.notifications ?? { workouts: true, messages: true, announcements: true },
  );
  const [downloadedIds, setDownloadedIds] = useState<string[]>(
    initial?.downloadedIds ?? (start.purchasedIds.includes("padel-6w") ? ["padel-6w"] : []),
  );
  const [sessionLog, setSessionLog] = useState<AppState["sessionLog"]>(initial?.sessionLog ?? null);

  const go = useCallback(
    (s: Screen) => {
      if (freeze) return;
      setScreen(s);
      if (TAB_SCREENS.has(s.name)) setTabState(s.name as TabId);
    },
    [freeze],
  );

  const setTab = useCallback(
    (t: TabId) => {
      if (freeze) return;
      setTabState(t);
      setScreen({ name: t } as Screen);
      setSearchOpen(false);
    },
    [freeze],
  );

  const applyPreset = useCallback((p: DemoPreset) => {
    const next = presetState(p);
    setPreset(p);
    setScreen(next.screen);
    setTabState(next.tab);
    setPurchasedIds(next.purchasedIds);
    setOnboardingState(next.onboarding);
    setDownloadedIds(next.purchasedIds.includes("padel-6w") ? ["padel-6w"] : []);
    setSessionLog(null);
    setSearchOpen(false);
    setView("client");
  }, []);

  const purchase = useCallback((programId: string) => {
    setPurchasedIds((ids) => (ids.includes(programId) ? ids : [...ids, programId]));
  }, []);

  const setOnboarding = useCallback((p: Partial<OnboardingState>) => {
    setOnboardingState((o) => ({ ...o, ...p }));
  }, []);

  const toggleDownload = useCallback((id: string) => {
    setDownloadedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }, []);

  const showTabBar = TAB_SCREENS.has(screen.name) && !MODAL_SCREENS.has(screen.name);
  const hasProgram = purchasedIds.length > 0;

  const value = useMemo<AppContextValue>(
    () => ({
      frozen: !!freeze,
      theme,
      device,
      view,
      preset,
      screen,
      tab,
      purchasedIds,
      searchOpen,
      onboarding,
      units,
      notifications,
      downloadedIds,
      sessionLog,
      setTheme,
      setDevice,
      setView,
      applyPreset,
      go,
      setTab,
      purchase,
      setPurchasedIds,
      setSearchOpen,
      setOnboarding,
      setUnits,
      setNotifications,
      toggleDownload,
      setSessionLog,
      showTabBar,
      hasProgram,
    }),
    [
      theme,
      device,
      view,
      preset,
      screen,
      tab,
      purchasedIds,
      searchOpen,
      onboarding,
      units,
      notifications,
      downloadedIds,
      sessionLog,
      applyPreset,
      go,
      setTab,
      purchase,
      freeze,
      setOnboarding,
      toggleDownload,
      showTabBar,
      hasProgram,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp outside provider");
  return ctx;
}
