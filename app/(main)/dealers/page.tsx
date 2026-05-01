import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";

function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function LineLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#25F4EE"
        d="M9.4 8.8v6.6c0 1.5-1.2 2.7-2.7 2.7-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7c.3 0 .6 0 .9.1V9.5c-.3 0-.6-.1-.9-.1-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2V9.4c1.4 1 3.1 1.6 4.9 1.6V7.5c-1.1 0-2.1-.4-2.9-1-1-.7-1.7-1.8-2-3h-3.5z"
      />
      <path
        fill="#FE2C55"
        d="M11.4 6.6v6.6c0 1.5-1.2 2.7-2.7 2.7-.5 0-1-.1-1.4-.3.5.7 1.4 1.2 2.4 1.2 1.5 0 2.7-1.2 2.7-2.7V7.5c1.4 1 3.1 1.6 4.9 1.6V7.5c-2.4 0-4.4-1.7-4.9-3.9h-1c.5 1.7 1.6 3 3 3.7v.3c-1.1 0-2.1-.4-2.9-1z"
      />
      <path
        fill="currentColor"
        d="M10.4 7.5v6.6c0 1.5-1.2 2.7-2.7 2.7-.6 0-1.1-.2-1.6-.5-.8-.5-1.3-1.4-1.3-2.4 0-1.5 1.2-2.7 2.7-2.7.3 0 .6 0 .9.1V8.5c-.3 0-.6-.1-.9-.1-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2V8.4c1.4 1 3.1 1.6 4.9 1.6V6.5c-2.4 0-4.4-1.7-4.9-3.9h-3.3z"
      />
    </svg>
  );
}

const dealer = {
  name: "บริษัท แชมเบอร์มาร์เก็ตติ้ง จำกัด",
  motto: "มุ่งมั่น พัฒนา จำหน่ายสินค้าที่ดี มีคุณภาพ ราคาย่อมเยาว์",
  logo: "/dealer-chamber-logo.png",
  phone: "02-482-2828",
  email: "info@chamber.co.th",
  address:
    "75/2 หมู่ที่ 4 ซอยเพชรเกษม 99 ตำบลอ้อมน้อย อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74130",
  hours: "จันทร์ - เสาร์ 08:00 - 17:00 น.",
  socials: [
    {
      logo: FacebookLogo,
      label: "Facebook",
      value: "chamberfanpage",
      href: "https://www.facebook.com/chamberfanpage",
      tile: "bg-[#1877F2] text-white",
    },
    {
      logo: LineLogo,
      label: "LINE Official",
      value: "@chamber.co.th",
      href: "https://lin.ee/nxctY2n",
      tile: "bg-[#06C755] text-white",
    },
    {
      logo: TikTokLogo,
      label: "TikTok",
      value: "@chamber_official1",
      href: "https://www.tiktok.com/@chamber_official1",
      tile: "bg-black text-white",
    },
  ],
};

const contacts = [
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: dealer.phone,
    href: `tel:${dealer.phone.replace(/-/g, "")}`,
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: dealer.email,
    href: `mailto:${dealer.email}`,
  },
  {
    icon: Clock,
    label: "เวลาทำการ",
    value: dealer.hours,
  },
  {
    icon: MapPin,
    label: "ที่อยู่",
    value: dealer.address,
  },
];

export default function DealersPage() {
  return (
    <>
      <AppBar title="ตัวแทนจำหน่าย" />
      <div className="px-4 py-4">
        <p className="mb-3 text-xs text-muted-foreground">
          สั่งซื้อสินค้ากับตัวแทนจำหน่ายเท่านั้น
        </p>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Image
              src={dealer.logo}
              alt={dealer.name}
              width={1818}
              height={385}
              sizes="(max-width: 448px) 90vw, 400px"
              className="h-auto w-1/2 max-w-[12rem] object-contain dark:invert"
              priority
            />
            <p className="mt-4 text-base font-bold leading-snug">
              {dealer.name}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {dealer.motto}
            </p>
          </div>
        </div>

        <h2 className="mb-2 mt-6 text-sm font-semibold">ข้อมูลการติดต่อ</h2>
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

        <h2 className="mb-2 mt-6 text-sm font-semibold">โซเชียลมีเดีย</h2>
        <ul className="space-y-2">
          {dealer.socials.map((s) => {
            const Logo = s.logo;
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:bg-accent"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm ${s.tile}`}
                  >
                    <Logo className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="truncate text-sm font-medium">{s.value}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
