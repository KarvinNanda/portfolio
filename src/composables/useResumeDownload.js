import posthog from 'posthog-js'

// Google Drive share link for the CV.
export const CV_URL = 'https://drive.google.com/file/d/1tvkr6OsJgGj_L1DeOpz_MJ73U-k8fXxJ/view?usp=sharing'

// The 'resume_downloaded' event name is read by api/analytics.js. Do not rename it.
export function openResume(source) {
  posthog.capture('resume_downloaded', { source })
  window.open(CV_URL, '_blank', 'noopener,noreferrer')
}
