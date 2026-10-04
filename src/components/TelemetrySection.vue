<script setup>
import { ref, computed, markRaw, onMounted, onBeforeUnmount } from 'vue'
import { Eye, FileDownload } from '@vicons/tabler'

const loading = ref(true)
const failed = ref(false)
const fetchedAt = ref(null)
const stats = ref([
  { key: 'pageviews', label: 'Page views', sub: 'last 30 days', icon: markRaw(Eye), value: null, shown: 0 },
  { key: 'downloads', label: 'Résumé downloads', sub: 'last 30 days', icon: markRaw(FileDownload), value: null, shown: 0 }
])

const sectionEl = ref(null)
let observer = null
let raf = null
let inView = false

const status = computed(() => {
  if (loading.value) return { label: 'Connecting', kind: 'loading' }
  if (failed.value) return { label: 'Unavailable', kind: 'error' }
  return { label: 'Live', kind: 'live' }
})

const fetchedLabel = computed(() =>
  fetchedAt.value
    ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(fetchedAt.value)
    : null
)

const fmt = n => new Intl.NumberFormat('en-US').format(n)

// Count from 0 to the real value once data is loaded AND the section is visible.
function countUp() {
  if (loading.value || failed.value || !inView) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const start = performance.now()
  const DURATION = 1200
  const step = now => {
    const t = reduce ? 1 : Math.min((now - start) / DURATION, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    stats.value.forEach(s => (s.shown = Math.round((s.value ?? 0) * eased)))
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(async () => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView = true
        countUp()
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (sectionEl.value) observer.observe(sectionEl.value)

  try {
    const r = await fetch('/api/analytics')
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const data = await r.json()
    stats.value.forEach(s => (s.value = data[s.key] ?? null))
    failed.value = stats.value.every(s => s.value === null)
    fetchedAt.value = new Date()
  } catch {
    failed.value = true
  } finally {
    loading.value = false
    countUp()
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="telemetry" ref="sectionEl" class="section telemetry" aria-labelledby="telemetry-title">
    <div class="section-inner">
      <div v-reveal class="telemetry__head">
        <div>
          <p class="eyebrow"><span class="eyebrow__num">06.</span> telemetry</p>
          <h2 id="telemetry-title" class="telemetry__title">This site, by the numbers</h2>
        </div>
        <p :class="['status', `status--${status.kind}`]" role="status">
          <span class="status__dot" aria-hidden="true" />
          {{ status.label }}
          <span v-if="fetchedLabel" class="status__time">· fetched {{ fetchedLabel }}</span>
        </p>
      </div>

      <div class="telemetry__grid">
        <div
          v-for="(s, i) in stats"
          :key="s.key"
          v-reveal="i * 100"
          v-spotlight
          class="card stat"
        >
          <span class="stat__icon" aria-hidden="true"><component :is="s.icon" /></span>
          <span :class="['stat__value', { 'is-loading': loading }]">
            <template v-if="loading">0000</template>
            <span v-else-if="failed || s.value === null" class="stat__na">n/a</span>
            <template v-else>
              <span aria-hidden="true">{{ fmt(s.shown) }}</span>
              <span class="sr-only">{{ fmt(s.value) }}</span>
            </template>
          </span>
          <span class="stat__label">{{ s.label }} <span class="stat__sub">· {{ s.sub }}</span></span>
        </div>
      </div>

      <p class="telemetry__note">
        Source: PostHog. Counts are page loads, not unique visitors.
      </p>
    </div>
  </section>
</template>

<style scoped>
.telemetry {
  padding-top: 48px;
  padding-bottom: 96px;
}

.telemetry__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.telemetry__title {
  font-family: var(--font-mono);
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.status__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-dim);
}

.status--live {
  color: var(--primary-strong);
  border-color: rgba(74, 222, 128, 0.35);
}
.status--live .status__dot {
  background: var(--primary);
  box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
  animation: pulse 2s infinite;
}
.status--loading .status__dot {
  background: var(--amber);
  animation: pulse-amber 1s infinite;
}
.status--error {
  color: #fca5a5;
  border-color: rgba(248, 113, 113, 0.35);
}
.status--error .status__dot {
  background: #f87171;
}

.status__time {
  color: var(--text-dim);
}

@keyframes pulse {
  70% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
}
@keyframes pulse-amber {
  50% { opacity: 0.3; }
}

.telemetry__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
}

.stat__icon {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: var(--cyan);
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.25);
}

.stat__icon svg {
  width: 18px;
  height: 18px;
}

.stat__value {
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: clamp(40px, 6vw, 60px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.stat__value.is-loading {
  color: transparent;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(148, 163, 184, 0.08) 25%, rgba(148, 163, 184, 0.18) 37%, rgba(148, 163, 184, 0.08) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.stat__na {
  color: var(--text-dim);
}

.stat__label {
  font-size: 15px;
  color: var(--text);
}

.stat__sub {
  color: var(--text-muted);
}

.telemetry__note {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
}

@media (max-width: 600px) {
  .telemetry__grid {
    grid-template-columns: 1fr;
  }
}
</style>
