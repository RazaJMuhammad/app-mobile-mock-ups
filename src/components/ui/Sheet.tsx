import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export function Sheet({ open, onClose, children, title }: Props) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close" />
      <div
        className="relative rounded-t-[24px] bg-app border-t border-line px-5 pt-3 pb-8 animate-[sheet-up_0.28s_ease]"
        role="dialog"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        {title && <h2 className="text-[20px] font-semibold text-ink mb-3">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
