/**
 * Gets the correct site URL based on the environment
 * Uses NEXT_PUBLIC_APP_URL in production or the current window location in development
 */
export function getSiteUrl(): string {
  // Use the environment variable if available (for production)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.trim().replace(/\/$/, "")
  }

  // For client-side in development, use window.location
  if (typeof window !== "undefined") {
    const protocol = window.location.protocol
    const host = window.location.host
    return `${protocol}//${host}`
  }

  // Fallback for server-side in development
  return "https://lamontai.vercel.app"
}
