import { Check } from "lucide-react";
import { PROGRAMS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";

export function PurchaseConfirmScreen() {
  const { screen, go } = useApp();
  const id = screen.name === "purchaseConfirm" ? screen.programId : PROGRAMS[0].id;
  const program = PROGRAMS.find((p) => p.id === id) ?? PROGRAMS[0];

  return (
    <div className="flex flex-col h-full px-5 items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-[#0F172A] animate-[splash-in_0.4s_ease]">
        <Check size={36} strokeWidth={2.5} />
      </div>
      <h1 className="mt-6 text-[24px] font-bold text-ink">You’re in</h1>
      <p className="mt-2 text-[15px] text-muted leading-relaxed max-w-[300px]">
        {program.name} is unlocked. Day 1 is waiting — Warren will see your progress from here.
      </p>
      <Button variant="accent" fullWidth className="mt-8" onClick={() => go({ name: "workoutDetail", workoutId: "w-today" })}>
        Start Program
      </Button>
      <Button variant="ghost" fullWidth className="mt-1" onClick={() => go({ name: "home" })}>
        Go to Home
      </Button>
    </div>
  );
}
