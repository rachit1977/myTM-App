"use client";

import { useEffect, useState } from "react";
import { Bell, Gift, AlertCircle, Megaphone, Trophy } from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";

type Toggle = {
  id: string;
  label: string;
  desc: string;
  icon: typeof Bell;
  enabled: boolean;
};

const initial: Toggle[] = [
  {
    id: "lucky_draw",
    label: "ลุ้นชิงโชค",
    desc: "อัปเดตสถานะการเข้าร่วมและประกาศผล",
    icon: Gift,
    enabled: true,
  },
  {
    id: "report",
    label: "แจ้งปัญหาสินค้า",
    desc: "เมื่อสถานะคำร้องของคุณเปลี่ยน",
    icon: AlertCircle,
    enabled: true,
  },
  {
    id: "promotion",
    label: "โปรโมชั่นและข่าวสาร",
    desc: "โปรโมชั่นและข่าวสารใหม่จาก myTM",
    icon: Megaphone,
    enabled: true,
  },
  {
    id: "winner",
    label: "ประกาศผู้โชคดี",
    desc: "เมื่อมีการประกาศรายชื่อผู้ได้รางวัล",
    icon: Trophy,
    enabled: false,
  },
  {
    id: "system",
    label: "การแจ้งเตือนระบบ",
    desc: "ข้อความสำคัญและประกาศจากระบบ",
    icon: Bell,
    enabled: true,
  },
];

const channels = [
  {
    id: "push",
    label: "การแจ้งเตือนในแอป",
    desc: "ส่งการแจ้งเตือนผ่านอุปกรณ์",
    enabled: true,
  },
  {
    id: "email",
    label: "อีเมล",
    desc: "ส่งสำเนาผ่านอีเมลที่ลงทะเบียน",
    enabled: false,
  },
  {
    id: "sms",
    label: "SMS",
    desc: "ส่งข้อความผ่าน SMS เมื่อสำคัญ",
    enabled: false,
  },
];

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-brand" : "bg-muted"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function NotificationSettingsPage() {
  const [items, setItems] = useState<Toggle[]>(initial);
  const [chs, setChs] = useState(channels);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const prefs = (data?.notificationPrefs ?? {}) as Record<string, boolean>;
        if (Object.keys(prefs).length === 0) return;
        setItems((prev) =>
          prev.map((it) => ({
            ...it,
            enabled: prefs[it.id] ?? it.enabled,
          }))
        );
        setChs((prev) =>
          prev.map((c) => ({
            ...c,
            enabled: prefs[`channel_${c.id}`] ?? c.enabled,
          }))
        );
      })
      .catch(() => {});
  }, []);

  const persist = (
    nextItems: Toggle[],
    nextChs: typeof channels
  ): void => {
    const prefs: Record<string, boolean> = {};
    nextItems.forEach((it) => (prefs[it.id] = it.enabled));
    nextChs.forEach((c) => (prefs[`channel_${c.id}`] = c.enabled));
    fetch("/api/preferences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationPrefs: prefs }),
    }).catch(() => {});
  };

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const next = prev.map((it) =>
        it.id === id ? { ...it, enabled: !it.enabled } : it
      );
      persist(next, chs);
      return next;
    });
    toast.success("อัปเดตการตั้งค่าเรียบร้อย");
  };

  const toggleChannel = (id: string) => {
    setChs((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, enabled: !c.enabled } : c
      );
      persist(items, next);
      return next;
    });
    toast.success("อัปเดตการตั้งค่าเรียบร้อย");
  };

  return (
    <>
      <AppBar title="การแจ้งเตือน" backHref="/profile" />
      <div className="px-4 py-4">
        <p className="mb-3 text-xs text-muted-foreground">
          เลือกประเภทการแจ้งเตือนที่ต้องการรับ
        </p>

        <h2 className="mb-2 mt-2 text-sm font-semibold">ประเภทการแจ้งเตือน</h2>
        <ul className="space-y-2">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li
                key={it.id}
                className="flex items-center gap-3 rounded-xl border bg-card p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{it.label}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {it.desc}
                  </p>
                </div>
                <Switch
                  checked={it.enabled}
                  onChange={() => toggleItem(it.id)}
                  label={it.label}
                />
              </li>
            );
          })}
        </ul>

        <h2 className="mb-2 mt-6 text-sm font-semibold">ช่องทางแจ้งเตือน</h2>
        <ul className="space-y-2">
          {chs.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-3 rounded-xl border bg-card p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{c.label}</p>
                <p className="text-[13px] text-muted-foreground">{c.desc}</p>
              </div>
              <Switch
                checked={c.enabled}
                onChange={() => toggleChannel(c.id)}
                label={c.label}
              />
            </li>
          ))}
        </ul>

        <p className="mt-6 rounded-xl bg-muted/40 p-3 text-[13px] leading-relaxed text-muted-foreground">
          ข้อความสำคัญและประกาศจากระบบที่จำเป็น
          จะยังคงถูกส่งให้แม้ปิดการแจ้งเตือน
        </p>
      </div>
    </>
  );
}
