# myTM Mobile Web App

แอปพลิเคชัน mobile-first สำหรับสมาชิก myTM ดูข้อมูลสินค้า ตรวจสอบสินค้า แจ้งปัญหาการใช้งาน ร่วมจับฉลาก และติดต่อทีมงาน

> ⚠️ เวอร์ชันนี้ยังไม่มี database จริง ใช้ mock / seed data ทั้งหมด

## Tech Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + shadcn-style UI components
- **React Hook Form** + **Zod** validation
- **lucide-react** icons
- **sonner** toast notifications

## Setup

```bash
cd mytm-app
npm install
npm run dev
```

เปิด `http://localhost:3000` ในเบราว์เซอร์ แนะนำเปิดด้วย DevTools mode มือถือ (เช่น iPhone SE 375px)

## Scripts
| Script | คำอธิบาย |
| --- | --- |
| `npm run dev` | รัน development server |
| `npm run build` | build production |
| `npm run start` | รัน production server หลัง build |
| `npm run lint` | ตรวจสอบ lint |

## Project Structure

```
mytm-app/
├── app/
│   ├── (auth)/          # ไม่มี bottom nav: login, signup
│   ├── (main)/          # มี bottom nav: home + features
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/              # shadcn-style primitives
│   ├── layout/          # AppBar, BottomNav
│   └── brand/           # Logo, ProductIcon
├── lib/
│   ├── utils.ts         # cn(), formatThaiDate()
│   └── seed.ts          # mock users / products / reports / draws
├── types/
│   └── index.ts
└── public/
```

## Routes

| Route | คำอธิบาย |
| --- | --- |
| `/login` | เข้าสู่ระบบ (เบอร์/อีเมล + password) |
| `/signup` | สมัครสมาชิก |
| `/` | Home dashboard (7 เมนู) |
| `/profile` | ข้อมูลส่วนตัว / Logout |
| `/products` | รายการสินค้า |
| `/products/[id]` | รายละเอียดสินค้า |
| `/check-product` | สแกน QR (mock) |
| `/check-product-result?serial=...` | ผลการตรวจสอบ |
| `/report` | แจ้งปัญหา + ประวัติ |
| `/lucky-draw` | อัพโหลดเข้าร่วมจับฉลาก + ประวัติ |
| `/winners` | ประกาศผู้โชคดี |
| `/contact` | ข้อมูลติดต่อ + form |

## Demo Tips

- **Login:** ใส่อีเมลใดก็ได้ที่มีรูปถูกต้อง + รหัสผ่าน 6 ตัวอักษรขึ้นไป → เข้าหน้า Home
  - ใส่คำว่า `new` ในช่องเบอร์/อีเมล → ระบบจะพาไปหน้า signup
- **Check Product:** กรอก serial ขึ้นต้นด้วย `FAKE` → จำลองสินค้าปลอม
- **Report / Lucky Draw:** ฟอร์มทุกอันจะ append เข้า history list ทันที (in-memory)

## Color & Design

- Brand color: `#169447` (เขียว myTM)
- Black `#000` / White `#FFF`
- Font: Noto Sans Thai (TH) + Inter (EN)
- รองรับ Dark mode ผ่าน Tailwind `dark:` prefix (เพิ่ม class `dark` ที่ `<html>` เพื่อทดสอบ)
- Touch target ≥ 44x44px

## Acceptance Checklist

- [x] รันด้วย `npm run dev` ได้
- [x] Mobile-first layout (375px → 768px)
- [x] Form validation + error message ภาษาไทย
- [x] Loading states + toast notifications
- [x] Empty states ในประวัติต่างๆ
- [x] Dark mode สนับสนุน
- [x] Seed data ≥ 5 รายการต่อหมวด

## Environment Variables

ปัจจุบันไม่ต้องตั้งค่า env variables ใดๆ เพราะใช้ mock data ทั้งหมด เมื่อพร้อมเชื่อม API จริง ให้สร้าง `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## Next Steps (สำหรับ phase ถัดไป)

1. เชื่อม backend จริง (auth, products, reports, draws)
2. ใส่ระบบ session / JWT
3. ใส่ระบบ scan QR ผ่านกล้องจริง (เช่น `@zxing/browser`)
4. PWA: service worker + offline cache
