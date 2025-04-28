export function getSiteUrl(): string {
  // Check for environment variable first
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  // For server-side rendering
  if (typeof window === "undefined") {
    // Default to production URL if we're server-side and don't have an environment variable
    return "https://lamontai.vercel.app"
  }

  // For client-side, use the current window location
  return `${window.location.protocol}//${window.location.host}`
}
