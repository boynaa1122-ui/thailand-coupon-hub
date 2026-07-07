import Link from "next/link";
import { Tag, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

const FOOTER_LINKS = [
  {
    title: "เมนูหลัก",
    links: [
      { href: "/categories", label: "หมวดหมู่ทั้งหมด" },
      { href: "/trending", label: "คูปองกำลังฮิต" },
      { href: "/blog", label: "บทความ" },
      { href: "/search", label: "ค้นหา" },
    ],
  },
  {
    title: "เกี่ยวกับเรา",
    links: [
      { href: "/about", label: "เกี่ยวกับ Deals Thai" },
      { href: "/contact", label: "ติดต่อเรา" },
      { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-surface-dark">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary-600">
            <Tag className="h-6 w-6" />
            Deals Thai
          </Link>
          <p className="mt-3 text-sm text-neutral-500">
            เว็บไซต์รวมคูปองและดีลส่วนลดที่ดีที่สุดในไทย อัปเดตทุกวัน ประหยัดได้จริง
          </p>
          <div className="mt-4 flex gap-2">
            {[FacebookIcon, InstagramIcon, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="rounded-full bg-neutral-100 p-2 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.title}>
            <h4 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">{group.title}</h4>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-500 hover:text-primary-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-400 dark:border-neutral-800">
        © {new Date().getFullYear()} Deals Thai. สงวนลิขสิทธิ์ทุกประการ.
      </div>
    </footer>
  );
}
