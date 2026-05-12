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

export type Shift = "1st" | "2nd";
export const SHIFTS: Shift[] = ["1st", "2nd"];
export const SHIFT_LABEL: Record<Shift, string> = {
  "1st": "1st Shift",
  "2nd": "2nd Shift",
};

export interface Period {
  index: number;
  start: string;
  end: string;
  label: string;
}

export const PERIODS_BY_SHIFT: Record<Shift, Period[]> = {
  "1st": [
    { index: 1, start: "08:00", end: "08:45", label: "8:00 – 8:45" },
    { index: 2, start: "08:45", end: "09:30", label: "8:45 – 9:30" },
    { index: 3, start: "09:30", end: "10:15", label: "9:30 – 10:15" },
    { index: 4, start: "10:15", end: "11:00", label: "10:15 – 11:00" },
    { index: 5, start: "11:00", end: "11:45", label: "11:00 – 11:45" },
    { index: 6, start: "11:45", end: "12:30", label: "11:45 – 12:30" },
    { index: 7, start: "12:30", end: "13:15", label: "12:30 – 1:15" },
  ],
  "2nd": [
    { index: 1, start: "13:30", end: "14:15", label: "1:30 – 2:15" },
    { index: 2, start: "14:15", end: "15:00", label: "2:15 – 3:00" },
    { index: 3, start: "15:00", end: "15:45", label: "3:00 – 3:45" },
    { index: 4, start: "15:45", end: "16:30", label: "3:45 – 4:30" },
    { index: 5, start: "16:30", end: "17:15", label: "4:30 – 5:15" },
    { index: 6, start: "17:15", end: "18:00", label: "5:15 – 6:00" },
    { index: 7, start: "18:00", end: "18:45", label: "6:00 – 6:45" },
  ],
};

/** Back-compat — defaults to 1st shift periods. Prefer PERIODS_BY_SHIFT[shift]. */
export const PERIODS: Period[] = PERIODS_BY_SHIFT["1st"];

export interface Teacher {
  code: string;
  name: string;
}

export const TEACHERS_BY_SHIFT: Record<Shift, Teacher[]> = {
  "1st": [
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
    { code: "RS", name: "Rabeya Siddiqa" },
  ],
  "2nd": [
    { code: "AH", name: "Md. Anowarul Haque" },
    { code: "SU", name: "Md. Shakil Uddin" },
    { code: "MRR", name: "Md. Manzur Rahman Rabbi" },
    { code: "SI", name: "Md. Shahinul Islam" },
    { code: "SZ", name: "Md. Shaho Zaman" },
    { code: "NS", name: "Nilima Sultana" },
    { code: "MA", name: "Mohammad Ali" },
    { code: "NA", name: "Nasrin Akter" },
    { code: "KKH", name: "Kousik Kumar Halder" },
    { code: "AB", name: "Md. Abu Bakkar" },
    { code: "RH", name: "Md. Rezaul Haque" },
    { code: "AMP", name: "Physics-II Instructor" },
    { code: "SH", name: "Digital Electronics Instructor" },
    { code: "PT-3", name: "Math-III (Part-time)" },
    { code: "PT-4", name: "Innovation & Entrepreneurship (Part-time)" },
  ],
};

/** Back-compat — combined directory used by /teachers page. */
export const TEACHERS: Teacher[] = TEACHERS_BY_SHIFT["1st"];

export interface Subject {
  code: string;
  name: string;
  teacherCode: string;
}

export interface ClassEntry {
  day: Day;
  startPeriod: number;
  span: number;
  subjectCode: string;
  teacherCode: string;
  room: string;
}

export type SemesterId = "2nd" | "3rd" | "5th" | "7th";

export interface SemesterData {
  id: SemesterId;
  shift: Shift;
  label: string;
  load: number;
  subjects: Subject[];
  classes: ClassEntry[];
}

const c = (
  day: Day,
  startPeriod: number,
  span: number,
  subjectCode: string,
  teacherCode: string,
  room: string,
): ClassEntry => ({ day, startPeriod, span, subjectCode, teacherCode, room });

/* =========================================================
 * 1st SHIFT
 * ========================================================= */
const FIRST_SHIFT: SemesterData[] = [
  {
    id: "2nd", shift: "1st", label: "2nd Semester", load: 35,
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
      c("SUN", 1, 3, "28522", "RK", "1305"),
      c("SUN", 4, 1, "25722", "MN", "2302"),
      c("SUN", 5, 3, "25921", "PA", "2302"),
      c("MON", 1, 1, "25921", "PA", "2302"),
      c("MON", 2, 1, "25913", "SMK", "2302"),
      c("MON", 3, 1, "25721", "SN", "2302"),
      c("MON", 4, 1, "28521", "SU", "2302"),
      c("MON", 5, 3, "25812", "JR", "FIELD"),
      c("TUE", 1, 3, "25913", "SMK", "2102"),
      c("TUE", 4, 1, "25722", "MN", "2303"),
      c("TUE", 5, 1, "25921", "PA", "2303"),
      c("TUE", 6, 1, "28521", "SU", "2303"),
      c("TUE", 7, 1, "26811", "EH", "2303"),
      c("WED", 1, 1, "25913", "SMK", "5203"),
      c("WED", 2, 3, "26811", "EH", "5203"),
      c("WED", 5, 3, "28522", "RK", "1305"),
      c("THU", 1, 1, "25921", "PA", "2302"),
      c("THU", 2, 1, "26811", "EH", "2302"),
      c("THU", 3, 1, "25913", "SMK", "2302"),
      c("THU", 4, 1, "25721", "SN", "1308"),
      c("THU", 5, 3, "28521", "SU", "1308"),
    ],
  },
  {
    id: "3rd", shift: "1st", label: "3rd Semester", load: 35,
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
      c("SUN", 1, 1, "25922", "MNK", "2303"),
      c("SUN", 2, 1, "25811", "MM", "2303"),
      c("SUN", 3, 1, "28531", "SU", "2303"),
      c("SUN", 4, 1, "25931", "MI", "1302"),
      c("SUN", 6, 1, "28533", "AAM", "1302"),
      c("MON", 2, 1, "28533", "AAM", "1305"),
      c("MON", 4, 1, "26831", "MK", "1305"),
      c("MON", 5, 1, "25922", "MNK", "2302"),
      c("MON", 6, 1, "25931", "MI", "2302"),
      c("MON", 7, 1, "25811", "MM", "2302"),
      c("TUE", 2, 1, "28531", "SU", "2302"),
      c("TUE", 4, 1, "28533", "AAM", "2302"),
      c("TUE", 6, 1, "25931", "MI", "2302"),
      c("WED", 1, 1, "28533", "AAM", "2302"),
      c("WED", 3, 1, "25922", "MNK", "2106"),
      c("WED", 4, 1, "25931", "MI", "2302"),
      c("WED", 6, 1, "28531", "SU", "2302"),
      c("WED", 7, 1, "26831", "MK", "2302"),
      c("THU", 1, 1, "25922", "MNK", "1305"),
      c("THU", 3, 1, "28532", "RK", "1305"),
      c("THU", 7, 1, "26831", "MK", "5201"),
    ],
  },
  {
    id: "5th", shift: "1st", label: "5th Semester", load: 34,
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
      c("SUN", 1, 1, "28522", "SU", "2302"),
      c("SUN", 2, 1, "25841", "JA", "2302"),
      c("SUN", 3, 1, "28553", "AAM", "2302"),
      c("SUN", 4, 1, "28554", "MFH", "1305"),
      c("SUN", 5, 3, "28555", "RK", "1305"),
      c("MON", 1, 3, "28552", "SU", "1302"),
      c("MON", 4, 1, "28554", "MFH", "1302"),
      c("MON", 5, 3, "28551", "FH", "1302"),
      c("TUE", 1, 1, "28554", "MFH", "2302"),
      c("TUE", 2, 1, "28551", "FH", "2302"),
      c("TUE", 3, 1, "28553", "AAM", "2302"),
      c("TUE", 4, 1, "28555", "RK", "1305"),
      c("TUE", 5, 3, "28556", "AAM", "1305"),
      c("WED", 1, 3, "28554", "MFH", "1305"),
      c("WED", 4, 1, "28553", "AAM", "2303"),
      c("WED", 5, 1, "25841", "JA", "2303"),
      c("WED", 6, 1, "28551", "FH", "2303"),
      c("THU", 1, 1, "28555", "RK", "1302"),
      c("THU", 2, 3, "28552", "SU", "1302"),
      c("THU", 5, 3, "28553", "AAM", "1305"),
    ],
  },
  {
    id: "7th", shift: "1st", label: "7th Semester", load: 33,
    subjects: [
      { code: "25853", name: "Innovation & Entrepreneurship", teacherCode: "RS" },
      { code: "28571", name: "Digital Marketing Technique", teacherCode: "MFH" },
      { code: "28572", name: "Network Administration & Services", teacherCode: "FH" },
      { code: "28573", name: "Cyber Security & Ethics", teacherCode: "FH" },
      { code: "28574", name: "Apps Development Project", teacherCode: "AAM" },
      { code: "28575", name: "Multimedia & Animation", teacherCode: "RK" },
      { code: "28576", name: "Project Work-II", teacherCode: "SU" },
    ],
    classes: [
      c("SUN", 2, 1, "28573", "FH", "2306"),
      c("SUN", 3, 1, "28572", "FH", "2306"),
      c("SUN", 4, 1, "28575", "RK", "1308"),
      c("SUN", 5, 3, "28576", "SU", "1308"),
      c("MON", 2, 1, "25853", "RS", "2303"),
      c("MON", 3, 1, "28575", "RK", "2303"),
      c("MON", 4, 1, "28572", "FH", "2303"),
      c("MON", 5, 3, "28571", "MFH", "1305"),
      c("TUE", 1, 3, "28575", "RK", "1305"),
      c("TUE", 4, 1, "28572", "FH", "2305"),
      c("TUE", 5, 3, "28573", "FH", "1302"),
      c("WED", 1, 3, "28576", "SU", "1308"),
      c("WED", 4, 1, "28571", "MFH", "1302"),
      c("WED", 5, 3, "28574", "AAM", "1302"),
      c("THU", 1, 1, "25853", "RS", "2303"),
      c("THU", 2, 1, "28574", "AAM", "2303"),
      c("THU", 3, 1, "28573", "FH", "2303"),
      c("THU", 4, 1, "28571", "MFH", "2303"),
      c("THU", 5, 3, "28572", "FH", "1302"),
    ],
  },
];

/* =========================================================
 * 2nd SHIFT
 * ========================================================= */
const SECOND_SHIFT: SemesterData[] = [
  {
    id: "2nd", shift: "2nd", label: "2nd Semester", load: 35,
    subjects: [
      { code: "25721", name: "Bangla-II", teacherCode: "MRR" },
      { code: "25722", name: "English-II", teacherCode: "NS" },
      { code: "25812", name: "Physical Education & Life Skills", teacherCode: "NS" },
      { code: "25913", name: "Chemistry", teacherCode: "AH" },
      { code: "25921", name: "Mathematics-II", teacherCode: "SU" },
      { code: "28521", name: "Python Programming", teacherCode: "SI" },
      { code: "28522", name: "Computer Graphics Design-I", teacherCode: "SI" },
      { code: "26811", name: "Basic Electronics", teacherCode: "SZ" },
    ],
    classes: [
      c("SUN", 1, 1, "25913", "AH", "2303"),
      c("SUN", 2, 1, "25921", "SU", "2303"),
      c("SUN", 3, 1, "25721", "MRR", "2303"),
      c("SUN", 4, 2, "28522", "SI", "1308"),
      c("SUN", 7, 1, "26811", "SZ", "1308"),
      c("MON", 1, 1, "25921", "SU", "2303"),
      c("MON", 2, 1, "25722", "NS", "2303"),
      c("MON", 3, 1, "25721", "MRR", "2303"),
      c("MON", 4, 1, "28521", "SI", "2303"),
      c("MON", 5, 3, "25913", "AH", "2102"),
      c("TUE", 1, 1, "25722", "NS", "2303"),
      c("TUE", 2, 3, "28522", "SI", "1308"),
      c("TUE", 5, 1, "26811", "SZ", "2303"),
      c("TUE", 6, 1, "25921", "SU", "2303"),
      c("TUE", 7, 1, "25913", "AH", "2303"),
      c("WED", 1, 1, "28521", "SI", "1308"),
      c("WED", 2, 3, "25921", "SU", "2306"),
      c("WED", 5, 3, "26811", "SZ", "5202"),
      c("THU", 1, 1, "25913", "AH", "2302"),
      c("THU", 2, 3, "28521", "SI", "1308"),
      c("THU", 5, 3, "25812", "NS", "FIELD"),
    ],
  },
  {
    id: "3rd", shift: "2nd", label: "3rd Semester", load: 35,
    subjects: [
      { code: "25811", name: "Social Science", teacherCode: "MRR" },
      { code: "25922", name: "Physics-II", teacherCode: "AMP" },
      { code: "25931", name: "Mathematics-III", teacherCode: "PT-3" },
      { code: "28531", name: "Application Development Using Python", teacherCode: "SI" },
      { code: "28532", name: "Computer Graphics Design-II", teacherCode: "SI" },
      { code: "28533", name: "IT Support Services", teacherCode: "KKH" },
      { code: "26831", name: "Digital Electronics-I", teacherCode: "SH" },
    ],
    classes: [
      c("SUN", 1, 1, "25931", "PT-3", "2306"),
      c("SUN", 2, 1, "25811", "MRR", "2306"),
      c("SUN", 3, 1, "28531", "SI", "2306"),
      c("SUN", 4, 1, "25922", "AMP", "1305"),
      c("SUN", 6, 1, "28533", "KKH", "1305"),
      c("MON", 1, 1, "28533", "KKH", "2302"),
      c("MON", 3, 1, "26831", "SH", "5202"),
      c("MON", 6, 1, "28532", "SI", "1308"),
      c("TUE", 1, 1, "25931", "PT-3", "1305"),
      c("TUE", 3, 1, "28533", "KKH", "1305"),
      c("TUE", 5, 1, "26831", "SH", "2302"),
      c("TUE", 6, 1, "25922", "AMP", "2302"),
      c("TUE", 7, 1, "28531", "SI", "2302"),
      c("WED", 1, 1, "28533", "KKH", "1305"),
      c("WED", 3, 1, "28531", "SI", "1308"),
      c("WED", 6, 1, "25931", "PT-3", "2303"),
      c("THU", 2, 1, "25922", "AMP", "2106"),
      c("THU", 4, 1, "26831", "SH", "2303"),
      c("THU", 5, 1, "25922", "AMP", "2303"),
      c("THU", 6, 1, "25931", "PT-3", "2303"),
      c("THU", 7, 1, "25811", "MRR", "2303"),
    ],
  },
  {
    id: "5th", shift: "2nd", label: "5th Semester", load: 34,
    subjects: [
      { code: "25841", name: "Accounting", teacherCode: "RH" },
      { code: "28551", name: "Application Development Using Java", teacherCode: "SI" },
      { code: "28552", name: "Web Design & Development-II", teacherCode: "AB" },
      { code: "28553", name: "Computer Architecture & Microprocessor", teacherCode: "NA" },
      { code: "28554", name: "Data Communication", teacherCode: "KKH" },
      { code: "28555", name: "Operating System", teacherCode: "MA" },
      { code: "28556", name: "Project Work-I", teacherCode: "MA" },
    ],
    classes: [
      c("SUN", 1, 1, "28555", "MA", "2302"),
      c("SUN", 2, 1, "28551", "SI", "2302"),
      c("SUN", 3, 1, "28553", "NA", "2302"),
      c("SUN", 4, 1, "28554", "KKH", "2302"),
      c("SUN", 6, 1, "28552", "AB", "1302"),
      c("MON", 2, 1, "28551", "SI", "1308"),
      c("MON", 4, 1, "28554", "KKH", "2302"),
      c("MON", 6, 1, "28553", "NA", "1302"),
      c("TUE", 2, 1, "28552", "AB", "1302"),
      c("TUE", 4, 1, "25841", "RH", "2303"),
      c("TUE", 6, 1, "28555", "MA", "1305"),
      c("WED", 1, 1, "28555", "MA", "2303"),
      c("WED", 2, 1, "28553", "NA", "2303"),
      c("WED", 3, 1, "28554", "KKH", "2303"),
      c("WED", 4, 1, "25841", "RH", "2303"),
      c("WED", 6, 1, "28556", "MA", "1305"),
      c("THU", 2, 1, "28554", "KKH", "1305"),
      c("THU", 4, 1, "28552", "AB", "2302"),
      c("THU", 5, 1, "28553", "NA", "2302"),
      c("THU", 6, 1, "28551", "SI", "2302"),
    ],
  },
  {
    id: "7th", shift: "2nd", label: "7th Semester", load: 33,
    subjects: [
      { code: "25853", name: "Innovation & Entrepreneurship", teacherCode: "PT-4" },
      { code: "28571", name: "Digital Marketing Technique", teacherCode: "AB" },
      { code: "28572", name: "Network Administration & Services", teacherCode: "KKH" },
      { code: "28573", name: "Cyber Security & Ethics", teacherCode: "NA" },
      { code: "28574", name: "Apps Development Project", teacherCode: "AB" },
      { code: "28575", name: "Multimedia & Animation", teacherCode: "MA" },
      { code: "28576", name: "Project Work-II", teacherCode: "AB" },
    ],
    classes: [
      c("SUN", 2, 1, "28571", "AB", "1308"),
      c("SUN", 4, 1, "25853", "PT-4", "2303"),
      c("SUN", 5, 1, "28575", "MA", "2303"),
      c("SUN", 6, 1, "28573", "NA", "2303"),
      c("MON", 2, 1, "28572", "KKH", "1302"),
      c("MON", 4, 1, "28571", "AB", "1305"),
      c("MON", 6, 1, "28576", "AB", "1305"),
      c("TUE", 1, 1, "28572", "KKH", "2302"),
      c("TUE", 2, 1, "28573", "NA", "2302"),
      c("TUE", 3, 1, "28575", "MA", "2302"),
      c("TUE", 4, 1, "28574", "AB", "2302"),
      c("TUE", 6, 1, "28573", "NA", "1302"),
      c("WED", 2, 1, "28574", "AB", "1302"),
      c("WED", 4, 1, "28571", "AB", "2302"),
      c("WED", 5, 1, "28572", "KKH", "2302"),
      c("WED", 6, 1, "25853", "PT-4", "2302"),
      c("THU", 2, 1, "28575", "MA", "1302"),
      c("THU", 4, 1, "28572", "KKH", "1305"),
      c("THU", 6, 1, "28576", "AB", "1305"),
    ],
  },
];

export const SEMESTERS_BY_SHIFT: Record<Shift, SemesterData[]> = {
  "1st": FIRST_SHIFT,
  "2nd": SECOND_SHIFT,
};

/** All semesters across all shifts. */
export const SEMESTERS: SemesterData[] = [...FIRST_SHIFT, ...SECOND_SHIFT];

export function getSemester(shift: Shift, id: string): SemesterData {
  const list = SEMESTERS_BY_SHIFT[shift];
  return list.find((s) => s.id === id) ?? list[0];
}

export function teacherByCode(shift: Shift, code: string): Teacher | undefined {
  return TEACHERS_BY_SHIFT[shift].find((t) => t.code === code);
}

export function subjectByCode(sem: SemesterData, code: string): Subject | undefined {
  return sem.subjects.find((s) => s.code === code);
}

export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function todayDay(date = new Date()): Day | null {
  const map: Record<number, Day | null> = {
    0: "SUN", 1: "MON", 2: "TUE", 3: "WED", 4: "THU",
    5: null,
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
  const periods = PERIODS_BY_SHIFT[sem.shift];
  const todays = sem.classes
    .filter((c) => c.day === day)
    .sort((a, b) => a.startPeriod - b.startPeriod);
  const minutesNow = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let current: ClassEntry | null = null;
  let next: ClassEntry | null = null;
  let remainingMs = 0;
  let totalMs = 0;

  for (const cls of todays) {
    const startP = periods[cls.startPeriod - 1];
    const endP = periods[cls.startPeriod + cls.span - 2];
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
