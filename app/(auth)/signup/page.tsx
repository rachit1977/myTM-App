"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/brand/logo";

const schema = z
  .object({
    fullName: z
      .string()
      .min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร")
      .max(60, "ชื่อยาวเกินไป"),
    phone: z
      .string()
      .min(9, "เบอร์โทรไม่ถูกต้อง")
      .regex(/^[0-9-]+$/, "เบอร์โทรต้องเป็นตัวเลขเท่านั้น"),
    email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
    password: z
      .string()
      .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
      .regex(/[A-Za-z]/, "ต้องมีตัวอักษร")
      .regex(/[0-9]/, "ต้องมีตัวเลข"),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "กรุณายอมรับข้อกำหนด" }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน",
  });

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: undefined as unknown as true,
    },
  });

  const accepted = watch("acceptTerms");

  const onSubmit = async (_: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("สมัครสมาชิกสำเร็จ", { description: "ยินดีต้อนรับสู่ myTM" });
    router.push("/home");
  };

  return (
    <div className="flex min-h-[80vh] flex-col">
      <div className="mb-6 flex items-center justify-between">
        <Logo />
        <Link
          href="/login"
          className="text-xs font-medium text-primary hover:underline"
        >
          เข้าสู่ระบบ
        </Link>
      </div>

      <h1 className="mb-1 text-2xl font-bold">สมัครสมาชิก</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        กรอกข้อมูลด้านล่างเพื่อสมัครสมาชิก myTM
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
          <Input
            id="fullName"
            placeholder="เช่น สมชาย ใจดี"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
          <Input
            id="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="081-234-5678"
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
            inputMode="email"
            autoComplete="email"
            placeholder="name@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">รหัสผ่าน</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              autoComplete="new-password"
              placeholder="อย่างน้อย 8 ตัวอักษร มีทั้งตัวอักษรและตัวเลข"
              aria-invalid={!!errors.password}
              {...register("password")}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
            >
              {showPwd ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPwd ? "text" : "password"}
              autoComplete="new-password"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPwd((v) => !v)}
              aria-label={showConfirmPwd ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
            >
              {showConfirmPwd ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-accent/50 p-3">
          <Checkbox
            id="acceptTerms"
            checked={!!accepted}
            onCheckedChange={(c) =>
              setValue("acceptTerms", c === true ? (true as const) : (false as unknown as true), {
                shouldValidate: true,
              })
            }
            className="mt-0.5"
          />
          <div className="flex-1">
            <Label
              htmlFor="acceptTerms"
              className="cursor-pointer text-sm font-normal leading-relaxed"
            >
              ยอมรับ{" "}
              <Link
                href="/terms?from=signup"
                className="font-medium text-primary hover:underline"
              >
                ข้อกำหนดและเงื่อนไข
              </Link>{" "}
              และ{" "}
              <Link
                href="/privacy-policy?from=signup"
                className="font-medium text-primary hover:underline"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
            </Label>
            {errors.acceptTerms && (
              <p className="mt-1 text-xs text-destructive">
                {errors.acceptTerms.message as string}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          สมัครสมาชิก
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        มีบัญชีอยู่แล้ว?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          เข้าสู่ระบบ
        </Link>
      </p>
    </div>
  );
}
