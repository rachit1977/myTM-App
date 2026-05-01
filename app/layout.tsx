import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { NavProgress } from "@/components/layout/nav-progress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "myTM — สำหรับสมาชิก",
  description:
    "แอปพลิเคชันสำหรับสมาชิก myTM ดูข้อมูลสินค้า ตรวจสอบสินค้า แจ้งปัญหา ร่วมจับฉลาก และติดต่อทีมงาน",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#169447",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${inter.variable} ${notoSansThai.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <NavProgress />
          {children}
        </Providers>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
