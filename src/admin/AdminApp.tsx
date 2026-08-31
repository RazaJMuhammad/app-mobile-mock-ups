import { useMemo, useState } from "react";
import { ADMIN_CLIENTS, COACH, MEASUREMENTS, PHOTOS, PROGRAMS, USER } from "../data/mock";
import type { Client } from "../data/types";
import { useApp } from "../context/AppContext";

export function AdminApp() {
  const { setView } = useApp();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);
  const clients = useMemo(
    () => ADMIN_CLIENTS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  const pending = ADMIN_CLIENTS.filter((c) => c.status === "pending-review");

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100">
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[#A3E635] text-[#0F172A] font-bold text-sm flex items-center justify-center">
            WK
          </span>
          <span className="font-semibold">Coach desk</span>
        </div>
        <button type="button" className="text-sm text-slate-400 hover:text-white" onClick={() => setView("client")}>
          Back to client app
        </button>
      </header>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-[280px_1fr] gap-6">
        <aside>
          <div className="flex items-center gap-3 mb-6">
            <img src={COACH.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{COACH.name}</p>
              <p className="text-xs text-slate-400">{COACH.club}</p>
            </div>
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search clients"
            className="w-full h-11 px-3 rounded-lg bg-slate-900 border border-slate-700 text-sm outline-none"
          />
          <ul className="mt-3 space-y-1">
            {clients.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                    selected?.id === c.id ? "bg-slate-800" : "hover:bg-slate-900"
                  }`}
                >
                  <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium truncate">{c.name}</span>
                    <span className="block text-xs text-slate-400 truncate">{programName(c.programId)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          {!selected ? (
            <>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <Stat label="Active clients" value="24" />
                <Stat label="This week’s revenue" value="R18,400" />
                <Stat label="Pending photo reviews" value={String(pending.length)} />
              </div>
              <h2 className="font-semibold mb-3">Pending progress photos</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {pending.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelected(c)}
                    className="text-left rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-lime-400/40"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-slate-400">New check-in · {c.lastActive}</p>
                      </div>
                    </div>
                    <img src={PHOTOS[3].url} alt="" className="mt-3 h-28 w-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
              <h2 className="font-semibold mb-3">Recent messages</h2>
              <div className="rounded-xl border border-slate-800 bg-slate-900 divide-y divide-slate-800">
                <Msg who="Alex Naidoo" text="Left hip still niggles on the lateral lunges." time="Sat 18:40" />
                <Msg who="Priya Reddy" text="Uploaded week 2 photos — lighting better this time." time="Today 09:40" />
                <Msg who="Daniel Botha" text="Can we swap Thursday for a recovery session?" time="Yesterday" />
              </div>
            </>
          ) : (
            <ClientDetail client={selected} onBack={() => setSelected(null)} />
          )}
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Msg({ who, text, time }: { who: string; text: string; time: string }) {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{who}</span>
        <span className="text-slate-500 text-xs">{time}</span>
      </div>
      <p className="text-sm text-slate-400 mt-0.5">{text}</p>
    </div>
  );
}

function ClientDetail({ client, onBack }: { client: Client; onBack: () => void }) {
  const program = PROGRAMS.find((p) => p.id === client.programId);
  const isAlex = client.id === "c1";
  return (
    <div>
      <button type="button" className="text-sm text-slate-400 mb-4" onClick={onBack}>
        ← All clients
      </button>
      <div className="flex items-center gap-4 mb-6">
        <img src={client.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <p className="text-sm text-slate-400">
            {client.email} · Joined {client.joined}
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Program</p>
          <p className="font-semibold mt-1">{program?.name}</p>
          <p className="text-sm text-slate-400 mt-1">
            {isAlex ? "Week 4 · Day 18 of 6-Week Padel Conditioning" : "In progress"}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Latest weight</p>
          <p className="font-semibold mt-1">
            {isAlex ? `${MEASUREMENTS[MEASUREMENTS.length - 1].weightKg} kg` : "—"}
          </p>
        </div>
      </div>
      {isAlex && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Progress photos</p>
          <div className="flex gap-2">
            {PHOTOS.map((p) => (
              <img key={p.id} src={p.url} alt="" className="w-24 h-32 object-cover rounded-lg" />
            ))}
          </div>
          <p className="text-sm text-amber-200 mt-3 rounded-lg bg-amber-400/10 border border-amber-400/20 px-3 py-2">
            Injury flag: left hip pinch on deep laterals — laterals already swapped to supported step-downs.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Notes from intake: same as {USER.firstName} — old left hip pinch on deep laterals. Last message asked to cut range on banded lunges.
          </p>
        </div>
      )}
    </div>
  );
}

function programName(id: string) {
  return PROGRAMS.find((p) => p.id === id)?.name ?? id;
}
