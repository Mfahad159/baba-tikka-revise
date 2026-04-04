"use client"

import { motion } from "framer-motion"
import { ANIMATIONS_ENABLED } from "@/lib/animations"

export default function PageTransition({
  children
}: {
  children: React.ReactNode
}) {
  if (!ANIMATIONS_ENABLED) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.2, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  )
}
