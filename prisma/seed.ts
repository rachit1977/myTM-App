import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import {
  products as seedProducts,
  reports as seedReports,
  luckyDrawEntries as seedEntries,
  winners as seedWinners,
  notifications as seedNotifications,
} from "../lib/seed";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Wipe (in dependency order)
  await prisma.notification.deleteMany();
  await prisma.luckyDrawEntry.deleteMany();
  await prisma.report.deleteMany();
  await prisma.productSerial.deleteMany();
  await prisma.winner.deleteMany();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // ---------- Products ----------
  const productMap = new Map<string, string>(); // slug -> id
  for (const p of seedProducts) {
    const created = await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        features: p.features,
        usage: p.usage,
        warnings: p.warnings,
        specs: p.specs,
        price: p.price,
        sourceUrl: p.sourceUrl,
        imageUrl: p.imageUrl,
      },
    });
    productMap.set(p.slug, created.id);
  }
  console.log(`  Products: ${productMap.size}`);

  // ---------- Product Serials (sample valid + a known fake) ----------
  const sampleSerials = [
    { serial: "MTM-LIGHTER-001", slug: "lighter", isAuthentic: true },
    { serial: "MTM-BRIGHT-042", slug: "merrybright", isAuthentic: true },
    { serial: "MTM-SPONGE-7788", slug: "merrysponge", isAuthentic: true },
    { serial: "MTM-SCRUB-3120", slug: "stainless-scrub", isAuthentic: true },
    { serial: "MTM-TWINS-9001", slug: "merrybright-twins", isAuthentic: true },
    { serial: "FAKE-DEMO-0001", slug: "lighter", isAuthentic: false },
  ];
  for (const s of sampleSerials) {
    const productId = productMap.get(s.slug)!;
    await prisma.productSerial.create({
      data: {
        serial: s.serial,
        productId,
        isAuthentic: s.isAuthentic,
        manufacturedAt: new Date("2026-01-12"),
        warrantyUntil: new Date("2027-01-12"),
        batch: `BATCH-${Math.floor(Math.random() * 9999)}`,
      },
    });
  }
  console.log(`  Product serials: ${sampleSerials.length}`);

  // ---------- Winners (public) ----------
  for (const w of seedWinners) {
    await prisma.winner.create({
      data: {
        rank: w.rank,
        name: w.name,
        prize: w.prize,
        drawDate: new Date(w.drawDate),
        province: w.province,
      },
    });
  }
  console.log(`  Winners: ${seedWinners.length}`);

  // ---------- Default test user (per DB.md) ----------
  const passwordHash = await bcrypt.hash("abc@ABC123", 10);
  const testUser = await prisma.user.create({
    data: {
      fullName: "Test User",
      email: "test@test.com",
      phone: "081-000-0000",
      passwordHash,
      memberSince: new Date("2024-03-15"),
      points: 1280,
      tier: "Gold",
    },
  });

  // ---------- Demo user with rich data ----------
  const demoHash = await bcrypt.hash("demo1234", 10);
  const demoUser = await prisma.user.create({
    data: {
      fullName: "ราชิต ปรียงค์",
      email: "rachit.preeyong@gmail.com",
      phone: "081-234-5678",
      passwordHash: demoHash,
      memberSince: new Date("2024-03-15"),
      points: 1280,
      tier: "Gold",
    },
  });
  console.log(`  Users: 2 (test@test.com, rachit.preeyong@gmail.com)`);

  // ---------- Reports for demo user ----------
  for (const r of seedReports) {
    const productId = productMap.get(r.productSlug)!;
    await prisma.report.create({
      data: {
        userId: demoUser.id,
        productId,
        topic: r.topic,
        detail: r.detail,
        status: r.status,
        createdAt: new Date(r.createdAt),
      },
    });
  }
  console.log(`  Reports: ${seedReports.length}`);

  // ---------- Lucky draw entries for demo user ----------
  for (const e of seedEntries) {
    const productId = productMap.get(e.productSlug)!;
    await prisma.luckyDrawEntry.create({
      data: {
        userId: demoUser.id,
        productId,
        fullName: demoUser.fullName,
        address:
          "75/2 หมู่ที่ 4 ซอยเพชรเกษม 99 ตำบลอ้อมน้อย อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74130",
        receiptNo: e.receiptNo,
        amount: e.amount,
        productImage:
          "https://thaimerry.co.th/wp-content/uploads/2024/12/brite-twin-re2.png",
        receiptImage:
          "https://thaimerry.co.th/wp-content/uploads/2024/12/brite-re-1.png",
        status: e.status,
        createdAt: new Date(e.uploadedAt),
      },
    });
  }
  console.log(`  Lucky draw entries: ${seedEntries.length}`);

  // ---------- Notifications for demo user ----------
  for (const n of seedNotifications) {
    await prisma.notification.create({
      data: {
        userId: demoUser.id,
        type: n.type,
        title: n.title,
        message: n.message,
        href: n.href ?? null,
        read: n.read,
        createdAt: new Date(n.createdAt),
      },
    });
  }
  console.log(`  Notifications: ${seedNotifications.length}`);

  // Welcome notification for test user
  await prisma.notification.create({
    data: {
      userId: testUser.id,
      type: "system",
      title: "ยินดีต้อนรับสู่ myTM",
      message: "ขอบคุณที่ลงทะเบียนเป็นสมาชิก myTM",
      read: false,
    },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
