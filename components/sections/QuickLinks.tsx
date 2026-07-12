import Link from "next/link";
import {
  Flame,
  Truck,
  Percent,
  Store,
  Calendar,
  Crown,
  TrendingUp,
  Heart,
  Gift,
  Zap,
  AlertCircle,
  Star,
} from "lucide-react";
import type { QuickLinkItem } from "@/types";

interface QuickLinksProps {
  items: QuickLinkItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Flame,
  Truck,
  Percent,
  Store,
  Calendar,
  Crown,
  TrendingUp,
  Heart,
  Gift,
  Zap,
  AlertCircle,
  Star,
};

export function QuickLinks({ items }: QuickLinksProps) {
  if (items.length === 0) return null;

  return (
    <div className="container-page py-6">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Flame;

          return (
            <Link key={index} href={item.link}>
              <div className="group flex flex-col items-center gap-2 rounded-md3md bg-white p-4 text-center shadow-elevation1 transition-all hover:shadow-elevation3 dark:bg-surface-darkDim">
                <div className={`rounded-full bg-neutral-100 p-3 dark:bg-neutral-800 ${item.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</p>
                  <p className="text-xs text-neutral-500">{item.subtitle}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
