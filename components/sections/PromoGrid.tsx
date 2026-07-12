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
            <div className={`group relative overflow-hidden rounded-md3md ${item.color} h-48 cursor-pointer`}>
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-70 transition-opacity group-hover:opacity-90"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Badge */}
              <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-neutral-900">
                {item.badge}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-white/90">{item.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
