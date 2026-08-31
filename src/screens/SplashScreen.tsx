import { useEffect } from "react";
import { BrandMark } from "../components/BrandMark";
import { useApp } from "../context/AppContext";

export function SplashScreen({ auto = true }: { auto?: boolean }) {
  const { go, preset, frozen } = useApp();

  useEffect(() => {
    if (!auto || frozen) return;
    const t = setTimeout(() => {
      if (preset === "firstLaunch") go({ name: "auth" });
      else go({ name: "home" });
    }, 1500);
    return () => clearTimeout(t);
  }, [auto, go, preset]);

  return (
    <button
      type="button"
      className="w-full h-full min-h-full flex flex-col items-center justify-center bg-app animate-[splash-in_0.5s_ease]"
      onClick={() => (preset === "firstLaunch" ? go({ name: "auth" }) : go({ name: "home" }))}
    >
      <BrandMark size="lg" />
      <p className="mt-10 text-[13px] text-muted">Tap to continue</p>
    </button>
  );
}
