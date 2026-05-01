"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Camera,
  Bell,
  Lock,
  LogOut,
  Pencil,
  Save,
  X,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatThaiDate, initialsFrom, tierBadgeClass } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  phone: z
    .string()
    .min(9, "เบอร์โทรไม่ถูกต้อง")
    .regex(/^[0-9-]+$/, "เบอร์โทรต้องเป็นตัวเลขเท่านั้น"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
});

type FormValues = z.infer<typeof schema>;

type ProfileData = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  memberSince: string;
  points: number;
  tier: "Silver" | "Gold" | "Platinum";
};

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: ProfileData) => {
        setUser(data);
        reset({
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
        });
      })
      .catch(() => toast.error("โหลดข้อมูลโปรไฟล์ไม่สำเร็จ"))
      .finally(() => setLoading(false));
  }, [reset]);

  const displayAvatar = previewAvatar ?? user?.avatarUrl ?? null;

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setPendingAvatarFile(f);
      setPreviewAvatar(URL.createObjectURL(f));
    }
    e.target.value = "";
  };

  const onSubmit = async (data: FormValues) => {
    try {
      let avatarUrl: string | undefined;
      if (pendingAvatarFile) {
        const fd = new FormData();
        fd.append("file", pendingAvatarFile);
        fd.append("prefix", "avatars");
        const up = await fetch("/api/upload", { method: "POST", body: fd });
        if (!up.ok) throw new Error("upload failed");
        const blob = await up.json();
        avatarUrl = blob.url;
      }
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...(avatarUrl ? { avatarUrl } : {}) }),
      });
      if (!res.ok) throw new Error("save failed");
      const updated = await res.json();
      setUser(updated);
      setPendingAvatarFile(null);
      setPreviewAvatar(null);
      toast.success("บันทึกข้อมูลเรียบร้อย");
      setEditing(false);
    } catch {
      toast.error("บันทึกไม่สำเร็จ", { description: "ลองใหม่อีกครั้ง" });
    }
  };

  const onCancel = () => {
    if (user) {
      reset({
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
      });
    }
    setPendingAvatarFile(null);
    setPreviewAvatar(null);
    setEditing(false);
  };

  const onLogout = async () => {
    await signOut({ redirect: false });
    toast.success("ออกจากระบบแล้ว");
    // Hard reload clears any in-memory React state (lists, prefs, etc.)
    // so the next login starts with a clean slate.
    window.location.href = "/login";
  };

  if (loading || !user) {
    return (
      <>
        <AppBar title="บัญชี" />
        <div className="px-4 py-4">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-brand to-brand-700 p-6">
            <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
            <Skeleton className="h-5 w-40 bg-white/20" />
            <Skeleton className="h-3 w-56 bg-white/20" />
            <Skeleton className="h-6 w-28 bg-white/20" />
          </div>
          <div className="mt-5 space-y-4">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AppBar
        title="บัญชี"
        right={
          !editing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditing(true)}
              aria-label="แก้ไขข้อมูล"
            >
              <Pencil className="h-4 w-4" />
              แก้ไข
            </Button>
          )
        }
      />

      <div className="px-4 py-4">
        <div className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-brand to-brand-700 p-6 text-white">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-white/20 ring-2 ring-white/40">
              {displayAvatar ? (
                <Image
                  src={displayAvatar}
                  alt={user.fullName}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold tracking-wide">
                  {initialsFrom(user.fullName)}
                </div>
              )}
            </div>
            {editing && (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="เปลี่ยนรูปโปรไฟล์"
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-700 shadow-md ring-2 ring-brand active:scale-95"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickAvatar}
                />
              </>
            )}
          </div>
          <p className="mt-3 text-lg font-bold">{user.fullName}</p>
          <p className="text-xs opacity-90">{user.email}</p>
          <div className="mt-3 flex items-center gap-2">
            <Badge
              variant="secondary"
              className={`shadow-sm ${tierBadgeClass(user.tier)}`}
            >
              {user.tier} Member
            </Badge>
            <span className="text-xs opacity-90">
              {user.points.toLocaleString()} คะแนน
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 space-y-4"
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input
              id="fullName"
              disabled={!editing}
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
            <Input
              id="phone"
              inputMode="tel"
              disabled={!editing}
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              type="email"
              disabled={!editing}
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
            สมาชิกตั้งแต่ {formatThaiDate(user.memberSince)}
          </div>

          {editing && (
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onCancel}
              >
                <X className="h-4 w-4" />
                ยกเลิก
              </Button>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                <Save className="h-4 w-4" />
                บันทึก
              </Button>
            </div>
          )}
        </form>

        {!editing && (
          <div className="mt-6 space-y-2">
            <Link
              href="/notification-settings"
              className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-sm hover:bg-accent"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                <Bell className="h-4 w-4" />
              </div>
              <span className="flex-1">การแจ้งเตือน</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/privacy"
              className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-sm hover:bg-accent"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                <Lock className="h-4 w-4" />
              </div>
              <span className="flex-1">ความเป็นส่วนตัว</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-3 w-full text-destructive"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              ออกจากระบบ
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
