<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const failed = ref(false)
const pageviews = ref(null)
const downloads = ref(null)

function formatNumber(n) {
  if (n === null || n === undefined) return '—'
  return new Intl.NumberFormat('en-US').format(n)
}

onMounted(async () => {
  try {
    const r = await fetch('/api/analytics')
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const data = await r.json()
    pageviews.value = data.pageviews ?? null
    downloads.value = data.downloads ?? null
    if (pageviews.value === null && downloads.value === null) {
      failed.value = true
    }
  } catch (e) {
    failed.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="telemetry" class="section telemetry">
    <div class="section-inner telemetry__inner reveal">
      <p class="telemetry__eyebrow">Live analytics</p>
      <h2 class="telemetry__heading">Telemetry</h2>

      <div class="telemetry__grid">
        <div class="telemetry__stat">
          <span
            class="telemetry__value"
            :class="{ 'is-loading': loading }"
          >{{ loading ? '0000' : (failed ? '—' : formatNumber(pageviews)) }}</span>
          <span class="telemetry__label">Page views · last 30 days</span>
        </div>
        <div class="telemetry__stat">
          <span
            class="telemetry__value"
            :class="{ 'is-loading': loading }"
          >{{ loading ? '000' : (failed ? '—' : formatNumber(downloads)) }}</span>
          <span class="telemetry__label">Résumé downloads · last 30 days</span>
        </div>
      </div>

      <p class="telemetry__note">
        Via PostHog — page loads, not unique visitors
      </p>
    </div>
  </section>
</template>

<style scoped>
.telemetry {
  padding-top: 64px;
  padding-bottom: 96px;
}

.telemetry__inner {
  text-align: center;
}

.telemetry__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--accent-strong);
  letter-spacing: 0.06em;
  margin: 0 0 12px 0;
}

.telemetry__heading {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 40px 0;
}

.telemetry__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
}

.telemetry__stat {
  min-width: 220px;
  flex: 1 1 220px;
  max-width: 320px;
  padding: 32px 24px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 16px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.telemetry__value {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(36px, 6vw, 52px);
  font-weight: 700;
  line-height: 1;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.telemetry__value.is-loading {
  color: transparent;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--accent-soft) 25%,
    rgba(16, 185, 129, 0.28) 37%,
    var(--accent-soft) 63%
  );
  background-size: 400% 100%;
  animation: telemetry-shimmer 1.4s ease infinite;
}

@keyframes telemetry-shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.telemetry__label {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

.telemetry__note {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-muted);
  opacity: 0.7;
  margin: 0;
}
</style>
