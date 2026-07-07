import Link from "next/link";
import { Search, TrendingUp, Tag } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="container-page relative">
        <div className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Tag className="h-4 w-4" /> คูปองและดีลอัปเดตทุกวัน
        </div>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl">
          ประหยัดได้จริง กับส่วนลดที่ดีที่สุดในไทย
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          รวมคูปอง โค้ดส่วนลด และโปรโมชั่นจากร้านค้าชั้นนำ อัปเดตใหม่ทุกวัน ให้คุณช้อปคุ้มกว่าเดิม
        </p>

        <form action="/search" className="mt-8 flex max-w-lg items-center gap-2 rounded-full bg-white p-1.5 shadow-elevation4">
          <Search className="ml-3 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            name="q"
            placeholder="ค้นหาคูปอง แบรนด์ หรือหมวดหมู่..."
            className="w-full flex-1 bg-transparent px-2 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
          />
          <button type="submit" className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
            ค้นหา
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/trending" className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 font-medium hover:bg-white/25">
            <TrendingUp className="h-4 w-4" /> กำลังฮิตตอนนี้
          </Link>
          <Link href="/categories" className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 font-medium hover:bg-white/25">
            <Tag className="h-4 w-4" /> ดูหมวดหมู่ทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}
