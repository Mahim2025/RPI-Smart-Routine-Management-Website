import { SHIFTS, SHIFT_LABEL, type Shift } from "@/data/routine";

export function ShiftSwitcher({
  value,
  onChange,
}: {
  value: Shift;
  onChange: (v: Shift) => void;
}) {
  return (
    <div className="inline-flex glass rounded-xl p-1 gap-1">
      {SHIFTS.map((s) => {
        const active = s === value;
        return (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
              active
                ? "bg-accent text-accent-foreground glow-green"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {SHIFT_LABEL[s]}
          </button>
        );
      })}
    </div>
  );
}
