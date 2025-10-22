<<<<<<< HEAD
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ConditionalHeader } from "@/components/conditional-header"
import { Header } from "@/components/header"
=======
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
>>>>>>> 5d6d1f2 (readme update)

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
<<<<<<< HEAD
      <body className={inter.className}>
        <ConditionalHeader header={<Header />} />
        {children}
      </body>
=======
      <body className={inter.className}>{children}</body>
>>>>>>> 5d6d1f2 (readme update)
    </html>
  );
}
