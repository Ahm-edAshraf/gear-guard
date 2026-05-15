import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GearGuard Campus | Equipment Booking",
  description: "Campus Equipment Booking & Return Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0f0f0f] text-[#f5f5f5] selection:bg-[#eab308] selection:text-black">
        <Navbar />
        <main className="flex-grow pt-20 px-6 max-w-7xl mx-auto w-full pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
