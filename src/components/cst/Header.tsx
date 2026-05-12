import { Link, useLocation } from "@tanstack/react-router";
import { Cpu } from "lucide-react";
import { LiveClock } from "./LiveClock";

const NAV = [
  { to: "/", label: "Dashboard" },
  { to: "/weekly", label: "Weekly" },
  { to: "/teachers", label: "Teachers" },
];

export function Header() {
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap items-center gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative size-10 grid place-items-center rounded-lg bg-card neon-border">
            <Cpu className="size-5 text-primary" />
            <span className="absolute inset-0 rounded-lg ring-1 ring-primary/40 group-hover:ring-primary transition" />
          </div>
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Rajshahi Polytechnic Institute
            </div>
            <div className="text-sm sm:text-base font-bold text-gradient-cyber">
              CST · Smart Routine <span className="text-muted-foreground font-normal">/ 1st & 2nd Shift</span>
            </div>
          </div>
        </Link>

        <nav className="ml-auto flex items-center gap-1 text-sm">
          {NAV.map((n) => {
            const active = loc.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-1.5 rounded-md transition ${
                  active
                    ? "bg-primary/15 text-primary glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block">
          <LiveClock compact />
        </div>
      </div>
    </header>
  );
}