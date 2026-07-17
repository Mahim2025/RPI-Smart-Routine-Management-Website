import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/cst/PageShell";
import { SemesterSwitcher } from "@/components/cst/SemesterSwitcher";
import { ShiftSwitcher } from "@/components/cst/ShiftSwitcher";
import { DepartmentSwitcher } from "@/components/cst/DepartmentSwitcher";
import { ComingSoon } from "@/components/cst/ComingSoon";
import { RoutineGrid } from "@/components/cst/RoutineGrid";
import {
  DEPARTMENT_LABEL,
  SEMESTERS,
  SHIFT_LABEL,
  getSemesterFor,
  type DepartmentId,
  type Shift,
} from "@/data/routine";

export const Route = createFileRoute("/weekly")({
  head: () => ({
    meta: [
      { title: "Weekly Routine · RPI SMART ROUTINE" },
      { name: "description", content: "Full weekly class routine across every department, shift and semester at Rajshahi Polytechnic Institute." },
      { property: "og:title", content: "Weekly Routine · RPI SMART ROUTINE" },
      { property: "og:description", content: "Sunday–Thursday weekly schedules for every department, both shifts and all semesters." },
    ],
  }),
  component: WeeklyPage,
});

function WeeklyPage() {
  const [dept, setDept] = useState<DepartmentId>("CT");
  const [shift, setShift] = useState<Shift>("1st");
  const [sem, setSem] = useState("5th");
  const semData = getSemesterFor(dept, shift, sem);
  return (
    <PageShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyber">Weekly Routine</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {DEPARTMENT_LABEL[dept]} · {SHIFT_LABEL[shift]}
            {semData ? ` · ${semData.label} · ${semData.classes.length} class slots · Load ${semData.load}` : ` · ${sem} Semester`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DepartmentSwitcher value={dept} onChange={setDept} />
          <ShiftSwitcher value={shift} onChange={setShift} />
          <SemesterSwitcher value={sem} onChange={setSem} shift={shift} dept={dept} />
        </div>
      </div>
      {semData ? (
        <>
          <RoutineGrid sem={semData} />
          <div className="glass rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Subjects in {semData.label} ({SHIFT_LABEL[shift]})
            </h2>
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
        </>
      ) : (
        <ComingSoon dept={dept} />
      )}
      <div className="text-[11px] text-muted-foreground text-center">
        Total Computer Technology semesters indexed across both shifts: {SEMESTERS.length}
      </div>
    </PageShell>
  );
}
