"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Building2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่อ"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  subject: z.string().min(3, "กรุณากรอกหัวข้อ").max(80),
  message: z
    .string()
    .min(10, "ข้อความต้องมีอย่างน้อย 10 ตัวอักษร")
    .max(500, "ไม่เกิน 500 ตัวอักษร"),
});

type FormValues = z.infer<typeof schema>;

const contacts = [
  {
    icon: Building2,
    label: "บริษัท",
    value: "Thaimerry Co., Ltd.",
  },
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: "02-420-0048",
    href: "tel:024200048",
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: "sale@thaimerry.com",
    href: "mailto:sale@thaimerry.com",
  },
  {
    icon: MapPin,
    label: "ที่อยู่",
    value:
      "97 หมู่ 11 ถนนเพชรเกษม ตำบลอ้อมน้อย อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74130",
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (_: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("ส่งข้อความเรียบร้อย", {
      description: "ทีมงานจะติดต่อกลับโดยเร็วที่สุด",
    });
    reset();
  };

  return (
    <>
      <AppBar title="ติดต่อเรา" />
      <div className="px-4 py-4">
        <ul className="space-y-2">
          {contacts.map((c) => {
            const Icon = c.icon;
            const Wrapper = c.href ? "a" : "div";
            return (
              <li key={c.label}>
                <Wrapper
                  href={c.href}
                  className="flex items-start gap-3 rounded-xl border bg-card p-3 hover:bg-accent"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium leading-snug">
                      {c.value}
                    </p>
                  </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>

        <h2 className="mb-3 mt-6 text-sm font-semibold">ส่งข้อความถึงเรา</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="name">ชื่อ-นามสกุล</Label>
            <Input
              id="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject">หัวข้อ</Label>
            <Input
              id="subject"
              placeholder="เกี่ยวกับ..."
              aria-invalid={!!errors.subject}
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-xs text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">ข้อความ</Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="พิมพ์ข้อความของคุณ..."
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            ส่งข้อความ
          </Button>
        </form>
      </div>
    </>
  );
}
