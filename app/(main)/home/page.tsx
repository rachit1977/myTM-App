import Link from "next/link";
import {
  Package,
  ScanLine,
  AlertCircle,
  Gift,
  Trophy,
  Phone,
  UserRound,
  Store,
  Bell,
  ChevronRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/brand/product-image";
import { tierBadgeClass } from "@/lib/utils";

export const dynamic = "force-dynamic";

const menus = [
  {
    href: "/profile",
    label: "บัญชี",
    desc: "ดู / แก้ไขข้อมูลของฉัน",
    icon: UserRound,
    bg: "bg-violet-100 dark:bg-violet-950/60",
    title: "text-violet-950 dark:text-violet-50",
    desc_: "text-violet-900/70 dark:text-violet-200/80",
    iconColor: "text-violet-500 dark:text-violet-400",
  },
  {
    href: "/products",
    label: "สินค้าของเรา",
    desc: "ดูรายการสินค้าทั้งหมด",
    icon: Package,
    bg: "bg-sky-100 dark:bg-sky-950/60",
    title: "text-sky-950 dark:text-sky-50",
    desc_: "text-sky-900/70 dark:text-sky-200/80",
    iconColor: "text-sky-500 dark:text-sky-400",
  },
  {
    href: "/check-product",
    label: "ตรวจสอบสินค้า",
    desc: "สแกน QR เพื่อตรวจสอบ",
    icon: ScanLine,
    bg: "bg-brand-100 dark:bg-brand-900/60",
    title: "text-brand-900 dark:text-brand-50",
    desc_: "text-brand-900/70 dark:text-brand-200/80",
    iconColor: "text-brand-600 dark:text-brand-300",
  },
  {
    href: "/report",
    label: "แจ้งปัญหาสินค้า",
    desc: "ส่งคำร้องและติดตามสถานะ",
    icon: AlertCircle,
    bg: "bg-rose-100 dark:bg-rose-950/60",
    title: "text-rose-950 dark:text-rose-50",
    desc_: "text-rose-900/70 dark:text-rose-200/80",
    iconColor: "text-rose-500 dark:text-rose-400",
  },
  {
    href: "/lucky-draw",
    label: "ลุ้นชิงโชค",
    desc: "อัพโหลดรูปสินค้าและใบเสร็จรับเงิน",
    icon: Gift,
    bg: "bg-amber-100 dark:bg-amber-950/60",
    title: "text-amber-950 dark:text-amber-50",
    desc_: "text-amber-900/70 dark:text-amber-200/80",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    href: "/winners",
    label: "ประกาศผู้โชคดี",
    desc: "ตรวจรายชื่อผู้ได้รางวัล",
    icon: Trophy,
    bg: "bg-yellow-100 dark:bg-yellow-950/60",
    title: "text-yellow-950 dark:text-yellow-50",
    desc_: "text-yellow-900/70 dark:text-yellow-200/80",
    iconColor: "text-yellow-500 dark:text-yellow-400",
  },
  {
    href: "/contact",
    label: "ติดต่อเรา",
    desc: "ที่อยู่ เบอร์โทรศัพท์ อีเมล หรือส่งข้อความถึงเรา",
    icon: Phone,
    bg: "bg-orange-100 dark:bg-orange-950/60",
    title: "text-orange-950 dark:text-orange-50",
    desc_: "text-orange-900/70 dark:text-orange-200/80",
    iconColor: "text-orange-500 dark:text-orange-400",
  },
  {
    href: "/dealers",
    label: "ตัวแทนจำหน่าย",
    desc: "สั่งซื้อสินค้ากับตัวแทนจำหน่ายเท่านั้น",
    icon: Store,
    bg: "bg-indigo-100 dark:bg-indigo-950/60",
    title: "text-indigo-950 dark:text-indigo-50",
    desc_: "text-indigo-900/70 dark:text-indigo-200/80",
    iconColor: "text-indigo-500 dark:text-indigo-400",
  },
];

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  const [user, promoProduct, unreadCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true, points: true, tier: true },
    }),
    prisma.product.findUnique({ where: { slug: "merrybright-twins" } }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);

  if (!user) redirect("/login");

  return (
    <div>
      <header className="bg-gradient-to-br from-brand to-brand-700 px-5 pb-10 pt-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium opacity-90">สวัสดี</p>
            <h1 className="mt-0.5 text-2xl font-bold leading-tight">
              {user.fullName}
            </h1>
          </div>
          <Link
            href="/notifications"
            aria-label={
              unreadCount > 0
                ? `การแจ้งเตือน ${unreadCount} รายการที่ยังไม่ได้อ่าน`
                : "การแจ้งเตือน"
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform active:scale-95 hover:bg-white/25"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-300 px-1 text-[10px] font-bold text-amber-900">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        <div className="mt-6 rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] opacity-80">คะแนนสะสมของฉัน</p>
              <p className="text-2xl font-bold">
                {user.points.toLocaleString()}
                <span className="ml-1 text-sm font-medium opacity-90">
                  คะแนน
                </span>
              </p>
            </div>
            <Badge
              variant="secondary"
              className={`shadow-sm ${tierBadgeClass(user.tier)}`}
            >
              {user.tier} Member
            </Badge>
          </div>
        </div>
      </header>

      <section className="-mt-6 px-4">
        <div className="grid grid-cols-2 gap-3">
          {menus.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`group relative min-h-[110px] overflow-hidden rounded-2xl p-4 shadow-sm transition-all active:scale-[0.98] hover:shadow-md ${m.bg}`}
              >
                <div className="relative z-10 max-w-[65%]">
                  <p
                    className={`text-sm font-bold leading-tight ${m.title}`}
                  >
                    {m.label}
                  </p>
                  <p
                    className={`mt-1 text-[13px] leading-snug ${m.desc_}`}
                  >
                    {m.desc}
                  </p>
                </div>
                <Icon
                  className={`pointer-events-none absolute -bottom-2 -right-2 h-20 w-20 ${m.iconColor}`}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>

        <Link
          href="/lucky-draw"
          className="mt-6 block overflow-hidden rounded-2xl bg-zinc-800 shadow-md transition-transform active:scale-[0.99] hover:bg-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <div className="flex items-center gap-3 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gold-bar.png"
              alt="ทองคำแท่งหนัก 1 บาท"
              className="-my-4 h-32 w-32 shrink-0 object-contain drop-shadow-lg"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-bold leading-tight text-white">
                ลุ้นชิงโชครางวัลใหญ่ทุกเดือน
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-zinc-300">
                รางวัลประจำเดือน พฤษภาคม 2569
              </p>
              <p className="mt-0.5 text-[17px] font-semibold leading-tight text-amber-300">
                ทองคำแท่งหนัก 1 บาท
              </p>
            </div>
          </div>
        </Link>

        <div className="mt-4 rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">โปรโมชั่นเด่นวันนี้</h2>
            <Link
              href="/products"
              className="flex items-center gap-0.5 text-xs font-medium text-primary"
            >
              ดูทั้งหมด
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <Link
            href={
              promoProduct ? `/products/${promoProduct.slug}` : "/products"
            }
            className="mt-3 flex items-center gap-3 rounded-xl border bg-muted/30 p-3 transition-colors hover:bg-accent"
          >
            {promoProduct && (
              <ProductImage
                slug={promoProduct.slug}
                src={promoProduct.imageUrl}
                alt={promoProduct.name}
                className="h-16 w-16 shrink-0 rounded-lg bg-white dark:bg-white/5"
                sizes="64px"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">
                {promoProduct?.name ?? "เมอร์รี่ไบรท์ทวินส์"}
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                ซื้อครบ 200 บาท ลุ้นรับทองคำหนัก 1 บาท ทุกต้นเดือน
              </p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        </div>
      </section>
    </div>
  );
}
