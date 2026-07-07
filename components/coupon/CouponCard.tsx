import Image from "next/image";
import Link from "next/link";
import { Clock, Store } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDiscount, daysUntil, isExpired } from "@/lib/utils";
import type { Coupon } from "@/types";

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const expired = isExpired(coupon.expires_at);
  const daysLeft = daysUntil(coupon.expires_at);

  return (
    <Card className="group flex h-full flex-col animate-slideUp">
      <Link href={`/coupon/${coupon.id}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {coupon.image_url ? (
          <Image
            src={coupon.image_url}
            alt={coupon.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            <Store className="h-10 w-10" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge variant="primary">{formatDiscount(coupon.discount_type, coupon.discount_value)}</Badge>
        </div>
        {expired && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-800">หมดอายุแล้ว</span>
          </div>
        )}
      </Link>

      <CardBody className="flex flex-1 flex-col">
        {coupon.brand?.name && (
          <span className="mb-1 text-xs font-medium text-secondary-600">{coupon.brand.name}</span>
        )}
        <Link href={`/coupon/${coupon.id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-neutral-900 hover:text-primary-600 dark:text-neutral-100">
            {coupon.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-neutral-500">
          {daysLeft !== null && !expired && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              เหลืออีก {daysLeft} วัน
            </span>
          )}
          <Link
            href={`/coupon/${coupon.id}`}
            className="ml-auto rounded-full bg-primary-50 px-3 py-1.5 font-semibold text-primary-600 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300"
          >
            ดูโค้ด
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
