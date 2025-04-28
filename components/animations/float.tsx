"use client"

import type React from "react"

import { motion } from "framer-motion"

interface FloatProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
  amplitude?: number
}

export function Float({ children, duration = 4, delay = 0, amplitude = 10, className = "" }: FloatProps) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
