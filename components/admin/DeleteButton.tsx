"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteButton({ endpoint }: { endpoint: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("ยืนยันการลบรายการนี้? การลบไม่สามารถย้อนกลับได้")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error("failed");
      toast.success("ลบสำเร็จ");
      router.refresh();
    } catch {
      toast.error("ลบไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-accent-600 hover:underline disabled:opacity-50"
    >
      ลบ
    </button>
  );
}
