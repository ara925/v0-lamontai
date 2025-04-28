import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText, Check, Star, FileTextIcon as FileText2, Code, Zap, Database } from "lucide-react"
import { Hero } from "@/components/hero"
import { Steps } from "@/components/steps"
import { Features } from "@/components/features"
import { GridBackground } from "@/components/grid-background"
import { Particles } from "@/components/animations/particles"
import { ProblemsSolution } from "@/components/problems-solution"

export const metadata: Metadata = {
  title: "Lamont.ai - AI-Powered Content Creation Platform",
  description: "Generate high-quality, SEO-optimized content with AI. Grow your organic traffic with Lamont.ai.",
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <GridBackground />
      <Particles />
      <Header />
      <main className="flex-1">
        <Hero />
        <Steps />
        <Features />
        {/* Rank High Section */}
        <section id="rank" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Rank High on Google</h2>
                <p className="text-gray-600 mb-6">
                  Start getting organic traffic and leads from Google as our customer did
                </p>
                <div className="bg-blue-500 p-4 rounded-lg">
                  <img
                    src="/google-search-results-abstract.png"
                    alt="Google search results"
                    className="w-full rounded"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Rank High on ChatGPT</h2>
                <p className="text-gray-600 mb-6">Start getting organic traffic from LLMs as our customer did</p>
                <div className="bg-blue-500 p-4 rounded-lg">
                  <img src="/chatgpt-interface-example.png" alt="ChatGPT interface" className="w-full rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Solution Section */}
        <ProblemsSolution />

        {/* Unlock SEO Growth */}
        <section id="unlock" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-blue-500">Unlock</span> your SEO growth
            </h2>
            <p className="text-xl mb-16 max-w-3xl mx-auto">
              Let us handle everything from keyword research to content generation so you can focus on growing your
              business.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="text-blue-500 mb-4">
                  <FileText className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Daily Articles</h3>
                <p className="text-gray-600 mb-6">
                  Receive daily SEO-optimized articles with citations, expert quotes, data visualizations, and JSON-LD
                  schema. Includes semantic keywords, optimized meta elements, internal linking, and conversion-focused
                  CTAs to boost search visibility and engagement.
                </p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Rank on Google and ChatGPT <ArrowRight className="ml-2" />
                </Button>
              </div>
              <div>
                <img src="/seo-article-concept.png" alt="Article example" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* AI-Generated Content Section */}
        <section id="ai-content" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold">
                AI-Generated Content
                <br />
                That <span className="text-blue-500">People Enjoy Reading</span>
              </h2>
              <Link href="/success-stories">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">See More Success Stories</Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <div className="mb-4">
                    <img src="/myhair-logo.png" alt="MyHair" className="h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Essential Hair Care Tips for Men: Unlock Your Best Grooming Routine
                  </h3>
                  <div className="flex gap-3 mb-4">
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                      Keyword Difficulty 19
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Volume 3,700</span>
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Internal Links 7</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    <img src="/samwell-logo.png" alt="Samwell.ai" className="h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Master Your Research: The Ultimate Review of Literature Outline for Academic Excellence
                  </h3>
                  <div className="flex gap-3 mb-4">
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                      Keyword Difficulty 18
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Volume 7,900</span>
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Internal Links 4</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">
                  Essential Hair Care Tips for Men: Unlock Your Best Grooming Routine
                </h3>
                <p className="text-gray-700 mb-6">
                  Looking in the mirror only to find your hair isn't living up to its full potential? In a world where
                  first impressions matter more than ever, your hair speaks volumes about your personal style and
                  attention to detail. Whether you're battling unruly locks or seeking to prevent hair loss,
                  understanding the fundamentals of men's hair care is your first step toward achieving that perfect
                  look you've always wanted.
                </p>
                <img
                  src="/hair-care-example.png"
                  alt="Man looking in mirror at hair"
                  className="w-full rounded-lg mb-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Perfect SEO Article Section */}
        <section id="perfect-seo" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="text-blue-500">Perfect SEO</span> Article
                </h2>
                <p className="text-gray-700 mb-8">
                  Learn what all it takes to achieve top Google rankings through technical, content, and LLM
                  optimization techniques.
                </p>
                <div className="relative w-full h-6 bg-gray-200 rounded-full mb-2">
                  <div className="absolute top-0 right-0 h-6 w-1/3 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm mb-8">
                  <span>Poor</span>
                  <span>Average</span>
                  <span className="font-bold text-blue-500">Excellent</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">SEO Score</h3>
                <p className="text-gray-600 mb-6">Based on 10 key SEO elements</p>

                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-500">100</div>
                      <div className="text-sm text-gray-500">out of 100</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset="0"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-purple-400 mr-2"></span>
                    <span className="flex-1">Technical Optimization</span>
                    <span className="font-medium">33%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                    <span className="flex-1">LLM Optimization</span>
                    <span className="font-medium">33%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                    <span className="flex-1">Content Optimization</span>
                    <span className="font-medium">33%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Optimization Tabs */}
        <section id="seo-optimization" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="technical" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger
                  value="technical"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
                >
                  <Code className="w-4 h-4 mr-2" /> Technical Optimization
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
                >
                  <FileText2 className="w-4 h-4 mr-2" /> Content Optimization
                </TabsTrigger>
                <TabsTrigger
                  value="llm"
                  className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
                >
                  <Zap className="w-4 h-4 mr-2" /> LLM Optimization
                </TabsTrigger>
              </TabsList>

              <TabsContent value="technical" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-purple-500 mb-2">
                        <Code className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Meta Optimization</h3>
                      <p className="text-gray-600">
                        Optimized meta title, description and slug to increase CTR and improve search visibility.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-purple-500 mb-2">
                        <Code className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Internal Linking</h3>
                      <p className="text-gray-600">
                        Internal links to other pages on the same website to improve navigation, SEO, and create a
                        stronger pillar page structure.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-purple-500 mb-2">
                        <Code className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Content Structure</h3>
                      <p className="text-gray-600">
                        Perfectly organized content with proper heading hierarchy and FAQs content to comprehensively
                        cover all relevant parts of the topic.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-blue-500 mb-2">
                        <FileText2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Well-researched content</h3>
                      <p className="text-gray-600">
                        Content is well-researched and based on facts and data to ensure accuracy and credibility.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-blue-500 mb-2">
                        <FileText2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Semantic Keywords</h3>
                      <p className="text-gray-600">
                        Natural and semantic placement of relevant keywords throughout content.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-blue-500 mb-2">
                        <FileText2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Easy-to-Understand Language</h3>
                      <p className="text-gray-600">
                        Written in a way that is easy to understand for all readers. No complex words or jargon.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="llm" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-orange-500 mb-2">
                        <Database className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Schema Markup</h3>
                      <p className="text-gray-600">
                        Automatically generated structured JSON-LD schemas to improve search visibility and engagement.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-orange-500 mb-2">
                        <Database className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Quotations and Statistics</h3>
                      <p className="text-gray-600">
                        Articles include expert quotations and statistics to enhance credibility and engagement.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-orange-500 mb-2">
                        <Database className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Citations and References</h3>
                      <p className="text-gray-600">
                        Articles include relevant citations and references to back up all statements and data points. No
                        hallucinations.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Customer Feedback Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Customer <span className="text-blue-500">Feedback</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12">Check out what our customers have to say</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                  <div className="text-left">
                    <h4 className="font-bold">John Borock</h4>
                  </div>
                  <div className="ml-auto">
                    <Star className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <div className="flex text-green-500 mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                </div>
                <p className="text-gray-700 mb-4">
                  Prepared content plan is on point, articles are well researched and even cited! Some of them even
                  include relevant 2025 statistics! Highly recommend!
                </p>
                <img src="/content-plan-example.png" alt="Content plan example" className="w-full rounded-lg" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                  <div className="text-left">
                    <h4 className="font-bold">Amelia Wilson</h4>
                    <p className="text-sm text-gray-500">@AmeliaWilson</p>
                  </div>
                  <div className="ml-auto">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Actually amazing! Articles are topically super related and automated internal links are saving us soo
                  much time. We are stadily growing for the past 3 months!
                </p>
                <img src="/analytics-chart.png" alt="Analytics chart" className="w-full rounded-lg" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                  <div className="text-left">
                    <h4 className="font-bold">Mariam M.</h4>
                  </div>
                  <div className="ml-auto">
                    <Star className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <div className="flex text-green-500 mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                </div>
                <p className="text-gray-700 mb-4">
                  I came across BabyLoveGrowth on reddit when I was searching on how to do a content gap analysis for my
                  business and started using their tools, incredible! It's saving me hours and energy in doing the work
                  manually so now I can enjoy running SEO almost on autopilot!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Simple pricing to
              <br />
              maximize your <span className="text-black font-bold">ROI</span>
            </h2>

            <div className="inline-flex bg-gray-200 rounded-full p-1 mb-12">
              <button className="px-6 py-2 rounded-full bg-black text-white">Monthly</button>
              <button className="px-6 py-2 rounded-full">
                Yearly
                <span className="ml-1 text-sm text-gray-600">3 months free</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Starter</h3>
                  <div className="flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Daily article in 1 language</span>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-gray-500 line-through text-sm mr-2">$198.00</span>
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Start for free</Button>
                </div>
                <div className="border-t border-gray-200 p-6">
                  <h4 className="font-bold mb-4">Included:</h4>
                  <ul className="space-y-3">
                    {[
                      "Rank on Google and ChatGPT",
                      "Daily SEO article in 1 language",
                      "Automatic keyword research",
                      "Automatic keyword clustering",
                      "Cited articles with research",
                      "Comprehensive SEO tracking",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-6 text-sm text-gray-500">Cancel anytime</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Growth</h3>
                  <div className="flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Daily article in 2 languages</span>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-gray-500 line-through text-sm mr-2">$398.00</span>
                    <span className="text-4xl font-bold">$199</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">Start for free</Button>
                </div>
                <div className="border-t border-gray-200 p-6">
                  <h4 className="font-bold mb-4">Included:</h4>
                  <ul className="space-y-3">
                    {[
                      "Rank on Google and ChatGPT",
                      "Daily SEO article in 2 languages",
                      "Automatic keyword research",
                      "Automatic keyword clustering",
                      "Comprehensive SEO tracking",
                      "Cited articles with research",
                      "Custom feature requests",
                      "Priority customer support",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-6 text-sm text-gray-500">Cancel anytime</div>
                </div>
              </div>

              <div className="bg-black text-white rounded-lg shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg">Popular</div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Scale</h3>
                  <div className="flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Daily article in 4 languages</span>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-gray-400 line-through text-sm mr-2">$598.00</span>
                    <span className="text-4xl font-bold">$299</span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">Start for free</Button>
                </div>
                <div className="border-t border-gray-700 p-6">
                  <h4 className="font-bold mb-4">Included:</h4>
                  <ul className="space-y-3">
                    {[
                      "Rank on Google and ChatGPT",
                      "Daily SEO article in 4 languages",
                      "Automatic keyword research",
                      "Automatic keyword clustering",
                      "Comprehensive SEO tracking",
                      "Cited articles with research",
                      "Custom feature requests",
                      "Priority customer support",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-6 text-sm text-gray-400">Cancel anytime</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-left font-medium">What is your refund policy?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    We offer a 14-day money-back guarantee. If you're not satisfied with our service within the first 14
                    days, we'll refund your payment in full.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-left font-medium">How does the free trial work?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Our 4-day free trial gives you full access to all features of your chosen plan. No credit card is
                    required to start. After the trial period, you can choose to subscribe to continue using the
                    service.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-left font-medium">Can I change my plan later?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next
                    billing cycle.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-lg p-2">
                  <AccordionTrigger className="text-left font-medium">
                    Do you offer custom plans for larger teams?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, we offer custom enterprise plans for larger teams with specific needs. Please contact our sales
                    team for more information.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">Haven't found what you are looking for?</p>
                <div className="flex justify-center gap-4">
                  <Link href="/contact" className="text-blue-500 hover:underline">
                    Send us an email
                  </Link>
                  <span className="text-gray-400">or</span>
                  <Link href="/contact" className="text-blue-500 hover:underline">
                    setup a call
                  </Link>
                  <span className="text-gray-600">with founders.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block text-sm text-blue-400 mb-4">Grow now!</div>
            <h2 className="text-4xl font-bold mb-6">
              Smart SEO,
              <br />
              <span className="text-blue-500">Faster Growth!</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-500 mr-2" />
                <span>Set up in minutes</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-500 mr-2" />
                <span>AI-powered optimization</span>
              </div>
            </div>

            <Link href="/login?tab=register&trial=true">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8">
                Rank on Google and ChatGPT <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
