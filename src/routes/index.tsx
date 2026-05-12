import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/cst/PageShell";
import { HeroBanner } from "@/components/cst/HeroBanner";
import { SemesterSwitcher } from "@/components/cst/SemesterSwitcher";
import { ActiveClassCard } from "@/components/cst/ActiveClassCard";
import { TodayList } from "@/components/cst/TodayList";
import { RoutineGrid } from "@/components/cst/RoutineGrid";
import { getSemester } from "@/data/routine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CST Smart Routine · Rajshahi Polytechnic (1st Shift)" },
      {
        name: "description",
        content:
          "Real-time class routine, active class tracking, and teacher directory for the Department of Computer Science & Technology, Rajshahi Polytechnic Institute (1st Shift).",
      },
      { property: "og:title", content: "CST Smart Routine — Rajshahi Polytechnic" },
      {
        property: "og:description",
        content:
          "Live academic dashboard for CST 1st Shift: 2nd, 3rd, 5th & 7th semester routines with real-time class detection.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [sem, setSem] = useState<string>("5th");
  const semData = getSemester(sem);

  return (
    <PageShell>
      <HeroBanner />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Viewing Semester
          </div>
          <h2 className="text-xl font-bold text-gradient-cyber mt-0.5">
            {semData.label}
          </h2>
        </div>
        <SemesterSwitcher value={sem} onChange={setSem} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ActiveClassCard sem={semData} />
        </div>
        <div>
          <TodayList sem={semData} />
        </div>
      </div>

      <section>
        <div className="flex items-end justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Weekly Overview</h3>
            <p className="text-xs text-muted-foreground">
              Sunday – Thursday · 7 periods
            </p>
          </div>
        </div>
        <RoutineGrid sem={semData} />
      </section>
    </PageShell>
  );
}
