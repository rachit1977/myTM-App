"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, Loader2, Upload, X, Inbox, Gift } from "lucide-react";
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
  luckyDrawEntries as seedEntries,
} from "@/lib/seed";
import { cn, formatThaiDate } from "@/lib/utils";
import type { LuckyDrawEntry, ProductSlug } from "@/types";

const schema = z.object({
  productSlug: z.string().min(1, "กรุณาเลือกสินค้า"),
  fullName: z
    .string()
    .min(2, "กรุณากรอกชื่อ-นามสกุล")
    .max(80, "ชื่อ-นามสกุลยาวเกินไป"),
  address: z
    .string()
    .min(10, "กรุณากรอกที่อยู่ให้ครบถ้วน")
    .max(300, "ที่อยู่ยาวเกินไป"),
  receiptNo: z
    .string()
    .min(4, "กรอกเลขที่ใบเสร็จรับเงิน")
    .max(40, "เลขที่ใบเสร็จรับเงินยาวเกินไป"),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "ยอดเงินไม่ถูกต้อง")
    .refine((v) => parseFloat(v) > 0, "ยอดเงินต้องมากกว่า 0"),
});

type FormValues = z.infer<typeof schema>;

const statusMeta: Record<
  LuckyDrawEntry["status"],
  { label: string; variant: "warning" | "success" | "destructive" }
> = {
  pending: { label: "รอตรวจสอบ", variant: "warning" },
  approved: { label: "อนุมัติแล้ว", variant: "success" },
  rejected: { label: "ไม่ผ่าน", variant: "destructive" },
};

export default function LuckyDrawPage() {
  const [entries, setEntries] = useState<LuckyDrawEntry[]>(seedEntries);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      productSlug: "",
      fullName: "",
      address: "",
      receiptNo: "",
      amount: "",
    },
  });

  const productSlug = watch("productSlug");

  const onPickFile =
    (setter: (s: string | null) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) setter(URL.createObjectURL(f));
      e.target.value = "";
    };

  const onSubmit = async (data: FormValues) => {
    if (!productImage || !receiptImage) {
      toast.error("กรุณาแนบรูปสินค้าและใบเสร็จ");
      return;
    }
    await new Promise((r) => setTimeout(r, 800));
    const product = products.find((p) => p.slug === data.productSlug)!;
    const newEntry: LuckyDrawEntry = {
      id: `ld-${Date.now()}`,
      productSlug: data.productSlug as ProductSlug,
      productName: product.name,
      receiptNo: data.receiptNo,
      amount: parseFloat(data.amount),
      uploadedAt: new Date().toISOString(),
      status: "pending",
    };
    setEntries((p) => [newEntry, ...p]);
    setProductImage(null);
    setReceiptImage(null);
    reset();
    toast.success("ส่งข้อมูลเข้าร่วมลุ้นชิงโชคเรียบร้อย", {
      description: "ทีมงานจะตรวจสอบและอัปเดตสถานะให้คุณ",
    });
  };

  const sorted = useMemo(
    () =>
      [...entries].sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      ),
    [entries]
  );

  return (
    <>
      <AppBar title="ลุ้นชิงโชค" />
      <div className="px-4 py-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 p-4 dark:from-amber-950/40 dark:to-amber-900/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-200 text-amber-800 dark:bg-amber-800/60 dark:text-amber-100">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">ลุ้นชิงโชครางวัลใหญ่ทุกเดือน</p>
            <p className="text-xs text-muted-foreground">
              เพียงอัพโหลดรูปสินค้าและใบเสร็จรับเงินเพื่อรับสิทธิ์
            </p>
          </div>
        </div>

        <div className="mb-5 overflow-hidden rounded-2xl bg-zinc-800 shadow-md dark:bg-zinc-900">
          <div className="flex items-center gap-3 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gold-bar.png"
              alt="ทองคำแท่งหนัก 1 บาท"
              className="-my-4 h-32 w-32 shrink-0 object-contain drop-shadow-lg"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-bold leading-tight text-white">
                รางวัลประจำเดือน เมษายน 2569
              </p>
              <p className="mt-0.5 text-[17px] font-semibold leading-tight text-amber-300">
                ทองคำแท่งหนัก 1 บาท
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-zinc-300">
                จับรางวัลต้นเดือน พฤษภาคม 2569
              </p>
            </div>
          </div>
        </div>

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
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input
              id="fullName"
              autoComplete="name"
              placeholder="เช่น สมชาย ใจดี"
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
            <Label htmlFor="address">ที่อยู่</Label>
            <Textarea
              id="address"
              rows={3}
              autoComplete="street-address"
              placeholder="บ้านเลขที่ ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด รหัสไปรษณีย์"
              aria-invalid={!!errors.address}
              {...register("address")}
            />
            {errors.address && (
              <p className="text-xs text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="receiptNo">เลขที่ใบเสร็จรับเงิน</Label>
            <Input
              id="receiptNo"
              placeholder="RC-2026-..."
              aria-invalid={!!errors.receiptNo}
              {...register("receiptNo")}
            />
            {errors.receiptNo && (
              <p className="text-xs text-destructive">
                {errors.receiptNo.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="amount">ยอดเงิน (บาท)</Label>
            <Input
              id="amount"
              inputMode="decimal"
              placeholder="0.00"
              aria-invalid={!!errors.amount}
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-xs text-destructive">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <UploadSlot
              label="รูปสินค้า"
              src={productImage}
              onChange={onPickFile(setProductImage)}
              onClear={() => setProductImage(null)}
            />
            <UploadSlot
              label="รูปใบเสร็จ"
              src={receiptImage}
              onChange={onPickFile(setReceiptImage)}
              onClear={() => setReceiptImage(null)}
            />
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
              <Upload className="h-4 w-4" />
            )}
            ส่งชิงโชค
          </Button>
        </form>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold">ประวัติการอัพโหลด</h2>
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed py-10 text-center text-sm text-muted-foreground">
              <Inbox className="h-8 w-8" />
              ยังไม่มีรายการ
            </div>
          ) : (
            <ul className="space-y-2">
              {sorted.map((e) => {
                const p = productBySlug(e.productSlug);
                return (
                <li
                  key={e.id}
                  className="flex gap-3 rounded-xl border bg-card p-3"
                >
                  {p && (
                    <ProductImage
                      slug={e.productSlug}
                      src={p.imageUrl}
                      alt={e.productName}
                      className="h-12 w-12 shrink-0 rounded-lg bg-white dark:bg-white/5"
                      sizes="48px"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold">
                        {e.productName}
                      </p>
                      <Badge variant={statusMeta[e.status].variant}>
                        {statusMeta[e.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ใบเสร็จ: {e.receiptNo}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{formatThaiDate(e.uploadedAt)}</span>
                      <span className="font-medium text-foreground">
                        ฿{e.amount.toLocaleString()}
                      </span>
                    </div>
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

function UploadSlot({
  label,
  src,
  onChange,
  onClear,
}: {
  label: string;
  src: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {src ? (
        <div className="relative aspect-[4/5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label}
            className="h-full w-full rounded-lg border object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            aria-label="ลบรูป"
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-xs text-muted-foreground hover:bg-accent">
          <ImagePlus className="h-6 w-6" />
          แตะเพื่อเลือกรูป
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
