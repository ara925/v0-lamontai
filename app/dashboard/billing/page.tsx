import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SUBSCRIPTION_PLANS } from "@/lib/subscription-plans"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { CancelSubscriptionButton } from "@/components/cancel-subscription-button"
import { Check } from "lucide-react"
import { SubscriptionButton } from "@/components/subscription-button"

export default async function BillingPage() {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Get the user's organization
  const { data: orgUser } = await supabase
    .from("organization_users")
    .select("organization_id")
    .eq("user_id", session.user.id)
    .single()

  if (!orgUser) {
    redirect("/onboarding")
  }

  // Get the subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("organization_id", orgUser.organization_id)
    .single()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Billing & Subscription</h1>

      {subscription ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">
                      {SUBSCRIPTION_PLANS[subscription.plan as keyof typeof SUBSCRIPTION_PLANS]?.name ||
                        subscription.plan}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${SUBSCRIPTION_PLANS[subscription.plan as keyof typeof SUBSCRIPTION_PLANS]?.price}/month
                    </p>
                  </div>
                  <Badge
                    variant={
                      subscription.status === "active"
                        ? "default"
                        : subscription.status === "trialing"
                          ? "secondary"
                          : subscription.status === "past_due"
                            ? "destructive"
                            : subscription.status === "canceled"
                              ? "outline"
                              : "default"
                    }
                  >
                    {subscription.status === "trialing"
                      ? "Trial"
                      : subscription.status === "active"
                        ? "Active"
                        : subscription.status === "past_due"
                          ? "Past Due"
                          : subscription.status === "canceled"
                            ? "Canceled"
                            : subscription.status}
                  </Badge>
                </div>

                {subscription.current_period_end && (
                  <p className="text-sm">
                    {subscription.cancel_at_period_end
                      ? `Your subscription will end on ${formatDate(subscription.current_period_end)}`
                      : `Next billing date: ${formatDate(subscription.current_period_end)}`}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {subscription.status === "active" && !subscription.cancel_at_period_end && (
                <CancelSubscriptionButton subscriptionId={subscription.id} />
              )}

              {(subscription.status === "canceled" || subscription.cancel_at_period_end) && (
                <div className="w-full">
                  <p className="text-sm text-gray-500 mb-4">
                    Your subscription has{" "}
                    {subscription.status === "canceled"
                      ? "been canceled"
                      : "been set to cancel at the end of the billing period"}
                    . Choose a plan below to resubscribe.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
                      <SubscriptionButton key={key} plan={key} className="w-full">
                        Subscribe to {plan.name}
                      </SubscriptionButton>
                    ))}
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>Choose a plan to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
                <Card key={key} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>${plan.price}/month</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-sm">
                      {plan.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className="text-sm text-gray-500">+ {plan.features.length - 3} more features</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <SubscriptionButton plan={key} className="w-full">
                      Subscribe
                    </SubscriptionButton>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
