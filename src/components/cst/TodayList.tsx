import { useEffect, useState } from "react";
import {
  PERIODS,
  computeStatus,
  subjectByCode,
  toMin,
  type ClassEntry,
  type SemesterData,
} from "@/data/routine";
import { CheckCircle2, Circle, Radio } from "lucide-react";

export function TodayList({ sem }: { sem: SemesterData }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(i);
  }, []);

  if (!now) return <div className="glass rounded-2xl p-6 h-64 animate-pulse" />;
  const { todaysClasses, current } = computeStatus(sem, now);
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Today's Schedule</h3>
        <span className="text-xs text-muted-foreground">
          {todaysClasses.length} class{todaysClasses.length === 1 ? "" : "es"}
        </span>
      </div>
      {todaysClasses.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground">
          No classes scheduled today.
        </div>
      ) : (
        <ul className="space-y-2">
          {todaysClasses.map((cls, i) => (
            <Row key={i} cls={cls} sem={sem} minutesNow={minutesNow} isCurrent={current === cls} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Row({
  cls,
  sem,
  minutesNow,
  isCurrent,
}: {
  cls: ClassEntry;
  sem: SemesterData;
  minutesNow: number;
  isCurrent: boolean;
}) {
  const startP = PERIODS[cls.startPeriod - 1];
  const endP = PERIODS[cls.startPeriod + cls.span - 2];
  const ended = toMin(endP.end) <= minutesNow;
  const subj = subjectByCode(sem, cls.subjectCode);

  const status = isCurrent ? "active" : ended ? "done" : "upcoming";
  const styles =
    status === "active"
      ? "border-accent/60 bg-accent/10 glow-green"
      : status === "done"
        ? "border-border/40 opacity-50"
        : "border-highlight/30 bg-highlight/5";

  return (
    <li className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${styles}`}>
      <div className="font-mono text-xs text-muted-foreground w-24 shrink-0">
        {startP.start}–{endP.end}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">
          {subj?.name ?? cls.subjectCode}
        </div>
        <div className="text-[11px] text-muted-foreground">
          {cls.subjectCode} · {cls.teacherCode} · Room {cls.room}
        </div>
      </div>
      {status === "active" ? (
        <Radio className="size-4 text-accent animate-pulse" />
      ) : status === "done" ? (
        <CheckCircle2 className="size-4 text-muted-foreground" />
      ) : (
        <Circle className="size-4 text-highlight" />
      )}
    </li>
  );
}