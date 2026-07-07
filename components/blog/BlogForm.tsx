"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { blogPostSchema, type BlogPostFormValues } from "@/lib/validators";
import { slugifyText } from "@/lib/utils";
import type { BlogCategory, BlogPost } from "@/types";

interface BlogFormProps {
  categories: BlogCategory[];
  initialData?: BlogPost;
}

export function BlogForm({ categories, initialData }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          excerpt: initialData.excerpt || "",
          content: initialData.content,
          featured_image: initialData.featured_image || "",
          category_id: initialData.category_id || "",
          author: initialData.author,
          status: initialData.status,
          meta_title: initialData.meta_title || "",
          meta_description: initialData.meta_description || "",
        }
      : { status: "draft", author: "Deals Thai Team" },
  });

  const title = watch("title");

  function handleTitleBlur() {
    if (!initialData && title) {
      setValue("slug", slugifyText(title));
    }
  }

  async function onSubmit(values: BlogPostFormValues) {
    setIsSubmitting(true);
    try {
      const url = initialData ? `/api/admin/blog/${initialData.id}` : "/api/admin/blog";
      const method = initialData ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(initialData ? "อัปเดตบทความแล้ว" : "สร้างบทความใหม่แล้ว");
      router.push("/admin/blog");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-5">
      <Input label="ชื่อบทความ" {...register("title")} onBlur={handleTitleBlur} error={errors.title?.message} />
      <Input label="Slug" {...register("slug")} error={errors.slug?.message} hint="ใช้ในลิงก์ URL เช่น /blog/your-slug" />
      <Textarea label="คำโปรย (excerpt)" {...register("excerpt")} />
      <Textarea
        label="เนื้อหา (รองรับ Markdown)"
        {...register("content")}
        error={errors.content?.message}
        className="min-h-[300px] font-mono text-sm"
      />
      <Input label="ลิงก์รูปภาพหลัก" placeholder="https://..." {...register("featured_image")} />

      <div className="grid grid-cols-2 gap-4">
        <Select label="หมวดหมู่" {...register("category_id")}>
          <option value="">ไม่ระบุ</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name_th}
            </option>
          ))}
        </Select>
        <Select label="สถานะ" {...register("status")}>
          <option value="draft">ฉบับร่าง</option>
          <option value="published">เผยแพร่</option>
        </Select>
      </div>

      <Input label="ผู้เขียน" {...register("author")} />

      <fieldset className="space-y-4 rounded-md3md border border-neutral-200 p-4 dark:border-neutral-800">
        <legend className="px-1 text-sm font-semibold text-neutral-600">SEO</legend>
        <Input label="Meta Title" {...register("meta_title")} />
        <Textarea label="Meta Description" {...register("meta_description")} />
      </fieldset>

      <div className="flex gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? "บันทึกการแก้ไข" : "สร้างบทความ"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          ยกเลิก
        </Button>
      </div>
    </form>
  );
}
