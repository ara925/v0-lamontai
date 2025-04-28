import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Support Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Explore our comprehensive guides and tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our documentation covers everything from getting started to advanced features.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">View Documentation</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our customer support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Our support team is available Monday through Friday, 9am-5pm EST.</p>
            </CardContent>
            <CardFooter>
              <Link href="/contact" className="w-full">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Contact Us</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="mb-12">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I get started with Lamont.ai?</AccordionTrigger>
            <AccordionContent>
              Getting started is easy! Simply sign up for an account, complete the onboarding process by adding your
              website information and competitors, and our AI will start generating content for you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards including Visa, Mastercard, American Express, and Discover. Payments are
              processed securely through Stripe.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I cancel my subscription at any time?</AccordionTrigger>
            <AccordionContent>
              Yes, you can cancel your subscription at any time from your account dashboard. You'll continue to have
              access to the service until the end of your current billing period.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How does the content generation work?</AccordionTrigger>
            <AccordionContent>
              Our AI analyzes your website, competitors, and target keywords to generate SEO-optimized content that's
              tailored to your specific industry and audience. Each article is structured with key takeaways, benefits,
              and other sections to maximize engagement and search visibility.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I edit the generated content?</AccordionTrigger>
            <AccordionContent>
              While our AI generates high-quality content, you have full control to edit, refine, or customize any
              article before publishing it to your website.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Contact Our Support Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
