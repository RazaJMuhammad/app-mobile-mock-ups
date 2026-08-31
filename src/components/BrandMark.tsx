export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box = size === "lg" ? "w-20 h-20 text-2xl" : size === "sm" ? "w-10 h-10 text-sm" : "w-14 h-14 text-lg";
  const word = size === "lg" ? "text-[13px] tracking-[0.28em]" : "text-[11px] tracking-[0.22em]";
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${box} rounded-[18px] bg-accent text-[#0F172A] font-bold flex items-center justify-center`}
      >
        WK
      </div>
      <div className="text-center">
        <p className={`font-semibold text-ink ${size === "lg" ? "text-[20px]" : "text-[15px]"}`}>Warren Kuhn</p>
        <p className={`${word} uppercase text-muted mt-1`}>Padel &amp; Fitness</p>
      </div>
    </div>
  );
}
