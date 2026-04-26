"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, Loader2, Send, X, Inbox } from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/brand/product-image";
import {
  products,
  productBySlug,
  reports as seedReports,
} from "@/lib/seed";
import { cn, formatThaiDate } from "@/lib/utils";
import type { Report, ProductSlug } from "@/types";

const schema = z.object({
  productSlug: z.string().min(1, "กรุณาเลือกสินค้า"),
  topic: z.string().min(3, "หัวข้อต้องมีอย่างน้อย 3 ตัวอักษร").max(80),
  detail: z
    .string()
    .min(10, "รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร")
    .max(500, "ไม่เกิน 500 ตัวอักษร"),
});

type FormValues = z.infer<typeof schema>;

const statusMeta: Record<
  Report["status"],
  { label: string; variant: "warning" | "success" | "default" }
> = {
  pending: { label: "รอดำเนินการ", variant: "warning" },
  in_progress: { label: "กำลังตรวจสอบ", variant: "default" },
  resolved: { label: "แก้ไขแล้ว", variant: "success" },
};

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>(seedReports);
  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { productSlug: "", topic: "", detail: "" },
  });

  const productSlug = watch("productSlug");
  const detail = watch("detail") ?? "";

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = 4 - images.length;
    const next = files.slice(0, remaining).map((f) => URL.createObjectURL(f));
    setImages((p) => [...p, ...next]);
    e.target.value = "";
  };

  const removeImage = (idx: number) =>
    setImages((p) => p.filter((_, i) => i !== idx));

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    const product = products.find((p) => p.slug === data.productSlug)!;
    const newReport: Report = {
      id: `r-${Date.now()}`,
      productSlug: data.productSlug as ProductSlug,
      productName: product.name,
      topic: data.topic,
      detail: data.detail,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setReports((p) => [newReport, ...p]);
    setImages([]);
    reset();
    toast.success("ส่งคำร้องเรียบร้อย", {
      description: "ทีมงานจะติดต่อกลับภายใน 1-2 วันทำการ",
    });
  };

  const sortedReports = useMemo(
    () =>
      [...reports].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [reports]
  );

  return (
    <>
      <AppBar title="แจ้งปัญหาสินค้า" />
      <div className="px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label>เลือกสินค้า</Label>
            <div className="grid grid-cols-5 gap-2">
              {products.map((p) => {
                const active = productSlug === p.slug;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() =>
                      setValue("productSlug", p.slug, { shouldValidate: true })
                    }
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border p-2 transition-all min-h-[44px]",
                      active
                        ? "border-primary bg-accent shadow-sm"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                    aria-pressed={active}
                  >
                    <ProductImage
                      slug={p.slug}
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-10 w-10 shrink-0 rounded-lg bg-white dark:bg-white/5"
                      sizes="40px"
                    />
                    <span className="line-clamp-2 text-[10px] leading-tight">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.productSlug && (
              <p className="text-xs text-destructive">
                {errors.productSlug.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="topic">หัวข้อปัญหา</Label>
            <Input
              id="topic"
              placeholder="เช่น จุดไฟไม่ติด"
              aria-invalid={!!errors.topic}
              {...register("topic")}
            />
            {errors.topic && (
              <p className="text-xs text-destructive">{errors.topic.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="detail">รายละเอียด</Label>
            <Textarea
              id="detail"
              rows={5}
              placeholder="โปรดอธิบายปัญหาที่พบโดยละเอียด..."
              aria-invalid={!!errors.detail}
              {...register("detail")}
            />
            <div className="flex items-center justify-between">
              {errors.detail ? (
                <p className="text-xs text-destructive">
                  {errors.detail.message}
                </p>
              ) : (
                <span />
              )}
              <span className="text-[11px] text-muted-foreground">
                {detail.length}/500
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>แนบรูปภาพ (สูงสุด 4 รูป)</Label>
            <div className="grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <div key={i} className="relative aspect-square">
                  <img
                    src={src}
                    alt={`แนบ ${i + 1}`}
                    className="h-full w-full rounded-lg border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label="ลบรูปภาพ"
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-xs text-muted-foreground hover:bg-accent">
                  <ImagePlus className="h-5 w-5" />
                  เพิ่มรูป
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>
              )}
            </div>
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
            ส่งคำร้อง
          </Button>
        </form>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold">ประวัติการแจ้งปัญหา</h2>
          {sortedReports.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed py-10 text-center text-sm text-muted-foreground">
              <Inbox className="h-8 w-8" />
              ยังไม่มีรายการ
            </div>
          ) : (
            <ul className="space-y-2">
              {sortedReports.map((r) => {
                const p = productBySlug(r.productSlug);
                return (
                <li
                  key={r.id}
                  className="flex gap-3 rounded-xl border bg-card p-3"
                >
                  {p && (
                    <ProductImage
                      slug={r.productSlug}
                      src={p.imageUrl}
                      alt={r.productName}
                      className="h-12 w-12 shrink-0 rounded-lg bg-white dark:bg-white/5"
                      sizes="48px"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold">
                        {r.topic}
                      </p>
                      <Badge variant={statusMeta[r.status].variant}>
                        {statusMeta[r.status].label}
                      </Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.productName}
                    </p>
                    <p className="line-clamp-2 mt-1 text-xs text-muted-foreground">
                      {r.detail}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {formatThaiDate(r.createdAt)}
                    </p>
                  </div>
                </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
