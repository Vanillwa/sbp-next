import type { Metadata } from "next";
import "./globals.css";
import Navi from "./component/navi/navi";

export const metadata: Metadata = {
  title: "Simple Board",
  description: "간단한 게시판입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
