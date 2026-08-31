import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/Input";
import { Sheet } from "../components/ui/Sheet";
import { BrandMark } from "../components/BrandMark";
import { useApp } from "../context/AppContext";

export function AuthScreen() {
  const { go, preset } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("alex.naidoo@email.com");
  const [password, setPassword] = useState("••••••••");
  const [confirm, setConfirm] = useState("");
  const [forgot, setForgot] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (mode === "signup" && confirm && confirm !== password) {
      setError("Passwords don’t match");
      return;
    }
    setError("");
    if (mode === "signup" || preset === "firstLaunch") go({ name: "onboarding", step: 0 });
    else go({ name: "home" });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-4 pb-2">
        <BrandMark size="sm" />
      </div>
      <div className="px-5 mt-4">
        <h1 className="text-[24px] font-bold text-ink">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-[15px] text-muted">
          {mode === "login" ? "Train with Warren — pick up where you left off." : "A few details, then we’ll set your plan."}
        </p>
      </div>

      <div className="flex-1 px-5 pt-6 overflow-y-auto">
        <div className="flex gap-1 p-1 rounded-[12px] bg-surface border border-line mb-5">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError("");
              }}
              className={`flex-1 min-h-[44px] rounded-[10px] text-[15px] font-semibold ${
                mode === m ? "bg-primary text-white" : "text-muted"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={submit}
          className="w-full min-h-[48px] rounded-[12px] bg-ink text-app font-semibold text-[16px] flex items-center justify-center gap-2 mb-3"
        >
          <AppleGlyph />
          Sign in with Apple
        </button>
        <button
          type="button"
          onClick={submit}
          className="w-full min-h-[48px] rounded-[12px] border border-line bg-surface text-ink font-semibold text-[16px] flex items-center justify-center gap-2 mb-5"
        >
          <GoogleGlyph />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <span className="flex-1 h-px bg-line" />
          <span className="text-[11px] font-medium text-muted uppercase">or email</span>
          <span className="flex-1 h-px bg-line" />
        </div>

        <div className="space-y-3">
          <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput
            label="Password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            right={
              <button type="button" onClick={() => setShow((s) => !s)} className="text-muted min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Toggle password">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          {mode === "signup" && (
            <TextInput
              label="Confirm password"
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={error}
            />
          )}
        </div>

        {mode === "login" && (
          <button type="button" className="mt-3 text-[13px] font-medium text-primary min-h-[44px]" onClick={() => setForgot(true)}>
            Forgot password?
          </button>
        )}
      </div>

      <div className="px-5 pb-3 pt-2">
        <Button variant="accent" fullWidth onClick={submit}>
          {mode === "login" ? "Log In" : "Create Account"}
        </Button>
      </div>

      <Sheet open={forgot} onClose={() => setForgot(false)} title="Reset password">
        <p className="text-[15px] text-muted mb-4">We’ll send a reset link to {email}.</p>
        <Button
          variant="accent"
          fullWidth
          onClick={() => setForgot(false)}
        >
          Send reset link
        </Button>
      </Sheet>
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.7 12.3c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 0.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-.1 2.9-2.2c1-.1 2-1.2 2.8-2.3-7.3-2.8-6.1-10.2-4.1-10.9zM14.3 5.8c.6-.8 1.1-1.9.9-3-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.9-1.4z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.5 5.5-6.4 6.5l6.3 5.3C37.3 41.3 44 36 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}
