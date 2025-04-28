export const SUBSCRIPTION_PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: ["3 articles per month", "1 target language", "Basic SEO optimization", "Email support"],
    limits: {
      articlesPerMonth: 3,
      languages: 1,
    },
  },
  starter: {
    name: "Starter",
    price: 49,
    features: [
      "10 articles per month",
      "1 target language",
      "SEO optimization",
      "WordPress integration",
      "Basic analytics",
      "Email support",
    ],
    limits: {
      articlesPerMonth: 10,
      languages: 1,
    },
  },
  growth: {
    name: "Growth",
    price: 99,
    features: [
      "30 articles per month",
      "2 target languages",
      "Advanced SEO optimization",
      "WordPress, Webflow & Wix integration",
      "Advanced analytics & reporting",
      "Content calendar",
      "Priority email support",
    ],
    limits: {
      articlesPerMonth: 30,
      languages: 2,
    },
  },
  scale: {
    name: "Scale",
    price: 199,
    features: [
      "100 articles per month",
      "4 target languages",
      "Premium SEO optimization",
      "All integrations (WordPress, Webflow, Wix, Shopify, API)",
      "Premium analytics & custom reporting",
      "Content calendar with team collaboration",
      "Dedicated account manager",
      "Phone & priority email support",
    ],
    limits: {
      articlesPerMonth: 100,
      languages: 4,
    },
  },
}

export type PlanType = keyof typeof SUBSCRIPTION_PLANS
