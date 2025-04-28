import { Check } from "lucide-react"
import { FadeIn } from "./animations/fade-in"

export function Features() {
  return (
    <section className="py-20 bg-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12">And So Much More</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "SEO-Optimized Content",
              items: [
                "Keyword-rich titles and headings",
                "Proper keyword density",
                "Optimized meta descriptions",
                "Internal linking suggestions",
              ],
            },
            {
              title: "Generate Unlimited Keywords",
              items: [
                "Discover long-tail keywords",
                "Competitor keyword analysis",
                "Search volume data",
                "Keyword difficulty scores",
              ],
            },
            {
              title: "Multi-User Access",
              items: ["Team collaboration", "Role-based permissions", "Activity tracking", "Shared content library"],
            },
          ].map((feature, i) => (
            <FadeIn key={i} delay={0.2 * i} direction="up">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Edit Article with AI",
              items: ["Rewrite paragraphs", "Improve readability", "Adjust tone and style", "Fix grammar and spelling"],
            },
            {
              title: "Content Templates",
              items: ["Blog posts", "Product descriptions", "Landing pages", "Custom templates"],
            },
            {
              title: "24/7 Support",
              items: ["Live chat support", "Comprehensive documentation", "Video tutorials", "Regular webinars"],
            },
          ].map((feature, i) => (
            <FadeIn key={i} delay={0.2 * i + 0.6} direction="up">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
