import { useEffect, useState } from "react";

export function LiveClock({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  if (!now) return <div className="text-xs text-muted-foreground">…</div>;

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (compact) {
    return (
      <div className="text-right">
        <div className="font-mono text-sm text-primary tracking-wide">{time}</div>
        <div className="text-[10px] text-muted-foreground">{date}</div>
      </div>
    );
  }
  return (
    <div className="text-right">
      <div className="font-mono text-3xl sm:text-4xl text-gradient-cyber tracking-wider">
        {time}
      </div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">
        {date}
      </div>
    </div>
  );
}