import type { Metadata } from "next";
import "./globals.css";
import Navi from "./components/navi";

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
      <body>
        <Navi />
        {children}
      </body>
    </html>
  );
}
