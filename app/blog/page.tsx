import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: "How AI is Revolutionizing Content Creation",
      excerpt:
        "Discover how artificial intelligence is transforming the way businesses create and optimize content for better search visibility.",
      date: "April 25, 2025",
      category: "AI Technology",
      image: "/digital-text-generation.png",
    },
    {
      id: 2,
      title: "5 SEO Strategies That Actually Work in 2025",
      excerpt:
        "Learn about the most effective SEO techniques that are driving results for businesses in the current digital landscape.",
      date: "April 20, 2025",
      category: "SEO",
      image: "/strategic-seo-roadmap.png",
    },
    {
      id: 3,
      title: "The Future of Automated Content Generation",
      excerpt:
        "Explore how automated content generation is evolving and what it means for content marketers and SEO professionals.",
      date: "April 15, 2025",
      category: "Content Marketing",
      image: "/content-automation-flow.png",
    },
    {
      id: 4,
      title: "Why Quality Content Still Matters for SEO",
      excerpt:
        "Despite advances in AI, learn why high-quality, valuable content remains essential for successful SEO strategies.",
      date: "April 10, 2025",
      category: "Content Strategy",
      image: "/content-is-king.png",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Lamont.ai Blog</h1>
        <p className="text-gray-600 text-center mb-12">Insights, tips, and strategies for content marketing and SEO</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="text-sm text-blue-500 mb-1">{post.category}</div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">{post.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue-500 hover:bg-blue-600">Load More Articles</Button>
        </div>
      </div>
    </div>
  )
}
