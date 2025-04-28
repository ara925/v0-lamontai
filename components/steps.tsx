import { FadeIn } from "./animations/fade-in"

export function Steps() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12">3 Steps to Organic Growth</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Research Keywords</h3>
              <p className="text-gray-700">
                Discover high-value keywords with low competition that your website can rank for.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} direction="up">
            <div className="text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate Content</h3>
              <p className="text-gray-700">
                Create SEO-optimized content with our AI that's designed to rank in search engines.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.6} direction="up">
            <div className="text-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Publish & Monitor</h3>
              <p className="text-gray-700">
                Publish your content and track its performance with our analytics dashboard.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.8}>
          <div className="mt-16 relative">
            <div className="h-2 bg-blue-200 absolute top-1/2 left-0 right-0 transform -translate-y-1/2"></div>
            <div className="relative z-10 flex justify-between">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transform transition-transform duration-300 hover:scale-125"
                ></div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4 text-center text-sm">
              <div>Keyword Research</div>
              <div>Content Creation</div>
              <div>Optimization</div>
              <div>Publication</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
