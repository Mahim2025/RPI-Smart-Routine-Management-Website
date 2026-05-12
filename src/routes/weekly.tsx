import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/cst/PageShell";
import { SemesterSwitcher } from "@/components/cst/SemesterSwitcher";
import { ShiftSwitcher } from "@/components/cst/ShiftSwitcher";
import { RoutineGrid } from "@/components/cst/RoutineGrid";
import { getSemester, SEMESTERS, SHIFT_LABEL, type Shift } from "@/data/routine";

export const Route = createFileRoute("/weekly")({
  head: () => ({
    meta: [
      { title: "Weekly Routine · CST 1st & 2nd Shift" },
      { name: "description", content: "Full weekly class routine for CST across both shifts and all semesters." },
      { property: "og:title", content: "Weekly Routine · CST" },
      { property: "og:description", content: "Sunday–Thursday weekly schedules for 2nd, 3rd, 5th and 7th semester (both shifts)." },
    ],
  }),
  component: WeeklyPage,
});

function WeeklyPage() {
  const [shift, setShift] = useState<Shift>("1st");
  const [sem, setSem] = useState("5th");
  const semData = getSemester(shift, sem);
  return (
    <PageShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyber">Weekly Routine</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {semData.label} · {SHIFT_LABEL[shift]} · {semData.classes.length} class slots · Load {semData.load}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ShiftSwitcher value={shift} onChange={setShift} />
          <SemesterSwitcher value={sem} onChange={setSem} shift={shift} />
        </div>
      </div>
      <RoutineGrid sem={semData} />
      <div className="glass rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">Subjects in {semData.label} ({SHIFT_LABEL[shift]})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {semData.subjects.map((s) => (
            <div key={s.code} className="rounded-lg border border-border bg-card/50 p-3">
              <div className="font-mono text-[11px] text-primary">{s.code}</div>
              <div className="text-sm font-semibold text-foreground">{s.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Teacher: {s.teacherCode}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[11px] text-muted-foreground text-center">
        Total semesters indexed across both shifts: {SEMESTERS.length}
      </div>
    </PageShell>
  );
}
