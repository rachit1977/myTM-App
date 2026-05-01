import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tierBadgeClass(
  tier: "Silver" | "Gold" | "Platinum" | string
): string {
  switch (tier) {
    case "Gold":
      return "bg-gradient-to-br from-amber-300 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-500";
    case "Silver":
      return "bg-gradient-to-br from-zinc-200 to-zinc-400 text-black hover:from-zinc-200 hover:to-zinc-400";
    case "Platinum":
      return "bg-gradient-to-br from-slate-100 to-slate-300 text-black hover:from-slate-100 hover:to-slate-300";
    default:
      return "bg-white/90 text-brand-700 hover:bg-white";
  }
}

export function initialsFrom(fullName: string): string {
  if (!fullName) return "?";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatThaiDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const months = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}
