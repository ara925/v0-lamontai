import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Have questions or need help? Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">Send Message</Button>
          </CardFooter>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Email</h3>
              <p className="text-gray-600">support@lamont.ai</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Support Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9am - 5pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
