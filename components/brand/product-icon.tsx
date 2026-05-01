import {
  Flame,
  LayoutGrid,
  Square,
  CircleDashed,
  Columns2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductSlug } from "@/types";

const map: Record<
  ProductSlug,
  { icon: LucideIcon; bg: string; fg: string }
> = {
  lighter: {
    icon: Flame,
    bg: "bg-orange-100 dark:bg-orange-950/50",
    fg: "text-orange-600 dark:text-orange-300",
  },
  merrybright: {
    icon: LayoutGrid,
    bg: "bg-sky-100 dark:bg-sky-950/50",
    fg: "text-sky-600 dark:text-sky-300",
  },
  merrysponge: {
    icon: Square,
    bg: "bg-yellow-100 dark:bg-yellow-950/50",
    fg: "text-yellow-700 dark:text-yellow-300",
  },
  "stainless-scrub": {
    icon: CircleDashed,
    bg: "bg-zinc-200 dark:bg-zinc-800/80",
    fg: "text-zinc-700 dark:text-zinc-200",
  },
  "merrybright-twins": {
    icon: Columns2,
    bg: "bg-emerald-100 dark:bg-emerald-950/50",
    fg: "text-emerald-700 dark:text-emerald-300",
  },
};

export function ProductIcon({
  slug,
  className,
  size = "md",
}: {
  slug: ProductSlug | string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const cfg = map[slug as ProductSlug] ?? {
    icon: Square,
    bg: "bg-muted",
    fg: "text-muted-foreground",
  };
  const Icon = cfg.icon;
  const dim =
    size === "sm" ? "h-10 w-10" : size === "lg" ? "h-20 w-20" : "h-14 w-14";
  const iconDim =
    size === "sm" ? "h-5 w-5" : size === "lg" ? "h-10 w-10" : "h-7 w-7";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        cfg.bg,
        dim,
        className
      )}
    >
      <Icon className={cn(iconDim, cfg.fg)} strokeWidth={1.8} />
    </div>
  );
}
