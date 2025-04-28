import { SITE_URL } from "./constants"

export function getSiteUrl(path = ""): string {
  // Always use the production URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
