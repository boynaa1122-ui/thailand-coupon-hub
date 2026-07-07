"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function SettingsForm({ initialSettings }: { initialSettings: Record<string, any> }) {
  const [siteName, setSiteName] = useState(initialSettings.site_name || "");
  const [siteDescription, setSiteDescription] = useState(initialSettings.site_description || "");
  const [contactEmail, setContactEmail] = useState(initialSettings.contact_email || "");
  const [facebook, setFacebook] = useState(initialSettings.social_links?.facebook || "");
  const [instagram, setInstagram] = useState(initialSettings.social_links?.instagram || "");
  const [line, setLine] = useState(initialSettings.social_links?.line || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSave() {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_name: siteName,
          site_description: siteDescription,
          contact_email: contactEmail,
          social_links: { facebook, instagram, line },
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("บันทึกการตั้งค่าเรียบร้อย");
    } catch {
      toast.error("บันทึกไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl space-y-5">
      <Input label="ชื่อเว็บไซต์" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
      <Textarea label="คำอธิบายเว็บไซต์" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} />
      <Input label="อีเมลติดต่อ" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />

      <fieldset className="space-y-4 rounded-md3md border border-neutral-200 p-4 dark:border-neutral-800">
        <legend className="px-1 text-sm font-semibold text-neutral-600">โซเชียลมีเดีย</legend>
        <Input label="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        <Input label="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
        <Input label="LINE" value={line} onChange={(e) => setLine(e.target.value)} />
      </fieldset>

      <Button onClick={handleSave} isLoading={isSubmitting}>
        บันทึกการตั้งค่า
      </Button>
    </div>
  );
}
