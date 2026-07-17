import {
  ALL_SEMESTER_IDS,
  availableSemestersFor,
  type DepartmentId,
  type Shift,
} from "@/data/routine";

export function SemesterSwitcher({
  value,
  onChange,
  shift,
  dept,
}: {
  value: string;
  onChange: (v: string) => void;
  shift: Shift;
  dept: DepartmentId;
}) {
  const available = new Set(availableSemestersFor(dept, shift));
  return (
    <div className="inline-flex glass rounded-xl p-1 gap-1 flex-wrap">
      {ALL_SEMESTER_IDS.map((s) => {
        const active = s === value;
        const enabled = available.has(s);
        return (
          <button
            key={s}
            onClick={() => onChange(s)}
            title={enabled ? `${s} Semester` : `${s} Semester · coming soon`}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              active
                ? "bg-primary text-primary-foreground glow-cyan"
                : enabled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-muted-foreground/40 hover:text-muted-foreground"
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}