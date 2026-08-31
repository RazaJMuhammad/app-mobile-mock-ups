import { Signal, Wifi, Battery } from "lucide-react";
import { TabBar } from "./ui/TabBar";
import { useApp } from "../context/AppContext";
import type { ReactNode } from "react";

export function PhoneShell({
  children,
  deviceOverride,
  showTabBar,
}: {
  children: ReactNode;
  deviceOverride?: "ios" | "android";
  showTabBar?: boolean;
}) {
  const app = useApp();
  const device = deviceOverride ?? app.device;
  const tabs = showTabBar ?? app.showTabBar;
  const ios = device === "ios";
  const w = ios ? 390 : 360;
  const h = ios ? 844 : 800;

  return (
    <div
      className="relative overflow-hidden bg-app text-ink shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
      style={{
        width: w,
        height: h,
        borderRadius: ios ? 47 : 28,
        border: ios ? "12px solid #0b0f19" : "10px solid #1a1f2e",
      }}
    >
      {ios && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-[126px] h-[36px] bg-black rounded-[20px]" />
      )}
      <div className="flex flex-col h-full">
        <StatusBar ios={ios} />
        <div className="flex-1 min-h-0 relative phone-scroll">{children}</div>
        {tabs && (
          <TabBar
            active={app.tab}
            onChange={app.setTab}
            variant={ios ? "ios" : "android"}
          />
        )}
        {ios && (
          <div className={`h-[21px] flex items-start justify-center pt-1 ${tabs ? "bg-surface" : "bg-app"}`}>
            <div className="w-[134px] h-[5px] rounded-full bg-ink/40" />
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBar({ ios }: { ios: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-7 shrink-0 text-ink"
      style={{ height: ios ? 54 : 32, paddingTop: ios ? 14 : 0 }}
    >
      <span className="text-[15px] font-semibold tracking-tight w-16">{ios ? "9:41" : "9:41"}</span>
      {ios && <span className="flex-1" />}
      <span className="flex items-center gap-1.5">
        <Signal size={14} fill="currentColor" />
        <Wifi size={14} />
        <Battery size={16} />
      </span>
    </div>
  );
}
