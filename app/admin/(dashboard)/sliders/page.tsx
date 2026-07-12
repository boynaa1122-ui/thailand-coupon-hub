import { createClient } from "@/lib/supabase/server";
import { listAllSliders } from "@/services/sliderService";
import { SliderManager } from "@/components/admin/SliderManager";

export const metadata = {
  title: "จัดการ Slider",
};

export default async function SlidersPage() {
  const supabase = await createClient();
  const sliders = await listAllSliders(supabase).catch(() => []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">จัดการ Slider</h1>
        <p className="mt-2 text-neutral-600">จัดการรูปภาพโปรโมชั่นในหน้าแรก</p>
      </div>

      <SliderManager initialSliders={sliders} />
    </div>
  );
}
