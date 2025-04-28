import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database.types"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Try to get user by email (admin only)
    const adminResult = await supabase.auth.admin
      .getUserByEmail(email)
      .catch((err) => ({ error: `Admin API error: ${err.message}`, data: null }))

    // Try OTP method
    const otpResult = await supabase.auth
      .signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      })
      .catch((err) => ({ error: `OTP error: ${err.message}`, data: null }))

    return NextResponse.json({
      email,
      adminCheck: {
        userExists: adminResult.data?.user ? true : false,
        error: adminResult.error ? adminResult.error.message : null,
      },
      otpCheck: {
        error: otpResult.error ? otpResult.error.message : null,
        data: otpResult.data || null,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
