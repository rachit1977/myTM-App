import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
        <span className="text-lg font-bold tracking-tight">TM</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold text-foreground">myTM</span>
        <span className="text-[11px] text-muted-foreground">
          สำหรับสมาชิก
        </span>
      </div>
    </div>
  );
}
