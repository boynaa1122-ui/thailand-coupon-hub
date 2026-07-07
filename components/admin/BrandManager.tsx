"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { slugifyText } from "@/lib/utils";
import type { Brand } from "@/types";

export function BrandManager({ initialBrands }: { initialBrands: Brand[] }) {
  const [brands, setBrands] = useState(initialBrands);
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreate() {
    if (!name) return toast.error("กรุณากรอกชื่อแบรนด์");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slugifyText(name),
          website_url: websiteUrl,
          display_order: brands.length,
        }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setBrands((prev) => [...prev, created]);
      setName("");
      setWebsiteUrl("");
      toast.success("เพิ่มแบรนด์สำเร็จ");
    } catch {
      toast.error("เพิ่มแบรนด์ไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("ยืนยันการลบแบรนด์นี้?")) return;
    try {
      const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setBrands((prev) => prev.filter((b) => b.id !== id));
      toast.success("ลบสำเร็จ");
    } catch {
      toast.error("ลบไม่สำเร็จ");
    }
  }

  return (
    <div className="space-y-6">
      <div className="card-surface flex flex-wrap items-end gap-3 p-4">
        <Input label="ชื่อแบรนด์" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="ลิงก์เว็บไซต์" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
        <Button onClick={handleCreate} isLoading={isSubmitting} icon={<Plus className="h-4 w-4" />}>
          เพิ่มแบรนด์
        </Button>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:border-neutral-800">
            <tr>
              <th className="px-4 py-3">ชื่อแบรนด์</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">เว็บไซต์</th>
              <th className="px-4 py-3">การจัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {brands.map((b) => (
              <tr key={b.id}>
                <td className="px-4 py-3 font-medium">{b.name}</td>
                <td className="px-4 py-3 text-neutral-500">{b.slug}</td>
                <td className="px-4 py-3 text-neutral-500">{b.website_url}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(b.id)} className="text-accent-600 hover:underline">
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
