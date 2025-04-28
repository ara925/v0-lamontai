export function AnalyticsPreview() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Track Your Organic Growth</h2>
          <p className="text-xl text-gray-700">
            Monitor your content performance with our comprehensive analytics dashboard.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold">Organic Traffic Overview</h3>
              <p className="text-gray-600">Last 30 days</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Impressions</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Clicks</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm">Position</span>
              </div>
            </div>
          </div>

          <div className="h-64 bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
            <div className="text-gray-500">Analytics Graph Visualization</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Impressions</div>
              <div className="text-2xl font-bold">1,245,678</div>
              <div className="text-sm text-green-600">+24.8% vs. previous period</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Clicks</div>
              <div className="text-2xl font-bold">87,432</div>
              <div className="text-sm text-green-600">+18.3% vs. previous period</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Average Position</div>
              <div className="text-2xl font-bold">3.2</div>
              <div className="text-sm text-green-600">+1.5 vs. previous period</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">CTR</div>
              <div className="text-2xl font-bold">7.02%</div>
              <div className="text-sm text-red-600">-0.5% vs. previous period</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
