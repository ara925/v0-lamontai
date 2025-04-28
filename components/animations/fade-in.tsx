"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  fullWidth?: boolean
  className?: string
}

export function FadeIn({ children, delay = 0, direction = "none", fullWidth = true, className = "" }: FadeInProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 40 }
      case "down":
        return { y: -40 }
      case "left":
        return { x: 40 }
      case "right":
        return { x: -40 }
      default:
        return {}
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionOffset() }}
      animate={controls}
      transition={{
        duration: 0.8,
        ease: [0.21, 0.45, 0.15, 1.0],
        delay: delay,
      }}
      variants={{
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.div>
  )
}
