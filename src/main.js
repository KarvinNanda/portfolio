import { createApp } from 'vue'
import posthog from 'posthog-js'
import App from './App.vue'
import './style.css'

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  autocapture: true,
  capture_pageview: true,
})

createApp(App).mount('#app')
