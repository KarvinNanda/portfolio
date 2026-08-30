export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const projectId = process.env.VITE_POSTHOG_PROJECT_ID
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY

  const end = new Date().toISOString()
  const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  async function getCount(eventName) {
    const url = `https://us.posthog.com/api/projects/${projectId}/events/?event=${encodeURIComponent(
      eventName
    )}&after=${start}&before=${end}&limit=1`
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })
    const data = await r.json()
    return data.count ?? 0
  }

  try {
    const [pageviews, downloads] = await Promise.all([
      getCount('$pageview'),
      getCount('resume_downloaded')
    ])
    res.json({ pageviews, downloads })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
}
