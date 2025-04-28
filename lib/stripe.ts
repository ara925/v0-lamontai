import Stripe from "stripe"

// Make Stripe optional
let stripe: Stripe | null = null

// Only initialize Stripe if the secret key is available
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
  })
}

export { stripe }

export const STRIPE_PLANS = {
  starter: {
    id: process.env.STRIPE_STARTER_PLAN_ID || "price_starter",
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
  },
  growth: {
    id: process.env.STRIPE_GROWTH_PLAN_ID || "price_growth",
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
  },
  scale: {
    id: process.env.STRIPE_SCALE_PLAN_ID || "price_scale",
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
  },
}

export type PlanType = keyof typeof STRIPE_PLANS
