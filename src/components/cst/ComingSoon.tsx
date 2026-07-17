import { Construction } from "lucide-react";
import { DEPARTMENT_LABEL, type DepartmentId } from "@/data/routine";

export function ComingSoon({
  dept,
  message,
}: {
  dept: DepartmentId;
  message?: string;
}) {
  return (
    <div className="relative overflow-hidden glass rounded-2xl p-8 sm:p-10 text-center border border-primary/30">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 size-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative flex flex-col items-center gap-3">
        <div className="size-14 grid place-items-center rounded-xl glass border border-primary/50 glow-cyan">
          <Construction className="size-7 text-primary" />
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary">
          Routine Coming Soon
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gradient-cyber">
          {DEPARTMENT_LABEL[dept]}
        </h3>
        <p className="max-w-md text-sm text-muted-foreground">
          {message ??
            "The routine for this department is being prepared and will be available shortly. In the meantime you can explore Computer Technology."}
        </p>
      </div>
    </div>
  );
}