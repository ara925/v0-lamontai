import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SuccessStories() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">🚀 Lamont.ai</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/success-stories" className="text-sm font-medium hover:underline">
            Success Stories
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline">
            Sign in
          </Link>
          <Link href="/login?tab=register">
            <Button className="bg-blue-600 hover:bg-blue-700">4-Day Free Trial</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
              <p className="text-xl text-gray-600">
                See how businesses are growing their organic traffic with Lamont.ai
              </p>
            </div>

            <div className="grid gap-12">
              {/* Success Story 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-blue-50 p-6 flex flex-col justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">TechBlog.io</h3>
                      <p className="text-gray-600">Technology Blog</p>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Monthly Traffic</span>
                        <span className="text-sm font-bold">+327%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Keyword Rankings</span>
                        <span className="text-sm font-bold">+215 keywords</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-bold">Michael Chen</h4>
                        <p className="text-sm text-gray-500">Founder & CEO</p>
                      </div>
                    </div>

                    <blockquote className="text-gray-600 mb-6">
                      "Before using Lamont.ai, we were struggling to consistently publish high-quality content. Our team
                      was spending hours researching keywords and topics, but we weren't seeing the results we wanted.
                      Since implementing Lamont.ai, we've been able to publish 3x more content with better SEO
                      optimization. Our organic traffic has increased by over 300% in just 4 months, and we're ranking
                      for keywords we never thought possible."
                    </blockquote>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold mb-2">Results:</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          327% increase in organic traffic
                        </li>
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          215 new keyword rankings in top 10 positions
                        </li>
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          42% increase in conversion rate
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Story 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-blue-50 p-6 flex flex-col justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">HealthyLife</h3>
                      <p className="text-gray-600">Health & Wellness Blog</p>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Monthly Traffic</span>
                        <span className="text-sm font-bold">+482%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Email Subscribers</span>
                        <span className="text-sm font-bold">+12,500</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-bold">Sarah Johnson</h4>
                        <p className="text-sm text-gray-500">Content Director</p>
                      </div>
                    </div>

                    <blockquote className="text-gray-600 mb-6">
                      "As a health and wellness blog, we need to ensure our content is not only engaging but also
                      medically accurate and SEO-friendly. Lamont.ai has been a game-changer for us. The AI-generated
                      content is surprisingly well-researched and includes proper citations. We've been able to expand
                      into multiple languages, which has opened up entirely new markets for us. Our traffic has nearly
                      quintupled in 6 months, and our email list is growing faster than ever."
                    </blockquote>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold mb-2">Results:</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          482% increase in organic traffic
                        </li>
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          12,500+ new email subscribers
                        </li>
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Expanded to 3 additional languages
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Story 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-blue-50 p-6 flex flex-col justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">EcoShop</h3>
                      <p className="text-gray-600">E-commerce Store</p>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Organic Revenue</span>
                        <span className="text-sm font-bold">+218%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Conversion Rate</span>
                        <span className="text-sm font-bold">+3.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "55%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-bold">David Rodriguez</h4>
                        <p className="text-sm text-gray-500">Marketing Manager</p>
                      </div>
                    </div>

                    <blockquote className="text-gray-600 mb-6">
                      "As an e-commerce business, we needed content that not only drives traffic but also converts.
                      Lamont.ai has helped us create product descriptions, buying guides, and educational content that
                      actually drives sales. The most impressive part is how the AI understands our brand voice and
                      maintains consistency across all content. Our organic revenue has more than doubled, and we're
                      seeing higher conversion rates from our blog traffic."
                    </blockquote>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold mb-2">Results:</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          218% increase in organic revenue
                        </li>
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          3.2% higher conversion rate from organic traffic
                        </li>
                        <li className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          175% increase in time spent on site
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-6">Ready to grow your organic traffic?</h2>
              <Link href="/login?tab=register">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">Start Your 4-Day Free Trial</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">© 2025 Lamont.ai. All rights reserved.</span>
            </div>
            <nav className="flex gap-4">
              <Link href="/terms" className="text-sm hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
