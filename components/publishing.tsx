export function Publishing() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Publish with Just One Click</h2>
          <p className="text-xl text-gray-700">
            Seamlessly publish your content to your favorite platforms without leaving Lamont.ai.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-lg">WordPress</div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-lg">Shopify</div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-lg">Webflow</div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-lg">Wix</div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg w-32 h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-lg">Medium</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Streamlined Publishing Workflow</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    1
                  </span>
                  <span>Generate your content with Lamont.ai</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    2
                  </span>
                  <span>Connect your publishing platform</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    3
                  </span>
                  <span>Schedule or publish immediately</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    4
                  </span>
                  <span>Track performance in one dashboard</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-4 rounded-lg shadow">
              <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Publishing Interface Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
