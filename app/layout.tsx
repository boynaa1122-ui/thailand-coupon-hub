import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import "@/styles/globals.css";

export const metadata: Metadata = {
  ...buildMetadata({
    title: SITE_NAME,
    description: "เว็บไซต์รวมคูปองและดีลส่วนลดที่ดีที่สุดในไทย อัปเดตทุกวัน ประหยัดได้จริง",
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
