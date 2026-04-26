import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  backHref?: string;
  right?: React.ReactNode;
  className?: string;
}

export function AppBar({
  title,
  showBack = true,
  backHref = "/home",
  right,
  className,
}: AppBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/95 px-2 backdrop-blur-md",
        className
      )}
    >
      {showBack ? (
        <Link
          href={backHref}
          aria-label="กลับหน้าหลัก"
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-accent active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
      ) : (
        <div className="w-2" />
      )}
      <h1 className="flex-1 truncate text-base font-semibold">{title}</h1>
      <div className="flex items-center gap-1">{right}</div>
    </header>
  );
}
