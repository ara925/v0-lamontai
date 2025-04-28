export function getSiteUrl(): string {
  // In production, always use the production URL
  if (process.env.NODE_ENV === "production") {
    return "https://lamontai.vercel.app"
  }

  // For development, use the environment variable if available
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
  return "http://localhost:3000"
}
