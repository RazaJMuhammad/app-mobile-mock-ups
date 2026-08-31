import type { ReactNode } from "react";
import { Bell, CalendarClock, ChevronLeft, ChevronRight, CircleHelp, CreditCard, LogOut, UserRound } from "lucide-react";
import { SUBSCRIPTION, USER } from "../data/mock";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/Input";

export function ProfileScreen() {
  const { go, applyPreset } = useApp();
  const rows = [
    { icon: UserRound, label: "Edit Profile", to: { name: "editProfile" as const } },
    { icon: CreditCard, label: "Subscription & Billing", to: { name: "subscription" as const } },
    { icon: Bell, label: "Notification Preferences", to: { name: "notifications" as const } },
    { icon: CircleHelp, label: "Help & Support", to: { name: "help" as const } },
  ];

  return (
    <div className="px-5 pb-6">
      <h1 className="text-[24px] font-bold pt-1">Profile</h1>
      <div className="mt-4 flex items-center gap-3">
        <img src={USER.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <p className="text-[20px] font-semibold">{USER.name}</p>
          <p className="text-[13px] text-muted">{USER.email}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go({ name: "messages" })}
        className="mt-4 w-full text-left rounded-[16px] border border-accent bg-accent/10 p-4 min-h-[44px]"
      >
        <span className="flex items-center gap-2 text-[17px] font-semibold text-ink">
          <CalendarClock size={18} /> Book a private with Warren
        </span>
        <span className="block mt-1 text-[13px] text-muted">
          Netset Padel Sandton City. Send a message with your Playtomic level and preferred days.
        </span>
      </button>

      <div className="mt-6 rounded-[16px] border border-line overflow-hidden bg-surface">
        {rows.map((r, i) => (
          <RowButton
            key={r.label}
            icon={r.icon}
            label={r.label}
            last={i === rows.length - 1}
            onClick={() => go(r.to)}
          />
        ))}
      </div>
      <UnitsInline />

      <button
        type="button"
        onClick={() => applyPreset("firstLaunch")}
        className="mt-6 w-full min-h-[44px] rounded-[12px] flex items-center justify-center gap-2 text-error font-semibold"
      >
        <LogOut size={18} /> Log Out
      </button>
    </div>
  );
}

function UnitsInline() {
  const { units, setUnits } = useApp();
  return (
    <div className="mt-4 rounded-[16px] border border-line bg-surface p-4">
      <p className="text-[17px] font-semibold mb-3 flex items-center gap-2">
        Units
      </p>
      <div className="flex gap-2 mb-3">
        {(["kg", "lbs"] as const).map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setUnits({ ...units, weight: w })}
            className={`flex-1 min-h-[44px] rounded-[12px] border font-semibold text-[15px] ${
              units.weight === w ? "border-accent bg-accent/15" : "border-line"
            }`}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {(["cm", "in"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setUnits({ ...units, length: l })}
            className={`flex-1 min-h-[44px] rounded-[12px] border font-semibold text-[15px] ${
              units.length === l ? "border-accent bg-accent/15" : "border-line"
            }`}
          >
            {l === "in" ? "inches" : "cm"}
          </button>
        ))}
      </div>
    </div>
  );
}

function RowButton({
  icon: Icon,
  label,
  onClick,
  last,
}: {
  icon: typeof UserRound;
  label: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 min-h-[52px] text-left ${last ? "" : "border-b border-line"}`}
    >
      <Icon size={20} className="text-muted" />
      <span className="flex-1 text-[15px] font-medium">{label}</span>
      <ChevronRight size={18} className="text-muted" />
    </button>
  );
}

export function EditProfileScreen() {
  const { go } = useApp();
  return (
    <Subpage title="Edit Profile" onBack={() => go({ name: "profile" })}>
      <div className="flex flex-col items-center mb-6">
        <img src={USER.avatar} alt="" className="w-20 h-20 rounded-full object-cover" />
        <button type="button" className="mt-2 text-[15px] font-semibold text-primary min-h-[44px]">
          Change photo
        </button>
      </div>
      <div className="space-y-3">
        <TextInput label="Name" defaultValue={USER.name} />
        <TextInput label="Email" defaultValue={USER.email} />
      </div>
      <Button variant="accent" fullWidth className="mt-6" onClick={() => go({ name: "profile" })}>
        Save
      </Button>
    </Subpage>
  );
}

export function SubscriptionScreen() {
  const { go, device } = useApp();
  return (
    <Subpage title="Subscription & Billing" onBack={() => go({ name: "profile" })}>
      <div className="rounded-[16px] border border-line bg-surface p-4">
        <p className="text-[13px] text-muted">Current plan</p>
        <p className="text-[20px] font-semibold mt-1">{SUBSCRIPTION.plan}</p>
        <p className="text-[15px] text-ink mt-2">{SUBSCRIPTION.price} · renews {SUBSCRIPTION.renewal}</p>
      </div>
      <p className="mt-4 text-[15px] text-muted leading-relaxed">
        Subscriptions are managed in the {device === "ios" ? "App Store" : "Play Store"}, as required by Apple and Google.
      </p>
      <Button variant="secondary" fullWidth className="mt-5">
        Manage Subscription
      </Button>
    </Subpage>
  );
}

export function NotificationsScreen() {
  const { go, notifications, setNotifications } = useApp();
  const toggle = (k: keyof typeof notifications) =>
    setNotifications({ ...notifications, [k]: !notifications[k] });
  return (
    <Subpage title="Notifications" onBack={() => go({ name: "profile" })}>
      <ToggleRow label="Workout reminders" on={notifications.workouts} onChange={() => toggle("workouts")} />
      <ToggleRow label="Messages from Warren" on={notifications.messages} onChange={() => toggle("messages")} />
      <ToggleRow label="Announcements" on={notifications.announcements} onChange={() => toggle("announcements")} />
    </Subpage>
  );
}

export function HelpScreen() {
  const { go } = useApp();
  return (
    <Subpage title="Help & Support" onBack={() => go({ name: "profile" })}>
      <p className="text-[15px] text-muted leading-relaxed">
        Training questions go to Warren in Messages. For billing or account issues, use the store subscription page or email support@warrenkuhn.coach.
      </p>
      <Button variant="accent" fullWidth className="mt-6" onClick={() => go({ name: "messages" })}>
        Message Warren
      </Button>
    </Subpage>
  );
}

function ToggleRow({ label, on, onChange }: { label: string; on: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange} className="w-full flex items-center justify-between min-h-[52px] border-b border-line">
      <span className="text-[15px]">{label}</span>
      <span className={`w-11 h-7 rounded-full relative ${on ? "bg-accent" : "bg-line"}`}>
        <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-all ${on ? "left-4.5" : "left-0.5"}`} style={{ left: on ? 18 : 2 }} />
      </span>
    </button>
  );
}

function Subpage({ title, onBack, children }: { title: string; onBack: () => void; children: ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <header className="px-3 pt-1 flex items-center gap-1">
        <button type="button" className="min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={onBack} aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[20px] font-semibold">{title}</h1>
      </header>
      <div className="px-5 pt-4 pb-6 overflow-y-auto">{children}</div>
    </div>
  );
}
