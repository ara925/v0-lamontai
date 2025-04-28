export function ContentQuality() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">AI-Generated Content That People Enjoy Reading</h2>
          <p className="text-xl text-gray-700">
            Our AI creates engaging, informative content that reads like it was written by a human expert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">How to Improve Your Website's SEO</h3>
            </div>
            <div className="prose">
              <p>
                Search Engine Optimization (SEO) is crucial for any website looking to attract organic traffic. By
                implementing proper SEO techniques, you can improve your site's visibility in search engine results
                pages (SERPs) and drive more qualified traffic to your website.
              </p>
              <p>
                One of the most important aspects of SEO is keyword research. By identifying the terms and phrases your
                target audience is searching for, you can create content that addresses their needs and questions. This
                not only helps your content rank higher in search results but also ensures that you're attracting the
                right visitors to your site.
              </p>
              <p className="text-blue-600 font-medium">Read more →</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">The Ultimate Guide to Content Marketing</h3>
            </div>
            <div className="prose">
              <p>
                Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and
                consistent content to attract and retain a clearly defined audience. Unlike traditional marketing,
                content marketing aims to provide useful information that solves problems rather than directly promoting
                a brand.
              </p>
              <p>
                Effective content marketing establishes your business as an authority in your industry, builds trust
                with your audience, and ultimately drives profitable customer action. By creating content that addresses
                your customers' pain points and questions, you can guide them through the buyer's journey and convert
                them into loyal customers.
              </p>
              <p className="text-blue-600 font-medium">Read more →</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
