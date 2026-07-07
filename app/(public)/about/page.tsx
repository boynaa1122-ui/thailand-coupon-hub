import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "เกี่ยวกับเรา",
  description: "รู้จัก Deals Thai เว็บไซต์รวมคูปองและดีลส่วนลดที่ดีที่สุดในไทย",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">เกี่ยวกับ Deals Thai</h1>
      <div className="prose prose-neutral mt-6 dark:prose-invert">
        <p>
          Deals Thai คือแพลตฟอร์มรวบรวมคูปอง โค้ดส่วนลด และโปรโมชั่นจากร้านค้าและแบรนด์ชั้นนำในประเทศไทย
          ก่อตั้งขึ้นด้วยเป้าหมายเดียว คือช่วยให้นักช้อปชาวไทยประหยัดเงินได้มากขึ้นในทุกการซื้อของ
        </p>
        <p>
          ทีมงานของเราตรวจสอบและอัปเดตคูปองทุกวัน เพื่อให้มั่นใจว่าโค้ดส่วนลดที่คุณเห็นบนเว็บไซต์ยังใช้งานได้จริง
          ไม่ว่าจะเป็นแฟชั่น อิเล็กทรอนิกส์ อาหาร ท่องเที่ยว หรือความงาม เรารวบรวมไว้ให้คุณในที่เดียว
        </p>
        <h2>พันธกิจของเรา</h2>
        <ul>
          <li>รวบรวมคูปองที่ใช้งานได้จริงและอัปเดตล่าสุด</li>
          <li>นำเสนอเนื้อหาที่เป็นประโยชน์เกี่ยวกับการช้อปปิ้งอย่างคุ้มค่า</li>
          <li>สร้างประสบการณ์การใช้งานที่รวดเร็วและใช้งานง่ายบนทุกอุปกรณ์</li>
        </ul>
      </div>
    </div>
  );
}
