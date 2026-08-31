import { formatZar } from "../../data/mock";
import type { Program } from "../../data/types";

type Props = {
  program: Program;
  purchased?: boolean;
  recommended?: boolean;
  downloaded?: boolean;
  onClick?: () => void;
};

export function ProgramCard({ program, purchased, recommended, downloaded, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="text-left w-full min-h-[44px]">
      <div className={`rounded-[16px] overflow-hidden bg-surface border ${recommended ? "border-accent" : "border-line"}`}>
        <div className="relative aspect-video">
          <img src={program.cover} alt="" className="w-full h-full object-cover" />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-app/80 text-[11px] font-medium text-ink">
            {program.difficulty}
          </span>
          {recommended && (
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-accent text-[#0F172A] text-[11px] font-semibold">
              Warren recommends
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-[17px] font-semibold text-ink leading-snug">{program.name}</h3>
          <p className="mt-1 text-[13px] text-muted leading-snug">{program.tagline}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] text-muted">
              {program.durationWeeks} weeks
              {downloaded ? " · Downloaded" : ""}
            </span>
            {purchased ? (
              <span className="text-[13px] font-semibold text-accent">Continue</span>
            ) : (
              <span className="text-[15px] font-semibold text-ink">{formatZar(program.priceZar)}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
