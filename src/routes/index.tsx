import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/cst/PageShell";
import { HeroBanner } from "@/components/cst/HeroBanner";
import { SemesterSwitcher } from "@/components/cst/SemesterSwitcher";
import { ShiftSwitcher } from "@/components/cst/ShiftSwitcher";
import { DepartmentSwitcher } from "@/components/cst/DepartmentSwitcher";
import { WeekendHoliday } from "@/components/cst/WeekendHoliday";
import { ComingSoon } from "@/components/cst/ComingSoon";
import { ActiveClassCard } from "@/components/cst/ActiveClassCard";
import { TodayList } from "@/components/cst/TodayList";
import { RoutineGrid } from "@/components/cst/RoutineGrid";
import {
  DEPARTMENT_LABEL,
  SHIFT_LABEL,
  getSemesterFor,
  isWeekend,
  type DepartmentId,
  type Shift,
} from "@/data/routine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RPI SMART ROUTINE · Rajshahi Polytechnic Institute" },
      {
        name: "description",
        content:
          "Real-time class routine, active class tracking, and teacher directory for every department of Rajshahi Polytechnic Institute (1st & 2nd Shift).",
      },
      { property: "og:title", content: "RPI SMART ROUTINE — Rajshahi Polytechnic Institute" },
      {
        property: "og:description",
        content:
          "Live academic dashboard for RPI: department, shift and semester routines with real-time class detection.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [dept, setDept] = useState<DepartmentId>("CT");
  const [shift, setShift] = useState<Shift>("1st");
  const [sem, setSem] = useState<string>("5th");
  const semData = getSemesterFor(dept, shift, sem);

  const [weekend, setWeekend] = useState(false);
  useEffect(() => {
    setWeekend(isWeekend(new Date()));
    const i = setInterval(() => setWeekend(isWeekend(new Date())), 60_000);
    return () => clearInterval(i);
  }, []);

  return (
    <PageShell>
      <HeroBanner />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Viewing
          </div>
          <h2 className="text-xl font-bold text-gradient-cyber mt-0.5">
            {DEPARTMENT_LABEL[dept]}
            <span className="text-muted-foreground font-normal">
              {" · "}
              {SHIFT_LABEL[shift]}
              {semData ? ` · ${semData.label}` : ` · ${sem} Semester`}
            </span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <DepartmentSwitcher value={dept} onChange={setDept} />
          <ShiftSwitcher value={shift} onChange={setShift} />
          <SemesterSwitcher value={sem} onChange={setSem} shift={shift} dept={dept} />
        </div>
      </div>

      {weekend ? (
        <WeekendHoliday />
      ) : !semData ? (
        <ComingSoon dept={dept} />
      ) : (
        <>
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
                  Sunday – Thursday · 7 periods · {SHIFT_LABEL[shift]}
                </p>
              </div>
            </div>
            <RoutineGrid sem={semData} />
          </section>
        </>
      )}
    </PageShell>
  );
}
