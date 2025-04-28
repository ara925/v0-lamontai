import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If not authenticated and trying to access protected routes, redirect to login
  if (!session && (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/onboarding"))) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If authenticated, check if onboarding is completed
  if (session && req.nextUrl.pathname.startsWith("/dashboard")) {
    // Get the user's organization
    const { data: orgUser } = await supabase
      .from("organization_users")
      .select("organization_id")
      .eq("user_id", session.user.id)
      .single()

    if (orgUser) {
      // Check if onboarding is completed
      const { data: org } = await supabase
        .from("organizations")
        .select("onboarding_completed")
        .eq("id", orgUser.organization_id)
        .single()

      // If onboarding is not completed, redirect to onboarding
      if (org && !org.onboarding_completed && !req.nextUrl.pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/onboarding", req.url))
      }
    } else {
      // If no organization is found, redirect to onboarding
      if (!req.nextUrl.pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/onboarding", req.url))
      }
    }
  }

  // If authenticated and trying to access login/register pages, redirect to dashboard or onboarding
  if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    // Check if onboarding is completed
    const { data: orgUser } = await supabase
      .from("organization_users")
      .select("organization_id")
      .eq("user_id", session.user.id)
      .single()

    if (orgUser) {
      const { data: org } = await supabase
        .from("organizations")
        .select("onboarding_completed")
        .eq("id", orgUser.organization_id)
        .single()

      if (org && !org.onboarding_completed) {
        return NextResponse.redirect(new URL("/onboarding", req.url))
      }
    } else {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }

    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

// Update the config to exclude the auth callback route from middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/onboarding/:path*",
    // Exclude auth callback route and API routes
    "/((?!auth/callback|api|_next/static|_next/image|favicon.ico).*)",
  ],
}
