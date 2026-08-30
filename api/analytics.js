export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const projectId = process.env.VITE_POSTHOG_PROJECT_ID
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY

  async function getCount(eventName) {
    const url = `https://us.posthog.com/api/projects/${projectId}/query/`
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: `SELECT count() FROM events WHERE event = '${eventName}' AND timestamp >= now() - INTERVAL 30 DAY`
        }
      })
    })
    const data = await r.json()
    if (!r.ok) {
      console.error('PostHog API error:', JSON.stringify(data))
    }
    return data.results?.[0]?.[0] ?? 0
  }

  try {
    const [pageviews, downloads] = await Promise.all([
      getCount('$pageview'),
      getCount('resume_downloaded')
    ])
    res.json({ pageviews, downloads })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
}
