import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ScanLine,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  ListChecks,
} from "lucide-react";
import { productBySlug, products } from "@/lib/seed";
import { AppBar } from "@/components/layout/app-bar";
import { ProductImage } from "@/components/brand/product-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = productBySlug(params.id);
  if (!product) notFound();

  return (
    <>
      <AppBar title="รายละเอียดสินค้า" />
      <div className="px-4 pb-6">
        <div className="-mx-4 bg-gradient-to-b from-accent/60 to-background px-4 pb-6 pt-4">
          <ProductImage
            slug={product.slug}
            src={product.imageUrl}
            alt={product.name}
            className="mx-auto aspect-square w-full max-w-xs rounded-2xl bg-white shadow-sm dark:bg-white/5"
            sizes="(max-width: 768px) 90vw, 320px"
            priority
          />
          <div className="mt-4 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.tagline}
            </p>
            {product.price && (
              <Badge variant="success" className="mt-3">
                เริ่มต้น ฿{product.price}
              </Badge>
            )}
          </div>
        </div>

        <section className="mt-5">
          <h3 className="mb-2 text-sm font-semibold">รายละเอียดสินค้า</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </section>

        <section className="mt-5">
          <h3 className="mb-2 text-sm font-semibold">คุณสมบัติเด่น</h3>
          <ul className="space-y-2">
            {product.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
            <ListChecks className="h-4 w-4" />
            วิธีใช้งาน
          </h3>
          <ol className="space-y-2">
            {product.usage.map((u, i) => (
              <li
                key={u}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {i + 1}
                </span>
                {u}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-900 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            ข้อควรระวัง
          </h3>
          <ul className="space-y-1.5">
            {product.warnings.map((w) => (
              <li
                key={w}
                className="flex items-start gap-2 text-xs leading-relaxed text-amber-900/90 dark:text-amber-100/90"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-700 dark:bg-amber-300" />
                {w}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 rounded-2xl border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold">ข้อมูลทางเทคนิค</h3>
          <dl className="space-y-2.5">
            {product.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-3 border-b pb-2 last:border-b-0 last:pb-0"
              >
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="text-sm font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <a
          href={product.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-between rounded-2xl border bg-card p-4 text-sm hover:bg-accent"
        >
          <span className="flex flex-col">
            <span className="font-medium">ดูข้อมูลเพิ่มเติมที่เว็บไซต์</span>
            <span className="text-[11px] text-muted-foreground">
              thaimerry.co.th
            </span>
          </span>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </a>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="lg">
            <Link href="/check-product">
              <ScanLine className="h-4 w-4" />
              ตรวจสอบ
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/report">
              <AlertCircle className="h-4 w-4" />
              แจ้งปัญหา
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
