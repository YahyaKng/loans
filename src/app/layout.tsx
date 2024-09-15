import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "بلو بانک",
  description: "تسک بلو بانک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl">
      <body>
        <div className="min-h-screen bg-light-white  text-black transition-colors duration-300">
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
