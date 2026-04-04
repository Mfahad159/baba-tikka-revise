"use client"

import { usePathname } from "next/navigation"
import { useCart } from "@/hooks/useCart"

export default function MainWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname()
  const { totalItems } = useCart()
  
  const isCartPage = pathname === "/cart"
  const showBar = totalItems > 0 && !isCartPage

  return (
    <main className={[
      "flex-1 flex flex-col transition-all duration-300",
      showBar ? "pb-16" : "pb-0"
    ].join(" ")}>
      <div className="flex flex-1 flex-col">
        {children}
      </div>
    </main>
  )
}
