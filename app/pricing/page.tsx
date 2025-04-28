import { STRIPE_PLANS } from "@/lib/stripe"
import { SubscriptionButton } from "@/components/subscription-button"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the plan that best fits your content creation needs. All plans include a 4-day free trial.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Object.entries(STRIPE_PLANS).map(([key, plan]) => (
          <div
            key={key}
            className="border rounded-lg p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="text-3xl font-bold mb-6">
              ${plan.price}
              <span className="text-base font-normal text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <SubscriptionButton plan={key as keyof typeof STRIPE_PLANS} className="w-full" />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          If you need more articles, additional languages, or other custom features, we're happy to create a tailored
          plan for your needs.
        </p>
        <a
          href="mailto:sales@example.com"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Contact Sales
        </a>
      </div>
    </div>
  )
}
