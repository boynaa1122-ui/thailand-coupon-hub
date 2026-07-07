"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { couponSchema, type CouponFormValues } from "@/lib/validators";
import type { Category, Brand, Coupon } from "@/types";

interface CouponFormProps {
  categories: Category[];
  brands: Brand[];
  initialData?: Coupon;
}

export function CouponForm({ categories, brands, initialData }: CouponFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description || "",
          code: initialData.code || "",
          discount_type: initialData.discount_type,
          discount_value: initialData.discount_value,
          merchant_url: initialData.merchant_url || "",
          image_url: initialData.image_url || "",
          category_id: initialData.category_id || "",
          brand_id: initialData.brand_id || "",
          is_featured: initialData.is_featured,
          is_active: initialData.is_active,
          expires_at: initialData.expires_at ? initialData.expires_at.slice(0, 10) : "",
          meta_title: initialData.meta_title || "",
          meta_description: initialData.meta_description || "",
        }
      : { discount_type: "percentage", is_active: true },
  });

  async function onSubmit(values: CouponFormValues) {
    setIsSubmitting(true);
    try {
      const url = initialData ? `/api/admin/coupons/${initialData.id}` : "/api/admin/coupons";
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(initialData ? "อัปเดตคูปองแล้ว" : "สร้างคูปองใหม่แล้ว");
      router.push("/admin/coupons");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <Input label="ชื่อคูปอง" {...register("title")} error={errors.title?.message} />
      <Textarea label="รายละเอียด" {...register("description")} error={errors.description?.message} />

      <div className="grid grid-cols-2 gap-4">
        <Input label="รหัสโค้ด (ถ้ามี)" {...register("code")} error={errors.code?.message} />
        <Select label="ประเภทส่วนลด" {...register("discount_type")}>
          <option value="percentage">เปอร์เซ็นต์ (%)</option>
          <option value="fixed">จำนวนเงินคงที่ (฿)</option>
          <option value="freebie">ของแถม/สิทธิพิเศษ</option>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          label="มูลค่าส่วนลด"
          {...register("discount_value")}
          error={errors.discount_value?.message}
        />
        <Input type="date" label="วันหมดอายุ" {...register("expires_at")} />
      </div>

      <Input label="ลิงก์ร้านค้า" placeholder="https://..." {...register("merchant_url")} error={errors.merchant_url?.message} />
      <Input label="ลิงก์รูปภาพ" placeholder="https://..." {...register("image_url")} />

      <div className="grid grid-cols-2 gap-4">
        <Select label="หมวดหมู่" {...register("category_id")}>
          <option value="">ไม่ระบุ</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name_th}
            </option>
          ))}
        </Select>
        <Select label="แบรนด์" {...register("brand_id")}>
          <option value="">ไม่ระบุ</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("is_featured")} className="h-4 w-4 rounded" />
          แนะนำหน้าแรก
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("is_active")} className="h-4 w-4 rounded" />
          เปิดใช้งาน
        </label>
      </div>

      <fieldset className="space-y-4 rounded-md3md border border-neutral-200 p-4 dark:border-neutral-800">
        <legend className="px-1 text-sm font-semibold text-neutral-600">SEO</legend>
        <Input label="Meta Title" {...register("meta_title")} />
        <Textarea label="Meta Description" {...register("meta_description")} />
      </fieldset>

      <div className="flex gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? "บันทึกการแก้ไข" : "สร้างคูปอง"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          ยกเลิก
        </Button>
      </div>
    </form>
  );
}
