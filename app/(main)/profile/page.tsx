"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { currentUser } from "@/lib/seed";
import { formatThaiDate } from "@/lib/utils";

const DEFAULT_AVATAR = "/profile-demo.png";

const schema = z.object({
  fullName: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  phone: z
    .string()
    .min(9, "เบอร์โทรไม่ถูกต้อง")
    .regex(/^[0-9-]+$/, "เบอร์โทรต้องเป็นตัวเลขเท่านั้น"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
});

type FormValues = z.infer<typeof schema>;

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(currentUser);
  const [avatar, setAvatar] = useState<string>(DEFAULT_AVATAR);
  const [savedAvatar, setSavedAvatar] = useState<string>(DEFAULT_AVATAR);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
    },
  });

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setAvatar(URL.createObjectURL(f));
    e.target.value = "";
  };

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setUser({ ...user, ...data });
    setSavedAvatar(avatar);
    toast.success("บันทึกข้อมูลเรียบร้อย");
    setEditing(false);
  };

  const onCancel = () => {
    reset();
    setAvatar(savedAvatar);
    setEditing(false);
  };

  const onLogout = () => {
    toast.success("ออกจากระบบแล้ว");
    router.push("/login");
  };

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
              <Image
                src={avatar}
                alt={user.fullName}
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
                unoptimized={avatar.startsWith("blob:")}
              />
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
              className="bg-gradient-to-br from-amber-300 to-yellow-500 text-white shadow-sm hover:from-amber-300 hover:to-yellow-500"
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
