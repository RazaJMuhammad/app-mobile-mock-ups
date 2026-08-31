import { useRef, useState } from "react";
import { ChevronLeft, ImagePlus, MessageCircle } from "lucide-react";
import { COACH, IMAGES, MESSAGES, QUICK_REPLIES } from "../data/mock";
import { useApp } from "../context/AppContext";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";
import type { ChatMessage } from "../data/types";

export function MessagesScreen() {
  const { screen, go } = useApp();
  const empty = screen.name === "messages" && screen.empty;
  const [text, setText] = useState("");
  const [items, setItems] = useState<ChatMessage[]>(empty ? [] : MESSAGES);
  const [typing, setTyping] = useState(false);
  const replied = useRef(false);

  const push = (msg: ChatMessage) => {
    setItems((m) => [...m, msg]);
    if (replied.current || empty) return;
    replied.current = true;
    window.setTimeout(() => {
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setItems((m) => [
          ...m,
          {
            id: `wk-${Date.now()}`,
            from: "coach",
            text: "Got it. I’ll look at the session and adjust Thursday if you need the legs for league.",
            time: "Now",
          },
        ]);
      }, 1400);
    }, 500);
  };

  const send = (value = text) => {
    if (!value.trim()) return;
    push({ id: `n-${Date.now()}`, from: "client", text: value.trim(), time: "Now" });
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <header className="px-3 pt-1 flex items-center gap-2 border-b border-line pb-2">
        <button type="button" className="min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => go({ name: "home" })} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <img src={COACH.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
        <div>
          <p className="text-[17px] font-semibold leading-tight">{COACH.name}</p>
          <p className="text-[11px] text-muted">{typing ? "Typing…" : "Usually replies same day"}</p>
        </div>
      </header>

      {items.length === 0 && !typing ? (
        <EmptyState
          icon={<MessageCircle size={32} />}
          title="No messages yet"
          message="Ask Warren about a session, an injury, or send a form check."
        />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.map((m) => {
            const mine = m.from === "client";
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] rounded-[16px] px-3.5 py-2.5 ${
                    mine ? "bg-primary text-white rounded-br-md" : "bg-surface border border-line text-ink rounded-bl-md"
                  }`}
                >
                  {m.photo && <img src={m.photo} alt="" className="rounded-[12px] mb-2 max-h-40 object-cover" />}
                  {m.text && <p className="text-[15px] leading-relaxed">{m.text}</p>}
                  <p className={`text-[11px] mt-1 ${mine ? "text-white/70" : "text-muted"}`}>{m.time}</p>
                </div>
              </div>
            );
          })}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-surface border border-line rounded-[16px] rounded-bl-md px-4 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-[live-pulse_1s_ease-in-out_infinite]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-[live-pulse_1s_ease-in-out_0.2s_infinite]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-[live-pulse_1s_ease-in-out_0.4s_infinite]" />
              </div>
            </div>
          )}
        </div>
      )}

      {!empty && (
        <div className="px-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="shrink-0 min-h-[36px] px-3 rounded-full border border-line bg-surface text-[13px] font-medium text-ink"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="px-3 py-2 border-t border-line flex items-end gap-2">
        <button
          type="button"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted"
          aria-label="Attach photo"
          onClick={() =>
            push({
              id: `p-${Date.now()}`,
              from: "client",
              photo: IMAGES.photo3,
              text: "Form check — split squat.",
              time: "Now",
            })
          }
        >
          <ImagePlus size={22} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message Warren"
          className="flex-1 min-h-[44px] px-3 rounded-[10px] bg-surface border border-line text-[15px] text-ink outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
        />
        <Button variant="accent" className="px-4" onClick={() => send()}>
          Send
        </Button>
      </div>
    </div>
  );
}
