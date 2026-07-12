import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/common/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "ติดต่อเรา",
  description: "ติดต่อทีมงาน Deals Thai สำหรับข้อเสนอแนะ ความร่วมมือ หรือแจ้งปัญหา",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-page py-14">
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">ติดต่อเรา</h1>
      <p className="mt-2 max-w-xl text-neutral-500">
        มีคำถาม ข้อเสนอแนะ หรือต้องการร่วมมือกับเรา? ส่งข้อความถึงทีมงานได้เลย
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <ContactForm />

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-primary-500" />
            <div>
              <p className="font-medium">อีเมล</p>
              <p className="text-sm text-neutral-500">contact@dealsthai.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-primary-500" />
            <div>
              <p className="font-medium">โทรศัพท์</p>
              <p className="text-sm text-neutral-500">02-123-4567 (จันทร์-ศุกร์ 09:00-18:00)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-primary-500" />
            <div>
              <p className="font-medium">ที่อยู่</p>
              <p className="text-sm text-neutral-500">กรุงเทพมหานคร ประเทศไทย</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
