import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Deals Thai";

interface SeoInput {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  keywords?: string | null;
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  keywords,
  type = "website",
}: SeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImage = image || `${SITE_URL}/images/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: keywords || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "th_TH",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function couponJsonLd(coupon: {
  title: string;
  description: string | null;
  code: string | null;
  merchant_url: string | null;
  expires_at: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: coupon.title,
    description: coupon.description || coupon.title,
    ...(coupon.code ? { discountCode: coupon.code } : {}),
    url: coupon.merchant_url || SITE_URL,
    priceCurrency: "THB",
    availability: "https://schema.org/InStock",
    ...(coupon.expires_at ? { validThrough: coupon.expires_at } : {}),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string | null;
  slug: string;
  featured_image: string | null;
  author: string;
  published_at: string | null;
  updated_at: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.featured_image ? [post.featured_image] : undefined,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.published_at || post.updated_at,
    dateModified: post.updated_at,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export { SITE_URL, SITE_NAME };
