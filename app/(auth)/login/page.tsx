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
import { Logo } from "@/components/brand/logo";

const schema = z.object({
  identifier: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรหรืออีเมล")
    .refine(
      (v) => /^[0-9-]{9,15}$/.test(v) || /^\S+@\S+\.\S+$/.test(v),
      "รูปแบบเบอร์โทรหรืออีเมลไม่ถูกต้อง"
    ),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    const isMember = !data.identifier.toLowerCase().includes("new");
    if (isMember) {
      toast.success("เข้าสู่ระบบสำเร็จ");
      router.push("/home");
    } else {
      toast.message("ยังไม่ได้เป็นสมาชิก", {
        description: "ระบบจะพาไปสมัครสมาชิก",
      });
      router.push("/signup");
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo />
          <h1 className="mt-4 text-2xl font-bold">ยินดีต้อนรับกลับ</h1>
          <p className="text-sm text-muted-foreground">
            เข้าสู่ระบบเพื่อใช้งานสิทธิประโยชน์สำหรับสมาชิก
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="identifier">เบอร์โทรหรืออีเมล</Label>
            <Input
              id="identifier"
              inputMode="email"
              autoComplete="username"
              placeholder="081-234-5678 หรือ name@example.com"
              aria-invalid={!!errors.identifier}
              {...register("identifier")}
            />
            {errors.identifier && (
              <p className="text-xs text-destructive">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                {...register("password")}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
              >
                {showPassword ? (
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

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            เข้าสู่ระบบ
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
      </div>

      <p className="mt-8 text-center text-[11px] text-muted-foreground">
        เคล็ดลับสำหรับทดสอบ: ใส่คำว่า &quot;new&quot; ในช่องเบอร์/อีเมล
        เพื่อจำลองว่าไม่ใช่สมาชิก
      </p>
    </div>
  );
}
