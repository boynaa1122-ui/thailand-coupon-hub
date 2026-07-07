"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tag } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginFormValues } from "@/lib/validators";
import { loginWithPassword } from "@/services/authService";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    try {
      await loginWithPassword(values.email, values.password);
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6 dark:bg-surface-dark">
      <div className="w-full max-w-sm rounded-md3lg bg-white p-8 shadow-elevation3 dark:bg-surface-darkDim">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="rounded-full bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
            <Tag className="h-6 w-6" />
          </div>
          <h1 className="font-display text-xl font-bold">เข้าสู่ระบบแอดมิน</h1>
          <p className="text-sm text-neutral-500">Deals Thai Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="อีเมล" type="email" {...register("email")} error={errors.email?.message} />
          <Input label="รหัสผ่าน" type="password" {...register("password")} error={errors.password?.message} />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            เข้าสู่ระบบ
          </Button>
        </form>
      </div>
    </div>
  );
}
