import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-be-vietnam-pro", 
});

export const metadata: Metadata = {
  title: "Thiệp Mời Tốt Nghiệp — Lê Tấn Đạt",
  description: "Bạn được mời tham dự lễ tốt nghiệp của Lê Tấn Đạt — Đại học Nguyễn Tất Thành, Khoa Công nghệ Thông tin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>{children}</body>
    </html>
  );
}
