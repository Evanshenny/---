import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAIROS — 陈扬波 AI 创意设计师",
  description: "KAIROS（陈扬波）——从空间设计到 AI 创作，探索人工智能时代的商业视觉设计。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="/fonts/lxgwwenkaiscreen.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
