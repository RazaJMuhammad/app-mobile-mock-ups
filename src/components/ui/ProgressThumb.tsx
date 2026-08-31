type Props = {
  url: string;
  date: string;
  pose?: string;
  onClick?: () => void;
  selected?: boolean;
  reviewed?: boolean;
};

export function ProgressThumb({ url, date, pose, onClick, selected, reviewed }: Props) {
  const d = new Date(date + "T12:00:00");
  const label = d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-[3/4] rounded-[12px] overflow-hidden min-h-[44px] border-2 ${
        selected ? "border-accent" : "border-transparent"
      }`}
    >
      <img src={url} alt={label} className="w-full h-full object-cover" />
      {reviewed && (
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent text-[#0F172A] text-[10px] font-semibold">
          Warren reviewed
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1.5 pt-6">
        <span className="block text-[11px] font-medium text-white">{label}</span>
        {pose && <span className="block text-[10px] text-white/70 capitalize">{pose}</span>}
      </span>
    </button>
  );
}
