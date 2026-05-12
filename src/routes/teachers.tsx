import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/cst/PageShell";
import { ShiftSwitcher } from "@/components/cst/ShiftSwitcher";
import { TEACHERS_BY_SHIFT, SEMESTERS_BY_SHIFT, SHIFT_LABEL, type Shift } from "@/data/routine";
import { Search, User } from "lucide-react";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Teacher Directory · CST" },
      { name: "description", content: "Directory of teachers in the CST Department, Rajshahi Polytechnic Institute (both shifts)." },
      { property: "og:title", content: "Teacher Directory · CST" },
      { property: "og:description", content: "Browse teachers and their assigned subjects across 1st and 2nd shift." },
    ],
  }),
  component: TeachersPage,
});

function TeachersPage() {
  const [shift, setShift] = useState<Shift>("1st");
  const [q, setQ] = useState("");
  const teachers = TEACHERS_BY_SHIFT[shift];
  const semesters = SEMESTERS_BY_SHIFT[shift];

  const enriched = useMemo(() => {
    return teachers.map((t) => {
      const subs: { code: string; name: string; semester: string }[] = [];
      for (const sem of semesters) {
        for (const s of sem.subjects) {
          if (s.teacherCode === t.code) subs.push({ code: s.code, name: s.name, semester: sem.id });
        }
      }
      return { ...t, subjects: subs };
    });
  }, [teachers, semesters]);

  const filtered = enriched.filter(
    (t) =>
      !q ||
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.code.toLowerCase().includes(q.toLowerCase()) ||
      t.subjects.some(
        (s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.code.toLowerCase().includes(q.toLowerCase()),
      ),
  );

  return (
    <PageShell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyber">Teacher Directory</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {teachers.length} faculty · CST · {SHIFT_LABEL[shift]}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ShiftSwitcher value={shift} onChange={setShift} />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, code or subject"
              className="pl-9 pr-3 py-2 rounded-lg glass border border-border focus:border-primary outline-none text-sm w-72 max-w-full"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.code} className="glass rounded-2xl p-5 border border-border hover:border-primary/60 hover:glow-cyan transition">
            <div className="flex items-center gap-3">
              <div className="size-12 grid place-items-center rounded-xl bg-primary/15 border border-primary/40 text-primary font-bold">
                {t.code}
              </div>
              <div className="min-w-0">
                <div className="text-base font-semibold text-foreground truncate flex items-center gap-1.5">
                  <User className="size-3.5 text-muted-foreground" />
                  {t.name}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {t.subjects.length} subject{t.subjects.length === 1 ? "" : "s"}
                </div>
              </div>
            </div>
            {t.subjects.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {t.subjects.map((s) => (
                  <li key={`${s.semester}-${s.code}`} className="flex items-center justify-between gap-2 text-xs rounded-md bg-card/60 border border-border px-2.5 py-1.5">
                    <span className="truncate text-foreground">{s.name}</span>
                    <span className="font-mono text-[10px] text-primary shrink-0">{s.code} · {s.semester}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No teachers match "{q}".
        </div>
      )}
    </PageShell>
  );
}
