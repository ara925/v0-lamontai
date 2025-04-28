"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "./animations/fade-in"
import { Float } from "./animations/float"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section id="hero" className="bg-black text-white py-20 relative overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <FadeIn>
          <div className="bg-gray-800 inline-block px-3 py-1 rounded-full text-sm mb-6">
            SEO: 6x Better ROI than Ads
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              10x Organic Traffic
            </span>
            <br />
            <span className="text-white">on auto-pilot</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Grow your organic traffic and outrank competitors with auto-generated articles in every language you target.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Link href="/login?tab=register&trial=true">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-6 text-lg group"
            >
              Get Started For Free
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight />
              </motion.span>
            </Button>
          </Link>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="mt-10">
            <p className="text-gray-400 mb-4">Trusted by 129+ businesses, marketers and startups</p>
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Float key={i} duration={4 + i} amplitude={5} delay={i * 0.2}>
                  <div className="w-32 h-8 bg-gray-800 rounded"></div>
                </Float>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
