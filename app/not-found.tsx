import Link from "next/link";
import { SearchX } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <SearchX className="h-14 w-14 text-primary-400" />
      <h1 className="font-display text-3xl font-bold">404 - ไม่พบหน้านี้</h1>
      <p className="max-w-md text-neutral-500">
        หน้าที่คุณกำลังค้นหาอาจถูกย้ายหรือลบไปแล้ว ลองกลับไปที่หน้าแรกของเรา
      </p>
      <LinkButton href="/">กลับหน้าแรก</LinkButton>
    </div>
  );
}
