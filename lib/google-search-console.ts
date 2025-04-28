import { google } from "googleapis"

export interface GSCCredentials {
  access_token: string
  refresh_token: string
  expiry_date: number
}

export interface GSCPerformanceData {
  date: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export async function getGSCClient(credentials: GSCCredentials) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  )

  oauth2Client.setCredentials({
    access_token: credentials.access_token,
    refresh_token: credentials.refresh_token,
    expiry_date: credentials.expiry_date,
  })

  return google.searchconsole({
    version: "v1",
    auth: oauth2Client,
  })
}

export async function getGSCPerformanceData(
  credentials: GSCCredentials,
  siteUrl: string,
  startDate: string,
  endDate: string,
): Promise<GSCPerformanceData[]> {
  try {
    const searchConsole = await getGSCClient(credentials)

    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 500,
      },
    })

    if (!response.data.rows) {
      return []
    }

    return response.data.rows.map((row) => ({
      date: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    }))
  } catch (error) {
    console.error("Error fetching GSC performance data:", error)
    throw new Error("Failed to fetch GSC performance data")
  }
}

export async function verifyGSCSite(credentials: GSCCredentials, siteUrl: string): Promise<boolean> {
  try {
    const searchConsole = await getGSCClient(credentials)

    // Get the list of sites the user has access to
    const { data } = await searchConsole.sites.list()

    // Check if the site is in the list
    const sites = data.siteEntry || []
    return sites.some((site) => site.siteUrl === siteUrl)
  } catch (error) {
    console.error("Error verifying GSC site:", error)
    return false
  }
}
