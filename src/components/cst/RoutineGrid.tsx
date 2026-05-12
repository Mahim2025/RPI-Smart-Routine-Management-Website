import {
  DAYS,
  PERIODS,
  subjectByCode,
  type SemesterData,
  type ClassEntry,
  type Day,
  computeStatus,
} from "@/data/routine";
import { useEffect, useState } from "react";

export function RoutineGrid({ sem }: { sem: SemesterData }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(i);
  }, []);
  const current = now ? computeStatus(sem, now).current : null;

  const map: Record<Day, Record<number, ClassEntry | null>> = {} as never;
  for (const d of DAYS) {
    map[d] = {};
    for (let p = 1; p <= 7; p++) map[d][p] = null;
  }
  const skip: Record<string, true> = {};
  for (const c of sem.classes) {
    map[c.day][c.startPeriod] = c;
    for (let i = 1; i < c.span; i++) skip[`${c.day}-${c.startPeriod + i}`] = true;
  }

  return (
    <div className="glass rounded-2xl p-3 sm:p-4 overflow-x-auto">
      <table className="w-full min-w-[820px] border-separate border-spacing-1.5">
        <thead>
          <tr>
            <th className="text-[10px] uppercase tracking-wider text-muted-foreground p-2 text-left">
              Day
            </th>
            {PERIODS.map((p) => (
              <th
                key={p.index}
                className="text-[10px] uppercase tracking-wider text-muted-foreground p-2 text-center font-medium"
              >
                <div className="text-primary font-mono text-xs">P{p.index}</div>
                <div>{p.label}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["SUN", "MON", "TUE", "WED", "THU"] as Day[]).map((day) => (
            <tr key={day}>
              <td className="text-xs font-bold text-primary p-2">{day}</td>
              {Array.from({ length: 7 }, (_, i) => i + 1).map((p) => {
                if (skip[`${day}-${p}`]) return null;
                const cls = map[day][p];
                if (!cls) {
                  return (
                    <td key={p} className="rounded-md bg-card/30 border border-border/30 h-16" />
                  );
                }
                const subj = subjectByCode(sem, cls.subjectCode);
                const isCurrent = current === cls;
                return (
                  <td
                    key={p}
                    colSpan={cls.span}
                    className={`rounded-md p-2 align-top text-left transition ${
                      isCurrent
                        ? "bg-accent/15 border border-accent/60 glow-green"
                        : "bg-card/60 border border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-primary">{cls.subjectCode}</div>
                    <div className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                      {subj?.name ?? cls.subjectCode}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{cls.teacherCode}</span>
                      <span>·</span>
                      <span>{cls.room}</span>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}