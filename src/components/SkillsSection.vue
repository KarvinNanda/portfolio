<script setup>
import { skills } from '@/data/portfolio.js'

const categories = [
  { key: 'languages',      label: 'Languages',      color: 'var(--color-languages)',      items: skills.languages },
  { key: 'frameworks',     label: 'Frameworks',     color: 'var(--color-frameworks)',     items: skills.frameworks },
  { key: 'database',       label: 'Database',       color: 'var(--color-database)',       items: skills.database },
  { key: 'infrastructure', label: 'Infrastructure', color: 'var(--color-infrastructure)', items: skills.infrastructure }
]
</script>

<template>
  <section id="skills" class="section">
    <div class="section-inner reveal">
      <h2 class="section-title">Tech Stack</h2>
      <p class="section-subtitle">Tools and technologies I work with.</p>

      <div class="legend">
        <span v-for="c in categories" :key="c.key" class="legend__item">
          <span class="legend__dot" :style="{ background: c.color }" />
          {{ c.label }}
        </span>
      </div>

      <div class="skills-grid">
        <div v-for="c in categories" :key="c.key" class="skill-group">
          <h3 class="skill-group__title" :style="{ color: c.color }">{{ c.label }}</h3>
          <div class="skill-tags">
            <span
              v-for="item in c.items"
              :key="item"
              class="skill-tag"
              :style="{ '--c': c.color }"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>

      <div class="languages">
        <h3 class="languages__title">Spoken Languages</h3>
        <div class="languages__list">
          <div v-for="lang in skills.spoken" :key="lang.name" class="lang-card">
            <span class="lang-name">{{ lang.name }}</span>
            <span class="lang-level">{{ lang.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 28px;
  padding: 12px 16px;
  border: 1px dashed var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.015);
  width: fit-content;
}

.legend__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

.legend__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.skill-group {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
}

.skill-group__title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 14px 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--c) 14%, transparent);
  color: var(--c);
  border: 1px solid color-mix(in srgb, var(--c) 32%, transparent);
  font-weight: 500;
  transition: transform 0.15s ease, background 0.15s ease;
}

.skill-tag:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--c) 22%, transparent);
}

.languages {
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}

.languages__title {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin: 0 0 16px 0;
}

.languages__list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.lang-card {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
}

.lang-name {
  font-weight: 600;
  color: var(--text);
  font-size: 14px;
}

.lang-level {
  font-size: 12px;
  color: var(--accent-strong);
  background: var(--accent-soft);
  padding: 3px 8px;
  border-radius: 999px;
}

@media (max-width: 720px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
