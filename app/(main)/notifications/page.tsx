"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BellOff,
  CheckCheck,
  Gift,
  Megaphone,
  AlertCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { AppNotification, NotificationType } from "@/types";

const typeMeta: Record<
  NotificationType,
  { icon: typeof Gift; tone: string; label: string }
> = {
  lucky_draw: {
    icon: Gift,
    tone: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    label: "ลุ้นชิงโชค",
  },
  report: {
    icon: AlertCircle,
    tone: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
    label: "แจ้งปัญหา",
  },
  promotion: {
    icon: Megaphone,
    tone: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
    label: "โปรโมชั่น",
  },
  system: {
    icon: Sparkles,
    tone: "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
    label: "ระบบ",
  },
  winner: {
    icon: Trophy,
    tone: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300",
    label: "ผู้โชคดี",
  },
};

function formatRelative(iso: string) {
  const now = new Date();
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);
  if (diffMin < 1) return "เมื่อสักครู่";
  if (diffMin < 60) return `${diffMin} นาทีที่แล้ว`;
  if (diffHr < 24) return `${diffHr} ชั่วโมงที่แล้ว`;
  if (diffDay < 7) return `${diffDay} วันที่แล้ว`;
  return then.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .catch(() => toast.error("โหลดการแจ้งเตือนไม่สำเร็จ"))
      .finally(() => setLoading(false));
  }, []);

  const unreadCount = useMemo(
    () => items.filter((n) => !n.read).length,
    [items]
  );

  const sorted = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [items]
  );

  const markAllRead = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
  };

  const markRead = async (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <>
      <AppBar
        title="การแจ้งเตือน"
        right={
          unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllRead}
              aria-label="ทำเครื่องหมายอ่านทั้งหมด"
            >
              <CheckCheck className="h-4 w-4" />
              อ่านทั้งหมด
            </Button>
          )
        }
      />
      <div className="px-4 py-3">
        {unreadCount > 0 && (
          <p className="mb-3 text-xs text-muted-foreground">
            มี {unreadCount} รายการที่ยังไม่ได้อ่าน
          </p>
        )}

        {loading ? (
          <ul className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-2xl border bg-card p-3"
              >
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </li>
            ))}
          </ul>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed py-16 text-center text-sm text-muted-foreground">
            <BellOff className="h-8 w-8" />
            ยังไม่มีการแจ้งเตือน
          </div>
        ) : (
          <ul className="space-y-2">
            {sorted.map((n) => {
              const meta = typeMeta[n.type];
              const Icon = meta.icon;
              const inner = (
                <div
                  className={cn(
                    "relative flex gap-3 rounded-2xl border p-3 transition-colors",
                    n.read
                      ? "bg-card hover:bg-accent"
                      : "bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      meta.tone
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          "truncate text-sm",
                          n.read ? "font-medium" : "font-semibold"
                        )}
                      >
                        {n.title}
                      </p>
                      {!n.read && (
                        <span
                          aria-label="ยังไม่ได้อ่าน"
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand"
                        />
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {n.message}
                    </p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {formatRelative(n.createdAt)}
                    </p>
                  </div>
                </div>
              );
              return (
                <li key={n.id}>
                  {n.href ? (
                    <Link
                      href={n.href}
                      onClick={() => markRead(n.id)}
                      className="block"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => markRead(n.id)}
                      className="w-full text-left"
                    >
                      {inner}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
