export type FitnessLevel = "beginner" | "intermediate" | "advanced";
export type Goal = "fitness" | "padel" | "both";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Category = "Fitness" | "Padel Conditioning";
export type TabId = "home" | "library" | "progress" | "profile";
export type Device = "ios" | "android";
export type Theme = "dark" | "light";
export type AppView = "client" | "gallery" | "admin";
export type DemoPreset = "firstLaunch" | "returningEmpty" | "activeClient";

export type ScreenName =
  | "splash"
  | "auth"
  | "onboarding"
  | "home"
  | "library"
  | "programDetail"
  | "checkout"
  | "purchaseConfirm"
  | "workoutDetail"
  | "activeWorkout"
  | "workoutComplete"
  | "progress"
  | "photoUpload"
  | "photoCompare"
  | "calendar"
  | "messages"
  | "profile"
  | "editProfile"
  | "subscription"
  | "notifications"
  | "help";

export type Screen =
  | { name: "splash" }
  | { name: "auth" }
  | { name: "onboarding"; step: number }
  | { name: "home" }
  | { name: "library" }
  | { name: "programDetail"; programId: string; reviews?: "populated" | "empty" }
  | { name: "checkout"; programId: string; sheetOpen?: boolean }
  | { name: "purchaseConfirm"; programId: string }
  | { name: "workoutDetail"; workoutId: string }
  | { name: "activeWorkout"; workoutId: string }
  | { name: "workoutComplete"; workoutId: string }
  | { name: "progress"; segment?: "photos" | "measurements"; emptyPhotos?: boolean }
  | { name: "photoUpload" }
  | { name: "photoCompare"; aId: string; bId: string }
  | { name: "calendar"; view?: "month" | "week" }
  | { name: "messages"; empty?: boolean }
  | { name: "profile" }
  | { name: "editProfile" }
  | { name: "subscription" }
  | { name: "notifications" }
  | { name: "help" };

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  thumbnail: string;
  cue: string;
  modification?: {
    name: string;
    cue: string;
    reason: string;
  };
};

export type Workout = {
  id: string;
  programId: string;
  name: string;
  dayNumber: number;
  weekNumber: number;
  durationMin: number;
  cover: string;
  exercises: Exercise[];
};

export type Review = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
};

export type Program = {
  id: string;
  name: string;
  tagline: string;
  priceZar: number;
  durationWeeks: number;
  difficulty: Difficulty;
  category: Category;
  equipment: string[];
  cover: string;
  weekly: { week: number; title: string; detail: string }[];
  reviews: Review[];
};

export type DayStatus = "completed" | "scheduled" | "missed" | "rest" | "today";

export type CalendarDay = {
  date: string;
  status: DayStatus;
  workoutId?: string;
};

export type ProgressPhoto = {
  id: string;
  date: string;
  pose: "front" | "side" | "back";
  url: string;
  note: string;
  review?: { text: string; date: string };
};

export type Measurement = {
  date: string;
  weightKg: number;
  waistCm?: number;
  chestCm?: number;
};

export type ChatMessage = {
  id: string;
  from: "coach" | "client";
  text?: string;
  photo?: string;
  time: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  programId: string;
  status: "active" | "pending-review";
  lastActive: string;
  joined: string;
};
