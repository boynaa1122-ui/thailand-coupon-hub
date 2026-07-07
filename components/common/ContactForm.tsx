"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormValues } from "@/lib/validators";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("ส่งข้อความสำเร็จ ทีมงานจะติดต่อกลับโดยเร็วที่สุด");
      reset();
    } catch {
      toast.error("ส่งข้อความไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="ชื่อ" {...register("name")} error={errors.name?.message} />
      <Input label="อีเมล" type="email" {...register("email")} error={errors.email?.message} />
      <Input label="หัวข้อ" {...register("subject")} />
      <Textarea label="ข้อความ" {...register("message")} error={errors.message?.message} />
      <Button type="submit" isLoading={isSubmitting}>
        ส่งข้อความ
      </Button>
    </form>
  );
}
