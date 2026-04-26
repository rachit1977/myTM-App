export type ProductSlug =
  | "lighter"
  | "merrybright"
  | "merrysponge"
  | "stainless-scrub"
  | "merrybright-twins";

export interface Product {
  id: string;
  slug: ProductSlug;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  usage: string[];
  warnings: string[];
  specs: { label: string; value: string }[];
  price?: string;
  sourceUrl: string;
  imageUrl: string;
}

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  memberSince: string;
  points: number;
  tier: "Silver" | "Gold" | "Platinum";
}

export interface Report {
  id: string;
  productSlug: ProductSlug;
  productName: string;
  topic: string;
  detail: string;
  status: "pending" | "in_progress" | "resolved";
  createdAt: string;
}

export interface LuckyDrawEntry {
  id: string;
  productSlug: ProductSlug;
  productName: string;
  receiptNo: string;
  amount: number;
  uploadedAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface Winner {
  id: string;
  name: string;
  prize: string;
  drawDate: string;
  province: string;
}

export type NotificationType =
  | "lucky_draw"
  | "report"
  | "promotion"
  | "system"
  | "winner";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  href?: string;
  read: boolean;
  createdAt: string;
}

export interface CheckProductResult {
  serial: string;
  product: ProductSlug;
  productName: string;
  isAuthentic: boolean;
  manufacturedAt: string;
  warrantyUntil: string;
  batch: string;
}
