import { CalendarHeart, Sparkles, Sun } from "lucide-react";

export function WeekendHoliday() {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  return (
    <section className="relative overflow-hidden rounded-3xl glass p-8 sm:p-12 scanline text-center">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-24 -right-24 size-72 rounded-full bg-accent/25 blur-3xl animate-float" />
      <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative size-20 grid place-items-center rounded-2xl glass border border-accent/50 glow-green">
          <CalendarHeart className="size-10 text-accent" />
          <Sparkles className="absolute -top-2 -right-2 size-5 text-primary animate-pulse" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/40 text-[10px] uppercase tracking-[0.25em] text-accent">
          <Sun className="size-3" /> {dayName} · Institute Closed
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
          <span className="text-gradient-neon">Weekend Holiday</span>
        </h2>
        <p className="text-base sm:text-lg font-semibold text-foreground">
          No Scheduled Classes
        </p>
        <p className="max-w-md text-sm text-muted-foreground">
          Enjoy your weekend! Regular routines resume on Sunday. Recharge,
          revise, and come back stronger.
        </p>
      </div>
    </section>
  );
}