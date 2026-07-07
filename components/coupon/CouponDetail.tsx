"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check, ExternalLink, Clock, Store, Tag as TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { formatDiscount, formatDate, daysUntil, isExpired } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { Coupon } from "@/types";

export function CouponDetail({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);
  const expired = isExpired(coupon.expires_at);
  const daysLeft = daysUntil(coupon.expires_at);

  function handleCopy() {
    if (!coupon.code) return;
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    trackEvent("coupon_copy", "coupon", coupon.id);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleVisitMerchant() {
    trackEvent("coupon_click", "coupon", coupon.id);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md3lg bg-neutral-100 dark:bg-neutral-800">
        {coupon.image_url ? (
          <Image src={coupon.image_url} alt={coupon.title} fill className="object-cover" priority />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            <Store className="h-16 w-16" />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="primary">{formatDiscount(coupon.discount_type, coupon.discount_value)}</Badge>
          {coupon.category && (
            <Link href={`/categories/${coupon.category.slug}`}>
              <Badge variant="neutral">
                <TagIcon className="h-3 w-3" /> {coupon.category.name_th}
              </Badge>
            </Link>
          )}
          {expired && <Badge variant="accent">หมดอายุแล้ว</Badge>}
        </div>

        <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">{coupon.title}</h1>

        {coupon.brand?.name && (
          <p className="mt-1 text-sm font-medium text-secondary-600">ร้าน {coupon.brand.name}</p>
        )}

        {coupon.description && (
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{coupon.description}</p>
        )}

        <div className="mt-6 space-y-3 rounded-md3lg border border-dashed border-primary-300 bg-primary-50/50 p-5 dark:border-primary-800 dark:bg-primary-900/10">
          {coupon.code ? (
            <>
              <p className="text-xs font-medium text-neutral-500">รหัสส่วนลด</p>
              <div className="flex items-center gap-3">
                <code className="flex-1 rounded-md3sm border border-primary-300 bg-white px-4 py-3 text-center font-mono text-lg font-bold tracking-wider text-primary-700 dark:border-primary-700 dark:bg-surface-darkDim dark:text-primary-300">
                  {coupon.code}
                </code>
                <Button onClick={handleCopy} disabled={expired} variant={copied ? "secondary" : "primary"}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              ไม่ต้องใช้โค้ด กดรับส่วนลดได้ทันทีที่ร้านค้า
            </p>
          )}

          {coupon.merchant_url && !expired && (
            <LinkButton
              href={coupon.merchant_url}
              target="_blank"
              onClick={handleVisitMerchant}
              variant="outline"
              className="w-full"
            >
              ไปที่ร้านค้า <ExternalLink className="h-4 w-4" />
            </LinkButton>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-500">
          {coupon.expires_at && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              หมดอายุ {formatDate(coupon.expires_at)}
              {daysLeft !== null && daysLeft >= 0 && !expired && ` (เหลืออีก ${daysLeft} วัน)`}
            </span>
          )}
          <span>ใช้ไปแล้ว {coupon.copies_count} ครั้ง</span>
        </div>
      </div>
    </div>
  );
}
