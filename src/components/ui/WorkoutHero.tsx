import { Play } from "lucide-react";
import { Button } from "./Button";

type Props = {
  title: string;
  meta: string;
  cover: string;
  cta?: string;
  onStart?: () => void;
  onClick?: () => void;
};

export function WorkoutHero({ title, meta, cover, cta = "Start", onStart, onClick }: Props) {
  return (
    <div className="w-full text-left rounded-[16px] overflow-hidden relative min-h-[180px] border border-line">
      <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/45 to-transparent" />
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 z-0"
        aria-label={title}
      />
      <div className="relative z-10 p-4 pt-16 flex flex-col gap-3 pointer-events-none">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-accent">{meta}</p>
          <h2 className="mt-1 text-[20px] font-semibold text-white leading-snug">{title}</h2>
        </div>
        {onStart && (
          <span className="pointer-events-auto self-start">
            <Button
              variant="accent"
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
            >
              <Play size={16} fill="currentColor" />
              {cta}
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}
