"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, ScanLine, Home } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/brand/product-image";
import { mockCheckProduct, productBySlug } from "@/lib/seed";
import { formatThaiDate, cn } from "@/lib/utils";
import { Suspense } from "react";

function Result() {
  const params = useSearchParams();
  const serial = params.get("serial") ?? "";
  if (!serial) {
    return (
      <div className="px-4 py-12 text-center text-sm text-muted-foreground">
        ไม่พบข้อมูลที่ตรวจสอบ
      </div>
    );
  }
  const result = mockCheckProduct(serial);
  const ok = result.isAuthentic;
  const productInfo = productBySlug(result.product);

  return (
    <div className="px-4 py-4">
      <div
        className={cn(
          "flex flex-col items-center rounded-2xl p-6 text-center text-white",
          ok
            ? "bg-gradient-to-br from-brand to-brand-700"
            : "bg-gradient-to-br from-rose-500 to-rose-700"
        )}
      >
        {ok ? (
          <CheckCircle2 className="h-14 w-14" strokeWidth={2} />
        ) : (
          <XCircle className="h-14 w-14" strokeWidth={2} />
        )}
        <h2 className="mt-3 text-xl font-bold">
          {ok ? "สินค้าของแท้" : "ไม่พบข้อมูลสินค้า"}
        </h2>
        <p className="mt-1 text-sm opacity-90">
          {ok
            ? "ผ่านการตรวจสอบจากระบบ"
            : "อาจเป็นสินค้าปลอม โปรดติดต่อทีมงาน"}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-4">
        <div className="flex items-center gap-3">
          {productInfo && (
            <ProductImage
              slug={result.product}
              src={productInfo.imageUrl}
              alt={result.productName}
              className="h-14 w-14 shrink-0 rounded-xl bg-white dark:bg-white/5"
              sizes="56px"
            />
          )}
          <div>
            <p className="text-sm font-semibold">{result.productName}</p>
            <p className="text-xs text-muted-foreground">
              Serial: {result.serial}
            </p>
          </div>
        </div>

        <dl className="mt-4 space-y-2.5 border-t pt-4">
          <Row label="หมายเลข Batch" value={result.batch} />
          <Row label="วันที่ผลิต" value={formatThaiDate(result.manufacturedAt)} />
          <Row label="รับประกันถึง" value={formatThaiDate(result.warrantyUntil)} />
          <Row
            label="สถานะ"
            value={ok ? "ผ่านการตรวจสอบ" : "ไม่ผ่านการตรวจสอบ"}
            valueClass={ok ? "text-brand-700" : "text-destructive"}
          />
        </dl>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button asChild variant="outline" size="lg">
          <Link href="/home">
            <Home className="h-4 w-4" />
            กลับหน้าหลัก
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/check-product">
            <ScanLine className="h-4 w-4" />
            สแกนอีกครั้ง
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("text-sm font-medium", valueClass)}>{value}</dd>
    </div>
  );
}

export default function CheckProductResultPage() {
  return (
    <>
      <AppBar title="ผลการตรวจสอบ" />
      <Suspense
        fallback={
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            กำลังโหลด...
          </div>
        }
      >
        <Result />
      </Suspense>
    </>
  );
}
