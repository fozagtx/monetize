"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

export function ConditionalHeader({ header }: { header: ReactNode }) {
  const pathname = usePathname()
  
  // Don't show header on home page (has custom header)
  if (pathname === "/") {
    return null
  }
  
  // Don't show header on dashboard pages (have their own header with sidebar)
  if (pathname.startsWith("/dashboard")) {
    return null
  }
  
  // Show header on all other pages (auth, product pages, etc.)
  return <>{header}</>
}
