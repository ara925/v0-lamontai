"use client"

import type React from "react"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  children: React.ReactNode
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, children, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      primary:
        "text-white shadow hover:shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
      secondary:
        "text-white shadow hover:shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      outline:
        "border border-blue-500 text-blue-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700",
    }

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6",
      lg: "h-14 px-8 text-lg",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth ? "w-full" : "", className)}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  },
)

GradientButton.displayName = "GradientButton"
