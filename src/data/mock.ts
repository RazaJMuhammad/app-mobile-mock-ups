import type {
  CalendarDay,
  ChatMessage,
  Client,
  FitnessLevel,
  Goal,
  Measurement,
  Program,
  ProgressPhoto,
  Workout,
} from "./types";

const img = (id: string, w = 1200, h = 675) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const IMAGES = {
  padelCourt: img("photo-1554068865-24cecd4e34b8"),
  gymFloor: img("photo-1534438327276-14e5300c3a48"),
  strength: img("photo-1517836357463-d25dfeac3438"),
  sprint: img("photo-1552674605-db6ffd4facb5"),
  coaching: img("photo-1571019614242-c5c5dee9f50b"),
  kettle: img("photo-1517963879433-6ad2b056d712"),
  athlete: img("photo-1434682881908-b43d0467b798"),
  stretch: img("photo-1544367567-0f2fcb009e0b"),
  dumbbell: img("photo-1583454110551-21f2fa2afe61"),
  ropes: img("photo-1518611012118-696072aa579a"),
  lunges: img("photo-1571019613454-1cb2f99b2d8b"),
  core: img("photo-1571019614242-c5c5dee9f50b"),
  warren: img("photo-1567013127542-490d757e51fc", 400, 400),
  alex: img("photo-1531123897727-8f129e1688ce", 400, 400),
  client2: img("photo-1500648767791-00dcc994a43e", 400, 400),
  client3: img("photo-1544005313-94ddf0286df2", 400, 400),
  client4: img("photo-1507003211169-0a1dd7228f2d", 400, 400),
  photo1: img("photo-1571019613454-1cb2f99b2d8b", 600, 800),
  photo2: img("photo-1583454110551-21f2fa2afe61", 600, 800),
  photo3: img("photo-1517838277536-f5f8be8b9a65", 600, 800),
  photo4: img("photo-1599058945522-28d584b6f14f", 600, 800),
};

export const COACH = {
  name: "Warren Kuhn",
  firstName: "Warren",
  title: "Head Padel Coach",
  club: "Netset Padel Sandton City",
  city: "Johannesburg",
  bio: "Master’s in Kinesiology and Exercise Science. Former South African national champion. I coach padel athletes the way I train them — precise, competitive, and built for the court.",
  avatar: IMAGES.warren,
};

export const USER = {
  name: "Alex Naidoo",
  firstName: "Alex",
  email: "alex.naidoo@email.com",
  avatar: IMAGES.alex,
  joined: "12 Jul 2026",
};

export const PROGRAMS: Program[] = [
  {
    id: "padel-6w",
    name: "6-Week Padel Conditioning",
    tagline: "Court speed, rotational power, and match-day stamina.",
    priceZar: 1499,
    durationWeeks: 6,
    difficulty: "Intermediate",
    category: "Padel Conditioning",
    equipment: ["Resistance bands", "Medicine ball", "Kettlebell", "Court or open space"],
    cover: IMAGES.padelCourt,
    weekly: [
      { week: 1, title: "Base & movement quality", detail: "Lateral patterns, hip stability, aerobic base." },
      { week: 2, title: "Acceleration", detail: "First-step speed, split-step timing, short sprints." },
      { week: 3, title: "Rotational power", detail: "Med-ball throws, anti-rotation core, serve/smash chain." },
      { week: 4, title: "Repeat efforts", detail: "Point-simulation intervals, lactic tolerance." },
      { week: 5, title: "Match density", detail: "Back-to-back court sessions, recovery protocols." },
      { week: 6, title: "Peak & taper", detail: "Sharpening, reduced volume, confidence work." },
    ],
    reviews: [
      {
        id: "r1",
        name: "Priya Reddy",
        avatar: IMAGES.client3,
        rating: 5,
        text: "My first-step to the glass actually feels explosive now. Warren’s cues are specific — not generic gym talk.",
        date: "Aug 2026",
      },
      {
        id: "r2",
        name: "Daniel Botha",
        avatar: IMAGES.client2,
        rating: 5,
        text: "The rotational work transferred straight to my bandeja. Six weeks well spent.",
        date: "Jul 2026",
      },
    ],
  },
  {
    id: "foundations",
    name: "Foundations Strength Block",
    tagline: "Build the engine: squat, hinge, push, pull — 4 weeks.",
    priceZar: 799,
    durationWeeks: 4,
    difficulty: "Beginner",
    category: "Fitness",
    equipment: ["Dumbbells", "Bench", "Resistance bands"],
    cover: IMAGES.strength,
    weekly: [
      { week: 1, title: "Learn the patterns", detail: "Tempo squats, hip hinge, rowing, bracing." },
      { week: 2, title: "Add load", detail: "Progressive sets, rest discipline." },
      { week: 3, title: "Density", detail: "Shorter rests, accessory work for shoulders and grip." },
      { week: 4, title: "Test week", detail: "Re-test key lifts, mobility reset." },
    ],
    reviews: [
      {
        id: "r3",
        name: "Samira Khan",
        avatar: IMAGES.client3,
        rating: 5,
        text: "I had never strength-trained. Form videos made it feel like Warren was in the room.",
        date: "Jun 2026",
      },
    ],
  },
  {
    id: "court-speed",
    name: "Court Speed & Agility",
    tagline: "Close the T, recover, and win the next ball.",
    priceZar: 1199,
    durationWeeks: 5,
    difficulty: "Advanced",
    category: "Padel Conditioning",
    equipment: ["Cones or bottles", "Court", "Jump rope"],
    cover: IMAGES.sprint,
    weekly: [
      { week: 1, title: "Footwork vocabulary", detail: "Crossover, shuffle, split-step under fatigue." },
      { week: 2, title: "Change of direction", detail: "Deceleration and re-acceleration." },
      { week: 3, title: "Reactive agility", detail: "Partner/call-out drills, vision + feet." },
      { week: 4, title: "Point simulations", detail: "Live-pattern conditioning." },
      { week: 5, title: "Speed peak", detail: "Low volume, high quality, recovery." },
    ],
    reviews: [],
  },
  {
    id: "preseason",
    name: "Pre-Season Power",
    tagline: "Eight weeks of strength that shows up on court.",
    priceZar: 999,
    durationWeeks: 8,
    difficulty: "Intermediate",
    category: "Fitness",
    equipment: ["Barbell or DBs", "Pull-up bar", "Plyo box or step"],
    cover: IMAGES.gymFloor,
    weekly: [
      { week: 1, title: "Work capacity", detail: "Full-body strength, aerobic finishers." },
      { week: 2, title: "Posterior chain", detail: "Hinge emphasis, hamstrings, upper back." },
      { week: 3, title: "Unilateral", detail: "Split squats, single-arm work, anti-rotation." },
      { week: 4, title: "Deload", detail: "Cut volume 40%, keep intensity." },
      { week: 5, title: "Power intro", detail: "Jumps, med-ball, Olympic-pattern pulls." },
      { week: 6, title: "Strength peak", detail: "Heavy compounds, tight rest." },
      { week: 7, title: "Power peak", detail: "Contrast sets, court transfer." },
      { week: 8, title: "Taper", detail: "Ready for league night." },
    ],
    reviews: [
      {
        id: "r4",
        name: "Lebo Maseko",
        avatar: IMAGES.client4,
        rating: 4,
        text: "Legs felt heavy week 6, but my smash had more pop in league. Worth it.",
        date: "May 2026",
      },
    ],
  },
];

export const WORKOUTS: Workout[] = [
  {
    id: "w-today",
    programId: "padel-6w",
    name: "Lateral Power & Rotational Core",
    dayNumber: 18,
    weekNumber: 4,
    durationMin: 42,
    cover: IMAGES.coaching,
    exercises: [
      {
        id: "e1",
        name: "Banded lateral lunges",
        sets: 3,
        reps: "10 / side",
        restSec: 45,
        thumbnail: IMAGES.lunges,
        cue: "Sit the hip back, knee tracks over mid-foot. Push the court away.",
        modification: {
          name: "Supported lateral step-downs",
          cue: "Hold the rack, shorten the range. Same hip pattern — stop before any pinch.",
          reason: "Left hip",
        },
      },
      {
        id: "e2",
        name: "Med-ball rotational throws",
        sets: 4,
        reps: "8 / side",
        restSec: 60,
        thumbnail: IMAGES.athlete,
        cue: "Load the back hip, snap the ribcage. This is your bandeja chain.",
      },
      {
        id: "e3",
        name: "Split squat to press",
        sets: 3,
        reps: "8 / side",
        restSec: 60,
        thumbnail: IMAGES.dumbbell,
        cue: "Tall torso, back knee drops straight down. Press as you stand.",
      },
      {
        id: "e4",
        name: "Pallof press",
        sets: 3,
        reps: "12 / side",
        restSec: 40,
        thumbnail: IMAGES.core,
        cue: "Don’t let the band rotate you. Exhale as you press out.",
      },
      {
        id: "e5",
        name: "Court shuffle intervals",
        sets: 6,
        reps: "20s on / 20s off",
        restSec: 20,
        thumbnail: IMAGES.sprint,
        cue: "Low centre of gravity, quiet feet. Imagine closing the T.",
      },
      {
        id: "e6",
        name: "Dead bug, opposite reach",
        sets: 3,
        reps: "10 / side",
        restSec: 30,
        thumbnail: IMAGES.stretch,
        cue: "Ribs down, lower back glued. Slow and honest.",
      },
    ],
  },
  {
    id: "w-wed",
    programId: "padel-6w",
    name: "Repeat-Sprint Capacity",
    dayNumber: 19,
    weekNumber: 4,
    durationMin: 38,
    cover: IMAGES.sprint,
    exercises: [
      {
        id: "e7",
        name: "A-skips + wall drills",
        sets: 3,
        reps: "20m",
        restSec: 40,
        thumbnail: IMAGES.sprint,
        cue: "Strike under the hip, not out in front.",
      },
      {
        id: "e8",
        name: "Pro-agility shuttles",
        sets: 6,
        reps: "5-10-5",
        restSec: 50,
        thumbnail: IMAGES.padelCourt,
        cue: "Plant, drop the hip, first step is a push.",
      },
    ],
  },
  {
    id: "w-fri",
    programId: "padel-6w",
    name: "Upper Strength & Serve Chain",
    dayNumber: 20,
    weekNumber: 4,
    durationMin: 45,
    cover: IMAGES.strength,
    exercises: [
      {
        id: "e9",
        name: "Single-arm DB row",
        sets: 4,
        reps: "10 / side",
        restSec: 60,
        thumbnail: IMAGES.dumbbell,
        cue: "Elbow to hip pocket. Don’t shrug.",
      },
    ],
  },
];

export const ANNOUNCEMENT = {
  unread: true,
  title: "From Warren",
  preview: "Week 4 is density week. If the shuffles feel ugly, shorten the distance — quality over heroics.",
  time: "Today, 06:40",
};

export const PHOTOS: ProgressPhoto[] = [
  {
    id: "p1",
    date: "2026-07-12",
    pose: "front",
    url: IMAGES.photo1,
    note: "Week 0 baseline, morning.",
  },
  {
    id: "p2",
    date: "2026-07-12",
    pose: "side",
    url: IMAGES.photo2,
    note: "Week 0 side.",
  },
  {
    id: "p3",
    date: "2026-08-02",
    pose: "front",
    url: IMAGES.photo3,
    note: "Shoulders sitting better. Waist down a bit.",
    review: {
      text: "Upper back is holding. Keep the ribcage quiet on the overhead — looking strong.",
      date: "3 Aug",
    },
  },
  {
    id: "p4",
    date: "2026-08-23",
    pose: "front",
    url: IMAGES.photo4,
    note: "Week 6 check-in before taper.",
    review: {
      text: "Nice work Alex. Shoulders sitting better on the smash. Rest Wednesday if league is Thursday.",
      date: "Sun 09:01",
    },
  },
];

export const MEASUREMENTS: Measurement[] = [
  { date: "2026-07-12", weightKg: 78.4, waistCm: 86, chestCm: 98 },
  { date: "2026-07-19", weightKg: 77.9, waistCm: 85.5 },
  { date: "2026-07-26", weightKg: 77.2, waistCm: 85 },
  { date: "2026-08-02", weightKg: 76.8, waistCm: 84, chestCm: 99 },
  { date: "2026-08-09", weightKg: 76.5, waistCm: 83.5 },
  { date: "2026-08-16", weightKg: 76.1, waistCm: 83 },
  { date: "2026-08-23", weightKg: 75.8, waistCm: 82.5, chestCm: 100 },
  { date: "2026-08-30", weightKg: 75.6, waistCm: 82, chestCm: 100 },
];

export const MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    from: "coach",
    text: "Alex — saw the Week 6 photos. Upper back is holding much better on the overhead. Nice work.",
    time: "Sat 18:12",
  },
  {
    id: "m2",
    from: "client",
    text: "Thanks Warren. Left hip still niggles on the lateral lunges. Should I cut range?",
    time: "Sat 18:40",
  },
  {
    id: "m3",
    from: "coach",
    text: "Yes — shorten the range, keep the band light, and add a 90/90 hip open before the set. Don’t push through a pinch.",
    time: "Sat 19:02",
  },
  {
    id: "m4",
    from: "client",
    photo: IMAGES.photo4,
    text: "Today’s front. Lighting’s not perfect.",
    time: "Sun 08:15",
  },
  {
    id: "m5",
    from: "coach",
    text: "That’s plenty. Rest Wednesday if league is Thursday — I’ll move your density session.",
    time: "Sun 09:01",
  },
];

export const TODAY = new Date(2026, 7, 31);

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

export const CALENDAR: CalendarDay[] = (() => {
  const days: CalendarDay[] = [];
  const start = new Date(2026, 7, 1);
  const map: Record<string, Omit<CalendarDay, "date">> = {
    "2026-08-03": { status: "completed", workoutId: "w-today" },
    "2026-08-05": { status: "completed", workoutId: "w-wed" },
    "2026-08-07": { status: "completed", workoutId: "w-fri" },
    "2026-08-08": { status: "completed", workoutId: "w-today" },
    "2026-08-10": { status: "completed", workoutId: "w-today" },
    "2026-08-12": { status: "missed", workoutId: "w-wed" },
    "2026-08-14": { status: "completed", workoutId: "w-fri" },
    "2026-08-15": { status: "completed", workoutId: "w-today" },
    "2026-08-17": { status: "completed", workoutId: "w-today" },
    "2026-08-19": { status: "completed", workoutId: "w-wed" },
    "2026-08-21": { status: "completed", workoutId: "w-fri" },
    "2026-08-22": { status: "missed", workoutId: "w-today" },
    "2026-08-24": { status: "completed", workoutId: "w-today" },
    "2026-08-26": { status: "completed", workoutId: "w-wed" },
    "2026-08-28": { status: "completed", workoutId: "w-fri" },
    "2026-08-29": { status: "rest" },
    "2026-08-31": { status: "today", workoutId: "w-today" },
  };
  for (let i = 0; i < 31; i++) {
    const d = new Date(start);
    d.setDate(1 + i);
    const key = iso(d);
    days.push({ date: key, ...(map[key] ?? { status: "rest" }) });
  }
  return days;
})();

export const WEEK_STRIP = [
  { label: "M", date: "31", status: "today" as const, workoutId: "w-today" },
  { label: "T", date: "1", status: "rest" as const },
  { label: "W", date: "2", status: "scheduled" as const, workoutId: "w-wed" },
  { label: "T", date: "3", status: "rest" as const },
  { label: "F", date: "4", status: "scheduled" as const, workoutId: "w-fri" },
  { label: "S", date: "5", status: "scheduled" as const, workoutId: "w-today" },
  { label: "S", date: "6", status: "rest" as const },
];

export const ADMIN_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Alex Naidoo",
    email: "alex.naidoo@email.com",
    avatar: IMAGES.alex,
    programId: "padel-6w",
    status: "pending-review",
    lastActive: "Today, 07:12",
    joined: "12 Jul 2026",
  },
  {
    id: "c2",
    name: "Daniel Botha",
    email: "daniel.botha@email.com",
    avatar: IMAGES.client2,
    programId: "court-speed",
    status: "active",
    lastActive: "Yesterday",
    joined: "3 Jun 2026",
  },
  {
    id: "c3",
    name: "Priya Reddy",
    email: "priya.reddy@email.com",
    avatar: IMAGES.client3,
    programId: "foundations",
    status: "pending-review",
    lastActive: "Today, 09:40",
    joined: "18 Aug 2026",
  },
  {
    id: "c4",
    name: "Lebo Maseko",
    email: "lebo.maseko@email.com",
    avatar: IMAGES.client4,
    programId: "preseason",
    status: "active",
    lastActive: "2 days ago",
    joined: "1 May 2026",
  },
];

export const SUBSCRIPTION = {
  plan: "6-Week Padel Conditioning",
  price: "R1,499",
  renewal: "12 Oct 2026",
  store: "App Store",
};

export const WEEKLY_FOCUS = {
  week: 4,
  title: "Repeat efforts",
  body: "Close the T, recover, win the next ball. If the shuffles get ugly, shorten the distance.",
};

export const UPCOMING = [
  { day: "Wed", date: "2 Sep", name: "Repeat-Sprint Capacity", duration: "38 min", workoutId: "w-wed" },
  { day: "Fri", date: "4 Sep", name: "Upper Strength & Serve Chain", duration: "45 min", workoutId: "w-fri" },
  { day: "Sat", date: "5 Sep", name: "Optional court density", duration: "30 min", workoutId: "w-today" },
];

export const LEAGUE = {
  day: "Thursday",
  venue: "Netset Sandton",
  note: "League night. If you’re on court Thursday, skip Wednesday density — I’ll move it.",
};

export const SESSION_BRIEF = {
  title: "Warren’s brief",
  body: "Density day. Quality over heroics. I swapped your laterals for a supported version because of the hip — use it.",
};

export const QUICK_REPLIES = [
  "Hip felt better today",
  "Can we move Thursday?",
  "Form check coming",
  "League tonight",
];

export const RECOVERY = {
  title: "Recovery — hip + glass legs",
  minutes: 12,
  items: ["90/90 hip open, 8 breaths / side", "World’s greatest stretch, slow", "Calf wall holds, 45s", "Nasal walk, 4 minutes"],
};

export function recommendProgram(goal: Goal | null, level: FitnessLevel | null): Program {
  if (level === "beginner" || goal === "fitness") return PROGRAMS[1];
  if (level === "advanced") return PROGRAMS[2];
  return PROGRAMS[0];
}

export function formatZar(n: number) {
  return `R${n.toLocaleString("en-ZA")}`;
}

export function greeting(date = TODAY) {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
