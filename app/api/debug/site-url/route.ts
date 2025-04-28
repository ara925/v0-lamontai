import { NextResponse } from "next/server"
import { getSiteUrl } from "@/lib/get-site-url"

export async function GET() {
  return NextResponse.json({
    siteUrl: getSiteUrl(),
    env: {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "not set",
    },
    headers: {
      host: headers().get("host") || "not available",
      "x-forwarded-host": headers().get("x-forwarded-host") || "not available",
    },
  })
}

function headers() {
  return new Headers({
    host: typeof window !== "undefined" ? window.location.host : "server-side",
  })
}
