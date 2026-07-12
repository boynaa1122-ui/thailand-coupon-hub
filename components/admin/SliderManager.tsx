"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Slider } from "@/types";

interface SliderManagerProps {
  initialSliders: Slider[];
}

export function SliderManager({ initialSliders }: SliderManagerProps) {
  const [sliders, setSliders] = useState<Slider[]>(initialSliders);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    link_url: "",
    display_order: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      image_url: "",
      link_url: "",
      display_order: 0,
      is_active: true,
    });
    setEditingId(null);
  };

  const handleEdit = (slider: Slider) => {
    setEditingId(slider.id);
    setFormData({
      title: slider.title,
      image_url: slider.image_url,
      link_url: slider.link_url || "",
      display_order: slider.display_order,
      is_active: slider.is_active,
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image_url) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsLoading(true);
    try {
      const url = editingId ? `/api/admin/sliders/${editingId}` : "/api/admin/sliders";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      if (editingId) {
        setSliders(sliders.map((s) => (s.id === editingId ? data : s)));
        toast.success("อัปเดต Slider แล้ว");
      } else {
        setSliders([...sliders, data]);
        toast.success("สร้าง Slider ใหม่แล้ว");
      }
      resetForm();
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ยืนยันการลบ?")) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/sliders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Request failed");

      setSliders(sliders.filter((s) => s.id !== id));
      toast.success("ลบ Slider แล้ว");
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md3md border border-neutral-200 p-6 dark:border-neutral-800">
        <h3 className="mb-4 text-lg font-semibold">{editingId ? "แก้ไข Slider" : "สร้าง Slider ใหม่"}</h3>

        <div className="space-y-4">
          <Input label="ชื่อ Slider" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <Input
            label="ลิงก์รูปภาพ"
            type="url"
            placeholder="https://..."
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
          <Input
            label="ลิงก์ปลายทาง (ไม่บังคับ)"
            type="url"
            placeholder="https://..."
            value={formData.link_url}
            onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
          />
          <Input
            label="ลำดับการแสดง"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span className="text-sm font-medium">เปิดใช้งาน</span>
          </label>

          <div className="flex gap-3">
            <Button onClick={handleSave} isLoading={isLoading}>
              {editingId ? "บันทึกการแก้ไข" : "สร้าง Slider"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={resetForm}>
                ยกเลิก
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Sliders List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Sliders ทั้งหมด ({sliders.length})</h3>
        {sliders.length === 0 ? (
          <p className="text-neutral-500">ยังไม่มี Slider</p>
        ) : (
          sliders.map((slider) => (
            <div key={slider.id} className="flex gap-4 rounded-md3md border border-neutral-200 p-4 dark:border-neutral-800">
              {/* Thumbnail */}
              <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-md3md bg-neutral-100">
                <Image src={slider.image_url} alt={slider.title} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-semibold">{slider.title}</h4>
                <p className="text-sm text-neutral-500">{slider.image_url}</p>
                {slider.link_url && <p className="text-sm text-primary-600">{slider.link_url}</p>}
                <p className="text-xs text-neutral-400">ลำดับ: {slider.display_order}</p>
                <span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${slider.is_active ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-700"}`}>
                  {slider.is_active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(slider)}>
                  แก้ไข
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(slider.id)} className="text-accent-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
