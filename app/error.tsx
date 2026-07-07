"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <AlertTriangle className="h-12 w-12 text-accent-500" />
      <h1 className="font-display text-2xl font-bold">เกิดข้อผิดพลาดบางอย่าง</h1>
      <p className="max-w-md text-neutral-500">
        ขออภัยในความไม่สะดวก ระบบเกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
      </p>
      <Button onClick={reset}>ลองใหม่อีกครั้ง</Button>
    </div>
  );
}
