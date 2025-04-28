"use client"

import { CheckCircle, Users } from "lucide-react"
import { FadeIn } from "./animations/fade-in"
import { motion } from "framer-motion"

export function ProblemsSolution() {
  const features = [
    "Keyword Discovery",
    "Keyword Clustering",
    "Topic Research & Analysis",
    "Content Generation",
    "Content Optimization",
    "Internal Linking",
    "Image Generation",
    "FAQ & CTA",
    "Automated Publishing",
  ]

  return (
    <section id="solution" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-5xl font-bold mb-16">
            Your problems,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Our Solution
            </span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={0.2} direction="right">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <p className="font-medium text-left">
                  Managing different SEO tools <span className="text-blue-500">is killing my productivity.</span>
                </p>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <div className="w-24 h-6 bg-gray-100 rounded"></div>
                <div className="w-24 h-6 bg-gray-100 rounded"></div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-blue-500 p-6 rounded-lg text-white transform transition-all duration-500 hover:scale-105">
              <div className="mb-4">
                <img src="/lamont-ai-white-logo.png" alt="Lamont.ai" className="h-8" />
              </div>
              <p className="mb-4">All-in-one solution which does all the steps:</p>
              <div className="space-y-3">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="bg-white text-black rounded-md p-2 flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.1,
                      duration: 0.5,
                      ease: [0.21, 0.45, 0.15, 1.0],
                    }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="left">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <p className="font-medium text-left">
                  Collaborating with freelance SEO specialists{" "}
                  <span className="text-blue-500">is causing me headaches.</span>
                </p>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <div className="w-24 h-6 bg-gray-100 rounded"></div>
                <div className="w-24 h-6 bg-gray-100 rounded"></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
