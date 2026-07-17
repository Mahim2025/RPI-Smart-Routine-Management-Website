import { LiveClock } from "./LiveClock";
import { todayDay, DAY_FULL } from "@/data/routine";
import { useEffect, useState } from "react";

export function HeroBanner() {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    setDate(new Date());
    const i = setInterval(() => setDate(new Date()), 60_000);
    return () => clearInterval(i);
  }, []);
  const day = date ? todayDay(date) : null;

  return (
    <section className="relative overflow-hidden rounded-3xl glass p-6 sm:p-10 scanline">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-32 -right-32 size-80 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -left-32 size-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/40 text-[10px] uppercase tracking-[0.25em] text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Academic Session 2025–26 · Live
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
            <span className="text-gradient-cyber">RPI SMART ROUTINE</span>
            <br />
            <span className="text-foreground">Institute-wide Class Portal</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            Real-time class tracking, smart schedule visualization & teacher
            directory for every department of{" "}
            <span className="text-primary">Rajshahi Polytechnic Institute · 1st & 2nd Shift</span>.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <LiveClock />
          {day && (
            <div className="px-3 py-1 rounded-lg glass border border-primary/40 text-xs text-primary font-mono">
              {DAY_FULL[day]}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
