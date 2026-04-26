"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/logo";

const schema = z.object({
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSent(data.email);
  };

  return (
    <div className="flex min-h-[80vh] flex-col">
      <Link
        href="/login"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับเข้าสู่ระบบ
      </Link>

      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo />
          <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
            {sent ? (
              <CheckCircle2 className="h-7 w-7" />
            ) : (
              <Mail className="h-7 w-7" />
            )}
          </div>
          <h1 className="text-2xl font-bold">
            {sent ? "ตรวจสอบอีเมลของคุณ" : "ลืมรหัสผ่าน?"}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {sent ? (
              <>
                เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง{" "}
                <span className="font-medium text-foreground">{sent}</span>{" "}
                แล้ว กรุณาตรวจสอบกล่องจดหมาย (รวมถึงโฟลเดอร์สแปม)
                และคลิกลิงก์เพื่อตั้งรหัสผ่านใหม่ภายใน 30 นาที
              </>
            ) : (
              <>
                ไม่ต้องกังวล กรอกอีเมลที่ใช้ลงทะเบียนด้านล่าง
                ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านไปให้ทางอีเมลของคุณ
              </>
            )}
          </p>
        </div>

        {sent ? (
          <div className="space-y-3">
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => setSent(null)}
            >
              ส่งอีกครั้งหรือใช้อีเมลอื่น
            </Button>
            <Button asChild size="lg" className="w-full">
              <Link href="/login">กลับไปหน้าเข้าสู่ระบบ</Link>
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              รีเซ็ตรหัสผ่าน
            </Button>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              หากไม่ได้รับอีเมลภายใน 5 นาที กรุณาตรวจโฟลเดอร์สแปม
              หรือติดต่อทีมงานที่ support@mytm.co.th
            </p>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          ยังไม่เป็นสมาชิก?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}
