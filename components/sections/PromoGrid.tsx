import Image from "next/image";
import Link from "next/link";
import type { PromoGridItem } from "@/types";

interface PromoGridProps {
  items: PromoGridItem[];
}

export function PromoGrid({ items }: PromoGridProps) {
  if (items.length === 0) return null;

  return (
    <div className="container-page py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <Link key={index} href={item.link}>
            <div 
              className="group relative overflow-hidden rounded-md3md h-48 cursor-pointer shadow-elevation2 transition-all hover:shadow-elevation4"
              style={{ backgroundColor: item.color.startsWith('bg-[') ? item.color.match(/\[(.*?)\]/)?.[1] : undefined }}
            >
              {/* Brand Logo/Icon Overlay (Simulated) */}
              <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/40 via-transparent to-black/60" />

              {/* Badge */}
              <div className="absolute right-3 top-3 z-20 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
                {item.badge}
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 text-white">
                <div className="mb-1 flex items-center gap-2">
                  {/* Small Brand Icon Placeholder */}
                  <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm" />
                  <h3 className="font-display text-xl font-bold leading-none tracking-tight">{item.title}</h3>
                </div>
                <p className="text-xs font-medium text-white/80 line-clamp-2 leading-relaxed">{item.subtitle}</p>
                
                <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/90">
                  <span>เก็บโค้ดเลย</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
