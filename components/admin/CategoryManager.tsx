"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { slugifyText } from "@/lib/utils";
import type { Category } from "@/types";

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [nameTh, setNameTh] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreate() {
    if (!nameTh || !nameEn) return toast.error("กรุณากรอกชื่อทั้งภาษาไทยและอังกฤษ");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_th: nameTh,
          name_en: nameEn,
          slug: slugifyText(nameEn),
          display_order: categories.length,
        }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setCategories((prev) => [...prev, created]);
      setNameTh("");
      setNameEn("");
      toast.success("เพิ่มหมวดหมู่สำเร็จ");
    } catch {
      toast.error("เพิ่มหมวดหมู่ไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("ยืนยันการลบหมวดหมู่นี้?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("ลบสำเร็จ");
    } catch {
      toast.error("ลบไม่สำเร็จ");
    }
  }

  return (
    <div className="space-y-6">
      <div className="card-surface flex flex-wrap items-end gap-3 p-4">
        <Input label="ชื่อ (ไทย)" value={nameTh} onChange={(e) => setNameTh(e.target.value)} />
        <Input label="ชื่อ (อังกฤษ)" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
        <Button onClick={handleCreate} isLoading={isSubmitting} icon={<Plus className="h-4 w-4" />}>
          เพิ่มหมวดหมู่
        </Button>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:border-neutral-800">
            <tr>
              <th className="px-4 py-3">ชื่อ (ไทย)</th>
              <th className="px-4 py-3">ชื่อ (อังกฤษ)</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">สถานะ</th>
              <th className="px-4 py-3">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 font-medium">{c.name_th}</td>
                <td className="px-4 py-3 text-neutral-500">{c.name_en}</td>
                <td className="px-4 py-3 text-neutral-500">{c.slug}</td>
                <td className="px-4 py-3">
                  <Badge variant={c.is_active ? "success" : "neutral"}>{c.is_active ? "เปิดใช้งาน" : "ปิดใช้งาน"}</Badge>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(c.id)} className="text-accent-600 hover:underline">
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
