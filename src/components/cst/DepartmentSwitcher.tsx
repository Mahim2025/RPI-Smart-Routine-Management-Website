import { DEPARTMENTS, type DepartmentId } from "@/data/routine";

export function DepartmentSwitcher({
  value,
  onChange,
}: {
  value: DepartmentId;
  onChange: (v: DepartmentId) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DepartmentId)}
        className="appearance-none glass rounded-xl border border-border focus:border-primary outline-none text-xs sm:text-sm font-semibold text-foreground px-4 py-2 pr-9 cursor-pointer hover:border-primary/60 transition"
      >
        {DEPARTMENTS.map((d) => (
          <option key={d.id} value={d.id} className="bg-background text-foreground">
            {d.name}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary text-xs">
        ▾
      </span>
    </div>
  );
}