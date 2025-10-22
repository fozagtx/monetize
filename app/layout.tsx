import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ConditionalHeader } from "@/components/conditional-header"
// import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monetize - Sell Digital Products with Crypto on Base",
  description:
    "Accept USDC payments on Base for your digital products. No fees, instant settlements.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*<ConditionalHeader header={<Header />} />*/}
        {children}
      </body>
    </html>
  );
}
