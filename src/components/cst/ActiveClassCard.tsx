import { useEffect, useState } from "react";
import {
  PERIODS_BY_SHIFT,
  computeStatus,
  subjectByCode,
  teacherByCode,
  type SemesterData,
} from "@/data/routine";
import { Clock, MapPin, User, Zap } from "lucide-react";

function fmtRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ActiveClassCard({ sem }: { sem: SemesterData }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  if (!now) return <div className="glass rounded-2xl p-6 h-48 animate-pulse" />;

  const status = computeStatus(sem, now);
  const cur = status.current;
  const nx = status.next;

  if (cur) {
    const subj = subjectByCode(sem, cur.subjectCode);
    const teacher = teacherByCode(sem.shift, cur.teacherCode);
    const periods = PERIODS_BY_SHIFT[sem.shift];
    const startP = periods[cur.startPeriod - 1];
    const endP = periods[cur.startPeriod + cur.span - 2];
    const progress = 1 - status.remainingMs / status.totalMs;

    return (
      <div className="relative glass rounded-2xl p-6 overflow-hidden border border-accent/40 animate-pulse-glow">
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-[0.2em] font-semibold">
            <Zap className="size-4" /> Live · Now Running
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold text-gradient-neon leading-tight">
            {subj?.name ?? cur.subjectCode}
          </div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">{cur.subjectCode}</div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <Info icon={<User className="size-4" />} label="Teacher" value={teacher?.name ?? cur.teacherCode} />
            <Info icon={<MapPin className="size-4" />} label="Room" value={cur.room} />
            <Info icon={<Clock className="size-4" />} label="Period" value={`${startP.start} – ${endP.end}`} />
          </div>
          <div className="mt-5">
            <div className="flex items-baseline justify-between text-xs text-muted-foreground mb-1.5">
              <span>Time remaining</span>
              <span className="font-mono text-accent text-base">{fmtRemaining(status.remainingMs)}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary transition-all"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (nx) {
    const subj = subjectByCode(sem, nx.subjectCode);
    const teacher = teacherByCode(sem.shift, nx.teacherCode);
    const startP = PERIODS_BY_SHIFT[sem.shift][nx.startPeriod - 1];
    return (
      <div className="glass rounded-2xl p-6 border border-primary/30 glow-blue">
        <div className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold flex items-center gap-2">
          <Clock className="size-4" /> Up Next
        </div>
        <div className="mt-3 text-2xl font-bold text-gradient-cyber">
          {subj?.name ?? nx.subjectCode}
        </div>
        <div className="mt-1 font-mono text-xs text-muted-foreground">{nx.subjectCode}</div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <Info icon={<User className="size-4" />} label="Teacher" value={teacher?.name ?? nx.teacherCode} />
          <Info icon={<MapPin className="size-4" />} label="Room" value={nx.room} />
          <Info icon={<Clock className="size-4" />} label="Starts" value={startP.start} />
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8 text-center border border-border">
      <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">No more classes today</div>
      <div className="mt-2 text-2xl font-bold text-gradient-cyber">All clear</div>
      <div className="mt-1 text-xs text-muted-foreground">Enjoy your day, see you tomorrow.</div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card/60 border border-border px-3 py-2">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-0.5 text-foreground font-medium truncate">{value}</div>
    </div>
  );
}