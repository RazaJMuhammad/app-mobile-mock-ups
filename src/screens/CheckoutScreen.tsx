import { ChevronLeft } from "lucide-react";
import { formatZar, PROGRAMS } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";

export function CheckoutScreen() {
  const { screen, go, device, purchase } = useApp();
  const id = screen.name === "checkout" ? screen.programId : PROGRAMS[0].id;
  const sheetOpen = screen.name === "checkout" ? screen.sheetOpen !== false : true;
  const program = PROGRAMS.find((p) => p.id === id) ?? PROGRAMS[0];
  const apple = device === "ios";

  const confirm = () => {
    purchase(program.id);
    go({ name: "purchaseConfirm", programId: program.id });
  };

  return (
    <div className="flex flex-col h-full bg-app relative">
      <header className="px-3 pt-1 flex items-center gap-1">
        <button
          type="button"
          onClick={() => go({ name: "programDetail", programId: program.id })}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[24px] font-bold text-ink">Checkout</h1>
      </header>

      <div className="px-5 mt-4">
        <div className="rounded-[16px] border border-line bg-surface p-4 flex gap-3">
          <img src={program.cover} alt="" className="w-20 h-14 object-cover rounded-[12px]" />
          <div>
            <p className="text-[17px] font-semibold text-ink leading-snug">{program.name}</p>
            <p className="text-[13px] text-muted">{program.durationWeeks} weeks · {program.difficulty}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-[15px]">
          <span className="text-muted">Program</span>
          <span className="font-semibold text-ink">{formatZar(program.priceZar)}</span>
        </div>
        <div className="mt-2 flex justify-between text-[15px]">
          <span className="text-muted">Tax</span>
          <span className="text-ink">Included</span>
        </div>
        <div className="mt-4 pt-4 border-t border-line flex justify-between">
          <span className="text-[17px] font-semibold">Total</span>
          <span className="text-[17px] font-semibold">{formatZar(program.priceZar)}</span>
        </div>
        <p className="mt-6 text-[13px] text-muted leading-relaxed">
          Payment is handled by {apple ? "Apple In-App Purchase" : "Google Play Billing"}. No card details are entered in this app.
        </p>
      </div>

      <div className="mt-auto px-5 pb-4">
        <Button variant="accent" fullWidth onClick={() => go({ name: "checkout", programId: program.id, sheetOpen: true })}>
          Continue to {apple ? "App Store" : "Play Store"}
        </Button>
      </div>

      {sheetOpen && (
        <div className="absolute inset-0 z-30 flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => go({ name: "checkout", programId: program.id, sheetOpen: false })}
            aria-label="Dismiss"
          />
          <div className="relative rounded-t-[24px] bg-[#1c1c1e] text-white px-5 pt-3 pb-8 animate-[sheet-up_0.28s_ease]">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
            {apple ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[13px] font-semibold tracking-wide">App Store</span>
                </div>
                <p className="text-[13px] text-white/60">In-App Purchase</p>
                <p className="text-[20px] font-semibold mt-1">{program.name}</p>
                <p className="text-[28px] font-bold mt-2">{formatZar(program.priceZar)}</p>
                <div className="mt-5 rounded-[12px] bg-white/10 p-3 text-[13px] text-white/80">
                  Account: alex.naidoo@icloud.com
                  <br />
                  Payment: Visa •••• 4242
                </div>
                <Button variant="accent" fullWidth className="mt-5" onClick={confirm}>
                  Confirm with Face ID
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  className="mt-1 text-white/70"
                  onClick={() => go({ name: "checkout", programId: program.id, sheetOpen: false })}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <p className="text-[13px] text-white/60">Google Play</p>
                <p className="text-[20px] font-semibold mt-1">{program.name}</p>
                <p className="text-[28px] font-bold mt-2">{formatZar(program.priceZar)}</p>
                <div className="mt-5 rounded-[12px] bg-white/10 p-3 text-[13px] text-white/80">
                  Play account: alex.naidoo@gmail.com
                </div>
                <Button variant="accent" fullWidth className="mt-5" onClick={confirm}>
                  Buy
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  className="mt-1 text-white/70"
                  onClick={() => go({ name: "checkout", programId: program.id, sheetOpen: false })}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
