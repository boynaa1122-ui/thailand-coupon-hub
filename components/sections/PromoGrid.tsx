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
      {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 4 columns */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, index) => (
          <Link key={index} href={item.link}>
            <div 
              className="group relative overflow-hidden rounded-md3md aspect-square cursor-pointer shadow-elevation2 transition-all hover:shadow-elevation4"
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
              <div className="absolute right-2 top-2 z-20 sm:right-3 sm:top-3 rounded-full bg-yellow-400 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
                {item.badge}
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-5 text-white">
                <div className="mb-0.5 sm:mb-1 flex items-center gap-1 sm:gap-2">
                  {/* Small Brand Icon Placeholder */}
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/20 backdrop-blur-sm" />
                  <h3 className="font-display text-sm sm:text-xl font-bold leading-none tracking-tight line-clamp-1">{item.title}</h3>
                </div>
                <p className="text-[10px] sm:text-xs font-medium text-white/80 line-clamp-2 leading-relaxed hidden sm:block">{item.subtitle}</p>
                
                <div className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90">
                  <span className="line-clamp-1">เก็บโค้ด</span>
                  <span className="transition-transform group-hover:translate-x-1 flex-shrink-0">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
