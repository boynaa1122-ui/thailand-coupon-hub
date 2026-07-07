import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "นโยบายความเป็นส่วนตัว",
  description: "นโยบายความเป็นส่วนตัวของ Deals Thai",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">นโยบายความเป็นส่วนตัว</h1>
      <div className="prose prose-neutral mt-6 dark:prose-invert">
        <p>ปรับปรุงล่าสุด: 2026</p>
        <h2>ข้อมูลที่เราเก็บรวบรวม</h2>
        <p>
          เราเก็บข้อมูลการใช้งานเว็บไซต์ เช่น หน้าที่เข้าชม การคลิกคูปอง และคำค้นหา เพื่อปรับปรุงคุณภาพของบริการ
          และแสดงเนื้อหาที่เกี่ยวข้องกับความสนใจของคุณ
        </p>
        <h2>การใช้ข้อมูล</h2>
        <p>
          ข้อมูลที่เก็บรวบรวมจะถูกใช้เพื่อการวิเคราะห์และปรับปรุงเว็บไซต์เท่านั้น เราจะไม่ขายหรือเปิดเผยข้อมูลส่วนบุคคล
          ของคุณให้บุคคลที่สามโดยไม่ได้รับความยินยอม
        </p>
        <h2>คุกกี้</h2>
        <p>เว็บไซต์นี้ใช้คุกกี้เพื่อจดจำการตั้งค่าและปรับปรุงประสบการณ์การใช้งานของคุณ</p>
        <h2>ติดต่อเรา</h2>
        <p>หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ contact@dealsthai.com</p>
      </div>
    </div>
  );
}
