import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AppBar } from "@/components/layout/app-bar";
import { ProductImage } from "@/components/brand/product-image";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return (
    <>
      <AppBar title="สินค้าของเรา" />
      <div className="px-4 py-4">
        <div className="mb-5 rounded-2xl border bg-gradient-to-br from-brand-50 to-accent p-4 dark:from-brand-900/30">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700 dark:text-brand-200">
            Thai Merry
          </p>
          <h2 className="mt-1 text-base font-bold">
            Specialist in Disposable Lighters and Brite
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            ผลิตภัณฑ์เพื่อครัวเรือนคุณภาพ ครบวงจรทั้งไฟแช็ก แผ่นใยขัด
            และฟองน้ำ
          </p>
          <a
            href="https://thaimerry.co.th"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline"
          >
            thaimerry.co.th
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          สินค้าทั้งหมด ({products.length})
        </h3>

        <ul className="space-y-3">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.slug}`}
                className="flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-sm transition-all active:scale-[0.99] hover:shadow-md"
              >
                <ProductImage
                  slug={p.slug}
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-16 w-16 shrink-0 rounded-xl"
                  sizes="64px"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {p.tagline}
                  </p>
                  {p.price && (
                    <p className="mt-1 text-xs font-semibold text-primary">
                      ฿{p.price}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
