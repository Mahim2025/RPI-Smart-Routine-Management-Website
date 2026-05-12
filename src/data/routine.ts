export type Day = "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU";
export const DAYS: Day[] = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];
export const DAY_FULL: Record<Day, string> = {
  SAT: "Saturday",
  SUN: "Sunday",
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
};

export interface Period {
  index: number; // 1..7
  start: string; // "HH:MM"
  end: string;
  label: string;
}

export const PERIODS: Period[] = [
  { index: 1, start: "08:00", end: "08:45", label: "8:00 – 8:45" },
  { index: 2, start: "08:45", end: "09:30", label: "8:45 – 9:30" },
  { index: 3, start: "09:30", end: "10:15", label: "9:30 – 10:15" },
  { index: 4, start: "10:15", end: "11:00", label: "10:15 – 11:00" },
  { index: 5, start: "11:00", end: "11:45", label: "11:00 – 11:45" },
  { index: 6, start: "11:45", end: "12:30", label: "11:45 – 12:30" },
  { index: 7, start: "12:30", end: "13:15", label: "12:30 – 1:15" },
];

export interface Teacher {
  code: string;
  name: string;
  subjects?: string[];
}

export const TEACHERS: Teacher[] = [
  { code: "SU", name: "Md. Soriat Ullah" },
  { code: "FH", name: "Md. Faruk Hossain" },
  { code: "MFH", name: "Md. Fazlul Haque" },
  { code: "AAM", name: "Md. Abdullah Al Mamun" },
  { code: "RK", name: "Mst. Riya Khatun" },
  { code: "MK", name: "Md. Mohon Khan" },
  { code: "MI", name: "Md. Munjurul Islam" },
  { code: "MNK", name: "Sayed Mahmudun Nobi Khandokar" },
  { code: "MM", name: "Mahmudun Nabi Milon" },
  { code: "JA", name: "Md. Jahangir Alom" },
  { code: "PA", name: "Pervez Ahmed" },
  { code: "SMK", name: "S.M. Kamruzzaman" },
  { code: "SN", name: "Samroz Nahar" },
  { code: "MN", name: "Md. Nurullah" },
  { code: "EH", name: "Md. Ehsanul Haque" },
  { code: "AR", name: "Abdur Razzak" },
  { code: "JR", name: "JR (Physical Ed.)" },
];

export interface Subject {
  code: string;
  name: string;
  teacherCode: string;
}

export interface ClassEntry {
  day: Day;
  startPeriod: number;
  span: number; // 1..3
  subjectCode: string;
  teacherCode: string;
  room: string;
}

export interface SemesterData {
  id: "2nd" | "3rd" | "5th" | "7th";
  label: string;
  load: number;
  subjects: Subject[];
  classes: ClassEntry[];
}

/** Helper to pack rows tersely */
const c = (
  day: Day,
  startPeriod: number,
  span: number,
  subjectCode: string,
  teacherCode: string,
  room: string,
): ClassEntry => ({ day, startPeriod, span, subjectCode, teacherCode, room });

export const SEMESTERS: SemesterData[] = [
  {
    id: "2nd",
    label: "2nd Semester",
    load: 35,
    subjects: [
      { code: "25721", name: "English-II", teacherCode: "SN" },
      { code: "25722", name: "Bangla-II", teacherCode: "MN" },
      { code: "25812", name: "Physical Education & Life Skills", teacherCode: "JR" },
      { code: "25913", name: "Chemistry", teacherCode: "SMK" },
      { code: "25921", name: "Mathematics-II", teacherCode: "PA" },
      { code: "28521", name: "Python Programming", teacherCode: "SU" },
      { code: "28522", name: "Computer Graphics Design-I", teacherCode: "RK" },
      { code: "26811", name: "Basic Electronics", teacherCode: "EH" },
    ],
    classes: [
      // SUN
      c("SUN", 1, 3, "28522", "RK", "1305"),
      c("SUN", 4, 1, "25722", "MN", "2302"),
      c("SUN", 5, 3, "25921", "PA", "2302"),
      // MON
      c("MON", 1, 1, "25921", "PA", "2302"),
      c("MON", 2, 1, "25913", "SMK", "2302"),
      c("MON", 3, 1, "25721", "SN", "2302"),
      c("MON", 4, 1, "28521", "SU", "2302"),
      c("MON", 5, 3, "25812", "JR", "FIELD"),
      // TUE
      c("TUE", 1, 3, "25913", "SMK", "2102"),
      c("TUE", 4, 1, "25722", "MN", "2303"),
      c("TUE", 5, 1, "25921", "PA", "2303"),
      c("TUE", 6, 1, "28521", "SU", "2303"),
      c("TUE", 7, 1, "26811", "EH", "2303"),
      // WED
      c("WED", 1, 1, "25913", "SMK", "5203"),
      c("WED", 2, 3, "26811", "EH", "5203"),
      c("WED", 5, 3, "28522", "RK", "1305"),
      // THU
      c("THU", 1, 1, "25921", "PA", "2302"),
      c("THU", 2, 1, "26811", "EH", "2302"),
      c("THU", 3, 1, "25913", "SMK", "2302"),
      c("THU", 4, 1, "25721", "SN", "1308"),
      c("THU", 5, 3, "28521", "SU", "1308"),
    ],
  },
  {
    id: "3rd",
    label: "3rd Semester",
    load: 35,
    subjects: [
      { code: "25811", name: "Social Science", teacherCode: "MM" },
      { code: "25922", name: "Physics-II", teacherCode: "MNK" },
      { code: "25931", name: "Mathematics-III", teacherCode: "MI" },
      { code: "28531", name: "Application Development Using Python", teacherCode: "SU" },
      { code: "28532", name: "Computer Graphics Design-II", teacherCode: "RK" },
      { code: "28533", name: "IT Support Services", teacherCode: "AAM" },
      { code: "26831", name: "Digital Electronics-I", teacherCode: "MK" },
    ],
    classes: [
      // SUN
      c("SUN", 1, 1, "25922", "MNK", "2303"),
      c("SUN", 2, 1, "25811", "MM", "2303"),
      c("SUN", 3, 1, "28531", "SU", "2303"),
      c("SUN", 4, 1, "25931", "MI", "1302"),
      c("SUN", 6, 1, "28533", "AAM", "1302"),
      // MON
      c("MON", 2, 1, "28533", "AAM", "1305"),
      c("MON", 4, 1, "26831", "MK", "1305"),
      c("MON", 5, 1, "25922", "MNK", "2302"),
      c("MON", 6, 1, "25931", "MI", "2302"),
      c("MON", 7, 1, "25811", "MM", "2302"),
      // TUE
      c("TUE", 2, 1, "28531", "SU", "2302"),
      c("TUE", 4, 1, "28533", "AAM", "2302"),
      c("TUE", 6, 1, "25931", "MI", "2302"),
      // WED
      c("WED", 1, 1, "28533", "AAM", "2302"),
      c("WED", 3, 1, "25922", "MNK", "2106"),
      c("WED", 4, 1, "25931", "MI", "2302"),
      c("WED", 6, 1, "28531", "SU", "2302"),
      c("WED", 7, 1, "26831", "MK", "2302"),
      // THU
      c("THU", 1, 1, "25922", "MNK", "1305"),
      c("THU", 3, 1, "28532", "RK", "1305"),
      c("THU", 7, 1, "26831", "MK", "5201"),
    ],
  },
  {
    id: "5th",
    label: "5th Semester",
    load: 34,
    subjects: [
      { code: "25841", name: "Accounting", teacherCode: "JA" },
      { code: "28551", name: "Application Development Using Java", teacherCode: "FH" },
      { code: "28552", name: "Web Design & Development-II", teacherCode: "SU" },
      { code: "28553", name: "Computer Architecture & Microprocessor", teacherCode: "AAM" },
      { code: "28554", name: "Data Communication", teacherCode: "MFH" },
      { code: "28555", name: "Operating System", teacherCode: "RK" },
      { code: "28556", name: "Project Work-I", teacherCode: "AAM" },
    ],
    classes: [
      // SUN
      c("SUN", 1, 1, "28522", "SU", "2302"),
      c("SUN", 2, 1, "25841", "JA", "2302"),
      c("SUN", 3, 1, "28553", "AAM", "2302"),
      c("SUN", 4, 1, "28554", "MFH", "1305"),
      c("SUN", 5, 3, "28555", "RK", "1305"),
      // MON
      c("MON", 1, 3, "28552", "SU", "1302"),
      c("MON", 4, 1, "28554", "MFH", "1302"),
      c("MON", 5, 3, "28551", "FH", "1302"),
      // TUE
      c("TUE", 1, 1, "28554", "MFH", "2302"),
      c("TUE", 2, 1, "28551", "FH", "2302"),
      c("TUE", 3, 1, "28553", "AAM", "2302"),
      c("TUE", 4, 1, "28555", "RK", "1305"),
      c("TUE", 5, 3, "28556", "AAM", "1305"),
      // WED
      c("WED", 1, 3, "28554", "MFH", "1305"),
      c("WED", 4, 1, "28553", "AAM", "2303"),
      c("WED", 5, 1, "25841", "JA", "2303"),
      c("WED", 6, 1, "28551", "FH", "2303"),
      // THU
      c("THU", 1, 1, "28555", "RK", "1302"),
      c("THU", 2, 3, "28552", "SU", "1302"),
      c("THU", 5, 3, "28553", "AAM", "1305"),
    ],
  },
  {
    id: "7th",
    label: "7th Semester",
    load: 33,
    subjects: [
      { code: "25853", name: "Innovation & Entrepreneurship", teacherCode: "JA" },
      { code: "28571", name: "Digital Marketing Technique", teacherCode: "MFH" },
      { code: "28572", name: "Network Administration & Services", teacherCode: "FH" },
      { code: "28573", name: "Cyber Security & Ethics", teacherCode: "FH" },
      { code: "28574", name: "Apps Development Project", teacherCode: "AAM" },
      { code: "28575", name: "Multimedia & Animation", teacherCode: "RK" },
      { code: "28576", name: "Project Work-II", teacherCode: "SU" },
    ],
    classes: [
      // SUN
      c("SUN", 2, 1, "28573", "FH", "2306"),
      c("SUN", 3, 1, "28572", "FH", "2306"),
      c("SUN", 4, 1, "28575", "RK", "1308"),
      c("SUN", 5, 3, "28576", "SU", "1308"),
      // MON
      c("MON", 2, 1, "25853", "JA", "2303"),
      c("MON", 3, 1, "28575", "RK", "2303"),
      c("MON", 4, 1, "28572", "FH", "2303"),
      c("MON", 5, 3, "28571", "MFH", "1305"),
      // TUE
      c("TUE", 1, 3, "28575", "RK", "1305"),
      c("TUE", 4, 1, "28572", "FH", "2305"),
      c("TUE", 5, 3, "28573", "FH", "1302"),
      // WED
      c("WED", 1, 3, "28576", "SU", "1308"),
      c("WED", 4, 1, "28571", "MFH", "1302"),
      c("WED", 5, 3, "28574", "AAM", "1302"),
      // THU
      c("THU", 1, 1, "25853", "JA", "2303"),
      c("THU", 2, 1, "28574", "AAM", "2303"),
      c("THU", 3, 1, "28573", "FH", "2303"),
      c("THU", 4, 1, "28571", "MFH", "2303"),
      c("THU", 5, 3, "28572", "FH", "1302"),
    ],
  },
];

export function getSemester(id: string): SemesterData {
  return SEMESTERS.find((s) => s.id === id) ?? SEMESTERS[0];
}

export function teacherByCode(code: string): Teacher | undefined {
  return TEACHERS.find((t) => t.code === code);
}

export function subjectByCode(sem: SemesterData, code: string): Subject | undefined {
  return sem.subjects.find((s) => s.code === code);
}

/** Convert "HH:MM" to minutes */
export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function todayDay(date = new Date()): Day | null {
  // JS: 0=Sun, 1=Mon ... 6=Sat
  const map: Record<number, Day | null> = {
    0: "SUN", 1: "MON", 2: "TUE", 3: "WED", 4: "THU",
    5: null, // Friday off
    6: "SAT",
  };
  return map[date.getDay()] ?? null;
}

export interface ClassStatus {
  current: ClassEntry | null;
  next: ClassEntry | null;
  remainingMs: number;
  totalMs: number;
  todaysClasses: ClassEntry[];
}

export function computeStatus(sem: SemesterData, now: Date): ClassStatus {
  const day = todayDay(now);
  if (!day) {
    return { current: null, next: null, remainingMs: 0, totalMs: 0, todaysClasses: [] };
  }
  const todays = sem.classes
    .filter((c) => c.day === day)
    .sort((a, b) => a.startPeriod - b.startPeriod);
  const minutesNow = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let current: ClassEntry | null = null;
  let next: ClassEntry | null = null;
  let remainingMs = 0;
  let totalMs = 0;

  for (const cls of todays) {
    const startP = PERIODS[cls.startPeriod - 1];
    const endP = PERIODS[cls.startPeriod + cls.span - 2];
    const s = toMin(startP.start);
    const e = toMin(endP.end);
    if (minutesNow >= s && minutesNow < e) {
      current = cls;
      remainingMs = (e - minutesNow) * 60_000;
      totalMs = (e - s) * 60_000;
    } else if (minutesNow < s && !next) {
      next = cls;
    }
  }
  return { current, next, remainingMs, totalMs, todaysClasses: todays };
}