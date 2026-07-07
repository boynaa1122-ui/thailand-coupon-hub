import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale: "th" | "en" = "th") {
  const d = new Date(date);
  return d.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function timeAgo(date: string | Date, locale: "th" | "en" = "th") {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const units: [number, string, string][] = [
    [31536000, "ปี", "year"],
    [2592000, "เดือน", "month"],
    [86400, "วัน", "day"],
    [3600, "ชั่วโมง", "hour"],
    [60, "นาที", "minute"],
  ];
  for (const [secs, th, en] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) {
      return locale === "th" ? `${value} ${th}ที่แล้ว` : `${value} ${en}${value > 1 ? "s" : ""} ago`;
    }
  }
  return locale === "th" ? "เมื่อสักครู่" : "just now";
}

export function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}

export function daysUntil(expiresAt: string | null): number | null {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDiscount(type: string, value: number): string {
  if (type === "percentage") return `ลด ${value}%`;
  if (type === "fixed") return `ลด ฿${value}`;
  return "ของแถม/สิทธิพิเศษ";
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

export function readingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function slugifyText(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0E00-\u0E7F-]+/g, "")
    .replace(/--+/g, "-");
}
