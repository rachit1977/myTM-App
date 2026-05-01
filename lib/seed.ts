import type {
  Product,
  Report,
  LuckyDrawEntry,
  User,
  Winner,
  CheckProductResult,
  AppNotification,
} from "@/types";

export const currentUser: User = {
  id: "u-001",
  fullName: "ราชิต ปรียงค์",
  phone: "081-234-5678",
  email: "rachit.preeyong@gmail.com",
  memberSince: "2024-03-15",
  points: 1280,
  tier: "Gold",
};

export const products: Product[] = [
  {
    id: "p-001",
    slug: "lighter",
    name: "ไฟแช็ก",
    tagline: "Specialist in Disposable Lighters",
    description:
      "ไฟแช็กพกพาแบบใช้แล้วทิ้ง บรรจุเชื้อเพลิงเหลว (บิวเทน) จุดประกายไฟด้วยกลไกวงล้อตะไบและหินขีดไฟ ปรับระดับเปลวไฟได้ เหมาะสำหรับจุดบุหรี่ ซิการ์ ไปป์ กระดาษ ไส้เทียน หรือคบเพลิง",
    features: [
      "ปรับระดับเปลวไฟได้",
      "จุดติดง่ายด้วยวงล้อตะไบและหินขีดไฟ",
      "บรรจุก๊าซแบบใช้ครั้งเดียว",
      "พกพาสะดวก น้ำหนักเบา",
    ],
    usage: [
      "หมุนวงล้อให้สัมผัสกับหินขีดไฟเพื่อจุดประกาย",
      "ปรับระดับเปลวไฟตามต้องการก่อนใช้งาน",
      "ปิดวาล์วก๊าซให้สนิททุกครั้งหลังใช้",
    ],
    warnings: [
      "ห้ามเก็บในสถานที่ที่มีอุณหภูมิเกิน 50°C",
      "ห้ามเผาทิ้งหรือทำลายด้วยการเจาะ",
      "เก็บให้พ้นมือเด็กและห่างจากเปลวไฟ",
    ],
    specs: [
      { label: "ประเภท", value: "Disposable Lighter" },
      { label: "เชื้อเพลิง", value: "Butane / Naphtha" },
      { label: "ระบบจุดไฟ", value: "Flint Wheel" },
      { label: "ปรับเปลวไฟ", value: "ได้" },
    ],
    price: "12",
    sourceUrl: "https://thaimerry.co.th/lighter/",
    imageUrl:
      "https://thaimerry.co.th/wp-content/uploads/2024/12/banner-taiyo.png",
  },
  {
    id: "p-002",
    slug: "merrybright",
    name: "เมอร์รี่ไบรท์",
    tagline: "แผ่นใยขัดพิเศษ ทนทาน คมนุ่ม คุ้มค่ากว่า",
    description:
      "แผ่นใยขัดอเนกประสงค์เมอร์รี่ไบรท์ ผลิตจากโครงสร้างไนล่อนอย่างหนาเคลือบด้วยเม็ดทรายชนิดพิเศษ คม นุ่ม เหนียว ขจัดคราบสกปรกได้สะอาดรวดเร็ว โดยไม่ทำลายพื้นผิว",
    features: [
      "คม นุ่ม เหนียว ทนทาน",
      "ไม่เป็นสนิม",
      "ไม่ทำลายพื้นผิว",
      "ประหยัดเวลาและทุ่นแรง",
    ],
    usage: [
      "เหมาะสำหรับขัดเตรียมพื้นผิว ไม้ พลาสติก และโลหะ",
      "ล้างด้วยน้ำสะอาดหลังการใช้งานทุกครั้ง",
      "ผึ่งให้แห้งก่อนเก็บ",
    ],
    warnings: [
      "ห้ามใช้กับภาชนะเคลือบเทฟลอน",
      "เก็บให้ห่างจากเปลวไฟ",
    ],
    specs: [
      { label: "ประเภท", value: "Scouring Pad" },
      { label: "วัสดุโครง", value: "ไนล่อนอย่างหนา" },
      { label: "สารเคลือบ", value: "เม็ดทรายชนิดพิเศษ" },
      { label: "คุณสมบัติ", value: "ไม่เป็นสนิม" },
    ],
    price: "10",
    sourceUrl: "https://thaimerry.co.th/merrybrite/",
    imageUrl:
      "https://thaimerry.co.th/wp-content/uploads/2024/12/brite-re-1.png",
  },
  {
    id: "p-003",
    slug: "merrysponge",
    name: "เมอร์รี่สปอนจ์",
    tagline: "ฟองนุ่ม อุ้มน้ำดี อ่อนโยนทุกพื้นผิว",
    description:
      "ฟองน้ำเมอร์รี่สปอนจ์ ผลิตจากเส้นใยโพลีเอสเตอร์ถักเป็นตาข่ายห่อหุ้มฟองน้ำชั้นใน ช่วยอุ้มน้ำได้ดี ใช้น้ำยาล้างจานเพียงเล็กน้อยก็เกิดฟองได้มาก เย็บโพ้งเก็บขอบ ป้องกันมุมแหลมคม",
    features: [
      "เส้นใยตาข่ายโพลีเอสเตอร์ห่อหุ้มฟองน้ำ",
      "เย็บโพ้งเก็บขอบ ปลอดภัยต่อมือ",
      "ใช้น้ำยาน้อย แต่เกิดฟองได้ดี",
      "อ่อนโยนต่อพื้นผิว ไม่ทิ้งรอยขีดข่วน",
    ],
    usage: [
      "ใช้ล้างจาน ภาชนะ และพื้นผิวทั่วไป",
      "ล้างด้วยน้ำสะอาดและบีบให้หมาด",
      "ผึ่งไว้ในที่อากาศถ่ายเท",
    ],
    warnings: [
      "ควรเก็บให้ห่างจากเปลวไฟ",
    ],
    specs: [
      { label: "ประเภท", value: "Sponge with Mesh" },
      { label: "วัสดุนอก", value: "Polyester Mesh" },
      { label: "วัสดุใน", value: "ฟองน้ำ" },
      { label: "การเย็บ", value: "เย็บโพ้งเก็บขอบ" },
    ],
    price: "15",
    sourceUrl: "https://thaimerry.co.th/merry-sponge/",
    imageUrl:
      "https://thaimerry.co.th/wp-content/uploads/2024/12/sponge-re.png",
  },
  {
    id: "p-004",
    slug: "stainless-scrub",
    name: "ฝอยสแตนเลส",
    tagline: "ผลิตภัณฑ์ที่เชี่ยวชาญในการทำความสะอาด",
    description:
      "ฝอยขัดสแตนเลสแท้ ไม่เป็นสนิมตลอดอายุการใช้งาน นุ่ม ไม่บาดมือ ขจัดคราบไหม้ คราบไขมัน และสิ่งสกปรกฝังแน่นบนเครื่องใช้ในครัว ผลลัพธ์เงาวาว",
    features: [
      "เส้นลวดสแตนเลสแท้ 100%",
      "ไม่เป็นสนิมตลอดอายุการใช้งาน",
      "นุ่ม ไม่บาดมือ ปลอดภัย",
      "ขจัดคราบไหม้ คราบไขมันได้ดี",
    ],
    usage: [
      "ใช้ขัดเครื่องครัวที่มีคราบไหม้หรือคราบฝังแน่น",
      "ล้างด้วยน้ำสะอาดและผึ่งไว้หลังการใช้งานทุกครั้ง",
    ],
    warnings: [
      "ห้ามใช้ขัดภาชนะประเภทเทฟลอน",
      "เก็บให้พ้นมือเด็ก",
    ],
    specs: [
      { label: "ประเภท", value: "Stainless Steel Scourer" },
      { label: "วัสดุ", value: "เส้นลวดสแตนเลสแท้" },
      { label: "การเป็นสนิม", value: "ไม่เป็นสนิม" },
      { label: "ความปลอดภัย", value: "นุ่ม ไม่บาดมือ" },
    ],
    price: "15",
    sourceUrl: "https://thaimerry.co.th/stanless-scourer/",
    imageUrl:
      "https://thaimerry.co.th/wp-content/uploads/2024/12/stanless-re1.png",
  },
  {
    id: "p-005",
    slug: "merrybright-twins",
    name: "เมอร์รี่ไบรท์ทวินส์",
    tagline: "สองด้านในชิ้นเดียว ใยขัด + ฟองน้ำ",
    description:
      "เมอร์รี่ไบรท์ทวินส์ ผสมผสานแผ่นใยขัดและฟองน้ำไว้ในชิ้นเดียว ด้านฟองน้ำสำหรับล้างจานทั่วไป ด้านใยขัดสำหรับคราบที่เหนียวติด สะดวกสบายในการทำความสะอาดภาชนะหลากหลายพื้นผิว",
    features: [
      "ออกแบบ 2 ด้าน: ใยขัด + ฟองน้ำ",
      "ด้านฟองน้ำใช้ล้างจานทั่วไป",
      "ด้านใยขัดสำหรับคราบที่เหนียวติด",
      "ทำความสะอาดได้หลากหลายพื้นผิว",
    ],
    usage: [
      "เลือกใช้ด้านที่เหมาะกับลักษณะคราบ",
      "ล้างด้วยน้ำสะอาดหลังการใช้งานทุกครั้ง",
      "ผึ่งให้แห้งก่อนเก็บ",
    ],
    warnings: [
      "ห้ามใช้กับภาชนะเคลือบเทฟลอน",
      "เก็บให้ห่างจากเปลวไฟ",
    ],
    specs: [
      { label: "ประเภท", value: "Twin Pad + Sponge" },
      { label: "ด้านขัด", value: "ใยขัดเคลือบเม็ดทราย" },
      { label: "ด้านล้าง", value: "ฟองน้ำ" },
      { label: "การใช้งาน", value: "หลายพื้นผิว" },
    ],
    price: "15",
    sourceUrl: "https://thaimerry.co.th/merry-brite-twin/",
    imageUrl:
      "https://thaimerry.co.th/wp-content/uploads/2024/12/brite-twin-re2.png",
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug || p.id === slug);

export const reports: Report[] = [
  {
    id: "r-001",
    productSlug: "lighter",
    productName: "ไฟแช็ก เมอร์รี่",
    topic: "จุดไฟไม่ติด",
    detail: "ใช้งานได้ประมาณ 1 สัปดาห์ จากนั้นจุดไม่ติดเลย",
    status: "in_progress",
    createdAt: "2026-04-12T09:30:00",
  },
  {
    id: "r-002",
    productSlug: "merrybright",
    productName: "เมอร์รี่ไบรท์",
    topic: "ฝาขวดรั่ว",
    detail: "เปิดใช้งานครั้งแรก พบว่าฝาขวดปิดไม่สนิท น้ำยารั่วซึมออกมา",
    status: "resolved",
    createdAt: "2026-03-28T14:10:00",
  },
  {
    id: "r-003",
    productSlug: "merrysponge",
    productName: "เมอร์รี่สปอนจ์",
    topic: "ฟองน้ำขาดง่าย",
    detail: "ใช้งานเพียง 3 ครั้ง ฟองน้ำเริ่มฉีกขาด",
    status: "pending",
    createdAt: "2026-04-20T18:45:00",
  },
];

export const luckyDrawEntries: LuckyDrawEntry[] = [
  {
    id: "ld-001",
    productSlug: "merrybright-twins",
    productName: "เมอร์รี่ไบรท์ทวินส์",
    receiptNo: "RC-2026-04-0012",
    amount: 258,
    uploadedAt: "2026-04-22T10:30:00",
    status: "approved",
  },
  {
    id: "ld-002",
    productSlug: "lighter",
    productName: "ไฟแช็ก เมอร์รี่",
    receiptNo: "RC-2026-04-0099",
    amount: 100,
    uploadedAt: "2026-04-23T16:00:00",
    status: "pending",
  },
  {
    id: "ld-003",
    productSlug: "stainless-scrub",
    productName: "ฝอยสแตนเลส",
    receiptNo: "RC-2026-04-0145",
    amount: 45,
    uploadedAt: "2026-04-24T08:20:00",
    status: "approved",
  },
];

export const winners: Winner[] = [
  {
    id: "w-001",
    rank: 1,
    name: "สมชาย ใจดี",
    prize: "ทองคำหนัก 1 บาท",
    drawDate: "2026-04-01",
    province: "กรุงเทพมหานคร",
  },
  {
    id: "w-002",
    rank: 2,
    name: "มาลี รักดี",
    prize: "iPhone 17 Pro",
    drawDate: "2026-04-01",
    province: "เชียงใหม่",
  },
  {
    id: "w-003",
    rank: 1,
    name: "ประสิทธิ์ ศรีสุข",
    prize: "ทองคำหนัก 1 บาท",
    drawDate: "2026-03-01",
    province: "ขอนแก่น",
  },
  {
    id: "w-004",
    rank: 2,
    name: "วิภาดา แก้วใส",
    prize: "iPhone 17 Pro",
    drawDate: "2026-03-01",
    province: "สงขลา",
  },
  {
    id: "w-005",
    rank: 1,
    name: "สุนีย์ พงศ์ภัค",
    prize: "ทองคำหนัก 1 บาท",
    drawDate: "2026-02-01",
    province: "ชลบุรี",
  },
  {
    id: "w-006",
    rank: 2,
    name: "มนัสพล ตั้งทางธรรม",
    prize: "iPhone 17 Pro",
    drawDate: "2026-02-01",
    province: "สมุทรสาคร",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "n-001",
    type: "lucky_draw",
    title: "ส่งข้อมูลร่วมชิงโชคสำเร็จ",
    message:
      "ใบเสร็จ RC-2026-0423 ของคุณได้รับเข้าระบบแล้ว ทีมงานจะตรวจสอบและอัปเดตสถานะภายใน 1-2 วันทำการ",
    href: "/lucky-draw",
    read: false,
    createdAt: "2026-04-25T09:30:00+07:00",
  },
  {
    id: "n-002",
    type: "promotion",
    title: "โปรโมชั่นเดือนเมษายน",
    message:
      "ซื้อเมอร์รี่ไบรท์ทวินส์ครบ 200 บาท รับสิทธิ์ลุ้นทองคำแท่งหนัก 1 บาท ทุกต้นเดือน",
    href: "/products/merrybright-twins",
    read: false,
    createdAt: "2026-04-24T18:05:00+07:00",
  },
  {
    id: "n-003",
    type: "report",
    title: "อัปเดตสถานะคำร้อง",
    message:
      "คำร้องเรื่อง “จุดไฟไม่ติด” ของคุณกำลังอยู่ระหว่างการตรวจสอบ ทีมงานจะติดต่อกลับเร็ว ๆ นี้",
    href: "/report",
    read: true,
    createdAt: "2026-04-23T13:42:00+07:00",
  },
  {
    id: "n-004",
    type: "winner",
    title: "ประกาศรายชื่อผู้โชคดีประจำเดือน",
    message:
      "ตรวจสอบรายชื่อผู้ได้รับรางวัลทองคำหนัก 1 บาทประจำเดือนมีนาคม 2569 ได้แล้ว",
    href: "/winners",
    read: true,
    createdAt: "2026-04-01T10:00:00+07:00",
  },
  {
    id: "n-005",
    type: "system",
    title: "ยินดีต้อนรับสู่ myTM",
    message:
      "ขอบคุณที่ลงทะเบียนเป็นสมาชิก myTM คุณจะได้รับข่าวสาร โปรโมชั่น และสิทธิ์พิเศษมากมาย",
    read: true,
    createdAt: "2024-03-15T08:00:00+07:00",
  },
];

export function mockCheckProduct(serial: string): CheckProductResult {
  const product = products[Math.abs(hashCode(serial)) % products.length];
  const valid = !serial.toLowerCase().startsWith("fake");
  return {
    serial,
    product: product.slug,
    productName: product.name,
    isAuthentic: valid,
    manufacturedAt: "2026-01-12",
    warrantyUntil: "2027-01-12",
    batch: `BATCH-${Math.abs(hashCode(serial)) % 9999}`,
  };
}

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
