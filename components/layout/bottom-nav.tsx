"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/home", label: "หน้าแรก", icon: Home },
  { href: "/products", label: "สินค้า", icon: Package },
  { href: "/profile", label: "บัญชี", icon: User },
  { href: "/contact", label: "ติดต่อ", icon: Phone },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-md safe-bottom"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {items.map((item) => {
          const active =
            item.href === "/home"
              ? pathname === "/home"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex h-16 min-h-[44px] flex-col items-center justify-center gap-0.5 text-xs transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    active && "scale-110"
                  )}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <span className={cn(active && "font-semibold")}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
