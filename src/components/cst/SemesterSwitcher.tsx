import { SEMESTERS } from "@/data/routine";

export function SemesterSwitcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex glass rounded-xl p-1 gap-1">
      {SEMESTERS.map((s) => {
        const active = s.id === value;
        return (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              active
                ? "bg-primary text-primary-foreground glow-cyan"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.id}
          </button>
        );
      })}
    </div>
  );
}