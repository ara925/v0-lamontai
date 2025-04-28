export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://lamontai.vercel.app"

export const getRedirectUrl = (path = "") => {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
