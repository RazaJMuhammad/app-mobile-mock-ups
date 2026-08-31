import { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { PhoneShell } from "./components/PhoneShell";
import { ActiveScreen } from "./screens/ActiveScreen";
import { ScreenGallery } from "./gallery/ScreenGallery";
import { AdminApp } from "./admin/AdminApp";
import { SCREEN_LABELS, ViewerChrome } from "./ViewerChrome";

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}

function Root() {
  const { theme, view, screen } = useApp();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (view === "admin") return <AdminApp />;

  return (
    <div className="min-h-screen">
      <ViewerChrome screenLabel={view === "gallery" ? "Section 5 + all screens" : SCREEN_LABELS[screen.name] ?? screen.name} />
      {view === "gallery" ? (
        <ScreenGallery />
      ) : (
        <div className="flex flex-col items-center py-8 px-4">
          <PhoneShell>
            <ActiveScreen />
          </PhoneShell>
          <p className="mt-6 text-slate-500 text-sm max-w-[390px] text-center">
            Click through like a client. Use First launch → Sign up → onboarding → buy a program to show Warren the purchase path.
          </p>
        </div>
      )}
    </div>
  );
}
