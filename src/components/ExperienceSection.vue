<script setup>
import { NTimeline, NTimelineItem } from 'naive-ui'
import { experiences } from '../data/portfolio.js'
</script>

<template>
  <section id="experience" class="section">
    <div class="section-inner">
      <h2 class="section-title reveal stagger-1">Experience</h2>
      <p class="section-subtitle reveal stagger-2">A timeline of where I've been building things.</p>

      <n-timeline size="large" class="timeline reveal stagger-3">
        <n-timeline-item
          v-for="exp in experiences"
          :key="exp.company"
          type="success"
        >
          <template #header>
            <div class="exp-header">
              <div>
                <div class="exp-role">{{ exp.role }}</div>
                <div class="exp-company">{{ exp.company }}</div>
              </div>
              <div class="exp-period">
                {{ exp.period }}
                <span v-if="exp.duration" class="exp-duration">· {{ exp.duration }}</span>
              </div>
            </div>
          </template>
          <p class="exp-desc">{{ exp.description }}</p>
        </n-timeline-item>
      </n-timeline>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  margin-top: 12px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.exp-role {
  font-weight: 800;
  font-size: 18px;
  color: var(--text);
  letter-spacing: -0.01em;
}

.exp-company {
  font-size: 15px;
  color: var(--accent-strong);
  margin-top: 4px;
}

.exp-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--text-muted);
  padding: 4px 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.exp-header:hover .exp-period {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(16, 185, 129, 0.05);
}

.exp-duration {
  opacity: 0.8;
}

.exp-desc {
  margin: 10px 0 0 0;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 15px;
  max-width: 760px;
}

@media (max-width: 640px) {
  .exp-period {
    font-size: 12px;
  }
  .exp-role {
    font-size: 16px;
  }
}
</style>
