import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asri's Archive",
  description: "A personal archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
